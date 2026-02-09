import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '../generated/client';
import { Type } from '@sinclair/typebox'
import bcrypt from 'bcrypt';
import { isAuthenticated } from "../utils/helpers";
import {
    RegistratedUser, RegistratedUserType,
    UserLogin, UserLoginType,
    User, UserType
} from "../types/schemas";

const prisma = new PrismaClient();

const hashRounds = parseInt(process.env.SALT_ROUNDS || '10');


interface IReply {
    200: { success: boolean; message: string };
    302: { url: string };
    '4xx': { error: string };
}

/**
 * Registruje routes pro správu uživatelských účtů a sessions
 * @param fastify - Instance Fastify serveru
 */
async function routes (fastify: FastifyInstance /*, options: any*/) {

    /**
     * Registrace nového uživatele do systému
     * @route POST /register
     * @param request.body - Data nového uživatele (username, displayname, password)
     * @returns Vytvoří nový uživatelský účet s hashovaným heslem
     */
    fastify.post<{ Body: RegistratedUserType, Reply: UserType | IReply }>(
        '/register',
        {
            preValidation: async (request, reply) => {
                request.body.password = await bcrypt.hash(request.body.password, hashRounds); // Hashuje heslo
            },
            schema: {
                description: 'Registrace uživatele do systému',
                tags: ['user'],
                body: RegistratedUser,
                response: {
                    200: User
                },
            },
        },
        async (request, reply) => {

            try {
                // Kontroluje, zda uživatel již existuje
                const existingUser = await prisma.user.findFirst({
                    where: {
                        username: request.body.username
                    }
                });
                if (existingUser) return reply.status(400).send({ error: 'User already exists' });

                const { username, displayname, password } = request.body;
                const newUser = await prisma.user.create(
                    {
                        data: {
                            username: username,
                            displayname: displayname,
                            password: password
                        },
                    }
                );
                reply.status(200).send({
                    id: newUser.id,
                    username: newUser.username,
                    displayname: newUser.displayname
                });

            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Přihlášení uživatele do systému
     * @route POST /login
     * @param request.body - Přihlašovací údaje (username, password)
     * @returns Vytvoří uživatelskou session při úspěšném přihlášení
     */
    fastify.post<{ Body: UserLoginType, Reply: UserType | IReply }>(
        '/login',
        {
            schema: {
                description: 'Přihlášení uživatele do systému',
                tags: ['user'],
                body: UserLogin,
                response: {
                    200: User
                },
            },
        },
        async (request, reply) => {
            try {
                const { username, password } = request.body;
                // Najde uživatele v databázi
                const user = await prisma.user.findFirst({
                    where: {
                        username: username
                    }
                });
                if (!user) return reply.status(400).send({ error: 'User or password is not correct' });
                // Porovná heslo s hashovaným heslem
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) return reply.status(400).send({ error: 'User or password is not correct' });

                // Nastaví session
                request.session.userId = user.id;
                request.session.username = user.username;
                request.session.authenticated = true;
                reply.status(200).send({
                    id: user.id,
                    username: user.username,
                    displayname: user.displayname
                });
            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Odhlášení uživatele ze systému
     * @route GET /logout
     * @returns Zničí uživatelskou session a přesměruje na hlavní stránku
     */
    fastify.get<{ Reply: IReply }>(
        '/logout',
        {
            schema: {
                description: 'Odhlášení uživatele ze systému',
                tags: ['user'],
                response: {
                    200: { success: true, message: 'Logged out' }
                },
            },
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            // Odhlášení
            request.session.destroy((err: Error) => {
                if (err) {
                    fastify.log.error(err);
                    return reply.status(500).send({ error: 'Internal server error' });
                }
                reply.redirect('/'); // Přesměruje na hlavní stránku
            });
        });

    /**
     * Získání uživatelského profilu podle ID
     * @route GET /:userId/profile
     * @param request.params.userId - ID uživatele
     * @returns Profil uživatele (bez hesla)
     */
    fastify.get< { Params: { userId: number }, Reply: UserType | IReply }>(
        '/:userId/profile',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Získání uživatelského profilu podle ID',
                tags: ['user'],
                params: Type.Object({
                    userId: Type.Integer()
                }),
                response: {
                    200: User
                },
            },
        },
        async (request, reply) => {
            const { userId } = request.params;

            // Najde uživatele v databázi
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) return reply.status(404).send({ error: 'User not found' });
            reply.status(200).send({
                id: user.id,
                username: user.username,
                displayname: user.displayname
            });
        }
    );

    /**
     * Získání uživatelského profilu podle username
     * @route GET /username/:username
     * @param request.params.username - Uživatelské jméno
     * @returns Profil uživatele (bez hesla)
     */
    fastify.get< { Params: { username: string }, Reply: UserType | IReply }>(
        '/username/:username',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Získání uživatelského profilu podle username',
                tags: ['user'],
                params: Type.Object({
                    username: Type.String()
                }),
                response: {
                    200: User
                },
            },
        },
        async (request, reply) => {
            const { username } = request.params;

            // Najde uživatele v databázi podle username
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if (!user) return reply.status(404).send({ error: 'User not found' });
            reply.status(200).send({
                id: user.id,
                username: user.username,
                displayname: user.displayname
            });
        }
    );

    /**
     * Verifikace autentizace - získání informací o přihlášeném uživateli
     * @route GET /user/me
     * @returns Informace o aktuálně přihlášeném uživateli
     */
    fastify.get<{ Reply: UserType | IReply }>(
        '/user/me',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Verifikace autentizace a získání informací o přihlášeném uživateli',
                tags: ['user'],
                response: {
                    200: User,
                    '4xx': Type.Object({ error: Type.String() })
                }
            }
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const userId = (request.session as any)?.userId;

                if (!userId) {
                    return reply.status(401).send({ error: 'Uživatel není přihlášen' });
                }

                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        username: true,
                        displayname: true
                    }
                });

                if (!user) {
                    return reply.status(404).send({ error: 'Uživatel nenalezen' });
                }

                return reply.status(200).send({
                    id: user.id,
                    username: user.username,
                    displayname: user.displayname
                });
            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

}

export default routes;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/client");
const typebox_1 = require("@sinclair/typebox");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../utils/helpers");
const schemas_1 = require("../types/schemas");
const prisma = new client_1.PrismaClient();
const hashRounds = parseInt(process.env.SALT_ROUNDS || '10');
/**
 * Registruje routes pro správu uživatelských účtů a sessions
 * @param fastify - Instance Fastify serveru
 */
async function routes(fastify /*, options: any*/) {
    /**
     * Registrace nového uživatele do systému
     * @route POST /register
     * @param request.body - Data nového uživatele (username, displayname, password)
     * @returns Vytvoří nový uživatelský účet s hashovaným heslem
     */
    fastify.post('/register', {
        preValidation: async (request, reply) => {
            request.body.password = await bcrypt_1.default.hash(request.body.password, hashRounds); // Hashuje heslo
        },
        schema: {
            description: 'Registrace uživatele do systému',
            tags: ['user'],
            body: schemas_1.RegistratedUser,
            response: {
                200: schemas_1.User
            },
        },
    }, async (request, reply) => {
        try {
            // Kontroluje, zda uživatel již existuje
            const existingUser = await prisma.user.findFirst({
                where: {
                    username: request.body.username
                }
            });
            if (existingUser)
                return reply.status(400).send({ error: 'User already exists' });
            const { username, displayname, password } = request.body;
            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    displayname: displayname,
                    password: password
                },
            });
            reply.status(200).send({
                id: newUser.id,
                username: newUser.username,
                displayname: newUser.displayname
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Přihlášení uživatele do systému
     * @route POST /login
     * @param request.body - Přihlašovací údaje (username, password)
     * @returns Vytvoří uživatelskou session při úspěšném přihlášení
     */
    fastify.post('/login', {
        schema: {
            description: 'Přihlášení uživatele do systému',
            tags: ['user'],
            body: schemas_1.UserLogin,
            response: {
                200: schemas_1.User
            },
        },
    }, async (request, reply) => {
        try {
            const { username, password } = request.body;
            // Najde uživatele v databázi
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if (!user)
                return reply.status(400).send({ error: 'User or password is not correct' });
            // Porovná heslo s hashovaným heslem
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                return reply.status(400).send({ error: 'User or password is not correct' });
            // Nastaví session
            request.session.userId = user.id;
            request.session.username = user.username;
            request.session.authenticated = true;
            reply.status(200).send({
                id: user.id,
                username: user.username,
                displayname: user.displayname
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Odhlášení uživatele ze systému
     * @route GET /logout
     * @returns Zničí uživatelskou session a přesměruje na hlavní stránku
     */
    fastify.get('/logout', {
        schema: {
            description: 'Odhlášení uživatele ze systému',
            tags: ['user'],
            response: {
                200: { success: true, message: 'Logged out' }
            },
        },
    }, async (request, reply) => {
        // Odhlášení
        request.session.destroy((err) => {
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
    fastify.get('/:userId/profile', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání uživatelského profilu podle ID',
            tags: ['user'],
            params: typebox_1.Type.Object({
                userId: typebox_1.Type.Integer()
            }),
            response: {
                200: schemas_1.User
            },
        },
    }, async (request, reply) => {
        const { userId } = request.params;
        // Najde uživatele v databázi
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user)
            return reply.status(404).send({ error: 'User not found' });
        reply.status(200).send({
            id: user.id,
            username: user.username,
            displayname: user.displayname
        });
    });
    /**
     * Získání uživatelského profilu podle username
     * @route GET /username/:username
     * @param request.params.username - Uživatelské jméno
     * @returns Profil uživatele (bez hesla)
     */
    fastify.get('/username/:username', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání uživatelského profilu podle username',
            tags: ['user'],
            params: typebox_1.Type.Object({
                username: typebox_1.Type.String()
            }),
            response: {
                200: schemas_1.User
            },
        },
    }, async (request, reply) => {
        const { username } = request.params;
        // Najde uživatele v databázi podle username
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (!user)
            return reply.status(404).send({ error: 'User not found' });
        reply.status(200).send({
            id: user.id,
            username: user.username,
            displayname: user.displayname
        });
    });
    /**
     * Verifikace autentizace - získání informací o přihlášeném uživateli
     * @route GET /user/me
     * @returns Informace o aktuálně přihlášeném uživateli
     */
    fastify.get('/user/me', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Verifikace autentizace a získání informací o přihlášeném uživateli',
            tags: ['user'],
            response: {
                200: schemas_1.User,
                '4xx': typebox_1.Type.Object({ error: typebox_1.Type.String() })
            }
        }
    }, async (request, reply) => {
        try {
            const userId = request.session?.userId;
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
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
}
exports.default = routes;

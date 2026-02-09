"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/client");
const typebox_1 = require("@sinclair/typebox");
const helpers_1 = require("../utils/helpers");
const schemas_1 = require("../types/schemas");
const FacebookTokenManager_1 = require("../social/FacebookTokenManager");
const prisma = new client_1.PrismaClient();
/**
 * Registruje všechny routes pro správu sociálních sítí
 * @param fastify - Instance Fastify serveru
 */
async function routes(fastify /*, options: any*/) {
    /**
     * Přidání nové sociální sítě
     * Vytvoří novou síť a přiřadí ji aktuálnímu uživateli jako majiteli
     */
    // Přidání nové sítě
    fastify.post('/network/add', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Přidání nové sítě',
            tags: ['network'],
            body: schemas_1.NetworkCreate,
            response: {
                200: schemas_1.Network
            },
        },
    }, async (request, reply) => {
        try {
            const { networkType, networkName, networkNote } = request.body;
            const newNetwork = await prisma.network.create({
                data: {
                    owner_id: request.session.userId,
                    network_type: networkType,
                    network_name: networkName,
                    note: networkNote
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            reply.status(200).send({
                networkId: newNetwork.id,
                networkType: newNetwork.network_type,
                networkName: newNetwork.network_name,
                owner: {
                    id: newNetwork.users.id,
                    username: newNetwork.users.username,
                    displayname: newNetwork.users.displayname
                },
                note: newNetwork.note ? newNetwork.note : undefined,
                permission: 'admin' // Tvůrce má vždy admin oprávnění
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Smazání sociální sítě
     * Síť může smazat pouze její majitel
     */
    // Smazání sítě
    fastify.delete('/network/:networkId/remove', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Smazání sítě. Síť může smazat pouze její přihlášený majitel.',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            response: {
                200: { success: true, message: typebox_1.Type.String() },
                400: { error: typebox_1.Type.String() },
                500: { error: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Kontrola, zda existují příspěvky s přilinkovaným obsahem k této síti
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    networks_id: networkId
                }
            });
            if (postedContent) {
                return reply.status(400).send({
                    error: 'Síť nelze smazat, protože obsahuje příspěvky s přilinkovaným obsahem'
                });
            }
            // Smazání sítě
            await prisma.network.delete({
                where: {
                    id: networkId
                }
            });
            reply.status(200).send({
                success: true,
                message: 'Network deleted'
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Úprava sociální sítě podle ID
     * Typ sítě nelze změnit po vytvoření
     */
    // Úprava sítě podle ID
    fastify.put('/network/:networkId/edit', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Úprava sítě podle ID - typ sítě nelze měnit',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            body: schemas_1.NetworkEdit,
            response: {
                200: schemas_1.Network
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const { networkName, networkNote } = request.body;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Aktualizace sítě (networkType je neměnný)
            const updatedNetwork = await prisma.network.update({
                where: {
                    id: networkId
                },
                data: {
                    network_name: networkName,
                    note: networkNote
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            reply.status(200).send({
                networkId: updatedNetwork.id,
                networkType: updatedNetwork.network_type,
                networkName: updatedNetwork.network_name,
                owner: {
                    id: updatedNetwork.users.id,
                    username: updatedNetwork.users.username,
                    displayname: updatedNetwork.users.displayname
                },
                note: updatedNetwork.note ? updatedNetwork.note : undefined,
                permission: 'admin' // Majitel má vždy admin oprávnění
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Získání informací o síti podle ID
     * Vrací data pouze pokud má uživatel oprávnění ke čtení
     */
    // Získání sítě podle ID
    fastify.get('/network/:networkId', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání sítě podle ID',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            response: {
                200: schemas_1.Network
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const network = await prisma.network.findUnique({
                where: { id: networkId },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            // Určení oprávnění uživatele pro tuto síť
            let permission;
            if (network.owner_id === request.session.userId) {
                permission = 'admin';
            }
            else {
                // Kontrola, zda má uživatel přístup přes NetworksUsers
                const userAccess = await prisma.networksUsers.findFirst({
                    where: {
                        networks_id: networkId,
                        grantee_id: request.session.userId
                    }
                });
                permission = userAccess?.permission;
            }
            if (!permission) {
                return reply.status(403).send({ error: 'Access denied' });
            }
            reply.status(200).send({
                networkId: network.id,
                networkType: network.network_type,
                networkName: network.network_name,
                owner: {
                    id: network.users.id,
                    username: network.users.username,
                    displayname: network.users.displayname
                },
                note: network.owner_id === request.session.userId ? (network.note || undefined) : undefined,
                permission: permission
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Seznam vlastněných sociálních sítí
     * Vrací všechny sítě, které uživatel vlastní
     */
    // Seznam vlastněných sítí
    fastify.get('/network/list/owned', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání seznamu sítí, které uživatel vlastní',
            tags: ['network'],
            response: {
                200: typebox_1.Type.Array(schemas_1.Network)
            }
        },
    }, async (request, reply) => {
        try {
            const networks = await prisma.network.findMany({
                where: {
                    owner_id: request.session.userId
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            reply.status(200).send(networks.map(network => ({
                networkId: network.id,
                networkType: network.network_type,
                networkName: network.network_name,
                owner: {
                    id: network.users.id,
                    username: network.users.username,
                    displayname: network.users.displayname
                },
                note: network.note ? network.note : undefined,
                permission: 'admin' // Majitel má vždy admin oprávnění
            })));
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Seznam všech přístupných sociálních sítí
     * Vrací sítě, ke kterým má uživatel alespoň read oprávnění
     */
    // Seznam všech sítí (sítí s přístupem pro čtení)
    fastify.get('/network/list/all', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání seznamu sítí, ke kterým má uživatel přístup (může zobrazovat nebo vytvářet příspěvky',
            tags: ['network'],
            response: {
                200: typebox_1.Type.Array(schemas_1.Network)
            }
        },
    }, async (request, reply) => {
        try {
            const accessibleNetworks = await prisma.networksUsers.findMany({
                where: {
                    grantee_id: request.session.userId
                },
                select: {
                    networks_id: true,
                    permission: true
                }
            });
            const accessibleNetworkMap = new Map(accessibleNetworks.map(access => [access.networks_id, access.permission]));
            const networks = await prisma.network.findMany({
                where: {
                    OR: [
                        { owner_id: request.session.userId },
                        {
                            id: {
                                in: Array.from(accessibleNetworkMap.keys())
                            }
                        }
                    ]
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            reply.status(200).send(networks.map((network) => ({
                networkId: network.id,
                networkType: network.network_type,
                networkName: network.network_name,
                owner: {
                    id: network.users.id,
                    username: network.users.username,
                    displayname: network.users.displayname
                },
                note: network.owner_id === request.session.userId ? (network.note || undefined) : undefined,
                permission: network.owner_id === request.session.userId
                    ? 'admin'
                    : accessibleNetworkMap.get(network.id) === 'write'
                        ? 'write'
                        : 'read'
            })));
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Přidání uživatele a jeho oprávnění k síti
     * Může provést pouze majitel sítě
     */
    // Přidání uživatele k síti
    fastify.post('/network/:networkId/addperm', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Přidání uživatele a jeho oprávnění k síti',
            tags: ['network', 'user'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            body: schemas_1.NetworkUserPermission,
            response: {
                200: { success: true, message: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const { granteeId, permission } = request.body;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Přidání do NetworksUsers
            await prisma.networksUsers.create({
                data: {
                    networks_id: networkId,
                    grantee_id: granteeId,
                    granter_id: request.session.userId,
                    permission: permission
                }
            });
            reply.status(200).send({
                success: true,
                message: 'User added to network'
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Odebrání oprávnění uživatele k síti
     * Může provést pouze majitel sítě
     */
    // Odebrání uživatele ze sítě
    fastify.delete('/network/:networkId/removeperm/:granteeId', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Smazání přístupu uživatele ze sítě',
            tags: ['network', 'user'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer(),
                granteeId: typebox_1.Type.Integer()
            }),
            response: {
                200: { success: true, message: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId, granteeId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Odebrání z NetworksUsers
            await prisma.networksUsers.deleteMany({
                where: {
                    networks_id: networkId,
                    grantee_id: granteeId
                }
            });
            reply.status(200).send({
                success: true,
                message: 'User removed from network'
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Změna oprávnění uživatele v síti
     * Může provést pouze majitel sítě
     */
    // Změna oprávnění uživatele
    fastify.put('/network/:networkId/changeperm', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Změna oprávnění uživatele v síti',
            tags: ['network', 'user'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            body: schemas_1.NetworkUserPermission,
            response: {
                200: { success: true, message: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const { granteeId, permission } = request.body;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Změna oprávnění v NetworksUsers
            await prisma.networksUsers.upsert({
                where: {
                    networks_id_granter_id_grantee_id: {
                        networks_id: networkId,
                        granter_id: request.session.userId,
                        grantee_id: granteeId
                    }
                },
                update: {
                    permission: permission
                },
                create: {
                    networks_id: networkId,
                    granter_id: request.session.userId,
                    grantee_id: granteeId,
                    permission: permission
                }
            });
            reply.status(200).send({
                success: true,
                message: 'User permission changed'
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Seznam uživatelů s přístupem k síti
     * Vrací seznam všech uživatelů, kteří mají oprávnění k síti
     */
    // Seznam uživatelů přistupujících k síti
    fastify.get('/network/:networkId/listperm', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání seznamu uživatelů, kteří mají přístup k síti',
            tags: ['network', 'user'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            response: {
                200: typebox_1.Type.Array(schemas_1.NetworkUserPermission)
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Seznam uživatelů přistupujících k síti
            const users = await prisma.networksUsers.findMany({
                where: {
                    networks_id: networkId
                }
            });
            reply.status(200).send(users.map(user => ({
                granteeId: user.grantee_id,
                permission: user.permission
            })));
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Přidání tokenů k síti
     * Podporuje různé typy tokenů podle typu sociální sítě a univerzální tokeny
     */
    // Přidání tokenů k síti (podporuje více tokenů a síťově-specifickou inicializaci)
    fastify.post('/network/:networkId/addtoken', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Přidání tokenů k síti - podporuje pole tokenů, specifické Facebook tokeny nebo Mastodon tokeny',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            body: typebox_1.Type.Union([schemas_1.NetworkTokens, schemas_1.FacebookTokens, schemas_1.MastodonTokens, schemas_1.BlueskyTokens, schemas_1.TwitterTokens, schemas_1.ThreadsTokens]),
            response: {
                200: { success: typebox_1.Type.Boolean(), message: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const requestBody = request.body;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Zpracování různých typů sítí
            if (network.network_type === 'facebook') {
                // Kontrola, zda tělo požadavku obsahuje Facebook-specifické tokeny
                if ('appId' in requestBody && 'appSecret' in requestBody && 'pageId' in requestBody && 'shortLivedUserAccessToken' in requestBody) {
                    // Inicializace Facebook tokenů pomocí vyhrazeného manageru
                    const facebookManager = new FacebookTokenManager_1.FacebookTokenManager();
                    const result = await facebookManager.initializeFacebookTokens(networkId, requestBody);
                    return reply.status(result.success ? 200 : 400).send({
                        success: result.success,
                        message: result.message
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro Facebook síť jsou vyžadovány tokeny: appId, appSecret, pageId, shortLivedUserAccessToken'
                    });
                }
            }
            else if (network.network_type === 'mastodon') {
                // Kontrola, zda tělo požadavku obsahuje Mastodon-specifické tokeny
                if ('instanceUrl' in requestBody && 'accessToken' in requestBody) {
                    // Nejprve vymazání stávajících tokenů
                    await prisma.networkToken.deleteMany({
                        where: {
                            network_id: networkId
                        }
                    });
                    // Přidání Mastodon tokenů
                    const mastodonTokens = requestBody;
                    await prisma.networkToken.createMany({
                        data: [
                            {
                                network_id: networkId,
                                token_name: 'instanceUrl',
                                token: mastodonTokens.instanceUrl
                            },
                            {
                                network_id: networkId,
                                token_name: 'accessToken',
                                token: mastodonTokens.accessToken
                            }
                        ]
                    });
                    return reply.status(200).send({
                        success: true,
                        message: 'Mastodon tokeny byly úspěšně přidány'
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro Mastodon síť jsou vyžadovány tokeny: instanceUrl, accessToken'
                    });
                }
            }
            else if (network.network_type === 'bluesky') {
                // Kontrola, zda tělo požadavku obsahuje Bluesky-specifické tokeny
                if ('handle' in requestBody && 'password' in requestBody) {
                    // Nejprve vymazání stávajících tokenů
                    await prisma.networkToken.deleteMany({
                        where: {
                            network_id: networkId
                        }
                    });
                    // Přidání Bluesky tokenů
                    const blueskyTokens = requestBody;
                    await prisma.networkToken.createMany({
                        data: [
                            {
                                network_id: networkId,
                                token_name: 'handle',
                                token: blueskyTokens.handle
                            },
                            {
                                network_id: networkId,
                                token_name: 'password',
                                token: blueskyTokens.password
                            }
                        ]
                    });
                    return reply.status(200).send({
                        success: true,
                        message: 'Bluesky tokeny byly úspěšně přidány'
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro Bluesky síť jsou vyžadovány tokeny: handle, password'
                    });
                }
            }
            else if (network.network_type === 'twitter') {
                // Kontrola, zda tělo požadavku obsahuje Twitter-specifické tokeny
                if ('apiKey' in requestBody && 'apiSecret' in requestBody && 'accessToken' in requestBody && 'accessTokenSecret' in requestBody) {
                    // Nejprve vymazání stávajících tokenů
                    await prisma.networkToken.deleteMany({
                        where: {
                            network_id: networkId
                        }
                    });
                    // Přidání Twitter tokenů
                    const twitterTokens = requestBody;
                    await prisma.networkToken.createMany({
                        data: [
                            {
                                network_id: networkId,
                                token_name: 'api_key',
                                token: twitterTokens.apiKey
                            },
                            {
                                network_id: networkId,
                                token_name: 'api_secret',
                                token: twitterTokens.apiSecret
                            },
                            {
                                network_id: networkId,
                                token_name: 'access_token',
                                token: twitterTokens.accessToken
                            },
                            {
                                network_id: networkId,
                                token_name: 'access_token_secret',
                                token: twitterTokens.accessTokenSecret
                            }
                        ]
                    });
                    return reply.status(200).send({
                        success: true,
                        message: 'Twitter tokeny byly úspěšně přidány'
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro Twitter síť jsou vyžadovány tokeny: apiKey, apiSecret, accessToken, accessTokenSecret'
                    });
                }
            }
            else if (network.network_type === 'threads') {
                // Kontrola, zda tělo požadavku obsahuje Threads-specifické tokeny
                if ('threadsUserId' in requestBody && 'threadsAppSecret' in requestBody && 'longLivedAccessToken' in requestBody) {
                    // Nejprve vymazání stávajících tokenů
                    await prisma.networkToken.deleteMany({
                        where: {
                            network_id: networkId
                        }
                    });
                    // Přidání Threads tokenů
                    const threadsTokens = requestBody;
                    const now = Date.now().toString();
                    await prisma.networkToken.createMany({
                        data: [
                            {
                                network_id: networkId,
                                token_name: 'threadsUserId',
                                token: threadsTokens.threadsUserId
                            },
                            {
                                network_id: networkId,
                                token_name: 'threadsAppSecret',
                                token: threadsTokens.threadsAppSecret
                            },
                            {
                                network_id: networkId,
                                token_name: 'longLivedAccessToken',
                                token: threadsTokens.longLivedAccessToken
                            },
                            {
                                network_id: networkId,
                                token_name: 'longLivedAccessTokenTimestamp',
                                token: now
                            }
                        ]
                    });
                    return reply.status(200).send({
                        success: true,
                        message: 'Threads tokeny byly úspěšně přidány'
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro Threads síť jsou vyžadovány tokeny: threadsUserId, threadsAppSecret, longLivedAccessToken'
                    });
                }
            }
            else {
                // Zpracování obecných tokenů pro ostatní typy sítí
                if ('tokens' in requestBody) {
                    // Nejprve vymazání stávajících tokenů
                    await prisma.networkToken.deleteMany({
                        where: {
                            network_id: networkId
                        }
                    });
                    // Přidání nových tokenů
                    const tokenData = requestBody.tokens.map(token => ({
                        network_id: networkId,
                        token_name: token.tokenName,
                        token: token.token
                    }));
                    await prisma.networkToken.createMany({
                        data: tokenData
                    });
                    return reply.status(200).send({
                        success: true,
                        message: `Přidáno ${requestBody.tokens.length} tokenů k síti`
                    });
                }
                else {
                    return reply.status(400).send({
                        error: 'Pro tuto síť je vyžadováno pole tokenů'
                    });
                }
            }
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    // List tokens in the network
    fastify.get('/network/:networkId/listtokens', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání seznamu názvů tokenů v síti',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            response: {
                200: typebox_1.Type.Array(schemas_1.NetworkTokenName)
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Seznam přihlašovacích údajů v síti
            const tokens = await prisma.networkToken.findMany({
                where: {
                    network_id: networkId
                }
            });
            reply.status(200).send(tokens.map(token => ({
                tokenName: token.token_name
            })));
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    /**
     * Odebrání všech tokenů ze sítě
     * Může provést pouze majitel sítě
     */
    // Odebrání všech tokenů ze sítě
    fastify.delete('/network/:networkId/removetoken', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Smazání všech tokenů ze sítě',
            tags: ['network'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            response: {
                200: { success: true, message: typebox_1.Type.String() }
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            if (network.owner_id !== request.session.userId)
                return reply.status(403).send({ error: 'Forbidden' });
            // Odebrání všech tokenů ze sítě
            const deletedTokens = await prisma.networkToken.deleteMany({
                where: {
                    network_id: networkId
                }
            });
            reply.status(200).send({
                success: true,
                message: `Odstraněno ${deletedTokens.count} tokenů ze sítě`
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    // Get paginated posts for a network
    fastify.get('/network/:networkId/posts', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání stránkovaného seznamu příspěvků postovaných na konkrétní síť',
            tags: ['network', 'post'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer()
            }),
            querystring: typebox_1.Type.Object({
                page: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1 })),
                limit: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, maximum: 100 }))
            }),
            response: {
                200: schemas_1.PaginatedDetailedPosts
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId } = request.params;
            const page = request.query.page || 1;
            const limit = request.query.limit || 10;
            const offset = (page - 1) * limit;
            // Kontrola, zda je uživatel majitelem sítě nebo má oprávnění
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            // Kontrola, zda je uživatel majitel nebo má přístup přes NetworksUsers
            let hasAccess = network.owner_id === request.session.userId;
            if (!hasAccess) {
                const userAccess = await prisma.networksUsers.findFirst({
                    where: {
                        networks_id: networkId,
                        grantee_id: request.session.userId
                    }
                });
                hasAccess = !!userAccess;
            }
            if (!hasAccess)
                return reply.status(403).send({ error: 'Forbidden' });
            // Získání celkového počtu
            const totalCount = await prisma.postedContent.count({
                where: {
                    networks_id: networkId
                }
            });
            // Získání příspěvků včetně jejich obsahu a příloh
            const postedContents = await prisma.postedContent.findMany({
                where: {
                    networks_id: networkId
                },
                include: {
                    posts: {
                        include: {
                            attachments: true,
                            users: {
                                select: {
                                    id: true,
                                    username: true,
                                    displayname: true
                                }
                            }
                        }
                    },
                    contents: true,
                    posted_content_has_attachments: {
                        include: {
                            attachments: true
                        }
                    }
                },
                orderBy: {
                    post_date: 'desc',
                },
                skip: offset,
                take: limit
            });
            // Skupinové zpracování podle ID příspěvku a vytvoření struktur PostDetail
            const postsMap = new Map();
            postedContents.forEach(pc => {
                const postId = pc.posts_id;
                if (!postsMap.has(postId)) {
                    postsMap.set(postId, {
                        postId: postId,
                        creator: {
                            id: pc.posts.users.id,
                            username: pc.posts.users.username,
                            displayname: pc.posts.users.displayname
                        },
                        contents: [],
                        attachments: [],
                        editors: [], // Prázdné pro příspěvky v síti, protože tyto informace zde nejsou k dispozici
                        scheduledTimes: []
                    });
                }
                const post = postsMap.get(postId);
                // Přidání obsahu s odpovídající strukturou PostContent
                post.contents.push({
                    id: pc.contents_id,
                    postId: postId,
                    content: pc.contents.content,
                    linkedNetworks: [networkId],
                    canEdit: false // To vyžaduje správnou kontrolu oprávnění
                });
                // Přidání informací o naplánovaném čase
                post.scheduledTimes.push({
                    networkId: networkId,
                    contentId: pc.contents_id,
                    postDate: pc.post_date?.toISOString(),
                    actualPostDate: pc.actual_post_date?.toISOString(),
                    networkPostId: pc.network_post_id || undefined
                });
                // Přidání příloh pro tento zveřejněný obsah
                pc.posted_content_has_attachments.forEach(pca => {
                    const fileName = pca.attachments.path.split('/').pop() || pca.attachments.path;
                    const existingAttachment = post.attachments.find(a => a.id === pca.attachments_id);
                    if (!existingAttachment) {
                        post.attachments.push({
                            id: pca.attachments_id,
                            postId: postId,
                            fileName: fileName,
                            linkedNetworks: [networkId]
                        });
                    }
                });
            });
            const posts = Array.from(postsMap.values());
            const totalPages = Math.ceil(totalCount / limit);
            reply.status(200).send({
                posts: posts,
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalCount,
                    totalPages: totalPages
                }
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    // Get specific post detail for a network
    fastify.get('/network/:networkId/posts/:postId', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání detailu konkrétního příspěvku postovaného na síť',
            tags: ['network', 'post'],
            params: typebox_1.Type.Object({
                networkId: typebox_1.Type.Integer(),
                postId: typebox_1.Type.Integer()
            }),
            response: {
                200: schemas_1.PostDetail
            }
        },
    }, async (request, reply) => {
        try {
            const { networkId, postId } = request.params;
            // Kontrola, zda je uživatel majitelem sítě nebo má oprávnění
            const network = await (0, helpers_1.getNetwork)(networkId);
            if (!network)
                return reply.status(404).send({ error: 'Network not found' });
            // Kontrola, zda je uživatel majitel nebo má přístup přes NetworksUsers
            let hasAccess = network.owner_id === request.session.userId;
            if (!hasAccess) {
                const userAccess = await prisma.networksUsers.findFirst({
                    where: {
                        networks_id: networkId,
                        grantee_id: request.session.userId
                    }
                });
                hasAccess = !!userAccess;
            }
            if (!hasAccess)
                return reply.status(403).send({ error: 'Forbidden' });
            // Získání obsahu příspěvku pro tuto konkrétní síť
            const postedContents = await prisma.postedContent.findMany({
                where: {
                    networks_id: networkId,
                    posts_id: postId
                },
                include: {
                    posts: {
                        include: {
                            users: {
                                select: {
                                    id: true,
                                    username: true,
                                    displayname: true
                                }
                            }
                        }
                    },
                    contents: true,
                    posted_content_has_attachments: {
                        include: {
                            attachments: true
                        }
                    }
                }
            });
            if (postedContents.length === 0) {
                return reply.status(404).send({ error: 'Post not found on this network' });
            }
            const post = postedContents[0].posts;
            const contents = [];
            const attachments = [];
            const scheduledTimes = [];
            postedContents.forEach(pc => {
                // Přidání obsahu se strukturou PostContent
                contents.push({
                    id: pc.contents_id,
                    postId: postId,
                    content: pc.contents.content,
                    linkedNetworks: [networkId],
                    canEdit: false
                });
                // Přidání informací o naplánovaném čase
                scheduledTimes.push({
                    networkId: networkId,
                    contentId: pc.contents_id,
                    postDate: pc.post_date?.toISOString(),
                    actualPostDate: pc.actual_post_date?.toISOString(),
                    networkPostId: pc.network_post_id || undefined
                });
                // Přidání příloh
                pc.posted_content_has_attachments.forEach(pca => {
                    const fileName = pca.attachments.path.split('/').pop() || pca.attachments.path;
                    const existingAttachment = attachments.find(a => a.id === pca.attachments_id);
                    if (!existingAttachment) {
                        attachments.push({
                            id: pca.attachments_id,
                            postId: postId,
                            fileName: fileName,
                            linkedNetworks: [networkId]
                        });
                    }
                });
            });
            reply.status(200).send({
                postId: post.id,
                creator: {
                    id: post.users.id,
                    username: post.users.username,
                    displayname: post.users.displayname
                },
                contents: contents,
                attachments: attachments,
                editors: [], // Prázdné pro příspěvky v síti, protože tyto informace zde nejsou k dispozici
                scheduledTimes: scheduledTimes
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
    // Get networks available for linking content to a post
    fastify.get('/post/:postId/availablenetworks', {
        preValidation: helpers_1.isAuthenticated,
        schema: {
            description: 'Získání seznamu networků dostupných pro linkování contentu k příspěvku. Vrací pouze ty networky, které vlastní tvůrce příspěvku a ke kterým má aktuální uživatel přístup.',
            tags: ['post', 'network'],
            params: typebox_1.Type.Object({
                postId: typebox_1.Type.Integer()
            }),
            response: {
                200: typebox_1.Type.Array(schemas_1.Network)
            }
        },
    }, async (request, reply) => {
        try {
            const { postId } = request.params;
            const currentUserId = request.session.userId;
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });
            if (!post) {
                return reply.status(404).send({ error: 'Post not found' });
            }
            // Získáme všechny networky, ke kterým má aktuální uživatel přístup (vlastní + write oprávnění)
            const userNetworkAccess = await prisma.networksUsers.findMany({
                where: {
                    grantee_id: currentUserId,
                    permission: 'write'
                }
            });
            const ownedNetworks = await prisma.network.findMany({
                where: {
                    owner_id: currentUserId
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            });
            const accessibleNetworkIds = userNetworkAccess.map(access => access.networks_id);
            const accessibleNetworks = accessibleNetworkIds.length > 0 ? await prisma.network.findMany({
                where: {
                    id: {
                        in: accessibleNetworkIds
                    }
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                }
            }) : [];
            // Spojíme vlastní networky a networky s write oprávněním pro aktuálního uživatele
            const currentUserNetworks = [...ownedNetworks];
            accessibleNetworks.forEach(network => {
                if (!ownedNetworks.some(owned => owned.id === network.id)) {
                    currentUserNetworks.push(network);
                }
            });
            // Získáme všechny networky dostupné tvůrci příspěvku (vlastní + write oprávnění)
            const creatorNetworkAccess = await prisma.networksUsers.findMany({
                where: {
                    grantee_id: post.creator_id,
                    permission: 'write'
                }
            });
            const creatorOwnedNetworks = await prisma.network.findMany({
                where: {
                    owner_id: post.creator_id
                }
            });
            const creatorAccessibleNetworkIds = creatorNetworkAccess.map(access => access.networks_id);
            const creatorAccessibleNetworks = creatorAccessibleNetworkIds.length > 0 ? await prisma.network.findMany({
                where: {
                    id: {
                        in: creatorAccessibleNetworkIds
                    }
                }
            }) : [];
            // Spojíme networky dostupné tvůrci příspěvku
            const allCreatorNetworks = [...creatorOwnedNetworks];
            creatorAccessibleNetworks.forEach(network => {
                if (!creatorOwnedNetworks.some(owned => owned.id === network.id)) {
                    allCreatorNetworks.push(network);
                }
            });
            const creatorNetworkIds = allCreatorNetworks.map(n => n.id);
            // Najdeme průsečík - networky, ke kterým mají přístup OBA uživatelé
            const commonNetworks = currentUserNetworks.filter(network => creatorNetworkIds.includes(network.id));
            const availableNetworks = commonNetworks.map(network => ({
                networkId: network.id,
                networkType: network.network_type,
                networkName: network.network_name,
                owner: {
                    id: network.users.id,
                    username: network.users.username,
                    displayname: network.users.displayname
                },
                note: network.owner_id === currentUserId ? (network.note || undefined) : undefined,
                permission: network.owner_id === currentUserId ? 'admin' : 'write'
            }));
            reply.status(200).send(availableNetworks);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
}
exports.default = routes;

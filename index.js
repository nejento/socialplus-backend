"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("./src/generated/client");
const session_1 = require("@fastify/session");
const cookie_1 = require("@fastify/cookie");
const static_1 = __importDefault(require("@fastify/static"));
const swagger_1 = require("@fastify/swagger");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
const PostScheduler_1 = require("./src/social/PostScheduler");
const ThreadsTokenManager_1 = require("./src/social/ThreadsTokenManager");
const MonitoringConfig_1 = require("./src/utils/MonitoringConfig");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv_1.default.config();
/**
 * Konfigurace loggeru podle prostředí
 */
const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: {
        level: 'info',
        transport: {
            target: 'pino/file',
            options: {
                destination: path.join(process.env.LOGS_DIR || './logs', 'socialplus.log'),
                mkdir: true,
            }
        }
    },
    test: false
};
// Prisma ORM
const prisma = new client_1.PrismaClient();
// Plánovač příspěvků
const postScheduler = new PostScheduler_1.PostScheduler(prisma, parseInt(process.env.SCHEDULER_CHECK_INTERVAL || "1"));
// Monitorování výkonu
const monitoringConfig = MonitoringConfig_1.MonitoringConfig.getInstance();
// Konfigurace HTTP/2 a SSL pro Fastify server
const serverOptions = {
    logger: envToLogger[process.env.NODE_ENV ?? "production"]
};
// Zjisti, zda jsou SSL certifikáty k dispozici
const hasSSLCertificates = process.env.SSL_CERT_PATH && process.env.SSL_KEY_PATH;
// Pokud jsou nastaveny SSL certifikáty, použij HTTP/2 s SSL
if (hasSSLCertificates) {
    try {
        const sslKeyPath = process.env.SSL_KEY_PATH;
        const sslCertPath = process.env.SSL_CERT_PATH;
        serverOptions.https = {
            key: fs.readFileSync(sslKeyPath),
            cert: fs.readFileSync(sslCertPath)
        };
        serverOptions.http2 = true;
        console.log('HTTP/2 with SSL enabled');
    }
    catch (error) {
        console.error('Failed to load SSL certificates, falling back to HTTP/1.1:', error);
    }
}
// Hlavní server (HTTPS pokud jsou SSL certifikáty, jinak HTTP)
const server = (0, fastify_1.default)(serverOptions);
// Middleware pro automatické přesměrování HTTP na HTTPS (pokud je SSL aktivní)
if (hasSSLCertificates && serverOptions.https) {
    server.addHook('onRequest', async (request, reply) => {
        // Zkontroluje, zda je požadavek přes HTTPS
        const isSecure = request.headers['x-forwarded-proto'] === 'https' ||
            request.protocol === 'https' ||
            (request.socket && request.socket.encrypted);
        // Pokud není zabezpečený a není to lokální development, přesměruj na HTTPS
        if (!isSecure && process.env.NODE_ENV === 'production') {
            const httpsUrl = `https://${request.hostname}${request.url}`;
            reply.code(301).redirect(httpsUrl);
            return;
        }
    });
}
// Content Security Policy middleware pro ochranu proti CSS a dalším útoky
server.addHook('onSend', async (request, reply, payload) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development';
    // Základní CSP direktivy
    const cspDirectives = {
        'default-src': ["'self'"],
        'script-src': [
            "'self'",
            ...(isDevelopment ? ["'unsafe-eval'", "'unsafe-inline'"] : [])
        ],
        'style-src': [
            "'self'",
            "'unsafe-inline'" // Potřebné pro React inline styly
        ],
        'style-src-elem': [
            "'self'",
            "'unsafe-inline'"
        ],
        'font-src': [
            "'self'",
            'data:'
        ],
        'img-src': [
            "'self'",
            'data:',
            'blob:',
            // Pro přílohy
            `${request.protocol}://${request.hostname}`,
            ...(isDevelopment ? ['*'] : [])
        ],
        'media-src': [
            "'self'",
            'data:',
            'blob:'
        ],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'frame-src': ["'none'"],
        'worker-src': ["'self'", 'blob:'],
        'manifest-src': ["'self'"],
        'connect-src': [
            "'self'",
            // Pro API komunikaci
            `${request.protocol}://${request.hostname}`,
            ...(isDevelopment ? ['http:', 'https:'] : [])
        ]
    };
    // Sestaví CSP string
    const cspString = Object.entries(cspDirectives)
        .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
        .join('; ');
    // Nastaví CSP header
    reply.header('Content-Security-Policy', cspString);
    // Dodatečné bezpečnostní hlavičky
    reply.header('X-Content-Type-Options', 'nosniff');
    reply.header('X-Frame-Options', 'DENY');
    reply.header('X-XSS-Protection', '1; mode=block');
    reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    reply.header('Permissions-Policy', ''); // (žádné speciální API není používáno, ale vyžadováno pro Security Headers report)
    // HSTS (HTTP Strict Transport Security) header
    if (hasSSLCertificates && serverOptions.https) {
        // Pokud jsou SSL certifikáty k dispozici, nastav HSTS
        const hstsMaxAge = parseInt(process.env.HSTS_MAX_AGE || '31536000'); // 1 rok ve výchozím nastavení
        const includeSubDomains = process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false'; // výchozí true
        const preload = process.env.HSTS_PRELOAD === 'true'; // výchozí false
        let hstsHeader = `max-age=${hstsMaxAge}`;
        if (includeSubDomains) {
            hstsHeader += '; includeSubDomains';
        }
        if (preload) {
            hstsHeader += '; preload';
        }
        reply.header('Strict-Transport-Security', hstsHeader);
        // Log HSTS configuration pouze při prvním spuštění
        if (isProduction) {
            server.log.debug(`[Security] HSTS enabled: ${hstsHeader}`);
        }
    }
    return payload;
});
server.register(cookie_1.fastifyCookie);
// CORS configuration - kontroluje, kdo může volat API endpointy
server.register(cors_1.default, {
    origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];
        const restrictCors = process.env.CORS_RESTRICT === 'true';
        // Pokud není explicitně nastaveno omezení CORS, povolí všechny origins
        if (!restrictCors) {
            callback(null, true);
            return;
        }
        // Pokud je CORS omezení aktivní, kontroluje povolené origins
        if (!origin) {
            // Povolí requesty bez Origin header (např. Postman, server-to-server, mobile apps)
            callback(null, true);
            return;
        }
        const serverHost = process.env.SERVER_HOST || 'localhost';
        const serverPort = process.env.SERVER_PORT || '8080';
        const protocol = hasSSLCertificates ? 'https' : 'http';
        const selfOrigin = `${protocol}://${serverHost}:${serverPort}`;
        // Vždy povolí requesty ze stejného serveru (self)
        if (origin === selfOrigin || origin === `${protocol}://${serverHost}`) {
            callback(null, true);
            return;
        }
        // Kontroluje explicitně povolené origins
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        // Zamítne nepovolené origins pouze pokud je CORS omezení aktivní
        server.log.warn(`[Security] CORS blocked request from origin: ${origin}`);
        callback(new Error('CORS policy violation'), false);
    },
    credentials: true, // Povolí cookies a auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apiKey', 'X-Requested-With'],
    optionsSuccessStatus: 200 // Některé starší browsery potřebují 200 pro OPTIONS
});
server.register(session_1.fastifySession, {
    cookieName: 'sessionId', // název cookie pro uložení session ID
    secret: process.env.SESSION_SECRET ?? "secret",
    cookie: {
        secure: process.env.NODE_ENV === "production", // nastavit na true v produkci
        httpOnly: true,
        //maxAge: 1000 * 60 * 60 * 24, // 1 den
        sameSite: true,
    }
});
server.register(multipart_1.default);
// Servování statických souborů pro frontend (Vite React build)
server.register(static_1.default, {
    root: `${__dirname}/static`,
    prefix: '/', // Servuje z kořenové cesty
    cacheControl: true,
    etag: true,
    maxAge: 86400, // 24 hodin cache pro statické soubory
    index: ['index.html'] // Výchozí soubor k servování
});
/**
 * SPA fallback - přesměruje všechny non-API routes na index.html
 */
server.setNotFoundHandler((request, reply) => {
    // Aplikuje SPA fallback pouze na non-API routes
    if (request.url.startsWith('/api/') || request.url.startsWith('/uploads/') || request.url.startsWith('/docs')) {
        reply.code(404).send({ error: 'Not Found' });
        return;
    }
    // Servuje index.html pro SPA routes
    return reply.sendFile('index.html');
});
// Swagger
const isHttps = process.env.SSL_CERT_PATH && process.env.SSL_KEY_PATH;
const protocol = isHttps ? 'https' : 'http';
const swaggerHost = process.env.SERVER_HOST || 'localhost';
server.register(swagger_1.fastifySwagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'SocialPlus Backend API',
            description: 'API a vývojové endpointy pro aplikaci SocialPlus',
            version: '1.0.0'
        },
        servers: [
            {
                url: `${protocol}://${swaggerHost}:${process.env.SERVER_PORT || "8080"}`,
                description: isHttps ? 'HTTPS server with HTTP/2' : 'HTTP server'
            }
        ],
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'network', description: 'Network management related end-points' },
            { name: 'post', description: 'Post related end-points' },
            { name: 'scheduler', description: 'Post scheduler management end-points' },
            { name: 'monitor', description: 'Performance monitoring end-points' }
        ],
        components: {
            securitySchemes: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            }
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        }
    }
});
server.register(swagger_ui_1.default, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
    },
    uiHooks: {
        onRequest: (request, reply, next) => { next(); },
        preHandler: (request, reply, next) => { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true
});
// Routes
const user_1 = __importDefault(require("./src/routes/user"));
server.register(user_1.default, { prefix: '/api' });
const manager_1 = __importDefault(require("./src/routes/manager"));
server.register(manager_1.default, { prefix: '/api' });
const api_1 = __importDefault(require("./src/routes/api"));
server.register(api_1.default, { prefix: '/api' });
const scheduler_1 = __importDefault(require("./src/routes/scheduler"));
server.register(scheduler_1.default, { prefix: '/api' });
const monitor_1 = __importDefault(require("./src/routes/monitor"));
server.register(monitor_1.default, { prefix: '/api/monitor' });
// Spuštění serveru
const serverHost = process.env.SERVER_HOST || '127.0.0.1';
const serverPort = parseInt(process.env.SERVER_PORT || "8080");
server.listen({
    host: serverHost,
    port: serverPort
}, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    // Log successful bind
    server.log.info(`[SocialPlus] Server successfully bound to ${serverHost}:${serverPort}`);
    server.log.info(`[SocialPlus] Server listening at ${address}`);
    if (hasSSLCertificates && serverOptions.https) {
        server.log.info(`[SocialPlus] HTTPS enabled with automatic HTTP to HTTPS redirect`);
    }
    // Spustí plánovač příspěvků
    postScheduler.start();
    server.log.info(`[SocialPlus] Post scheduler started`);
    // Inicializuje a spustí Threads token manager a monitorování výkonu
    main().then(() => {
        server.log.info(`[SocialPlus] Application initialization completed`);
    }).catch((error) => {
        server.log.error({ err: error }, '[SocialPlus] Failed to initialize application:');
        process.exit(1);
    });
});
/**
 * Hlavní inicializační funkce aplikace
 * Spouští token managery a monitorovací služby
 */
async function main() {
    // Inicializuje scheduler a další startup úlohy
    server.log.info('[SocialPlus] Initializing application...');
    // Inicializuje existující token timestamps pro Threads sítě, které je nemají
    await ThreadsTokenManager_1.threadsTokenManager.initializeExistingTokenTimestamps();
    // Spustí periodickou kontrolu obnovení tokenů
    ThreadsTokenManager_1.threadsTokenManager.startPeriodicRefresh();
    server.log.info('[SocialPlus] Threads token manager started');
    // Inicializuje službu monitorování výkonu
    try {
        await monitoringConfig.initializeMonitoring();
        server.log.info('[SocialPlus] Performance monitoring service started successfully');
    }
    catch (error) {
        server.log.error({ err: error }, '[SocialPlus] Failed to start performance monitoring service:');
        // Neukončuje aplikaci, pokud monitorování selže - není kritické pro základní funkcionalitu
        server.log.warn('[SocialPlus] Application will continue without performance monitoring');
    }
}
// Graceful shutdown
process.on('SIGINT', async () => {
    server.log.info('[SocialPlus] Shutting down gracefully...');
    postScheduler.stop();
    ThreadsTokenManager_1.threadsTokenManager.stopPeriodicRefresh();
    // Stop performance monitoring
    try {
        await monitoringConfig.stopMonitoring();
        server.log.info('[SocialPlus] Performance monitoring service stopped');
    }
    catch (error) {
        server.log.error({ err: error }, '[SocialPlus] Error stopping performance monitoring:');
    }
    await prisma.$disconnect();
    process.exit(0);
});

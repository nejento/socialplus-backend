"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.setLogger = setLogger;
exports.getLogger = getLogger;
const pino_1 = __importDefault(require("pino"));
/**
 * Globální logger instance
 */
let loggerInstance = null;
/**
 * Nastaví globální logger instanci z Fastify serveru
 * @param fastifyInstance - Instance Fastify serveru s nakonfigurovaným loggerem
 */
function setLogger(fastifyInstance) {
    // Cast Fastify logger to pino.Logger since they're compatible
    loggerInstance = fastifyInstance.log;
}
/**
 * Vrátí globální logger instanci
 * Pokud není logger nastaven, vytvoří výchozí pino logger
 * @returns Logger instance
 */
function getLogger() {
    if (!loggerInstance) {
        // Fallback logger pro případy, kdy není Fastify server inicializován
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
            production: { level: 'info' },
            test: { level: 'silent' }
        };
        const env = process.env.NODE_ENV || 'production';
        loggerInstance = (0, pino_1.default)(envToLogger[env]);
    }
    return loggerInstance;
}
/**
 * Export defaultního logger pro přímé použití
 */
exports.logger = {
    get instance() {
        return getLogger();
    },
    info: (...args) => getLogger().info(...args),
    error: (...args) => getLogger().error(...args),
    warn: (...args) => getLogger().warn(...args),
    debug: (...args) => getLogger().debug(...args),
    trace: (...args) => getLogger().trace(...args),
    fatal: (...args) => getLogger().fatal(...args),
};

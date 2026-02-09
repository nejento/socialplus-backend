import { FastifyInstance } from 'fastify';
import pino, { type Logger } from 'pino';

/**
 * Globální logger instance
 */
let loggerInstance: Logger | null = null;

/**
 * Nastaví globální logger instanci z Fastify serveru
 * @param fastifyInstance - Instance Fastify serveru s nakonfigurovaným loggerem
 */
export function setLogger(fastifyInstance: FastifyInstance): void {
  // Cast Fastify logger to pino.Logger since they're compatible
  loggerInstance = fastifyInstance.log as Logger;
}

/**
 * Vrátí globální logger instanci
 * Pokud není logger nastaven, vytvoří výchozí pino logger
 * @returns Logger instance
 */
export function getLogger(): Logger {
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

    const env = (process.env.NODE_ENV as keyof typeof envToLogger) || 'production';
    loggerInstance = pino(envToLogger[env]);
  }

  return loggerInstance;
}

/**
 * Export defaultního logger pro přímé použití
 */
export const logger = {
  get instance() {
    return getLogger();
  },
  info: (...args: Parameters<Logger['info']>) => getLogger().info(...args),
  error: (...args: Parameters<Logger['error']>) => getLogger().error(...args),
  warn: (...args: Parameters<Logger['warn']>) => getLogger().warn(...args),
  debug: (...args: Parameters<Logger['debug']>) => getLogger().debug(...args),
  trace: (...args: Parameters<Logger['trace']>) => getLogger().trace(...args),
  fatal: (...args: Parameters<Logger['fatal']>) => getLogger().fatal(...args),
};

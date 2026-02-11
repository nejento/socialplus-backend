import { PrismaClient } from '../generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

/**
 * Create a new PrismaClient instance with MySQL adapter for Prisma 7.x
 * @param connectionString - Optional database connection string (defaults to process.env.DATABASE_URL)
 */
export function createPrismaClient(connectionString?: string): PrismaClient {
  const dbUrl = connectionString || process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Parse the connection string to extract connection parameters
  // Format: mysql://user:password@host:port/database
  const url = new URL(dbUrl);
  
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading slash
  });

  return new PrismaClient({ adapter });
}

/**
 * Shared Prisma client instance
 */
export const prisma = createPrismaClient();

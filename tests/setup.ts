// Jest setup soubor
import { jest } from '@jest/globals';

// Mock proměnné prostředí
process.env.SESSION_SECRET = 'test_secret';
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/test';

// Mock bcrypt
jest.mock('bcrypt');

// Mock Prisma Client
jest.mock('../src/generated/client');

// Mock operace se soubory
jest.mock('fs');

// Mock operace s cestami
jest.mock('path');

// Globální timeout testů
jest.setTimeout(30000);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Jest setup soubor
const globals_1 = require("@jest/globals");
// Mock proměnné prostředí
process.env.SESSION_SECRET = 'test_secret';
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/test';
// Mock bcrypt
globals_1.jest.mock('bcrypt');
// Mock Prisma Client
globals_1.jest.mock('../src/generated/client');
// Mock operace se soubory
globals_1.jest.mock('fs');
// Mock operace s cestami
globals_1.jest.mock('path');
// Globální timeout testů
globals_1.jest.setTimeout(30000);

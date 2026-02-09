# Testovací dokumentace pro SocialPlus Fastify Backend

Tato dokumentace poskytuje kompletní přehled testovací strategie, architektury a implementace testů pro SocialPlus Fastify Backend aplikaci.

## 📋 Obsah

- [Přehled testování](#přehled-testování)
- [Testovací architektura](#testovací-architektura)
- [Mocking strategie](#mocking-strategie)
- [Typy testů](#typy-testů)
- [Instalace a konfigurace](#instalace-a-konfigurace)
- [Spuštění testů](#spuštění-testů)
- [Struktura testů](#struktura-testů)
- [Pokrytí kódu](#pokrytí-kódu)
- [Best practices](#best-practices)

## 🎯 Přehled testování

### Filozofie testování

Projekt využívá **comprehensive mocking approach** - kompletní izolaci jednotlivých komponent prostřednictvím mocků. Tato strategie zajišťuje:

- **Rychlé spuštění testů** - bez závislostí na databázi nebo externích službách
- **Deterministické výsledky** - testy nejsou ovlivněny vnějšími faktory
- **Izolované testování** - každá komponenta je testována nezávisle
- **Snadnou údržbu** - změny v jedné komponentě neovlivní testy jiných komponent

### Proč používáme mocking?

1. **Externé závislosti**: Aplikace komunikuje s několika sociálními sítěmi (Facebook, Twitter, Instagram, Threads, Mastodon, Bluesky)
2. **Databázové operace**: Komplexní databázové schéma s mnoha entitami vyžaduje konzistentní testovací prostředí
3. **Asynchronní operace**: Plánování příspěvků a monitoring výkonu obsahuje časové závislosti
4. **Bezpečnost**: Testy nesmí používat skutečné API klíče nebo posílat data na produkční servery

## 🏗️ Testovací architektura

### Framework a nástroje

- **Jest** - Hlavní testovací framework s TypeScript podporou
- **ts-jest** - TypeScript preset pro Jest
- **Supertest** - HTTP testování pro API endpointy
- **@types/jest** - TypeScript definice pro Jest
- **@types/supertest** - TypeScript definice pro Supertest

### Konfigurace

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/generated/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
```

## 🎭 Mocking strategie

### 1. Databázové mocky (Prisma)

Kompletní mockování Prisma klienta pro všechny databázové operace:

```typescript
const mockPostMethods = {
  create: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  findMany: jest.fn(),
  count: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../src/generated/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    post: mockPostMethods,
    content: mockContentMethods,
    // ... další entity
    $disconnect: jest.fn(),
  })),
}));
```

### 2. Sociální sítě mocky

Mockování všech poskytovatelů sociálních sítí:

```typescript
const mockProvider = {
  validateTokens: jest.fn(),
  sendPost: jest.fn(),
  networkType: 'facebook',
  getRequiredTokens: jest.fn(),
  getPostPerformance: jest.fn(),
  getMonitoringInterval: jest.fn(),
};

jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
  SocialNetworkProviderFactory: {
    getProvider: jest.fn().mockReturnValue(mockProvider),
  },
}));
```

### 3. Systémové mocky

Mockování systémových závislostí:

```typescript
// File system operations
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

// Logger mock
jest.mock('../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }
}));
```

### 4. HTTP klient mocky

Mockování externích HTTP požadavků:

```typescript
jest.mock('axios', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
```

## 🧪 Typy testů

### 1. Základní testy (`basic.test.ts`)

- **Účel**: Ověření základní funkčnosti testovacího prostředí
- **Co testuje**: Jest konfiguraci, základní mocking funkcionalitu
- **Příklad**: Jednoduchý mock test s očekávaným chováním

### 2. API testy (`api.test.ts`)

- **Účel**: Testování všech HTTP endpointů aplikace
- **Co testuje**: 
  - CRUD operace pro příspěvky
  - Autentizace a autorizace
  - Správa příloh
  - Validace vstupních dat
  - HTTP status kódy a response formáty

### 3. Integrační testy (`integration.test.ts`)

- **Účel**: Testování interakce mezi komponentami
- **Co testuje**:
  - Flow vytvoření a publikace příspěvku
  - Koordinace mezi schedularem a providery
  - Zpracování chyb napříč komponentami

### 4. Manager testy (`manager.test.ts`)

- **Účel**: Testování správy uživatelů a sítí
- **Co testuje**:
  - Správa účtů sociálních sítí
  - Token management
  - Uživatelská oprávnění
  - Síťové konfigurace

### 5. Scheduler testy (`scheduler.test.ts`, `postscheduler.test.ts`)

- **Účel**: Testování plánovacích mechanismů
- **Co testuje**:
  - Naplánování příspěvků
  - Časové triggery
  - Batch processing
  - Error handling a retry logika
  - Performance monitoring

### 6. Monitor testy (`monitor.test.ts`, `performancemonitor.test.ts`)

- **Účel**: Testování monitorování výkonu
- **Co testuje**:
  - Sběr metrik výkonu
  - Alerting systém
  - Performance analytics
  - System health checks

### 7. Provider testy

Specifické testy pro každou sociální síť:

#### Facebook Provider (`facebookprovider.test.ts`, `facebooktokenmanager.test.ts`)
- **Co testuje**: Facebook API integrace, token refresh, page management

#### Twitter Provider (`twitterprovider.test.ts`)
- **Co testuje**: Twitter API v2, media upload, thread posting

#### Threads Provider (`threadsprovider.test.ts`, `threadstokenmanager.test.ts`)
- **Co testuje**: Instagram Threads API, content publishing

#### Mastodon Provider (`mastodonprovider.test.ts`)
- **Co testuje**: Mastodon instance API, federated posting

#### Bluesky Provider (`blueskyprovider.test.ts`)
- **Co testuje**: AT Protocol, Bluesky social posting

### 8. Factory testy (`socialnetworkproviderfactory.test.ts`)

- **Účel**: Testování factory pattern pro providery
- **Co testuje**:
  - Správná instanciation providerů
  - Provider discovery
  - Configuration management

### 9. Uživatelské testy (`user.test.ts`)

- **Účel**: Testování uživatelské správy
- **Co testuje**:
  - Registrace a autentizace
  - Profil management
  - Oprávnění a role

## 🚀 Instalace a konfigurace

### Instalace testovacích závislostí

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### Konfigurace package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## 🎬 Spuštění testů

### Základní příkazy

```bash
# Spuštění všech testů
npm test

# Spuštění konkrétního testu
npm test -- api.test.ts

# Spuštění testů podle patternu
npm test -- --testNamePattern="POST /api/posts"

# Spuštění testů v watch módu
npm run test:watch

# Spuštění testů s coverage reportem
npm run test:coverage

# Spuštění pro CI/CD
npm run test:ci
```

### Pokročilé možnosti

```bash
# Verbose output
npm test -- --verbose

# Spuštění pouze failed testů
npm test -- --onlyFailures

# Update snapshots
npm test -- --updateSnapshot

# Debug mode
npm test -- --debug
```

## 📁 Struktura testů

### Organizace souborů

```
tests/
├── setup.ts                           # Globální test setup
├── helpers.ts                         # Test utility funkce
├── basic.test.ts                      # Základní testy
├── api.test.ts                        # API endpoint testy
├── integration.test.ts                # Integrační testy
├── manager.test.ts                    # Manager testy
├── scheduler.test.ts                  # Základní scheduler testy
├── postscheduler.test.ts             # Detailní scheduler testy
├── monitor.test.ts                    # Monitoring testy
├── performancemonitor.test.ts        # Performance monitoring
├── user.test.ts                      # Uživatelské testy
├── socialnetworkproviderfactory.test.ts  # Factory testy
├── facebookprovider.test.ts          # Facebook provider
├── facebooktokenmanager.test.ts      # Facebook token management
├── twitterprovider.test.ts           # Twitter provider
├── threadsprovider.test.ts           # Threads provider
├── threadstokenmanager.test.ts       # Threads token management
├── mastodonprovider.test.ts          # Mastodon provider
└── blueskyprovider.test.ts           # Bluesky provider
```

### Konvence pojmenování

- **Soubory**: `{komponenta}.test.ts`
- **Test suites**: `describe('{Komponenta}', () => {})`
- **Test cases**: `it('should {action} when {condition}', () => {})`

## 📊 Pokrytí kódu

### Metriky pokrytí

Projekt sleduje následující metriky:

- **Statements**: Pokrytí jednotlivých příkazů
- **Branches**: Pokrytí všech větvení (if/else, switch)
- **Functions**: Pokrytí všech funkcí
- **Lines**: Pokrytí řádků kódu

### Cílové hodnoty

- **Statements**: ≥ 80%
- **Branches**: ≥ 75%
- **Functions**: ≥ 80%
- **Lines**: ≥ 80%

### Vygenerování reportu

```bash
npm run test:coverage
```

Report je dostupný v:
- **Terminal**: Souhrnné statistiky
- **HTML**: `coverage/lcov-report/index.html`
- **LCOV**: `coverage/lcov.info`

## 🎯 Best practices

### 1. Mock management

```typescript
// Vždy čistit mocky mezi testy
beforeEach(() => {
  jest.clearAllMocks();
});

// Restore original implementations after tests
afterEach(() => {
  jest.restoreAllMocks();
});
```

### 2. Test data patterns

```typescript
// Použití factory functions pro test data
const createMockUser = (overrides = {}) => ({
  id: 1,
  username: 'testuser',
  displayname: 'Test User',
  ...overrides,
});
```

### 3. Async testing

```typescript
// Správné testování Promise-based funkcí
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

### 4. Error testing

```typescript
// Testování error scenarios
it('should throw error when invalid input', async () => {
  await expect(functionWithError()).rejects.toThrow('Expected error message');
});
```

### 5. Mock assertions

```typescript
// Verifikace mock volání
expect(mockFunction).toHaveBeenCalledTimes(1);
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
expect(mockFunction).toHaveBeenLastCalledWith(lastExpectedArgs);
```

## 🔍 Debugging testů

### Logging v testech

```typescript
// Povolení console.log během testů
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation();
});
```

### Jest debugging

```bash
# Debug konkrétní test
node --inspect-brk node_modules/.bin/jest --runInBand api.test.ts
```

### Visual Studio Code

Konfigurace `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## 📝 Psaní nových testů

### Template pro nový test

```typescript
import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('../src/dependencies', () => ({
  Dependency: jest.fn(),
}));

import { ComponentUnderTest } from '../src/ComponentUnderTest';

describe('ComponentUnderTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('methodName', () => {
    it('should perform expected action when valid conditions', async () => {
      // Arrange
      const input = 'test-input';
      
      // Act
      const result = await componentUnderTest.methodName(input);
      
      // Assert
      expect(result).toEqual('expected-output');
    });

    it('should handle error when invalid conditions', async () => {
      // Arrange & Act & Assert
      await expect(componentUnderTest.methodName(null))
        .rejects.toThrow('Expected error message');
    });
  });
});
```

## 🔧 Troubleshooting

### Časté problémy

1. **Mock není aplikován**: Mock musí být definován před importem komponenty
2. **Async timeout**: Zvýšit timeout v jest.config.js
3. **Memory leaks**: Ujistěte se, že čistíte mocky v afterEach
4. **TypeScript errors**: Zkontrolujte @types balíčky

### Užitečné příkazy

```bash
# Vyčištění Jest cache
npx jest --clearCache

# Spuštění s detailním výstupem
npm test -- --verbose --no-cache

# Profiling slow testů
npm test -- --detectSlowTests
```

Tato dokumentace poskytuje kompletní přehled testovací strategie a implementace v SocialPlus Fastify Backend projektu. Pro specifické otázky nebo problémy konzultujte jednotlivé testovací soubory nebo kontaktujte vývojový tým.

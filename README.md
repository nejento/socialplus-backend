# SocialPlus Backend API

SocialPlus je pokročilý systém pro správu a plánování příspěvků na sociální sítě. Tento backend poskytuje kompletní API pro vytváření, editaci, plánování a publikování obsahu napříč různými sociálními platformami s pokročilým monitorováním výkonu.

---

## 🌐 Podporované sociální sítě

- **Facebook** - Kompletní podpora včetně více fotografií a metrik
- **Twitter/X** - Textové příspěvky
- **Threads** - Meta's Threads platforma
- **Mastodon** - Decentralizovaná sociální síť
- **Bluesky** - AT Protocol platforma s pokročilou kompresí obrázků

---

## 🛠️ Použité technologie

### Backend Framework
- **TypeScript** - Typově bezpečný jazyk pro JavaScript
- **Fastify** - Rychlý a efektivní webový framework
- **Prisma ORM** - Moderní ORM pro práci s databázemi (MySQL)

### API & Dokumentace
- **Swagger UI** - Interaktivní API dokumentace
- **@fastify/swagger** - OpenAPI 3.0 specifikace

### Autentizace & Bezpečnost
- **bcrypt** - Hashování hesel
- **@fastify/session** - Session management
- **@fastify/cookie** - Cookie podpora

### Sociální sítě integrace
- **@atproto/api** - Bluesky AT Protocol
- **axios** - HTTP klient pro API volání
- **oauth-1.0a** - OAuth 1.0a autentizace
- **form-data** - Multipart form data

### Monitoring & Metriky
- **@influxdata/influxdb-client** - InfluxDB v2 time series databáze
- **Pino** - Rychlé a efektivní logování (vestavěné ve Fastify)
- **node-cron** - Plánování úloh

### Multimédia
- **sharp** - Zpracování a komprese obrázků
- **@fastify/multipart** - Upload souborů

### Development & Testing
- **Jest** - Testovací framework
- **supertest** - HTTP testing
- **tsx** - TypeScript execution
- **pino-pretty** - Pretty logging pro development

---

## 📦 Instalace a nastavení

### 1. Požadavky
- **Node.js** (doporučená verze LTS 18+)
- **MySQL** databáze
- **InfluxDB v2** (pro monitoring výkonu)

### 2. Klonování a instalace
```bash
git clone <URL_REPOZITÁŘE>
cd socialplus-fastify-backend
npm install
```

### 3. Konfigurace prostředí
Zkopírujte `.env.example` na `.env` a nakonfigurujte:

```env
# Obecné nastavení
NODE_ENV=development
SERVER_PORT=8080

# MySQL databáze
DATABASE_URL="mysql://user:password@localhost:3306/socialplus"
SHADOW_DATABASE_URL="mysql://user:password@localhost:3306/socialplus_shadow"

# InfluxDB monitoring (volitelné)
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your-influxdb-token
INFLUXDB_ORG=socialplusorg
INFLUXDB_BUCKET=socialplus

# File uploads
UPLOADS_DIR=./uploads
MAX_FILE_SIZE=5000000

# Bezpečnost
SALT_ROUNDS=10
SESSION_SECRET=your-32-character-session-secret

# Scheduler
SCHEDULER_CHECK_INTERVAL=1
```

### 4. Nastavení databáze
```bash
# Generování Prisma klienta
npx prisma generate

# Spuštění migrací
npx prisma migrate dev

# (Volitelně) Seed data
npx prisma db seed
```

### 5. Spuštění aplikace

#### Development
```bash
npm run dev
```

#### Production
```bash
npm run build
npm start
```

### 6. API Dokumentace
Po spuštění je dostupná na: [http://localhost:8080/docs](http://localhost:8080/docs)

---

## 🏗️ Architektura systému

### Hlavní moduly

#### **Core API Routes** (`src/routes/`)
- **`user.ts`** - Správa uživatelů, autentizace
- **`manager.ts`** - Správa sociálních sítí a oprávnění
- **`api.ts`** - Vytváření a správa příspěvků
- **`scheduler.ts`** - Plánování a správa časovaných příspěvků
- **`monitor.ts`** - Monitoring výkonu a analýzy

#### **Social Media Providers** (`src/social/`)
- **`ISocialNetworkProvider.ts`** - Základní interface pro všechny providery
- **`SocialNetworkProviderFactory.ts`** - Factory pattern pro vytváření providerů
- **`FacebookProvider.ts`** - Facebook/Meta integrace
- **`TwitterProvider.ts`** - Twitter/X API
- **`ThreadsProvider.ts`** - Meta Threads
- **`MastodonProvider.ts`** - Mastodon decentralizovaná síť
- **`BlueskyProvider.ts`** - Bluesky AT Protocol

#### **Token Management**
- **`ThreadsTokenManager.ts`** - Automatické obnovování Threads tokenů
- **`FacebookTokenManager.ts`** - Správa Facebook access tokenů

#### **Scheduler & Monitoring**
- **`PostScheduler.ts`** - Hlavní plánovač pro automatické odesílání
- **`PerformanceMonitorService.ts`** - Monitoring engagement metrik
- **`InfluxDBService.ts`** - Time series databáze pro metriky

#### **Configuration & Utilities**
- **`MonitoringConfig.ts`** - Konfigurace monitorování
- **`helpers.ts`** - Utility funkce

---

## 🔄 Klíčové funkcionality

### Plánování příspěvků
- Automatický scheduler s konfigurovatelným intervalem
- Podpora pro různé časy publikování na různých sítích
- Batch processing pro efektivní zpracování

### Monitoring výkonu
- **Automatické sledování** metrik každou 1-12 hodin (dle API limitů)
- **Manuální monitoring** přes API endpoint
- **Time series analýza** v InfluxDB
- **7-denní okno** sledování pro nové příspěvky

### Správa tokenů
- **Automatické obnovování** pro Threads
- **Long-lived tokens** pro Facebook
- **Secure storage** v databázi

### Upload a zpracování médií
- **Sharp** pro optimalizaci obrázků
- **Komprese** pro různé sociální sítě
- **Multi-format** podpora

---

## 📊 Databázový model

### Hlavní entity
- **Users** - Uživatelské účty s authentication
- **Networks** - Připojené sociální sítě s tokeny
- **Posts** - Vytvořené příspěvky s obsahem
- **Attachments** - Multimédia připojená k příspěvkům
- **PostedContent** - Publikované příspěvky s metriky
- **Contents** - Obsah příspěvků pro různé sítě
- **NetworkTokens** - Bezpečné uložení API tokenů

---

## 🧪 Testování

```bash
# Spuštění všech testů
npm test

# Coverage report
npm run test:coverage
```

### Test pokrytí
Projekt obsahuje kompletní test suite pro:
- API endpointy
- Social media providery
- Token managery
- Scheduler funkcionalitu
- Performance monitoring
- 
---

## 🔧 Development

### Struktura projektu
```
src/
├── config/          # Konfigurace aplikace
├── routes/          # API endpoints
├── social/          # Social media integrace
├── types/           # TypeScript definice
└── generated/       # Prisma klient
```

### Scripts
```bash
npm run build        # TypeScript kompilace
npm run dev          # Development server
npm run test         # Testování
npm start            # Production server
```

---

## 📝 API Endpoints

### Hlavní kategorie
- **`/api/user/*`** - Správa uživatelů
- **`/api/manager/*`** - Správa sociálních sítí
- **`/api/posts/*`** - CRUD operace s příspěvky
- **`/api/scheduler/*`** - Plánování příspěvků
- **`/api/monitor/*`** - Performance analytics

Kompletní dokumentace dostupná na `/docs` po spuštění serveru.


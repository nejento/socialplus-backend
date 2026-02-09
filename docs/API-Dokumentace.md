# SocialPlus - API Dokumentace

## Přehled

SocialPlus je systém pro správu a plánování příspěvků na sociální sítě. Poskytuje kompletní API pro vytváření, editaci, plánování a publikování obsahu napříč různými sociálními platformami.

## Architektura systému

### Hlavní komponenty

1. **API Routes** - RESTful API endpointy
2. **Social Providers** - Implementace pro různé sociální sítě
3. **Scheduler** - Automatické plánování a publikování
4. **Monitor** - Sledování výkonu příspěvků
5. **Manager** - Správa sítí a oprávnění

### Podporované sociální sítě

- Facebook
- Instagram
- Twitter/X
- Threads
- Mastodon
- Bluesky

## Struktura API

### Autentizace

Všechny API endpointy vyžadují autentizaci prostřednictvím session cookies.

```typescript
/**
 * Kontroluje, zda je uživatel autentizován pro preValidation hook
 */
function isAuthenticated(request: any, reply: any): Promise<void>
```

### Oprávnění

Systém implementuje granulární oprávnění:
- **admin** - Vlastník sítě (úplná kontrola)
- **write** - Může publikovat a editovat obsah
- **read** - Může pouze zobrazovat obsah

## API Endpointy

### Uživatelé (`/user`)

#### Registrace a přihlášení
- `POST /register` - Registrace nového uživatele
- `POST /login` - Přihlášení uživatele
- `GET /logout` - Odhlášení uživatele
- `GET /user/me` - Získání informací o přihlášeném uživateli

#### Profily
- `GET /:userId/profile` - Získání profilu podle ID
- `GET /username/:username` - Získání profilu podle jména

### Příspěvky (`/post`)

#### Základní operace
- `POST /post/create` - Vytvoření nového příspěvku
- `GET /post/:postId` - Detail příspěvku
- `DELETE /post/:postId/delete` - Smazání příspěvku nebo odstranění editora

#### Správa obsahu
- `POST /post/:postId/newcontent` - Přidání textového obsahu
- `PUT /post/:postId/editcontent` - Editace obsahu
- `DELETE /post/:postId/deletecontent/:contentId` - Smazání obsahu
- `GET /post/:postId/listcontents` - Seznam obsahů

#### Správa příloh
- `POST /post/:postId/uploadfile` - Nahrání přílohy
- `DELETE /post/:postId/removefile/:attachmentId` - Smazání přílohy
- `GET /post/:postId/listfiles` - Seznam příloh
- `GET /post/:postId/getfile/:attachmentId` - Stažení přílohy

#### Editorství
- `POST /post/:postId/addeditor/:userId` - Přidání editora
- `DELETE /post/:postId/removeeditor/:userId` - Odebrání editora

#### Linkování k sítím
- `POST /post/:postId/linkcontent/:contentId/:networkId` - Linkování obsahu
- `DELETE /post/:postId/unlinkcontent/:contentId/:networkId` - Odpojení obsahu
- `POST /post/:postId/linkattachment/:attachmentId/:networkId` - Linkování přílohy
- `DELETE /post/:postId/unlinkattachment/:attachmentId/:networkId` - Odpojení přílohy

#### Publikování
- `POST /post/:postId/send/:networkId` - Publikování na konkrétní síť
- `POST /post/:postId/send/all` - Publikování na všechny linkované sítě

#### Plánování
- `POST /post/:postId/schedule/:networkId` - Naplánování publikování
- `DELETE /post/:postId/unschedule/:networkId` - Zrušení plánování
- `GET /post/:postId/scheduled/:networkId` - Získání naplánovaného času

#### Seznamy příspěvků
- `GET /post/list` - Seznam vlastních příspěvků
- `GET /post/editorlist` - Seznam příspěvků kde je uživatel editorem
- `GET /post/list/detailed` - Detailní seznam vlastních příspěvků
- `GET /post/editorlist/detailed` - Detailní seznam editovaných příspěvků
- `GET /post/list/filtered` - Filtrovaný seznam podle času a sítě

### Sítě (`/network`)

#### Správa sítí
- `POST /network/add` - Přidání nové sítě
- `DELETE /network/:networkId/remove` - Smazání sítě
- `PUT /network/:networkId/edit` - Editace sítě
- `GET /network/:networkId` - Detail sítě

#### Seznamy sítí
- `GET /network/list/owned` - Seznam vlastních sítí
- `GET /network/list/all` - Seznam všech dostupných sítí

#### Správa oprávnění
- `POST /network/:networkId/addperm` - Přidání oprávnění uživateli
- `DELETE /network/:networkId/removeperm/:granteeId` - Odebrání oprávnění
- `PUT /network/:networkId/changeperm` - Změna oprávnění
- `GET /network/:networkId/listperm` - Seznam oprávnění

#### Správa tokenů
- `POST /network/:networkId/addtoken` - Přidání autentizačních tokenů
- `GET /network/:networkId/listtokens` - Seznam názvů tokenů
- `DELETE /network/:networkId/removetoken` - Smazání všech tokenů

#### Příspěvky sítě
- `GET /network/:networkId/posts` - Seznam příspěvků publikovaných na síť
- `GET /network/:networkId/posts/:postId` - Detail konkrétního příspěvku na síti

### Scheduler (`/scheduler`)

#### Správa scheduleru
- `GET /scheduler/status` - Stav scheduleru
- `POST /scheduler/start` - Spuštění scheduleru
- `POST /scheduler/stop` - Zastavení scheduleru
- `POST /scheduler/check` - Manuální kontrola

#### Informace
- `GET /scheduler/upcoming` - Nadcházející naplánované příspěvky
- `GET /scheduler/networks` - Seznam podporovaných sítí
- `GET /scheduler/networks/:networkType/tokens` - Požadované tokeny pro síť
- `POST /scheduler/networks/test` - Test připojení k síti

### Monitor (`/monitor`)

#### Sběr metrik
- `POST /:postId/collect` - Manuální sběr metrik pro příspěvek
- `GET /:postId/network/:networkId/latest` - Nejnovější metriky
- `GET /:postId/network/:networkId/history` - Historie metrik

#### Analýzy
- `GET /:postId/network/:networkId/graph` - Grafová data
- `GET /:postId/availablemetrics` - Dostupné metriky
- `GET /:postId/currentmetrics` - Aktuální metriky

#### Dashboard
- `GET /status` - Stav monitoringu
- `GET /stats` - Statistiky dashboardu

## Datové typy

### Základní entity

```typescript
// Uživatel
interface User {
  id: number;
  username: string;
  displayname: string;
}

// Příspěvek
interface Post {
  postId: number;
  creatorId: number;
}

// Síť
interface Network {
  networkId: number;
  networkType: string;
  networkName: string;
  owner: User;
  note?: string;
  permission: 'read' | 'write' | 'admin';
}

// Obsah příspěvku
interface PostContent {
  id: number;
  postId: number;
  content: string;
  linkedNetworks: number[];
  canEdit: boolean;
}

// Příloha
interface Attachment {
  id: number;
  postId: number;
  fileName: string;
  linkedNetworks: number[];
}
```

### Detailní příspěvek

```typescript
interface PostDetail {
  postId: number;
  creator: User;
  contents: PostContent[];
  attachments: Attachment[];
  editors: { userId: number; username: string }[];
  scheduledTimes: ScheduledTime[];
}

interface ScheduledTime {
  networkId: number;
  contentId: number;
  postDate?: string;
  actualPostDate?: string;
  networkPostId?: string;
}
```

## Workflow publikování

### 1. Vytvoření příspěvku
```typescript
// Vytvoření nového příspěvku
POST /post/create
→ { postId: 123, creatorId: 1 }

// Přidání obsahu
POST /post/123/newcontent
Body: { content: "Text příspěvku" }
→ { id: 456, postId: 123, content: "...", linkedNetworks: [], canEdit: true }
```

### 2. Linkování k sítím
```typescript
// Připojení obsahu k síti
POST /post/123/linkcontent/456/789
→ { success: true, message: "Post content linked to network" }
```

### 3. Plánování
```typescript
// Naplánování publikování
POST /post/123/schedule/789
Body: { postDate: "2024-12-20T15:00:00Z" }
→ { success: true, message: "Content scheduled successfully" }
```

### 4. Publikování
```typescript
// Okamžité publikování
POST /post/123/send/789
→ { success: true, message: "Post sent successfully" }

// Publikování na všechny sítě
POST /post/123/send/all
→ { success: true, message: "Post sent successfully to all 3 networks" }
```

## Oprávnění a bezpečnost

### Hierarchie oprávnění

1. **Tvůrce příspěvku** - Úplná kontrola nad příspěvkem
2. **Editor příspěvku** - Může editovat obsah (s omezeními)
3. **Vlastník sítě** - Kontrola nad obsahem linkovaným k jeho síti
4. **Write přístup** - Může publikovat do sítě
5. **Read přístup** - Může pouze zobrazovat obsah

### Pravidla editace obsahu

- **Tvůrce příspěvku**: Může editovat jakýkoliv obsah
- **Editor příspěvku**: Může editovat obsah linkovaný k sítím kde má write přístup
- **Vlastník sítě**: Může editovat obsah linkovaný k jeho síti

Při editaci obsahu vlastníkem sítě (který není editorem příspěvku):
- Pokud má přístup ke všem linkovaným sítím → edituje původní obsah
- Pokud nemá přístup ke všem sítím → vytvoří nový obsah a přelinkuje pouze své sítě

## Automatické plánování

### Scheduler komponenta

Scheduler automaticky kontroluje naplánované příspěvky a publikuje je v správný čas.

```typescript
interface SchedulerStatus {
  isRunning: boolean;
  checkIntervalMinutes: number;
  nextCheck: string | null;
}
```

### Konfigurace

Interval kontroly se nastavuje v environment proměnné:
```bash
SCHEDULER_CHECK_INTERVAL=1  # v minutách
```

## Monitoring výkonu

### Podporované metriky

- **views** - Zobrazení
- **likes** - Lajky
- **shares** - Sdílení
- **comments** - Komentáře
- **reposts** - Reposty
- **reactions** - Reakce
- **reach** - Dosah
- **impressions** - Zobrazení
- **engagement** - Míra zapojení
- **clickThroughRate** - CTR

### InfluxDB integrace

Systém ukládá metriky do InfluxDB pro dlouhodobé sledování a analýzy.

```typescript
interface PerformanceMetrics {
  postId: string;
  networkType: string;
  timestamp: Date;
  views?: number;
  likes?: number;
  shares?: number;
  // ... další metriky
}
```

## Error handling

### Standardní chybové odpovědi

```typescript
interface ErrorResponse {
  error: string;
}

// Příklady
{ error: "Post not found or not authorized" }     // 400
{ error: "Unauthorized" }                         // 401
{ error: "Access denied" }                        // 403
{ error: "Post not found" }                       // 404
{ error: "Internal server error" }                // 500
```

### Časté chyby

- **400**: Neplatná data, příspěvek nenalezen, již publikováno
- **401**: Nepřihlášený uživatel
- **403**: Nedostatečná oprávnění
- **404**: Zdroj nenalezen
- **500**: Serverová chyba

## Konfigurace environment

```bash
# Databáze
DATABASE_URL="postgresql://..."

# Session
SESSION_SECRET="your-secret-key"
SALT_ROUNDS=10

# Uploads
UPLOADS_DIR="./uploads"
MAX_FILE_SIZE=5000000

# Scheduler
SCHEDULER_CHECK_INTERVAL=1

# InfluxDB (monitoring)
INFLUXDB_URL="http://localhost:8086"
INFLUXDB_TOKEN="your-token"
INFLUXDB_ORG="socialplus"
INFLUXDB_BUCKET="performance"
```

## Ukázkové použití

### Kompletní workflow

```typescript
// 1. Přihlášení
POST /login
Body: { username: "user", password: "pass" }

// 2. Vytvoření příspěvku
POST /post/create
→ { postId: 123 }

// 3. Přidání obsahu
POST /post/123/newcontent
Body: { content: "Můj první příspěvek" }
→ { id: 456 }

// 4. Přidání přílohy
POST /post/123/uploadfile
Form-data: file

// 5. Získání dostupných sítí
GET /network/list/all
→ [{ networkId: 789, networkType: "facebook", ... }]

// 6. Linkování obsahu
POST /post/123/linkcontent/456/789

// 7. Naplánování nebo okamžité publikování
POST /post/123/schedule/789
Body: { postDate: "2024-12-20T15:00:00Z" }

// NEBO okamžité publikování
POST /post/123/send/789
```

## Závěr

SocialPlus API poskytuje kompletní řešení pro správu sociálních médií s pokročilými funkcemi jako je plánování, monitoring výkonu a granulární oprávnění. Systém je navržen pro škálovatelnost a snadnou rozšířitelnost o nové sociální platformy.

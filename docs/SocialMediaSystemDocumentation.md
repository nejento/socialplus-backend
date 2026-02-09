# Dokumentace systému pro správu sociálních médií

## Přehled systému

Tento systém poskytuje komplexní řešení pro plánování, odesílání a monitorování příspěvků na různých sociálních sítích. Systém je navržen jako modulární architektura s podporou pro Facebook, Twitter, Instagram, Threads, Bluesky a Mastodon.

## Architektura systému

### Hlavní komponenty

1. **PostScheduler** - Hlavní plánovač pro automatické odesílání příspěvků
2. **SocialNetworkProviderFactory** - Továrna pro vytváření poskytovatelů sociálních sítí
3. **InfluxDBService** - Služba pro ukládání a dotazování metrik výkonu
4. **PerformanceMonitorService** - Služba pro monitorování výkonu příspěvků
5. **ISocialNetworkProvider** - Rozhraní pro jednotlivé poskytovatele sociálních sítí
6. **ThreadsTokenManager** - Správce tokenů pro Threads s automatickým obnovováním
7. **FacebookTokenManager** - Správce tokenů pro Facebook s výměnou krátkodobých tokenů
8. **BlueskyProvider** - Poskytovatel pro Bluesky s pokročilou kompresí obrázků
9. **FacebookProvider** - Poskytovatel pro Facebook s podporou více fotografií
10. **MastodonProvider** - Poskytovatel pro decentralizovaný Mastodon
11. **TwitterProvider** - Poskytovatel pro Twitter/X (pouze text)
12. **ThreadsProvider** - Poskytovatel pro Threads (pouze text)

### Datový tok

```
Naplánovaný příspěvek → PostScheduler → SocialNetworkProvider → Sociální síť
                                    ↓
Metriky výkonu ← InfluxDB ← PerformanceMonitorService ← API sociální sítě
                                    ↑
Token Manager → Obnovení tokenů → Aktualizace databáze
```

## Hlavní třídy a jejich funkce

### PostScheduler

**Účel:** Automatické zpracování naplánovaných příspěvků podle časového rozvrhu.

**Klíčové metody:**
- `start()` - Spustí plánovač s periodickou kontrolou
- `stop()` - Zastaví plánovač
- `checkAndProcessPosts()` - Zkontroluje a zpracuje příspěvky k odeslání
- `getScheduledPosts()` - Získá příspěvky připravené k odeslání
- `processScheduledPost()` - Zpracuje jednotlivý příspěvek
- `getUpcomingPosts()` - Získá nadcházející naplánované příspěvky
- `manualCheck()` - Manuální spuštění kontroly (pro testování)

**Pracovní proces:**
1. Načte příspěvky s `post_date <= aktuální čas`
2. Pro každý příspěvek získá příslušný provider
3. Validuje autentifikační tokeny
4. Odešle příspěvek na sociální síť
5. Aktualizuje databázi s výsledkem (úspěch/chyba)

### SocialNetworkProviderFactory

**Účel:** Centrální továrna pro správu různých poskytovatelů sociálních sítí.

**Klíčové metody:**
- `registerProvider()` - Registruje nového poskytovatele
- `getProvider()` - Získá poskytovatele podle typu sítě
- `getAllProviders()` - Vrátí všechny dostupné poskytovatele
- `getSupportedNetworks()` - Seznam podporovaných sítí
- `isSupported()` - Kontrola podpory konkrétní sítě

**Podporované sítě:**
- Facebook
- Twitter  
- Instagram
- Threads
- Bluesky
- Mastodon

### InfluxDBService

**Účel:** Správa časových řad metrik výkonu příspěvků v InfluxDB.

**Klíčové metody:**
- `storeMetrics()` - Uloží metriky výkonu do databáze
- `getLatestMetrics()` - Získá nejnovější metriky pro příspěvek
- `getMetricsHistory()` - Získá historii metrik v časovém rozmezí
- `getAvailableMetrics()` - Seznam dostupných metrik pro příspěvek
- `close()` - Uzavře připojení k databázi

**Podporované metriky:**
- Zobrazení (views)
- Lajky (likes)  
- Sdílení (shares)
- Komentáře (comments)
- Reposts
- Dosah (reach)
- Impressions
- Engagement rate
- Click-through rate
- Reakce podle typu
- Vlastní metriky specifické pro síť

### PerformanceMonitorService

**Účel:** Automatické monitorování výkonu příspěvků napříč všemi sociálními sítěmi.

**Klíčové metody:**
- `start()` - Spustí službu monitorování s cron úlohami
- `stop()` - Zastaví všechny naplánované úlohy
- `scheduleNetworkMonitoring()` - Naplánuje monitorování pro konkrétní síť
- `monitorNetworkPosts()` - Monitoruje příspěvky na jedné síti
- `getTrackedPosts()` - Získá seznam sledovaných příspěvků
- `runManualCheck()` - Manuální spuštění kontroly všech sítí
- `getPostMetrics()` - Získá nejnovější metriky pro příspěvek
- `getPostMetricsHistory()` - Získá historii metrik

**Monitorovací intervaly:**
- Facebook, Instagram, Threads, Bluesky, Mastodon: každou hodinu
- Twitter: každých 12 hodin (kvůli API limitům)

### Poskytovatelé sociálních sítí

#### BlueskyProvider

**Účel:** Odesílání příspěvků na decentralizovanou síť Bluesky s pokročilou kompresí obrázků.

**Speciální funkce:**
- Automatická komprese obrázků nad 1MB
- Konverze HEIC/HEIF a GIF na JPEG
- Podpora pro PNG, WebP, JPEG formáty
- Inteligentní změna velikosti při překročení limitů

**Klíčové metody:**
- `sendPost()` - Odešle příspěvek s textem a obrázky
- `uploadImageAttachments()` - Nahraje a zkomprimuje obrázky
- `compressImage()` - Komprimuje obrázky podle limitů
- `getPostPerformance()` - Získá metriky (lajky, komentáře, reposts)

#### FacebookProvider

**Účel:** Odesílání příspěvků na Facebook s podporou více fotografií.

**Speciální funkce:**
- Podpora pro jednotlivé i více fotografií
- Nepublikované fotografie pro sestavení albumů
- Textové příspěvky bez obrázků
- Monitorování výkonu zakázáno (vyžaduje schválení)

**Klíčové metody:**
- `sendPost()` - Hlavní metoda pro odesílání
- `uploadPhotoWithCaption()` - Jedna fotografie s popiskem
- `uploadMultiplePhotos()` - Více fotografií jako album
- `postTextOnly()` - Pouze textový příspěvek

#### MastodonProvider

**Účel:** Odesílání příspěvků na decentralizovaný Mastodon.

**Speciální funkce:**
- Podpora různých instancí
- Flexibilní URL instance
- Nahrávání médií přes Mastodon API v2
- Otevřený protokol bez přísných limitů

**Klíčové metody:**
- `sendPost()` - Odesílání statusu s médii
- `uploadMediaAttachments()` - Nahrání příloh
- `getPostPerformance()` - Metriky včetně anket

#### TwitterProvider

**Účel:** Odesílání textových příspěvků na Twitter/X.

**Speciální omezení:**
- **POUZE TEXTOVÉ PŘÍSPĚVKY** - média zakázána
- Používá OAuth 1.0a pro autentifikaci
- Twitter API v2 pro odesílání
- Monitorování výkonu zakázáno (drahé)

**Klíčové metody:**
- `sendPost()` - Pouze text, ignoruje přílohy
- `validateTokens()` - Ověří všech 7 požadovaných tokenů
- `getPostPerformance()` - Vrací prázdné metriky

#### ThreadsProvider

**Účel:** Odesílání textových příspěvků na Meta Threads.

**Speciální funkce:**
- **POUZE TEXTOVÉ PŘÍSPĚVKY** - média ignorována
- Dvoustupňový proces (kontejner → publikace)
- Integrace s ThreadsTokenManager
- Automatické obnovování tokenů

**Klíčové metody:**
- `sendPost()` - Pouze text, ignoruje přílohy
- `postTextToThreads()` - Dvoustupňový proces publikace
- `getPostPerformance()` - Zakázáno (vyžaduje schválení)

### ThreadsTokenManager

**Účel:** Automatická správa a obnovování tokenů pro Threads API.

**Klíčové metody:**
- `startPeriodicRefresh()` - Spustí periodické kontroly tokenů (každých 12 hodin)
- `stopPeriodicRefresh()` - Zastaví periodické kontroly
- `refreshTokenForNetwork()` - Obnoví token pro konkrétní síť
- `getRefreshedTokens()` - Získá aktuální tokeny (obnoví při potřebě)
- `initializeExistingTokenTimestamps()` - Inicializuje časová razítka pro existující tokeny

**Obnovování tokenů:**
- Kontrola každých 12 hodin
- Automatické obnovení tokenů starších než 45 dní
- Ukládání časových razítek pro sledování stáří tokenů
- Fallback na původní token při selhání obnovení

### FacebookTokenManager

**Účel:** Správa Facebook tokenů a výměna krátkodobých tokenů za dlouhodobé.

**Klíčové metody:**
- `initializeFacebookTokens()` - Inicializuje kompletní sadu Facebook tokenů
- `exchangeForLongLivedToken()` - Vymění krátkodobý token za dlouhodobý
- `getLongLivedPageAccessToken()` - Získá token pro přístup ke stránce
- `verifyPagePermissions()` - Ověří oprávnění tokenu stránky
- `saveTokensToDatabase()` - Uloží všechny tokeny do databáze

**Proces inicializace:**
1. Výměna krátkodobého uživatelského tokenu za dlouhodobý
2. Získání dlouhodobého tokenu stránky
3. Ověření oprávnění pro upload obrázků
4. Uložení všech tokenů do databáze

### ISocialNetworkProvider

**Účel:** Jednotné rozhraní pro všechny poskytovatele sociálních sítí.

**Hlavní metody:**
- `sendPost()` - Odešle příspěvek na síť
- `validateTokens()` - Validuje autentifikační tokeny
- `getRequiredTokens()` - Vrátí požadované tokeny pro síť
- `getPostPerformance()` - Získá metriky výkonu příspěvku
- `getMonitoringInterval()` - Doporučený interval monitorování

## Správa tokenů

### Threads Token Management

Threads používá automatické obnovování tokenů:

```typescript
import { threadsTokenManager } from './src/social/ThreadsTokenManager';

// Spuštění automatického obnovování
threadsTokenManager.startPeriodicRefresh();

// Získání aktuálních tokenů (s automatickým obnovením)
const tokens = await threadsTokenManager.getRefreshedTokens(networkId);
```

**Životní cyklus tokenu:**
- Nové tokeny mají platnost 60 dní
- Automatická kontrola každých 12 hodin
- Obnovení při stáří > 45 dní
- Ukládání časových razítek pro sledování

### Facebook Token Management

Facebook používá výměnu krátkodobých tokenů:

```typescript
import { FacebookTokenManager } from './src/social/FacebookTokenManager';

const manager = new FacebookTokenManager();

// Inicializace s krátkodobým tokenem
const result = await manager.initializeFacebookTokens(networkId, {
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  pageId: 'your-page-id',
  shortLivedUserAccessToken: 'short-lived-token'
});
```

**Typy tokenů:**
- **Krátkodobý uživatelský token** (1-2 hodiny)
- **Dlouhodobý uživatelský token** (60 dní)
- **Token stránky** (neomezený, dokud má uživatel oprávnění)

## Specifické funkce poskytovatelů

### Komprese obrázků (Bluesky)

Bluesky automaticky komprimuje obrázky nad 1MB:

```typescript
// Automatická komprese při uploadu
const images = await blueskyProvider.uploadImageAttachments([
  '/path/to/large-image.jpg',
  '/path/to/heic-image.heic'
]);
```

**Funkce:**
- Kvalitní komprese 85% → 50%
- Změna velikosti při překročení limitů
- Konverze HEIC/HEIF → JPEG
- Konverze GIF → JPEG (Bluesky nepodporuje animace)

### Více fotografií (Facebook)

Facebook podporuje albumy až několika fotografií:

```typescript
// Automatické rozpoznání typu příspěvku
await facebookProvider.sendPost(
  'Popisek k fotkám',
  ['/photo1.jpg', '/photo2.jpg', '/photo3.jpg'], // Více fotek = album
  tokens
);
```

### Karusely (Instagram)

Instagram vytváří karusely pro více obrázků:

```typescript
// Karuselový příspěvek
await instagramProvider.sendPost(
  'Podívejte se na tyto fotky!',
  ['/img1.jpg', '/img2.jpg', '/img3.jpg'], // Automaticky karusel
  tokens
);
```

## Omezení platformy

### Twitter/X - Pouze text
```typescript
// Přílohy budou ignorovány s varováním
await twitterProvider.sendPost(
  'Pouze textový tweet',
  ['/image.jpg'], // ⚠️ IGNOROVÁNO
  tokens
);
```

### Threads - Pouze text
```typescript
// Přílohy budou ignorovány s varováním
await threadsProvider.sendPost(
  'Pouze textový příspěvek',
  ['/image.jpg'], // ⚠️ IGNOROVÁNO
  tokens
);
```

### Instagram - Povinné obrázky
```typescript
// Instagram vyžaduje alespoň jeden obrázek
await instagramProvider.sendPost(
  'Popisek',
  [], // ❌ CHYBA - Instagram vyžaduje obrázky
  tokens
);
```

## Datové struktury

### ScheduledPost
```typescript
interface ScheduledPost {
  postId: number;           // ID příspěvku v databázi
  networkId: number;        // ID sociální sítě
  contentId: number;        // ID obsahu
  content: string;          // Textový obsah příspěvku
  attachments: string[];    // Cesty k přílohám
  scheduledDate: Date;      // Naplánovaný čas odeslání
  networkType: string;      // Typ sociální sítě
  tokens: Record<string, string>; // Autentifikační tokeny
}
```

### PostPerformanceMetrics
```typescript
interface PostPerformanceMetrics {
  postId: string;           // ID příspěvku na síti
  networkType: string;      // Typ sociální sítě
  timestamp: Date;          // Čas měření
  views?: number;           // Počet zobrazení
  likes?: number;           // Počet lajků
  shares?: number;          // Počet sdílení
  comments?: number;        // Počet komentářů
  reposts?: number;         // Počet repostů
  reactions?: Record<string, number>; // Reakce podle typu
  reach?: number;           // Dosah
  impressions?: number;     // Impressions
  engagement?: number;      // Míra zapojení
  clickThroughRate?: number; // CTR
  customMetrics?: Record<string, any>; // Vlastní metriky
}
```

### TrackedPost
```typescript
interface TrackedPost {
  id: number;               // ID v databázi
  networkPostId: string;    // ID příspěvku na síti
  networkType: string;      // Typ sociální sítě
  userId: number;           // ID uživatele
  createdAt: Date;          // Datum vytvoření
  content: string;          // Obsah příspěvku
  isActive: boolean;        // Zda je aktivní pro monitorování
}
```

## Konfigurace a nastavení

### Proměnné prostředí

```bash
# Scheduler
SCHEDULER_CHECK_INTERVAL=1  # Interval kontroly v minutách

# InfluxDB
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your-token
INFLUXDB_ORG=your-org
INFLUXDB_BUCKET=social-metrics

# Session
SESSION_SECRET=your-secret-key

# Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Threads
THREADS_APP_SECRET=your-threads-app-secret

# Twitter
TWITTER_API_KEY=your-api-key
TWITTER_API_SECRET=your-api-secret
TWITTER_CLIENT_ID=your-client-id
TWITTER_CLIENT_SECRET=your-client-secret
TWITTER_BEARER_TOKEN=your-bearer-token

# Instagram
INSTAGRAM_ACCESS_TOKEN=your-access-token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your-business-account-id

# Bluesky
BLUESKY_HANDLE=your.handle.bsky.social
BLUESKY_PASSWORD=your-app-password

# Mastodon
MASTODON_INSTANCE_URL=https://mastodon.social
MASTODON_ACCESS_TOKEN=your-access-token
```

### Databázové tabulky

Systém využívá následující hlavní tabulky:
- `posts` - Základní informace o příspěvcích
- `contents` - Obsah příspěvků
- `networks` - Konfigurace sociálních sítí
- `posted_content` - Vztah mezi příspěvky a sítěmi s časováním
- `network_tokens` - Autentifikační tokeny pro sítě (šifrované)
- `attachments` - Přílohy k příspěvkům

**Speciální tokeny pro Threads:**
- `threadsUserId` - ID uživatele na Threads
- `longLivedAccessToken` - Dlouhodobý přístupový token
- `longLivedAccessTokenTimestamp` - Časové razítko vytvoření tokenu
- `threadsAppSecret` - Tajný klíč aplikace

**Speciální tokeny pro Facebook:**
- `appId` - ID Facebook aplikace
- `appSecret` - Tajný klíč aplikace
- `pageId` - ID Facebook stránky
- `userAccessToken` - Dlouhodobý uživatelský token
- `pageAccessToken` - Token pro přístup ke stránce

**Speciální tokeny pro Twitter:**
- `api_key` - API klíč
- `api_secret` - API tajný klíč
- `access_token` - Přístupový token
- `access_token_secret` - Tajný klíč tokenu
- `client_id` - Client ID
- `client_secret` - Client secret
- `bearer_token` - Bearer token

**Speciální tokeny pro Instagram:**
- `access_token` - Přístupový token
- `business_account_id` - ID business účtu

**Speciální tokeny pro Bluesky:**
- `handle` - Uživatelské jméno
- `password` - App password

**Speciální tokeny pro Mastodon:**
- `instanceUrl` - URL instance Mastodon
- `accessToken` - Přístupový token

## Použití systému

### Spuštění kompletního systému

```typescript
import { PostScheduler } from './src/social/PostScheduler';
import { PerformanceMonitorService } from './src/social/PerformanceMonitorService';
import { threadsTokenManager } from './src/social/ThreadsTokenManager';
import { PrismaClient } from './src/generated/client';

const prisma = new PrismaClient();

// Spuštění plánovače
const scheduler = new PostScheduler(prisma, 1);
scheduler.start();

// Spuštění monitorování výkonu
const config = {
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
  org: process.env.INFLUXDB_ORG,
  bucket: process.env.INFLUXDB_BUCKET
};

const monitor = new PerformanceMonitorService(config);
await monitor.start();

// Spuštění správy tokenů pro Threads
threadsTokenManager.startPeriodicRefresh();
await threadsTokenManager.initializeExistingTokenTimestamps();
```

### Inicializace Facebook tokenů

```typescript
import { FacebookTokenManager } from './src/social/FacebookTokenManager';

const manager = new FacebookTokenManager();

const result = await manager.initializeFacebookTokens(networkId, {
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  pageId: 'your-page-id',
  shortLivedUserAccessToken: 'token-from-frontend'
});

if (result.success) {
  console.log('Facebook tokeny inicializovány úspěšně');
} else {
  console.error('Chyba:', result.message);
}
```

### Odesílání příspěvků na různé sítě

```typescript
import { SocialNetworkProviderFactory } from './src/social/SocialNetworkProviderFactory';

// Bluesky s obrázky
const blueskyProvider = SocialNetworkProviderFactory.getProvider('bluesky');
await blueskyProvider.sendPost(
  'Příspěvek s obrázky na Bluesky!',
  ['/path/to/image1.jpg', '/path/to/large-image.png'], // Automatická komprese
  { handle: 'user.bsky.social', password: 'app-password' }
);

// Facebook s více fotografiemi
const facebookProvider = SocialNetworkProviderFactory.getProvider('facebook');
await facebookProvider.sendPost(
  'Album fotografií',
  ['/photo1.jpg', '/photo2.jpg', '/photo3.jpg'], // Vytvoří album
  { pageAccessToken: 'token', pageId: 'page-id' }
);

// Instagram karusel
const instagramProvider = SocialNetworkProviderFactory.getProvider('instagram');
await instagramProvider.sendPost(
  'Karuselový příspěvek',
  ['/img1.jpg', '/img2.jpg'], // Automaticky karusel
  { access_token: 'token', business_account_id: 'account-id' }
);

// Twitter pouze text
const twitterProvider = SocialNetworkProviderFactory.getProvider('twitter');
await twitterProvider.sendPost(
  'Textový tweet bez obrázků',
  [], // Twitter nepodporuje média v této implementaci
  { 
    api_key: 'key', 
    api_secret: 'secret',
    access_token: 'token',
    access_token_secret: 'token_secret',
    client_id: 'client_id',
    client_secret: 'client_secret',
    bearer_token: 'bearer'
  }
);

// Threads pouze text
const threadsProvider = SocialNetworkProviderFactory.getProvider('threads');
await threadsProvider.sendPost(
  'Textový příspěvek na Threads',
  [], // Threads nepodporuje média v této implementaci
  { threadsUserId: 'user-id', longLivedAccessToken: 'token' }
);

// Mastodon s přílohami
const mastodonProvider = SocialNetworkProviderFactory.getProvider('mastodon');
await mastodonProvider.sendPost(
  'Příspěvek na Mastodon',
  ['/attachment.jpg'],
  { instanceUrl: 'https://mastodon.social', accessToken: 'token' }
);
```

### Získání metrik

```typescript
import { InfluxDBService } from './src/social/InfluxDBService';

const influxDB = new InfluxDBService(config);

// Nejnovější metriky
const latest = await influxDB.getLatestMetrics('post-id', 'facebook');

// Historie metrik
const history = await influxDB.getMetricsHistory(
  'post-id', 
  'facebook', 
  new Date('2024-01-01'), 
  new Date('2024-01-31')
);
```

## Chybové stavy a řešení

### Časté problémy

1. **Neplatné tokeny**
   - Ověřte platnost OAuth tokenů
   - Zkontrolujte oprávnění aplikace na sociální síti
   - Pro Threads: automatické obnovení při stáří > 45 dní
   - Pro Facebook: nutná výměna krátkodobého tokenu za dlouhodobý

2. **Selhání připojení k InfluxDB**
   - Ověřte dostupnost InfluxDB serveru
   - Zkontrolujte konfiguraci připojení

3. **Chyby při odesílání příspěvků**
   - Zkontrolujte formát obsahu (délka, speciální znaky)
   - Ověřte dostupnost příloh
   - Zkontrolujte API limity sociálních sítí

4. **Problémy s obnovováním tokenů**
   - Threads: zkontrolujte platnost původního tokenu
   - Facebook: ověřte oprávnění aplikace a stránky

5. **Chyby komprese obrázků (Bluesky)**
   - Zkontrolujte dostupnost Sharp knihovny
   - Ověřte formát vstupních obrázků
   - Kontrola dostupného místa na disku

6. **Instagram vyžaduje obrázky**
   - Instagram neumožňuje pouze textové příspěvky
   - Vždy poskytněte alespoň jeden obrázek

7. **Twitter/Threads ignorují přílohy**
   - Tyto sítě jsou nakonfigurovány pouze pro text
   - Přílohy jsou automaticky ignorovány s varováním

### Logování

Systém používá konzolové logování pro sledování:
- Spuštění/zastavení služeb
- Zpracování příspěvků
- Chyby při komunikaci s API
- Metriky výkonu
- Obnovování tokenů (s prefixy [ThreadsTokenManager], [FacebookTokenManager])
- Komprese obrázků ([BlueskyProvider])
- Ignorování příloh ([TwitterProvider], [ThreadsProvider])

## Monitorování a údržba

### Kontrola stavu systému

```typescript
// Stav plánovače
const schedulerStatus = scheduler.getStatus();
console.log('Plánovač běží:', schedulerStatus.isRunning);

// Stav monitorování
const monitorStatus = monitor.getStatus();
console.log('Aktivní monitorování:', monitorStatus.activeMonitors);

// Ruční kontrola
await scheduler.manualCheck();
await monitor.runManualCheck();
```

### Údržba tokenů

```typescript
// Manuální obnovení Threads tokenu
const newToken = await threadsTokenManager.refreshTokenForNetwork(
  networkId, 
  currentToken, 
  userId
);

// Kontrola stáří tokenů
const tokens = await threadsTokenManager.getRefreshedTokens(networkId);
```

## Rozšiřitelnost

### Přidání nové sociální sítě

1. Implementujte `ISocialNetworkProvider`
2. Zaregistrujte provider v `SocialNetworkProviderFactory`
3. Implementujte specifické metody pro API dané sítě
4. Přidejte konfiguraci monitorování v `PerformanceMonitorService`
5. Případně vytvořte vlastní token manager pro specifické potřeby

### Přidání nových metrik

1. Rozšiřte `PostPerformanceMetrics` interface
2. Upravte `InfluxDBService` pro ukládání nových polí
3. Implementujte získávání metrik v provider třídách

### Přidání nového token manageru

```typescript
export class NewNetworkTokenManager {
  async refreshToken(networkId: number): Promise<string | null> {
    // Implementace specifická pro síť
  }
}
```

## Bezpečnost

- Tokeny jsou šifrovány v databázi
- API klíče se uchovávají v proměnných prostředí
- Implementována validace vstupních dat
- Logování neobsahuje citlivé informace
- Automatické obnovování tokenů minimalizuje riziko expirací
- Oddělené tokeny pro různé úrovně přístupu (uživatel vs. stránka)
- Komprese obrázků zachovává kvalitu při minimalizaci velikosti

## Výkon a optimalizace

- Batch zpracování příspěvků
- Efektivní indexování databázových dotazů
- Kešování často používaných dat
- Asynchronní zpracování pro lepší odezvu
- Optimalizované intervaly monitorování podle API limitů
- Lazy loading tokenů pouze při potřebě
- Inteligentní komprese obrázků (Bluesky)
- Dvoufázové publikování (Threads)
- Nepublikované fotografie pro albumy (Facebook)

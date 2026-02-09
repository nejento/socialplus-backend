# Social Media Post Scheduler

Tento systém umožňuje plánované odesílání příspěvků na různé sociální sítě (Facebook, Twitter, Instagram) s jednotným rozhraním.

## Funkce

- **Jednotné rozhraní** pro všechny sociální sítě
- **Automatické plánování** - kontrola databáze každou minutu (konfigurovatelné)
- **Podpora více sítí** - Facebook, Twitter, Instagram
- **Řízení příloh** - obrázky a videa
- **REST API** pro správu plánovače
- **Graceful shutdown** - bezpečné ukončení při vypnutí serveru

## Architektura

### Interface ISocialNetworkProvider
Základní rozhraní, které implementují všechny social media providery:

```typescript
interface ISocialNetworkProvider {
  readonly networkType: string;
  sendPost(content: string, attachments: string[], tokens: Record<string, string>): Promise<string | null>;
  validateTokens(tokens: Record<string, string>): boolean;
  getRequiredTokens(): string[];
}
```

### Implementované providery
- **FacebookProvider** - Facebook Pages API
- **TwitterProvider** - Twitter API v2
- **MastodonProvider** - Mastodon API
- **BlueskyProvider** - Bluesky AT Protocol API
- **ThreadsProvider** - Meta Threads API

### PostScheduler
Hlavní třída pro správu plánovaných příspěvků:
- Periodicky kontroluje databázi
- Načítá naplánované příspěvky
- Volá odpovídající provider pro odeslání
- Aktualizuje databázi s výsledkem

## Konfigurace

### Environment proměnné
```env
SCHEDULER_CHECK_INTERVAL=1  # Interval kontroly v minutách
BASE_URL=http://localhost:3000  # Base URL pro Instagram uploads
```

### Potřebné tokeny pro jednotlivé sítě

#### Facebook
- `access_token` - Access token pro Facebook API
- `page_id` - ID stránky na Facebooku

#### Twitter
- `bearer_token` - Bearer token pro Twitter API v2
- `api_key` - API klíč
- `api_secret` - API secret
- `access_token` - Access token
- `access_token_secret` - Access token secret

#### Instagram
- `access_token` - Access token pro Instagram API
- `business_account_id` - ID business účtu

## API Endpointy

### Správa plánovače
- `GET /scheduler/status` - Stav plánovače
- `POST /scheduler/start` - Spuštění plánovače
- `POST /scheduler/stop` - Zastavení plánovače
- `POST /scheduler/check` - Manuální kontrola

### Informace o sítích
- `GET /scheduler/networks` - Seznam podporovaných sítí
- `GET /scheduler/networks/:networkType/tokens` - Potřebné tokeny pro síť
- `POST /scheduler/networks/test` - Test připojení k síti

### Naplánované příspěvky
- `GET /scheduler/upcoming?hours=24` - Nadcházející příspěvky

## Příklad použití

### 1. Vytvoření naplánovaného příspěvku v databázi

```sql
-- Příklad vložení naplánovaného příspěvku
INSERT INTO posted_content (posts_id, networks_id, contents_id, post_date) 
VALUES (1, 1, 1, '2025-01-11 15:30:00');
```

### 2. Kontrola stavu plánovače

```bash
curl http://localhost:8080/scheduler/status
```

### 3. Test připojení k síti

```bash
curl -X POST http://localhost:8080/scheduler/networks/test \
  -H "Content-Type: application/json" \
  -d '{
    "networkType": "facebook",
    "tokens": {
      "access_token": "your_access_token",
      "page_id": "your_page_id"
    }
  }'
```

## Databázová struktura

Systém využívá existující databázovou strukturu:
- `posts` - základní informace o příspěvcích
- `contents` - textový obsah příspěvků
- `attachments` - přílohy k příspěvkům
- `networks` - konfigurace sociálních sítí
- `network_tokens` - autentizační tokeny
- `posted_content` - plánované/odeslané příspěvky

## Rozšiřitelnost

### Přidání nové sociální sítě
1. Vytvořte nový provider implementující `ISocialNetworkProvider`
2. Zaregistrujte ho v `SocialNetworkProviderFactory`

```typescript
// Příklad nového provideru
class LinkedInProvider implements ISocialNetworkProvider {
  readonly networkType = 'linkedin';
  
  async sendPost(content: string, attachments: string[], tokens: Record<string, string>): Promise<string | null> {
    // Implementace pro LinkedIn API
  }
  
  validateTokens(tokens: Record<string, string>): boolean {
    return !!(tokens.access_token);
  }
  
  getRequiredTokens(): string[] {
    return ['access_token'];
  }
}

// Registrace
SocialNetworkProviderFactory.registerProvider(new LinkedInProvider());
```

## Bezpečnost

- Všechny tokeny jsou uloženy šifrovaně v databázi
- API endpointy by měly být zabezpečeny autentizací
- Validace vstupních dat před odesláním na sociální sítě
- Rate limiting pro prevenci spamu

## Monitoring a ladění

- Všechny akce jsou logovány prostřednictvím Fastify loggeru
- Chyby při odesílání jsou zachyceny a uloženy do databáze
- API pro sledování stavu plánovače a nadcházejících příspěvků

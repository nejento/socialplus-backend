# Konfigurace serveru

## Přehled změn

Aplikace nyní podporuje pokročilé nastavení serveru včetně konfigurovatelné bind adresy a HTTP/2 s SSL certifikáty.

## Nové environment proměnné

### SERVER_HOST
- **Popis**: Určuje IP adresu, na kterou se server binduje
- **Výchozí hodnota**: `127.0.0.1` (pouze localhost)
- **Production doporučení**: `0.0.0.0` (všechna rozhraní)
- **Příklad**: `SERVER_HOST=0.0.0.0`

### SSL_CERT_PATH
- **Popis**: Cesta k SSL certifikátu pro HTTPS
- **Volitelné**: Ano
- **Formát**: Absolutní nebo relativní cesta k .crt/.pem souboru
- **Příklad**: `SSL_CERT_PATH=/etc/ssl/certs/example.com.crt`

### SSL_KEY_PATH
- **Popis**: Cesta k privátnímu klíči pro HTTPS
- **Volitelné**: Ano
- **Formát**: Absolutní nebo relativní cesta k .key souboru
- **Příklad**: `SSL_KEY_PATH=/etc/ssl/private/example.com.key`

## Automatické funkce

### HTTP/2 aktivace
- Pokud jsou nastaveny obě proměnné `SSL_CERT_PATH` a `SSL_KEY_PATH`, server automaticky:
  - Aktivuje HTTPS
  - Zapne HTTP/2 protokol
  - Aktualizuje Swagger dokumentaci na HTTPS

### Fallback chování
- Pokud SSL certifikáty nejsou nalezeny nebo jsou neplatné:
  - Server pokračuje v HTTP/1.1 režimu
  - Vypíše chybovou zprávu do konzole
  - Aplikace se nesesypie

## Příklady konfigurace

### Development (localhost pouze)
```env
SERVER_HOST=127.0.0.1
SERVER_PORT=8080
# SSL certifikáty nejsou potřeba
```

### Production (HTTP)
```env
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
# SSL certifikáty nejsou potřeba pro HTTP
```

### Production (HTTPS s HTTP/2)
```env
SERVER_HOST=0.0.0.0
SERVER_PORT=443
SSL_CERT_PATH=/etc/ssl/certs/example.com.crt
SSL_KEY_PATH=/etc/ssl/private/example.com.key
```

## Bezpečnostní poznámky

1. **Privátní klíče**: Ujistěte se, že soubory s privátními klíči mají správná oprávnění (600 nebo 400)
2. **Certifikáty**: Používejte pouze platné certifikáty od důvěryhodných CA
3. **Firewall**: Při bindování na `0.0.0.0` ujistěte se, že firewall správně omezuje přístup
4. **Reverse proxy**: V produkci doporučujeme použít reverse proxy (nginx, Apache) před aplikací

## Swagger dokumentace

Swagger UI automaticky detekuje:
- Správný protokol (HTTP/HTTPS)
- Správný hostname
- Správný port

URL bude ve formátu: `{protocol}://{SERVER_HOST}:{SERVER_PORT}/docs`

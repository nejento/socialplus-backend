import { FacebookTokensType } from '../types/schemas';
import { prisma } from '../utils/helpers';
import { logger } from '../utils/logger';

/**
 * Odpověď Facebook API pro dlouhodobý token
 */
interface FacebookLongLivedTokenResponse {
    access_token: string;
    token_type: string;
    expires_in?: number;
}

/**
 * Odpověď Facebook API pro tokeny stránek
 */
interface FacebookPageTokenResponse {
    data: Array<{
        access_token: string;
        category: string;
        category_list: Array<{
            id: string;
            name: string;
        }>;
        name: string;
        id: string;
        tasks: string[];
    }>;
}

/**
 * Správce tokenů pro Facebook - spravuje autentifikaci a tokeny stránek
 */
export class FacebookTokenManager {
    private readonly FACEBOOK_API_BASE = 'https://graph.facebook.com/v23.0';

    /**
     * Inicializuje Facebook tokeny pro danou síť
     * @param networkId - ID sítě v databázi
     * @param tokens - Facebook tokeny od uživatele
     * @returns Promise s výsledkem operace
     */
    async initializeFacebookTokens(networkId: number, tokens: FacebookTokensType): Promise<{ success: boolean; message: string }> {
        try {
            const { appId, appSecret, pageId, shortLivedUserAccessToken } = tokens;

            // Krok 1: Získat longLivedUserAccessToken
            const longLivedUserToken = await this.exchangeForLongLivedToken(
                shortLivedUserAccessToken,
                appId,
                appSecret
            );

            // Krok 2: Získat longLivedPageAccessToken
            const longLivedPageToken = await this.getLongLivedPageAccessToken(
                longLivedUserToken,
                pageId
            );

            // Krok 3: Ověřit oprávnění pro upload obrázků
            await this.verifyPagePermissions(longLivedPageToken, pageId);

            // Krok 4: Uložit tokeny do databáze
            await this.saveTokensToDatabase(networkId, {
                appId,
                appSecret,
                pageId,
                longLivedUserAccessToken: longLivedUserToken,
                longLivedPageAccessToken: longLivedPageToken
            });

            return {
                success: true,
                message: 'Facebook tokeny byly úspěšně inicializovány s oprávněními pro upload obrázků'
            };

        } catch (error) {
            logger.error({ err: error }, 'Facebook token initialization error:');
            return {
                success: false,
                message: `Chyba při inicializaci Facebook tokenů: ${error instanceof Error ? error.message : 'Neznámá chyba'}`
            };
        }
    }

    /**
     * Vymění krátkodobý token za dlouhodobý token
     * @param shortLivedToken - Krátkodobý uživatelský token
     * @param appId - ID Facebook aplikace
     * @param appSecret - Tajný klíč Facebook aplikace
     * @returns Promise<string> - Dlouhodobý uživatelský token
     */
    private async exchangeForLongLivedToken(
        shortLivedToken: string,
        appId: string,
        appSecret: string
    ): Promise<string> {
        const url = `${this.FACEBOOK_API_BASE}/oauth/access_token`;
        const params = new URLSearchParams({
            grant_type: 'fb_exchange_token',
            client_id: appId,
            client_secret: appSecret,
            fb_exchange_token: shortLivedToken
        });

        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Facebook API error při výměně tokenu: ${response.status} - ${errorText}`);
        }

        const data = await response.json() as FacebookLongLivedTokenResponse;
        return data.access_token;
    }

    /**
     * Získá dlouhodobý token pro přístup ke stránce
     * Tokeny stránky získané z dlouhodobých uživatelských tokenů jsou automaticky dlouhodobé a nevypršují
     * @param longLivedUserToken - Dlouhodobý uživatelský token
     * @param pageId - ID Facebook stránky
     * @returns Promise<string> - Token pro přístup ke stránce
     */
    private async getLongLivedPageAccessToken(
        longLivedUserToken: string,
        pageId: string
    ): Promise<string> {
        const url = `${this.FACEBOOK_API_BASE}/me/accounts`;
        const params = new URLSearchParams({
            access_token: longLivedUserToken,
            fields: 'access_token,name,id'
        });

        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Facebook API error při získávání page tokenu: ${response.status} - ${errorText}`);
        }

        const data = await response.json() as FacebookPageTokenResponse;

        // Najde správnou stránku podle pageId
        const page = data.data.find(page => page.id === pageId);
        if (!page) {
            throw new Error(`Stránka s ID ${pageId} nebyla nalezena nebo nemáte k ní přístup`);
        }

        // Pokud máme přístup k page tokenu, znamená to, že máme dostatečná oprávnění
        logger.info(`Page access token získán pro stránku: ${page.name} (${page.id})`);

        return page.access_token;
    }

    /**
     * Ověří oprávnění tokenu stránky pro upload obrázků
     * @param pageAccessToken - Token pro přístup ke stránce
     * @param pageId - ID Facebook stránky
     * @returns Promise<void>
     */
    private async verifyPagePermissions(pageAccessToken: string, pageId: string): Promise<void> {
        const url = `${this.FACEBOOK_API_BASE}/${pageId}`;
        const params = new URLSearchParams({
            access_token: pageAccessToken,
            fields: 'id,name'
        });

        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Nepodařilo se ověřit oprávnění page tokenu: ${response.status} - ${errorText}`);
        }

        const pageInfo = await response.json() as { id: string; name: string };
        logger.info(`Page token ověřen pro stránku: ${pageInfo.name} (${pageInfo.id})`);
    }

    /**
     * Uloží Facebook tokeny do databáze
     * @param networkId - ID sítě v databázi
     * @param tokens - Objekt s všemi potřebnými tokeny
     * @returns Promise<void>
     */
    private async saveTokensToDatabase(
        networkId: number,
        tokens: {
            appId: string;
            appSecret: string;
            pageId: string;
            longLivedUserAccessToken: string;
            longLivedPageAccessToken: string;
        }
    ): Promise<void> {
        // Nejprve smaže všechny existující tokeny pro tuto síť
        await prisma.networkToken.deleteMany({
            where: {
                network_id: networkId
            }
        });

        // Vloží nové tokeny - ukládá pouze page access token
        const tokenData = [
            { network_id: networkId, token_name: 'appId', token: tokens.appId },
            { network_id: networkId, token_name: 'appSecret', token: tokens.appSecret },
            { network_id: networkId, token_name: 'pageId', token: tokens.pageId },
            { network_id: networkId, token_name: 'userAccessToken', token: tokens.longLivedUserAccessToken },
            { network_id: networkId, token_name: 'pageAccessToken', token: tokens.longLivedPageAccessToken }
        ];

        await prisma.networkToken.createMany({
            data: tokenData
        });
    }
}

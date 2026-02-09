"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookTokenManager = void 0;
const helpers_1 = require("../utils/helpers");
const logger_1 = require("../utils/logger");
/**
 * Správce tokenů pro Facebook - spravuje autentifikaci a tokeny stránek
 */
class FacebookTokenManager {
    FACEBOOK_API_BASE = 'https://graph.facebook.com/v23.0';
    /**
     * Inicializuje Facebook tokeny pro danou síť
     * @param networkId - ID sítě v databázi
     * @param tokens - Facebook tokeny od uživatele
     * @returns Promise s výsledkem operace
     */
    async initializeFacebookTokens(networkId, tokens) {
        try {
            const { appId, appSecret, pageId, shortLivedUserAccessToken } = tokens;
            // Krok 1: Získat longLivedUserAccessToken
            const longLivedUserToken = await this.exchangeForLongLivedToken(shortLivedUserAccessToken, appId, appSecret);
            // Krok 2: Získat longLivedPageAccessToken
            const longLivedPageToken = await this.getLongLivedPageAccessToken(longLivedUserToken, pageId);
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
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Facebook token initialization error:');
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
    async exchangeForLongLivedToken(shortLivedToken, appId, appSecret) {
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
        const data = await response.json();
        return data.access_token;
    }
    /**
     * Získá dlouhodobý token pro přístup ke stránce
     * Tokeny stránky získané z dlouhodobých uživatelských tokenů jsou automaticky dlouhodobé a nevypršují
     * @param longLivedUserToken - Dlouhodobý uživatelský token
     * @param pageId - ID Facebook stránky
     * @returns Promise<string> - Token pro přístup ke stránce
     */
    async getLongLivedPageAccessToken(longLivedUserToken, pageId) {
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
        const data = await response.json();
        // Najde správnou stránku podle pageId
        const page = data.data.find(page => page.id === pageId);
        if (!page) {
            throw new Error(`Stránka s ID ${pageId} nebyla nalezena nebo nemáte k ní přístup`);
        }
        // Pokud máme přístup k page tokenu, znamená to, že máme dostatečná oprávnění
        logger_1.logger.info(`Page access token získán pro stránku: ${page.name} (${page.id})`);
        return page.access_token;
    }
    /**
     * Ověří oprávnění tokenu stránky pro upload obrázků
     * @param pageAccessToken - Token pro přístup ke stránce
     * @param pageId - ID Facebook stránky
     * @returns Promise<void>
     */
    async verifyPagePermissions(pageAccessToken, pageId) {
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
        const pageInfo = await response.json();
        logger_1.logger.info(`Page token ověřen pro stránku: ${pageInfo.name} (${pageInfo.id})`);
    }
    /**
     * Uloží Facebook tokeny do databáze
     * @param networkId - ID sítě v databázi
     * @param tokens - Objekt s všemi potřebnými tokeny
     * @returns Promise<void>
     */
    async saveTokensToDatabase(networkId, tokens) {
        // Nejprve smaže všechny existující tokeny pro tuto síť
        await helpers_1.prisma.networkToken.deleteMany({
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
        await helpers_1.prisma.networkToken.createMany({
            data: tokenData
        });
    }
}
exports.FacebookTokenManager = FacebookTokenManager;

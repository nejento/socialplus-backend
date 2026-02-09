"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
/**
 * Poskytovatel pro Threads sociální síť implementující ISocialNetworkProvider
 */
class ThreadsProvider {
    networkType = 'threads';
    /**
     * Odešle příspěvek na Threads pomocí Graph API
     * @param content - Textový obsah příspěvku
     * @param attachments - Pole cest k přílohám (budou ignorovány)
     * @param tokens - Autentifikační tokeny (threadsUserId a longLivedAccessToken)
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async sendPost(content, attachments, tokens) {
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[ThreadsProvider] Token validation failed');
                return null;
            }
            // Používá tokeny přímo - automatický plánovač zpracuje obnovení
            const userId = tokens.threadsUserId;
            const accessToken = tokens.longLivedAccessToken;
            // Ignoruje přílohy podle požadavku - posílá pouze text
            if (attachments && attachments.length > 0) {
                logger_1.logger.warn(`[ThreadsProvider] Ignoring ${attachments.length} attachments - only text posts supported`);
            }
            return await this.postTextOnly(content, accessToken, userId);
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[ThreadsProvider] Failed to send post:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const threadsError = error.response.data;
                logger_1.logger.error({
                    message: threadsError.error?.message,
                    code: threadsError.error?.code
                }, '[ThreadsProvider] Threads API Error:');
            }
            return null;
        }
    }
    /**
     * Odešle pouze textový obsah na Threads pomocí pracovního vzoru příkladu
     * @param text - Textový obsah příspěvku
     * @param accessToken - Přístupový token
     * @param userId - ID uživatele Threads
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async postTextOnly(text, accessToken, userId) {
        const baseUrl = `https://graph.threads.net/v1.0/${userId}/threads`;
        try {
            // Payload pro požadavek vytvoření kontejneru
            const containerPayload = {
                media_type: 'TEXT',
                text: text,
                access_token: accessToken,
            };
            const containerResponse = await axios_1.default.post(baseUrl, containerPayload);
            const containerId = containerResponse.data.id;
            const publishPayload = {
                creation_id: containerId,
                access_token: accessToken,
            };
            const publishResponse = await axios_1.default.post(`${baseUrl}_publish`, publishPayload);
            const postId = publishResponse.data.id;
            logger_1.logger.info({ postId }, '[ThreadsProvider] Text-only post published successfully');
            return postId;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[ThreadsProvider] Error during Threads API call:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                logger_1.logger.error({ data: error.response.data }, '[ThreadsProvider] Threads API Error details:');
            }
            throw error;
        }
    }
    /**
     * Získá metriky výkonu pro Threads příspěvek
     * POZNÁMKA: Monitorování výkonu zakázáno - vyžaduje zvýšená oprávnění
     * @param postId - ID Threads média
     * @param tokens - Autentifikační tokeny
     * @returns Promise<PostPerformanceMetrics | null> - Prázdné metriky výkonu (monitorování zakázáno)
     */
    async getPostPerformance(postId, tokens) {
        try {
            if (!this.validateTokens(tokens)) {
                return null;
            }
            // Vrátí prázdné metriky místo volání API
            return {
                postId: postId,
                networkType: this.networkType,
                timestamp: new Date(),
                likes: 0,
                comments: 0,
                customMetrics: {}
            };
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Získá doporučený interval monitorování pro Threads (1 hodina)
     * @returns number - Počet hodin mezi kontrolami monitorování
     */
    getMonitoringInterval() {
        return 1; // Kontrola každou hodinu
    }
    /**
     * Validuje požadované tokeny
     * @param tokens - Mapa tokenů k validaci
     * @returns boolean - True pokud jsou všechny tokeny platné
     */
    validateTokens(tokens) {
        if (!tokens) {
            logger_1.logger.error('[ThreadsProvider] No tokens provided');
            return false;
        }
        // Zkontroluje požadovaná pole tokenů
        const requiredFields = this.getRequiredTokens();
        for (const field of requiredFields) {
            if (!tokens[field]) {
                logger_1.logger.error(`[ThreadsProvider] Missing required token field: ${field}`);
                return false;
            }
        }
        return true;
    }
    /**
     * Získá názvy požadovaných tokenů pro tohoto poskytovatele
     * @returns string[] - Pole názvů požadovaných tokenů
     */
    getRequiredTokens() {
        return ['longLivedAccessToken', 'threadsUserId'];
    }
}
exports.ThreadsProvider = ThreadsProvider;

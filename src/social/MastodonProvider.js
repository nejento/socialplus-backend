"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MastodonProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
/**
 * Poskytovatel pro Mastodon sociální síť implementující ISocialNetworkProvider
 */
class MastodonProvider {
    networkType = 'mastodon';
    /**
     * Odešle příspěvek na Mastodon pomocí Mastodon API
     * @param content - Textový obsah příspěvku
     * @param attachments - Pole cest k přílohám (obrázky)
     * @param tokens - Autentifikační tokeny (instanceUrl a accessToken)
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async sendPost(content, attachments, tokens) {
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[MastodonProvider] Token validation failed');
                return null;
            }
            const instanceUrl = tokens.instanceUrl;
            const accessToken = tokens.accessToken;
            // Zajistí, že instanceUrl nekončí lomítkem
            const baseUrl = instanceUrl.replace(/\/$/, '');
            let mediaIds = [];
            // Nejprve nahraje přílohy, pokud existují
            if (attachments.length > 0) {
                logger_1.logger.info(`[MastodonProvider] Processing ${attachments.length} attachments`);
                mediaIds = await this.uploadMediaAttachments(baseUrl, accessToken, attachments);
                logger_1.logger.info(`[MastodonProvider] Successfully uploaded ${mediaIds.length}/${attachments.length} attachments`);
            }
            // Vytvoří status příspěvek
            const postData = new FormData();
            postData.append('status', content);
            // Přidá ID médií, pokud máme nějaká
            mediaIds.forEach(mediaId => {
                postData.append('media_ids[]', mediaId);
            });
            const response = await fetch(`${baseUrl}/api/v1/statuses`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: postData
            });
            const result = await response.json();
            if (!response.ok) {
                logger_1.logger.error({
                    error: result.error || result.error_description || 'Unknown error'
                }, '[MastodonProvider] Mastodon API error:');
                return null;
            }
            if (mediaIds.length > 0) {
                logger_1.logger.info({ id: result.id }, `[MastodonProvider] Post with ${mediaIds.length} attachments published successfully`);
            }
            else {
                logger_1.logger.info({ id: result.id }, '[MastodonProvider] Text-only post published successfully');
            }
            return result.id;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[MastodonProvider] Failed to send post:');
            return null;
        }
    }
    /**
     * Nahraje mediální přílohy na Mastodon
     * @param baseUrl - Základní URL Mastodon instance
     * @param accessToken - Přístupový token
     * @param attachments - Pole cest k přílohám
     * @returns Promise<string[]> - Pole ID nahraných médií
     */
    async uploadMediaAttachments(baseUrl, accessToken, attachments) {
        const mediaIds = [];
        for (const attachmentPath of attachments) {
            try {
                const fs = require('fs');
                const path = require('path');
                // Načte soubor
                const fileBuffer = fs.readFileSync(attachmentPath);
                const fileName = path.basename(attachmentPath);
                const formData = new FormData();
                const blob = new Blob([fileBuffer]);
                formData.append('file', blob, fileName);
                const response = await fetch(`${baseUrl}/api/v2/media`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: formData
                });
                const mediaResult = await response.json();
                if (!response.ok) {
                    throw new Error(`Failed to upload media: ${mediaResult.error || 'Unknown error'}`);
                }
                mediaIds.push(mediaResult.id);
            }
            catch (error) {
                logger_1.logger.error({ err: error }, `Error uploading attachment ${attachmentPath}:`);
                // Pokračuje s dalšími přílohami i když jedna selže
            }
        }
        return mediaIds;
    }
    /**
     * Validuje, že jsou přítomny požadované tokeny
     * @param tokens - Mapa tokenů k validaci
     * @returns boolean - True pokud jsou všechny tokeny platné
     */
    validateTokens(tokens) {
        if (!tokens) {
            return false;
        }
        const requiredTokens = this.getRequiredTokens();
        return requiredTokens.every(tokenName => tokens[tokenName] && tokens[tokenName].trim().length > 0);
    }
    /**
     * Získá názvy požadovaných tokenů pro Mastodon
     * @returns string[] - Pole názvů požadovaných tokenů
     */
    getRequiredTokens() {
        return ['instanceUrl', 'accessToken'];
    }
    /**
     * Získá metriky výkonu pro Mastodon příspěvek
     * @param postId - ID Mastodon statusu
     * @param tokens - Autentifikační tokeny obsahující access_token a instance_url
     * @returns Promise<PostPerformanceMetrics | null> - Metriky výkonu nebo null při selhání
     */
    async getPostPerformance(postId, tokens) {
        logger_1.logger.info({ postId }, '[MastodonProvider] Getting performance metrics for status:');
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[MastodonProvider] Invalid tokens for performance metrics');
                return null;
            }
            const accessToken = tokens.accessToken;
            const instanceUrl = tokens.instanceUrl;
            // Získá data statusu z Mastodon API
            const statusData = await this.getStatusData(postId, instanceUrl, accessToken);
            if (!statusData) {
                logger_1.logger.error('[MastodonProvider] Failed to get status data');
                return null;
            }
            // Sestaví metriky výkonu z dostupných dat
            const metrics = {
                postId: postId,
                networkType: this.networkType,
                timestamp: new Date(),
                likes: statusData.favourites_count || 0,
                comments: statusData.replies_count || 0,
                reposts: statusData.reblogs_count || 0
            };
            // Přidá informace o anketě, pokud jsou k dispozici
            if (statusData.poll) {
                metrics.customMetrics = {}; // Only initialize when needed
                metrics.customMetrics['has_poll'] = true;
                metrics.customMetrics['poll_votes'] = statusData.poll.votes_count;
            }
            logger_1.logger.info('[MastodonProvider] Successfully retrieved performance metrics');
            return metrics;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[MastodonProvider] Error getting performance metrics:');
            return null;
        }
    }
    /**
     * Získá doporučený interval monitorování pro Mastodon (1 hodina)
     * @returns number - Počet hodin mezi kontrolami monitorování
     */
    getMonitoringInterval() {
        return 1; // Kontrola každou hodinu - Mastodon je otevřený a nemá přísné limity
    }
    /**
     * Získá data statusu z Mastodon API
     * @param statusId - ID statusu
     * @param instanceUrl - URL Mastodon instance
     * @param accessToken - Přístupový token
     * @returns Promise<any> - Data statusu nebo null při selhání
     */
    async getStatusData(statusId, instanceUrl, accessToken) {
        try {
            const url = `${instanceUrl}/api/v1/statuses/${statusId}`;
            const response = await axios_1.default.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[MastodonProvider] Error getting status data:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                logger_1.logger.error({ data: error.response.data }, '[MastodonProvider] Mastodon API Error:');
            }
            return null;
        }
    }
}
exports.MastodonProvider = MastodonProvider;

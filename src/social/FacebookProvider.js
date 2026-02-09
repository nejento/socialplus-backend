"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs = __importStar(require("fs"));
const logger_1 = require("../utils/logger");
/**
 * Poskytovatel pro Facebook sociální síť implementující ISocialNetworkProvider
 */
class FacebookProvider {
    networkType = 'facebook';
    /**
     * Odešle příspěvek na Facebook pomocí Graph API
     * @param content - Textový obsah příspěvku
     * @param attachments - Pole cest k přílohám (obrázky)
     * @param tokens - Autentifikační tokeny (pageAccessToken a pageId)
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async sendPost(content, attachments, tokens) {
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[FacebookProvider] Token validation failed');
                return null;
            }
            const accessToken = tokens.pageAccessToken;
            const pageId = tokens.pageId;
            // Pokud jsou k dispozici přílohy
            if (attachments && attachments.length > 0) {
                if (attachments.length === 1) {
                    // Nahrání jedné fotky
                    logger_1.logger.info('[FacebookProvider] Processing single photo with caption');
                    return await this.uploadPhotoWithCaption(pageId, accessToken, attachments[0], content);
                }
                else {
                    // Nahrání více fotek
                    logger_1.logger.info(`[FacebookProvider] Processing ${attachments.length} photos for multi-photo post`);
                    return await this.uploadMultiplePhotos(pageId, accessToken, attachments, content);
                }
            }
            else {
                // Příspěvek pouze s textem
                logger_1.logger.info('[FacebookProvider] Processing text-only post');
                return await this.postTextOnly(pageId, accessToken, content);
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[FacebookProvider] Failed to send post:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({
                    message: fbError.error?.message,
                    code: fbError.error?.code
                }, '[FacebookProvider] Facebook API Error:');
            }
            return null;
        }
    }
    /**
     * Nahraje fotografii s popiskem na Facebook
     * @param pageId - ID Facebook stránky
     * @param accessToken - Přístupový token
     * @param filePath - Cesta k souboru obrázku
     * @param caption - Popisek k fotografii
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async uploadPhotoWithCaption(pageId, accessToken, filePath, caption) {
        logger_1.logger.info({ filePath }, '[FacebookProvider] Uploading photo:');
        // Zkontroluje, zda soubor existuje
        if (!fs.existsSync(filePath)) {
            logger_1.logger.error({ filePath }, '[FacebookProvider] File not found:');
            return null;
        }
        const url = `https://graph.facebook.com/v23.0/${pageId}/photos`;
        const form = new form_data_1.default();
        form.append('source', fs.createReadStream(filePath));
        form.append('caption', caption);
        form.append('access_token', accessToken);
        try {
            const response = await axios_1.default.post(url, form, {
                headers: {
                    ...form.getHeaders()
                }
            });
            logger_1.logger.info('[FacebookProvider] Photo uploaded successfully');
            logger_1.logger.info({ photoId: response.data.id }, '[FacebookProvider] Photo ID:');
            logger_1.logger.info({ postId: response.data.post_id }, '[FacebookProvider] Post ID:');
            return response.data.post_id || response.data.id;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[FacebookProvider] Error uploading photo:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
                logger_1.logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
            }
            throw error;
        }
    }
    /**
     * Nahraje více fotografií s popiskem na Facebook
     * @param pageId - ID Facebook stránky
     * @param accessToken - Přístupový token
     * @param filePaths - Pole cest k souborům obrázků
     * @param caption - Popisek k fotografiím
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async uploadMultiplePhotos(pageId, accessToken, filePaths, caption) {
        logger_1.logger.info({ filePaths }, '[FacebookProvider] Uploading multiple photos:');
        try {
            // Krok 1: Nahraje každou fotografii jako nepublikovanou a získá ID fotografií
            const photoIds = [];
            for (const filePath of filePaths) {
                const photoId = await this.uploadUnpublishedPhoto(pageId, accessToken, filePath);
                if (photoId) {
                    photoIds.push(photoId);
                    logger_1.logger.info(`[FacebookProvider] Unpublished photo uploaded with ID: ${photoId}`);
                }
                else {
                    logger_1.logger.warn(`[FacebookProvider] Failed to upload photo: ${filePath}`);
                }
            }
            // Vytvoří příspěvek pouze pokud byla úspěšně nahrána alespoň jedna fotka
            if (photoIds.length > 0) {
                logger_1.logger.info(`[FacebookProvider] Creating multi-photo post with ${photoIds.length} photos...`);
                return await this.createMultiPhotoPost(pageId, accessToken, photoIds, caption);
            }
            else {
                logger_1.logger.error('[FacebookProvider] No photos were successfully uploaded. Aborting post creation.');
                return null;
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[FacebookProvider] Error uploading multiple photos:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
                logger_1.logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
            }
            throw error;
        }
    }
    /**
     * Nahraje jednu fotografii jako nepublikovanou na Facebook
     * @param pageId - ID Facebook stránky
     * @param accessToken - Přístupový token
     * @param filePath - Cesta k souboru obrázku
     * @returns Promise<string | null> - ID fotografie nebo null při chybě
     */
    async uploadUnpublishedPhoto(pageId, accessToken, filePath) {
        // Zkontroluje, zda soubor existuje
        if (!fs.existsSync(filePath)) {
            logger_1.logger.error({ filePath }, '[FacebookProvider] File not found:');
            return null;
        }
        // Parametr 'published=false' je zde klíčový pro zabránění okamžitému zveřejnění obrázku
        const url = `https://graph.facebook.com/v23.0/${pageId}/photos?access_token=${accessToken}&published=false`;
        const form = new form_data_1.default();
        form.append('source', fs.createReadStream(filePath));
        try {
            const response = await axios_1.default.post(url, form, {
                headers: {
                    ...form.getHeaders()
                }
            });
            if (response.data.id) {
                return response.data.id;
            }
            else {
                logger_1.logger.error('[FacebookProvider] Unexpected response from Facebook API for unpublished photo upload');
                return null;
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, `[FacebookProvider] Error uploading unpublished photo ${filePath}:`);
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
            }
            return null;
        }
    }
    /**
     * Vytvoří příspěvek s více fotografiemi pomocí nahraných ID fotografií
     * @param pageId - ID Facebook stránky
     * @param accessToken - Přístupový token
     * @param photoIds - Pole ID nahraných fotografií
     * @param caption - Popisek k příspěvku
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async createMultiPhotoPost(pageId, accessToken, photoIds, caption) {
        if (photoIds.length === 0) {
            logger_1.logger.error('[FacebookProvider] Error: No photo IDs provided.');
            return null;
        }
        const url = `https://graph.facebook.com/v23.0/${pageId}/feed?access_token=${accessToken}`;
        // Musíme formátovat připojená média jako pole objektů
        const attachedMedia = photoIds.map(id => ({ media_fbid: id }));
        const data = {
            message: caption,
            attached_media: attachedMedia,
        };
        try {
            const response = await axios_1.default.post(url, data);
            if (response.data.id) {
                logger_1.logger.info({ postId: response.data.id }, '[FacebookProvider] Multi-photo post created with ID:');
                return response.data.id;
            }
            else {
                logger_1.logger.error('[FacebookProvider] Error: Unexpected response from Facebook API for post creation.');
                return null;
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[FacebookProvider] Error creating multi-photo post:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
                logger_1.logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
            }
            throw error;
        }
    }
    /**
     * Zveřejní textový obsah na Facebook
     * @param pageId - ID Facebook stránky
     * @param accessToken - Přístupový token
     * @param message - Textová zpráva
     * @returns Promise<string | null> - ID příspěvku nebo null při chybě
     */
    async postTextOnly(pageId, accessToken, message) {
        logger_1.logger.info('[FacebookProvider] Posting text content...');
        const url = `https://graph.facebook.com/v23.0/${pageId}/feed`;
        try {
            const response = await axios_1.default.post(url, {
                message: message,
                access_token: accessToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            logger_1.logger.info('[FacebookProvider] Text post created successfully');
            logger_1.logger.info({ postId: response.data.id }, '[FacebookProvider] Post ID:');
            return response.data.id;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[FacebookProvider] Error posting text:');
            if (axios_1.default.isAxiosError(error) && error.response) {
                const fbError = error.response.data;
                logger_1.logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
                logger_1.logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
            }
            throw error;
        }
    }
    /**
     * Získá metriky výkonu pro Facebook příspěvek
     * POZNÁMKA: Monitorování výkonu zakázáno - vyžaduje zvýšená oprávnění
     * @param postId - ID Facebook příspěvku
     * @param tokens - Autentifikační tokeny obsahující pageAccessToken a pageId
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
                shares: 0,
                reactions: {},
                customMetrics: {}
            };
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Získá doporučený interval monitorování pro Facebook (1 hodina)
     * @returns number - Počet hodin mezi kontrolami monitorování
     */
    getMonitoringInterval() {
        return 1; // Kontrola každou hodinu
    }
    /**
     * Validuje, že jsou přítomny požadované tokeny
     * @param tokens - Mapa tokenů k validaci
     * @returns boolean - True pokud jsou všechny tokeny platné
     */
    validateTokens(tokens) {
        // Kontrola null/undefined
        if (!tokens) {
            logger_1.logger.error('[FacebookProvider] Tokens parameter is null or undefined');
            return false;
        }
        const required = this.getRequiredTokens();
        for (const token of required) {
            if (!tokens[token] || tokens[token].trim() === '') {
                logger_1.logger.error(`[FacebookProvider] Missing required token: ${token}`);
                return false;
            }
        }
        logger_1.logger.info('[FacebookProvider] Token validation successful');
        return true;
    }
    /**
     * Získá názvy požadovaných tokenů pro Facebook
     * @returns string[] - Pole názvů požadovaných tokenů
     */
    getRequiredTokens() {
        return ['pageAccessToken', 'pageId'];
    }
}
exports.FacebookProvider = FacebookProvider;

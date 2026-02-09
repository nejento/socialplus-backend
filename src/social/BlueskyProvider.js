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
exports.BlueskyProvider = void 0;
const api_1 = require("@atproto/api");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const logger_1 = require("../utils/logger");
/**
 * Poskytovatel pro Bluesky sociální síť implementující ISocialNetworkProvider pomocí @atproto/api
 */
class BlueskyProvider {
    networkType = 'bluesky';
    agent;
    /**
     * Konstruktor pro BlueskyProvider
     * Inicializuje AT Protocol agenta s Bluesky službou
     */
    constructor() {
        // Inicializuje AT Protocol agenta s Bluesky službou
        this.agent = new api_1.AtpAgent({
            service: 'https://bsky.social'
        });
    }
    /**
     * Odešle příspěvek na Bluesky pomocí oficiální AT Protocol knihovny
     * @param content - Textový obsah příspěvku
     * @param attachments - Pole cest k přílohám (obrázky)
     * @param tokens - Autentifikační tokeny (handle a password)
     * @returns Promise<string | null> - URI příspěvku nebo null při chybě
     */
    async sendPost(content, attachments, tokens) {
        try {
            // Validate that content is not empty
            if (!content || content.trim().length === 0) {
                logger_1.logger.error('[BlueskyProvider] Content is empty or invalid');
                return null;
            }
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[BlueskyProvider] Token validation failed');
                return null;
            }
            const handle = tokens.handle;
            const password = tokens.password;
            // Přihlášení do Bluesky
            const loginResult = await this.agent.login({
                identifier: handle,
                password: password
            });
            if (!loginResult.success) {
                logger_1.logger.error('[BlueskyProvider] Authentication failed');
                return null;
            }
            // Nejprve nahraje přílohy, pokud existují
            let images = [];
            if (attachments.length > 0) {
                logger_1.logger.info(`[BlueskyProvider] Processing ${attachments.length} attachments`);
                images = await this.uploadImageAttachments(attachments);
                logger_1.logger.info(`[BlueskyProvider] Successfully uploaded ${images.length}/${attachments.length} attachments`);
            }
            // Vytvoří záznam příspěvku
            const postRecord = {
                text: content,
                createdAt: new Date().toISOString()
            };
            // Přidá obrázky k příspěvku, pokud jsou k dispozici
            if (images.length > 0) {
                postRecord.embed = {
                    $type: 'app.bsky.embed.images',
                    images: images
                };
            }
            // Vytvoří příspěvek pomocí agenta
            const result = await this.agent.post(postRecord);
            if (images.length > 0) {
                logger_1.logger.info({ uri: result.uri }, `[BlueskyProvider] Post with ${images.length} attachments published successfully`);
            }
            else {
                logger_1.logger.info({ uri: result.uri }, '[BlueskyProvider] Text-only post published successfully');
            }
            return result.uri;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[BlueskyProvider] Failed to send post:');
            return null;
        }
    }
    /**
     * Nahraje obrazové přílohy na Bluesky pomocí oficiálního API
     * Automaticky komprimuje obrázky, které překračují 1MB limit Bluesky
     * Podporuje: JPEG, PNG, WebP, HEIC/HEIF formáty
     * Poznámka: GIFy jsou převedeny na JPEG, protože Bluesky nepodporuje animované GIFy
     * @param attachments - Pole cest k obrázkům
     * @returns Promise<Array> - Pole objektů s nahranými obrázky
     */
    async uploadImageAttachments(attachments) {
        const images = [];
        const MAX_FILE_SIZE = 1024 * 1024; // 1MB v bajtech (skutečný limit Bluesky)
        for (const attachmentPath of attachments) {
            try {
                // Načte soubor
                let fileBuffer = fs.readFileSync(attachmentPath);
                const fileName = path.basename(attachmentPath);
                // Určí mime typ a formát podle přípony souboru
                const ext = path.extname(fileName).toLowerCase();
                let mimeType = 'image/jpeg'; // výchozí
                let isAppleFormat = false;
                if (ext === '.png')
                    mimeType = 'image/png';
                else if (ext === '.webp')
                    mimeType = 'image/webp';
                else if (ext === '.jpg' || ext === '.jpeg')
                    mimeType = 'image/jpeg';
                else if (ext === '.heic' || ext === '.heif') {
                    mimeType = 'image/jpeg'; // Převede HEIC/HEIF na JPEG pro kompatibilitu
                    isAppleFormat = true;
                }
                else if (ext === '.gif') {
                    mimeType = 'image/jpeg'; // Převede GIF na JPEG, protože Bluesky nepodporuje animované GIFy
                    logger_1.logger.info(`Converting GIF ${fileName} to JPEG (Bluesky doesn't support animated GIFs)`);
                }
                // Zkontroluje velikost souboru a komprimuje v případě potřeby
                if (fileBuffer.length > MAX_FILE_SIZE) {
                    logger_1.logger.info(`Image ${fileName} is ${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB, compressing to under 1MB...`);
                    try {
                        fileBuffer = await this.compressImage(fileBuffer, ext, MAX_FILE_SIZE);
                        // Aktualizuje mime typ, pokud byl formát převeden
                        if (ext === '.gif' || ext === '.heic' || ext === '.heif') {
                            mimeType = 'image/jpeg';
                        }
                        logger_1.logger.info(`Compressed image to ${(fileBuffer.length / 1024).toFixed(1)}KB`);
                    }
                    catch (compressionError) {
                        logger_1.logger.error({ err: compressionError }, `Failed to compress image ${fileName}:`);
                        // Pokračuje s původním souborem, pokud komprese selže
                    }
                }
                else if (isAppleFormat || ext === '.gif') {
                    // Převede HEIC/HEIF a GIF i když jsou pod limitem velikosti pro kompatibilitu
                    try {
                        logger_1.logger.info(`Converting ${ext.toUpperCase()} ${fileName} to JPEG for compatibility`);
                        fileBuffer = await this.convertToJpeg(fileBuffer, 85);
                        mimeType = 'image/jpeg';
                    }
                    catch (conversionError) {
                        logger_1.logger.error({ err: conversionError }, `Failed to convert ${fileName}:`);
                        // Pokračuje s původním souborem, pokud převod selže
                    }
                }
                // Nahraje blob pomocí agenta
                const blobResult = await this.agent.uploadBlob(fileBuffer, {
                    encoding: mimeType
                });
                if (blobResult.success) {
                    images.push({
                        image: blobResult.data.blob,
                        alt: '' // Prázdný alt text, mohlo by být rozšířeno o přijímání alt textu jako parametru
                    });
                }
                else {
                    logger_1.logger.error(`Failed to upload attachment ${attachmentPath}`);
                }
            }
            catch (error) {
                logger_1.logger.error({ err: error }, `Error uploading attachment ${attachmentPath}:`);
                // Pokračuje s dalšími přílohami i když jedna selže
            }
        }
        return images;
    }
    /**
     * Komprimuje obrázek tak, aby se vešel do specifikovaného limitu velikosti
     * @param fileBuffer - Buffer s daty obrázku
     * @param ext - Přípona souboru
     * @param maxSize - Maximální velikost v bajtech
     * @returns Promise<Buffer> - Komprimovaný obrázek
     */
    async compressImage(fileBuffer, ext, maxSize) {
        let quality = 85; // Začne s 85% kvalitou
        let compressedBuffer;
        // První pokus: Komprese kvality
        do {
            compressedBuffer = await this.convertImageWithQuality(fileBuffer, ext, quality);
            // Sníží kvalitu, pokud je stále příliš velký
            if (compressedBuffer.length > maxSize && quality > 50) {
                quality -= 10;
            }
            else {
                break;
            }
        } while (compressedBuffer.length > maxSize && quality >= 50);
        // Pokud je stále příliš velký, změní velikost obrázku
        if (compressedBuffer.length > maxSize) {
            logger_1.logger.info(`Still too large after compression, resizing image...`);
            const metadata = await (0, sharp_1.default)(fileBuffer).metadata();
            let { width, height } = metadata;
            // Iterativně zmenšuje rozměry o 15% dokud se nevejde pod limit velikosti
            do {
                width = Math.floor(width * 0.85);
                height = Math.floor(height * 0.85);
                compressedBuffer = await this.resizeAndCompress(fileBuffer, width, height, ext, 85);
            } while (compressedBuffer.length > maxSize && width > 200);
        }
        return compressedBuffer;
    }
    /**
     * Převede obrázek se specifikovanou kvalitou
     * @param fileBuffer - Buffer s daty obrázku
     * @param ext - Přípona souboru
     * @param quality - Kvalita komprese (0-100)
     * @returns Promise<Buffer> - Převedený obrázek
     */
    async convertImageWithQuality(fileBuffer, ext, quality) {
        const sharpInstance = (0, sharp_1.default)(fileBuffer);
        if (ext === '.png') {
            return await sharpInstance
                .png({ quality, compressionLevel: 9 })
                .toBuffer();
        }
        else if (ext === '.webp') {
            return await sharpInstance
                .webp({ quality })
                .toBuffer();
        }
        else {
            // Převede na JPEG pro lepší kompresi (GIF, JPEG, HEIC, HEIF, atd.)
            return await sharpInstance
                .jpeg({ quality })
                .toBuffer();
        }
    }
    /**
     * Změní velikost a komprimuje obrázek
     * @param fileBuffer - Buffer s daty obrázku
     * @param width - Nová šířka
     * @param height - Nová výška
     * @param ext - Přípona souboru
     * @param quality - Kvalita komprese
     * @returns Promise<Buffer> - Zpracovaný obrázek
     */
    async resizeAndCompress(fileBuffer, width, height, ext, quality) {
        const sharpInstance = (0, sharp_1.default)(fileBuffer).resize(width, height);
        if (ext === '.png') {
            return await sharpInstance
                .png({ quality, compressionLevel: 9 })
                .toBuffer();
        }
        else if (ext === '.webp') {
            return await sharpInstance
                .webp({ quality })
                .toBuffer();
        }
        else {
            return await sharpInstance
                .jpeg({ quality })
                .toBuffer();
        }
    }
    /**
     * Převede jakýkoliv obrázek do JPEG formátu
     * @param fileBuffer - Buffer s daty obrázku
     * @param quality - Kvalita JPEG (výchozí: 85)
     * @returns Promise<Buffer> - JPEG obrázek
     */
    async convertToJpeg(fileBuffer, quality = 85) {
        return await (0, sharp_1.default)(fileBuffer)
            .jpeg({ quality })
            .toBuffer();
    }
    /**
     * Validuje, že jsou přítomny požadované tokeny
     * @param tokens - Mapa tokenů k validaci
     * @returns boolean - True pokud jsou všechny tokeny platné
     */
    validateTokens(tokens) {
        // Check if tokens is null or undefined first
        if (!tokens) {
            return false;
        }
        const requiredTokens = this.getRequiredTokens();
        return requiredTokens.every(tokenName => tokens[tokenName] && tokens[tokenName].trim().length > 0);
    }
    /**
     * Získá názvy požadovaných tokenů pro Bluesky
     * @returns string[] - Pole názvů požadovaných tokenů
     */
    getRequiredTokens() {
        return ['handle', 'password'];
    }
    /**
     * Získá metriky výkonu pro Bluesky příspěvek
     * @param postId - URI Bluesky příspěvku (at://did:plc:xxx/app.bsky.feed.post/xxx)
     * @param tokens - Autentifikační tokeny obsahující handle a password
     * @returns Promise<PostPerformanceMetrics | null> - Metriky výkonu nebo null při selhání
     */
    async getPostPerformance(postId, tokens) {
        logger_1.logger.info({ postId }, '[BlueskyProvider] Getting performance metrics for post:');
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[BlueskyProvider] Invalid tokens for performance metrics');
                return null;
            }
            // Přihlášení do Bluesky
            const loginResult = await this.agent.login({
                identifier: tokens.handle,
                password: tokens.password
            });
            if (!loginResult.success) {
                logger_1.logger.error('[BlueskyProvider] Failed to login to Bluesky for metrics');
                return null;
            }
            // Získá vlákno příspěvku pro načtení dat o zapojení
            const threadResponse = await this.agent.getPostThread({
                uri: postId,
                depth: 0
            });
            if (!threadResponse.success || !threadResponse.data.thread) {
                logger_1.logger.error('[BlueskyProvider] Failed to get post thread');
                return null;
            }
            // Zkontroluje, zda je vlákno ThreadViewPost (má vlastnost post)
            const thread = threadResponse.data.thread;
            if (!('post' in thread)) {
                logger_1.logger.error('[BlueskyProvider] Thread is not a valid post (may be blocked or not found)');
                return null;
            }
            const post = thread.post;
            // Sestaví metriky výkonu z dostupných dat
            const metrics = {
                postId: postId,
                networkType: this.networkType,
                timestamp: new Date(),
                likes: post.likeCount || 0,
                comments: post.replyCount || 0,
                reposts: post.repostCount || 0
            };
            logger_1.logger.info('[BlueskyProvider] Successfully retrieved performance metrics');
            return metrics;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[BlueskyProvider] Error getting performance metrics:');
            return null;
        }
    }
    /**
     * Získá doporučený interval monitorování pro Bluesky (1 hodina)
     * @returns number - Počet hodin mezi kontrolami monitorování
     */
    getMonitoringInterval() {
        return 1; // Kontrola každou hodinu - Bluesky je otevřenější než Twitter
    }
}
exports.BlueskyProvider = BlueskyProvider;

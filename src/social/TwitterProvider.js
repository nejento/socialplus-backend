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
exports.TwitterProvider = void 0;
const oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
const crypto = __importStar(require("crypto"));
const logger_1 = require("../utils/logger");
/**
 * Poskytovatel pro Twitter/X sociální síť implementující ISocialNetworkProvider
 * Používá Twitter API v2 pro odesílání tweetů - POUZE TEXT
 * Nahrávání médií zakázáno kvůli problémům s Twitter API po akvizici Elonem Muskem
 */
class TwitterProvider {
    networkType = 'twitter';
    oauth;
    /**
     * Konstruktor pro TwitterProvider
     * Inicializuje OAuth klienta
     */
    constructor() {
        this.oauth = new oauth_1_0a_1.default({
            consumer: { key: '', secret: '' },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64');
            },
        });
    }
    /**
     * Odešle textový příspěvek na Twitter
     * NAHRÁVÁNÍ MÉDIÍ ZAKÁZÁNO - přílohy budou ignorovány
     * @param content - Textový obsah tweetu
     * @param attachments - Pole příloh (bude ignorováno)
     * @param tokens - Autentifikační tokeny pro Twitter API
     * @returns Promise<string | null> - ID tweetu nebo null při chybě
     */
    async sendPost(content, attachments, tokens) {
        // Varuje o ignorovaných přílohách
        if (attachments && attachments.length > 0) {
            logger_1.logger.warn(`[TwitterProvider] Ignoring ${attachments.length} attachments - media upload disabled`);
        }
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[TwitterProvider] Token validation failed');
                return null;
            }
            // Nakonfiguruje OAuth s uživatelskými tokeny
            this.oauth = new oauth_1_0a_1.default({
                consumer: {
                    key: tokens.api_key,
                    secret: tokens.api_secret
                },
                signature_method: 'HMAC-SHA1',
                hash_function(base_string, key) {
                    return crypto
                        .createHmac('sha1', key)
                        .update(base_string)
                        .digest('base64');
                },
            });
            // Vytvoří tweet pomocí API v2 - POUZE TEXT
            const tweetData = {
                text: content
            };
            // Použije OAuth 1.0a User Context pro API v2 (požadováno pro odesílání tweetů)
            const token = {
                key: tokens.access_token,
                secret: tokens.access_token_secret,
            };
            const requestData = {
                url: 'https://api.twitter.com/2/tweets',
                method: 'POST',
            };
            // Vygeneruje OAuth authorization header
            const oAuthHeaders = this.oauth.toHeader(this.oauth.authorize(requestData, token));
            const response = await fetch('https://api.twitter.com/2/tweets', {
                method: 'POST',
                headers: {
                    ...oAuthHeaders,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tweetData)
            });
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = result.detail ||
                    result.title ||
                    result.errors?.[0]?.message ||
                    `HTTP ${response.status}: ${response.statusText}`;
                logger_1.logger.error({ error: errorMessage }, '[TwitterProvider] Twitter API error:');
                return null;
            }
            logger_1.logger.info({ tweetId: result.data?.id }, '[TwitterProvider] Text-only post published successfully');
            return result.data?.id;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[TwitterProvider] Failed to send post:');
            return null;
        }
    }
    /**
     * Získá metriky výkonu pro Twitter příspěvek pomocí nového analytics endpointu
     * POZNÁMKA: Monitorování výkonu zakázáno - vyžaduje zvýšená oprávnění
     * @param postId - ID Twitter tweetu
     * @param tokens - Autentifikační tokeny
     * @returns Promise<PostPerformanceMetrics | null> - Prázdné metriky výkonu (monitorování zakázáno)
     */
    async getPostPerformance(postId, tokens) {
        // Monitorování výkonu zakázáno - vyžaduje zvýšená oprávnění, která stojí příliš mnoho
        logger_1.logger.debug({ postId }, '[TwitterProvider] Getting performance metrics for tweet:');
        try {
            if (!this.validateTokens(tokens)) {
                logger_1.logger.error('[TwitterProvider] Invalid tokens for performance metrics');
                return null;
            }
            // Vrátí prázdné metriky místo volání API
            return {
                postId: postId,
                networkType: this.networkType,
                timestamp: new Date(),
                likes: 0,
                comments: 0,
                reposts: 0,
                reactions: {
                    likes: 0,
                    retweets: 0,
                    quotes: 0,
                    replies: 0
                },
                customMetrics: {}
            };
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[TwitterProvider] Error getting performance metrics:');
            return null;
        }
    }
    /**
     * Získá doporučený interval monitorování pro Twitter (12 hodin kvůli limitům API)
     * @returns number - Počet hodin mezi kontrolami monitorování
     */
    getMonitoringInterval() {
        return 12; // Kontrola každých 12 hodin kvůli přísným limitům Twitter API
    }
    /**
     * Validuje tokeny pro přístup k Twitter API
     * @param tokens - Mapa tokenů k validaci
     * @returns boolean - True pokud jsou všechny tokeny platné
     */
    validateTokens(tokens) {
        if (!tokens) {
            return false;
        }
        const requiredTokens = this.getRequiredTokens();
        return requiredTokens.every(token => tokens[token] && tokens[token].trim() !== '');
    }
    /**
     * Získá požadované tokeny pro Twitter API
     * @returns string[] - Pole názvů požadovaných tokenů
     */
    getRequiredTokens() {
        return ['api_key', 'api_secret', 'access_token', 'access_token_secret'];
    }
}
exports.TwitterProvider = TwitterProvider;

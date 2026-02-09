import {ISocialNetworkProvider, PostPerformanceMetrics} from './ISocialNetworkProvider';
import OAuth from 'oauth-1.0a';
import * as crypto from 'crypto';
import { logger } from '../utils/logger';

// Typy odpovědí Twitter API pro v2
interface TwitterTweetResponse {
  data: {
    id: string;
    text: string;
  };
}

interface TwitterErrorResponse {
  detail?: string;
  title?: string;
  type?: string;
  errors?: Array<{
    message: string;
    code: number;
    field?: string;
  }>;
}

/**
 * Poskytovatel pro Twitter/X sociální síť implementující ISocialNetworkProvider
 * Používá Twitter API v2 pro odesílání tweetů - POUZE TEXT
 * Nahrávání médií zakázáno kvůli problémům s Twitter API po akvizici Elonem Muskem
 */
export class TwitterProvider implements ISocialNetworkProvider {
  readonly networkType = 'twitter';
  private oauth: OAuth;

  /**
   * Konstruktor pro TwitterProvider
   * Inicializuje OAuth klienta
   */
  constructor() {
    this.oauth = new OAuth({
      consumer: { key: '', secret: '' },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string: string, key: string): string {
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
  async sendPost(
    content: string,
    attachments: string[],
    tokens: Record<string, string>
  ): Promise<string | null> {
    // Varuje o ignorovaných přílohách
    if (attachments && attachments.length > 0) {
      logger.warn(`[TwitterProvider] Ignoring ${attachments.length} attachments - media upload disabled`);
    }

    try {
      if (!this.validateTokens(tokens)) {
        logger.error('[TwitterProvider] Token validation failed');
        return null;
      }

      // Nakonfiguruje OAuth s uživatelskými tokeny
      this.oauth = new OAuth({
        consumer: {
          key: tokens.api_key,
          secret: tokens.api_secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string: string, key: string): string {
          return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64');
        },
      });

      // Vytvoří tweet pomocí API v2 - POUZE TEXT
      const tweetData: any = {
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

      const result = await response.json() as TwitterTweetResponse & TwitterErrorResponse;

      if (!response.ok) {
        const errorMessage = result.detail || 
          result.title || 
          result.errors?.[0]?.message || 
          `HTTP ${response.status}: ${response.statusText}`;
        logger.error({ error: errorMessage }, '[TwitterProvider] Twitter API error:');
        return null;
      }

      logger.info({ tweetId: result.data?.id }, '[TwitterProvider] Text-only post published successfully');
      return result.data?.id;
    } catch (error) {
      logger.error({ err: error }, '[TwitterProvider] Failed to send post:');
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
  async getPostPerformance(
    postId: string,
    tokens: Record<string, string>
  ): Promise<PostPerformanceMetrics | null> {
    // Monitorování výkonu zakázáno - vyžaduje zvýšená oprávnění, která stojí příliš mnoho
    logger.debug({ postId }, '[TwitterProvider] Getting performance metrics for tweet:');

    try {
      if (!this.validateTokens(tokens)) {
        logger.error('[TwitterProvider] Invalid tokens for performance metrics');
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

    } catch (error) {
      logger.error({ err: error }, '[TwitterProvider] Error getting performance metrics:');
      return null;
    }
  }

  /**
   * Získá doporučený interval monitorování pro Twitter (12 hodin kvůli limitům API)
   * @returns number - Počet hodin mezi kontrolami monitorování
   */
  getMonitoringInterval(): number {
    return 12; // Kontrola každých 12 hodin kvůli přísným limitům Twitter API
  }

  /**
   * Validuje tokeny pro přístup k Twitter API
   * @param tokens - Mapa tokenů k validaci
   * @returns boolean - True pokud jsou všechny tokeny platné
   */
  validateTokens(tokens: Record<string, string>): boolean {
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
  getRequiredTokens(): string[] {
    return ['api_key', 'api_secret', 'access_token', 'access_token_secret'];
  }
}

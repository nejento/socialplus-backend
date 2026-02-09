import {ISocialNetworkProvider, PostPerformanceMetrics} from './ISocialNetworkProvider';
import axios from 'axios';
import { logger } from '../utils/logger';

// Typy odpovědí Threads API
interface ThreadsMediaResponse {
  id: string;
}

interface ThreadsPostResponse {
  id: string;
}

interface ThreadsErrorResponse {
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
  };
}

/**
 * Poskytovatel pro Threads sociální síť implementující ISocialNetworkProvider
 */
export class ThreadsProvider implements ISocialNetworkProvider {
  readonly networkType = 'threads';

  /**
   * Odešle příspěvek na Threads pomocí Graph API
   * @param content - Textový obsah příspěvku
   * @param attachments - Pole cest k přílohám (budou ignorovány)
   * @param tokens - Autentifikační tokeny (threadsUserId a longLivedAccessToken)
   * @returns Promise<string | null> - ID příspěvku nebo null při chybě
   */
  async sendPost(
    content: string,
    attachments: string[],
    tokens: Record<string, string>
  ): Promise<string | null> {
    try {
      if (!this.validateTokens(tokens)) {
        logger.error('[ThreadsProvider] Token validation failed');
        return null;
      }

      // Používá tokeny přímo - automatický plánovač zpracuje obnovení
      const userId = tokens.threadsUserId;
      const accessToken = tokens.longLivedAccessToken;

      // Ignoruje přílohy podle požadavku - posílá pouze text
      if (attachments && attachments.length > 0) {
        logger.warn(`[ThreadsProvider] Ignoring ${attachments.length} attachments - only text posts supported`);
      }

      return await this.postTextOnly(content, accessToken, userId);

    } catch (error) {
      logger.error({ err: error }, '[ThreadsProvider] Failed to send post:');
      if (axios.isAxiosError(error) && error.response) {
        const threadsError = error.response.data as ThreadsErrorResponse;
        logger.error({
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
  private async postTextOnly(text: string, accessToken: string, userId: string): Promise<string | null> {
    const baseUrl = `https://graph.threads.net/v1.0/${userId}/threads`;

    try {
      // Payload pro požadavek vytvoření kontejneru
      const containerPayload = {
        media_type: 'TEXT',
        text: text,
        access_token: accessToken,
      };

      const containerResponse = await axios.post<ThreadsMediaResponse>(baseUrl, containerPayload);
      const containerId = containerResponse.data.id;

      const publishPayload = {
        creation_id: containerId,
        access_token: accessToken,
      };

      const publishResponse = await axios.post<ThreadsPostResponse>(`${baseUrl}_publish`, publishPayload);
      const postId = publishResponse.data.id;

      logger.info({ postId }, '[ThreadsProvider] Text-only post published successfully');

      return postId;

    } catch (error) {
      logger.error({ err: error }, '[ThreadsProvider] Error during Threads API call:');
      if (axios.isAxiosError(error) && error.response) {
        logger.error({ data: error.response.data }, '[ThreadsProvider] Threads API Error details:');
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
  async getPostPerformance(
    postId: string,
    tokens: Record<string, string>
  ): Promise<PostPerformanceMetrics | null> {

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

    } catch (error) {
      return null;
    }
  }

  /**
   * Získá doporučený interval monitorování pro Threads (1 hodina)
   * @returns number - Počet hodin mezi kontrolami monitorování
   */
  getMonitoringInterval(): number {
    return 1; // Kontrola každou hodinu
  }

  /**
   * Validuje požadované tokeny
   * @param tokens - Mapa tokenů k validaci
   * @returns boolean - True pokud jsou všechny tokeny platné
   */
  validateTokens(tokens: Record<string, string>): boolean {
    if (!tokens) {
      logger.error('[ThreadsProvider] No tokens provided');
      return false;
    }

    // Zkontroluje požadovaná pole tokenů
    const requiredFields = this.getRequiredTokens();
    for (const field of requiredFields) {
      if (!tokens[field]) {
        logger.error(`[ThreadsProvider] Missing required token field: ${field}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Získá názvy požadovaných tokenů pro tohoto poskytovatele
   * @returns string[] - Pole názvů požadovaných tokenů
   */
  getRequiredTokens(): string[] {
    return ['longLivedAccessToken', 'threadsUserId'];
  }
}

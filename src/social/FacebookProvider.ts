import {ISocialNetworkProvider, PostPerformanceMetrics} from './ISocialNetworkProvider';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import { logger } from '../utils/logger';

// Typy odpovědí Facebook API
interface FacebookPostResponse {
  id: string;
  post_id?: string;
}

interface FacebookErrorResponse {
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
  };
}

/**
 * Poskytovatel pro Facebook sociální síť implementující ISocialNetworkProvider
 */
export class FacebookProvider implements ISocialNetworkProvider {
  readonly networkType = 'facebook';

  /**
   * Odešle příspěvek na Facebook pomocí Graph API
   * @param content - Textový obsah příspěvku
   * @param attachments - Pole cest k přílohám (obrázky)
   * @param tokens - Autentifikační tokeny (pageAccessToken a pageId)
   * @returns Promise<string | null> - ID příspěvku nebo null při chybě
   */
  async sendPost(
    content: string,
    attachments: string[],
    tokens: Record<string, string>
  ): Promise<string | null> {
    try {
      if (!this.validateTokens(tokens)) {
        logger.error('[FacebookProvider] Token validation failed');
        return null;
      }

      const accessToken = tokens.pageAccessToken;
      const pageId = tokens.pageId;

      // Pokud jsou k dispozici přílohy
      if (attachments && attachments.length > 0) {
        if (attachments.length === 1) {
          // Nahrání jedné fotky
          logger.info('[FacebookProvider] Processing single photo with caption');
          return await this.uploadPhotoWithCaption(pageId, accessToken, attachments[0], content);
        } else {
          // Nahrání více fotek
          logger.info(`[FacebookProvider] Processing ${attachments.length} photos for multi-photo post`);
          return await this.uploadMultiplePhotos(pageId, accessToken, attachments, content);
        }
      } else {
        // Příspěvek pouze s textem
        logger.info('[FacebookProvider] Processing text-only post');
        return await this.postTextOnly(pageId, accessToken, content);
      }

    } catch (error) {
      logger.error({ err: error }, '[FacebookProvider] Failed to send post:');
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({
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
  private async uploadPhotoWithCaption(
    pageId: string,
    accessToken: string,
    filePath: string,
    caption: string
  ): Promise<string | null> {
    logger.info({ filePath }, '[FacebookProvider] Uploading photo:');

    // Zkontroluje, zda soubor existuje
    if (!fs.existsSync(filePath)) {
      logger.error({ filePath }, '[FacebookProvider] File not found:');
      return null;
    }

    const url = `https://graph.facebook.com/v23.0/${pageId}/photos`;

    const form = new FormData();
    form.append('source', fs.createReadStream(filePath));
    form.append('caption', caption);
    form.append('access_token', accessToken);

    try {
      const response = await axios.post<FacebookPostResponse>(url, form, {
        headers: {
          ...form.getHeaders()
        }
      });

      logger.info('[FacebookProvider] Photo uploaded successfully');
      logger.info({ photoId: response.data.id }, '[FacebookProvider] Photo ID:');
      logger.info({ postId: response.data.post_id }, '[FacebookProvider] Post ID:');

      return response.data.post_id || response.data.id;

    } catch (error) {
      logger.error({ err: error }, '[FacebookProvider] Error uploading photo:');
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
        logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
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
  private async uploadMultiplePhotos(
    pageId: string,
    accessToken: string,
    filePaths: string[],
    caption: string
  ): Promise<string | null> {
    logger.info({ filePaths }, '[FacebookProvider] Uploading multiple photos:');

    try {
      // Krok 1: Nahraje každou fotografii jako nepublikovanou a získá ID fotografií
      const photoIds: string[] = [];

      for (const filePath of filePaths) {
        const photoId = await this.uploadUnpublishedPhoto(pageId, accessToken, filePath);
        if (photoId) {
          photoIds.push(photoId);
          logger.info(`[FacebookProvider] Unpublished photo uploaded with ID: ${photoId}`);
        } else {
          logger.warn(`[FacebookProvider] Failed to upload photo: ${filePath}`);
        }
      }

      // Vytvoří příspěvek pouze pokud byla úspěšně nahrána alespoň jedna fotka
      if (photoIds.length > 0) {
        logger.info(`[FacebookProvider] Creating multi-photo post with ${photoIds.length} photos...`);
        return await this.createMultiPhotoPost(pageId, accessToken, photoIds, caption);
      } else {
        logger.error('[FacebookProvider] No photos were successfully uploaded. Aborting post creation.');
        return null;
      }

    } catch (error) {
      logger.error({ err: error }, '[FacebookProvider] Error uploading multiple photos:');
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
        logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
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
  private async uploadUnpublishedPhoto(
    pageId: string,
    accessToken: string,
    filePath: string
  ): Promise<string | null> {
    // Zkontroluje, zda soubor existuje
    if (!fs.existsSync(filePath)) {
      logger.error({ filePath }, '[FacebookProvider] File not found:');
      return null;
    }

    // Parametr 'published=false' je zde klíčový pro zabránění okamžitému zveřejnění obrázku
    const url = `https://graph.facebook.com/v23.0/${pageId}/photos?access_token=${accessToken}&published=false`;

    const form = new FormData();
    form.append('source', fs.createReadStream(filePath));

    try {
      const response = await axios.post<FacebookPostResponse>(url, form, {
        headers: {
          ...form.getHeaders()
        }
      });

      if (response.data.id) {
        return response.data.id;
      } else {
        logger.error('[FacebookProvider] Unexpected response from Facebook API for unpublished photo upload');
        return null;
      }
    } catch (error) {
      logger.error({ err: error }, `[FacebookProvider] Error uploading unpublished photo ${filePath}:`);
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
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
  private async createMultiPhotoPost(
    pageId: string,
    accessToken: string,
    photoIds: string[],
    caption: string
  ): Promise<string | null> {
    if (photoIds.length === 0) {
      logger.error('[FacebookProvider] Error: No photo IDs provided.');
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
      const response = await axios.post<FacebookPostResponse>(url, data);

      if (response.data.id) {
        logger.info({ postId: response.data.id }, '[FacebookProvider] Multi-photo post created with ID:');
        return response.data.id;
      } else {
        logger.error('[FacebookProvider] Error: Unexpected response from Facebook API for post creation.');
        return null;
      }
    } catch (error) {
      logger.error({ err: error }, '[FacebookProvider] Error creating multi-photo post:');
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
        logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
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
  private async postTextOnly(
    pageId: string,
    accessToken: string,
    message: string
  ): Promise<string | null> {
    logger.info('[FacebookProvider] Posting text content...');

    const url = `https://graph.facebook.com/v23.0/${pageId}/feed`;

    try {
      const response = await axios.post<FacebookPostResponse>(url, {
        message: message,
        access_token: accessToken
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      logger.info('[FacebookProvider] Text post created successfully');
      logger.info({ postId: response.data.id }, '[FacebookProvider] Post ID:');

      return response.data.id;

    } catch (error) {
      logger.error({ err: error }, '[FacebookProvider] Error posting text:');
      if (axios.isAxiosError(error) && error.response) {
        const fbError = error.response.data as FacebookErrorResponse;
        logger.error({ message: fbError.error?.message }, '[FacebookProvider] Facebook API Error:');
        logger.error({ code: fbError.error?.code }, '[FacebookProvider] Error Code:');
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
          shares: 0,
          reactions: {},
          customMetrics: {}
      };


    } catch (error) {
      return null;
    }
  }

  /**
   * Získá doporučený interval monitorování pro Facebook (1 hodina)
   * @returns number - Počet hodin mezi kontrolami monitorování
   */
  getMonitoringInterval(): number {
    return 1; // Kontrola každou hodinu
  }

  /**
   * Validuje, že jsou přítomny požadované tokeny
   * @param tokens - Mapa tokenů k validaci
   * @returns boolean - True pokud jsou všechny tokeny platné
   */
  validateTokens(tokens: Record<string, string>): boolean {
    // Kontrola null/undefined
    if (!tokens) {
      logger.error('[FacebookProvider] Tokens parameter is null or undefined');
      return false;
    }

    const required = this.getRequiredTokens();

    for (const token of required) {
      if (!tokens[token] || tokens[token].trim() === '') {
        logger.error(`[FacebookProvider] Missing required token: ${token}`);
        return false;
      }
    }

    logger.info('[FacebookProvider] Token validation successful');
    return true;
  }

  /**
   * Získá názvy požadovaných tokenů pro Facebook
   * @returns string[] - Pole názvů požadovaných tokenů
   */
  getRequiredTokens(): string[] {
    return ['pageAccessToken', 'pageId'];
  }
}

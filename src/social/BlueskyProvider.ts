import { ISocialNetworkProvider, PostPerformanceMetrics } from './ISocialNetworkProvider';
import { AtpAgent, BlobRef } from '@atproto/api';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { logger } from '../utils/logger';

/**
 * Poskytovatel pro Bluesky sociální síť implementující ISocialNetworkProvider pomocí @atproto/api
 */
export class BlueskyProvider implements ISocialNetworkProvider {
  readonly networkType = 'bluesky';
  private agent: AtpAgent;

  /**
   * Konstruktor pro BlueskyProvider
   * Inicializuje AT Protocol agenta s Bluesky službou
   */
  constructor() {
    // Inicializuje AT Protocol agenta s Bluesky službou
    this.agent = new AtpAgent({
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
  async sendPost(
    content: string,
    attachments: string[],
    tokens: Record<string, string>
  ): Promise<string | null> {
    try {
      // Validate that content is not empty
      if (!content || content.trim().length === 0) {
        logger.error('[BlueskyProvider] Content is empty or invalid');
        return null;
      }

      if (!this.validateTokens(tokens)) {
        logger.error('[BlueskyProvider] Token validation failed');
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
        logger.error('[BlueskyProvider] Authentication failed');
        return null;
      }

      // Nejprve nahraje přílohy, pokud existují
      let images: { image: BlobRef; alt: string }[] = [];
      if (attachments.length > 0) {
        logger.info(`[BlueskyProvider] Processing ${attachments.length} attachments`);
        images = await this.uploadImageAttachments(attachments);
        logger.info(`[BlueskyProvider] Successfully uploaded ${images.length}/${attachments.length} attachments`);
      }

      // Vytvoří záznam příspěvku
      const postRecord: any = {
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
        logger.info({ uri: result.uri }, `[BlueskyProvider] Post with ${images.length} attachments published successfully`);
      } else {
        logger.info({ uri: result.uri }, '[BlueskyProvider] Text-only post published successfully');
      }

      return result.uri;

    } catch (error) {
      logger.error({ err: error }, '[BlueskyProvider] Failed to send post:');
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
  private async uploadImageAttachments(attachments: string[]): Promise<{ image: BlobRef; alt: string }[]> {
    const images: { image: BlobRef; alt: string }[] = [];
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

        if (ext === '.png') mimeType = 'image/png';
        else if (ext === '.webp') mimeType = 'image/webp';
        else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else if (ext === '.heic' || ext === '.heif') {
          mimeType = 'image/jpeg'; // Převede HEIC/HEIF na JPEG pro kompatibilitu
          isAppleFormat = true;
        }
        else if (ext === '.gif') {
          mimeType = 'image/jpeg'; // Převede GIF na JPEG, protože Bluesky nepodporuje animované GIFy
          logger.info(`Converting GIF ${fileName} to JPEG (Bluesky doesn't support animated GIFs)`);
        }

        // Zkontroluje velikost souboru a komprimuje v případě potřeby
        if (fileBuffer.length > MAX_FILE_SIZE) {
          logger.info(`Image ${fileName} is ${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB, compressing to under 1MB...`);

          try {
            fileBuffer = Buffer.from(await this.compressImage(fileBuffer, ext, MAX_FILE_SIZE));

            // Aktualizuje mime typ, pokud byl formát převeden
            if (ext === '.gif' || ext === '.heic' || ext === '.heif') {
              mimeType = 'image/jpeg';
            }

            logger.info(`Compressed image to ${(fileBuffer.length / 1024).toFixed(1)}KB`);

          } catch (compressionError) {
            logger.error({ err: compressionError }, `Failed to compress image ${fileName}:`);
            // Pokračuje s původním souborem, pokud komprese selže
          }
        } else if (isAppleFormat || ext === '.gif') {
          // Převede HEIC/HEIF a GIF i když jsou pod limitem velikosti pro kompatibilitu
          try {
            logger.info(`Converting ${ext.toUpperCase()} ${fileName} to JPEG for compatibility`);
            fileBuffer = Buffer.from(await this.convertToJpeg(fileBuffer, 85));
            mimeType = 'image/jpeg';
          } catch (conversionError) {
            logger.error({ err: conversionError }, `Failed to convert ${fileName}:`);
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
        } else {
          logger.error(`Failed to upload attachment ${attachmentPath}`);
        }

      } catch (error) {
        logger.error({ err: error }, `Error uploading attachment ${attachmentPath}:`);
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
  private async compressImage(fileBuffer: Buffer, ext: string, maxSize: number): Promise<Buffer> {
    let quality = 85; // Začne s 85% kvalitou
    let compressedBuffer: Buffer;

    // První pokus: Komprese kvality
    do {
      compressedBuffer = await this.convertImageWithQuality(fileBuffer, ext, quality);

      // Sníží kvalitu, pokud je stále příliš velký
      if (compressedBuffer.length > maxSize && quality > 50) {
        quality -= 10;
      } else {
        break;
      }
    } while (compressedBuffer.length > maxSize && quality >= 50);

    // Pokud je stále příliš velký, změní velikost obrázku
    if (compressedBuffer.length > maxSize) {
      logger.info(`Still too large after compression, resizing image...`);

      const metadata = await sharp(fileBuffer).metadata();
      let { width, height } = metadata;

      // Iterativně zmenšuje rozměry o 15% dokud se nevejde pod limit velikosti
      do {
        width = Math.floor(width! * 0.85);
        height = Math.floor(height! * 0.85);

        compressedBuffer = await this.resizeAndCompress(fileBuffer, width, height, ext, 85);

      } while (compressedBuffer.length > maxSize && width! > 200);
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
  private async convertImageWithQuality(fileBuffer: Buffer, ext: string, quality: number): Promise<Buffer> {
    const sharpInstance = sharp(fileBuffer);

    if (ext === '.png') {
      return await sharpInstance
        .png({ quality, compressionLevel: 9 })
        .toBuffer();
    } else if (ext === '.webp') {
      return await sharpInstance
        .webp({ quality })
        .toBuffer();
    } else {
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
  private async resizeAndCompress(fileBuffer: Buffer, width: number, height: number, ext: string, quality: number): Promise<Buffer> {
    const sharpInstance = sharp(fileBuffer).resize(width, height);

    if (ext === '.png') {
      return await sharpInstance
        .png({ quality, compressionLevel: 9 })
        .toBuffer();
    } else if (ext === '.webp') {
      return await sharpInstance
        .webp({ quality })
        .toBuffer();
    } else {
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
  private async convertToJpeg(fileBuffer: Buffer, quality: number = 85): Promise<Buffer> {
    return await sharp(fileBuffer)
      .jpeg({ quality })
      .toBuffer();
  }

  /**
   * Validuje, že jsou přítomny požadované tokeny
   * @param tokens - Mapa tokenů k validaci
   * @returns boolean - True pokud jsou všechny tokeny platné
   */
  validateTokens(tokens: Record<string, string>): boolean {
    // Check if tokens is null or undefined first
    if (!tokens) {
      return false;
    }
    const requiredTokens = this.getRequiredTokens();
    return requiredTokens.every(tokenName =>
      tokens[tokenName] && tokens[tokenName].trim().length > 0
    );
  }

  /**
   * Získá názvy požadovaných tokenů pro Bluesky
   * @returns string[] - Pole názvů požadovaných tokenů
   */
  getRequiredTokens(): string[] {
    return ['handle', 'password'];
  }

  /**
   * Získá metriky výkonu pro Bluesky příspěvek
   * @param postId - URI Bluesky příspěvku (at://did:plc:xxx/app.bsky.feed.post/xxx)
   * @param tokens - Autentifikační tokeny obsahující handle a password
   * @returns Promise<PostPerformanceMetrics | null> - Metriky výkonu nebo null při selhání
   */
  async getPostPerformance(
    postId: string,
    tokens: Record<string, string>
  ): Promise<PostPerformanceMetrics | null> {
    logger.info({ postId }, '[BlueskyProvider] Getting performance metrics for post:');

    try {
      if (!this.validateTokens(tokens)) {
        logger.error('[BlueskyProvider] Invalid tokens for performance metrics');
        return null;
      }

      // Přihlášení do Bluesky
      const loginResult = await this.agent.login({
        identifier: tokens.handle,
        password: tokens.password
      });

      if (!loginResult.success) {
        logger.error('[BlueskyProvider] Failed to login to Bluesky for metrics');
        return null;
      }

      // Získá vlákno příspěvku pro načtení dat o zapojení
      const threadResponse = await this.agent.getPostThread({
        uri: postId,
        depth: 0
      });

      if (!threadResponse.success || !threadResponse.data.thread) {
        logger.error('[BlueskyProvider] Failed to get post thread');
        return null;
      }

      // Zkontroluje, zda je vlákno ThreadViewPost (má vlastnost post)
      const thread = threadResponse.data.thread;
      if (!('post' in thread)) {
        logger.error('[BlueskyProvider] Thread is not a valid post (may be blocked or not found)');
        return null;
      }

      const post = thread.post;

      // Sestaví metriky výkonu z dostupných dat
      const metrics: PostPerformanceMetrics = {
        postId: postId,
        networkType: this.networkType,
        timestamp: new Date(),
        likes: post.likeCount || 0,
        comments: post.replyCount || 0,
        reposts: post.repostCount || 0
      };

      logger.info('[BlueskyProvider] Successfully retrieved performance metrics');
      return metrics;

    } catch (error) {
      logger.error({ err: error }, '[BlueskyProvider] Error getting performance metrics:');
      return null;
    }
  }

  /**
   * Získá doporučený interval monitorování pro Bluesky (1 hodina)
   * @returns number - Počet hodin mezi kontrolami monitorování
   */
  getMonitoringInterval(): number {
    return 1; // Kontrola každou hodinu - Bluesky je otevřenější než Twitter
  }
}

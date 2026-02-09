import { PrismaClient } from '../generated/client';
import { SocialNetworkProviderFactory } from './SocialNetworkProviderFactory';
import { logger } from '../utils/logger';

/**
 * Informace o naplánovaném příspěvku (lokální pro PostScheduler)
 */
interface ScheduledPost {
  postId: number;
  networkId: number;
  contentId: number;
  content: string;
  attachments: string[];
  scheduledDate: Date;
  networkType: string;
  tokens: Record<string, string>;
}

/**
 * Hlavní plánovač pro zpracování naplánovaných příspěvků na sociálních sítích
 */
export class PostScheduler {
  private prisma: PrismaClient;
  private isRunning: boolean = false;
  private schedulerInterval: NodeJS.Timeout | null = null;
  private readonly checkIntervalMs: number;

  /**
   * Konstruktor pro PostScheduler
   * @param prisma - Instance Prisma klienta pro databázové operace
   * @param checkIntervalMinutes - Interval kontroly v minutách (výchozí: 1)
   */
  constructor(prisma: PrismaClient, checkIntervalMinutes: number = 1) {
    this.prisma = prisma;
    this.checkIntervalMs = checkIntervalMinutes * 60 * 1000; // Převod na milisekundy
  }

  /**
   * Spustí plánovač
   * @returns void
   */
  start(): void {
    if (this.isRunning) {
      logger.info('[PostScheduler] Post scheduler is already running');
      return;
    }

    this.isRunning = true;
    logger.info(`[PostScheduler] Post scheduler started, checking every ${this.checkIntervalMs / 60000} minutes`);

    // Spustí okamžitě, poté nastaví interval
    this.checkAndProcessPosts();
    this.schedulerInterval = setInterval(() => {
      this.checkAndProcessPosts();
    }, this.checkIntervalMs);
  }

  /**
   * Zastaví plánovač
   * @returns void
   */
  stop(): void {
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
    this.isRunning = false;
    logger.info('[PostScheduler] Post scheduler stopped');
  }

  /**
   * Zkontroluje příspěvky, které je třeba odeslat, a zpracuje je
   * @returns Promise<void>
   */
  private async checkAndProcessPosts(): Promise<void> {
    try {
      logger.info('[PostScheduler] Checking for scheduled posts...');

      const now = new Date();
      const scheduledPosts = await this.getScheduledPosts(now);

      if (scheduledPosts.length === 0) {
        logger.info('[PostScheduler] No posts to process at this time');
        return;
      }

      logger.info(`[PostScheduler] Found ${scheduledPosts.length} posts to process`);

      // Zpracuje každý příspěvek
      for (const scheduledPost of scheduledPosts) {
        await this.processScheduledPost(scheduledPost);
      }
    } catch (error) {
      logger.error({ err: error }, '[PostScheduler] Error checking scheduled posts:');
    }
  }

  /**
   * Získá příspěvky, které jsou naplánovány k odeslání nyní nebo v minulosti
   * @param currentTime - Aktuální čas pro porovnání
   * @returns Promise<ScheduledPost[]> - Seznam naplánovaných příspěvků
   */
  private async getScheduledPosts(currentTime: Date): Promise<ScheduledPost[]> {
    const postedContent = await this.prisma.postedContent.findMany({
      where: {
        post_date: {
          lte: currentTime
        },
        actual_post_date: null, // Ještě nebylo odesláno
        network_post_id: null   // Žádné ID příspěvku znamená, že nebyl odeslán
      },
      include: {
        contents: true,
        networks: {
          include: {
            network_tokens: true
          }
        },
        posts: {
          include: {
            attachments: true
          }
        }
      },
      orderBy: {
        post_date: 'asc'
      }
    });

    // Transformace do formátu ScheduledPost
    const scheduledPosts: ScheduledPost[] = [];

    for (const pc of postedContent) {
      // Vytvoří mapu tokenů
      const tokens: Record<string, string> = {};
      pc.networks.network_tokens.forEach(token => {
        tokens[token.token_name] = token.token;
      });

      // Získá cesty příloh
      const attachments = pc.posts.attachments.map(att => att.path);

      scheduledPosts.push({
        postId: pc.posts_id,
        networkId: pc.networks_id,
        contentId: pc.contents_id,
        content: pc.contents.content,
        attachments: attachments,
        scheduledDate: pc.post_date!,
        networkType: pc.networks.network_type,
        tokens: tokens
      });
    }

    return scheduledPosts;
  }

  /**
   * Zpracuje jeden naplánovaný příspěvek
   * @param scheduledPost - Naplánovaný příspěvek k zpracování
   * @returns Promise<void>
   */
  private async processScheduledPost(scheduledPost: ScheduledPost): Promise<void> {
    try {
      logger.info(`[PostScheduler] Processing post ${scheduledPost.postId} for ${scheduledPost.networkType}`);

      // Získá příslušný provider
      const provider = SocialNetworkProviderFactory.getProvider(scheduledPost.networkType);
      if (!provider) {
        throw new Error(`[PostScheduler] No provider found for network type: ${scheduledPost.networkType}`);
      }

      // Validuje tokeny
      if (!provider.validateTokens(scheduledPost.tokens)) {
        throw new Error(`[PostScheduler] Invalid tokens for ${scheduledPost.networkType}`);
      }

      // Odešle příspěvek
      const networkPostId = await provider.sendPost(
        scheduledPost.content,
        scheduledPost.attachments,
        scheduledPost.tokens
      );

      // Aktualizuje databázi s výsledkem
      await this.updatePostResult(scheduledPost, networkPostId);

      if (networkPostId) {
        logger.info(`[PostScheduler] Successfully posted to ${scheduledPost.networkType} with ID: ${networkPostId}`);
      } else {
        logger.error(`[PostScheduler] Failed to post to ${scheduledPost.networkType}`);
      }
    } catch (error) {
      logger.error({ err: error }, `[PostScheduler] Error processing post ${scheduledPost.postId}:`);

      // Aktualizuje databázi s chybou (actual_post_date nastaveno ale bez network_post_id)
      await this.updatePostResult(scheduledPost, null);
    }
  }

  /**
   * Aktualizuje databázi s výsledkem odesílání
   * @param scheduledPost - Naplánovaný příspěvek
   * @param networkPostId - ID příspěvku na síti nebo null při chybě
   * @returns Promise<void>
   */
  private async updatePostResult(scheduledPost: ScheduledPost, networkPostId: string | null): Promise<void> {
    try {
      await this.prisma.postedContent.update({
        where: {
          posts_id_networks_id: {
            posts_id: scheduledPost.postId,
            networks_id: scheduledPost.networkId
          }
        },
        data: {
          actual_post_date: new Date(),
          network_post_id: networkPostId
        }
      });
    } catch (error) {
      logger.error({ err: error }, `[PostScheduler] Error updating post result for post ${scheduledPost.postId}:`);
    }
  }

  /**
   * Získá stav plánovače
   * @returns Objekt s informacemi o stavu plánovače
   */
  getStatus(): {
    isRunning: boolean;
    checkIntervalMinutes: number;
    nextCheck?: Date;
  } {
    return {
      isRunning: this.isRunning,
      checkIntervalMinutes: this.checkIntervalMs / 60000,
      nextCheck: this.schedulerInterval ? new Date(Date.now() + this.checkIntervalMs) : undefined
    };
  }

  /**
   * Manuálně spustí kontrolu (užitečné pro testování)
   * @returns Promise<void>
   */
  async manualCheck(): Promise<void> {
    logger.info('[PostScheduler] Manual check triggered');
    await this.checkAndProcessPosts();
  }

  /**
   * Získá nadcházející naplánované příspěvky
   * @param hoursAhead - Počet hodin do budoucna (výchozí: 24)
   * @returns Promise<ScheduledPost[]> - Seznam nadcházejících příspěvků
   */
  async getUpcomingPosts(hoursAhead: number = 24): Promise<ScheduledPost[]> {
    const now = new Date();
    const futureTime = new Date(now.getTime() + (hoursAhead * 60 * 60 * 1000));

    const postedContent = await this.prisma.postedContent.findMany({
      where: {
        post_date: {
          gt: now,
          lte: futureTime
        },
        actual_post_date: null,
        network_post_id: null
      },
      include: {
        contents: true,
        networks: true,
        posts: {
          include: {
            attachments: true
          }
        }
      },
      orderBy: {
        post_date: 'asc'
      }
    });

    return postedContent.map(pc => ({
      postId: pc.posts_id,
      networkId: pc.networks_id,
      contentId: pc.contents_id,
      content: pc.contents.content,
      attachments: pc.posts.attachments.map(att => att.path),
      scheduledDate: pc.post_date!,
      networkType: pc.networks.network_type,
      tokens: {} // Nezveřejňuje tokeny v náhledu
    }));
  }
}

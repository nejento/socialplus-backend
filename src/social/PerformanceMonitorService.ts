import * as cron from 'node-cron';
import { InfluxDBService } from './InfluxDBService';
import { ISocialNetworkProvider, PostPerformanceMetrics, TrackedPost, InfluxDBConfig } from './ISocialNetworkProvider';
import { SocialNetworkProviderFactory } from './SocialNetworkProviderFactory';
import { prisma } from '../utils/prisma';
import { PrismaClient } from '../generated/client';
import { logger } from '../utils/logger';

/**
 * Služba pro monitorování výkonu příspěvků na sociálních sítích
 */
export class PerformanceMonitorService {
  private influxDBService: InfluxDBService;
  private isRunning: boolean = false;
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map();
  private prisma: PrismaClient;

  constructor(influxDBConfig: InfluxDBConfig) {
    this.influxDBService = new InfluxDBService(influxDBConfig);
    this.prisma = prisma;
  }

  /**
   * Spustit službu monitorování
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.info('[PerformanceMonitor] Performance monitor is already running');
      return;
    }

    this.isRunning = true;
    logger.info('[PerformanceMonitor] Starting performance monitoring service...');

    // Plánování monitoringu na různé sítě
    this.scheduleNetworkMonitoring('facebook', '0 * * * *'); // Každý hodina
    this.scheduleNetworkMonitoring('instagram', '0 * * * *'); // Každý hodina
    this.scheduleNetworkMonitoring('threads', '0 * * * *'); // Každý hodina
    this.scheduleNetworkMonitoring('bluesky', '0 * * * *'); // Každý hodina
    this.scheduleNetworkMonitoring('mastodon', '0 * * * *'); // Každý hodina
    this.scheduleNetworkMonitoring('twitter', '0 */12 * * *'); // Každých 12 hodin - Twitter limituje počet, máme tedy méně časté kontroly

    logger.info('[PerformanceMonitor] Performance monitoring service started successfully');
  }

  /**
   * Zastavit službu monitorování
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.info('[PerformanceMonitor] Performance monitor is not running');
      return;
    }

    this.isRunning = false;

    // Zastavit všechny naplánované úlohy
    this.scheduledJobs.forEach((job, networkType) => {
      job.stop();
      logger.info(`[PerformanceMonitor] Stopped monitoring for ${networkType}`);
    });

    this.scheduledJobs.clear();
    await this.influxDBService.close();
    await this.prisma.$disconnect();

    logger.info('[PerformanceMonitor] Performance monitoring service stopped');
  }

  /**
   * Naplánuje monitorování pro konkrétní síť
   * @param networkType - Typ sociální sítě
   * @param cronExpression - Cron pro plánování
   */
  private scheduleNetworkMonitoring(networkType: string, cronExpression: string): void {
    const job = cron.schedule(cronExpression, async () => {
      await this.monitorNetworkPosts(networkType);
    });

    this.scheduledJobs.set(networkType, job);

    logger.info(`[PerformanceMonitor] Scheduled monitoring for ${networkType} with expression: ${cronExpression}`);
  }

  /**
   * Monitorovat konkrétní síť a její příspěvky
   * @param networkType - Typ sociální sítě
   */
  private async monitorNetworkPosts(networkType: string): Promise<void> {
    try {
      logger.info(`[PerformanceMonitor] Starting monitoring for ${networkType} posts...`);

      // Získat sledované příspěvky pro tuto síť z posledních 7 dnů
      const trackedPosts = await this.getTrackedPosts(networkType);

      if (trackedPosts.length === 0) {
        logger.info(`[PerformanceMonitor] No tracked posts found for ${networkType}`);
        return;
      }

      const provider = SocialNetworkProviderFactory.getProvider(networkType);
      if (!provider) {
        logger.error(`[PerformanceMonitor] No provider found for network type: ${networkType}`);
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      // Zpracovat příspěvky po dávkách, aby se předešlo omezením rychlosti
      const batchSize = 10;
      for (let i = 0; i < trackedPosts.length; i += batchSize) {
        const batch = trackedPosts.slice(i, i + batchSize);

        await Promise.all(batch.map(async (post) => {
          try {
            await this.monitorSinglePost(post, provider);
            successCount++;
          } catch (error) {
            logger.error({ err: error }, `[PerformanceMonitor] Error monitoring post ${post.networkPostId} on ${networkType}:`);
            errorCount++;
          }
        }));

        // Přidáváme delay mezi batchemi, aby se respektovaly limity rychlosti
        if (i + batchSize < trackedPosts.length) {
          await this.delay(1000); // 1 second delay between batches
        }
      }

      logger.info(`[PerformanceMonitor] Completed monitoring for ${networkType}: ${successCount} successful, ${errorCount} errors`);
    } catch (error) {
      logger.error({ err: error }, `[PerformanceMonitor] Error monitoring ${networkType} posts:`);
    }
  }

  /**
   * Monitoring jednoho příspěvku
   * @param post - Sledovaný příspěvek
   * @param provider - Provider sociální sítě
   */
  private async monitorSinglePost(post: TrackedPost, provider: ISocialNetworkProvider): Promise<void> {
    try {
      const tokens = await this.getUserTokens(post.userId, post.networkType);

      if (!provider.validateTokens(tokens)) {
        logger.warn(`[PerformanceMonitor] Invalid tokens for user ${post.userId} on ${post.networkType}`);
        return;
      }

      const metrics = await provider.getPostPerformance(post.networkPostId, tokens);

      if (metrics) {
        // InfluxDB metriky
        await this.influxDBService.storeMetrics(metrics);
        logger.info(`[PerformanceMonitor] Stored metrics for post ${post.networkPostId} on ${post.networkType}`);
      } else {
        // Kontrola, zdali není síť vyloučena z monitoringu
        if (post.networkType === 'facebook' || post.networkType === 'twitter') {
          return;
        }
        logger.warn(`[PerformanceMonitor] No metrics received for post ${post.networkPostId} on ${post.networkType}`);
      }
    } catch (error) {
      logger.error({ err: error }, `[PerformanceMonitor] Error monitoring post ${post.networkPostId}:`);
      throw error;
    }
  }

  /**
   * Manuální monitorování konkrétního příspěvku
   * @param postId - Post ID příspěvku v konkrétní síti
   * @param networkType - Typ sociální sítě
   * @param userId - User ID, kterému patří příspěvek
   * @returns Výkonnostní metrika nebo null, pokud nebyla nalezena
   */
  async monitorPostManually(
    postId: string,
    networkType: string,
    userId: number
  ): Promise<PostPerformanceMetrics | null> {
    try {
      const provider = SocialNetworkProviderFactory.getProvider(networkType);
      if (!provider) {
        throw new Error(`No provider found for network type: ${networkType}`);
      }

      const tokens = await this.getUserTokens(userId, networkType);
      if (!provider.validateTokens(tokens)) {
        throw new Error(`Invalid tokens for user ${userId} on ${networkType}`);
      }

      const metrics = await provider.getPostPerformance(postId, tokens);

      if (metrics) {
        await this.influxDBService.storeMetrics(metrics);
        logger.info(`[PerformanceMonitor] Manually stored metrics for post ${postId} on ${networkType}`);
      }

      return metrics;
    } catch (error) {
      logger.error({ err: error }, `[PerformanceMonitor] Error manually monitoring post ${postId}:`);
      throw error;
    }
  }

  /**
   * Získá performance metriky pro konkrétní příspěvek
   * @param postId - Post ID příspěvku v konkrétní síti
   * @param networkType - Typ sociální sítě
   * @returns Poslední sebraná výkonnostní metrika nebo null, pokud nebyla nalezena
   */
  async getPostMetrics(postId: string, networkType: string): Promise<PostPerformanceMetrics | null> {
    return await this.influxDBService.getLatestMetrics(postId, networkType);
  }

  /**
   * Získá historii výkonnostních metrik pro příspěvek
   * @param postId - Post ID příspěvku v konkrétní síti
   * @param networkType - Typ sociální sítě
   * @param startTime - Počáteční čas pro dotaz
   * @param endTime - Konečný čas pro dotaz
   * @returns Pole výkonnostních metrik v zadaném časovém rozmezí
   */
  async getPostMetricsHistory(
    postId: string,
    networkType: string,
    startTime: Date,
    endTime: Date
  ): Promise<PostPerformanceMetrics[]> {
    return await this.influxDBService.getMetricsHistory(postId, networkType, startTime, endTime);
  }

  /**
   * Získá dostupné metriky pro konkrétní příspěvek
   * @param postId - Post ID příspěvku v konkrétní síti
   * @param networkType - Typ sociální sítě
   * @returns Pole dostupných názvů metrik, které byly sesbírané pro daný příspěvek
   */
  async getAvailableMetrics(postId: string, networkType: string): Promise<string[]> {
    return await this.influxDBService.getAvailableMetrics(postId, networkType);
  }

  /**
   * Získá sledované příspěvky pro konkrétní síť z databáze
   * @param networkType - Typ sociální sítě
   * @returns Pole sledovaných příspěvků za posledních 7 dní
   */
  private async getTrackedPosts(networkType: string): Promise<TrackedPost[]> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      logger.info(`[PerformanceMonitorService] Fetching tracked posts for ${networkType} from the last 7 days`);

      // Získá příspěvky pro danou sociální síť za posledních 7 dní
      const postedContent = await this.prisma.postedContent.findMany({
        where: {
          networks: {
            network_type: networkType
          },
          actual_post_date: {
            gte: sevenDaysAgo,
            not: null // Jen fakt odeslané příspěvky
          },
          network_post_id: {
            not: null // Jen příspěvky, které mají ID v síti
          }
        },
        include: {
          posts: {
            include: {
              users: true
            }
          },
          networks: true,
          contents: true
        },
        orderBy: {
          actual_post_date: 'desc'
        }
      });

      logger.info(`[PerformanceMonitorService] Found ${postedContent.length} posted content entries for ${networkType}`);

      const trackedPosts: TrackedPost[] = postedContent.map(pc => ({
        id: pc.posts_id,
        networkPostId: pc.network_post_id!,
        networkType: pc.networks.network_type,
        userId: pc.posts.creator_id,
        createdAt: pc.actual_post_date!,
        content: pc.contents.content,
        isActive: true // Všechny příspěvky jsou jako active pro monitoring
      }));

      logger.info(`[PerformanceMonitorService] Transformed ${trackedPosts.length} tracked posts for monitoring`);
      return trackedPosts;

    } catch (error) {
      logger.error({ err: error }, `[PerformanceMonitorService] Error fetching tracked posts for ${networkType}:`);
      return [];
    }
  }

  /**
   * Získá uživatelské tokeny pro konkrétní síť z databáze
   * @param userId - Uživatelské ID
   * @param networkType - Typ sociální sítě
   * @returns Tokeny pro network
   */
  private async getUserTokens(userId: number, networkType: string): Promise<Record<string, string>> {
    try {
      logger.info(`[PerformanceMonitorService] Fetching tokens for user ${userId} on ${networkType}`);

      const network = await this.prisma.network.findFirst({
        where: {
          owner_id: userId,
          network_type: networkType
        },
        include: {
          network_tokens: true
        }
      });

      if (!network) {
        logger.warn(`[PerformanceMonitorService] No ${networkType} network found for user ${userId}`);
        return {};
      }

      const tokens: Record<string, string> = {};
      network.network_tokens.forEach(token => {
        tokens[token.token_name] = token.token;
      });

      logger.info(`[PerformanceMonitorService] Found ${network.network_tokens.length} tokens for user ${userId} on ${networkType}`);
      return tokens;

    } catch (error) {
      logger.error({ err: error }, `[PerformanceMonitorService] Error fetching user tokens for user ${userId} on ${networkType}:`);
      return {};
    }
  }

  /**
   * Helper funkce pro přidání delay
   * @param ms - Milisekundy k delayi
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

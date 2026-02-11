import { prisma } from '../utils/prisma';
import { PrismaClient } from '../generated/client';
import axios from 'axios';
import { logger } from '../utils/logger';

/**
 * Odpověď API Threads pro obnovení tokenu
 */
interface ThreadsTokenRefreshResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
}

/**
 * Chybová odpověď z API Threads
 */
interface ThreadsErrorResponse {
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
  };
}

/**
 * Správce tokenů pro Threads - spravuje obnovování tokenů a plánování
 */
export class ThreadsTokenManager {
  private prisma: PrismaClient;
  private refreshInterval: NodeJS.Timeout | null = null;

  /**
   * Konstruktor pro ThreadsTokenManager
   */
  constructor() {
    this.prisma = prisma;
  }

  /**
   * Spustí periodické kontroly obnovování tokenů
   * Kontroluje každých 12 hodin tokeny starší než 45 dní
   * @returns void
   */
  startPeriodicRefresh(): void {
    logger.info('[ThreadsTokenManager] Starting periodic token refresh scheduler...');

    // Kontrola každých 12 hodin (43200000 milisekund)
    this.refreshInterval = setInterval(async () => {
      await this.checkAndRefreshExpiredTokens();
    }, 12 * 60 * 60 * 1000);

    // Také spustí počáteční kontrolu
    this.checkAndRefreshExpiredTokens();
  }

  /**
   * Zastaví periodické kontroly obnovování tokenů
   * @returns void
   */
  stopPeriodicRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      logger.info('[ThreadsTokenManager] Stopped periodic token refresh scheduler');
    }
  }

  /**
   * Zkontroluje a obnoví všechny tokeny starší než 45 dní
   * @returns Promise<void>
   */
  private async checkAndRefreshExpiredTokens(): Promise<void> {
    logger.info('[ThreadsTokenManager] Checking for expired tokens...');

    try {
      // Najde všechny Threads sítě
      const threadsNetworks = await this.prisma.network.findMany({
        where: {
          network_type: 'threads'
        }
      });

      for (const network of threadsNetworks) {
        await this.checkAndRefreshNetworkToken(network.id);
      }

    } catch (error) {
      logger.error({ err: error }, '[ThreadsTokenManager] Error during periodic token refresh:');
    }
  }

  /**
   * Zkontroluje a obnoví token pro konkrétní síť v případě potřeby
   * @param networkId - ID sítě v databázi
   * @returns Promise<void>
   */
  private async checkAndRefreshNetworkToken(networkId: number): Promise<void> {
    try {
      // Získá časové razítko tokenu
      const tokenTimestamp = await this.prisma.networkToken.findFirst({
        where: {
          network_id: networkId,
          token_name: 'longLivedAccessTokenTimestamp'
        }
      });

      if (!tokenTimestamp) {
        logger.info(`[ThreadsTokenManager] No timestamp found for network ${networkId}, skipping`);
        return;
      }

      const tokenDate = new Date(parseInt(tokenTimestamp.token));
      const now = new Date();
      const daysDiff = (now.getTime() - tokenDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysDiff >= 45) {
        logger.info(`[ThreadsTokenManager] Token for network ${networkId} is ${daysDiff.toFixed(1)} days old, refreshing...`);

        // Získá aktuální token a ID uživatele
        const [currentToken, userId] = await Promise.all([
          this.prisma.networkToken.findFirst({
            where: {
              network_id: networkId,
              token_name: 'longLivedAccessToken'
            }
          }),
          this.prisma.networkToken.findFirst({
            where: {
              network_id: networkId,
              token_name: 'threadsUserId'
            }
          })
        ]);

        if (currentToken && userId) {
          await this.refreshTokenForNetwork(networkId, currentToken.token, userId.token);
        } else {
          logger.warn(`[ThreadsTokenManager] Missing tokens for network ${networkId}`);
        }
      } else {
        logger.info(`[ThreadsTokenManager] Token for network ${networkId} is ${daysDiff.toFixed(1)} days old, no refresh needed`);
      }

    } catch (error) {
      logger.error({ err: error }, `[ThreadsTokenManager] Error checking token for network ${networkId}:`);
    }
  }

  /**
   * Obnoví token pro konkrétní síť a aktualizuje databázi
   * @param networkId - ID sítě v databázi
   * @param currentToken - Aktuální access token
   * @param userId - ID uživatele Threads
   * @returns Promise<string | null> - Nový token nebo null při chybě
   */
  public async refreshTokenForNetwork(networkId: number, currentToken: string, userId: string): Promise<string | null> {
    logger.info(`[ThreadsTokenManager] Refreshing token for network ${networkId}...`);

    try {
      const newToken = await this.callThreadsRefreshAPI(currentToken);
      if (newToken) {
        await this.updateTokenInDatabase(networkId, newToken);
        logger.info(`[ThreadsTokenManager] Token refreshed successfully for network ${networkId}`);
        return newToken;
      } else {
        logger.error(`[ThreadsTokenManager] Failed to refresh token for network ${networkId}`);
        return null;
      }
    } catch (error) {
      logger.error({ err: error }, `[ThreadsTokenManager] Error refreshing token for network ${networkId}:`);
      return null;
    }
  }

  /**
   * Získá tokeny pro síť a obnoví je v případě potřeby (používá provider)
   * Může přijmout buď networkId nebo tokeny přímo
   * @param networkIdOrTokens - ID sítě nebo mapa tokenů
   * @returns Promise<object | null> - Objekt s tokeny nebo null při chybě
   */
  public async getRefreshedTokens(networkIdOrTokens: number | Record<string, string>): Promise<{ userId: string; accessToken: string; appSecret: string } | null> {
    try {
      let networkId: number;
      let tokens: Map<string, string>;

      // Zpracuje jak networkId tak přímé tokeny
      if (typeof networkIdOrTokens === 'number') {
        // Původní chování - získá tokeny podle networkId
        networkId = networkIdOrTokens;
        const networkTokens = await this.prisma.networkToken.findMany({
          where: {
            network_id: networkId
          }
        });

        tokens = new Map<string, string>();
        networkTokens.forEach(token => {
          tokens.set(token.token_name, token.token);
        });
      } else {
        // Nové chování - najde networkId z poskytnutých tokenů
          const userId = networkIdOrTokens.threadsUserId;

        if (!userId) {
          logger.error('[ThreadsTokenManager] No threadsUserId provided in tokens');
          return null;
        }

        // Najde ID sítě z userId
        const networkToken = await this.prisma.networkToken.findFirst({
          where: {
            token_name: 'threadsUserId',
            token: userId
          }
        });

        if (!networkToken) {
          logger.error(`[ThreadsTokenManager] Could not find network for threadsUserId: ${userId}`);
          return null;
        }

        networkId = networkToken.network_id;

        // Získá všechny tokeny pro tuto síť
        const networkTokens = await this.prisma.networkToken.findMany({
          where: {
            network_id: networkId
          }
        });

        tokens = new Map<string, string>();
        networkTokens.forEach(token => {
          tokens.set(token.token_name, token.token);
        });
      }

      const userId = tokens.get('threadsUserId');
      const currentToken = tokens.get('longLivedAccessToken');
      const appSecret = tokens.get('threadsAppSecret');
      const tokenTimestamp = tokens.get('longLivedAccessTokenTimestamp');

      if (!userId || !currentToken || !appSecret) {
        logger.error(`[ThreadsTokenManager] Missing required tokens for network ${networkId}`);
        return null;
      }

      // Zkontroluje, zda token potřebuje obnovení (starší než 45 dní nebo žádné časové razítko)
      let needsRefresh = !tokenTimestamp;
      if (tokenTimestamp) {
        const tokenDate = new Date(parseInt(tokenTimestamp));
        const now = new Date();
        const daysDiff = (now.getTime() - tokenDate.getTime()) / (1000 * 60 * 60 * 24);
        needsRefresh = daysDiff >= 45;
      }

      if (needsRefresh) {
        logger.info(`[ThreadsTokenManager] Token needs refresh for network ${networkId}`);
        const newToken = await this.refreshTokenForNetwork(networkId, currentToken, userId);
        if (newToken) {
          return {
            userId,
            accessToken: newToken,
            appSecret
          };
        } else {
          // Vrátí aktuální token, pokud se obnovení nezdařilo
          logger.warn(`[ThreadsTokenManager] Using current token despite refresh failure for network ${networkId}`);
          return {
            userId,
            accessToken: currentToken,
            appSecret
          };
        }
      }

      return {
        userId,
        accessToken: currentToken,
        appSecret
      };

    } catch (error) {
      logger.error({ err: error }, `[ThreadsTokenManager] Error getting tokens:`);
      return null;
    }
  }

  /**
   * Zavolá API Threads pro obnovení tokenu
   * @param currentToken - Aktuální access token
   * @returns Promise<string | null> - Nový token nebo null při chybě
   */
  private async callThreadsRefreshAPI(currentToken: string): Promise<string | null> {
    try {
      const url = `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${currentToken}`;

      const response = await axios.get<ThreadsTokenRefreshResponse>(url);

      logger.info('[ThreadsTokenManager] Token refreshed successfully via API');
      logger.info({ expiresIn: response.data.expires_in }, '[ThreadsTokenManager] New token expires in:');

      return response.data.access_token;
    } catch (error) {
      logger.error({ err: error }, '[ThreadsTokenManager] Error calling Threads refresh API:');
      if (axios.isAxiosError(error) && error.response) {
        const threadsError = error.response.data as ThreadsErrorResponse;
        logger.error(`[ThreadsTokenManager] Threads API Error: ${threadsError.error?.message}`);
      }
      return null;
    }
  }

  /**
   * Aktualizuje token a časové razítko v databázi
   * @param networkId - ID sítě v databázi
   * @param newToken - Nový access token
   * @returns Promise<void>
   */
  private async updateTokenInDatabase(networkId: number, newToken: string): Promise<void> {
    logger.info(`[ThreadsTokenManager] Updating token in database for network ${networkId}...`);

    try {
      const now = Date.now().toString();

      // Aktualizuje access token
      await this.prisma.networkToken.updateMany({
        where: {
          network_id: networkId,
          token_name: 'longLivedAccessToken'
        },
        data: {
          token: newToken
        }
      });

      // Aktualizuje nebo vytvoří časové razítko pomocí upsert s kompozitním klíčem
      await this.prisma.networkToken.upsert({
        where: {
          network_id_token_name: {
            network_id: networkId,
            token_name: 'longLivedAccessTokenTimestamp'
          }
        },
        update: {
          token: now
        },
        create: {
          network_id: networkId,
          token_name: 'longLivedAccessTokenTimestamp',
          token: now
        }
      });

      logger.info(`[ThreadsTokenManager] Token and timestamp updated successfully for network ${networkId}`);
    } catch (error) {
      logger.error({ err: error }, `[ThreadsTokenManager] Error updating token in database for network ${networkId}:`);
    }
  }

  /**
   * Inicializuje časová razítka pro existující tokeny (spustit jednou při startu aplikace)
   * @returns Promise<void>
   */
  public async initializeExistingTokenTimestamps(): Promise<void> {
    logger.info('[ThreadsTokenManager] Initializing timestamps for existing tokens...');

    try {
      // Najde všechny Threads sítě, které mají tokeny ale nemají časové razítko
      const networksWithoutTimestamp = await this.prisma.network.findMany({
        where: {
          network_type: 'threads',
          network_tokens: {
            some: {
              token_name: 'longLivedAccessToken'
            },
            none: {
              token_name: 'longLivedAccessTokenTimestamp'
            }
          }
        }
      });

      const now = Date.now().toString();

      for (const network of networksWithoutTimestamp) {
        await this.prisma.networkToken.create({
          data: {
            network_id: network.id,
            token_name: 'longLivedAccessTokenTimestamp',
            token: now
          }
        });
        logger.info(`[ThreadsTokenManager] Initialized timestamp for network ${network.id}`);
      }

      if (networksWithoutTimestamp.length === 0) {
        logger.info('[ThreadsTokenManager] All existing tokens already have timestamps');
      }

    } catch (error) {
      logger.error({ err: error }, '[ThreadsTokenManager] Error initializing token timestamps:');
    }
  }
}

/**
 * Exportuje singleton instanci
 */
export const threadsTokenManager = new ThreadsTokenManager();

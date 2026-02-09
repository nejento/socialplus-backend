import { jest } from '@jest/globals';

// Mock axios first
jest.mock('axios');

// Mock loggeru
jest.mock('../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
    fatal: jest.fn(),
  }
}));

// Vytvoří mock PrismaClient před importem čehokoliv s korektním typováním pro Jest
const mockPrismaClient = {
  network: {
    findMany: jest.fn() as jest.MockedFunction<any>,
  },
  networkToken: {
    findFirst: jest.fn() as jest.MockedFunction<any>,
    findMany: jest.fn() as jest.MockedFunction<any>,
    updateMany: jest.fn() as jest.MockedFunction<any>,
    upsert: jest.fn() as jest.MockedFunction<any>,
    create: jest.fn() as jest.MockedFunction<any>,
  },
  // PrismaClient methody kvůli TypeScriptu
  $connect: jest.fn() as jest.MockedFunction<any>,
  $disconnect: jest.fn() as jest.MockedFunction<any>,
  $use: jest.fn() as jest.MockedFunction<any>,
  $on: jest.fn() as jest.MockedFunction<any>,
  $transaction: jest.fn() as jest.MockedFunction<any>,
  $executeRaw: jest.fn() as jest.MockedFunction<any>,
  $executeRawUnsafe: jest.fn() as jest.MockedFunction<any>,
  $queryRaw: jest.fn() as jest.MockedFunction<any>,
  $queryRawUnsafe: jest.fn() as jest.MockedFunction<any>,
  $runCommandRaw: jest.fn() as jest.MockedFunction<any>,
  $extends: jest.fn() as jest.MockedFunction<any>,
} as any;

// Mock celé generovaného klienta
jest.mock('../src/generated/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  };
});

// Import po mocku
import { ThreadsTokenManager, threadsTokenManager } from '../src/social/ThreadsTokenManager';
import axios from 'axios';
import { PrismaClient } from '../src/generated/client';
import { logger } from '../src/utils/logger';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const MockedPrismaClient = PrismaClient as jest.MockedClass<typeof PrismaClient>;
const mockedLogger = logger as jest.Mocked<typeof logger>;

describe('ThreadsTokenManager', () => {
  let tokenManager: ThreadsTokenManager;

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset implementace mocku
    MockedPrismaClient.mockImplementation(() => mockPrismaClient);

    tokenManager = new ThreadsTokenManager();

    // Mock console method k potlačení outputu během testů
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    tokenManager.stopPeriodicRefresh();
  });

  describe('Constructor and Initialization', () => {
    it('should create a new instance with mocked PrismaClient', () => {
      expect(tokenManager).toBeInstanceOf(ThreadsTokenManager);
      expect(MockedPrismaClient).toHaveBeenCalled();
    });

    it('should export a singleton instance', () => {
      expect(threadsTokenManager).toBeInstanceOf(ThreadsTokenManager);
    });
  });

  describe('Timer Management', () => {
    it('should start periodic refresh scheduler', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      tokenManager.startPeriodicRefresh();

      expect(setIntervalSpy).toHaveBeenCalledWith(
        expect.any(Function),
        12 * 60 * 60 * 1000 // 12 hodin
      );
    });

    it('should stop periodic refresh scheduler', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      tokenManager.startPeriodicRefresh();
      tokenManager.stopPeriodicRefresh();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('should handle stopping without starting', () => {
      expect(() => {
        tokenManager.stopPeriodicRefresh();
      }).not.toThrow();
    });
  });

  describe('Database Operations', () => {
    it('should handle database errors in checkAndRefreshExpiredTokens', async () => {
      mockPrismaClient.network.findMany.mockRejectedValue(new Error('Database error'));

      await expect(tokenManager['checkAndRefreshExpiredTokens']()).resolves.not.toThrow();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        '[ThreadsTokenManager] Error during periodic token refresh:',
        expect.any(Error)
      );
    });

    it('should handle database errors during initialization', async () => {
      mockPrismaClient.network.findMany.mockRejectedValue(new Error('Database error'));

      await expect(tokenManager.initializeExistingTokenTimestamps()).resolves.not.toThrow();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        '[ThreadsTokenManager] Error initializing token timestamps:',
        expect.any(Error)
      );
    });

    it('should handle database update errors', async () => {
      const networkId = 1;
      const newToken = 'new_access_token';

      mockPrismaClient.networkToken.updateMany.mockRejectedValue(new Error('Update failed'));

      await expect(tokenManager['updateTokenInDatabase'](networkId, newToken)).resolves.not.toThrow();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Error updating token in database'),
        expect.any(Error)
      );
    });
  });

  describe('API Operations', () => {
    it('should successfully refresh token via API', async () => {
      const networkId = 1;
      const currentToken = 'current_access_token';
      const userId = 'user123';

      mockedAxios.get.mockResolvedValue({
        data: {
          access_token: 'new_access_token',
          token_type: 'bearer',
          expires_in: 5184000
        }
      });

      mockPrismaClient.networkToken.updateMany.mockResolvedValue({ count: 1 });
      mockPrismaClient.networkToken.upsert.mockResolvedValue({
        network_id: networkId,
        token_name: 'longLivedAccessTokenTimestamp',
        token: expect.any(String)
      } as any);

      const result = await tokenManager.refreshTokenForNetwork(networkId, currentToken, userId);

      expect(result).toBe('new_access_token');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${currentToken}`
      );
    });

    it('should handle API errors gracefully', async () => {
      const networkId = 1;
      const currentToken = 'current_access_token';
      const userId = 'user123';

      const error = new Error('API Error');
      error.name = 'AxiosError';
      (error as any).response = {
        data: {
          error: {
            message: 'Invalid token',
            type: 'OAuthException',
            code: 190
          }
        }
      };

      mockedAxios.get.mockRejectedValue(error);

      // Mock axios.isAxiosError aby vrátil return true pro tento error
      const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      const result = await tokenManager.refreshTokenForNetwork(networkId, currentToken, userId);

      expect(result).toBeNull();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        '[ThreadsTokenManager] Threads API Error:',
        'Invalid token'
      );

      // Clean up the spy
      isAxiosErrorSpy.mockRestore();
    });

    it('should make correct API call and return new token', async () => {
      const currentToken = 'current_token';
      const newToken = 'new_token';

      mockedAxios.get.mockResolvedValue({
        data: {
          access_token: newToken,
          token_type: 'bearer',
          expires_in: 5184000
        }
      });

      const result = await tokenManager['callThreadsRefreshAPI'](currentToken);

      expect(result).toBe(newToken);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${currentToken}`
      );
    });

    it('should handle API errors and return null', async () => {
      const currentToken = 'current_token';

      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await tokenManager['callThreadsRefreshAPI'](currentToken);

      expect(result).toBeNull();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        '[ThreadsTokenManager] Error calling Threads refresh API:',
        expect.any(Error)
      );
    });
  });

  describe('Token Management', () => {
    it('should handle token map without threadsUserId', async () => {
      const tokenMap = {
        longLivedAccessToken: 'current_token',
        threadsAppSecret: 'app_secret'
        // Chybějící threadsUserId
      };

      const result = await tokenManager.getRefreshedTokens(tokenMap);

      expect(result).toBeNull();
      expect(mockedLogger.error).toHaveBeenCalledWith(
        '[ThreadsTokenManager] No threadsUserId provided in tokens'
      );
    });
  });

  describe('Integration Tests - Simplified', () => {
    it('should demonstrate the token manager can be instantiated and basic methods called', async () => {
      expect(tokenManager).toBeDefined();
      expect(typeof tokenManager.refreshTokenForNetwork).toBe('function');
      expect(typeof tokenManager.getRefreshedTokens).toBe('function');
      expect(typeof tokenManager.initializeExistingTokenTimestamps).toBe('function');
    });

    it('should handle missing parameters gracefully', async () => {
      const result = await tokenManager.getRefreshedTokens({});
      expect(result).toBeNull();
    });
  });
});

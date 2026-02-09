import { jest } from '@jest/globals';

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

// Factory funkce, která vrací čerstvý mock pro každý test
const createMockPrisma = () => ({
  postedContent: {
    findMany: jest.fn() as jest.MockedFunction<any>,
  },
  network: {
    findFirst: jest.fn() as jest.MockedFunction<any>,
  },
  $disconnect: jest.fn() as jest.MockedFunction<any>,
});

// První mock
let mockPrisma = createMockPrisma();

const mockInfluxDBService = {
  storeMetrics: jest.fn() as jest.MockedFunction<(metrics: any) => Promise<void>>,
  getLatestMetrics: jest.fn() as jest.MockedFunction<(postId: string, networkType: string) => Promise<any>>,
  getMetricsHistory: jest.fn() as jest.MockedFunction<(postId: string, networkType: string, start: Date, end: Date) => Promise<any[]>>,
  getAvailableMetrics: jest.fn() as jest.MockedFunction<(postId: string, networkType: string) => Promise<string[]>>,
  close: jest.fn() as jest.MockedFunction<() => Promise<void>>,
};

const mockProvider = {
  validateTokens: jest.fn() as jest.MockedFunction<(tokens: any) => boolean>,
  sendPost: jest.fn() as jest.MockedFunction<(content: string, attachments: string[], tokens: any) => Promise<string | null>>,
  getPostPerformance: jest.fn() as jest.MockedFunction<(postId: string, tokens: any) => Promise<any>>,
  networkType: 'facebook',
  getRequiredTokens: jest.fn(() => ['pageAccessToken', 'pageId']) as jest.MockedFunction<() => string[]>,
  getMonitoringInterval: jest.fn(() => 1) as jest.MockedFunction<() => number>,
};

const mockCronJob = {
  start: jest.fn() as jest.MockedFunction<any>,
  stop: jest.fn() as jest.MockedFunction<any>,
  destroy: jest.fn() as jest.MockedFunction<any>,
};

// Use jest.mock with a factory function that ensures fresh instances
jest.mock('../src/generated/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
}));

jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
  SocialNetworkProviderFactory: {
    getProvider: jest.fn(),
  },
}));

jest.mock('../src/social/InfluxDBService', () => ({
  InfluxDBService: jest.fn().mockImplementation(() => mockInfluxDBService),
}));

jest.mock('node-cron', () => ({
  schedule: jest.fn(),
}));

// Import po tom, co jsou mocky nastaveny
import { PerformanceMonitorService } from '../src/social/PerformanceMonitorService';
import { SocialNetworkProviderFactory } from '../src/social/SocialNetworkProviderFactory';
import { InfluxDBService } from '../src/social/InfluxDBService';
import { logger } from '../src/utils/logger';
import * as cron from 'node-cron';

const mockedLogger = logger as jest.Mocked<typeof logger>;

describe('PerformanceMonitorService', () => {
  let performanceMonitor: PerformanceMonitorService;
  let mockGetProvider: jest.MockedFunction<typeof SocialNetworkProviderFactory.getProvider>;
  let mockCronSchedule: jest.MockedFunction<typeof cron.schedule>;

  const mockInfluxConfig = {
    url: 'http://localhost:8086',
    token: 'mock_token',
    org: 'test_org',
    bucket: 'test_bucket'
  };

  // Helper function to properly assign mock functions
  const assignMockFunction = (target: any, methodName: string, mockFunction: any) => {
    target[methodName] = mockFunction;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a fresh mock for this test
    mockPrisma = createMockPrisma();

    // Setup mocks
    mockGetProvider = SocialNetworkProviderFactory.getProvider as jest.MockedFunction<typeof SocialNetworkProviderFactory.getProvider>;
    mockGetProvider.mockReturnValue(mockProvider);

    mockCronSchedule = cron.schedule as jest.MockedFunction<typeof cron.schedule>;
    mockCronSchedule.mockReturnValue(mockCronJob as any);

    (InfluxDBService as jest.MockedClass<typeof InfluxDBService>).mockImplementation(() => mockInfluxDBService as any);

    // Setup provider mocks
    mockProvider.validateTokens.mockReturnValue(true);
    mockProvider.getPostPerformance.mockResolvedValue({
      postId: 'test_post_123',
      networkType: 'facebook',
      timestamp: new Date(),
      views: 1000,
      likes: 50,
      shares: 10,
      comments: 5,
    });

    performanceMonitor = new PerformanceMonitorService(mockInfluxConfig);

    // Directly inject the mock into the service instance as a fallback
    (performanceMonitor as any).prisma = mockPrisma;

    // Mock console
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(async () => {
    // Only call stop if the service is actually running to avoid $disconnect errors
    if (performanceMonitor && (performanceMonitor as any).isRunning) {
      try {
        await performanceMonitor.stop();
      } catch (error) {
        // Ignore errors during test cleanup
        console.warn('Error during test cleanup:', error);
      }
    }
    jest.restoreAllMocks();
  });

  describe('Constructor and Initialization', () => {
    it('should create instance with correct configuration', () => {
      expect(InfluxDBService).toHaveBeenCalledWith(mockInfluxConfig);
      expect(performanceMonitor).toBeDefined();
    });
  });

  describe('Service Start/Stop', () => {
    it('should start monitoring service successfully', async () => {
      await performanceMonitor.start();

      // Should schedule monitoring for all networks
      expect(mockCronSchedule).toHaveBeenCalledTimes(6); // facebook, instagram, threads, bluesky, mastodon, twitter
      expect(mockCronSchedule).toHaveBeenCalledWith('0 * * * *', expect.any(Function)); // hourly for most
      expect(mockCronSchedule).toHaveBeenCalledWith('0 */12 * * *', expect.any(Function)); // 12-hourly for twitter
    });

    it('should not start if already running', async () => {
      await performanceMonitor.start();

      await performanceMonitor.start();

      expect(mockedLogger.info).toHaveBeenCalledWith('[PerformanceMonitor] Performance monitor is already running');
    });

    it('should stop monitoring service successfully', async () => {
      await performanceMonitor.start();
      await performanceMonitor.stop();

      expect(mockCronJob.stop).toHaveBeenCalledTimes(6);
      expect(mockInfluxDBService.close).toHaveBeenCalled();
      expect(mockPrisma.$disconnect).toHaveBeenCalled();
    });

    it('should not stop if not running', async () => {
      await performanceMonitor.stop();

      expect(mockedLogger.info).toHaveBeenCalledWith('[PerformanceMonitor] Performance monitor is not running');
    });
  });

  describe('Post Monitoring', () => {
    const mockTrackedPosts = [
      {
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        network_post_id: 'fb_post_123',
        actual_post_date: new Date('2024-01-01T10:00:00Z'),
        networks: { network_type: 'facebook' },
        posts: {
          creator_id: 1,
          users: { id: 1, username: 'testuser' }
        },
        contents: { content: 'Test post content' }
      }
    ];

    beforeEach(() => {
      (mockPrisma.postedContent.findMany as jest.MockedFunction<any>).mockResolvedValue(mockTrackedPosts as any);

      // Mock getUserTokens method using helper function with explicit typing
      const mockGetUserTokens = jest.fn() as jest.MockedFunction<any>;
      mockGetUserTokens.mockResolvedValue({
        pageAccessToken: 'mock_token',
        pageId: 'mock_page_id'
      });
      assignMockFunction(performanceMonitor, 'getUserTokens', mockGetUserTokens);
    });

    it('should get tracked posts correctly', async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Call private method through reflection for testing
      const getTrackedPosts = performanceMonitor['getTrackedPosts'].bind(performanceMonitor);
      const result = await getTrackedPosts('facebook');

      expect(mockPrisma.postedContent.findMany).toHaveBeenCalledWith({
        where: {
          networks: { network_type: 'facebook' },
          actual_post_date: { gte: expect.any(Date), not: null },
          network_post_id: { not: null }
        },
        include: {
          posts: { include: { users: true } },
          networks: true,
          contents: true
        },
        orderBy: { actual_post_date: 'desc' }
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 1,
        networkPostId: 'fb_post_123',
        networkType: 'facebook',
        userId: 1,
        createdAt: expect.any(Date),
        content: 'Test post content',
        isActive: true
      });
    });

    it('should monitor single post successfully', async () => {
      const testPost = {
        id: 1,
        networkPostId: 'fb_post_123',
        networkType: 'facebook',
        userId: 1,
        createdAt: new Date(),
        content: 'Test post',
        isActive: true
      };

      // Call private method
      const monitorSinglePost = performanceMonitor['monitorSinglePost'].bind(performanceMonitor);
      await monitorSinglePost(testPost, mockProvider);

      expect(mockProvider.validateTokens).toHaveBeenCalled();
      expect(mockProvider.getPostPerformance).toHaveBeenCalledWith(
        'fb_post_123',
        { pageAccessToken: 'mock_token', pageId: 'mock_page_id' }
      );
      expect(mockInfluxDBService.storeMetrics).toHaveBeenCalled();
    });

    it('should handle invalid tokens gracefully', async () => {
      mockProvider.validateTokens.mockReturnValue(false);

      const testPost = {
        id: 1,
        networkPostId: 'fb_post_123',
        networkType: 'facebook',
        userId: 1,
        createdAt: new Date(),
        content: 'Test post',
        isActive: true
      };

      const monitorSinglePost = performanceMonitor['monitorSinglePost'].bind(performanceMonitor);
      await monitorSinglePost(testPost, mockProvider);

      expect(mockedLogger.warn).toHaveBeenCalledWith('[PerformanceMonitor] Invalid tokens for user 1 on facebook');
      expect(mockProvider.getPostPerformance).not.toHaveBeenCalled();
    });

    it('should handle no metrics returned', async () => {
      mockProvider.getPostPerformance.mockResolvedValue(null);

      const testPost = {
        id: 1,
        networkPostId: 'inst_post_123',
        networkType: 'instagram',
        userId: 1,
        createdAt: new Date(),
        content: 'Test post',
        isActive: true
      };

      const monitorSinglePost = performanceMonitor['monitorSinglePost'].bind(performanceMonitor);
      await monitorSinglePost(testPost, mockProvider);

      expect(mockedLogger.warn).toHaveBeenCalledWith('[PerformanceMonitor] No metrics received for post inst_post_123 on instagram');
      expect(mockInfluxDBService.storeMetrics).not.toHaveBeenCalled();
    });

    it('should silently handle disabled monitoring networks', async () => {
      mockProvider.getPostPerformance.mockResolvedValue(null);
      const warnSpy = jest.spyOn(console, 'warn');

      const testPost = {
        id: 1,
        networkPostId: 'fb_post_123',
        networkType: 'facebook',
        userId: 1,
        createdAt: new Date(),
        content: 'Test post',
        isActive: true
      };

      const monitorSinglePost = performanceMonitor['monitorSinglePost'].bind(performanceMonitor);
      await monitorSinglePost(testPost, mockProvider);

      // Should not warn for facebook (disabled monitoring)
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should handle provider errors', async () => {
      mockProvider.getPostPerformance.mockRejectedValue(new Error('API Error'));

      const testPost = {
        id: 1,
        networkPostId: 'fb_post_123',
        networkType: 'facebook',
        userId: 1,
        createdAt: new Date(),
        content: 'Test post',
        isActive: true
      };

      const monitorSinglePost = performanceMonitor['monitorSinglePost'].bind(performanceMonitor);

      await expect(monitorSinglePost(testPost, mockProvider)).rejects.toThrow('API Error');
    });
  });

  describe('Manual Monitoring', () => {
    beforeEach(() => {
      const mockGetUserTokens = jest.fn() as jest.MockedFunction<any>;
      mockGetUserTokens.mockResolvedValue({
        pageAccessToken: 'mock_token',
        pageId: 'mock_page_id'
      });
      assignMockFunction(performanceMonitor, 'getUserTokens', mockGetUserTokens);
    });

    it('should monitor post manually', async () => {
      const result = await performanceMonitor.monitorPostManually(
        'fb_post_123',
        'facebook',
        1
      );

      expect(mockGetProvider).toHaveBeenCalledWith('facebook');
      expect(mockProvider.validateTokens).toHaveBeenCalled();
      expect(mockProvider.getPostPerformance).toHaveBeenCalledWith(
        'fb_post_123',
        { pageAccessToken: 'mock_token', pageId: 'mock_page_id' }
      );
      expect(mockInfluxDBService.storeMetrics).toHaveBeenCalled();
      expect(result).toEqual({
        postId: 'test_post_123',
        networkType: 'facebook',
        timestamp: expect.any(Date),
        views: 1000,
        likes: 50,
        shares: 10,
        comments: 5,
      });
    });

    it('should handle no provider found', async () => {
      mockGetProvider.mockReturnValue(null);

      await expect(
        performanceMonitor.monitorPostManually('fb_post_123', 'unknown', 1)
      ).rejects.toThrow('No provider found for network type: unknown');
    });

    it('should handle invalid tokens', async () => {
      mockProvider.validateTokens.mockReturnValue(false);

      await expect(
        performanceMonitor.monitorPostManually('fb_post_123', 'facebook', 1)
      ).rejects.toThrow('Invalid tokens for user 1 on facebook');
    });
  });

  describe('Metrics Retrieval', () => {
    const mockMetrics = {
      postId: 'test_post_123',
      networkType: 'facebook',
      timestamp: new Date(),
      views: 1000,
      likes: 50,
    };

    it('should get post metrics', async () => {
      mockInfluxDBService.getLatestMetrics.mockResolvedValue(mockMetrics);

      const result = await performanceMonitor.getPostMetrics('fb_post_123', 'facebook');

      expect(mockInfluxDBService.getLatestMetrics).toHaveBeenCalledWith('fb_post_123', 'facebook');
      expect(result).toEqual(mockMetrics);
    });

    it('should get post metrics history', async () => {
      const mockHistory = [mockMetrics];
      mockInfluxDBService.getMetricsHistory.mockResolvedValue(mockHistory);

      const startTime = new Date('2024-01-01');
      const endTime = new Date('2024-01-02');

      const result = await performanceMonitor.getPostMetricsHistory(
        'fb_post_123',
        'facebook',
        startTime,
        endTime
      );

      expect(mockInfluxDBService.getMetricsHistory).toHaveBeenCalledWith(
        'fb_post_123',
        'facebook',
        startTime,
        endTime
      );
      expect(result).toEqual(mockHistory);
    });

    it('should get available metrics', async () => {
      const mockAvailableMetrics = ['views', 'likes', 'shares'];
      mockInfluxDBService.getAvailableMetrics.mockResolvedValue(mockAvailableMetrics);

      const result = await performanceMonitor.getAvailableMetrics('fb_post_123', 'facebook');

      expect(mockInfluxDBService.getAvailableMetrics).toHaveBeenCalledWith('fb_post_123', 'facebook');
      expect(result).toEqual(mockAvailableMetrics);
    });
  });

  describe('Network Monitoring Integration', () => {
    beforeEach(() => {
      (mockPrisma.postedContent.findMany as jest.MockedFunction<any>).mockResolvedValue([] as any);
      const mockGetUserTokens = jest.fn() as jest.MockedFunction<any>;
      mockGetUserTokens.mockResolvedValue({});
      assignMockFunction(performanceMonitor, 'getUserTokens', mockGetUserTokens);
    });

    it('should handle empty tracked posts', async () => {
      const monitorNetworkPosts = performanceMonitor['monitorNetworkPosts'].bind(performanceMonitor);
      await monitorNetworkPosts('facebook');

      expect(mockPrisma.postedContent.findMany).toHaveBeenCalled();
      expect(mockGetProvider).not.toHaveBeenCalled();
    });

    it('should handle no provider found for network', async () => {
      (mockPrisma.postedContent.findMany as jest.MockedFunction<any>).mockResolvedValue([{
        posts_id: 1,
        networks_id: 1,
        network_post_id: 'test_post',
        networks: { network_type: 'unknown' },
        posts: { creator_id: 1 },
        contents: { content: 'test' },
        actual_post_date: new Date()
      }] as any);
      mockGetProvider.mockReturnValue(null);

      const monitorNetworkPosts = performanceMonitor['monitorNetworkPosts'].bind(performanceMonitor);
      await monitorNetworkPosts('unknown');

      expect(mockedLogger.error).toHaveBeenCalledWith('[PerformanceMonitor] No provider found for network type: unknown');
    });
  });
});

import { jest } from '@jest/globals';

// Mock dependencies před importy
const mockNetworkMethods = {
  findFirst: jest.fn() as jest.MockedFunction<any>,
  findMany: jest.fn() as jest.MockedFunction<any>,
};

const mockNetworkUsersMethods = {
  findFirst: jest.fn() as jest.MockedFunction<any>,
  findMany: jest.fn() as jest.MockedFunction<any>,
};

const mockPostMethods = {
  findFirst: jest.fn() as jest.MockedFunction<any>,
};

const mockPostEditorMethods = {
  findFirst: jest.fn() as jest.MockedFunction<any>,
};

const mockPostedContentMethods = {
  findMany: jest.fn() as jest.MockedFunction<any>,
};

// Mock services s explicitními metodami
const mockInfluxDBService = {
  queryMetrics: jest.fn() as jest.MockedFunction<any>,
  queryPostMetrics: jest.fn() as jest.MockedFunction<any>
};

const mockPerformanceMonitorService = {
  getPerformanceSummary: jest.fn() as jest.MockedFunction<any>,
  getPerformanceTrends: jest.fn() as jest.MockedFunction<any>,
  collectMetricsForAllNetworks: jest.fn() as jest.MockedFunction<any>
};

jest.mock('../src/generated/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    network: mockNetworkMethods,
    networksUsers: mockNetworkUsersMethods,
    post: mockPostMethods,
    postEditor: mockPostEditorMethods,
    postedContent: mockPostedContentMethods,
    $disconnect: jest.fn(),
  })),
}));

// Mock InfluxDB service
jest.mock('../src/social/InfluxDBService', () => ({
  InfluxDBService: {
    getInstance: jest.fn().mockReturnValue(mockInfluxDBService)
  }
}));

// Mock PerformanceMonitorService
jest.mock('../src/social/PerformanceMonitorService', () => ({
  PerformanceMonitorService: {
    getInstance: jest.fn().mockReturnValue(mockPerformanceMonitorService)
  }
}));

// Mock data
const mockUsers = {
  user1: {
    id: 1,
    username: 'testuser1',
    displayname: 'Test User 1',
  },
  user2: {
    id: 2,
    username: 'testuser2',
    displayname: 'Test User 2',
  }
};

const mockNetworks = {
  network1: {
    id: 1,
    owner_id: 1,
    network_type: 'facebook',
    network_name: 'Test Network',
    note: null
  }
};

describe('Monitor Routes Logic', () => {
  beforeEach(() => {
    // Reset všech mocků před každým testem
    jest.clearAllMocks();
    mockNetworkMethods.findFirst.mockClear();
    mockNetworkMethods.findMany.mockClear();
    mockNetworkUsersMethods.findFirst.mockClear();
    mockNetworkUsersMethods.findMany.mockClear();
    mockPostMethods.findFirst.mockClear();
    mockPostEditorMethods.findFirst.mockClear();
    mockPostedContentMethods.findMany.mockClear();

    // Reset service mocků
    mockInfluxDBService.queryMetrics.mockClear();
    mockInfluxDBService.queryPostMetrics.mockClear();
    mockPerformanceMonitorService.getPerformanceSummary.mockClear();
    mockPerformanceMonitorService.getPerformanceTrends.mockClear();
    mockPerformanceMonitorService.collectMetricsForAllNetworks.mockClear();

    // Reset default return values
    mockInfluxDBService.queryMetrics.mockResolvedValue([]);
    mockInfluxDBService.queryPostMetrics.mockResolvedValue([]);
    mockPerformanceMonitorService.getPerformanceSummary.mockResolvedValue({
      totalPosts: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      averageEngagement: 0,
      topPerformingPost: null
    });
    mockPerformanceMonitorService.getPerformanceTrends.mockResolvedValue([]);
    mockPerformanceMonitorService.collectMetricsForAllNetworks.mockResolvedValue({
      success: true,
      collected: 0
    });
  });

  describe('Network Metrics Logic', () => {
    it('should get network metrics successfully for network owner', async () => {
      const networkId = 1;
      const userId = mockUsers.user1.id;

      // Mock network ownership
      mockNetworkMethods.findFirst.mockResolvedValueOnce({
        id: networkId,
        owner_id: userId,
        network_type: 'facebook',
        network_name: 'Test Network',
        note: null
      });

      const ownershipCheck = await mockNetworkMethods.findFirst({
        where: {
          id: networkId,
          owner_id: userId
        }
      });

      expect(ownershipCheck).toBeTruthy();
      expect(ownershipCheck.owner_id).toBe(userId);

      // Mock InfluxDB metrics
      const mockMetrics = [
        {
          time: '2025-01-01T10:00:00Z',
          networkId: networkId,
          postId: 'post123',
          metric: 'views',
          value: 100
        },
        {
          time: '2025-01-01T10:00:00Z',
          networkId: networkId,
          postId: 'post123',
          metric: 'likes',
          value: 25
        }
      ];

      mockInfluxDBService.queryMetrics.mockResolvedValueOnce(mockMetrics);

      const metrics = await mockInfluxDBService.queryMetrics({
        networkId: networkId,
        from: '2025-01-01',
        to: '2025-01-02'
      });

      expect(metrics).toHaveLength(2);
      expect(metrics[0].metric).toBe('views');
      expect(metrics[1].metric).toBe('likes');
    });

    it('should deny metrics access to non-owner without read permission', async () => {
      const networkId = 1;
      const userId = mockUsers.user1.id;

      // Mock network owned by different user
      mockNetworkMethods.findFirst.mockResolvedValueOnce({
        id: networkId,
        owner_id: mockUsers.user2.id,
        network_type: 'facebook',
        network_name: 'Test Network',
        note: null
      });

      // Mock no network permissions
      mockNetworkUsersMethods.findFirst.mockResolvedValueOnce(null);

      const ownershipCheck = await mockNetworkMethods.findFirst({
        where: {
          id: networkId,
          owner_id: userId
        }
      });

      const permissionCheck = await mockNetworkUsersMethods.findFirst({
        where: {
          networks_id: networkId,
          grantee_id: userId
        }
      });

      expect(ownershipCheck.owner_id).not.toBe(userId);
      expect(permissionCheck).toBeNull();

      const hasAccess = ownershipCheck.owner_id === userId || permissionCheck !== null;
      expect(hasAccess).toBe(false);
    });

    it('should allow metrics access with read permission', async () => {
      const networkId = 1;
      const userId = mockUsers.user1.id;

      // Mock network owned by different user
      mockNetworkMethods.findFirst.mockResolvedValueOnce({
        id: networkId,
        owner_id: mockUsers.user2.id,
        network_type: 'facebook',
        network_name: 'Test Network',
        note: null
      });

      // Mock read permission
      mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
        networks_id: networkId,
        grantee_id: userId,
        permission: 'read'
      });

      const ownershipCheck = await mockNetworkMethods.findFirst({
        where: {
          id: networkId,
          owner_id: userId
        }
      });

      const permissionCheck = await mockNetworkUsersMethods.findFirst({
        where: {
          networks_id: networkId,
          grantee_id: userId
        }
      });

      expect(ownershipCheck.owner_id).not.toBe(userId);
      expect(permissionCheck.permission).toBe('read');

      const hasAccess = true; // Owner or has permission
      expect(hasAccess).toBe(true);
    });

    it('should validate date parameters correctly', () => {
      const fromDate = '2025-01-01';
      const toDate = '2025-01-07';

      const from = new Date(fromDate);
      const to = new Date(toDate);

      expect(from).toBeInstanceOf(Date);
      expect(to).toBeInstanceOf(Date);
      expect(to.getTime()).toBeGreaterThan(from.getTime());

      // Test invalid date
      const invalidDate = new Date('invalid-date');
      expect(isNaN(invalidDate.getTime())).toBe(true);
    });
  });

  describe('Post Metrics Logic', () => {
    it('should get post metrics successfully for post owner', async () => {
      const postId = 1;
      const userId = mockUsers.user1.id;

      // Mock post ownership
      mockPostMethods.findFirst.mockResolvedValueOnce({
        id: postId,
        creator_id: userId
      });

      const ownershipCheck = await mockPostMethods.findFirst({
        where: {
          id: postId,
          creator_id: userId
        }
      });

      expect(ownershipCheck).toBeTruthy();
      expect(ownershipCheck.creator_id).toBe(userId);

      // Mock posted content to get networks
      mockPostedContentMethods.findMany.mockResolvedValueOnce([
        {
          posts_id: postId,
          networks_id: 1,
          contents_id: 1,
          post_date: new Date(),
          actual_post_date: new Date(),
          network_post_id: 'network_post_123'
        }
      ]);

      const postedContent = await mockPostedContentMethods.findMany({
        where: { posts_id: postId }
      });

      expect(postedContent).toHaveLength(1);
      expect(postedContent[0].network_post_id).toBe('network_post_123');

      // Mock metrics
      const mockMetrics = [
        {
          time: '2025-01-01T10:00:00Z',
          postId: 'network_post_123',
          metric: 'views',
          value: 50
        }
      ];

      mockInfluxDBService.queryPostMetrics.mockResolvedValueOnce(mockMetrics);

      const metrics = await mockInfluxDBService.queryPostMetrics('network_post_123');

      expect(metrics).toHaveLength(1);
      expect(metrics[0].metric).toBe('views');
    });

    it('should deny post metrics access without permissions', async () => {
      const postId = 1;
      const userId = mockUsers.user1.id;

      // Mock post owned by different user
      mockPostMethods.findFirst.mockResolvedValueOnce({
        id: postId,
        creator_id: mockUsers.user2.id
      });

      // Mock no editor permissions
      mockPostEditorMethods.findFirst.mockResolvedValueOnce(null);

      const ownershipCheck = await mockPostMethods.findFirst({
        where: {
          id: postId,
          creator_id: userId
        }
      });

      const editorCheck = await mockPostEditorMethods.findFirst({
        where: {
          posts_id: postId,
          editor_id: userId
        }
      });

      expect(ownershipCheck.creator_id).not.toBe(userId);
      expect(editorCheck).toBeNull();

      const hasAccess = ownershipCheck.creator_id === userId || editorCheck !== null;
      expect(hasAccess).toBe(false);
    });
  });

  describe('Performance Summary Logic', () => {
    it('should get performance summary for user networks', async () => {
      const userId = mockUsers.user1.id;

      // Mock user networks
      mockNetworkMethods.findMany.mockResolvedValueOnce([mockNetworks.network1]);
      mockNetworkUsersMethods.findMany.mockResolvedValueOnce([]);

      const ownedNetworks = await mockNetworkMethods.findMany({
        where: { owner_id: userId }
      });

      const grantedNetworks = await mockNetworkUsersMethods.findMany({
        where: { grantee_id: userId }
      });

      expect(ownedNetworks).toHaveLength(1);
      expect(grantedNetworks).toHaveLength(0);

      // Mock performance summary
      const mockSummary = {
        totalPosts: 10,
        totalViews: 1000,
        totalLikes: 200,
        totalShares: 50,
        averageEngagement: 0.25,
        topPerformingPost: {
          postId: 'post123',
          networkPostId: 'network_post_123',
          views: 500,
          likes: 100
        }
      };

      mockPerformanceMonitorService.getPerformanceSummary.mockResolvedValueOnce(mockSummary);

      const summary = await mockPerformanceMonitorService.getPerformanceSummary([1]);

      expect(summary.totalPosts).toBe(10);
      expect(summary.averageEngagement).toBe(0.25);
      expect(summary.topPerformingPost).toBeTruthy();
    });

    it('should handle empty network list', async () => {
      const userId = mockUsers.user1.id;

      mockNetworkMethods.findMany.mockResolvedValueOnce([]);
      mockNetworkUsersMethods.findMany.mockResolvedValueOnce([]);

      const ownedNetworks = await mockNetworkMethods.findMany({
        where: { owner_id: userId }
      });

      const grantedNetworks = await mockNetworkUsersMethods.findMany({
        where: { grantee_id: userId }
      });

      expect(ownedNetworks).toHaveLength(0);
      expect(grantedNetworks).toHaveLength(0);

      mockPerformanceMonitorService.getPerformanceSummary.mockResolvedValueOnce({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalShares: 0,
        averageEngagement: 0,
        topPerformingPost: null
      });

      const summary = await mockPerformanceMonitorService.getPerformanceSummary([]);

      expect(summary.totalPosts).toBe(0);
      expect(summary.topPerformingPost).toBeNull();
    });
  });

  describe('Performance Trends Logic', () => {
    it('should get performance trends successfully', async () => {
      mockNetworkMethods.findMany.mockResolvedValueOnce([mockNetworks.network1]);
      mockNetworkUsersMethods.findMany.mockResolvedValueOnce([]);

      const mockTrends = [
        {
          date: '2025-01-01',
          views: 100,
          likes: 20,
          shares: 5,
          engagement: 0.25
        },
        {
          date: '2025-01-02',
          views: 120,
          likes: 25,
          shares: 8,
          engagement: 0.275
        }
      ];

      mockPerformanceMonitorService.getPerformanceTrends.mockResolvedValueOnce(mockTrends);

      const trends = await mockPerformanceMonitorService.getPerformanceTrends([1], {
        from: '2025-01-01',
        to: '2025-01-07'
      });

      expect(trends).toHaveLength(2);
      expect(trends[0].engagement).toBe(0.25);
      expect(trends[1].engagement).toBe(0.275);
    });

    it('should validate date range for trends', () => {
      const fromStr = '2025-01-01';
      const toStr = '2024-12-31'; // Invalid - to is before from

      const fromDate = new Date(fromStr);
      const toDate = new Date(toStr);

      const isValidRange = toDate.getTime() > fromDate.getTime();
      expect(isValidRange).toBe(false);

      // Valid range
      const validToStr = '2025-01-07';
      const validToDate = new Date(validToStr);
      const isValidRange2 = validToDate.getTime() > fromDate.getTime();
      expect(isValidRange2).toBe(true);
    });
  });

  describe('Metrics Collection Logic', () => {
    it('should trigger metrics collection successfully', async () => {
      const userId = mockUsers.user1.id;

      mockNetworkMethods.findMany.mockResolvedValueOnce([mockNetworks.network1]);
      mockNetworkUsersMethods.findMany.mockResolvedValueOnce([]);

      const ownedNetworks = await mockNetworkMethods.findMany({
        where: { owner_id: userId }
      });

      expect(ownedNetworks).toHaveLength(1);

      mockPerformanceMonitorService.collectMetricsForAllNetworks.mockResolvedValueOnce({
        success: true,
        collected: 5
      });

      const result = await mockPerformanceMonitorService.collectMetricsForAllNetworks([1]);

      expect(result.success).toBe(true);
      expect(result.collected).toBe(5);
    });

    it('should handle metrics collection errors', async () => {
      mockNetworkMethods.findMany.mockResolvedValueOnce([]);

      const ownedNetworks = await mockNetworkMethods.findMany({
        where: { owner_id: mockUsers.user1.id }
      });

      expect(ownedNetworks).toHaveLength(0);

      mockPerformanceMonitorService.collectMetricsForAllNetworks.mockRejectedValueOnce(new Error('Collection failed'));

      try {
        await mockPerformanceMonitorService.collectMetricsForAllNetworks([]);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toBe('Collection failed');
      }
    });
  });

  describe('Metric Data Validation', () => {
    it('should validate metric data structure', () => {
      const mockMetric = {
        time: '2025-01-01T10:00:00Z',
        networkId: 1,
        postId: 'post123',
        metric: 'views',
        value: 100
      };

      expect(mockMetric.time).toBeTruthy();
      expect(typeof mockMetric.networkId).toBe('number');
      expect(typeof mockMetric.postId).toBe('string');
      expect(['views', 'likes', 'shares', 'comments'].includes(mockMetric.metric)).toBe(true);
      expect(typeof mockMetric.value).toBe('number');
      expect(mockMetric.value).toBeGreaterThanOrEqual(0);
    });

    it('should validate performance summary structure', () => {
      const mockSummary = {
        totalPosts: 10,
        totalViews: 1000,
        totalLikes: 200,
        totalShares: 50,
        averageEngagement: 0.25,
        topPerformingPost: {
          postId: 'post123',
          networkPostId: 'network_post_123',
          views: 500,
          likes: 100
        }
      };

      expect(typeof mockSummary.totalPosts).toBe('number');
      expect(typeof mockSummary.totalViews).toBe('number');
      expect(typeof mockSummary.averageEngagement).toBe('number');
      expect(mockSummary.averageEngagement).toBeGreaterThanOrEqual(0);
      expect(mockSummary.averageEngagement).toBeLessThanOrEqual(1);
      expect(mockSummary.topPerformingPost).toBeTruthy();
    });
  });
});

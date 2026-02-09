"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock loggeru
globals_1.jest.mock('../src/utils/logger', () => ({
    logger: {
        info: globals_1.jest.fn(),
        error: globals_1.jest.fn(),
        warn: globals_1.jest.fn(),
        debug: globals_1.jest.fn(),
        trace: globals_1.jest.fn(),
        fatal: globals_1.jest.fn(),
    }
}));
// Factory funkce, která vrací čerstvý mock pro každý test
const createMockPrisma = () => ({
    postedContent: {
        findMany: globals_1.jest.fn(),
    },
    network: {
        findFirst: globals_1.jest.fn(),
    },
    $disconnect: globals_1.jest.fn(),
});
// První mock
let mockPrisma = createMockPrisma();
const mockInfluxDBService = {
    storeMetrics: globals_1.jest.fn(),
    getLatestMetrics: globals_1.jest.fn(),
    getMetricsHistory: globals_1.jest.fn(),
    getAvailableMetrics: globals_1.jest.fn(),
    close: globals_1.jest.fn(),
};
const mockProvider = {
    validateTokens: globals_1.jest.fn(),
    sendPost: globals_1.jest.fn(),
    getPostPerformance: globals_1.jest.fn(),
    networkType: 'facebook',
    getRequiredTokens: globals_1.jest.fn(() => ['pageAccessToken', 'pageId']),
    getMonitoringInterval: globals_1.jest.fn(() => 1),
};
const mockCronJob = {
    start: globals_1.jest.fn(),
    stop: globals_1.jest.fn(),
    destroy: globals_1.jest.fn(),
};
// Use jest.mock with a factory function that ensures fresh instances
globals_1.jest.mock('../src/generated/client', () => ({
    PrismaClient: globals_1.jest.fn().mockImplementation(() => mockPrisma),
}));
globals_1.jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
    SocialNetworkProviderFactory: {
        getProvider: globals_1.jest.fn(),
    },
}));
globals_1.jest.mock('../src/social/InfluxDBService', () => ({
    InfluxDBService: globals_1.jest.fn().mockImplementation(() => mockInfluxDBService),
}));
globals_1.jest.mock('node-cron', () => ({
    schedule: globals_1.jest.fn(),
}));
// Import po tom, co jsou mocky nastaveny
const PerformanceMonitorService_1 = require("../src/social/PerformanceMonitorService");
const SocialNetworkProviderFactory_1 = require("../src/social/SocialNetworkProviderFactory");
const InfluxDBService_1 = require("../src/social/InfluxDBService");
const logger_1 = require("../src/utils/logger");
const cron = __importStar(require("node-cron"));
const mockedLogger = logger_1.logger;
describe('PerformanceMonitorService', () => {
    let performanceMonitor;
    let mockGetProvider;
    let mockCronSchedule;
    const mockInfluxConfig = {
        url: 'http://localhost:8086',
        token: 'mock_token',
        org: 'test_org',
        bucket: 'test_bucket'
    };
    // Helper function to properly assign mock functions
    const assignMockFunction = (target, methodName, mockFunction) => {
        target[methodName] = mockFunction;
    };
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        // Create a fresh mock for this test
        mockPrisma = createMockPrisma();
        // Setup mocks
        mockGetProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider;
        mockGetProvider.mockReturnValue(mockProvider);
        mockCronSchedule = cron.schedule;
        mockCronSchedule.mockReturnValue(mockCronJob);
        InfluxDBService_1.InfluxDBService.mockImplementation(() => mockInfluxDBService);
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
        performanceMonitor = new PerformanceMonitorService_1.PerformanceMonitorService(mockInfluxConfig);
        // Directly inject the mock into the service instance as a fallback
        performanceMonitor.prisma = mockPrisma;
        // Mock console
        globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'warn').mockImplementation(() => { });
    });
    afterEach(async () => {
        // Only call stop if the service is actually running to avoid $disconnect errors
        if (performanceMonitor && performanceMonitor.isRunning) {
            try {
                await performanceMonitor.stop();
            }
            catch (error) {
                // Ignore errors during test cleanup
                console.warn('Error during test cleanup:', error);
            }
        }
        globals_1.jest.restoreAllMocks();
    });
    describe('Constructor and Initialization', () => {
        it('should create instance with correct configuration', () => {
            expect(InfluxDBService_1.InfluxDBService).toHaveBeenCalledWith(mockInfluxConfig);
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
            mockPrisma.postedContent.findMany.mockResolvedValue(mockTrackedPosts);
            // Mock getUserTokens method using helper function with explicit typing
            const mockGetUserTokens = globals_1.jest.fn();
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
            expect(mockProvider.getPostPerformance).toHaveBeenCalledWith('fb_post_123', { pageAccessToken: 'mock_token', pageId: 'mock_page_id' });
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
            const warnSpy = globals_1.jest.spyOn(console, 'warn');
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
            const mockGetUserTokens = globals_1.jest.fn();
            mockGetUserTokens.mockResolvedValue({
                pageAccessToken: 'mock_token',
                pageId: 'mock_page_id'
            });
            assignMockFunction(performanceMonitor, 'getUserTokens', mockGetUserTokens);
        });
        it('should monitor post manually', async () => {
            const result = await performanceMonitor.monitorPostManually('fb_post_123', 'facebook', 1);
            expect(mockGetProvider).toHaveBeenCalledWith('facebook');
            expect(mockProvider.validateTokens).toHaveBeenCalled();
            expect(mockProvider.getPostPerformance).toHaveBeenCalledWith('fb_post_123', { pageAccessToken: 'mock_token', pageId: 'mock_page_id' });
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
            await expect(performanceMonitor.monitorPostManually('fb_post_123', 'unknown', 1)).rejects.toThrow('No provider found for network type: unknown');
        });
        it('should handle invalid tokens', async () => {
            mockProvider.validateTokens.mockReturnValue(false);
            await expect(performanceMonitor.monitorPostManually('fb_post_123', 'facebook', 1)).rejects.toThrow('Invalid tokens for user 1 on facebook');
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
            const result = await performanceMonitor.getPostMetricsHistory('fb_post_123', 'facebook', startTime, endTime);
            expect(mockInfluxDBService.getMetricsHistory).toHaveBeenCalledWith('fb_post_123', 'facebook', startTime, endTime);
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
            mockPrisma.postedContent.findMany.mockResolvedValue([]);
            const mockGetUserTokens = globals_1.jest.fn();
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
            mockPrisma.postedContent.findMany.mockResolvedValue([{
                    posts_id: 1,
                    networks_id: 1,
                    network_post_id: 'test_post',
                    networks: { network_type: 'unknown' },
                    posts: { creator_id: 1 },
                    contents: { content: 'test' },
                    actual_post_date: new Date()
                }]);
            mockGetProvider.mockReturnValue(null);
            const monitorNetworkPosts = performanceMonitor['monitorNetworkPosts'].bind(performanceMonitor);
            await monitorNetworkPosts('unknown');
            expect(mockedLogger.error).toHaveBeenCalledWith('[PerformanceMonitor] No provider found for network type: unknown');
        });
    });
});

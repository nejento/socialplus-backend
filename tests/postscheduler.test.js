"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock logger
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
const PostScheduler_1 = require("../src/social/PostScheduler");
const SocialNetworkProviderFactory_1 = require("../src/social/SocialNetworkProviderFactory");
const logger_1 = require("../src/utils/logger");
const mockedLogger = logger_1.logger;
// Mock dependencies s TypeScript typy
const mockPrisma = {
    postedContent: {
        findMany: globals_1.jest.fn(),
        update: globals_1.jest.fn(),
    },
};
// Mock providers s TypeScript typy
const mockProvider = {
    validateTokens: globals_1.jest.fn(),
    sendPost: globals_1.jest.fn(),
    networkType: 'facebook',
    getRequiredTokens: globals_1.jest.fn(() => ['pageAccessToken', 'pageId']),
    getPostPerformance: globals_1.jest.fn(),
    getMonitoringInterval: globals_1.jest.fn(() => 1),
};
// Mock SocialNetworkProviderFactory
globals_1.jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
    SocialNetworkProviderFactory: {
        getProvider: globals_1.jest.fn(),
    },
}));
describe('PostScheduler', () => {
    let postScheduler;
    let mockGetProvider;
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        // Reset provider mock
        mockProvider.validateTokens.mockReturnValue(true);
        mockProvider.sendPost.mockResolvedValue('mock_post_id_123');
        // Setup factory mock
        mockGetProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider;
        mockGetProvider.mockReturnValue(mockProvider);
        // Vytvoří instanci scheduleru s mockovanou prisma
        postScheduler = new PostScheduler_1.PostScheduler(mockPrisma, 1);
        // Mock console pro snížení logování během testů
        globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        postScheduler.stop();
        globals_1.jest.restoreAllMocks();
    });
    describe('Constructor and Basic Operations', () => {
        it('should create instance with default check interval', () => {
            const scheduler = new PostScheduler_1.PostScheduler(mockPrisma);
            const status = scheduler.getStatus();
            expect(status.checkIntervalMinutes).toBe(1);
            expect(status.isRunning).toBe(false);
        });
        it('should create instance with custom check interval', () => {
            const scheduler = new PostScheduler_1.PostScheduler(mockPrisma, 5);
            const status = scheduler.getStatus();
            expect(status.checkIntervalMinutes).toBe(5);
            expect(status.isRunning).toBe(false);
        });
        it('should get correct status when not running', () => {
            const status = postScheduler.getStatus();
            expect(status.isRunning).toBe(false);
            expect(status.checkIntervalMinutes).toBe(1);
            expect(status.nextCheck).toBeUndefined();
        });
    });
    describe('Scheduler Start/Stop', () => {
        it('should start scheduler successfully', () => {
            postScheduler.start();
            const status = postScheduler.getStatus();
            expect(status.isRunning).toBe(true);
            expect(status.nextCheck).toBeDefined();
        });
        it('should not start scheduler if already running', () => {
            postScheduler.start();
            postScheduler.start();
            expect(mockedLogger.info).toHaveBeenCalledWith('[PostScheduler] Post scheduler is already running');
        });
        it('should stop scheduler successfully', () => {
            postScheduler.start();
            postScheduler.stop();
            const status = postScheduler.getStatus();
            expect(status.isRunning).toBe(false);
            expect(status.nextCheck).toBeUndefined();
        });
    });
    describe('Scheduled Posts Processing', () => {
        const mockScheduledPosts = [
            {
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: new Date('2024-01-01T10:00:00Z'),
                actual_post_date: null,
                network_post_id: null,
                contents: { content: 'Test post content' },
                networks: {
                    network_type: 'facebook',
                    network_tokens: [
                        { token_name: 'pageAccessToken', token: 'mock_token' },
                        { token_name: 'pageId', token: 'mock_page_id' }
                    ]
                },
                posts: {
                    attachments: [
                        { path: '/path/to/image1.jpg' },
                        { path: '/path/to/image2.jpg' }
                    ]
                }
            }
        ];
        it('should process scheduled posts successfully', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockPrisma.postedContent.update.mockResolvedValue({});
            await postScheduler.manualCheck();
            expect(mockPrisma.postedContent.findMany).toHaveBeenCalledWith({
                where: {
                    post_date: { lte: expect.any(Date) },
                    actual_post_date: null,
                    network_post_id: null
                },
                include: {
                    contents: true,
                    networks: { include: { network_tokens: true } },
                    posts: { include: { attachments: true } }
                },
                orderBy: { post_date: 'asc' }
            });
            expect(mockGetProvider).toHaveBeenCalledWith('facebook');
            expect(mockProvider.validateTokens).toHaveBeenCalledWith({
                pageAccessToken: 'mock_token',
                pageId: 'mock_page_id'
            });
            expect(mockProvider.sendPost).toHaveBeenCalledWith('Test post content', ['/path/to/image1.jpg', '/path/to/image2.jpg'], { pageAccessToken: 'mock_token', pageId: 'mock_page_id' });
            expect(mockPrisma.postedContent.update).toHaveBeenCalledWith({
                where: {
                    posts_id_networks_id: {
                        posts_id: 1,
                        networks_id: 1
                    }
                },
                data: {
                    actual_post_date: expect.any(Date),
                    network_post_id: 'mock_post_id_123'
                }
            });
        });
        it('should handle empty scheduled posts', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue([]);
            await postScheduler.manualCheck();
            expect(mockGetProvider).not.toHaveBeenCalled();
            expect(mockProvider.sendPost).not.toHaveBeenCalled();
        });
        it('should handle provider not found error', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockGetProvider.mockReturnValue(null);
            await postScheduler.manualCheck();
            expect(mockProvider.sendPost).not.toHaveBeenCalled();
            expect(mockPrisma.postedContent.update).toHaveBeenCalledWith({
                where: {
                    posts_id_networks_id: {
                        posts_id: 1,
                        networks_id: 1
                    }
                },
                data: {
                    actual_post_date: expect.any(Date),
                    network_post_id: null
                }
            });
        });
        it('should handle invalid tokens error', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockProvider.validateTokens.mockReturnValue(false);
            await postScheduler.manualCheck();
            expect(mockProvider.sendPost).not.toHaveBeenCalled();
            expect(mockPrisma.postedContent.update).toHaveBeenCalledWith({
                where: {
                    posts_id_networks_id: {
                        posts_id: 1,
                        networks_id: 1
                    }
                },
                data: {
                    actual_post_date: expect.any(Date),
                    network_post_id: null
                }
            });
        });
        it('should handle sendPost failure', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockProvider.sendPost.mockResolvedValue(null);
            await postScheduler.manualCheck();
            expect(mockPrisma.postedContent.update).toHaveBeenCalledWith({
                where: {
                    posts_id_networks_id: {
                        posts_id: 1,
                        networks_id: 1
                    }
                },
                data: {
                    actual_post_date: expect.any(Date),
                    network_post_id: null
                }
            });
        });
        it('should handle sendPost exception', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockProvider.sendPost.mockRejectedValue(new Error('API Error'));
            await postScheduler.manualCheck();
            expect(mockPrisma.postedContent.update).toHaveBeenCalledWith({
                where: {
                    posts_id_networks_id: {
                        posts_id: 1,
                        networks_id: 1
                    }
                },
                data: {
                    actual_post_date: expect.any(Date),
                    network_post_id: null
                }
            });
        });
        it('should handle database error during findMany', async () => {
            mockPrisma.postedContent.findMany.mockRejectedValue(new Error('Database error'));
            await postScheduler.manualCheck();
            expect(mockProvider.sendPost).not.toHaveBeenCalled();
            expect(mockPrisma.postedContent.update).not.toHaveBeenCalled();
        });
        it('should handle database error during update', async () => {
            mockPrisma.postedContent.findMany.mockResolvedValue(mockScheduledPosts);
            mockPrisma.postedContent.update.mockRejectedValue(new Error('Update failed'));
            await postScheduler.manualCheck();
            expect(mockProvider.sendPost).toHaveBeenCalled();
            // Update should still be attempted even if it fails
            expect(mockPrisma.postedContent.update).toHaveBeenCalled();
        });
    });
    describe('Multiple Posts Processing', () => {
        it('should process multiple posts for different networks', async () => {
            const multiplePosts = [
                {
                    posts_id: 1,
                    networks_id: 1,
                    contents_id: 1,
                    post_date: new Date('2024-01-01T10:00:00Z'),
                    actual_post_date: null,
                    network_post_id: null,
                    contents: { content: 'Facebook post' },
                    networks: {
                        network_type: 'facebook',
                        network_tokens: [
                            { token_name: 'pageAccessToken', token: 'fb_token' },
                            { token_name: 'pageId', token: 'fb_page_id' }
                        ]
                    },
                    posts: { attachments: [] }
                },
                {
                    posts_id: 2,
                    networks_id: 2,
                    contents_id: 2,
                    post_date: new Date('2024-01-01T10:00:00Z'),
                    actual_post_date: null,
                    network_post_id: null,
                    contents: { content: 'Twitter post' },
                    networks: {
                        network_type: 'twitter',
                        network_tokens: [
                            { token_name: 'accessToken', token: 'tw_token' },
                            { token_name: 'accessTokenSecret', token: 'tw_secret' }
                        ]
                    },
                    posts: { attachments: [] }
                }
            ];
            const mockTwitterProvider = {
                validateTokens: globals_1.jest.fn(),
                sendPost: globals_1.jest.fn(),
                networkType: 'twitter',
                getRequiredTokens: globals_1.jest.fn(() => ['accessToken', 'accessTokenSecret']),
                getPostPerformance: globals_1.jest.fn(),
                getMonitoringInterval: globals_1.jest.fn(() => 1),
            };
            // Set up mock return values after creation
            mockTwitterProvider.validateTokens.mockReturnValue(true);
            mockTwitterProvider.sendPost.mockResolvedValue('twitter_post_id');
            mockPrisma.postedContent.findMany.mockResolvedValue(multiplePosts);
            mockPrisma.postedContent.update.mockResolvedValue({});
            mockGetProvider
                .mockReturnValueOnce(mockProvider) // for facebook
                .mockReturnValueOnce(mockTwitterProvider); // for twitter
            await postScheduler.manualCheck();
            expect(mockGetProvider).toHaveBeenCalledTimes(2);
            expect(mockGetProvider).toHaveBeenNthCalledWith(1, 'facebook');
            expect(mockGetProvider).toHaveBeenNthCalledWith(2, 'twitter');
            expect(mockProvider.sendPost).toHaveBeenCalledWith('Facebook post', [], { pageAccessToken: 'fb_token', pageId: 'fb_page_id' });
            expect(mockTwitterProvider.sendPost).toHaveBeenCalledWith('Twitter post', [], { accessToken: 'tw_token', accessTokenSecret: 'tw_secret' });
            expect(mockPrisma.postedContent.update).toHaveBeenCalledTimes(2);
        });
    });
});

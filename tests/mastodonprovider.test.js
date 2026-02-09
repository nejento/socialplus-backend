"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock fetch globally for Mastodon API calls with proper typing
const mockFetch = globals_1.jest.fn();
global.fetch = mockFetch;
// Mock fs for file operations
const mockFs = {
    readFileSync: globals_1.jest.fn(),
    existsSync: globals_1.jest.fn().mockReturnValue(true)
};
globals_1.jest.mock('fs', () => mockFs, { virtual: true });
// Mock path
const mockPath = {
    basename: globals_1.jest.fn((filePath) => filePath.split('/').pop() || 'file.jpg')
};
globals_1.jest.mock('path', () => mockPath, { virtual: true });
// Mock axios
globals_1.jest.mock('axios');
const MastodonProvider_1 = require("../src/social/MastodonProvider");
const axios_1 = __importDefault(require("axios"));
const mockedAxios = axios_1.default;
// Helper function to create properly typed mock responses
const createMockResponse = (data, ok = true) => {
    const mockJson = globals_1.jest.fn();
    mockJson.mockResolvedValue(data);
    return {
        ok,
        json: mockJson
    };
};
describe('MastodonProvider', () => {
    let mastodonProvider;
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        mastodonProvider = new MastodonProvider_1.MastodonProvider();
        // Mock console methods
        globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'warn').mockImplementation(() => { });
        // Reset fetch mock
        mockFetch.mockReset();
    });
    afterEach(() => {
        globals_1.jest.restoreAllMocks();
    });
    describe('Provider Configuration', () => {
        it('should have correct network type', () => {
            expect(mastodonProvider.networkType).toBe('mastodon');
        });
        it('should return required tokens', () => {
            const requiredTokens = mastodonProvider.getRequiredTokens();
            expect(requiredTokens).toEqual(['instanceUrl', 'accessToken']);
        });
        it('should return monitoring interval', () => {
            const interval = mastodonProvider.getMonitoringInterval();
            expect(interval).toBe(1);
        });
    });
    describe('Token Validation', () => {
        it('should validate correct tokens', () => {
            const validTokens = {
                instanceUrl: 'https://mastodon.social',
                accessToken: 'valid_access_token'
            };
            const isValid = mastodonProvider.validateTokens(validTokens);
            expect(isValid).toBe(true);
        });
        it('should reject missing instanceUrl', () => {
            const invalidTokens = {
                accessToken: 'valid_access_token'
            };
            const isValid = mastodonProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject missing accessToken', () => {
            const invalidTokens = {
                instanceUrl: 'https://mastodon.social'
            };
            const isValid = mastodonProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject empty tokens', () => {
            const emptyTokens = {};
            const isValid = mastodonProvider.validateTokens(emptyTokens);
            expect(isValid).toBe(false);
        });
        it('should reject tokens with empty strings', () => {
            const emptyStringTokens = {
                instanceUrl: '',
                accessToken: 'valid_token'
            };
            const isValid = mastodonProvider.validateTokens(emptyStringTokens);
            expect(isValid).toBe(false);
        });
        it('should reject null/undefined tokens', () => {
            expect(mastodonProvider.validateTokens(null)).toBe(false);
            expect(mastodonProvider.validateTokens(undefined)).toBe(false);
        });
    });
    describe('sendPost Method', () => {
        const validTokens = {
            instanceUrl: 'https://mastodon.social',
            accessToken: 'test_access_token'
        };
        it('should send text-only post successfully', async () => {
            const mockResponse = createMockResponse({
                id: 'mastodon_post_123',
                url: 'https://mastodon.social/@user/123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost('Test post content', [], validTokens);
            expect(result).toBe('mastodon_post_123');
            expect(mockFetch).toHaveBeenCalledWith('https://mastodon.social/api/v1/statuses', expect.objectContaining({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer test_access_token'
                },
                body: expect.any(FormData)
            }));
        });
        it('should handle instanceUrl with trailing slash', async () => {
            const tokensWithSlash = {
                instanceUrl: 'https://mastodon.social/',
                accessToken: 'test_access_token'
            };
            const mockResponse = createMockResponse({
                id: 'mastodon_post_123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost('Test content', [], tokensWithSlash);
            expect(result).toBe('mastodon_post_123');
            expect(mockFetch).toHaveBeenCalledWith('https://mastodon.social/api/v1/statuses', expect.any(Object));
        });
        it('should handle invalid tokens gracefully', async () => {
            const invalidTokens = {
                instanceUrl: 'https://mastodon.social'
            };
            const result = await mastodonProvider.sendPost('Test content', [], invalidTokens);
            expect(result).toBeNull();
            expect(mockFetch).not.toHaveBeenCalled();
        });
        it('should handle API error response', async () => {
            const mockErrorResponse = createMockResponse({
                error: 'Invalid access token'
            }, false);
            mockFetch.mockResolvedValue(mockErrorResponse);
            const result = await mastodonProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle network error', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));
            const result = await mastodonProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle post with attachments', async () => {
            // Mock file system
            mockFs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            mockPath.basename.mockReturnValue('image.jpg');
            // Mock media upload response
            const mockMediaResponse = createMockResponse({
                id: 'media_123'
            });
            // Mock status post response
            const mockStatusResponse = createMockResponse({
                id: 'mastodon_post_with_media_123'
            });
            mockFetch
                .mockResolvedValueOnce(mockMediaResponse) // First call for media upload
                .mockResolvedValueOnce(mockStatusResponse); // Second call for status post
            const result = await mastodonProvider.sendPost('Post with image', ['/path/to/image.jpg'], validTokens);
            expect(result).toBe('mastodon_post_with_media_123');
            expect(mockFetch).toHaveBeenCalledTimes(2);
            // Check media upload call
            expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://mastodon.social/api/v2/media', expect.objectContaining({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer test_access_token'
                }
            }));
            // Check status post call
            expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://mastodon.social/api/v1/statuses', expect.objectContaining({
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer test_access_token'
                }
            }));
        });
        it('should handle media upload failure gracefully', async () => {
            mockFs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            // Mock failed media upload
            const mockMediaErrorResponse = createMockResponse({
                error: 'File too large'
            }, false);
            // Mock successful status post
            const mockStatusResponse = createMockResponse({
                id: 'mastodon_post_123'
            });
            mockFetch
                .mockResolvedValueOnce(mockMediaErrorResponse) // Media upload fails
                .mockResolvedValueOnce(mockStatusResponse); // Status post succeeds
            const result = await mastodonProvider.sendPost('Post with failed attachment', ['/path/to/large_image.jpg'], validTokens);
            expect(result).toBe('mastodon_post_123');
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
        it('should handle multiple attachments', async () => {
            mockFs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            // Mock media upload responses
            const mockMediaResponse1 = createMockResponse({ id: 'media_1' });
            const mockMediaResponse2 = createMockResponse({ id: 'media_2' });
            // Mock status post response
            const mockStatusResponse = createMockResponse({
                id: 'mastodon_post_multi_123'
            });
            mockFetch
                .mockResolvedValueOnce(mockMediaResponse1)
                .mockResolvedValueOnce(mockMediaResponse2)
                .mockResolvedValueOnce(mockStatusResponse);
            const result = await mastodonProvider.sendPost('Post with multiple images', ['/path/to/image1.jpg', '/path/to/image2.png'], validTokens);
            expect(result).toBe('mastodon_post_multi_123');
            expect(mockFetch).toHaveBeenCalledTimes(3);
        });
    });
    describe('getPostPerformance Method', () => {
        const validTokens = {
            instanceUrl: 'https://mastodon.social',
            accessToken: 'test_access_token'
        };
        it('should return performance metrics successfully', async () => {
            const mockStatusData = {
                id: 'mastodon_123',
                favourites_count: 15,
                replies_count: 5,
                reblogs_count: 8,
                poll: {
                    votes_count: 25
                }
            };
            mockedAxios.get.mockResolvedValue({
                data: mockStatusData
            });
            const result = await mastodonProvider.getPostPerformance('mastodon_123', validTokens);
            expect(result).toEqual({
                postId: 'mastodon_123',
                networkType: 'mastodon',
                timestamp: expect.any(Date),
                likes: 15,
                comments: 5,
                reposts: 8,
                customMetrics: {
                    has_poll: true,
                    poll_votes: 25
                }
            });
            expect(mockedAxios.get).toHaveBeenCalledWith('https://mastodon.social/api/v1/statuses/mastodon_123', {
                headers: {
                    'Authorization': 'Bearer test_access_token',
                    'Content-Type': 'application/json'
                }
            });
        });
        it('should handle post without poll', async () => {
            const mockStatusData = {
                id: 'mastodon_123',
                favourites_count: 10,
                replies_count: 3,
                reblogs_count: 2
            };
            mockedAxios.get.mockResolvedValue({
                data: mockStatusData
            });
            const result = await mastodonProvider.getPostPerformance('mastodon_123', validTokens);
            expect(result).toEqual({
                postId: 'mastodon_123',
                networkType: 'mastodon',
                timestamp: expect.any(Date),
                likes: 10,
                comments: 3,
                reposts: 2
            });
        });
        it('should handle invalid tokens', async () => {
            const invalidTokens = {
                instanceUrl: 'https://mastodon.social'
            };
            const result = await mastodonProvider.getPostPerformance('mastodon_123', invalidTokens);
            expect(result).toBeNull();
            expect(mockedAxios.get).not.toHaveBeenCalled();
        });
        it('should handle API error', async () => {
            const axiosError = {
                response: {
                    data: { error: 'Status not found' },
                    status: 404
                }
            };
            mockedAxios.get.mockRejectedValue(axiosError);
            mockedAxios.isAxiosError.mockReturnValue(true);
            const result = await mastodonProvider.getPostPerformance('invalid_id', validTokens);
            expect(result).toBeNull();
        });
        it('should handle network error', async () => {
            mockedAxios.get.mockRejectedValue(new Error('Network timeout'));
            const result = await mastodonProvider.getPostPerformance('mastodon_123', validTokens);
            expect(result).toBeNull();
        });
        it('should handle missing status data', async () => {
            mockedAxios.get.mockResolvedValue({ data: null });
            const result = await mastodonProvider.getPostPerformance('mastodon_123', validTokens);
            expect(result).toBeNull();
        });
    });
    describe('Edge Cases and Error Handling', () => {
        const validTokens = {
            instanceUrl: 'https://mastodon.social',
            accessToken: 'test_access_token'
        };
        it('should handle very long content', async () => {
            const longContent = 'a'.repeat(1000);
            const mockResponse = createMockResponse({
                id: 'mastodon_long_123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost(longContent, [], validTokens);
            expect(result).toBe('mastodon_long_123');
        });
        it('should handle special characters and emojis', async () => {
            const specialContent = 'Test with émojis 🚀🎉 and special chars: @#$%^&*()';
            const mockResponse = createMockResponse({
                id: 'mastodon_special_123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost(specialContent, [], validTokens);
            expect(result).toBe('mastodon_special_123');
        });
        it('should handle fetch rejection', async () => {
            mockFetch.mockRejectedValue(new Error('Connection refused'));
            const result = await mastodonProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle malformed API response', async () => {
            const mockResponse = createMockResponse({
                // Missing id field
                url: 'https://mastodon.social/@user/123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeUndefined();
        });
        it('should handle different instance URLs', async () => {
            const customInstanceTokens = {
                instanceUrl: 'https://fosstodon.org',
                accessToken: 'test_access_token'
            };
            const mockResponse = createMockResponse({
                id: 'fosstodon_post_123'
            });
            mockFetch.mockResolvedValue(mockResponse);
            const result = await mastodonProvider.sendPost('Test on custom instance', [], customInstanceTokens);
            expect(result).toBe('fosstodon_post_123');
            expect(mockFetch).toHaveBeenCalledWith('https://fosstodon.org/api/v1/statuses', expect.any(Object));
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock axios
globals_1.jest.mock('axios');
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
const ThreadsProvider_1 = require("../src/social/ThreadsProvider");
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../src/utils/logger");
const mockedAxios = axios_1.default;
const mockedLogger = logger_1.logger;
describe('ThreadsProvider', () => {
    let threadsProvider;
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        threadsProvider = new ThreadsProvider_1.ThreadsProvider();
        // Mock console methods
        globals_1.jest.spyOn(console, 'log').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'error').mockImplementation(() => { });
        globals_1.jest.spyOn(console, 'warn').mockImplementation(() => { });
    });
    afterEach(() => {
        globals_1.jest.restoreAllMocks();
    });
    describe('Provider Configuration', () => {
        it('should have correct network type', () => {
            expect(threadsProvider.networkType).toBe('threads');
        });
        it('should return required tokens', () => {
            const requiredTokens = threadsProvider.getRequiredTokens();
            expect(requiredTokens).toEqual(['longLivedAccessToken', 'threadsUserId']);
        });
        it('should return monitoring interval', () => {
            const interval = threadsProvider.getMonitoringInterval();
            expect(interval).toBe(1);
        });
    });
    describe('Token Validation', () => {
        it('should validate correct tokens', () => {
            const validTokens = {
                longLivedAccessToken: 'valid_access_token',
                threadsUserId: 'user_123'
            };
            const isValid = threadsProvider.validateTokens(validTokens);
            expect(isValid).toBe(true);
        });
        it('should reject missing longLivedAccessToken', () => {
            const invalidTokens = {
                threadsUserId: 'user_123'
            };
            const isValid = threadsProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject missing threadsUserId', () => {
            const invalidTokens = {
                longLivedAccessToken: 'valid_access_token'
            };
            const isValid = threadsProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject empty tokens', () => {
            const emptyTokens = {};
            const isValid = threadsProvider.validateTokens(emptyTokens);
            expect(isValid).toBe(false);
        });
        it('should reject null/undefined tokens', () => {
            expect(threadsProvider.validateTokens(null)).toBe(false);
            expect(threadsProvider.validateTokens(undefined)).toBe(false);
        });
    });
    describe('sendPost Method', () => {
        const validTokens = {
            longLivedAccessToken: 'test_access_token',
            threadsUserId: 'test_user_id'
        };
        it('should send text-only post successfully', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_post_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse) // Container creation
                .mockResolvedValueOnce(mockPublishResponse); // Publishing
            const result = await threadsProvider.sendPost('Test post content', [], validTokens);
            expect(result).toBe('threads_post_123');
            // Verify container creation call
            expect(mockedAxios.post).toHaveBeenNthCalledWith(1, 'https://graph.threads.net/v1.0/test_user_id/threads', {
                media_type: 'TEXT',
                text: 'Test post content',
                access_token: 'test_access_token'
            });
            // Verify publish call
            expect(mockedAxios.post).toHaveBeenNthCalledWith(2, 'https://graph.threads.net/v1.0/test_user_id/threads_publish', {
                creation_id: 'container_123',
                access_token: 'test_access_token'
            });
        });
        it('should ignore attachments and warn user', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_post_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost('Test with attachments', ['/path/to/image.jpg', '/path/to/video.mp4'], validTokens);
            expect(result).toBe('threads_post_123');
            expect(mockedLogger.warn).toHaveBeenCalledWith('[ThreadsProvider] Ignoring 2 attachments - only text posts supported');
            // Should still only send text
            expect(mockedAxios.post).toHaveBeenNthCalledWith(1, 'https://graph.threads.net/v1.0/test_user_id/threads', {
                media_type: 'TEXT',
                text: 'Test with attachments',
                access_token: 'test_access_token'
            });
        });
        it('should handle invalid tokens gracefully', async () => {
            const invalidTokens = {
                longLivedAccessToken: 'valid_token'
                // Missing threadsUserId
            };
            const result = await threadsProvider.sendPost('Test content', [], invalidTokens);
            expect(result).toBeNull();
            expect(mockedAxios.post).not.toHaveBeenCalled();
        });
        it('should handle container creation error', async () => {
            const mockErrorResponse = {
                response: {
                    data: {
                        error: {
                            message: 'Invalid access token',
                            type: 'OAuthException',
                            code: 190
                        }
                    }
                }
            };
            mockedAxios.post.mockRejectedValue(mockErrorResponse);
            mockedAxios.isAxiosError.mockReturnValue(true);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle publish step error', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishError = {
                response: {
                    data: {
                        error: {
                            message: 'Publishing failed',
                            type: 'GraphMethodException',
                            code: 100
                        }
                    }
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse) // Container succeeds
                .mockRejectedValueOnce(mockPublishError); // Publish fails
            mockedAxios.isAxiosError.mockReturnValue(true);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
            expect(mockedAxios.post).toHaveBeenCalledTimes(2);
        });
        it('should handle network error', async () => {
            mockedAxios.post.mockRejectedValue(new Error('Network error'));
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle empty content', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_empty_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost('', [], validTokens);
            expect(result).toBe('threads_empty_123');
        });
        it('should handle null content', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_null_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost(null, [], validTokens);
            expect(result).toBe('threads_null_123');
        });
    });
    describe('getPostPerformance Method', () => {
        const validTokens = {
            longLivedAccessToken: 'test_access_token',
            threadsUserId: 'test_user_id'
        };
        it('should return empty metrics (monitoring disabled)', async () => {
            const result = await threadsProvider.getPostPerformance('threads_post_123', validTokens);
            expect(result).toEqual({
                postId: 'threads_post_123',
                networkType: 'threads',
                timestamp: expect.any(Date),
                likes: 0,
                comments: 0,
                customMetrics: {}
            });
            // Should not make any API calls since monitoring is disabled
            expect(mockedAxios.get).not.toHaveBeenCalled();
        });
        it('should handle invalid tokens', async () => {
            const invalidTokens = {
                longLivedAccessToken: 'invalid'
            };
            const result = await threadsProvider.getPostPerformance('threads_post_123', invalidTokens);
            expect(result).toBeNull();
        });
        it('should handle empty post ID', async () => {
            const result = await threadsProvider.getPostPerformance('', validTokens);
            expect(result).toEqual({
                postId: '',
                networkType: 'threads',
                timestamp: expect.any(Date),
                likes: 0,
                comments: 0,
                customMetrics: {}
            });
        });
        it('should handle null post ID', async () => {
            const result = await threadsProvider.getPostPerformance(null, validTokens);
            expect(result).toEqual({
                postId: null,
                networkType: 'threads',
                timestamp: expect.any(Date),
                likes: 0,
                comments: 0,
                customMetrics: {}
            });
        });
    });
    describe('Edge Cases and Error Handling', () => {
        const validTokens = {
            longLivedAccessToken: 'test_access_token',
            threadsUserId: 'test_user_id'
        };
        it('should handle very long content', async () => {
            const longContent = 'a'.repeat(5000); // Very long content
            const mockContainerResponse = {
                data: {
                    id: 'container_long_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_long_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost(longContent, [], validTokens);
            expect(result).toBe('threads_long_123');
        });
        it('should handle special characters and emojis', async () => {
            const specialContent = 'Test with émojis 🚀🎉 and special chars: @#$%^&*()';
            const mockContainerResponse = {
                data: {
                    id: 'container_special_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_special_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost(specialContent, [], validTokens);
            expect(result).toBe('threads_special_123');
            expect(mockedAxios.post).toHaveBeenNthCalledWith(1, expect.any(String), expect.objectContaining({
                text: specialContent
            }));
        });
        it('should handle malformed publish response', async () => {
            const mockContainerResponse = {
                data: {
                    id: 'container_123'
                }
            };
            const mockPublishResponse = {
                data: {} // Missing id field
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            // Když odpověď publish je prázdná, metoda vrací undefined
            expect(result).toBeUndefined();
        });
        it('should handle timeout error', async () => {
            const timeoutError = new Error('timeout of 5000ms exceeded');
            timeoutError.name = 'ECONNABORTED';
            mockedAxios.post.mockRejectedValue(timeoutError);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle rate limiting response', async () => {
            const rateLimitError = {
                response: {
                    status: 429,
                    data: {
                        error: {
                            message: 'Too many requests',
                            type: 'OAuthException',
                            code: 4
                        }
                    }
                }
            };
            mockedAxios.post.mockRejectedValue(rateLimitError);
            mockedAxios.isAxiosError.mockReturnValue(true);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle Graph API specific errors', async () => {
            const graphApiError = {
                response: {
                    data: {
                        error: {
                            message: 'Unsupported post request',
                            type: 'GraphMethodException',
                            code: 100,
                            error_subcode: 33
                        }
                    }
                }
            };
            mockedAxios.post.mockRejectedValue(graphApiError);
            mockedAxios.isAxiosError.mockReturnValue(true);
            const result = await threadsProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle different user IDs correctly', async () => {
            const customTokens = {
                longLivedAccessToken: 'test_access_token',
                threadsUserId: 'different_user_456'
            };
            const mockContainerResponse = {
                data: {
                    id: 'container_custom_123'
                }
            };
            const mockPublishResponse = {
                data: {
                    id: 'threads_custom_123'
                }
            };
            mockedAxios.post
                .mockResolvedValueOnce(mockContainerResponse)
                .mockResolvedValueOnce(mockPublishResponse);
            const result = await threadsProvider.sendPost('Test with different user', [], customTokens);
            expect(result).toBe('threads_custom_123');
            // Verifikace, že je použit správný user ID v URL
            expect(mockedAxios.post).toHaveBeenNthCalledWith(1, 'https://graph.threads.net/v1.0/different_user_456/threads', expect.any(Object));
            expect(mockedAxios.post).toHaveBeenNthCalledWith(2, 'https://graph.threads.net/v1.0/different_user_456/threads_publish', expect.any(Object));
        });
    });
});

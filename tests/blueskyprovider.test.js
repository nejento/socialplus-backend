"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Vytvoří správně typované mock funkce
const mockLogin = globals_1.jest.fn();
const mockPost = globals_1.jest.fn();
const mockUploadBlob = globals_1.jest.fn();
// Použije doMock pro zajištění správné náhrady modulu
globals_1.jest.doMock('@atproto/api', () => ({
    AtpAgent: function MockAtpAgent(config) {
        return {
            login: mockLogin,
            post: mockPost,
            uploadBlob: mockUploadBlob,
        };
    },
    BlobRef: {
        of: globals_1.jest.fn((blob) => ({ ref: blob })),
    },
}));
globals_1.jest.mock('sharp', () => {
    const mockSharpInstance = {
        resize: globals_1.jest.fn().mockReturnThis(),
        jpeg: globals_1.jest.fn().mockReturnThis(),
        png: globals_1.jest.fn().mockReturnThis(),
        webp: globals_1.jest.fn().mockReturnThis(),
        toBuffer: globals_1.jest.fn(),
        metadata: globals_1.jest.fn(),
    };
    // Zajistí, že metody mock instance vrátí instanci pro řetězení
    mockSharpInstance.resize.mockReturnValue(mockSharpInstance);
    mockSharpInstance.jpeg.mockReturnValue(mockSharpInstance);
    mockSharpInstance.png.mockReturnValue(mockSharpInstance);
    mockSharpInstance.webp.mockReturnValue(mockSharpInstance);
    const mockSharp = globals_1.jest.fn().mockImplementation(() => mockSharpInstance);
    // Přidá mockSharpInstance jako vlastnost, aby k ní testy měly přístup
    mockSharp.mockInstance = mockSharpInstance;
    return mockSharp;
});
globals_1.jest.mock('fs', () => {
    return {
        readFileSync: globals_1.jest.fn(),
        existsSync: globals_1.jest.fn(),
    };
});
globals_1.jest.mock('path', () => {
    return {
        extname: globals_1.jest.fn(),
        basename: globals_1.jest.fn(),
    };
});
// Import BlueskyProvider AFTER mocks are set up
const BlueskyProvider_1 = require("../src/social/BlueskyProvider");
describe('BlueskyProvider', () => {
    let blueskyProvider;
    beforeEach(() => {
        // Clear all mocks but maintain the implementation
        globals_1.jest.clearAllMocks();
        // Create new instance
        blueskyProvider = new BlueskyProvider_1.BlueskyProvider();
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
            expect(blueskyProvider.networkType).toBe('bluesky');
        });
        it('should return required tokens', () => {
            const requiredTokens = blueskyProvider.getRequiredTokens();
            expect(requiredTokens).toEqual(['handle', 'password']);
        });
        it('should return monitoring interval', () => {
            const interval = blueskyProvider.getMonitoringInterval();
            expect(interval).toBe(1);
        });
    });
    describe('Token Validation', () => {
        it('should validate correct tokens', () => {
            const validTokens = {
                handle: 'user.bsky.social',
                password: 'valid_password'
            };
            const isValid = blueskyProvider.validateTokens(validTokens);
            expect(isValid).toBe(true);
        });
        it('should reject missing handle', () => {
            const invalidTokens = {
                password: 'valid_password'
            };
            const isValid = blueskyProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject missing password', () => {
            const invalidTokens = {
                handle: 'user.bsky.social'
            };
            const isValid = blueskyProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
        it('should reject empty tokens', () => {
            const emptyTokens = {};
            const isValid = blueskyProvider.validateTokens(emptyTokens);
            expect(isValid).toBe(false);
        });
        it('should reject null/undefined tokens', () => {
            expect(blueskyProvider.validateTokens(null)).toBe(false);
            expect(blueskyProvider.validateTokens(undefined)).toBe(false);
        });
        it('should reject empty string values', () => {
            const invalidTokens = {
                handle: '',
                password: 'valid_password'
            };
            const isValid = blueskyProvider.validateTokens(invalidTokens);
            expect(isValid).toBe(false);
        });
    });
    describe('sendPost Method', () => {
        const validTokens = {
            handle: 'user.bsky.social',
            password: 'test_password'
        };
        beforeEach(() => {
            mockLogin.mockResolvedValue({ success: true });
            mockPost.mockResolvedValue({
                uri: 'at://did:plc:123/app.bsky.feed.post/abc123',
                cid: 'bafyrei123'
            });
        });
        it('should send text-only post successfully', async () => {
            // Test token validation first
            const isValid = blueskyProvider.validateTokens(validTokens);
            console.log('Token validation result:', isValid);
            try {
                const result = await blueskyProvider.sendPost('Test post content', [], validTokens);
                expect(mockLogin).toHaveBeenCalledWith({
                    identifier: 'user.bsky.social',
                    password: 'test_password'
                });
                expect(mockPost).toHaveBeenCalledWith({
                    text: 'Test post content',
                    createdAt: expect.any(String)
                });
                expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
            }
            catch (error) {
                console.error('Test error:', error);
                throw error;
            }
        });
        it('should handle login failure', async () => {
            mockLogin.mockResolvedValue({ success: false });
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
            expect(mockPost).not.toHaveBeenCalled();
        });
        it('should handle invalid tokens', async () => {
            const invalidTokens = {
                handle: 'invalid'
            };
            const result = await blueskyProvider.sendPost('Test content', [], invalidTokens);
            expect(result).toBeNull();
            expect(mockLogin).not.toHaveBeenCalled();
        });
        it('should handle empty content', async () => {
            const result = await blueskyProvider.sendPost('', [], validTokens);
            expect(result).toBeNull();
            expect(mockLogin).not.toHaveBeenCalled();
        });
        it('should handle post with image attachment', async () => {
            const fs = require('fs');
            const path = require('path');
            const sharp = require('sharp');
            fs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            path.extname.mockReturnValue('.jpg');
            path.basename.mockReturnValue('image.jpg');
            // Configure the Sharp mock to return processed image data
            sharp.mockInstance.toBuffer.mockResolvedValue(Buffer.from('processed image'));
            mockUploadBlob.mockResolvedValue({
                success: true,
                data: {
                    blob: {
                        $type: 'blob',
                        ref: { $link: 'bafyrei456' },
                        mimeType: 'image/jpeg',
                        size: 12345
                    }
                }
            });
            const result = await blueskyProvider.sendPost('Post with image', ['/path/to/image.jpg'], validTokens);
            expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/image.jpg');
            expect(mockUploadBlob).toHaveBeenCalled();
            expect(mockPost).toHaveBeenCalledWith({
                text: 'Post with image',
                embed: {
                    $type: 'app.bsky.embed.images',
                    images: [{
                            image: {
                                $type: 'blob',
                                ref: { $link: 'bafyrei456' },
                                mimeType: 'image/jpeg',
                                size: 12345
                            },
                            alt: ''
                        }]
                },
                createdAt: expect.any(String)
            });
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
        });
        it('should handle missing image file', async () => {
            const fs = require('fs');
            // Mock fs.readFileSync to throw an error for missing file
            fs.readFileSync.mockImplementation(() => {
                throw new Error('ENOENT: no such file or directory');
            });
            const result = await blueskyProvider.sendPost('Post with missing image', ['/path/to/missing.jpg'], validTokens);
            // Should still succeed but without image attachment
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
            expect(mockUploadBlob).not.toHaveBeenCalled();
            expect(mockPost).toHaveBeenCalledWith({
                text: 'Post with missing image',
                createdAt: expect.any(String)
            });
        });
        it('should handle image upload failure', async () => {
            const fs = require('fs');
            const path = require('path');
            fs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            path.extname.mockReturnValue('.jpg');
            path.basename.mockReturnValue('image.jpg');
            mockUploadBlob.mockResolvedValue({
                success: false
            });
            const result = await blueskyProvider.sendPost('Post with image', ['/path/to/image.jpg'], validTokens);
            // Should still succeed but without image attachment
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
            expect(mockPost).toHaveBeenCalledWith({
                text: 'Post with image',
                createdAt: expect.any(String)
            });
        });
        it('should handle image processing failure', async () => {
            const fs = require('fs');
            const path = require('path');
            const sharp = require('sharp');
            fs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            path.extname.mockReturnValue('.jpg');
            path.basename.mockReturnValue('image.jpg');
            // Configure the Sharp mock to reject with processing error
            sharp.mockInstance.toBuffer.mockRejectedValue(new Error('Processing failed'));
            const result = await blueskyProvider.sendPost('Post with image', ['/path/to/image.jpg'], validTokens);
            // Should still succeed but without image attachment
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
            expect(mockPost).toHaveBeenCalledWith({
                text: 'Post with image',
                createdAt: expect.any(String)
            });
        });
        it('should handle unsupported image format', async () => {
            const fs = require('fs');
            const path = require('path');
            fs.readFileSync.mockReturnValue(Buffer.from('fake image data'));
            path.extname.mockReturnValue('.bmp');
            path.basename.mockReturnValue('image.bmp');
            mockUploadBlob.mockResolvedValue({
                success: true,
                data: {
                    blob: {
                        $type: 'blob',
                        ref: { $link: 'bafyrei456' },
                        mimeType: 'image/jpeg',
                        size: 12345
                    }
                }
            });
            const result = await blueskyProvider.sendPost('Post with unsupported image', ['/path/to/image.bmp'], validTokens);
            // Should convert unsupported format to JPEG and succeed
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
            expect(mockUploadBlob).toHaveBeenCalled();
        });
        it('should handle post API error', async () => {
            mockPost.mockRejectedValue(new Error('Post API error'));
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle login API error', async () => {
            mockLogin.mockRejectedValue(new Error('Login failed'));
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
    });
    describe('getPostPerformance Method', () => {
        const validTokens = {
            handle: 'user.bsky.social',
            password: 'test_password'
        };
        it('should return null (monitoring not fully implemented)', async () => {
            const result = await blueskyProvider.getPostPerformance('at://did:plc:123/app.bsky.feed.post/abc123', validTokens);
            expect(result).toBeNull();
        });
        it('should handle invalid tokens', async () => {
            const invalidTokens = {
                handle: 'invalid'
            };
            const result = await blueskyProvider.getPostPerformance('at://did:plc:123/app.bsky.feed.post/abc123', invalidTokens);
            expect(result).toBeNull();
        });
        it('should handle empty post ID', async () => {
            const result = await blueskyProvider.getPostPerformance('', validTokens);
            expect(result).toBeNull();
        });
    });
    describe('Edge Cases and Error Handling', () => {
        const validTokens = {
            handle: 'user.bsky.social',
            password: 'test_password'
        };
        beforeEach(() => {
            mockLogin.mockResolvedValue({ success: true });
            mockPost.mockResolvedValue({
                uri: 'at://did:plc:123/app.bsky.feed.post/abc123',
                cid: 'bafyrei123'
            });
        });
        it('should handle very long content (over 300 chars)', async () => {
            const longContent = 'a'.repeat(500);
            const result = await blueskyProvider.sendPost(longContent, [], validTokens);
            expect(mockPost).toHaveBeenCalledWith({
                text: longContent,
                createdAt: expect.any(String)
            });
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
        });
        it('should handle special characters and emojis', async () => {
            const specialContent = 'Test with émojis 🦋💙 and special chars: @#$%^&*()';
            const result = await blueskyProvider.sendPost(specialContent, [], validTokens);
            expect(mockPost).toHaveBeenCalledWith({
                text: specialContent,
                createdAt: expect.any(String)
            });
            expect(result).toBe('at://did:plc:123/app.bsky.feed.post/abc123');
        });
        it('should handle malformed post response', async () => {
            mockPost.mockResolvedValue({
                cid: 'bafyrei123'
                // Missing uri field
            });
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeUndefined();
        });
        it('should handle network timeout', async () => {
            const timeoutError = new Error('Network timeout');
            timeoutError.name = 'ECONNABORTED';
            mockLogin.mockRejectedValue(timeoutError);
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
        it('should handle rate limiting', async () => {
            const rateLimitError = new Error('Rate limit exceeded');
            mockPost.mockRejectedValue(rateLimitError);
            const result = await blueskyProvider.sendPost('Test content', [], validTokens);
            expect(result).toBeNull();
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const SocialNetworkProviderFactory_1 = require("../src/social/SocialNetworkProviderFactory");
// Mock provider modules - za pomocí správně typovaných mock funkcí
globals_1.jest.mock('../src/social/FacebookProvider', () => ({
    FacebookProvider: globals_1.jest.fn().mockImplementation(() => ({
        networkType: 'facebook',
        sendPost: globals_1.jest.fn(),
        validateTokens: globals_1.jest.fn().mockReturnValue(true),
        getRequiredTokens: function () { return ['pageAccessToken', 'pageId']; },
        getPostPerformance: globals_1.jest.fn(),
        getMonitoringInterval: function () { return 1; },
    })),
}));
globals_1.jest.mock('../src/social/TwitterProvider', () => ({
    TwitterProvider: globals_1.jest.fn().mockImplementation(() => ({
        networkType: 'twitter',
        sendPost: globals_1.jest.fn(),
        validateTokens: globals_1.jest.fn().mockReturnValue(true),
        getRequiredTokens: function () { return ['accessToken', 'accessTokenSecret', 'consumerKey', 'consumerSecret']; },
        getPostPerformance: globals_1.jest.fn(),
        getMonitoringInterval: function () { return 12; },
    })),
}));
globals_1.jest.mock('../src/social/MastodonProvider', () => ({
    MastodonProvider: globals_1.jest.fn().mockImplementation(() => ({
        networkType: 'mastodon',
        sendPost: globals_1.jest.fn(),
        validateTokens: globals_1.jest.fn().mockReturnValue(true),
        getRequiredTokens: function () { return ['accessToken', 'instanceUrl']; },
        getPostPerformance: globals_1.jest.fn(),
        getMonitoringInterval: function () { return 1; },
    })),
}));
globals_1.jest.mock('../src/social/BlueskyProvider', () => ({
    BlueskyProvider: globals_1.jest.fn().mockImplementation(() => ({
        networkType: 'bluesky',
        sendPost: globals_1.jest.fn(),
        validateTokens: globals_1.jest.fn().mockReturnValue(true),
        getRequiredTokens: function () { return ['handle', 'password']; },
        getPostPerformance: globals_1.jest.fn(),
        getMonitoringInterval: function () { return 1; },
    })),
}));
globals_1.jest.mock('../src/social/ThreadsProvider', () => ({
    ThreadsProvider: globals_1.jest.fn().mockImplementation(() => ({
        networkType: 'threads',
        sendPost: globals_1.jest.fn(),
        validateTokens: globals_1.jest.fn().mockReturnValue(true),
        getRequiredTokens: function () { return ['accessToken']; },
        getPostPerformance: globals_1.jest.fn(),
        getMonitoringInterval: function () { return 1; },
    })),
}));
describe('SocialNetworkProviderFactory', () => {
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
    });
    describe('Provider Registration and Retrieval', () => {
        it('should register all providers during static initialization', () => {
            const supportedNetworks = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getSupportedNetworks();
            expect(supportedNetworks).toContain('facebook');
            expect(supportedNetworks).toContain('twitter');
            expect(supportedNetworks).toContain('mastodon');
            expect(supportedNetworks).toContain('bluesky');
            expect(supportedNetworks).toContain('threads');
            expect(supportedNetworks).toHaveLength(5);
        });
        it('should get provider by network type (case insensitive)', () => {
            const facebookProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('facebook');
            const facebookProviderUpper = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('FACEBOOK');
            const facebookProviderMixed = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('FaceBook');
            expect(facebookProvider).not.toBeNull();
            expect(facebookProviderUpper).not.toBeNull();
            expect(facebookProviderMixed).not.toBeNull();
            expect(facebookProvider?.networkType).toBe('facebook');
            expect(facebookProviderUpper?.networkType).toBe('facebook');
            expect(facebookProviderMixed?.networkType).toBe('facebook');
        });
        it('should return null for unsupported network type', () => {
            const unsupportedProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('linkedin');
            expect(unsupportedProvider).toBeNull();
        });
        it('should get all providers', () => {
            const allProviders = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getAllProviders();
            expect(allProviders).toHaveLength(5);
            // Kontrola, jestli všechny očekávané network typey jsou k dispozici
            const networkTypes = allProviders.map(provider => provider.networkType);
            expect(networkTypes).toContain('facebook');
            expect(networkTypes).toContain('twitter');
            expect(networkTypes).toContain('mastodon');
            expect(networkTypes).toContain('bluesky');
            expect(networkTypes).toContain('threads');
        });
        it('should get supported networks list', () => {
            const supportedNetworks = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getSupportedNetworks();
            expect(supportedNetworks).toEqual([
                'facebook',
                'twitter',
                'mastodon',
                'bluesky',
                'threads'
            ]);
        });
        it('should check if network is supported', () => {
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('facebook')).toBe(true);
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('TWITTER')).toBe(true);
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('linkedin')).toBe(false);
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('instagram')).toBe(false);
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('tiktok')).toBe(false);
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('')).toBe(false);
        });
    });
    describe('Individual Provider Validation', () => {
        it('should retrieve Facebook provider with correct interface', () => {
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('facebook');
            expect(provider).not.toBeNull();
            expect(provider?.networkType).toBe('facebook');
            expect(provider?.getRequiredTokens()).toEqual(['pageAccessToken', 'pageId']);
            expect(provider?.getMonitoringInterval()).toBe(1);
            expect(typeof provider?.sendPost).toBe('function');
            expect(typeof provider?.validateTokens).toBe('function');
            expect(typeof provider?.getPostPerformance).toBe('function');
        });
        it('should retrieve Twitter provider with correct interface', () => {
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('twitter');
            expect(provider).not.toBeNull();
            expect(provider?.networkType).toBe('twitter');
            expect(provider?.getRequiredTokens()).toEqual([
                'accessToken',
                'accessTokenSecret',
                'consumerKey',
                'consumerSecret'
            ]);
            expect(provider?.getMonitoringInterval()).toBe(12);
        });
        it('should retrieve Mastodon provider with correct interface', () => {
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('mastodon');
            expect(provider).not.toBeNull();
            expect(provider?.networkType).toBe('mastodon');
            expect(provider?.getRequiredTokens()).toEqual(['accessToken', 'instanceUrl']);
            expect(provider?.getMonitoringInterval()).toBe(1);
        });
        it('should retrieve Bluesky provider with correct interface', () => {
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('bluesky');
            expect(provider).not.toBeNull();
            expect(provider?.networkType).toBe('bluesky');
            expect(provider?.getRequiredTokens()).toEqual(['handle', 'password']);
            expect(provider?.getMonitoringInterval()).toBe(1);
        });
        it('should retrieve Threads provider with correct interface', () => {
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('threads');
            expect(provider).not.toBeNull();
            expect(provider?.networkType).toBe('threads');
            expect(provider?.getRequiredTokens()).toEqual(['accessToken']);
            expect(provider?.getMonitoringInterval()).toBe(1);
        });
    });
    describe('Dynamic Provider Registration', () => {
        const mockCustomProvider = {
            networkType: 'custom',
            sendPost: globals_1.jest.fn(),
            validateTokens: globals_1.jest.fn(),
            getRequiredTokens: globals_1.jest.fn(() => ['customToken']),
            getPostPerformance: globals_1.jest.fn(),
            getMonitoringInterval: globals_1.jest.fn(() => 2),
        };
        it('should register new provider dynamically', () => {
            SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(mockCustomProvider);
            const retrievedProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('custom');
            expect(retrievedProvider).toBe(mockCustomProvider);
            const supportedNetworks = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getSupportedNetworks();
            expect(supportedNetworks).toContain('custom');
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('custom')).toBe(true);
        });
        it('should overwrite existing provider when registering with same network type', () => {
            const newFacebookProvider = {
                networkType: 'facebook',
                sendPost: globals_1.jest.fn(),
                validateTokens: globals_1.jest.fn(),
                getRequiredTokens: globals_1.jest.fn(() => ['newToken']),
                getPostPerformance: globals_1.jest.fn(),
                getMonitoringInterval: globals_1.jest.fn(() => 5),
            };
            SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(newFacebookProvider);
            const retrievedProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('facebook');
            expect(retrievedProvider).toBe(newFacebookProvider);
            expect(retrievedProvider?.getRequiredTokens()).toEqual(['newToken']);
            expect(retrievedProvider?.getMonitoringInterval()).toBe(5);
        });
        it('should handle provider registration with empty network type', () => {
            const emptyProvider = {
                networkType: '',
                sendPost: globals_1.jest.fn(),
                validateTokens: globals_1.jest.fn(),
                getRequiredTokens: globals_1.jest.fn(() => []),
                getPostPerformance: globals_1.jest.fn(),
                getMonitoringInterval: globals_1.jest.fn(() => 1),
            };
            SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(emptyProvider);
            // Prázdný network type by měl být zamítnutý validací
            const retrievedProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('');
            expect(retrievedProvider).toBeNull();
            expect(SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.isSupported('')).toBe(false);
        });
    });
    describe('Error Handling', () => {
        it('should handle null provider registration gracefully', () => {
            // TypeScript by tomu měl předejít, ale testujeme chování při runtimu
            expect(() => {
                SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(null);
            }).not.toThrow();
        });
        it('should handle undefined provider registration gracefully', () => {
            // TypeScript by tomu měl předejít, ale testujeme chování při runtimu
            expect(() => {
                SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(undefined);
            }).not.toThrow();
        });
        it('should handle special characters in network type', () => {
            const specialProvider = {
                networkType: 'test-network_123!@#',
                sendPost: globals_1.jest.fn(),
                validateTokens: globals_1.jest.fn(),
                getRequiredTokens: globals_1.jest.fn(() => []),
                getPostPerformance: globals_1.jest.fn(),
                getMonitoringInterval: globals_1.jest.fn(() => 1),
            };
            SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.registerProvider(specialProvider);
            const retrievedProvider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider('test-network_123!@#');
            expect(retrievedProvider).toBe(specialProvider);
        });
    });
});

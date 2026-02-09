import { jest } from '@jest/globals';
import type { MockedFunction } from 'jest-mock';
import { SocialNetworkProviderFactory } from '../src/social/SocialNetworkProviderFactory';
import { ISocialNetworkProvider } from '../src/social/ISocialNetworkProvider';

// Mock provider modules - za pomocí správně typovaných mock funkcí
jest.mock('../src/social/FacebookProvider', () => ({
  FacebookProvider: jest.fn().mockImplementation(() => ({
    networkType: 'facebook',
    sendPost: jest.fn() as MockedFunction<any>,
    validateTokens: jest.fn().mockReturnValue(true),
    getRequiredTokens: function() { return ['pageAccessToken', 'pageId']; },
    getPostPerformance: jest.fn() as MockedFunction<any>,
    getMonitoringInterval: function() { return 1; },
  })),
}));

jest.mock('../src/social/TwitterProvider', () => ({
  TwitterProvider: jest.fn().mockImplementation(() => ({
    networkType: 'twitter',
    sendPost: jest.fn() as MockedFunction<any>,
    validateTokens: jest.fn().mockReturnValue(true),
    getRequiredTokens: function() { return ['accessToken', 'accessTokenSecret', 'consumerKey', 'consumerSecret']; },
    getPostPerformance: jest.fn() as MockedFunction<any>,
    getMonitoringInterval: function() { return 12; },
  })),
}));

jest.mock('../src/social/MastodonProvider', () => ({
  MastodonProvider: jest.fn().mockImplementation(() => ({
    networkType: 'mastodon',
    sendPost: jest.fn() as MockedFunction<any>,
    validateTokens: jest.fn().mockReturnValue(true),
    getRequiredTokens: function() { return ['accessToken', 'instanceUrl']; },
    getPostPerformance: jest.fn() as MockedFunction<any>,
    getMonitoringInterval: function() { return 1; },
  })),
}));

jest.mock('../src/social/BlueskyProvider', () => ({
  BlueskyProvider: jest.fn().mockImplementation(() => ({
    networkType: 'bluesky',
    sendPost: jest.fn() as MockedFunction<any>,
    validateTokens: jest.fn().mockReturnValue(true),
    getRequiredTokens: function() { return ['handle', 'password']; },
    getPostPerformance: jest.fn() as MockedFunction<any>,
    getMonitoringInterval: function() { return 1; },
  })),
}));

jest.mock('../src/social/ThreadsProvider', () => ({
  ThreadsProvider: jest.fn().mockImplementation(() => ({
    networkType: 'threads',
    sendPost: jest.fn() as MockedFunction<any>,
    validateTokens: jest.fn().mockReturnValue(true),
    getRequiredTokens: function() { return ['accessToken']; },
    getPostPerformance: jest.fn() as MockedFunction<any>,
    getMonitoringInterval: function() { return 1; },
  })),
}));

describe('SocialNetworkProviderFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Provider Registration and Retrieval', () => {
    it('should register all providers during static initialization', () => {
      const supportedNetworks = SocialNetworkProviderFactory.getSupportedNetworks();

      expect(supportedNetworks).toContain('facebook');
      expect(supportedNetworks).toContain('twitter');
      expect(supportedNetworks).toContain('mastodon');
      expect(supportedNetworks).toContain('bluesky');
      expect(supportedNetworks).toContain('threads');
      expect(supportedNetworks).toHaveLength(5);
    });

    it('should get provider by network type (case insensitive)', () => {
      const facebookProvider = SocialNetworkProviderFactory.getProvider('facebook');
      const facebookProviderUpper = SocialNetworkProviderFactory.getProvider('FACEBOOK');
      const facebookProviderMixed = SocialNetworkProviderFactory.getProvider('FaceBook');

      expect(facebookProvider).not.toBeNull();
      expect(facebookProviderUpper).not.toBeNull();
      expect(facebookProviderMixed).not.toBeNull();
      expect(facebookProvider?.networkType).toBe('facebook');
      expect(facebookProviderUpper?.networkType).toBe('facebook');
      expect(facebookProviderMixed?.networkType).toBe('facebook');
    });

    it('should return null for unsupported network type', () => {
      const unsupportedProvider = SocialNetworkProviderFactory.getProvider('linkedin');
      expect(unsupportedProvider).toBeNull();
    });

    it('should get all providers', () => {
      const allProviders = SocialNetworkProviderFactory.getAllProviders();

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
      const supportedNetworks = SocialNetworkProviderFactory.getSupportedNetworks();

      expect(supportedNetworks).toEqual([
        'facebook',
        'twitter',
        'mastodon',
        'bluesky',
        'threads'
      ]);
    });

    it('should check if network is supported', () => {
      expect(SocialNetworkProviderFactory.isSupported('facebook')).toBe(true);
      expect(SocialNetworkProviderFactory.isSupported('TWITTER')).toBe(true);
      expect(SocialNetworkProviderFactory.isSupported('linkedin')).toBe(false);
      expect(SocialNetworkProviderFactory.isSupported('instagram')).toBe(false);
      expect(SocialNetworkProviderFactory.isSupported('tiktok')).toBe(false);
      expect(SocialNetworkProviderFactory.isSupported('')).toBe(false);
    });
  });

  describe('Individual Provider Validation', () => {
    it('should retrieve Facebook provider with correct interface', () => {
      const provider = SocialNetworkProviderFactory.getProvider('facebook');

      expect(provider).not.toBeNull();
      expect(provider?.networkType).toBe('facebook');
      expect(provider?.getRequiredTokens()).toEqual(['pageAccessToken', 'pageId']);
      expect(provider?.getMonitoringInterval()).toBe(1);
      expect(typeof provider?.sendPost).toBe('function');
      expect(typeof provider?.validateTokens).toBe('function');
      expect(typeof provider?.getPostPerformance).toBe('function');
    });

    it('should retrieve Twitter provider with correct interface', () => {
      const provider = SocialNetworkProviderFactory.getProvider('twitter');

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
      const provider = SocialNetworkProviderFactory.getProvider('mastodon');

      expect(provider).not.toBeNull();
      expect(provider?.networkType).toBe('mastodon');
      expect(provider?.getRequiredTokens()).toEqual(['accessToken', 'instanceUrl']);
      expect(provider?.getMonitoringInterval()).toBe(1);
    });

    it('should retrieve Bluesky provider with correct interface', () => {
      const provider = SocialNetworkProviderFactory.getProvider('bluesky');

      expect(provider).not.toBeNull();
      expect(provider?.networkType).toBe('bluesky');
      expect(provider?.getRequiredTokens()).toEqual(['handle', 'password']);
      expect(provider?.getMonitoringInterval()).toBe(1);
    });

    it('should retrieve Threads provider with correct interface', () => {
      const provider = SocialNetworkProviderFactory.getProvider('threads');

      expect(provider).not.toBeNull();
      expect(provider?.networkType).toBe('threads');
      expect(provider?.getRequiredTokens()).toEqual(['accessToken']);
      expect(provider?.getMonitoringInterval()).toBe(1);
    });
  });

  describe('Dynamic Provider Registration', () => {
    const mockCustomProvider: ISocialNetworkProvider = {
      networkType: 'custom',
      sendPost: jest.fn() as jest.MockedFunction<(content: string, attachments: string[], tokens: Record<string, string>) => Promise<string | null>>,
      validateTokens: jest.fn() as jest.MockedFunction<(tokens: Record<string, string>) => boolean>,
      getRequiredTokens: jest.fn(() => ['customToken']) as jest.MockedFunction<() => string[]>,
      getPostPerformance: jest.fn() as jest.MockedFunction<(postId: string, tokens: Record<string, string>) => Promise<any>>,
      getMonitoringInterval: jest.fn(() => 2) as jest.MockedFunction<() => number>,
    };

    it('should register new provider dynamically', () => {
      SocialNetworkProviderFactory.registerProvider(mockCustomProvider);

      const retrievedProvider = SocialNetworkProviderFactory.getProvider('custom');
      expect(retrievedProvider).toBe(mockCustomProvider);

      const supportedNetworks = SocialNetworkProviderFactory.getSupportedNetworks();
      expect(supportedNetworks).toContain('custom');

      expect(SocialNetworkProviderFactory.isSupported('custom')).toBe(true);
    });

    it('should overwrite existing provider when registering with same network type', () => {
      const newFacebookProvider: ISocialNetworkProvider = {
        networkType: 'facebook',
        sendPost: jest.fn() as jest.MockedFunction<(content: string, attachments: string[], tokens: Record<string, string>) => Promise<string | null>>,
        validateTokens: jest.fn() as jest.MockedFunction<(tokens: Record<string, string>) => boolean>,
        getRequiredTokens: jest.fn(() => ['newToken']) as jest.MockedFunction<() => string[]>,
        getPostPerformance: jest.fn() as jest.MockedFunction<(postId: string, tokens: Record<string, string>) => Promise<any>>,
        getMonitoringInterval: jest.fn(() => 5) as jest.MockedFunction<() => number>,
      };

      SocialNetworkProviderFactory.registerProvider(newFacebookProvider);

      const retrievedProvider = SocialNetworkProviderFactory.getProvider('facebook');
      expect(retrievedProvider).toBe(newFacebookProvider);
      expect(retrievedProvider?.getRequiredTokens()).toEqual(['newToken']);
      expect(retrievedProvider?.getMonitoringInterval()).toBe(5);
    });

    it('should handle provider registration with empty network type', () => {
      const emptyProvider: ISocialNetworkProvider = {
        networkType: '',
        sendPost: jest.fn() as jest.MockedFunction<(content: string, attachments: string[], tokens: Record<string, string>) => Promise<string | null>>,
        validateTokens: jest.fn() as jest.MockedFunction<(tokens: Record<string, string>) => boolean>,
        getRequiredTokens: jest.fn(() => []) as jest.MockedFunction<() => string[]>,
        getPostPerformance: jest.fn() as jest.MockedFunction<(postId: string, tokens: Record<string, string>) => Promise<any>>,
        getMonitoringInterval: jest.fn(() => 1) as jest.MockedFunction<() => number>,
      };

      SocialNetworkProviderFactory.registerProvider(emptyProvider);

      // Prázdný network type by měl být zamítnutý validací
      const retrievedProvider = SocialNetworkProviderFactory.getProvider('');
      expect(retrievedProvider).toBeNull();
      expect(SocialNetworkProviderFactory.isSupported('')).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle null provider registration gracefully', () => {
      // TypeScript by tomu měl předejít, ale testujeme chování při runtimu
      expect(() => {
        SocialNetworkProviderFactory.registerProvider(null as any);
      }).not.toThrow();
    });

    it('should handle undefined provider registration gracefully', () => {
      // TypeScript by tomu měl předejít, ale testujeme chování při runtimu
      expect(() => {
        SocialNetworkProviderFactory.registerProvider(undefined as any);
      }).not.toThrow();
    });

    it('should handle special characters in network type', () => {
      const specialProvider: ISocialNetworkProvider = {
        networkType: 'test-network_123!@#',
        sendPost: jest.fn() as jest.MockedFunction<(content: string, attachments: string[], tokens: Record<string, string>) => Promise<string | null>>,
        validateTokens: jest.fn() as jest.MockedFunction<(tokens: Record<string, string>) => boolean>,
        getRequiredTokens: jest.fn(() => []) as jest.MockedFunction<() => string[]>,
        getPostPerformance: jest.fn() as jest.MockedFunction<(postId: string, tokens: Record<string, string>) => Promise<any>>,
        getMonitoringInterval: jest.fn(() => 1) as jest.MockedFunction<() => number>,
      };

      SocialNetworkProviderFactory.registerProvider(specialProvider);

      const retrievedProvider = SocialNetworkProviderFactory.getProvider('test-network_123!@#');
      expect(retrievedProvider).toBe(specialProvider);
    });
  });
});

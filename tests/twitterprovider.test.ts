import { jest } from '@jest/globals';

// Mock fetch globálně pro volání Twitter API
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

// Mock crypto modulu
const mockCrypto = {
  createHmac: jest.fn(() => ({
    update: jest.fn(() => ({
      digest: jest.fn(() => 'mocked_signature')
    }))
  }))
};

jest.mock('crypto', () => mockCrypto, { virtual: true });

// Mock oauth-1.0a - vytvoří mock instanci zvenčí
const mockOAuthInstance = {
  authorize: jest.fn(),
  toHeader: jest.fn()
};

// Mock OAuth konstruktoru, aby vždy vrátil naši mock instanci
jest.mock('oauth-1.0a', () => {
  return function() {
    return mockOAuthInstance;
  };
});

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

import { TwitterProvider } from '../src/social/TwitterProvider';
import { logger } from '../src/utils/logger';

const mockedLogger = logger as jest.Mocked<typeof logger>;

// Helper funkce pro vytvoření správně typovaných mock odpovědí
const createMockResponse = (data: any, ok: boolean = true, status: number = ok ? 201 : 400, statusText: string = ok ? 'Created' : 'Bad Request') => {
  const mockJson = jest.fn() as any;
  mockJson.mockResolvedValue(data);
  return {
    ok,
    status,
    statusText,
    json: mockJson
  } as any;
};

describe('TwitterProvider', () => {
  let twitterProvider: TwitterProvider;

  beforeEach(() => {
    jest.clearAllMocks();
    twitterProvider = new TwitterProvider();

    // Mock console methods
    // jest.spyOn(console, 'log').mockImplementation(() => {});
    // jest.spyOn(console, 'error').mockImplementation(() => {});
    // jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Reset fetch mock
    mockFetch.mockReset();

    // Reset OAuth mocks
    mockOAuthInstance.authorize.mockReturnValue({
      oauth_consumer_key: 'test_key',
      oauth_token: 'test_token',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: '1234567890',
      oauth_nonce: 'test_nonce',
      oauth_version: '1.0',
      oauth_signature: 'test_signature'
    });

    mockOAuthInstance.toHeader.mockReturnValue({
      Authorization: 'OAuth oauth_consumer_key="test_key", oauth_token="test_token", oauth_signature="test_signature"'
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Provider Configuration', () => {
    it('should have correct network type', () => {
      expect(twitterProvider.networkType).toBe('twitter');
    });

    it('should return required tokens', () => {
      const requiredTokens = twitterProvider.getRequiredTokens();
      expect(requiredTokens).toEqual([
        'api_key',
        'api_secret',
        'access_token',
        'access_token_secret'
      ]);
    });

    it('should return monitoring interval', () => {
      const interval = twitterProvider.getMonitoringInterval();
      expect(interval).toBe(12); // 12 hodin kvůli přísným limitům API
    });
  });

  describe('Token Validation', () => {
    it('should validate correct tokens', () => {
      const validTokens = {
        api_key: 'valid_api_key',
        api_secret: 'valid_api_secret',
        access_token: 'valid_access_token',
        access_token_secret: 'valid_access_token_secret',
        client_id: 'valid_client_id',
        client_secret: 'valid_client_secret',
        bearer_token: 'valid_bearer_token'
      };

      const isValid = twitterProvider.validateTokens(validTokens);
      expect(isValid).toBe(true);
    });

    it('should reject missing api_key', () => {
      const invalidTokens = {
        api_secret: 'valid_api_secret',
        access_token: 'valid_access_token',
        access_token_secret: 'valid_access_token_secret',
        client_id: 'valid_client_id',
        client_secret: 'valid_client_secret',
        bearer_token: 'valid_bearer_token'
      };

      const isValid = twitterProvider.validateTokens(invalidTokens);
      expect(isValid).toBe(false);
    });

    it('should reject missing access_token', () => {
      const invalidTokens = {
        api_key: 'valid_api_key',
        api_secret: 'valid_api_secret',
        access_token_secret: 'valid_access_token_secret',
        client_id: 'valid_client_id',
        client_secret: 'valid_client_secret',
        bearer_token: 'valid_bearer_token'
      };

      const isValid = twitterProvider.validateTokens(invalidTokens);
      expect(isValid).toBe(false);
    });

    it('should reject empty tokens', () => {
      const emptyTokens = {};

      const isValid = twitterProvider.validateTokens(emptyTokens);
      expect(isValid).toBe(false);
    });

    it('should reject tokens with empty strings', () => {
      const emptyStringTokens = {
        api_key: '',
        api_secret: 'valid_api_secret',
        access_token: 'valid_access_token',
        access_token_secret: 'valid_access_token_secret',
        client_id: 'valid_client_id',
        client_secret: 'valid_client_secret',
        bearer_token: 'valid_bearer_token'
      };

      const isValid = twitterProvider.validateTokens(emptyStringTokens);
      expect(isValid).toBe(false);
    });

    it('should reject null/undefined tokens', () => {
      expect(twitterProvider.validateTokens(null as any)).toBe(false);
      expect(twitterProvider.validateTokens(undefined as any)).toBe(false);
    });
  });

  describe('sendPost Method', () => {
    const validTokens = {
      api_key: 'test_api_key',
      api_secret: 'test_api_secret',
      access_token: 'test_access_token',
      access_token_secret: 'test_access_token_secret',
      client_id: 'test_client_id',
      client_secret: 'test_client_secret',
      bearer_token: 'test_bearer_token'
    };

    it('should send text-only post successfully', async () => {
      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_post_123',
          text: 'Test post content'
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test post content',
        [],
        validTokens
      );

      expect(result).toBe('twitter_post_123');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.twitter.com/2/tweets',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('OAuth'),
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            text: 'Test post content'
          })
        })
      );
    });

    it('should ignore attachments and warn user', async () => {
      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_post_123',
          text: 'Test with attachments'
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test with attachments',
        ['/path/to/image.jpg', '/path/to/video.mp4'],
        validTokens
      );

      expect(result).toBe('twitter_post_123');
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        '[TwitterProvider] Ignoring 2 attachments - media upload disabled'
      );

      // Mělo by se stále odeslat pouze text
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.twitter.com/2/tweets',
        expect.objectContaining({
          body: JSON.stringify({
            text: 'Test with attachments'
          })
        })
      );
    });

    it('should handle invalid tokens gracefully', async () => {
      const invalidTokens = {
        api_key: 'test_api_key'
        // Chybí další požadované tokeny
      };

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        invalidTokens
      );

      expect(result).toBeNull();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API error response with detail', async () => {
      const mockErrorResponse = createMockResponse({
        detail: 'Invalid or expired token',
        title: 'Unauthorized',
        type: 'about:blank'
      }, false, 401, 'Unauthorized');

      mockFetch.mockResolvedValue(mockErrorResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle API error response with errors array', async () => {
      const mockErrorResponse = createMockResponse({
        errors: [
          {
            message: 'Status is a duplicate',
            code: 187
          }
        ]
      }, false, 400, 'Bad Request');

      mockFetch.mockResolvedValue(mockErrorResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle empty content', async () => {
      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_empty_123',
          text: ''
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        '',
        [],
        validTokens
      );

      expect(result).toBe('twitter_empty_123');
    });

    it('should handle null content', async () => {
      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_null_123',
          text: null
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        null as any,
        [],
        validTokens
      );

      expect(result).toBe('twitter_null_123');
    });

    it('should configure OAuth correctly', async () => {
      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_oauth_123',
          text: 'OAuth test'
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      await twitterProvider.sendPost(
        'OAuth test',
        [],
        validTokens
      );

      // Ověřit, že OAuth třída byla inicializována se správnými přihlašovacími údaji spotřebitele
      // Poznámka: Protože přímo mockujeme konstruktor, nemůžeme snadno ověřit parametry volání
      // ale můžeme ověřit, že byly zavolány metody authorize a toHeader
      expect(mockOAuthInstance.authorize).toHaveBeenCalledWith(
        {
          url: 'https://api.twitter.com/2/tweets',
          method: 'POST'
        },
        {
          key: 'test_access_token',
          secret: 'test_access_token_secret'
        }
      );

      // Ověřit, že byl vygenerován OAuth header
      expect(mockOAuthInstance.toHeader).toHaveBeenCalled();
    });
  });

  describe('getPostPerformance Method', () => {
    const validTokens = {
      api_key: 'test_api_key',
      api_secret: 'test_api_secret',
      access_token: 'test_access_token',
      access_token_secret: 'test_access_token_secret',
      client_id: 'test_client_id',
      client_secret: 'test_client_secret',
      bearer_token: 'test_bearer_token'
    };

    it('should return empty metrics (monitoring disabled)', async () => {
      const result = await twitterProvider.getPostPerformance(
        'twitter_post_123',
        validTokens
      );

      expect(result).toEqual({
        postId: 'twitter_post_123',
        networkType: 'twitter',
        timestamp: expect.any(Date),
        likes: 0,
        comments: 0,
        reposts: 0,
        reactions: {
          likes: 0,
          retweets: 0,
          quotes: 0,
          replies: 0
        },
        customMetrics: {}
      });

      // Neměl by provádět žádné API volání, protože je monitorování je zakázáno
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle invalid tokens', async () => {
      const invalidTokens = {
        api_key: 'invalid'
      };

      const result = await twitterProvider.getPostPerformance(
        'twitter_post_123',
        invalidTokens
      );

      expect(result).toBeNull();
    });

    it('should handle empty post ID', async () => {
      const result = await twitterProvider.getPostPerformance(
        '',
        validTokens
      );

      expect(result).toEqual({
        postId: '',
        networkType: 'twitter',
        timestamp: expect.any(Date),
        likes: 0,
        comments: 0,
        reposts: 0,
        reactions: {
          likes: 0,
          retweets: 0,
          quotes: 0,
          replies: 0
        },
        customMetrics: {}
      });
    });

    it('should handle null post ID', async () => {
      const result = await twitterProvider.getPostPerformance(
        null as any,
        validTokens
      );

      expect(result).toEqual({
        postId: null,
        networkType: 'twitter',
        timestamp: expect.any(Date),
        likes: 0,
        comments: 0,
        reposts: 0,
        reactions: {
          likes: 0,
          retweets: 0,
          quotes: 0,
          replies: 0
        },
        customMetrics: {}
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    const validTokens = {
      api_key: 'test_api_key',
      api_secret: 'test_api_secret',
      access_token: 'test_access_token',
      access_token_secret: 'test_access_token_secret',
      client_id: 'test_client_id',
      client_secret: 'test_client_secret',
      bearer_token: 'test_bearer_token'
    };

    it('should handle very long content (within Twitter limits)', async () => {
      const longContent = 'a'.repeat(280); // Twitter's character limit

      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_long_123',
          text: longContent
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        longContent,
        [],
        validTokens
      );

      expect(result).toBe('twitter_long_123');
    });

    it('should handle special characters and emojis', async () => {
      const specialContent = 'Test with émojis 🚀🎉 and special chars: @#$%^&*()';

      const mockResponse = createMockResponse({
        data: {
          id: 'twitter_special_123',
          text: specialContent
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        specialContent,
        [],
        validTokens
      );

      expect(result).toBe('twitter_special_123');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            text: specialContent
          })
        })
      );
    });

    it('should handle malformed API response', async () => {
      const mockResponse = createMockResponse({
        data: {
          // Chybí pole id
          text: 'Test content'
        }
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeUndefined();
    });

    it('should handle timeout error', async () => {
      const timeoutError = new Error('timeout of 5000ms exceeded');
      timeoutError.name = 'ECONNABORTED';

      mockFetch.mockRejectedValue(timeoutError);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle rate limiting response', async () => {
      const rateLimitError = createMockResponse({
        title: 'Too Many Requests',
        detail: 'Rate limit exceeded',
        type: 'about:blank'
      }, false, 429, 'Too Many Requests');

      mockFetch.mockResolvedValue(rateLimitError);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle fetch rejection', async () => {
      mockFetch.mockRejectedValue(new Error('Connection refused'));

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle JSON parsing error', async () => {
      const mockResponse = createMockResponse(null);
      const mockJsonError = jest.fn() as any;
      mockJsonError.mockRejectedValue(new Error('Invalid JSON'));
      mockResponse.json = mockJsonError;

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle different HTTP error statuses', async () => {
      const mockResponse = createMockResponse({
        title: 'Forbidden',
        detail: 'Write access not allowed'
      }, false, 403, 'Forbidden');

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeNull();
    });

    it('should handle missing response data', async () => {
      const mockResponse = createMockResponse({
        // Chybí pole data úplně
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await twitterProvider.sendPost(
        'Test content',
        [],
        validTokens
      );

      expect(result).toBeUndefined();
    });
  });
});

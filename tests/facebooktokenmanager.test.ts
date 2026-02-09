import { jest } from '@jest/globals';

// Create a properly typed mock fetch function that can handle any response structure
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
(global as any).fetch = mockFetch;

// Mock PrismaClient
const mockPrisma = {
  networkToken: {
    deleteMany: jest.fn() as jest.MockedFunction<any>,
    createMany: jest.fn() as jest.MockedFunction<any>,
  },
};

jest.mock('../src/utils/helpers', () => ({
  prisma: mockPrisma,
}));

import { FacebookTokenManager } from '../src/social/FacebookTokenManager';
import { FacebookTokensType } from '../src/types/schemas';

describe('FacebookTokenManager', () => {
  let facebookTokenManager: FacebookTokenManager;

  beforeEach(() => {
    jest.clearAllMocks();
    facebookTokenManager = new FacebookTokenManager();

    // Mock console
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initializeFacebookTokens', () => {
    const validTokens: FacebookTokensType = {
      appId: 'test_app_id',
      appSecret: 'test_app_secret',
      pageId: 'test_page_id',
      shortLivedUserAccessToken: 'test_short_token',
    };

    it('should successfully initialize Facebook tokens', async () => {
      // Mock long-lived token exchange
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
            expires_in: 5183944,
          }),
        } as any)
        // Mock successful page token request
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            data: [
              {
                access_token: 'long_lived_page_token',
                id: 'test_page_id',
                name: 'Test Page',
                category: 'Business',
                category_list: [],
                tasks: ['MANAGE', 'CREATE_CONTENT'],
              },
            ],
          }),
        } as any)
        // Mock successful page permissions verification
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            id: 'test_page_id',
            name: 'Test Page',
          }),
        } as any);

      (mockPrisma.networkToken.deleteMany as any).mockResolvedValue({ count: 0 });
      (mockPrisma.networkToken.createMany as any).mockResolvedValue({ count: 5 });

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(true);
      expect(result.message).toContain('úspěšně inicializovány');

      // Verifikace API calls
      expect(mockFetch).toHaveBeenCalledTimes(3);

      // Verifikace databáze
      expect(mockPrisma.networkToken.deleteMany).toHaveBeenCalledWith({
        where: { network_id: 1 },
      });
      expect(mockPrisma.networkToken.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          { network_id: 1, token_name: 'appId', token: 'test_app_id' },
          { network_id: 1, token_name: 'appSecret', token: 'test_app_secret' },
          { network_id: 1, token_name: 'pageId', token: 'test_page_id' },
          { network_id: 1, token_name: 'userAccessToken', token: 'long_lived_user_token' },
          { network_id: 1, token_name: 'pageAccessToken', token: 'long_lived_page_token' },
        ]),
      });
    });

    it('should handle long-lived token exchange failure', async () => {
      (mockFetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: (jest.fn() as any).mockResolvedValue('Invalid token'),
      } as any);

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Chyba při inicializaci');
      expect(mockPrisma.networkToken.deleteMany).not.toHaveBeenCalled();
    });

    it('should handle page token retrieval failure', async () => {
      // Mock successful long-lived token exchange
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
          }),
        } as any)
        // Mock failed page token request
        .mockResolvedValueOnce({
          ok: false,
          status: 403,
          text: (jest.fn() as any).mockResolvedValue('Insufficient permissions'),
        } as any);

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Chyba při inicializaci');
    });

    it('should handle page not found error', async () => {
      // Mock successful long-lived token exchange
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
          }),
        } as any)
        // Mock page token request with different page
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            data: [
              {
                access_token: 'other_page_token',
                id: 'different_page_id',
                name: 'Different Page',
                category: 'Business',
                category_list: [],
                tasks: ['MANAGE'],
              },
            ],
          }),
        } as any);

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Stránka s ID test_page_id nebyla nalezena');
    });

    it('should handle page permissions verification failure', async () => {
      // Mock successful long-lived token exchange
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
          }),
        } as any)
        // Mock successful page token request
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            data: [
              {
                access_token: 'long_lived_page_token',
                id: 'test_page_id',
                name: 'Test Page',
                category: 'Business',
                category_list: [],
                tasks: ['MANAGE'],
              },
            ],
          }),
        } as any)
        // Mock failed page permissions verification
        .mockResolvedValueOnce({
          ok: false,
          status: 403,
          text: (jest.fn() as any).mockResolvedValue('Access denied'),
        } as any);

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Nepodařilo se ověřit oprávnění');
    });

    it('should handle database save failure', async () => {
      // Mock successful API calls
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            data: [
              {
                access_token: 'long_lived_page_token',
                id: 'test_page_id',
                name: 'Test Page',
                category: 'Business',
                category_list: [],
                tasks: ['MANAGE'],
              },
            ],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            id: 'test_page_id',
            name: 'Test Page',
          }),
        } as any);

      // Mock database failure
      (mockPrisma.networkToken.deleteMany as any).mockRejectedValue(new Error('Database error'));

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Database error');
    });

    it('should handle network errors', async () => {
      (mockFetch as any).mockRejectedValue(new Error('Network error'));

      const result = await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });

    it('should make correct API calls with proper parameters', async () => {
      // Mock successful responses
      (mockFetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            access_token: 'long_lived_user_token',
            token_type: 'bearer',
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            data: [
              {
                access_token: 'long_lived_page_token',
                id: 'test_page_id',
                name: 'Test Page',
                category: 'Business',
                category_list: [],
                tasks: ['MANAGE'],
              },
            ],
          }),
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: (jest.fn() as any).mockResolvedValue({
            id: 'test_page_id',
            name: 'Test Page',
          }),
        } as any);

      (mockPrisma.networkToken.deleteMany as any).mockResolvedValue({ count: 0 });
      (mockPrisma.networkToken.createMany as any).mockResolvedValue({ count: 5 });

      await facebookTokenManager.initializeFacebookTokens(1, validTokens);

      // Verify first API call (long-lived token exchange)
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('https://graph.facebook.com/v23.0/oauth/access_token'),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      // Verifikace, jestli URL má správné query parametry
      const firstCallUrl = (mockFetch as jest.MockedFunction<typeof fetch>).mock.calls[0][0] as string;
      expect(firstCallUrl).toContain('grant_type=fb_exchange_token');
      expect(firstCallUrl).toContain('client_id=test_app_id');
      expect(firstCallUrl).toContain('client_secret=test_app_secret');
      expect(firstCallUrl).toContain('fb_exchange_token=test_short_token');

      // Verify second API call (page tokens)
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('https://graph.facebook.com/v23.0/me/accounts'),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      // Verify third API call (page verification)
      expect(mockFetch).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining(`https://graph.facebook.com/v23.0/test_page_id`),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});

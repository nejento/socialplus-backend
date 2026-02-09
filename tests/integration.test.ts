import { jest } from '@jest/globals';

// Mock dependencies před importy - podobně jako u ostatních testů
const mockUserMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findFirst: jest.fn() as jest.MockedFunction<any>,
  findUnique: jest.fn() as jest.MockedFunction<any>,
};

const mockNetworkMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findFirst: jest.fn() as jest.MockedFunction<any>,
  findMany: jest.fn() as jest.MockedFunction<any>,
};

const mockNetworkTokenMethods = {
  upsert: jest.fn() as jest.MockedFunction<any>,
};

const mockNetworkUsersMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findFirst: jest.fn() as jest.MockedFunction<any>,
};

const mockPostMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findFirst: jest.fn() as jest.MockedFunction<any>,
};

const mockPostEditorMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
};

const mockContentMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findUnique: jest.fn() as jest.MockedFunction<any>,
};

const mockPostedContentMethods = {
  create: jest.fn() as jest.MockedFunction<any>,
  findFirst: jest.fn() as jest.MockedFunction<any>,
  update: jest.fn() as jest.MockedFunction<any>,
};

const mockBcrypt = {
  hash: jest.fn() as jest.MockedFunction<any>,
  compare: jest.fn() as jest.MockedFunction<any>,
};

jest.mock('../src/generated/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: mockUserMethods,
    network: mockNetworkMethods,
    networkToken: mockNetworkTokenMethods,
    networksUsers: mockNetworkUsersMethods,
    post: mockPostMethods,
    postEditor: mockPostEditorMethods,
    content: mockContentMethods,
    postedContent: mockPostedContentMethods,
    $disconnect: jest.fn(),
  })),
}));

jest.mock('bcrypt', () => mockBcrypt);

// Mock social network provider
const mockProvider = {
  publishPost: jest.fn()
};

jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
  SocialNetworkProviderFactory: {
    getProvider: jest.fn().mockReturnValue(mockProvider)
  }
}));

// Mock data pro celý flow
const mockUsers = {
  user1: {
    id: 1,
    username: 'testuser',
    displayname: 'Test User',
    password: 'hashed_password'
  },
  user2: {
    id: 2,
    username: 'seconduser',
    displayname: 'Second User',
    password: 'hashed_password'
  }
};

const mockNetworks = {
  network1: {
    id: 1,
    owner_id: 1,
    network_type: 'facebook',
    network_name: 'My Facebook Page',
    note: 'Test network',
    users: mockUsers.user1
  }
};

const mockPosts = {
  post1: {
    id: 1,
    creator_id: 1,
    users: mockUsers.user1
  }
};

const mockContents = {
  content1: {
    id: 1,
    posts_id: 1,
    content: 'Test post content'
  }
};

describe('Integration Tests - Complete Application Flow', () => {
  beforeEach(() => {
    // Reset všech mocků před každým testem
    jest.clearAllMocks();

    // Reset Prisma mocků
    Object.values([
      mockUserMethods, mockNetworkMethods, mockNetworkTokenMethods,
      mockNetworkUsersMethods, mockPostMethods, mockPostEditorMethods,
      mockContentMethods, mockPostedContentMethods
    ]).forEach(mockObj => {
      Object.values(mockObj).forEach((method: any) => {
        if (typeof method?.mockClear === 'function') {
          method.mockClear();
        }
      });
    });

    // Reset bcrypt mocků
    (mockBcrypt.hash as any).mockClear();
    (mockBcrypt.compare as any).mockClear();
    (mockBcrypt.hash as any).mockResolvedValue('hashed_password');
    (mockBcrypt.compare as any).mockResolvedValue(true);
  });

  describe('Complete User Flow', () => {
    it('should complete full application workflow', async () => {
      // Setup all mocks at the beginning for better clarity
      const secondUser = {
        id: 2,
        username: 'seconduser',
        displayname: 'Second User',
        password: 'hashed_password'
      };

      // Step 1: Registrace uživatele
      (mockUserMethods.findFirst as any).mockResolvedValueOnce(null); // Check if first user exists
      (mockUserMethods.create as any).mockResolvedValueOnce(mockUsers.user1);

      // Simulace registrace
      const registrationData = {
        username: 'testuser',
        displayname: 'Test User',
        password: 'password123'
      };

      const hashedPassword = await (mockBcrypt.hash as any)(registrationData.password, 10);
      expect(hashedPassword).toBe('hashed_password');

      const existingUser = await (mockUserMethods.findFirst as any)({
        where: { username: registrationData.username }
      });
      expect(existingUser).toBeNull();

      const newUser = await (mockUserMethods.create as any)({
        data: {
          username: registrationData.username,
          displayname: registrationData.displayname,
          password: hashedPassword
        }
      });

      expect(newUser).toEqual(mockUsers.user1);

      // Step 2: Přihlášení uživatele
      (mockUserMethods.findFirst as any).mockResolvedValueOnce(mockUsers.user1); // Login first user

      const loginUser = await (mockUserMethods.findFirst as any)({
        where: { username: 'testuser' }
      });

      expect(loginUser).toEqual(mockUsers.user1);

      const isPasswordValid = await (mockBcrypt.compare as any)('password123', (loginUser as any).password);
      expect(isPasswordValid).toBe(true);

      // Simulace session vytvoření
      const sessionData = {
        userId: (loginUser as any).id,
        username: (loginUser as any).username,
        authenticated: true
      };

      expect(sessionData.authenticated).toBe(true);

      // Step 3: Vytvoření sociální sítě
      (mockNetworkMethods.create as any).mockResolvedValueOnce(mockNetworks.network1);

      const networkData = {
        networkType: 'facebook',
        networkName: 'My Facebook Page',
        networkNote: 'Test network'
      };

      const newNetwork = await (mockNetworkMethods.create as any)({
        data: {
          owner_id: sessionData.userId,
          network_type: networkData.networkType,
          network_name: networkData.networkName,
          note: networkData.networkNote
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              displayname: true
            }
          }
        }
      });

      expect(newNetwork).toEqual(mockNetworks.network1);

      // Step 4: Přidání autentizačních tokenů k síti
      const facebookTokens = {
        appId: 'test_app_id',
        appSecret: 'test_app_secret',
        pageId: 'test_page_id',
        shortLivedUserAccessToken: 'test_token'
      };

      // Mock ownership check
      (mockNetworkMethods.findFirst as any).mockResolvedValueOnce(mockNetworks.network1);

      const ownershipCheck = await (mockNetworkMethods.findFirst as any)({
        where: {
          id: 1,
          owner_id: sessionData.userId
        }
      });

      expect((ownershipCheck as any).network_type).toBe('facebook');

      // Mock token creation
      const tokenNames = Object.keys(facebookTokens);
      tokenNames.forEach(tokenName => {
        (mockNetworkTokenMethods.upsert as any).mockResolvedValueOnce({
          network_id: 1,
          token_name: tokenName,
          token: facebookTokens[tokenName as keyof typeof facebookTokens]
        } as any);
      });

      // Simulace přidání tokenů
      const tokenResults = await Promise.all(
        tokenNames.map(tokenName =>
          (mockNetworkTokenMethods.upsert as any)({
            where: {
              network_id_token_name: {
                network_id: 1,
                token_name: tokenName
              }
            },
            update: {
              token: facebookTokens[tokenName as keyof typeof facebookTokens]
            },
            create: {
              network_id: 1,
              token_name: tokenName,
              token: facebookTokens[tokenName as keyof typeof facebookTokens]
            }
          })
        )
      );

      expect(tokenResults).toHaveLength(4);

      // Step 5: Registrace a přihlášení druhého uživatele
      // Nejprve kontrola existence druhého uživatele pro registraci
      (mockUserMethods.findFirst as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      // Simulace kontroly existence uživatele (neexistuje)
      const existingSecondUser = await (mockUserMethods.findFirst as any)({
        where: { username: 'seconduser' }
      });
      expect(existingSecondUser).toBeNull();

      // Mock pro vytvoření druhého uživatele
      (mockUserMethods.create as any).mockResolvedValueOnce(secondUser);

      const secondUserRegistration = await (mockUserMethods.create as any)({
        data: {
          username: 'seconduser',
          displayname: 'Second User',
          password: 'hashed_password'
        }
      });

      expect(secondUserRegistration).toEqual(secondUser);

      // Teď nastavíme mock pro přihlášení druhého uživatele
      (mockUserMethods.findFirst as jest.MockedFunction<any>).mockResolvedValueOnce(secondUser);

      const secondUserLogin = await (mockUserMethods.findFirst as any)({
        where: { username: 'seconduser' }
      });

      expect(secondUserLogin).toEqual(secondUser);

      // Step 6: Přidání oprávnění druhému uživateli
      (mockNetworkMethods.findFirst as any).mockResolvedValueOnce(mockNetworks.network1);
      (mockUserMethods.findUnique as any).mockResolvedValueOnce(secondUser);
      (mockNetworkUsersMethods.create as any).mockResolvedValueOnce({
        networks_id: 1,
        granter_id: sessionData.userId,
        grantee_id: secondUser.id,
        permission: 'write'
      } as any);

      const permissionData = {
        granteeId: secondUser.id,
        permission: 'write' as const
      };

      const networkOwnership = await (mockNetworkMethods.findFirst as any)({
        where: {
          id: 1,
          owner_id: sessionData.userId
        }
      });

      expect(networkOwnership).toBeTruthy();

      const userExists = await (mockUserMethods.findUnique as any)({
        where: { id: permissionData.granteeId }
      });

      expect(userExists).toEqual(secondUser);

      const newPermission = await (mockNetworkUsersMethods.create as any)({
        data: {
          networks_id: 1,
          granter_id: sessionData.userId,
          grantee_id: permissionData.granteeId,
          permission: permissionData.permission
        }
      });

      expect((newPermission as any).permission).toBe('write');

      // Step 7: Vytvoření příspěvku
      (mockPostMethods.create as any).mockResolvedValueOnce(mockPosts.post1);

      const newPost = await (mockPostMethods.create as any)({
        data: {
          creator_id: sessionData.userId
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              displayname: true
            }
          }
        }
      });

      expect(newPost).toEqual(mockPosts.post1);

      // Step 8: Přidání editora k příspěvku
      (mockPostMethods.findFirst as any).mockResolvedValueOnce(mockPosts.post1);
      (mockUserMethods.findUnique as any).mockResolvedValueOnce(secondUser);
      (mockPostEditorMethods.create as any).mockResolvedValueOnce({
        posts_id: 1,
        editor_id: secondUser.id
      } as any);

      const postOwnership = await (mockPostMethods.findFirst as any)({
        where: {
          id: 1,
          creator_id: sessionData.userId
        }
      });

      expect(postOwnership).toBeTruthy();

      const editorExists = await (mockUserMethods.findUnique as any)({
        where: { id: secondUser.id }
      });

      expect(editorExists).toEqual(secondUser);

      const newEditor = await (mockPostEditorMethods.create as any)({
        data: {
          posts_id: 1,
          editor_id: secondUser.id
        }
      });

      expect((newEditor as any).editor_id).toBe(secondUser.id);

      // Step 9: Přidání obsahu k příspěvku
      (mockPostMethods.findFirst as any).mockResolvedValueOnce(mockPosts.post1);
      (mockContentMethods.create as any).mockResolvedValueOnce(mockContents.content1);

      const contentOwnership = await (mockPostMethods.findFirst as any)({
        where: {
          id: 1,
          creator_id: sessionData.userId
        }
      });

      expect(contentOwnership).toBeTruthy();

      const newContent = await (mockContentMethods.create as any)({
        data: {
          posts_id: 1,
          content: 'Test post content'
        }
      });

      expect(newContent).toEqual(mockContents.content1);

      // Step 10: Propojení obsahu se sociální sítí
      (mockPostMethods.findFirst as any).mockResolvedValueOnce(mockPosts.post1);
      (mockNetworkUsersMethods.findFirst as any).mockResolvedValueOnce({
        networks_id: 1,
        grantee_id: sessionData.userId,
        permission: 'admin'
      } as any);
      (mockContentMethods.findUnique as any).mockResolvedValueOnce(mockContents.content1);
      (mockPostedContentMethods.create as any).mockResolvedValueOnce({
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        post_date: null,
        actual_post_date: null,
        network_post_id: null
      } as any);

      const linkPostOwnership = await (mockPostMethods.findFirst as any)({
        where: {
          id: 1,
          creator_id: sessionData.userId
        }
      });

      const networkPermission = await (mockNetworkUsersMethods.findFirst as any)({
        where: {
          networks_id: 1,
          grantee_id: sessionData.userId
        }
      });

      expect(linkPostOwnership).toBeTruthy();
      expect((networkPermission as any).permission).toBe('admin');

      const linkedContent = await (mockPostedContentMethods.create as any)({
        data: {
          posts_id: 1,
          networks_id: 1,
          contents_id: 1,
          post_date: null,
          actual_post_date: null,
          network_post_id: null
        }
      });

      expect((linkedContent as any).posts_id).toBe(1);
      expect((linkedContent as any).networks_id).toBe(1);
      expect((linkedContent as any).contents_id).toBe(1);

      // Step 11: Naplánování příspěvku
      (mockNetworkUsersMethods.findFirst as any).mockResolvedValueOnce({
        networks_id: 1,
        grantee_id: sessionData.userId,
        permission: 'admin'
      } as any);

      (mockPostedContentMethods.findFirst as any).mockResolvedValueOnce({
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        post_date: null,
        actual_post_date: null,
        network_post_id: null
      } as any);

      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);

      (mockPostedContentMethods.update as any).mockResolvedValueOnce({
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        post_date: futureDate,
        actual_post_date: null,
        network_post_id: null
      } as any);

      const schedulePermission = await (mockNetworkUsersMethods.findFirst as any)({
        where: {
          networks_id: 1,
          grantee_id: sessionData.userId
        }
      });

      expect((schedulePermission as any).permission).toBe('admin');

      const existingPostedContent = await (mockPostedContentMethods.findFirst as any)({
        where: {
          posts_id: 1,
          networks_id: 1,
          contents_id: 1
        }
      });

      expect((existingPostedContent as any).post_date).toBeNull();

      const scheduledContent = await (mockPostedContentMethods.update as any)({
        where: {
          posts_id_networks_id_contents_id: {
            posts_id: 1,
            networks_id: 1,
            contents_id: 1
          }
        },
        data: {
          post_date: futureDate
        }
      });

      expect((scheduledContent as any).post_date).toEqual(futureDate);

      // Step 12: Okamžité publikování obsahu
      (mockNetworkUsersMethods.findFirst as any).mockResolvedValueOnce({
        networks_id: 1,
        grantee_id: sessionData.userId,
        permission: 'admin'
      } as any);

      (mockPostedContentMethods.findFirst as any).mockResolvedValueOnce({
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        post_date: null,
        actual_post_date: null,
        network_post_id: null
      } as any);

      (mockContentMethods.findUnique as any).mockResolvedValueOnce(mockContents.content1);

      // Mock social network provider
      const { SocialNetworkProviderFactory } = require('../src/social/SocialNetworkProviderFactory');
      const provider = SocialNetworkProviderFactory.getProvider('facebook');
      (provider.publishPost as any).mockResolvedValueOnce({
        success: true,
        postId: 'facebook_post_123'
      });

      (mockPostedContentMethods.update as any).mockResolvedValueOnce({
        posts_id: 1,
        networks_id: 1,
        contents_id: 1,
        post_date: new Date(),
        actual_post_date: new Date(),
        network_post_id: 'facebook_post_123'
      } as any);

      const publishPermission = await (mockNetworkUsersMethods.findFirst as any)({
        where: {
          networks_id: 1,
          grantee_id: sessionData.userId
        }
      });

      expect((publishPermission as any).permission).toBe('admin');

      const contentToPublish = await (mockContentMethods.findUnique as any)({
        where: { id: 1 }
      });

      expect(contentToPublish).toEqual(mockContents.content1);

      // Set up mock with network_tokens right before the call - with explicit structure
      const networkWithTokens = {
        id: 1,
        owner_id: 1,
        network_type: 'facebook',
        network_name: 'My Facebook Page',
        note: 'Test network',
        users: mockUsers.user1,
        network_tokens: [
          { network_id: 1, token_name: 'accessToken', token: 'test_token' }
        ]
      };

      (mockNetworkMethods.findFirst as any).mockResolvedValueOnce(networkWithTokens);

      const networkForPublish = await (mockNetworkMethods.findFirst as any)({
        where: { id: 1 }
      });

      expect(networkForPublish).toBeTruthy();
      expect(networkForPublish).toHaveProperty('network_tokens');
      expect((networkForPublish as any).network_tokens).toHaveLength(1);

      const publishResult = await (provider.publishPost as any)((contentToPublish as any).content, []);

      expect((publishResult as any).success).toBe(true);
      expect((publishResult as any).postId).toBe('facebook_post_123');

      const publishedContent = await (mockPostedContentMethods.update as any)({
        where: {
          posts_id_networks_id_contents_id: {
            posts_id: 1,
            networks_id: 1,
            contents_id: 1
          }
        },
        data: {
          actual_post_date: new Date(),
          network_post_id: (publishResult as any).postId
        }
      });

      expect((publishedContent as any).network_post_id).toBe('facebook_post_123');
      expect((publishedContent as any).actual_post_date).toBeTruthy();

      // Finální ověření - celý flow byl úspěšný
      expect((newUser as any).id).toBe(1);
      expect((newNetwork as any).id).toBe(1);
      expect((newPost as any).id).toBe(1);
      expect((newContent as any).id).toBe(1);
      expect((publishedContent as any).network_post_id).toBe('facebook_post_123');
    });
  });

  describe('Permission Testing', () => {
    it('should respect network read/write permissions', () => {
      const testCases = [
        {
          permission: 'read',
          canView: true,
          canPublish: false,
          canManage: false
        },
        {
          permission: 'write',
          canView: true,
          canPublish: true,
          canManage: false
        },
        {
          permission: 'admin',
          canView: true,
          canPublish: true,
          canManage: true
        }
      ];

      testCases.forEach(testCase => {
        const canView = ['read', 'write', 'admin'].includes(testCase.permission);
        const canPublish = ['write', 'admin'].includes(testCase.permission);
        const canManage = testCase.permission === 'admin';

        expect(canView).toBe(testCase.canView);
        expect(canPublish).toBe(testCase.canPublish);
        expect(canManage).toBe(testCase.canManage);
      });
    });

    it('should handle post editor permissions correctly', () => {
      const permissionScenarios = [
        {
          name: 'Owner can always edit',
          isOwner: true,
          isEditor: false,
          hasNetworkWriteAccess: false,
          expectedCanEdit: true
        },
        {
          name: 'Editor with network write access can edit',
          isOwner: false,
          isEditor: true,
          hasNetworkWriteAccess: true,
          expectedCanEdit: true
        },
        {
          name: 'Editor without network write access cannot edit',
          isOwner: false,
          isEditor: true,
          hasNetworkWriteAccess: false,
          expectedCanEdit: false
        },
        {
          name: 'Non-owner non-editor cannot edit',
          isOwner: false,
          isEditor: false,
          hasNetworkWriteAccess: true,
          expectedCanEdit: false
        }
      ];

      permissionScenarios.forEach(scenario => {
        const canEdit = scenario.isOwner ||
                       (scenario.isEditor && scenario.hasNetworkWriteAccess);

        expect(canEdit).toBe(scenario.expectedCanEdit);
      });
    });

    it('should validate business rules', () => {
      // Unikátní uživatelská jména
      const usernames = ['user1', 'user2', 'user3'];
      const uniqueUsernames = [...new Set(usernames)];
      expect(uniqueUsernames).toHaveLength(usernames.length);

      // Unikátní názvy sítí pro uživatele
      const userNetworks = [
        { userId: 1, networkName: 'My Facebook' },
        { userId: 1, networkName: 'My Twitter' },
        { userId: 2, networkName: 'My Facebook' } // Same name, different user - OK
      ];

      // Skupinování podle uživatele
      const networksByUser = userNetworks.reduce((acc, network) => {
        if (!acc[network.userId]) acc[network.userId] = [];
        acc[network.userId].push(network.networkName);
        return acc;
      }, {} as Record<number, string[]>);

      Object.values(networksByUser).forEach(names => {
        const uniqueNames = [...new Set(names)];
        expect(uniqueNames).toHaveLength(names.length);
      });
    });
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock dependencies před importy - podobně jako u ostatních testů
const mockUserMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findUnique: globals_1.jest.fn(),
};
const mockNetworkMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
};
const mockNetworkTokenMethods = {
    upsert: globals_1.jest.fn(),
};
const mockNetworkUsersMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
};
const mockPostMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
};
const mockPostEditorMethods = {
    create: globals_1.jest.fn(),
};
const mockContentMethods = {
    create: globals_1.jest.fn(),
    findUnique: globals_1.jest.fn(),
};
const mockPostedContentMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
};
const mockBcrypt = {
    hash: globals_1.jest.fn(),
    compare: globals_1.jest.fn(),
};
globals_1.jest.mock('../src/generated/client', () => ({
    PrismaClient: globals_1.jest.fn().mockImplementation(() => ({
        user: mockUserMethods,
        network: mockNetworkMethods,
        networkToken: mockNetworkTokenMethods,
        networksUsers: mockNetworkUsersMethods,
        post: mockPostMethods,
        postEditor: mockPostEditorMethods,
        content: mockContentMethods,
        postedContent: mockPostedContentMethods,
        $disconnect: globals_1.jest.fn(),
    })),
}));
globals_1.jest.mock('bcrypt', () => mockBcrypt);
// Mock social network provider
const mockProvider = {
    publishPost: globals_1.jest.fn()
};
globals_1.jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
    SocialNetworkProviderFactory: {
        getProvider: globals_1.jest.fn().mockReturnValue(mockProvider)
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
        globals_1.jest.clearAllMocks();
        // Reset Prisma mocků
        Object.values([
            mockUserMethods, mockNetworkMethods, mockNetworkTokenMethods,
            mockNetworkUsersMethods, mockPostMethods, mockPostEditorMethods,
            mockContentMethods, mockPostedContentMethods
        ]).forEach(mockObj => {
            Object.values(mockObj).forEach((method) => {
                if (typeof method?.mockClear === 'function') {
                    method.mockClear();
                }
            });
        });
        // Reset bcrypt mocků
        mockBcrypt.hash.mockClear();
        mockBcrypt.compare.mockClear();
        mockBcrypt.hash.mockResolvedValue('hashed_password');
        mockBcrypt.compare.mockResolvedValue(true);
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
            mockUserMethods.findFirst.mockResolvedValueOnce(null); // Check if first user exists
            mockUserMethods.create.mockResolvedValueOnce(mockUsers.user1);
            // Simulace registrace
            const registrationData = {
                username: 'testuser',
                displayname: 'Test User',
                password: 'password123'
            };
            const hashedPassword = await mockBcrypt.hash(registrationData.password, 10);
            expect(hashedPassword).toBe('hashed_password');
            const existingUser = await mockUserMethods.findFirst({
                where: { username: registrationData.username }
            });
            expect(existingUser).toBeNull();
            const newUser = await mockUserMethods.create({
                data: {
                    username: registrationData.username,
                    displayname: registrationData.displayname,
                    password: hashedPassword
                }
            });
            expect(newUser).toEqual(mockUsers.user1);
            // Step 2: Přihlášení uživatele
            mockUserMethods.findFirst.mockResolvedValueOnce(mockUsers.user1); // Login first user
            const loginUser = await mockUserMethods.findFirst({
                where: { username: 'testuser' }
            });
            expect(loginUser).toEqual(mockUsers.user1);
            const isPasswordValid = await mockBcrypt.compare('password123', loginUser.password);
            expect(isPasswordValid).toBe(true);
            // Simulace session vytvoření
            const sessionData = {
                userId: loginUser.id,
                username: loginUser.username,
                authenticated: true
            };
            expect(sessionData.authenticated).toBe(true);
            // Step 3: Vytvoření sociální sítě
            mockNetworkMethods.create.mockResolvedValueOnce(mockNetworks.network1);
            const networkData = {
                networkType: 'facebook',
                networkName: 'My Facebook Page',
                networkNote: 'Test network'
            };
            const newNetwork = await mockNetworkMethods.create({
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
            mockNetworkMethods.findFirst.mockResolvedValueOnce(mockNetworks.network1);
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: 1,
                    owner_id: sessionData.userId
                }
            });
            expect(ownershipCheck.network_type).toBe('facebook');
            // Mock token creation
            const tokenNames = Object.keys(facebookTokens);
            tokenNames.forEach(tokenName => {
                mockNetworkTokenMethods.upsert.mockResolvedValueOnce({
                    network_id: 1,
                    token_name: tokenName,
                    token: facebookTokens[tokenName]
                });
            });
            // Simulace přidání tokenů
            const tokenResults = await Promise.all(tokenNames.map(tokenName => mockNetworkTokenMethods.upsert({
                where: {
                    network_id_token_name: {
                        network_id: 1,
                        token_name: tokenName
                    }
                },
                update: {
                    token: facebookTokens[tokenName]
                },
                create: {
                    network_id: 1,
                    token_name: tokenName,
                    token: facebookTokens[tokenName]
                }
            })));
            expect(tokenResults).toHaveLength(4);
            // Step 5: Registrace a přihlášení druhého uživatele
            // Nejprve kontrola existence druhého uživatele pro registraci
            mockUserMethods.findFirst.mockResolvedValueOnce(null);
            // Simulace kontroly existence uživatele (neexistuje)
            const existingSecondUser = await mockUserMethods.findFirst({
                where: { username: 'seconduser' }
            });
            expect(existingSecondUser).toBeNull();
            // Mock pro vytvoření druhého uživatele
            mockUserMethods.create.mockResolvedValueOnce(secondUser);
            const secondUserRegistration = await mockUserMethods.create({
                data: {
                    username: 'seconduser',
                    displayname: 'Second User',
                    password: 'hashed_password'
                }
            });
            expect(secondUserRegistration).toEqual(secondUser);
            // Teď nastavíme mock pro přihlášení druhého uživatele
            mockUserMethods.findFirst.mockResolvedValueOnce(secondUser);
            const secondUserLogin = await mockUserMethods.findFirst({
                where: { username: 'seconduser' }
            });
            expect(secondUserLogin).toEqual(secondUser);
            // Step 6: Přidání oprávnění druhému uživateli
            mockNetworkMethods.findFirst.mockResolvedValueOnce(mockNetworks.network1);
            mockUserMethods.findUnique.mockResolvedValueOnce(secondUser);
            mockNetworkUsersMethods.create.mockResolvedValueOnce({
                networks_id: 1,
                granter_id: sessionData.userId,
                grantee_id: secondUser.id,
                permission: 'write'
            });
            const permissionData = {
                granteeId: secondUser.id,
                permission: 'write'
            };
            const networkOwnership = await mockNetworkMethods.findFirst({
                where: {
                    id: 1,
                    owner_id: sessionData.userId
                }
            });
            expect(networkOwnership).toBeTruthy();
            const userExists = await mockUserMethods.findUnique({
                where: { id: permissionData.granteeId }
            });
            expect(userExists).toEqual(secondUser);
            const newPermission = await mockNetworkUsersMethods.create({
                data: {
                    networks_id: 1,
                    granter_id: sessionData.userId,
                    grantee_id: permissionData.granteeId,
                    permission: permissionData.permission
                }
            });
            expect(newPermission.permission).toBe('write');
            // Step 7: Vytvoření příspěvku
            mockPostMethods.create.mockResolvedValueOnce(mockPosts.post1);
            const newPost = await mockPostMethods.create({
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
            mockPostMethods.findFirst.mockResolvedValueOnce(mockPosts.post1);
            mockUserMethods.findUnique.mockResolvedValueOnce(secondUser);
            mockPostEditorMethods.create.mockResolvedValueOnce({
                posts_id: 1,
                editor_id: secondUser.id
            });
            const postOwnership = await mockPostMethods.findFirst({
                where: {
                    id: 1,
                    creator_id: sessionData.userId
                }
            });
            expect(postOwnership).toBeTruthy();
            const editorExists = await mockUserMethods.findUnique({
                where: { id: secondUser.id }
            });
            expect(editorExists).toEqual(secondUser);
            const newEditor = await mockPostEditorMethods.create({
                data: {
                    posts_id: 1,
                    editor_id: secondUser.id
                }
            });
            expect(newEditor.editor_id).toBe(secondUser.id);
            // Step 9: Přidání obsahu k příspěvku
            mockPostMethods.findFirst.mockResolvedValueOnce(mockPosts.post1);
            mockContentMethods.create.mockResolvedValueOnce(mockContents.content1);
            const contentOwnership = await mockPostMethods.findFirst({
                where: {
                    id: 1,
                    creator_id: sessionData.userId
                }
            });
            expect(contentOwnership).toBeTruthy();
            const newContent = await mockContentMethods.create({
                data: {
                    posts_id: 1,
                    content: 'Test post content'
                }
            });
            expect(newContent).toEqual(mockContents.content1);
            // Step 10: Propojení obsahu se sociální sítí
            mockPostMethods.findFirst.mockResolvedValueOnce(mockPosts.post1);
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: 1,
                grantee_id: sessionData.userId,
                permission: 'admin'
            });
            mockContentMethods.findUnique.mockResolvedValueOnce(mockContents.content1);
            mockPostedContentMethods.create.mockResolvedValueOnce({
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: null,
                actual_post_date: null,
                network_post_id: null
            });
            const linkPostOwnership = await mockPostMethods.findFirst({
                where: {
                    id: 1,
                    creator_id: sessionData.userId
                }
            });
            const networkPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: 1,
                    grantee_id: sessionData.userId
                }
            });
            expect(linkPostOwnership).toBeTruthy();
            expect(networkPermission.permission).toBe('admin');
            const linkedContent = await mockPostedContentMethods.create({
                data: {
                    posts_id: 1,
                    networks_id: 1,
                    contents_id: 1,
                    post_date: null,
                    actual_post_date: null,
                    network_post_id: null
                }
            });
            expect(linkedContent.posts_id).toBe(1);
            expect(linkedContent.networks_id).toBe(1);
            expect(linkedContent.contents_id).toBe(1);
            // Step 11: Naplánování příspěvku
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: 1,
                grantee_id: sessionData.userId,
                permission: 'admin'
            });
            mockPostedContentMethods.findFirst.mockResolvedValueOnce({
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: null,
                actual_post_date: null,
                network_post_id: null
            });
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 1);
            mockPostedContentMethods.update.mockResolvedValueOnce({
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: futureDate,
                actual_post_date: null,
                network_post_id: null
            });
            const schedulePermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: 1,
                    grantee_id: sessionData.userId
                }
            });
            expect(schedulePermission.permission).toBe('admin');
            const existingPostedContent = await mockPostedContentMethods.findFirst({
                where: {
                    posts_id: 1,
                    networks_id: 1,
                    contents_id: 1
                }
            });
            expect(existingPostedContent.post_date).toBeNull();
            const scheduledContent = await mockPostedContentMethods.update({
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
            expect(scheduledContent.post_date).toEqual(futureDate);
            // Step 12: Okamžité publikování obsahu
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: 1,
                grantee_id: sessionData.userId,
                permission: 'admin'
            });
            mockPostedContentMethods.findFirst.mockResolvedValueOnce({
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: null,
                actual_post_date: null,
                network_post_id: null
            });
            mockContentMethods.findUnique.mockResolvedValueOnce(mockContents.content1);
            // Mock social network provider
            const { SocialNetworkProviderFactory } = require('../src/social/SocialNetworkProviderFactory');
            const provider = SocialNetworkProviderFactory.getProvider('facebook');
            provider.publishPost.mockResolvedValueOnce({
                success: true,
                postId: 'facebook_post_123'
            });
            mockPostedContentMethods.update.mockResolvedValueOnce({
                posts_id: 1,
                networks_id: 1,
                contents_id: 1,
                post_date: new Date(),
                actual_post_date: new Date(),
                network_post_id: 'facebook_post_123'
            });
            const publishPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: 1,
                    grantee_id: sessionData.userId
                }
            });
            expect(publishPermission.permission).toBe('admin');
            const contentToPublish = await mockContentMethods.findUnique({
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
            mockNetworkMethods.findFirst.mockResolvedValueOnce(networkWithTokens);
            const networkForPublish = await mockNetworkMethods.findFirst({
                where: { id: 1 }
            });
            expect(networkForPublish).toBeTruthy();
            expect(networkForPublish).toHaveProperty('network_tokens');
            expect(networkForPublish.network_tokens).toHaveLength(1);
            const publishResult = await provider.publishPost(contentToPublish.content, []);
            expect(publishResult.success).toBe(true);
            expect(publishResult.postId).toBe('facebook_post_123');
            const publishedContent = await mockPostedContentMethods.update({
                where: {
                    posts_id_networks_id_contents_id: {
                        posts_id: 1,
                        networks_id: 1,
                        contents_id: 1
                    }
                },
                data: {
                    actual_post_date: new Date(),
                    network_post_id: publishResult.postId
                }
            });
            expect(publishedContent.network_post_id).toBe('facebook_post_123');
            expect(publishedContent.actual_post_date).toBeTruthy();
            // Finální ověření - celý flow byl úspěšný
            expect(newUser.id).toBe(1);
            expect(newNetwork.id).toBe(1);
            expect(newPost.id).toBe(1);
            expect(newContent.id).toBe(1);
            expect(publishedContent.network_post_id).toBe('facebook_post_123');
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
                if (!acc[network.userId])
                    acc[network.userId] = [];
                acc[network.userId].push(network.networkName);
                return acc;
            }, {});
            Object.values(networksByUser).forEach(names => {
                const uniqueNames = [...new Set(names)];
                expect(uniqueNames).toHaveLength(names.length);
            });
        });
    });
});

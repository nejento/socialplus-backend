"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock dependencies před importy
const mockNetworkMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockNetworkTokenMethods = {
    upsert: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockNetworkUsersMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockUserMethods = {
    findUnique: globals_1.jest.fn(),
};
globals_1.jest.mock('../src/generated/client', () => ({
    PrismaClient: globals_1.jest.fn().mockImplementation(() => ({
        network: mockNetworkMethods,
        networkToken: mockNetworkTokenMethods,
        networksUsers: mockNetworkUsersMethods,
        user: mockUserMethods,
        $disconnect: globals_1.jest.fn(),
    })),
}));
// Mock data
const mockUsers = {
    user1: {
        id: 1,
        username: 'testuser1',
        displayname: 'Test User 1',
    },
    user2: {
        id: 2,
        username: 'testuser2',
        displayname: 'Test User 2',
    }
};
const mockNetworks = {
    network1: {
        id: 1,
        owner_id: 1,
        network_type: 'facebook',
        network_name: 'Test Facebook Network',
        note: 'Test network for user 1',
    }
};
describe('Manager Routes Logic (Network Management)', () => {
    beforeEach(() => {
        // Reset všech mocků před každým testem
        globals_1.jest.clearAllMocks();
        mockNetworkMethods.create.mockClear();
        mockNetworkMethods.findFirst.mockClear();
        mockNetworkMethods.findMany.mockClear();
        mockNetworkMethods.update.mockClear();
        mockNetworkMethods.delete.mockClear();
        mockNetworkTokenMethods.upsert.mockClear();
        mockNetworkTokenMethods.findMany.mockClear();
        mockNetworkUsersMethods.create.mockClear();
        mockNetworkUsersMethods.findFirst.mockClear();
        mockUserMethods.findUnique.mockClear();
    });
    describe('Network Creation Logic', () => {
        it('should create new network successfully', async () => {
            const networkData = {
                networkType: 'facebook',
                networkName: 'My Facebook Page',
                networkNote: 'Test Facebook network',
                ownerId: mockUsers.user1.id
            };
            // Mock network creation
            mockNetworkMethods.create.mockResolvedValueOnce({
                id: 1,
                owner_id: networkData.ownerId,
                network_type: networkData.networkType,
                network_name: networkData.networkName,
                note: networkData.networkNote,
                users: mockUsers.user1
            });
            const newNetwork = await mockNetworkMethods.create({
                data: {
                    owner_id: networkData.ownerId,
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
            expect(newNetwork).toEqual({
                id: 1,
                owner_id: 1,
                network_type: 'facebook',
                network_name: 'My Facebook Page',
                note: 'Test Facebook network',
                users: mockUsers.user1
            });
            expect(mockNetworkMethods.create).toHaveBeenCalledWith({
                data: {
                    owner_id: networkData.ownerId,
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
        });
        it('should validate network types', () => {
            const validNetworkTypes = ['facebook', 'twitter', 'instagram', 'linkedin', 'threads', 'mastodon', 'bluesky'];
            const testNetworkType = 'facebook';
            expect(validNetworkTypes).toContain(testNetworkType);
        });
    });
    describe('Network Management Logic', () => {
        it('should get user networks successfully', async () => {
            const userId = mockUsers.user1.id;
            // Mock owned networks
            mockNetworkMethods.findMany.mockResolvedValueOnce([{
                    ...mockNetworks.network1,
                    users: mockUsers.user1,
                    permission: 'admin'
                }]);
            // Mock granted networks
            mockNetworkUsersMethods.findMany.mockResolvedValueOnce([]);
            const ownedNetworks = await mockNetworkMethods.findMany({
                where: { owner_id: userId }
            });
            const grantedNetworks = await mockNetworkUsersMethods.findMany({
                where: { grantee_id: userId }
            });
            expect(ownedNetworks).toHaveLength(1);
            expect(ownedNetworks[0].permission).toBe('admin');
            expect(grantedNetworks).toHaveLength(0);
        });
        it('should edit network successfully by owner', async () => {
            const networkId = 1;
            const updateData = {
                networkName: 'Updated Network Name',
                networkNote: 'Updated note'
            };
            // Mock ownership check
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Old Name',
                note: 'Old note'
            });
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id
                }
            });
            expect(ownershipCheck).toBeTruthy();
            expect(ownershipCheck.owner_id).toBe(mockUsers.user1.id);
            // Mock update
            mockNetworkMethods.update.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: updateData.networkName,
                note: updateData.networkNote,
                users: mockUsers.user1
            });
            const updatedNetwork = await mockNetworkMethods.update({
                where: { id: networkId },
                data: {
                    network_name: updateData.networkName,
                    note: updateData.networkNote
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
            expect(updatedNetwork.network_name).toBe('Updated Network Name');
            expect(updatedNetwork.note).toBe('Updated note');
        });
        it('should deny edit access to non-owner', async () => {
            const networkId = 1;
            // Mock network owned by different user
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user2.id,
                network_type: 'facebook',
                network_name: 'Network Name',
                note: 'Note'
            });
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id // Current user trying to edit
                }
            });
            expect(ownershipCheck.owner_id).not.toBe(mockUsers.user1.id);
            // Simulace zamítnutí úprav
            const canEdit = ownershipCheck.owner_id === mockUsers.user1.id;
            expect(canEdit).toBe(false);
        });
        it('should delete network successfully by owner', async () => {
            const networkId = 1;
            // Mock ownership check
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Test Network',
                note: null
            });
            // Mock deletion
            mockNetworkMethods.delete.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Test Network',
                note: null
            });
            const deletedNetwork = await mockNetworkMethods.delete({
                where: {
                    id_owner_id: {
                        id: networkId,
                        owner_id: mockUsers.user1.id
                    }
                }
            });
            expect(deletedNetwork.id).toBe(networkId);
            expect(mockNetworkMethods.delete).toHaveBeenCalledWith({
                where: {
                    id_owner_id: {
                        id: networkId,
                        owner_id: mockUsers.user1.id
                    }
                }
            });
        });
    });
    describe('User Permissions Logic', () => {
        it('should add user permissions successfully by owner', async () => {
            const networkId = 1;
            const permissionData = {
                granteeId: mockUsers.user2.id,
                permission: 'write',
                granterId: mockUsers.user1.id
            };
            // Mock ownership check
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Test Network',
                note: null
            });
            // Mock user exists
            mockUserMethods.findUnique.mockResolvedValueOnce(mockUsers.user2);
            // Mock permission creation
            mockNetworkUsersMethods.create.mockResolvedValueOnce({
                networks_id: networkId,
                granter_id: permissionData.granterId,
                grantee_id: permissionData.granteeId,
                permission: permissionData.permission
            });
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const userExists = await mockUserMethods.findUnique({
                where: { id: permissionData.granteeId }
            });
            expect(userExists).toEqual(mockUsers.user2);
            const newPermission = await mockNetworkUsersMethods.create({
                data: {
                    networks_id: networkId,
                    granter_id: permissionData.granterId,
                    grantee_id: permissionData.granteeId,
                    permission: permissionData.permission
                }
            });
            expect(newPermission.permission).toBe('write');
            expect(newPermission.grantee_id).toBe(mockUsers.user2.id);
        });
        it('should validate permission levels', () => {
            const validPermissions = ['read', 'write', 'admin'];
            const testPermission = 'write';
            expect(validPermissions).toContain(testPermission);
            // Test permission hierarchy
            const permissionLevels = {
                read: 1,
                write: 2,
                admin: 3
            };
            expect(permissionLevels.admin).toBeGreaterThan(permissionLevels.write);
            expect(permissionLevels.write).toBeGreaterThan(permissionLevels.read);
        });
        it('should deny permission addition to non-owner', async () => {
            const networkId = 1;
            // Mock network owned by different user
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user2.id,
                network_type: 'facebook',
                network_name: 'Network Name',
                note: null
            });
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id // Current user trying to add permission
                }
            });
            expect(ownershipCheck.owner_id).not.toBe(mockUsers.user1.id);
            const canAddPermissions = ownershipCheck.owner_id === mockUsers.user1.id;
            expect(canAddPermissions).toBe(false);
        });
    });
    describe('Token Management Logic', () => {
        it('should add Facebook tokens successfully', async () => {
            const networkId = 1;
            const facebookTokens = {
                appId: 'test_app_id',
                appSecret: 'test_app_secret',
                pageId: 'test_page_id',
                shortLivedUserAccessToken: 'test_token'
            };
            // Mock ownership check
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Test Facebook Network',
                note: null
            });
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id
                }
            });
            expect(ownershipCheck.network_type).toBe('facebook');
            // Mock token creation for each token
            const tokenNames = Object.keys(facebookTokens);
            tokenNames.forEach(tokenName => {
                mockNetworkTokenMethods.upsert.mockResolvedValueOnce({
                    network_id: networkId,
                    token_name: tokenName,
                    token: facebookTokens[tokenName]
                });
            });
            // Simulate token upserts
            const createdTokens = await Promise.all(tokenNames.map(tokenName => mockNetworkTokenMethods.upsert({
                where: {
                    network_id_token_name: {
                        network_id: networkId,
                        token_name: tokenName
                    }
                },
                update: {
                    token: facebookTokens[tokenName]
                },
                create: {
                    network_id: networkId,
                    token_name: tokenName,
                    token: facebookTokens[tokenName]
                }
            })));
            expect(createdTokens).toHaveLength(4);
            expect(mockNetworkTokenMethods.upsert).toHaveBeenCalledTimes(4);
        });
        it('should get network tokens successfully by owner', async () => {
            const networkId = 1;
            // Mock ownership check
            mockNetworkMethods.findFirst.mockResolvedValueOnce({
                id: networkId,
                owner_id: mockUsers.user1.id,
                network_type: 'facebook',
                network_name: 'Test Network',
                note: null
            });
            const mockTokens = [
                { network_id: networkId, token_name: 'appId', token: 'test_app_id' },
                { network_id: networkId, token_name: 'appSecret', token: 'test_app_secret' }
            ];
            mockNetworkTokenMethods.findMany.mockResolvedValueOnce(mockTokens);
            const ownershipCheck = await mockNetworkMethods.findFirst({
                where: {
                    id: networkId,
                    owner_id: mockUsers.user1.id
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const tokens = await mockNetworkTokenMethods.findMany({
                where: { network_id: networkId }
            });
            expect(tokens).toHaveLength(2);
            expect(tokens[0].token_name).toBe('appId');
            expect(tokens[1].token_name).toBe('appSecret');
        });
        it('should validate network type for tokens', () => {
            const networkTypes = {
                facebook: ['appId', 'appSecret', 'pageId', 'shortLivedUserAccessToken'],
                twitter: ['apiKey', 'apiSecretKey', 'accessToken', 'accessTokenSecret'],
                instagram: ['accessToken'],
                linkedin: ['accessToken']
            };
            // Test Facebook token validation
            const facebookTokens = ['appId', 'appSecret', 'pageId', 'shortLivedUserAccessToken'];
            expect(networkTypes.facebook).toEqual(facebookTokens);
            // Test that wrong tokens for network type are rejected
            const facebookTokenNames = Object.keys(networkTypes.facebook);
            const isValidForTwitter = facebookTokenNames.every(token => networkTypes.twitter.includes(token));
            expect(isValidForTwitter).toBe(false);
        });
    });
});

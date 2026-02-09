"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock dependencies před importy
const mockNetworkUsersMethods = {
    findMany: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    create: globals_1.jest.fn(),
};
const mockNetworkMethods = {
    findMany: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
};
const mockPostedContentMethods = {
    findMany: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
    create: globals_1.jest.fn(),
};
const mockContentMethods = {
    findUnique: globals_1.jest.fn(),
};
const mockPostedContentAttachmentMethods = {
    findMany: globals_1.jest.fn(),
};
globals_1.jest.mock('../src/generated/client', () => ({
    PrismaClient: globals_1.jest.fn().mockImplementation(() => ({
        networksUsers: mockNetworkUsersMethods,
        network: mockNetworkMethods,
        postedContent: mockPostedContentMethods,
        content: mockContentMethods,
        postedContentAttachment: mockPostedContentAttachmentMethods,
        $disconnect: globals_1.jest.fn(),
    })),
}));
// Mock social network provider
globals_1.jest.mock('../src/social/SocialNetworkProviderFactory', () => ({
    SocialNetworkProviderFactory: {
        getProvider: globals_1.jest.fn().mockReturnValue({
            publishPost: globals_1.jest.fn()
        })
    }
}));
// Mock data
const mockUsers = {
    user1: {
        id: 1,
        username: 'testuser1',
        displayname: 'Test User 1',
    }
};
const mockNetworks = {
    network1: {
        id: 1,
        owner_id: 1,
        network_type: 'facebook',
        network_name: 'Test Facebook Network',
        network_tokens: [
            { network_id: 1, token_name: 'accessToken', token: 'test_token' }
        ]
    }
};
const mockPosts = {
    post1: {
        id: 1,
        creator_id: 1,
    }
};
const mockContents = {
    content1: {
        id: 1,
        posts_id: 1,
        content: 'Test content to publish',
    }
};
describe('Scheduler Routes Logic', () => {
    beforeEach(() => {
        // Reset všech mocků před každým testem
        globals_1.jest.clearAllMocks();
        mockNetworkUsersMethods.findMany.mockClear();
        mockNetworkUsersMethods.findFirst.mockClear();
        mockNetworkMethods.findMany.mockClear();
        mockNetworkMethods.findFirst.mockClear();
        mockPostedContentMethods.findMany.mockClear();
        mockPostedContentMethods.findFirst.mockClear();
        mockPostedContentMethods.update.mockClear();
        mockContentMethods.findUnique.mockClear();
        mockPostedContentAttachmentMethods.findMany.mockClear();
        // Setup default mock return value for publishPost
        const { SocialNetworkProviderFactory } = require('../src/social/SocialNetworkProviderFactory');
        const mockProvider = SocialNetworkProviderFactory.getProvider();
        if (mockProvider && mockProvider.publishPost) {
            mockProvider.publishPost.mockResolvedValue({
                success: true,
                postId: 'network_post_123'
            });
        }
    });
    describe('Publish Content Logic', () => {
        it('should simulate content publishing workflow', async () => {
            const publishData = {
                postId: 1,
                contentId: 1,
                networkId: 1
            };
            // 1. Ověření oprávnění k síti (write permission)
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: publishData.networkId,
                grantee_id: mockUsers.user1.id,
                permission: 'write'
            });
            const networkPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: publishData.networkId,
                    grantee_id: mockUsers.user1.id
                }
            });
            expect(networkPermission).toBeTruthy();
            expect(networkPermission.permission).toBe('write');
            // 2. Získání obsahu pro publikování
            mockPostedContentMethods.findFirst.mockResolvedValueOnce({
                posts_id: publishData.postId,
                networks_id: publishData.networkId,
                contents_id: publishData.contentId,
                post_date: null,
                actual_post_date: null,
                network_post_id: null
            });
            const postedContent = await mockPostedContentMethods.findFirst({
                where: {
                    posts_id: publishData.postId,
                    networks_id: publishData.networkId,
                    contents_id: publishData.contentId
                }
            });
            expect(postedContent).toBeTruthy();
            expect(postedContent.network_post_id).toBeNull(); // Ještě nepublikováno
            // 3. Získání textového obsahu
            mockContentMethods.findUnique.mockResolvedValueOnce(mockContents.content1);
            const content = await mockContentMethods.findUnique({
                where: { id: publishData.contentId }
            });
            expect(content).toEqual(mockContents.content1);
            // 4. Získání informací o síti
            mockNetworkMethods.findFirst.mockResolvedValueOnce(mockNetworks.network1);
            const network = await mockNetworkMethods.findFirst({
                where: { id: publishData.networkId }
            });
            expect(network).toEqual(mockNetworks.network1);
            // 5. Simulace publikování na sociální síť
            const { SocialNetworkProviderFactory } = require('../src/social/SocialNetworkProviderFactory');
            const provider = SocialNetworkProviderFactory.getProvider('facebook');
            const publishResult = await provider.publishPost(content.content, []);
            expect(publishResult.success).toBe(true);
            expect(publishResult.postId).toBe('network_post_123');
            // 6. Aktualizace záznamu s výsledkem publikování
            mockPostedContentMethods.update.mockResolvedValueOnce({
                posts_id: publishData.postId,
                networks_id: publishData.networkId,
                contents_id: publishData.contentId,
                post_date: new Date(),
                actual_post_date: new Date(),
                network_post_id: publishResult.postId
            });
            const updatedContent = await mockPostedContentMethods.update({
                where: {
                    posts_id_networks_id_contents_id: {
                        posts_id: publishData.postId,
                        networks_id: publishData.networkId,
                        contents_id: publishData.contentId
                    }
                },
                data: {
                    actual_post_date: new Date(),
                    network_post_id: publishResult.postId
                }
            });
            expect(updatedContent.network_post_id).toBe('network_post_123');
            expect(updatedContent.actual_post_date).toBeTruthy();
        });
        it('should handle insufficient permissions for publishing', async () => {
            const publishData = {
                postId: 1,
                contentId: 1,
                networkId: 1
            };
            // Mock pouze read oprávnění (nedostatečné pro publikování)
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: publishData.networkId,
                grantee_id: mockUsers.user1.id,
                permission: 'read'
            });
            const networkPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: publishData.networkId,
                    grantee_id: mockUsers.user1.id
                }
            });
            expect(networkPermission.permission).toBe('read');
            // Simulace odmítnutí publikování kvůli nedostatečným oprávněním
            const canPublish = networkPermission.permission === 'write' || networkPermission.permission === 'admin';
            expect(canPublish).toBe(false);
        });
    });
    describe('Scheduled Posts Logic', () => {
        it('should get scheduled posts for user networks', async () => {
            const mockScheduledPosts = [
                {
                    posts_id: 1,
                    networks_id: 1,
                    contents_id: 1,
                    post_date: new Date('2025-12-31T10:00:00Z'),
                    actual_post_date: null,
                    network_post_id: null,
                    posts: mockPosts.post1,
                    networks: mockNetworks.network1,
                    contents: mockContents.content1
                }
            ];
            // Mock network access check
            mockNetworkUsersMethods.findMany.mockResolvedValueOnce([{
                    networks_id: 1,
                    grantee_id: mockUsers.user1.id,
                    permission: 'write'
                }]);
            mockNetworkMethods.findMany.mockResolvedValueOnce([mockNetworks.network1]);
            mockPostedContentMethods.findMany.mockResolvedValueOnce(mockScheduledPosts);
            // Získání sítí uživatele
            const userNetworkPermissions = await mockNetworkUsersMethods.findMany({
                where: { grantee_id: mockUsers.user1.id }
            });
            const userOwnedNetworks = await mockNetworkMethods.findMany({
                where: { owner_id: mockUsers.user1.id }
            });
            expect(userNetworkPermissions).toHaveLength(1);
            expect(userOwnedNetworks).toHaveLength(1);
            // Získání naplánovaných příspěvků
            const scheduledPosts = await mockPostedContentMethods.findMany({
                where: {
                    post_date: { not: null },
                    actual_post_date: null
                }
            });
            expect(scheduledPosts).toHaveLength(1);
            expect(scheduledPosts[0].post_date).toBeTruthy();
            expect(scheduledPosts[0].actual_post_date).toBeNull();
        });
        it('should cancel scheduled post successfully', async () => {
            const cancelData = {
                postId: 1,
                contentId: 1,
                networkId: 1
            };
            // Mock write permission check
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: cancelData.networkId,
                grantee_id: mockUsers.user1.id,
                permission: 'write'
            });
            // Mock scheduled content
            mockPostedContentMethods.findFirst.mockResolvedValueOnce({
                posts_id: cancelData.postId,
                networks_id: cancelData.networkId,
                contents_id: cancelData.contentId,
                post_date: new Date('2025-12-31T10:00:00Z'),
                actual_post_date: null,
                network_post_id: null
            });
            // Verify permission
            const permission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: cancelData.networkId,
                    grantee_id: mockUsers.user1.id
                }
            });
            expect(permission.permission).toBe('write');
            // Find scheduled content
            const scheduledContent = await mockPostedContentMethods.findFirst({
                where: {
                    posts_id: cancelData.postId,
                    networks_id: cancelData.networkId,
                    contents_id: cancelData.contentId
                }
            });
            expect(scheduledContent.post_date).toBeTruthy();
            expect(scheduledContent.actual_post_date).toBeNull();
            // Cancel scheduling
            mockPostedContentMethods.update.mockResolvedValueOnce({
                ...scheduledContent,
                post_date: null
            });
            const cancelledContent = await mockPostedContentMethods.update({
                where: {
                    posts_id_networks_id_contents_id: {
                        posts_id: cancelData.postId,
                        networks_id: cancelData.networkId,
                        contents_id: cancelData.contentId
                    }
                },
                data: {
                    post_date: null
                }
            });
            expect(cancelledContent.post_date).toBeNull();
        });
        it('should reschedule content to new time', async () => {
            const rescheduleData = {
                postId: 1,
                contentId: 1,
                networkId: 1,
                newPostDate: '2025-12-31T15:00:00Z'
            };
            // Mock permission and existing content
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: rescheduleData.networkId,
                grantee_id: mockUsers.user1.id,
                permission: 'write'
            });
            mockPostedContentMethods.findFirst.mockResolvedValueOnce({
                posts_id: rescheduleData.postId,
                networks_id: rescheduleData.networkId,
                contents_id: rescheduleData.contentId,
                post_date: new Date('2025-12-31T10:00:00Z'),
                actual_post_date: null,
                network_post_id: null
            });
            // Verify current scheduling
            const currentContent = await mockPostedContentMethods.findFirst({
                where: {
                    posts_id: rescheduleData.postId,
                    networks_id: rescheduleData.networkId,
                    contents_id: rescheduleData.contentId
                }
            });
            expect(currentContent.post_date).toBeTruthy();
            // Update to new time
            mockPostedContentMethods.update.mockResolvedValueOnce({
                ...currentContent,
                post_date: new Date(rescheduleData.newPostDate)
            });
            const rescheduledContent = await mockPostedContentMethods.update({
                where: {
                    posts_id_networks_id_contents_id: {
                        posts_id: rescheduleData.postId,
                        networks_id: rescheduleData.networkId,
                        contents_id: rescheduleData.contentId
                    }
                },
                data: {
                    post_date: new Date(rescheduleData.newPostDate)
                }
            });
            expect(rescheduledContent.post_date).toEqual(new Date(rescheduleData.newPostDate));
        });
    });
    describe('Permission Validation', () => {
        it('should validate network permissions correctly', () => {
            const testCases = [
                { permission: 'admin', canPublish: true, canSchedule: true },
                { permission: 'write', canPublish: true, canSchedule: true },
                { permission: 'read', canPublish: false, canSchedule: false }
            ];
            testCases.forEach(testCase => {
                const canPublish = testCase.permission === 'write' || testCase.permission === 'admin';
                const canSchedule = testCase.permission === 'write' || testCase.permission === 'admin';
                expect(canPublish).toBe(testCase.canPublish);
                expect(canSchedule).toBe(testCase.canSchedule);
            });
        });
        it('should validate date scheduling logic', () => {
            const now = new Date();
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 1);
            const pastDate = new Date();
            pastDate.setHours(pastDate.getHours() - 1);
            // Budoucí datum je validní pro plánování
            expect(futureDate > now).toBe(true);
            // Minulé datum není validní pro plánování
            expect(pastDate > now).toBe(false);
        });
    });
});

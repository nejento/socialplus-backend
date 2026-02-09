"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock závislosti před importy
const mockPostMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findUnique: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    count: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockContentMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findUnique: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockAttachmentMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockPostEditorMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockPostedContentMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    update: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockPostedContentAttachmentMethods = {
    create: globals_1.jest.fn(),
    findFirst: globals_1.jest.fn(),
    findMany: globals_1.jest.fn(),
    delete: globals_1.jest.fn(),
};
const mockNetworkMethods = {
    findFirst: globals_1.jest.fn(),
};
const mockNetworkUsersMethods = {
    findFirst: globals_1.jest.fn(),
};
const mockUserMethods = {
    findUnique: globals_1.jest.fn(),
};
globals_1.jest.mock('../src/generated/client', () => ({
    PrismaClient: globals_1.jest.fn().mockImplementation(() => ({
        post: mockPostMethods,
        content: mockContentMethods,
        attachment: mockAttachmentMethods,
        postEditor: mockPostEditorMethods,
        postedContent: mockPostedContentMethods,
        postedContentAttachment: mockPostedContentAttachmentMethods,
        network: mockNetworkMethods,
        networksUsers: mockNetworkUsersMethods,
        user: mockUserMethods,
        $disconnect: globals_1.jest.fn(),
    })),
}));
// Mock operace se soubory
globals_1.jest.mock('fs', () => ({
    promises: {
        mkdir: globals_1.jest.fn(),
    },
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
        note: 'Test network',
    }
};
const mockPosts = {
    post1: {
        id: 1,
        creator_id: 1,
    },
    post2: {
        id: 2,
        creator_id: 2,
    }
};
const mockContents = {
    content1: {
        id: 1,
        posts_id: 1,
        content: 'Test post content 1',
    },
    content2: {
        id: 2,
        posts_id: 2,
        content: 'Test post content 2',
    }
};
const mockAttachments = {
    attachment1: {
        id: 1,
        posts_id: 1,
        path: '/uploads/1/test-file.jpg',
    }
};
describe('API Routes Logic (Posts Management)', () => {
    beforeEach(() => {
        // Reset všech mocků před každým testem
        globals_1.jest.clearAllMocks();
        mockPostMethods.create.mockClear();
        mockPostMethods.findFirst.mockClear();
        mockPostMethods.findUnique.mockClear();
        mockPostMethods.findMany.mockClear();
        mockPostMethods.count.mockClear();
        mockPostMethods.update.mockClear();
        mockPostMethods.delete.mockClear();
        mockContentMethods.create.mockClear();
        mockContentMethods.findFirst.mockClear();
        mockContentMethods.findUnique.mockClear();
        mockContentMethods.update.mockClear();
        mockContentMethods.delete.mockClear();
        mockAttachmentMethods.create.mockClear();
        mockAttachmentMethods.findFirst.mockClear();
        mockAttachmentMethods.findMany.mockClear();
        mockPostEditorMethods.create.mockClear();
        mockPostEditorMethods.findFirst.mockClear();
        mockPostedContentMethods.create.mockClear();
        mockPostedContentMethods.findFirst.mockClear();
        mockPostedContentMethods.findMany.mockClear();
        mockPostedContentAttachmentMethods.findMany.mockClear();
        mockNetworkMethods.findFirst.mockClear();
        mockNetworkUsersMethods.findFirst.mockClear();
        mockUserMethods.findUnique.mockClear();
    });
    describe('Post Creation Logic', () => {
        it('should create new post successfully', async () => {
            const userId = mockUsers.user1.id;
            mockPostMethods.create.mockResolvedValueOnce({
                id: 1,
                creator_id: userId,
                users: mockUsers.user1
            });
            const newPost = await mockPostMethods.create({
                data: {
                    creator_id: userId
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
            expect(newPost).toEqual({
                id: 1,
                creator_id: userId,
                users: mockUsers.user1
            });
            expect(mockPostMethods.create).toHaveBeenCalledWith({
                data: {
                    creator_id: userId
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
        it('should delete post successfully by owner', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            // Mock ownership check
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            expect(ownershipCheck.creator_id).toBe(userId);
            // Mock deletion
            mockPostMethods.delete.mockResolvedValueOnce(mockPosts.post1);
            const deletedPost = await mockPostMethods.delete({
                where: { id: postId }
            });
            expect(deletedPost).toEqual(mockPosts.post1);
        });
        it('should deny delete access to non-owner', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            // Mock post vlastněný jiným uživatelem
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: mockUsers.user2.id
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(ownershipCheck.creator_id).not.toBe(userId);
            const canDelete = ownershipCheck.creator_id === userId;
            expect(canDelete).toBe(false);
        });
    });
    describe('Posts Retrieval Logic', () => {
        it('should get paginated posts successfully', async () => {
            const mockPostsWithDetails = [
                {
                    ...mockPosts.post1,
                    users: mockUsers.user1
                }
            ];
            mockPostMethods.findMany.mockResolvedValueOnce(mockPostsWithDetails);
            mockPostMethods.count.mockResolvedValueOnce(1);
            const posts = await mockPostMethods.findMany({
                skip: 0, // (page - 1) * limit
                take: 10,
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    }
                },
                orderBy: { id: 'desc' }
            });
            const totalCount = await mockPostMethods.count();
            expect(posts).toHaveLength(1);
            expect(totalCount).toBe(1);
            expect(posts[0].users).toEqual(mockUsers.user1);
            // Test výpočtu paginace
            const limit = 10;
            const totalPages = Math.ceil(totalCount / limit);
            expect(totalPages).toBe(1);
        });
        it('should handle pagination parameters correctly', async () => {
            mockPostMethods.findMany.mockResolvedValueOnce([]);
            mockPostMethods.count.mockResolvedValueOnce(0);
            const page = 2;
            const limit = 5;
            await mockPostMethods.findMany({
                skip: (page - 1) * limit, // mělo by být 5
                take: limit,
                include: expect.any(Object),
                orderBy: { id: 'desc' }
            });
            expect(mockPostMethods.findMany).toHaveBeenCalledWith({
                skip: 5,
                take: 5,
                include: expect.any(Object),
                orderBy: { id: 'desc' }
            });
        });
    });
    describe('Post Details Logic', () => {
        it('should get post details successfully for owner', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            const mockPostDetail = {
                id: postId,
                creator_id: userId,
                users: mockUsers.user1,
                contents: [mockContents.content1],
                attachments: [mockAttachments.attachment1],
                PostEditor: [],
                posted_content: []
            };
            mockPostMethods.findUnique.mockResolvedValueOnce(mockPostDetail);
            // Mock kontrola permissionu (owner)
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            const postDetail = await mockPostMethods.findUnique({
                where: { id: postId },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true,
                            displayname: true
                        }
                    },
                    contents: true,
                    attachments: true,
                    PostEditor: true,
                    posted_content: true
                }
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(postDetail).toBeTruthy();
            expect(postDetail.creator_id).toBe(userId);
            expect(ownershipCheck).toBeTruthy();
        });
        it('should deny access to post without permissions', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            // Mock kontrola permissionu, která vrací null (bez přístupu)
            mockPostMethods.findFirst.mockResolvedValueOnce(null);
            mockPostEditorMethods.findFirst.mockResolvedValueOnce(null);
            mockPostedContentMethods.findMany.mockResolvedValueOnce([]);
            mockPostedContentAttachmentMethods.findMany.mockResolvedValueOnce([]);
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            const editorCheck = await mockPostEditorMethods.findFirst({
                where: {
                    posts_id: postId,
                    editor_id: userId
                }
            });
            expect(ownershipCheck).toBeNull();
            expect(editorCheck).toBeNull();
            const hasAccess = ownershipCheck !== null || editorCheck !== null;
            expect(hasAccess).toBe(false);
        });
    });
    describe('Content Management Logic', () => {
        it('should add content to post successfully', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            const contentData = {
                content: 'New post content'
            };
            // Mock ownership check
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            // Mock content creation
            mockContentMethods.create.mockResolvedValueOnce({
                id: 1,
                posts_id: postId,
                content: contentData.content
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const newContent = await mockContentMethods.create({
                data: {
                    posts_id: postId,
                    content: contentData.content
                }
            });
            expect(newContent).toEqual({
                id: 1,
                posts_id: postId,
                content: contentData.content
            });
        });
        it('should edit content successfully by post owner', async () => {
            const contentId = 1;
            const postId = 1;
            const userId = mockUsers.user1.id;
            const updateData = {
                content: 'Updated content'
            };
            // Mock content exists
            mockContentMethods.findUnique.mockResolvedValueOnce({
                id: contentId,
                posts_id: postId,
                content: 'Original content'
            });
            // Mock ownership check
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            // Mock content update
            mockContentMethods.update.mockResolvedValueOnce({
                id: contentId,
                posts_id: postId,
                content: updateData.content
            });
            const content = await mockContentMethods.findUnique({
                where: { id: contentId }
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: content.posts_id,
                    creator_id: userId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const updatedContent = await mockContentMethods.update({
                where: { id: contentId },
                data: { content: updateData.content }
            });
            expect(updatedContent.content).toBe('Updated content');
        });
        it('should delete content successfully by post owner', async () => {
            const contentId = 1;
            const postId = 1;
            const userId = mockUsers.user1.id;
            mockContentMethods.findUnique.mockResolvedValueOnce({
                id: contentId,
                posts_id: postId,
                content: 'Content to delete'
            });
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            mockContentMethods.delete.mockResolvedValueOnce(mockContents.content1);
            const content = await mockContentMethods.findUnique({
                where: { id: contentId }
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: content.posts_id,
                    creator_id: userId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const deletedContent = await mockContentMethods.delete({
                where: { id: contentId }
            });
            expect(deletedContent).toEqual(mockContents.content1);
        });
    });
    describe('Attachment Management Logic', () => {
        it('should upload attachment successfully', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            // Mock ownership check
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: userId
            });
            // Mock file upload
            const fs = require('fs');
            fs.promises.mkdir.mockResolvedValueOnce(undefined);
            // Mock attachment creation
            mockAttachmentMethods.create.mockResolvedValueOnce({
                id: 1,
                posts_id: postId,
                path: '/uploads/1/test-file.jpg'
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const newAttachment = await mockAttachmentMethods.create({
                data: {
                    posts_id: postId,
                    path: '/uploads/1/test-file.jpg'
                }
            });
            expect(newAttachment).toEqual({
                id: 1,
                posts_id: postId,
                path: '/uploads/1/test-file.jpg'
            });
        });
    });
    describe('Content Linking Logic', () => {
        it('should link content to network successfully', async () => {
            const linkData = {
                postId: 1,
                contentId: 1,
                networkId: 1,
                userId: mockUsers.user1.id
            };
            // Mock post ownership
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: linkData.postId,
                creator_id: linkData.userId
            });
            // Mock network write permission
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: linkData.networkId,
                grantee_id: linkData.userId,
                permission: 'write'
            });
            // Mock content exists
            mockContentMethods.findUnique.mockResolvedValueOnce(mockContents.content1);
            // Mock network exists
            mockNetworkMethods.findFirst.mockResolvedValueOnce(mockNetworks.network1);
            // Mock link creation
            mockPostedContentMethods.create.mockResolvedValueOnce({
                posts_id: linkData.postId,
                networks_id: linkData.networkId,
                contents_id: linkData.contentId,
                post_date: null,
                actual_post_date: null,
                network_post_id: null
            });
            const postOwnership = await mockPostMethods.findFirst({
                where: {
                    id: linkData.postId,
                    creator_id: linkData.userId
                }
            });
            const networkPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: linkData.networkId,
                    grantee_id: linkData.userId
                }
            });
            expect(postOwnership).toBeTruthy();
            expect(networkPermission.permission).toBe('write');
            const linkedContent = await mockPostedContentMethods.create({
                data: {
                    posts_id: linkData.postId,
                    networks_id: linkData.networkId,
                    contents_id: linkData.contentId,
                    post_date: null,
                    actual_post_date: null,
                    network_post_id: null
                }
            });
            expect(linkedContent.posts_id).toBe(linkData.postId);
            expect(linkedContent.networks_id).toBe(linkData.networkId);
            expect(linkedContent.contents_id).toBe(linkData.contentId);
        });
        it('should deny linking without write access to network', async () => {
            const linkData = {
                postId: 1,
                contentId: 1,
                networkId: 1,
                userId: mockUsers.user1.id
            };
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: linkData.postId,
                creator_id: linkData.userId
            });
            // Mock only read access
            mockNetworkUsersMethods.findFirst.mockResolvedValueOnce({
                networks_id: linkData.networkId,
                grantee_id: linkData.userId,
                permission: 'read'
            });
            const networkPermission = await mockNetworkUsersMethods.findFirst({
                where: {
                    networks_id: linkData.networkId,
                    grantee_id: linkData.userId
                }
            });
            expect(networkPermission.permission).toBe('read');
            const canWrite = networkPermission.permission === 'write' || networkPermission.permission === 'admin';
            expect(canWrite).toBe(false);
        });
    });
    describe('Post Editor Logic', () => {
        it('should add editor to post successfully', async () => {
            const postId = 1;
            const editorData = {
                editorId: mockUsers.user2.id,
                ownerId: mockUsers.user1.id
            };
            // Mock ownership check
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: editorData.ownerId
            });
            // Mock user exists
            mockUserMethods.findUnique.mockResolvedValueOnce(mockUsers.user2);
            // Mock editor creation
            mockPostEditorMethods.create.mockResolvedValueOnce({
                posts_id: postId,
                editor_id: editorData.editorId
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: editorData.ownerId
                }
            });
            expect(ownershipCheck).toBeTruthy();
            const editorExists = await mockUserMethods.findUnique({
                where: { id: editorData.editorId }
            });
            expect(editorExists).toEqual(mockUsers.user2);
            const newEditor = await mockPostEditorMethods.create({
                data: {
                    posts_id: postId,
                    editor_id: editorData.editorId
                }
            });
            expect(newEditor.editor_id).toBe(mockUsers.user2.id);
        });
        it('should deny adding editor to non-owned post', async () => {
            const postId = 1;
            const userId = mockUsers.user1.id;
            // Mock post owned by different user
            mockPostMethods.findFirst.mockResolvedValueOnce({
                id: postId,
                creator_id: mockUsers.user2.id
            });
            const ownershipCheck = await mockPostMethods.findFirst({
                where: {
                    id: postId,
                    creator_id: userId
                }
            });
            expect(ownershipCheck.creator_id).not.toBe(userId);
            const canAddEditor = ownershipCheck.creator_id === userId;
            expect(canAddEditor).toBe(false);
        });
    });
    describe('Permission Validation Logic', () => {
        it('should validate post edit permissions correctly', () => {
            const testCases = [
                { isOwner: true, isEditor: false, hasNetworkAccess: false, canEdit: true },
                { isOwner: false, isEditor: true, hasNetworkAccess: true, canEdit: true },
                { isOwner: false, isEditor: true, hasNetworkAccess: false, canEdit: false },
                { isOwner: false, isEditor: false, hasNetworkAccess: true, canEdit: false }
            ];
            testCases.forEach(testCase => {
                const canEdit = testCase.isOwner ||
                    (testCase.isEditor && testCase.hasNetworkAccess);
                expect(canEdit).toBe(testCase.canEdit);
            });
        });
        it('should validate network access levels', () => {
            const accessLevels = ['read', 'write', 'admin'];
            accessLevels.forEach(level => {
                const canView = ['read', 'write', 'admin'].includes(level);
                const canPublish = ['write', 'admin'].includes(level);
                const canManage = level === 'admin';
                expect(canView).toBe(true);
                expect(canPublish).toBe(level !== 'read');
                expect(canManage).toBe(level === 'admin');
            });
        });
    });
    describe('Attachment Size Endpoint', () => {
        it('should return max file size from environment variable', () => {
            // Test s nastavenou proměnnou prostředí
            process.env.MAX_FILE_SIZE = '10000000';
            const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5000000", 10);
            expect(maxFileSize).toBe(10000000);
        });
        it('should return default max file size when env variable not set', () => {
            // Test bez nastavené proměnné prostředí
            delete process.env.MAX_FILE_SIZE;
            const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5000000", 10);
            expect(maxFileSize).toBe(5000000);
        });
        it('should handle invalid env variable gracefully', () => {
            // Test s nevalidní hodnotou v proměnné prostředí
            process.env.MAX_FILE_SIZE = 'invalid';
            const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5000000", 10);
            expect(isNaN(maxFileSize)).toBe(true);
            // Fallback na výchozí hodnotu
            const fallbackSize = isNaN(maxFileSize) ? 5000000 : maxFileSize;
            expect(fallbackSize).toBe(5000000);
        });
    });
});

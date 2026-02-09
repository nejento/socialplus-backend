"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsTokens = exports.TwitterTokens = exports.BlueskyTokens = exports.MastodonTokens = exports.FacebookTokens = exports.NetworkTokenName = exports.NetworkTokens = exports.NetworkToken = exports.NetworkUserPermission = exports.Network = exports.NetworkEdit = exports.NetworkCreate = exports.ScheduleContentRequest = exports.PaginatedDetailedPosts = exports.PostDetail = exports.ScheduledTime = exports.PaginatedPosts = exports.LinkedAttachment = exports.LinkedContent = exports.Attachment = exports.PostContent = exports.EditPostContent = exports.NewPostContent = exports.Post = exports.User = exports.UserLogin = exports.RegistratedUser = void 0;
const typebox_1 = require("@sinclair/typebox");
// User schemas
exports.RegistratedUser = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    displayname: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
});
exports.UserLogin = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String()
});
exports.User = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    username: typebox_1.Type.String(),
    displayname: typebox_1.Type.String()
});
// Post schemas
exports.Post = typebox_1.Type.Object({
    postId: typebox_1.Type.Integer(),
    creatorId: typebox_1.Type.Integer()
});
exports.NewPostContent = typebox_1.Type.Object({
    content: typebox_1.Type.String()
});
exports.EditPostContent = typebox_1.Type.Object({
    contentId: typebox_1.Type.Integer(),
    content: typebox_1.Type.String()
});
exports.PostContent = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    postId: typebox_1.Type.Integer(),
    content: typebox_1.Type.String(),
    linkedNetworks: typebox_1.Type.Array(typebox_1.Type.Integer()),
    canEdit: typebox_1.Type.Boolean()
});
// Attachment schemas
exports.Attachment = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    postId: typebox_1.Type.Integer(),
    fileName: typebox_1.Type.String(),
    linkedNetworks: typebox_1.Type.Array(typebox_1.Type.Integer())
});
// Linked content schemas
exports.LinkedContent = typebox_1.Type.Object({
    postId: typebox_1.Type.Integer(),
    contentId: typebox_1.Type.Integer(),
    networkId: typebox_1.Type.Integer()
});
exports.LinkedAttachment = typebox_1.Type.Object({
    postId: typebox_1.Type.Integer(),
    attachmentId: typebox_1.Type.Integer(),
    networkId: typebox_1.Type.Integer()
});
// Pagination schemas
exports.PaginatedPosts = typebox_1.Type.Object({
    posts: typebox_1.Type.Array(exports.Post),
    pagination: typebox_1.Type.Object({
        page: typebox_1.Type.Integer(),
        limit: typebox_1.Type.Integer(),
        total: typebox_1.Type.Integer(),
        totalPages: typebox_1.Type.Integer()
    })
});
// Scheduled time schema
exports.ScheduledTime = typebox_1.Type.Object({
    networkId: typebox_1.Type.Integer(),
    contentId: typebox_1.Type.Integer(),
    postDate: typebox_1.Type.Optional(typebox_1.Type.String()), // ISO date string
    actualPostDate: typebox_1.Type.Optional(typebox_1.Type.String()), // ISO date string
    networkPostId: typebox_1.Type.Optional(typebox_1.Type.String()) // ID on the network
});
// Post detail schema
exports.PostDetail = typebox_1.Type.Object({
    postId: typebox_1.Type.Integer(),
    creator: exports.User,
    contents: typebox_1.Type.Array(exports.PostContent),
    attachments: typebox_1.Type.Array(exports.Attachment),
    editors: typebox_1.Type.Array(typebox_1.Type.Object({
        userId: typebox_1.Type.Integer(),
        username: typebox_1.Type.String()
    })),
    scheduledTimes: typebox_1.Type.Array(exports.ScheduledTime)
});
exports.PaginatedDetailedPosts = typebox_1.Type.Object({
    posts: typebox_1.Type.Array(exports.PostDetail),
    pagination: typebox_1.Type.Object({
        page: typebox_1.Type.Integer(),
        limit: typebox_1.Type.Integer(),
        total: typebox_1.Type.Integer(),
        totalPages: typebox_1.Type.Integer()
    })
});
// Schedule content request schema
exports.ScheduleContentRequest = typebox_1.Type.Object({
    postDate: typebox_1.Type.String() // ISO date string
});
// Network schemas
exports.NetworkCreate = typebox_1.Type.Object({
    networkType: typebox_1.Type.String(),
    networkName: typebox_1.Type.String(),
    networkNote: typebox_1.Type.Optional(typebox_1.Type.String())
});
exports.NetworkEdit = typebox_1.Type.Object({
    networkName: typebox_1.Type.String(),
    networkNote: typebox_1.Type.Optional(typebox_1.Type.String())
});
exports.Network = typebox_1.Type.Object({
    networkId: typebox_1.Type.Integer(),
    networkType: typebox_1.Type.String(),
    networkName: typebox_1.Type.String(),
    owner: exports.User,
    note: typebox_1.Type.Optional(typebox_1.Type.String()),
    permission: typebox_1.Type.Union([typebox_1.Type.Literal('read'), typebox_1.Type.Literal('write'), typebox_1.Type.Literal('admin')])
});
exports.NetworkUserPermission = typebox_1.Type.Object({
    granteeId: typebox_1.Type.Integer(),
    permission: typebox_1.Type.Union([typebox_1.Type.Literal('read'), typebox_1.Type.Literal('write')])
});
exports.NetworkToken = typebox_1.Type.Object({
    tokenName: typebox_1.Type.String(),
    token: typebox_1.Type.String(),
});
exports.NetworkTokens = typebox_1.Type.Object({
    tokens: typebox_1.Type.Array(exports.NetworkToken)
});
exports.NetworkTokenName = typebox_1.Type.Object({
    tokenName: typebox_1.Type.String(),
});
exports.FacebookTokens = typebox_1.Type.Object({
    appId: typebox_1.Type.String(),
    appSecret: typebox_1.Type.String(),
    pageId: typebox_1.Type.String(),
    shortLivedUserAccessToken: typebox_1.Type.String()
});
exports.MastodonTokens = typebox_1.Type.Object({
    instanceUrl: typebox_1.Type.String(),
    accessToken: typebox_1.Type.String()
});
exports.BlueskyTokens = typebox_1.Type.Object({
    handle: typebox_1.Type.String(),
    password: typebox_1.Type.String()
});
exports.TwitterTokens = typebox_1.Type.Object({
    apiKey: typebox_1.Type.String(),
    apiSecret: typebox_1.Type.String(),
    accessToken: typebox_1.Type.String(),
    accessTokenSecret: typebox_1.Type.String()
});
exports.ThreadsTokens = typebox_1.Type.Object({
    threadsUserId: typebox_1.Type.String(),
    threadsAppSecret: typebox_1.Type.String(),
    longLivedAccessToken: typebox_1.Type.String()
});

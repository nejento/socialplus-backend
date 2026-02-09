import { Static, Type } from "@sinclair/typebox";

// User schemas
export const RegistratedUser = Type.Object({
    username: Type.String(),
    displayname: Type.String(),
    password: Type.String(),
})
export type RegistratedUserType = Static<typeof RegistratedUser>

export const UserLogin = Type.Object({
    username: Type.String(),
    password: Type.String()
})
export type UserLoginType = Static<typeof UserLogin>

export const User = Type.Object({
    id: Type.Integer(),
    username: Type.String(),
    displayname: Type.String()
});
export type UserType = Static<typeof User>

// Post schemas
export const Post = Type.Object({
    postId: Type.Integer(),
    creatorId: Type.Integer()
})
export type PostType = Static<typeof Post>;

export const NewPostContent = Type.Object({
    content: Type.String()
})
export type NewPostContentType = Static<typeof NewPostContent>;

export const EditPostContent = Type.Object({
    contentId: Type.Integer(),
    content: Type.String()
})
export type EditPostContentType = Static<typeof EditPostContent>;

export const PostContent = Type.Object({
    id: Type.Integer(),
    postId: Type.Integer(),
    content: Type.String(),
    linkedNetworks: Type.Array(Type.Integer()),
    canEdit: Type.Boolean()
})
export type PostContentType = Static<typeof PostContent>;

// Attachment schemas
export const Attachment = Type.Object({
    id: Type.Integer(),
    postId: Type.Integer(),
    fileName: Type.String(),
    linkedNetworks: Type.Array(Type.Integer())
})
export type AttachmentType = Static<typeof Attachment>;

// Linked content schemas
export const LinkedContent = Type.Object({
    postId: Type.Integer(),
    contentId: Type.Integer(),
    networkId: Type.Integer()
})
export type LinkedContentType = Static<typeof LinkedContent>;

export const LinkedAttachment = Type.Object({
    postId: Type.Integer(),
    attachmentId: Type.Integer(),
    networkId: Type.Integer()
})
export type LinkedAttachmentType = Static<typeof LinkedAttachment>;

// Pagination schemas
export const PaginatedPosts = Type.Object({
    posts: Type.Array(Post),
    pagination: Type.Object({
        page: Type.Integer(),
        limit: Type.Integer(),
        total: Type.Integer(),
        totalPages: Type.Integer()
    })
})
export type PaginatedPostsType = Static<typeof PaginatedPosts>;

// Scheduled time schema
export const ScheduledTime = Type.Object({
    networkId: Type.Integer(),
    contentId: Type.Integer(),
    postDate: Type.Optional(Type.String()), // ISO date string
    actualPostDate: Type.Optional(Type.String()), // ISO date string
    networkPostId: Type.Optional(Type.String()) // ID on the network
})
export type ScheduledTimeType = Static<typeof ScheduledTime>;

// Post detail schema
export const PostDetail = Type.Object({
    postId: Type.Integer(),
    creator: User,
    contents: Type.Array(PostContent),
    attachments: Type.Array(Attachment),
    editors: Type.Array(Type.Object({
        userId: Type.Integer(),
        username: Type.String()
    })),
    scheduledTimes: Type.Array(ScheduledTime)
});
export type PostDetailType = Static<typeof PostDetail>;

export const PaginatedDetailedPosts = Type.Object({
    posts: Type.Array(PostDetail),
    pagination: Type.Object({
        page: Type.Integer(),
        limit: Type.Integer(),
        total: Type.Integer(),
        totalPages: Type.Integer()
    })
})
export type PaginatedDetailedPostsType = Static<typeof PaginatedDetailedPosts>;

// Schedule content request schema
export const ScheduleContentRequest = Type.Object({
    postDate: Type.String() // ISO date string
});
export type ScheduleContentRequestType = Static<typeof ScheduleContentRequest>;

// Network schemas
export const NetworkCreate = Type.Object({
    networkType: Type.String(),
    networkName: Type.String(),
    networkNote: Type.Optional(Type.String())
})
export type NetworkCreateType = Static<typeof NetworkCreate>;

export const NetworkEdit = Type.Object({
    networkName: Type.String(),
    networkNote: Type.Optional(Type.String())
})
export type NetworkEditType = Static<typeof NetworkEdit>;

export const Network = Type.Object({
    networkId: Type.Integer(),
    networkType: Type.String(),
    networkName: Type.String(),
    owner: User,
    note: Type.Optional(Type.String()),
    permission: Type.Union([Type.Literal('read'), Type.Literal('write'), Type.Literal('admin')])
});
export type NetworkType = Static<typeof Network>;

export const NetworkUserPermission = Type.Object({
    granteeId: Type.Integer(),
    permission: Type.Union([Type.Literal('read'), Type.Literal('write')])
});
export type NetworkUserPermissionType = Static<typeof NetworkUserPermission>;

export const NetworkToken = Type.Object({
    tokenName: Type.String(),
    token: Type.String(),
});
export type NetworkTokenType = Static<typeof NetworkToken>;

export const NetworkTokens = Type.Object({
    tokens: Type.Array(NetworkToken)
});
export type NetworkTokensType = Static<typeof NetworkTokens>;

export const NetworkTokenName = Type.Object({
    tokenName: Type.String(),
});
export type NetworkTokenNameType = Static<typeof NetworkTokenName>;

export const FacebookTokens = Type.Object({
    appId: Type.String(),
    appSecret: Type.String(),
    pageId: Type.String(),
    shortLivedUserAccessToken: Type.String()
});
export type FacebookTokensType = Static<typeof FacebookTokens>;

export const MastodonTokens = Type.Object({
    instanceUrl: Type.String(),
    accessToken: Type.String()
});
export type MastodonTokensType = Static<typeof MastodonTokens>;

export const BlueskyTokens = Type.Object({
    handle: Type.String(),
    password: Type.String()
});
export type BlueskyTokensType = Static<typeof BlueskyTokens>;

export const TwitterTokens = Type.Object({
    apiKey: Type.String(),
    apiSecret: Type.String(),
    accessToken: Type.String(),
    accessTokenSecret: Type.String()
});
export type TwitterTokensType = Static<typeof TwitterTokens>;

export const ThreadsTokens = Type.Object({
    threadsUserId: Type.String(),
    threadsAppSecret: Type.String(),
    longLivedAccessToken: Type.String()
});
export type ThreadsTokensType = Static<typeof ThreadsTokens>;

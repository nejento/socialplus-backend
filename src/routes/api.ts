import { FastifyInstance } from "fastify";
import { PrismaClient } from "../generated/client";
import { promises as fsPromises, constants, createReadStream } from 'fs';
import { Type } from '@sinclair/typebox';
import path from "node:path";
import { SocialNetworkProviderFactory } from "../social/SocialNetworkProviderFactory";
import {
    hasPostPermission,
    isAuthenticated,
    isPostOwner,
    canViewContent,
    canViewAttachment,
    hasNetworkWriteAccess,
    canScheduleContent,
    canDeleteContent,
    canEditContent,
    hasNetworkReadAccess
} from "../utils/helpers";
import {
    Post, PostType,
    NewPostContent, NewPostContentType,
    EditPostContent, EditPostContentType,
    PostContent, PostContentType,
    Attachment, AttachmentType,
    LinkedContent, LinkedContentType,
    LinkedAttachment, LinkedAttachmentType,
    PaginatedPosts, PaginatedPostsType,
    ScheduledTime, ScheduledTimeType,
    PostDetail, PostDetailType,
    PaginatedDetailedPosts, PaginatedDetailedPostsType,
    ScheduleContentRequest, ScheduleContentRequestType
} from "../types/schemas";
import { prisma } from "../utils/prisma";


interface IReply {
    200: { success: boolean; message: string };
    302: { url: string };
    400: { error: string };
    401: { error: string };
    '4xx': { error: string };
    '5xx': { error: string };
}

/**
 * Registruje všechny API routes pro práci s příspěvky
 * @param fastify - Instance Fastify serveru
 */
async function routes (fastify: FastifyInstance /*, options: any*/) {

    /**
     * Pomocná funkce pro získání detailních informací o příspěvku
     * Kontroluje oprávnění uživatele a filtruje obsah podle přístupových práv
     * @param postId - ID příspěvku
     * @param userId - ID uživatele požadujícího informace
     * @returns Detailní informace o příspěvku nebo null pokud nemá přístup
     */
    async function getPostDetail(postId: number, userId: number): Promise<PostDetailType | null> {
        try {
            // Kontroluje, zda příspěvek existuje a získá základní informace s detaily tvůrce
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
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

            if (!post) {
                return null;
            }

            // Kontroluje základní přístup k příspěvku - uživatel musí být vlastník nebo editor
            const hasBasicAccess = await hasPostPermission(postId, userId);

            // Pokud uživatel není vlastník/editor, kontroluje, zda má přístup přes oprávnění ke čtení sítě
            let hasNetworkAccess = false;
            if (!hasBasicAccess) {
                // Získá všechny sítě propojené s tímto příspěvkem
                const linkedNetworks = await prisma.postedContent.findMany({
                    where: {
                        posts_id: postId
                    },
                    select: {
                        networks_id: true
                    }
                });

                const linkedAttachmentNetworks = await prisma.postedContentAttachment.findMany({
                    where: {
                        posts_id: postId
                    },
                    select: {
                        networks_id: true
                    }
                });

                // Kombinuje všechna ID sítí
                const allNetworkIds = [
                    ...linkedNetworks.map(ln => ln.networks_id),
                    ...linkedAttachmentNetworks.map(lan => lan.networks_id)
                ];

                const uniqueNetworkIds = [...new Set(allNetworkIds)];

                // Kontroluje, zda má uživatel přístup ke čtení kterékoliv z těchto sítí
                for (const networkId of uniqueNetworkIds) {
                    const hasReadAccess = await hasNetworkReadAccess(networkId, userId!);
                    if (hasReadAccess) {
                        hasNetworkAccess = true;
                        break;
                    }
                }
            }

            // Pokud uživatel nemá základní přístup ani přístup k síti, vrátí null
            if (!hasBasicAccess && !hasNetworkAccess) {
                return null;
            }

            // Získá všechny obsahy pro tento příspěvek a filtruje podle oprávnění
            const allContents = await prisma.content.findMany({
                where: {
                    posts_id: postId
                }
            });

            const allowedContents = [];
            for (const content of allContents) {
                let canView = await canViewContent(content.id, userId!);

                // Pokud uživatel nemůže zobrazit přes standardní oprávnění, kontroluje přístup ke čtení propojených sítí
                if (!canView) {
                    const linkedNetworks = await prisma.postedContent.findMany({
                        where: {
                            contents_id: content.id,
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    // Kontroluje, zda má uživatel přístup ke čtení kterékoliv propojené sítě
                    for (const link of linkedNetworks) {
                        const hasReadAccess = await hasNetworkReadAccess(link.networks_id, userId!);
                        if (hasReadAccess) {
                            canView = true;
                            break;
                        }
                    }
                }

                if (canView) {
                    // Kontroluje, zda může uživatel editovat tento obsah
                    const canEdit = await canEditContent(content.id, userId!);

                    // Získá propojené sítě pro tento obsah
                    const linkedNetworks = await prisma.postedContent.findMany({
                        where: {
                            contents_id: content.id,
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    allowedContents.push({
                        id: content.id,
                        postId: content.posts_id,
                        content: content.content,
                        linkedNetworks: linkedNetworks.map(ln => ln.networks_id),
                        canEdit: canEdit
                    });
                }
            }

            // Získá všechny přílohy pro tento příspěvek a filtruje podle oprávnění
            const allAttachments = await prisma.attachment.findMany({
                where: {
                    posts_id: postId
                }
            });

            const allowedAttachments = [];
            for (const attachment of allAttachments) {
                let canView = await canViewAttachment(attachment.id, userId!);

                // Pokud uživatel nemůže zobrazit přes standardní oprávnění, kontroluje přístup ke čtení propojených sítí
                if (!canView) {
                    const linkedNetworks = await prisma.postedContentAttachment.findMany({
                        where: {
                            attachments_id: attachment.id,
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    // Kontroluje, zda má uživatel přístup ke čtení kterékoliv propojené sítě
                    for (const link of linkedNetworks) {
                        const hasReadAccess = await hasNetworkReadAccess(link.networks_id, userId!);
                        if (hasReadAccess) {
                            canView = true;
                            break;
                        }
                    }
                }

                if (canView) {
                    // Kontroluje, zda soubor existuje na disku
                    const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.path));
                    try {
                        await fsPromises.access(filePath, constants.R_OK);

                        // Získá propojené sítě pro tuto přílohu
                        const linkedNetworks = await prisma.postedContentAttachment.findMany({
                            where: {
                                attachments_id: attachment.id,
                                posts_id: postId
                            },
                            select: {
                                networks_id: true
                            }
                        });

                        allowedAttachments.push({
                            id: attachment.id,
                            postId: attachment.posts_id,
                            fileName: attachment.path,
                            linkedNetworks: linkedNetworks.map(ln => ln.networks_id)
                        });
                    } catch (err) {
                        // Soubor neexistuje na disku, přeskočí ho
                        fastify.log.error(err);
                    }
                }
            }

            // Získá informace o editorech příspěvku
            const postEditors = await prisma.postEditor.findMany({
                where: {
                    posts_id: postId
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            });

            const editors = postEditors.map(pe => ({
                userId: pe.users.id,
                username: pe.users.username
            }));

            // Získá naplánované časy pro obsahy, které může uživatel zobrazit
            const scheduledTimes = [];
            const allowedContentIds = allowedContents.map(c => c.id);

            if (allowedContentIds.length > 0) {
                const postedContents = await prisma.postedContent.findMany({
                    where: {
                        posts_id: postId,
                        contents_id: {
                            in: allowedContentIds
                        }
                    }
                });

                for (const pc of postedContents) {
                    scheduledTimes.push({
                        networkId: pc.networks_id,
                        contentId: pc.contents_id,
                        postDate: pc.post_date?.toISOString(),
                        actualPostDate: pc.actual_post_date?.toISOString(),
                        networkPostId: pc.network_post_id || undefined
                    });
                }
            }

            // Odstraní problematickou kontrolu - uživatel má přístup k příspěvku i když nemá žádný obsah/přílohy
            // Nyní vrátí data příspěvku (i když jsou prázdná pro nové příspěvky)
            return {
                postId: post.id,
                creator: {
                    id: post.users.id,
                    username: post.users.username,
                    displayname: post.users.displayname
                },
                contents: allowedContents,
                attachments: allowedAttachments,
                editors: editors,
                scheduledTimes: scheduledTimes
            };

        } catch (error) {
            fastify.log.error(error);
            throw error;
        }
    }

    /**
     * Vytvoří nový prázdný příspěvek
     * @route POST /post/create
     * @returns Základní informace o vytvořeném příspěvku
     */
    fastify.post<{ Reply: PostType | IReply}>(
        '/post/create',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Vytvoření nového příspěvku',
                tags: ['post'],
                response: {
                    200: Post
                },
            },
        },
        async (request, reply) => {
            const post = await prisma.post.create({
                data: {
                    creator_id: request.session.userId!,
                },
            });
            reply.status(200).send({
                postId: post.id,
                creatorId: post.creator_id
            });
        }
    );

    /**
     * Vytvoří nový obsah pro existující příspěvek
     * @route POST /post/:postId/newcontent
     * @param request.params.postId - ID příspěvku
     * @param request.body.content - Textový obsah
     * @returns Informace o vytvořeném obsahu
     */
    fastify.post<{ Params: { postId: number }, Body: NewPostContentType, Reply: PostContentType | IReply }>(
        '/post/:postId/newcontent',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Vytvoření nového obsahu příspěvku',
                tags: ['post'],
                body: NewPostContent,
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: PostContent
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId } = request.params;
                const { content } = request.body;

                const hasPermission = await hasPostPermission(postId, request.session.userId!);
                if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

                const newContent = await prisma.content.create({
                    data: {
                        posts_id: postId,
                        content: content
                    },
                });

                // Získá propojené sítě pro tento obsah
                const linkedNetworks = await prisma.postedContent.findMany({
                    where: {
                        contents_id: newContent.id,
                        posts_id: postId
                    },
                    select: {
                        networks_id: true
                    }
                });

                // Kontroluje, zda může uživatel editovat tento nový obsah
                const canEdit = await canEditContent(newContent.id, request.session.userId!);

                reply.status(200).send({
                    id: newContent.id,
                    postId: postId,
                    content: content,
                    linkedNetworks: linkedNetworks.map(ln => ln.networks_id),
                    canEdit: canEdit
                });
            } catch (e) {
                fastify.log.error(e);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Edituje obsah příspěvku
     * Složitá logika oprávnění: tvůrce/editor může editovat přímo, vlastník sítě může editovat s omezeními
     * @route PUT /post/:postId/editcontent
     * @param request.params.postId - ID příspěvku
     * @param request.body.contentId - ID obsahu k editaci
     * @param request.body.content - Nový textový obsah
     * @returns Aktualizovaný obsah nebo nově vytvořený obsah při částečných oprávněních
     */
    fastify.put<{ Params: { postId: number }, Body: EditPostContentType, Reply: PostContentType | IReply }>(
        '/post/:postId/editcontent',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Editace obsahu příspěvku',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                body: EditPostContent,
                response: {
                    200: PostContent
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId } = request.params;
                const { contentId, content } = request.body;
                const userId = request.session.userId!;

                // Zkontroluje, zda obsah příspěvku existuje
                const existingContent = await prisma.content.findFirst({
                    where: {
                        id: contentId,
                        posts_id: postId
                    }
                });
                if (!existingContent) return reply.status(400).send({ error: 'Post content not found' });

                // Kontroluje oprávnění uživatele - tři typy uživatelů mohou editovat:
                // 1. Tvůrce/editor příspěvku
                const hasPostAccess = await hasPostPermission(postId, userId);

                // 2. Vlastník sítě - kontroluje, zda uživatel vlastní nějakou síť kde je tento obsah linkován
                let isNetworkOwner = false;
                const linkedNetworks = await prisma.postedContent.findMany({
                    where: {
                        contents_id: contentId,
                        posts_id: postId
                    }
                });

                for (const link of linkedNetworks) {
                    const network = await prisma.network.findFirst({
                        where: {
                            id: link.networks_id,
                            owner_id: userId
                        }
                    });
                    if (network) {
                        isNetworkOwner = true;
                        break;
                    }
                }

                // Kontroluje, zda má uživatel jakékoliv oprávnění k editaci
                if (!hasPostAccess && !isNetworkOwner) {
                    return reply.status(403).send({ error: 'Not authorized to edit this content' });
                }

                // Pokud je uživatel tvůrcem/editorem příspěvku, může editovat normálně
                if (hasPostAccess) {
                    const updatedContent = await prisma.content.update({
                        where: {
                            id: contentId
                        },
                        data: {
                            content: content
                        }
                    });

                    // Získá aktuální linkované sítě
                    const currentLinkedNetworks = await prisma.postedContent.findMany({
                        where: {
                            contents_id: contentId,
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    // Kontroluje, zda může uživatel editovat tento obsah
                    const canEdit = await canEditContent(updatedContent.id, request.session.userId!);

                    return reply.status(200).send({
                        id: updatedContent.id,
                        postId: postId,
                        content: content,
                        linkedNetworks: currentLinkedNetworks.map(ln => ln.networks_id),
                        canEdit: canEdit
                    });
                }

                // Pokud je uživatel vlastníkem sítě ale ne editorem příspěvku, potřebuje speciální handling
                if (isNetworkOwner) {
                    // Kontroluje ke kterým sítům má editující uživatel přístup
                    const userAccessibleNetworks: number[] = [];
                    for (const link of linkedNetworks) {
                        // Kontroluje, zda je uživatel vlastníkem sítě
                        const network = await prisma.network.findFirst({
                            where: {
                                id: link.networks_id,
                                owner_id: userId
                            }
                        });

                        if (network) {
                            userAccessibleNetworks.push(link.networks_id);
                            continue;
                        }

                        // Kontroluje, zda má uživatel write oprávnění
                        const networkAccess = await prisma.networksUsers.findFirst({
                            where: {
                                networks_id: link.networks_id,
                                grantee_id: userId,
                                permission: {
                                    in: ['write']
                                }
                            }
                        });

                        if (networkAccess) {
                            userAccessibleNetworks.push(link.networks_id);
                        }
                    }

                    // Pokud má uživatel přístup ke všem sítím, edituje normálně
                    const allNetworkIds = linkedNetworks.map(ln => ln.networks_id);
                    const hasAccessToAll = allNetworkIds.every(networkId =>
                        userAccessibleNetworks.includes(networkId)
                    );

                    if (hasAccessToAll) {
                        const updatedContent = await prisma.content.update({
                            where: {
                                id: contentId
                            },
                            data: {
                                content: content
                            }
                        });

                        // Kontroluje, zda může uživatel editovat tento obsah
                        const canEdit = await canEditContent(updatedContent.id, request.session.userId!);

                        return reply.status(200).send({
                            id: updatedContent.id,
                            postId: postId,
                            content: content,
                            linkedNetworks: allNetworkIds,
                            canEdit: canEdit
                        });
                    }

                    // Uživatel nemá přístup ke všem sítím - vytvoří nový obsah
                    // a linkuje pouze k dostupným sítím
                    if (userAccessibleNetworks.length === 0) {
                        return reply.status(403).send({
                            error: 'You do not have access to any networks this content is linked to'
                        });
                    }

                    // Vytvoří nový obsah s editovaným textem
                    const newContent = await prisma.content.create({
                        data: {
                            posts_id: postId,
                            content: content
                        }
                    });

                    // Odstraní staré síťové linky pro sítě ke kterým má uživatel přístup
                    await prisma.postedContent.deleteMany({
                        where: {
                            contents_id: contentId,
                            posts_id: postId,
                            networks_id: {
                                in: userAccessibleNetworks
                            }
                        }
                    });

                    // Linkuje nový obsah k uživatelovým dostupným sítím
                    for (const networkId of userAccessibleNetworks) {
                        await prisma.postedContent.create({
                            data: {
                                posts_id: postId,
                                contents_id: newContent.id,
                                networks_id: networkId
                            }
                        });
                    }

                    // Kontroluje, zda může uživatel editovat tento nový obsah
                    const canEdit = await canEditContent(newContent.id, request.session.userId!);

                    return reply.status(200).send({
                        id: newContent.id,
                        postId: postId,
                        content: content,
                        linkedNetworks: userAccessibleNetworks,
                        canEdit: canEdit
                    });
                }

                // Toto by se nikdy nemělo stát, ale pro jistotu
                return reply.status(403).send({ error: 'Not authorized to edit this content' });

            } catch (e) {
                fastify.log.error(e);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Získá seznam příspěvků kde je uživatel přiřazen jako editor
     * @route GET /post/editorlist
     * @param request.query.page - Číslo stránky (výchozí 1)
     * @param request.query.limit - Počet příspěvků na stránku (výchozí 10, maximum 100)
     * @returns Stránkovaný seznam příspěvků kde je uživatel editorem
     */
    fastify.get<{ Querystring: { page?: number, limit?: number }, Reply: PaginatedPostsType | IReply }>(
        '/post/editorlist',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Seznam příspěvků kde je uživatel přiřazen jako editor s stránkováním',
                tags: ['post'],
                querystring: Type.Object({
                    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
                    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 }))
                }),
                response: {
                    200: PaginatedPosts
                },
            },
        },
        async (request, reply) => {
            const page = request.query.page || 1;
            const limit = request.query.limit || 10;
            const skip = (page - 1) * limit;

            // Získá celkový počet pro stránkování - počítá příspěvky kde je uživatel editorem
            const totalPosts = await prisma.postEditor.count({
                where: {
                    editor_id: request.session.userId!
                }
            });

            // Získá příspěvky kde je uživatel přiřazen jako editor
            const postEditors = await prisma.postEditor.findMany({
                where: {
                    editor_id: request.session.userId!
                },
                include: {
                    posts: true
                },
                skip: skip,
                take: limit,
                orderBy: {
                    posts: {
                        id: 'desc' // Řadí podle nejnovějších
                    }
                }
            });

            const totalPages = Math.ceil(totalPosts / limit);

            reply.status(200).send({
                posts: postEditors.map(pe => ({
                    postId: pe.posts.id,
                    creatorId: pe.posts.creator_id
                })),
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalPosts,
                    totalPages: totalPages
                }
            });
        }
    );

    /**
     * Získá seznam obsahů příspěvku
     * @route GET /post/:postId/listcontents
     * @param request.params.postId - ID příspěvku
     * @returns Seznam obsahů ke kterým má uživatel přístup včetně informací o oprávněních
     */
    fastify.get<{ Params: { postId: number }, Reply: PostContentType[] | IReply }>(
        '/post/:postId/listcontents',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Seznam obsahů příspěvku',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: Type.Array(PostContent)
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;

            // Získá všechny obsahy pro tento příspěvek
            const contents = await prisma.content.findMany({
                where: {
                    posts_id: postId
                }
            });

            // Filtruje obsahy podle nové logiky oprávnění
            const allowedContents = [];
            for (const content of contents) {
                const canView = await canViewContent(content.id, request.session.userId!);
                if (canView) {
                    // Kontroluje, zda může uživatel editovat tento obsah
                    const canEdit = await canEditContent(content.id, request.session.userId!);

                    // Získá linkované sítě pro tento obsah
                    const linkedNetworks = await prisma.postedContent.findMany({
                        where: {
                            contents_id: content.id,
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    allowedContents.push({
                        id: content.id,
                        postId: content.posts_id,
                        content: content.content,
                        linkedNetworks: linkedNetworks.map(ln => ln.networks_id),
                        canEdit: canEdit
                    });
                }
            }

            reply.status(200).send(allowedContents);
        }
    );

    /**
     * Smaže obsah příspěvku
     * Pouze tvůrce příspěvku může mazat obsah a pouze pokud ještě nebyl publikován
     * @route DELETE /post/:postId/deletecontent/:contentId
     * @param request.params.postId - ID příspěvku
     * @param request.params.contentId - ID obsahu k smazání
     * @returns Potvrzení o smazání obsahu
     */
    fastify.delete<{ Params: { postId: number, contentId: number }, Reply: IReply }>(
        '/post/:postId/deletecontent/:contentId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Smazání obsahu příspěvku',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer(),
                    contentId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId, contentId } = request.params;
                const userId = request.session.userId!;

                // Kontroluje, zda obsah existuje a patří k příspěvku
                const content = await prisma.content.findFirst({
                    where: {
                        id: contentId,
                        posts_id: postId
                    }
                });
                if (!content) return reply.status(400).send({ error: 'Content not found' });

                // Kontroluje, zda je uživatel tvůrcem příspěvku - pouze oni mohou mazat obsah
                const isPostCreator = await isPostOwner(postId, userId);
                if (!isPostCreator) {
                    return reply.status(403).send({
                        error: 'Only post creator can delete content'
                    });
                }

                // Kontroluje, zda byl obsah publikován (actual_post_date je nastaveno)
                const postedContent = await prisma.postedContent.findFirst({
                    where: {
                        contents_id: contentId,
                        posts_id: postId,
                        NOT: {
                            actual_post_date: null
                        }
                    }
                });

                if (postedContent) {
                    return reply.status(400).send({
                        error: 'Content cannot be deleted as it has already been posted'
                    });
                }

                // Smaže obsah - CASCADE DELETE zvládne postedContent záznamy
                await prisma.content.delete({
                    where: {
                        id: contentId
                    }
                });

                return reply.status(200).send({
                    success: true,
                    message: 'Content deleted'
                });

            } catch (e) {
                fastify.log.error(e);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Smaže příspěvek (pouze vlastník) nebo odstraní editora z příspěvku
     * @route DELETE /post/:postId/delete
     * @param request.params.postId - ID příspěvku
     * @returns Smaže příspěvek pokud je uživatel vlastník, nebo odstraní uživatele jako editora
     */
    fastify.delete<{ Params: { postId: number }, Reply: IReply }>(
        '/post/:postId/delete',
        {
            preValidation: isAuthenticated,
            schema: {
                description: "Smazání příspěvku (pouze vlastník) nebo odstranění editora z příspěvku",
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;
            const userId = request.session.userId!;

            // Kontroluje, zda příspěvek existuje
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });
            if (!post) return reply.status(404).send({ error: 'Post not found' });

            // Kontroluje, zda je uživatel vlastníkem příspěvku
            const isOwner = await isPostOwner(postId, userId);

            if (isOwner) {
                // Vlastník může smazat příspěvek (pokud ještě nebyl publikován)
                const postedContent = await prisma.postedContent.findFirst({
                    where: {
                        posts_id: postId,
                        NOT: {
                            actual_post_date: null
                        }
                    }
                });
                if (postedContent) return reply.status(400).send({ error: 'Post cannot be deleted as it is already posted' });

                // Smaže příspěvek
                await prisma.post.delete({
                    where: {
                        id: postId
                    }
                });
                reply.status(200).send({ success: true, message: 'Post deleted' });
            } else {
                // Kontroluje, zda je uživatel editorem tohoto příspěvku
                const isEditor = await prisma.postEditor.findFirst({
                    where: {
                        posts_id: postId,
                        editor_id: userId
                    }
                });

                if (!isEditor) {
                    return reply.status(403).send({ error: 'Not authorized - you are neither owner nor editor of this post' });
                }

                // Odstraní uživatele jako editora z příspěvku (editor se vzdává editačních práv)
                await prisma.postEditor.deleteMany({
                    where: {
                        posts_id: postId,
                        editor_id: userId
                    }
                });
                reply.status(200).send({ success: true, message: 'You have been removed as editor from this post' });
            }
        }
    );

    /**
     * Nahraje přílohu k příspěvku
     * @route POST /post/:postId/uploadfile
     * @param request.params.postId - ID příspěvku
     * @param request.file - Nahrávaný soubor (multipart/form-data)
     * @returns Informace o nahrané příloze
     */
    fastify.post<{ Params: { postId: number }, Reply: AttachmentType | IReply }>(
        '/post/:postId/uploadfile',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Nahrání přílohy k příspěvku',
                tags: ['post'],
                consumes: ['multipart/form-data'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: Attachment,
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;

            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5000000", 10);
            const data = await request.file({ limits: { fileSize: maxFileSize } });
            if (!data) return reply.status(400).send({ error: 'No file uploaded' });

            // Definuje podporované typy souborů (stejné jako v getfile endpointu)
            const allowedExtensions = [
                '.jpg', '.jpeg', '.png', '.gif', '.webp',  // Obrázky
                '.mp4', '.avi', '.mov',                    // Videa
                '.mp3', '.wav'                             // Audio
            ];

            // Validuje typ souboru podle přípony
            const fileExtension = path.extname(data.filename).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                return reply.status(400).send({
                    error: `Unsupported file type. Allowed types: ${allowedExtensions.join(', ')}`
                });
            }

            const fileName = path.basename(`${Date.now()}.${data.filename.split('.').pop()}`);
            const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), fileName);
            try {
                await fsPromises.mkdir(path.join(process.env.UPLOADS_DIR!, postId.toString()), { recursive: true });
                await data.toBuffer().then(async buffer => {
                    await fsPromises.writeFile(filePath, buffer);
                });
            } catch (err) {
                fastify.log.error(err);
                return reply.status(500).send({ error: 'Internal server error' });
            }

            // Uloží cestu k souboru do databáze
            const dbAttachment = await prisma.attachment.create({
                data: {
                    posts_id: postId,
                    path: fileName
                }
            });

            // Získá linkované sítě pro tuto přílohu (bude prázdné pro nové přílohy)
            const linkedNetworks = await prisma.postedContentAttachment.findMany({
                where: {
                    attachments_id: dbAttachment.id,
                    posts_id: postId
                },
                select: {
                    networks_id: true
                }
            });

            reply.status(200).send({
                id: dbAttachment.id,
                postId: postId,
                fileName: dbAttachment.path,
                linkedNetworks: linkedNetworks.map(ln => ln.networks_id)
            });
        }
    );

    /**
     * Odstraní přílohu z příspěvku (pokud ještě nebyl publikován)
     * @route DELETE /post/:postId/removefile/:attachmentId
     * @param request.params.postId - ID příspěvku
     * @param request.params.attachmentId - ID přílohy k odstranění
     * @returns Potvrzení o smazání přílohy
     */
    fastify.delete<{ Params: { postId: number, attachmentId: number }, Reply: IReply }>(
        '/post/:postId/removefile/:attachmentId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Odstranění přílohy příspěvku',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer(),
                    attachmentId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, attachmentId } = request.params;

            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda už byl příspěvek publikován
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    NOT: {
                        actual_post_date: null
                    }
                }
            })
            if (postedContent) return reply.status(400).send({ error: 'Post cannot be deleted as it is already posted' });

            // Kontroluje, zda příloha existuje
            const attachment = await prisma.attachment.findFirst({
                where: {
                    id: attachmentId,
                    posts_id: postId
                }
            });
            if (!attachment) return reply.status(400).send({ error: 'Attachment not found or not authorized' });

            // Kontroluje, zda je příloha v uploads adresáři
            const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.path));
            try {
                await fsPromises.access(filePath, constants.R_OK | constants.W_OK);
                await fsPromises.unlink(filePath);
            } catch (err) {
                fastify.log.error(err);
            }

            // Smaže přílohu z databáze
            await prisma.attachment.delete({
                where: {
                    id: attachmentId
                }
            });
            reply.status(200).send({ success: true, message: 'Attachment deleted' });
        }
    );

    /**
     * Získá seznam příloh příspěvku (které také existují na disku)
     * @route GET /post/:postId/listfiles
     * @param request.params.postId - ID příspěvku
     * @returns Seznam příloh ke kterým má uživatel přístup
     */
    fastify.get<{ Params: { postId: number }, Reply: AttachmentType[] | IReply }>(
        '/post/:postId/listfiles',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Seznam příloh příspěvku',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: Type.Array(Attachment)
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;

            // Získá všechny přílohy pro tento příspěvek
            const attachments = await prisma.attachment.findMany({
                where: {
                    posts_id: postId
                }
            });

            // Filtruje přílohy podle nové logiky oprávnění a kontroluje, zda existují na disku
            const allowedAttachments = [];
            for (const attachment of attachments) {
                const canView = await canViewAttachment(attachment.id, request.session.userId!);
                if (canView) {
                    // Kontroluje, zda soubor existuje na disku
                    const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.path));
                    try {
                        await fsPromises.access(filePath, constants.R_OK | constants.W_OK);

                        // Získá linkované sítě pro tuto přílohu
                        const linkedNetworks = await prisma.postedContentAttachment.findMany({
                            where: {
                                attachments_id: attachment.id,
                                posts_id: postId
                            },
                            select: {
                                networks_id: true
                            }
                        });

                        allowedAttachments.push({
                            id: attachment.id,
                            postId: attachment.posts_id,
                            fileName: attachment.path,
                            linkedNetworks: linkedNetworks.map(ln => ln.networks_id)
                        });
                    } catch (err) {
                        // Soubor neexistuje na disku, přeskočí ho
                        fastify.log.error(err);
                    }
                }
            }

            reply.status(200).send(allowedAttachments);
        }
    );

    /**
     * Získá soubor přílohy podle ID přílohy
     * @route GET /post/:postId/getfile/:attachmentId
     * @param request.params.postId - ID příspěvku
     * @param request.params.attachmentId - ID přílohy
     * @returns Stažení souboru přílohy
     */
    fastify.get<{ Params: { postId: number, attachmentId: number }, Reply: IReply }>(
        '/post/:postId/getfile/:attachmentId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Získání souboru přílohy',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer(),
                    attachmentId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, attachmentId } = request.params;

            // Kontroluje, zda může uživatel zobrazit tuto přílohu pomocí nové logiky oprávnění
            const canView = await canViewAttachment(attachmentId, request.session.userId!);
            if (!canView) return reply.status(400).send({ error: 'Attachment not found or not authorized' });

            // Kontroluje, zda příloha existuje
            const attachment = await prisma.attachment.findFirst({
                where: {
                    id: attachmentId,
                    posts_id: postId
                }
            });
            if (!attachment) return reply.status(400).send({ error: 'Attachment not found or not authorized' });

            const uploadsDir = process.env.UPLOADS_DIR!;
            const safeFileName = path.basename(attachment.path);
            const filePath = path.join(uploadsDir, String(postId), safeFileName);

            try {
                await fsPromises.access(filePath, constants.R_OK);

                // Nastaví správné Content-Type hlavičky
                const fileExtension = path.extname(safeFileName).toLowerCase();
                let contentType = 'application/octet-stream';

                // Jednoduché mapování přípon na MIME typy
                const mimeTypes: Record<string, string> = {
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.png': 'image/png',
                    '.gif': 'image/gif',
                    '.webp': 'image/webp',
                    '.mp4': 'video/mp4',
                    '.avi': 'video/x-msvideo',
                    '.mov': 'video/quicktime',
                    '.mp3': 'audio/mpeg',
                    '.wav': 'audio/wav'
                };

                if (mimeTypes[fileExtension]) {
                    contentType = mimeTypes[fileExtension];
                }

                // Nastaví hlavičky pro download
                reply.header('Content-Type', contentType);
                reply.header('Content-Disposition', `attachment; filename="${safeFileName}"`);

                // Pošle soubor pomocí stream
                const fileStream = createReadStream(filePath);
                return reply.send(fileStream as any);
            } catch (err) {
                request.log.error(err);
                return reply.status(404).send({ error: 'Soubor nenalezen' });
            }
        }
    );

    /**
     * Přidá uživatele jako editora k příspěvku
     * @route POST /post/:postId/addeditor/:userId
     * @param request.params.postId - ID příspěvku
     * @param request.params.userId - ID uživatele k přidání jako editor
     * @returns Potvrzení o přidání editora
     */
    fastify.post<{ Params: { postId: number, userId: number }, Reply: IReply }>(
        '/post/:postId/addeditor/:userId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Přidání uživatele jako editora k příspěvku',
                tags: ['post', 'user'],
                params: Type.Object({
                    postId: Type.Integer(),
                    userId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, userId } = request.params;

            // Kontroluje, zda je tvůrce příspěvku stejný jako přihlášený uživatel
            const hasPermission = await isPostOwner(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda uživatel existuje
            const user = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) return reply.status(400).send({ error: 'User not found' });

            // Přidá uživatele jako editora k příspěvku
            await prisma.postEditor.create({
                data: {
                    posts_id: postId,
                    editor_id: userId
                }
            });
            reply.status(200).send({ success: true, message: 'User added as editor to the post' });
        }
    );

    /**
     * Odstraní uživatele jako editora z příspěvku
     * @route DELETE /post/:postId/removeeditor/:userId
     * @param request.params.postId - ID příspěvku
     * @param request.params.userId - ID uživatele k odstranění jako editor
     * @returns Potvrzení o odstranění editora
     */
    fastify.delete<{ Params: { postId: number, userId: number }, Reply: IReply }>(
        '/post/:postId/removeeditor/:userId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Odstranění uživatele jako editora z příspěvku',
                tags: ['post', 'user'],
                params: Type.Object({
                    postId: Type.Integer(),
                    userId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, userId } = request.params;

            // Kontroluje, zda je tvůrce příspěvku stejný jako přihlášený uživatel
            const hasPermission = await isPostOwner(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda uživatel existuje
            const user = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) return reply.status(400).send({ error: 'User not found' });

            // Odstraní uživatele jako editora z příspěvku
            await prisma.postEditor.deleteMany({
                where: {
                    posts_id: postId,
                    editor_id: userId
                }
            });
            reply.status(200).send({ success: true, message: 'User removed as editor to the post' });
        }
    );

    /**
     * Linkuje obsah příspěvku k síti (pokud ještě nebyl publikován)
     * @route POST /post/:postId/linkcontent/:contentId/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.contentId - ID obsahu
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o propojení obsahu se sítí
     */
    fastify.post<{ Params: { postId: number, contentId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/linkcontent/:contentId/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Propojení obsahu příspěvku se sítí',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    contentId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, contentId, networkId } = request.params;

            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda obsah příspěvku existuje
            const postContent = await prisma.content.findFirst({
                where: {
                    id: contentId,
                    posts_id: postId
                }
            });
            if (!postContent) return reply.status(400).send({ error: 'Post content not found or not authorized' });

            // Kontroluje, zda má uživatel write přístup k síti (aktualizovaná logika)
            const hasNetworkAccess = await hasNetworkWriteAccess(networkId, request.session.userId!);
            if (!hasNetworkAccess) return reply.status(400).send({ error: 'User not authorized to post to the network' });

            // Kontroluje, zda obsah už není linkován k této síti
            const existingLink = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    contents_id: contentId,
                    networks_id: networkId
                }
            });
            if (existingLink) return reply.status(400).send({ error: 'Content is already linked to this network' });

            // Linkuje obsah příspěvku k síti
            await prisma.postedContent.create({
                data: {
                    posts_id: postId,
                    contents_id: contentId,
                    networks_id: networkId
                }
            });
            reply.status(200).send({ success: true, message: 'Post content linked to network' });
        }
    );

    /**
     * Odpojí obsah příspěvku od sítě (pokud ještě nebyl publikován)
     * @route DELETE /post/:postId/unlinkcontent/:contentId/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.contentId - ID obsahu
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o odpojení obsahu od sítě
     */
    fastify.delete<{ Params: { postId: number, contentId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/unlinkcontent/:contentId/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Odpojení obsahu příspěvku od sítě',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    contentId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, contentId, networkId } = request.params;

            // Kontroluje, zda může uživatel smazat/odpojit obsah podle nové logiky
            const { canDelete, canUnlink } = await canDeleteContent(contentId, request.session.userId!, networkId);

            if (!canDelete && !canUnlink) {
                return reply.status(403).send({ error: 'Not authorized to unlink content from this network' });
            }

            // Kontroluje, zda obsah příspěvku existuje
            const postContent = await prisma.content.findFirst({
                where: {
                    id: contentId,
                    posts_id: postId
                }
            });
            if (!postContent) return reply.status(400).send({ error: 'Post content not found or not authorized' });

            // Kontroluje, zda obsah už byl publikován (nelze odpojit)
            const linkedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    contents_id: contentId,
                    networks_id: networkId
                }
            });

            if (linkedContent && linkedContent.actual_post_date !== null) {
                return reply.status(400).send({ error: 'Cannot unlink content that has already been posted' });
            }

            // Odpojí obsah příspěvku od sítě
            await prisma.postedContent.deleteMany({
                where: {
                    posts_id: postId,
                    contents_id: contentId,
                    networks_id: networkId
                }
            });
            reply.status(200).send({ success: true, message: 'Post content unlinked from network' });
        }
    );

    /**
     * Získá seznam obsahů příspěvků linkovaných k sítím
     * @route GET /post/:postId/linkedcontents
     * @param request.params.postId - ID příspěvku
     * @returns Seznam obsahů propojených se sítěmi
     */
    fastify.get<{ Params: { postId: number }, Reply: LinkedContentType[] | IReply }>(
        '/post/:postId/linkedcontents',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Seznam obsahů příspěvků propojených se sítí',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: Type.Array(LinkedContent)
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;

            // Získá všechny linkované obsahy pro tento příspěvek
            const contents = await prisma.postedContent.findMany({
                where: {
                    posts_id: postId
                }
            });

            // Filtruje obsahy podle nové logiky oprávnění
            const allowedLinkedContents = [];
            for (const content of contents) {
                const canView = await canViewContent(content.contents_id, request.session.userId!);
                if (canView) {
                    allowedLinkedContents.push({
                        postId: content.posts_id,
                        contentId: content.contents_id,
                        networkId: content.networks_id
                    });
                }
            }

            reply.status(200).send(allowedLinkedContents);
        }
    );

    /**
     * Linkuje přílohu příspěvku k síti (pokud ještě nebyl publikován)
     * @route POST /post/:postId/linkattachment/:attachmentId/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.attachmentId - ID přílohy
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o propojení přílohy se sítí
     */
    fastify.post<{ Params: { postId: number, attachmentId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/linkattachment/:attachmentId/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Propojení přílohy příspěvku se sítí',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    attachmentId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, attachmentId, networkId } = request.params;

            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda příloha existuje
            const attachment = await prisma.attachment.findFirst({
                where: {
                    id: attachmentId,
                    posts_id: postId
                }
            });
            if (!attachment) return reply.status(400).send({ error: 'Attachment not found or not authorized' });

            // Kontroluje, zda je příloha v uploads adresáři
            const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.path));
            try {
                await fsPromises.access(filePath, constants.R_OK | constants.W_OK);
            } catch (err) {
                fastify.log.error(err);
                return reply.status(400).send({ error: 'Attachment not found or not authorized' });
            }

            // Kontroluje, zda už byl příspěvek publikován
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    NOT: {
                        actual_post_date: null
                    }
                }
            });
            if (postedContent) return reply.status(400).send({ error: 'Attachments cannot be added to post as it is already posted' });

            // Linkuje přílohu příspěvku k síti
            await prisma.postedContentAttachment.create({
                data: {
                    posts_id: postId,
                    attachments_id: attachmentId,
                    networks_id: networkId
                }
            });
            reply.status(200).send({ success: true, message: 'Post attachment linked to network' });
        }
    );

    /**
     * Odpojí přílohu příspěvku od sítě (pokud ještě nebyl publikován)
     * @route DELETE /post/:postId/unlinkattachment/:attachmentId/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.attachmentId - ID přílohy
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o odpojení přílohy od sítě
     */
    fastify.delete<{ Params: { postId: number, attachmentId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/unlinkattachment/:attachmentId/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Odpojení přílohy příspěvku od sítě',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    attachmentId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, attachmentId, networkId } = request.params;

            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) return reply.status(400).send({ error: 'Post not found or not authorized' });

            // Kontroluje, zda příloha existuje
            const attachment = await prisma.attachment.findFirst({
                where: {
                    id: attachmentId,
                    posts_id: postId
                }
            });
            if (!attachment) return reply.status(400).send({ error: 'Attachment not found or not authorized' });

            // Kontroluje, zda už byl příspěvek publikován
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    NOT: {
                        actual_post_date: null
                    }
                }
            });
            if (postedContent) return reply.status(400).send({ error: 'Attachments cannot be removed from post as it is already posted' });

            // Odpojí přílohu příspěvku od sítě
            await prisma.postedContentAttachment.deleteMany({
                where: {
                    posts_id: postId,
                    attachments_id: attachmentId,
                    networks_id: networkId
                }
            });
            reply.status(200).send({ success: true, message: 'Post attachment unlinked from network' });
        }
    );

    // List post attachments linked to networks (posts linked in posted_content)
    fastify.get<{ Params: { postId: number }, Reply: LinkedAttachmentType[] | IReply }>(
        '/post/:postId/linkedattachments',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'List post attachments linked to network',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: Type.Array(LinkedAttachment)
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;

            // Získá všechny linkované přílohy pro tento příspěvek
            const attachments = await prisma.postedContentAttachment.findMany({
                where: {
                    posts_id: postId
                }
            });

            // Filtruje přílohy podle nové logiky oprávnění
            const allowedLinkedAttachments = [];
            for (const attachment of attachments) {
                const canView = await canViewAttachment(attachment.attachments_id, request.session.userId!);
                if (canView) {
                    allowedLinkedAttachments.push({
                        postId: attachment.posts_id,
                        attachmentId: attachment.attachments_id,
                        networkId: attachment.networks_id
                    });
                }
            }

            reply.status(200).send(allowedLinkedAttachments);
        }
    );

    /**
     * Zveřejní příspěvek na konkrétní síť
     * @route POST /post/:postId/send/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o úspěšném zveřejnění příspěvku na síti
     */
    fastify.post<{ Params: { postId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/send/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Publikování příspěvku na konkrétní síť',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId, networkId } = request.params;
            const userId = request.session.userId!;
            const timestamp = new Date().toISOString();

            fastify.log.info(`[API Send] ${timestamp} - Starting send process for post ${postId} to network ${networkId}, request by user ID: ${userId}\``);

            // Kontroluje, zda má uživatel oprávnění publikovat tento příspěvek
            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) {
                fastify.log.error(`[API Send] Permission denied - User ${userId} cannot access post ${postId}`);
                return reply.status(400).send({ error: 'Post not found or not authorized' });
            }
            try {
                // Získá obsah linkovaný k této síti pro tento příspěvek
                const linkedContent = await prisma.postedContent.findFirst({
                    where: {
                        posts_id: postId,
                        networks_id: networkId,
                        actual_post_date: null // Publikuje pouze pokud ještě nebyl publikován
                    },
                    include: {
                        contents: true,
                        networks: true
                    }
                });

                if (!linkedContent) {
                    fastify.log.error(`[API Send] No linked content found for post ${postId} and network ${networkId}, or content already posted`);
                    return reply.status(400).send({ error: 'No content linked to this network for this post or already posted' });
                }

                fastify.log.info(`[API Send] Found linked content - Content ID: ${linkedContent.contents_id}, Network: ${linkedContent.networks.network_name} (${linkedContent.networks.network_type})`);

                // Kontroluje, zda má uživatel write přístup k síti
                const hasWriteAccess = await hasNetworkWriteAccess(networkId, request.session.userId!);
                if (!hasWriteAccess) {
                    fastify.log.error(`[API Send] Write access denied - User ${userId} cannot send to network ${networkId}`);
                    return reply.status(403).send({ error: 'Not authorized to send content to this network' });
                }

                // Získá autentizační tokeny sítě
                const networkTokens = await prisma.networkToken.findMany({
                    where: {
                        network_id: networkId
                    }
                });

                fastify.log.info(`[API Send] Found ${networkTokens.length} tokens for network`);
                const tokenNames = networkTokens.map(t => t.token_name);
                fastify.log.info(`[API Send] Available tokens: ${tokenNames.join(', ')}`);

                const tokens: Record<string, string> = {};
                networkTokens.forEach(token => {
                    tokens[token.token_name] = token.token;
                });

                // Získá providera sociální sítě
                const provider = SocialNetworkProviderFactory.getProvider(linkedContent.networks.network_type);
                if (!provider) {
                    fastify.log.error(`[API Send] No provider found for network type: ${linkedContent.networks.network_type}`);
                    return reply.status(400).send({ error: `Unsupported network type: ${linkedContent.networks.network_type}` });
                }

                // Validuje tokeny
                if (!provider.validateTokens(tokens)) {
                    fastify.log.error(`[API Send] Token validation failed for network ${linkedContent.networks.network_name}`);
                    const requiredTokens = provider.getRequiredTokens();
                    fastify.log.error(`[API Send] Required tokens: ${requiredTokens.join(', ')}`);
                    fastify.log.error(`[API Send] Available tokens: ${Object.keys(tokens).join(', ')}`);
                    return reply.status(400).send({ error: 'Invalid or missing authentication tokens for this network' });
                }

                // Získá přílohy linkované k této síti pro tento příspěvek
                const linkedAttachments = await prisma.postedContentAttachment.findMany({
                    where: {
                        posts_id: postId,
                        networks_id: networkId
                    },
                    include: {
                        attachments: true
                    }
                });

                fastify.log.info(`[API Send] Found ${linkedAttachments.length} linked attachments`);

                // Sestaví cesty k souborům příloh
                const attachmentPaths: string[] = [];
                for (const attachment of linkedAttachments) {
                    const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.attachments.path));
                    fastify.log.info(`[API Send] Checking attachment file: ${filePath}`);

                    try {
                        await fsPromises.access(filePath, constants.R_OK);
                        attachmentPaths.push(filePath);
                        fastify.log.info(`[API Send] Attachment verified and added: ${path.basename(filePath)}`);
                    } catch (err) {
                        fastify.log.warn(`[API Send] Attachment file not accessible: ${filePath}`);
                        // Pokračuje bez této přílohy
                    }
                }

                // Publikuje příspěvek pomocí providera sociální sítě
                const sendStartTime = Date.now();

                const networkPostId = await provider.sendPost(
                    linkedContent.contents.content,
                    attachmentPaths,
                    tokens
                );

                const sendEndTime = Date.now();
                const sendDuration = sendEndTime - sendStartTime;
                fastify.log.info(`[API Send] Provider call completed in ${sendDuration}ms`);

                if (networkPostId === null) {
                    fastify.log.error(`[API Send] Provider returned null - post sending failed`);
                    return reply.status(500).send({ error: 'Failed to send post to the social network' });
                }

                // Aktualizuje databázi - odstraní naplánovaný čas a nastaví skutečný čas publikování

                await prisma.postedContent.update({
                    where: {
                        posts_id_networks_id: {
                            posts_id: postId,
                            networks_id: networkId
                        }
                    },
                    data: {
                        post_date: null, // Odstraní naplánovaný čas
                        actual_post_date: new Date(), // Nastaví skutečný čas publikování
                        network_post_id: networkPostId // Uloží ID příspěvku na síti
                    }
                });

                fastify.log.info(`[API Send] Send process completed successfully - Post ${postId} sent to network ${networkId} with network post ID: ${networkPostId}`);
                reply.status(200).send({ success: true, message: 'Post sent successfully' });

            } catch (error) {
                const errorTime = new Date().toISOString();
                fastify.log.error({ err: error }, `[API Send] ${errorTime} - Error occurred during send process:`);
                fastify.log.error({
                    postId,
                    networkId,
                    userId,
                    error: error instanceof Error ? {
                        message: error.message,
                        stack: error.stack
                    } : error
                }, `[API Send] Error details:`);

                fastify.log.error({ err: error }, `Error sending post ${postId} to network ${networkId}:`);
                return reply.status(500).send({ error: 'Internal server error while sending post' });
            }
        }
    );

    /**
     * Publikuje příspěvek na všechny propojené sítě
     * @route POST /post/:postId/send/all
     * @param request.params.postId - ID příspěvku
     * @returns Potvrzení o úspěšném publikování na všechny sítě
     */
    fastify.post<{ Params: { postId: number }, Reply: IReply }>(
        '/post/:postId/send/all',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Publikování příspěvku na všechny propojené sítě',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            const { postId } = request.params;
            const userId = request.session.userId!;
            const timestamp = new Date().toISOString();

            fastify.log.info(`[API Send All] ${timestamp} - Starting send all process for post ${postId}, request by user ID: ${userId}`);

            // Kontroluje, zda má uživatel oprávnění publikovat tento příspěvek
            const hasPermission = await hasPostPermission(postId, request.session.userId!);
            if (!hasPermission) {
                fastify.log.error(`[API Send All] Permission denied - User ${userId} cannot access post ${postId}`);
                return reply.status(400).send({ error: 'Post not found or not authorized' });
            }

            try {
                // Získá všechny obsahy linkované k sítím pro tento příspěvek, které ještě nebyly publikovány
                const linkedContents = await prisma.postedContent.findMany({
                    where: {
                        posts_id: postId,
                        actual_post_date: null // Publikuje pouze pokud ještě nebyl publikován
                    },
                    include: {
                        networks: true,
                        contents: true
                    }
                });

                fastify.log.info(`[API Send All] Found ${linkedContents.length} linked content entries to process`);

                if (linkedContents.length === 0) {
                    fastify.log.info(`[API Send All] No content to send - either no links exist or all content already posted`);
                    return reply.status(400).send({ error: 'No content linked to networks for this post or all content already posted' });
                }

                // Log details of what we're about to send
                const networkSummary = linkedContents.reduce((acc, content) => {
                    const networkName = content.networks.network_name;
                    const networkType = content.networks.network_type;
                    acc.push(`${networkName} (${networkType})`);
                    return acc;
                }, [] as string[]);
                fastify.log.info(`[API Send All] Networks to process: ${networkSummary.join(', ')}`);

                let successCount = 0;
                let errorCount = 0;
                const errors: string[] = [];
                const successDetails: string[] = [];

                // Publikuje obsah na každou síť
                for (let i = 0; i < linkedContents.length; i++) {
                    const linkedContent = linkedContents[i];
                    const networkName = linkedContent.networks.network_name;
                    const networkId = linkedContent.networks_id;
                    const networkType = linkedContent.networks.network_type;

                    fastify.log.info(`[API Send All] Processing network ${i + 1}/${linkedContents.length}: ${networkName} (ID: ${networkId}, Type: ${networkType})`);

                    try {
                        // Kontroluje, zda má uživatel write přístup k této síti
                        const hasWriteAccess = await hasNetworkWriteAccess(linkedContent.networks_id, request.session.userId!);
                        if (!hasWriteAccess) {
                            const errorMsg = `No write access to network ${networkName} (ID: ${linkedContent.networks_id})`;
                            fastify.log.error(`[API Send All] ${errorMsg}`);
                            errors.push(errorMsg);
                            errorCount++;
                            continue;
                        }

                        // Získá autentizační tokeny sítě
                        const networkTokens = await prisma.networkToken.findMany({
                            where: {
                                network_id: linkedContent.networks_id
                            }
                        });

                        fastify.log.info(`[API Send All] Found ${networkTokens.length} tokens for network ${networkName}`);
                        const tokenNames = networkTokens.map(t => t.token_name);
                        fastify.log.info(`[API Send All] Token types: ${tokenNames.join(', ')}`);

                        const tokens: Record<string, string> = {};
                        networkTokens.forEach(token => {
                            tokens[token.token_name] = token.token;
                        });

                        // Získá providera sociální sítě
                        const provider = SocialNetworkProviderFactory.getProvider(linkedContent.networks.network_type);
                        if (!provider) {
                            fastify.log.error(`[API Send All] No provider found for network type: ${linkedContent.networks.network_type}`);
                            return reply.status(400).send({ error: `Unsupported network type: ${linkedContent.networks.network_type}` });
                        }

                        // Validuje tokeny
                        if (!provider.validateTokens(tokens)) {
                            fastify.log.error(`[API Send All] Token validation failed for network ${linkedContent.networks.network_name}`);
                            const requiredTokens = provider.getRequiredTokens();
                            fastify.log.error(`[API Send All] Required tokens: ${requiredTokens.join(', ')}`);
                            fastify.log.error(`[API Send All] Available tokens: ${Object.keys(tokens).join(', ')}`);
                            return reply.status(400).send({ error: 'Invalid or missing authentication tokens for this network' });
                        }

                        // Získá přílohy linkované k této síti pro tento příspěvek
                        const linkedAttachments = await prisma.postedContentAttachment.findMany({
                            where: {
                                posts_id: postId,
                                networks_id: networkId
                            },
                            include: {
                                attachments: true
                            }
                        });

                        fastify.log.info(`[API Send All] Found ${linkedAttachments.length} linked attachments`);

                        // Sestaví cesty k souborům příloh
                        const attachmentPaths: string[] = [];
                        for (const attachment of linkedAttachments) {
                            const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.attachments.path));
                            fastify.log.info(`[API Send All] Checking attachment: ${filePath}`);

                            try {
                                await fsPromises.access(filePath, constants.R_OK);
                                attachmentPaths.push(filePath);
                                fastify.log.info(`[API Send All] Attachment verified: ${path.basename(filePath)}`);
                            } catch (err) {
                                fastify.log.warn(`[API Send All] Attachment not accessible: ${filePath}`);
                                // Pokračuje bez této přílohy
                            }
                        }

                        fastify.log.info(`[API Send All] Final attachment count for ${networkName}: ${attachmentPaths.length}`);

                        // Publikuje příspěvek pomocí providera sociální sítě
                        const sendStartTime = Date.now();

                        const networkPostId = await provider.sendPost(
                            linkedContent.contents.content,
                            attachmentPaths,
                            tokens
                        );

                        const sendDuration = Date.now() - sendStartTime;
                        fastify.log.info(`[API Send All] Send operation completed for ${networkName} in ${sendDuration}ms`);

                        if (networkPostId === null) {
                            const errorMsg = `Failed to send post to network ${networkName}`;
                            fastify.log.error(`[API Send All] ${errorMsg} - Provider returned null`);
                            errors.push(errorMsg);
                            errorCount++;
                            continue;
                        }

                        fastify.log.info(`[API Send All] Successfully sent to ${networkName}! Network post ID: ${networkPostId}`);

                        // Aktualizuje databázi - odstraní naplánovaný čas a nastaví skutečný čas publikování
                        await prisma.postedContent.update({
                            where: {
                                posts_id_networks_id: {
                                    posts_id: postId,
                                    networks_id: linkedContent.networks_id
                                }
                            },
                            data: {
                                post_date: null, // Odstraní naplánovaný čas
                                actual_post_date: new Date(), // Nastaví skutečný čas publikování
                                network_post_id: networkPostId // Uloží ID příspěvku na síti
                            }
                        });

                        successDetails.push(`${networkName}: ${networkPostId}`);
                        successCount++;

                        fastify.log.info(`Successfully sent post ${postId} to network ${linkedContent.networks_id} (${networkName}), network post ID: ${networkPostId}`);

                    } catch (networkError) {
                        const errorMsg = `Error sending to network ${networkName}: ${networkError}`;
                        fastify.log.error(`[API Send All] ${errorMsg}`);
                        const networkErrorDetails = networkError instanceof Error ? {
                            message: networkError.message,
                            stack: networkError.stack
                        } : networkError;
                        fastify.log.error({ err: networkErrorDetails }, `[API Send All] Network error details:`);

                        fastify.log.error({ err: networkError }, `Error sending post ${postId} to network ${linkedContent.networks_id}:`);
                        errors.push(errorMsg);
                        errorCount++;
                    }
                }

                // Prepare detailed response message
                const totalDuration = Date.now() - new Date(timestamp).getTime();
                fastify.log.info(`[API Send All] ${new Date().toISOString()} - Send all process completed in ${totalDuration}ms`);
                fastify.log.info(`[API Send All] Final results - Success: ${successCount}, Errors: ${errorCount}`);

                if (successCount > 0) {
                    fastify.log.info(`[API Send All] Successful sends: ${successDetails.join(', ')}`);
                }

                if (errorCount > 0) {
                    fastify.log.info(`[API Send All] Errors encountered: ${errors.join('; ')}`);
                }

                let message: string;
                if (successCount > 0 && errorCount === 0) {
                    message = `Post sent successfully to all ${successCount} networks`;
                    fastify.log.info(`[API Send All] All networks succeeded: ${message}`);
                } else if (successCount > 0 && errorCount > 0) {
                    message = `Post sent to ${successCount} networks, ${errorCount} failed. Errors: ${errors.join('; ')}`;
                    fastify.log.info(`[API Send All] Partial success: ${message}`);
                } else {
                    message = `Failed to send post to any networks. Errors: ${errors.join('; ')}`;
                    fastify.log.info(`[API Send All] Complete failure: ${message}`);
                }

                // Return success if at least one network succeeded
                if (successCount > 0) {
                    reply.status(200).send({ success: true, message: message });
                } else {
                    reply.status(500).send({ error: message });
                }

            } catch (error) {
                fastify.log.error({
                    postId,
                    userId,
                    error: error instanceof Error ? {
                        message: error.message,
                        stack: error.stack
                    } : error
                }, `[API Send All] Unexpected error during send all process for post ${postId}. Error details:`);
                return reply.status(500).send({ error: 'Internal server error while sending post' });
            }
        }
    );

    /**
     * Naplánuje publikování obsahu do sítě
     * @route POST /post/:postId/schedule/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sítě
     * @param request.body.postDate - Nový datum a čas publikování
     * @returns Potvrzení o úspěšném naplánování publikování
     */
    fastify.post<{ Params: { postId: number, networkId: number }, Body: ScheduleContentRequestType, Reply: IReply }>(
        '/post/:postId/schedule/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Naplánování nebo přeplánování publikování obsahu do sítě',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                body: ScheduleContentRequest,
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId, networkId } = request.params;
                const { postDate } = request.body;

                // Validuje, že nové datum není v minulosti
                const newPostDate = new Date(postDate);
                const now = new Date();
                if (newPostDate <= now) {
                    return reply.status(400).send({ error: 'Schedule date cannot be in the past' });
                }

                // Najde obsah propojený k této síti pro tento příspěvek
                const linkedContent = await prisma.postedContent.findFirst({
                    where: {
                        posts_id: postId,
                        networks_id: networkId
                    }
                });

                if (!linkedContent) {
                    return reply.status(400).send({ error: 'No content is linked to this network for this post' });
                }

                // Kontroluje, zda může uživatel plánovat tento obsah
                const canSchedule = await canScheduleContent(linkedContent.contents_id, networkId, request.session.userId!);
                if (!canSchedule) {
                    return reply.status(403).send({ error: 'Not authorized to schedule content for this network' });
                }

                // Kontroluje, zda byl obsah již publikován (actual_post_date je nastaveno)
                if (linkedContent.actual_post_date !== null) {
                    return reply.status(400).send({ error: 'Content has already been posted and cannot be rescheduled' });
                }

                // Aktualizuje datum publikování (umožňuje přeplánování pokud již nebylo publikováno)
                await prisma.postedContent.update({
                    where: {
                        posts_id_networks_id: {
                            posts_id: postId,
                            networks_id: networkId
                        }
                    },
                    data: {
                        post_date: newPostDate
                    }
                });

                const message = linkedContent.post_date !== null
                    ? 'Content rescheduled successfully'
                    : 'Content scheduled successfully';

                reply.status(200).send({ success: true, message: message });
            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Zruší plánované publikování obsahu ze sítě
     * @route DELETE /post/:postId/unschedule/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sítě
     * @returns Potvrzení o úspěšném zrušení plánovaného publikování
     */
    fastify.delete<{ Params: { postId: number, networkId: number }, Reply: IReply }>(
        '/post/:postId/unschedule/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Zrušení plánovaného publikování obsahu ze sítě',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: { success: true, message: Type.String() },
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId, networkId } = request.params;

                // Najde obsah propojený k této síti pro tento příspěvek
                const linkedContent = await prisma.postedContent.findFirst({
                    where: {
                        posts_id: postId,
                        networks_id: networkId
                    }
                });

                if (!linkedContent) {
                    return reply.status(400).send({ error: 'No content is linked to this network for this post' });
                }

                // Kontroluje, zda může uživatel plánovat tento obsah
                const canSchedule = await canScheduleContent(linkedContent.contents_id, networkId, request.session.userId!);
                if (!canSchedule) {
                    return reply.status(403).send({ error: 'Not authorized to unschedule content for this network' });
                }

                // Kontroluje, zda již byl obsah publikován (nelze zrušit plánování)
                if (linkedContent.actual_post_date !== null) {
                    return reply.status(400).send({ error: 'Content has already been posted and cannot be unscheduled' });
                }

                // Odstraní naplánovaný čas publikování
                await prisma.postedContent.update({
                    where: {
                        posts_id_networks_id: {
                            posts_id: postId,
                            networks_id: networkId
                        }
                    },
                    data: {
                        post_date: null
                    }
                });

                reply.status(200).send({ success: true, message: 'Content unscheduled successfully' });
            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Získá naplánovaný čas pro daný příspěvek a sociální síť
     * @route GET /post/:postId/scheduled/:networkId
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sítě
     * @returns Naplánovaný čas publikování obsahu
     */
    fastify.get<{ Params: { postId: number, networkId: number }, Reply: ScheduledTimeType | IReply }>(
        '/post/:postId/scheduled/:networkId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Get scheduled time for given post and social network',
                tags: ['post', 'network'],
                params: Type.Object({
                    postId: Type.Integer(),
                    networkId: Type.Integer()
                }),
                response: {
                    200: ScheduledTime
                },
            },
        },
        async (request, reply) => {
            const { postId, networkId } = request.params;

            // Najde obsah propojený k této síti pro tento příspěvek
            const linkedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: postId,
                    networks_id: networkId
                }
            });

            if (!linkedContent) {
                return reply.status(400).send({ error: 'No content is linked to this network for this post' });
            }

            // Kontroluje, zda může uživatel zobrazit tento obsah
            const canView = await canViewContent(linkedContent.contents_id, request.session.userId!);
            if (!canView) {
                return reply.status(403).send({ error: 'Not authorized to view scheduled time for this content' });
            }

            // Vrátí naplánovaný čas
            return reply.status(200).send({
                networkId: linkedContent.networks_id,
                contentId: linkedContent.contents_id,
                postDate: linkedContent.post_date ? linkedContent.post_date.toISOString() : undefined,
                actualPostDate: linkedContent.actual_post_date ? linkedContent.actual_post_date.toISOString() : undefined,
                networkPostId: linkedContent.network_post_id || undefined
            });
        }
    );

    /**
     * Získá detail příspěvku se všemi dostupnými informacemi
     * @route GET /post/:postId
     * @param request.params.postId - ID příspěvku
     * @returns Detailní informace o příspěvku včetně obsahu, příloh a plánovaných časů
     */
    fastify.get<{ Params: { postId: number }, Reply: PostDetailType | IReply }>(
        '/post/:postId',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'Get complete post detail with all available information for the user',
                tags: ['post'],
                params: Type.Object({
                    postId: Type.Integer()
                }),
                response: {
                    200: PostDetail
                },
            },
        },
        async (request, reply) => {
            try {
                const { postId } = request.params;

                // Kontroluje, zda příspěvek existuje a získá základní informace s detaily tvůrce
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
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

                if (!post) {
                    return reply.status(404).send({ error: 'Post not found' });
                }

                // Kontroluje základní přístup k příspěvku - uživatel musí být vlastník nebo editor
                const hasBasicAccess = await hasPostPermission(postId, request.session.userId!);

                // Pokud uživatel není vlastník/editor, kontroluje, zda má přístup přes oprávnění ke čtení sítě
                let hasNetworkAccess = false;
                if (!hasBasicAccess) {
                    // Získá všechny sítě propojené s tímto příspěvkem
                    const linkedNetworks = await prisma.postedContent.findMany({
                        where: {
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    const linkedAttachmentNetworks = await prisma.postedContentAttachment.findMany({
                        where: {
                            posts_id: postId
                        },
                        select: {
                            networks_id: true
                        }
                    });

                    // Kombinuje všechna ID sítí
                    const allNetworkIds = [
                        ...linkedNetworks.map(ln => ln.networks_id),
                        ...linkedAttachmentNetworks.map(lan => lan.networks_id)
                    ];

                    const uniqueNetworkIds = [...new Set(allNetworkIds)];

                    // Kontroluje, zda má uživatel přístup ke čtení kterékoliv z těchto sítí
                    for (const networkId of uniqueNetworkIds) {
                        const hasReadAccess = await hasNetworkReadAccess(networkId, request.session.userId!);
                        if (hasReadAccess) {
                            hasNetworkAccess = true;
                            break;
                        }
                    }
                }

                // Pokud uživatel nemá základní přístup ani přístup k síti, odepři přístup
                if (!hasBasicAccess && !hasNetworkAccess) {
                    return reply.status(403).send({ error: 'Access denied' });
                }

                // Získá všechny obsahy pro tento příspěvek a filtruje podle oprávnění
                const allContents = await prisma.content.findMany({
                    where: {
                        posts_id: postId
                    }
                });

                const allowedContents = [];
                for (const content of allContents) {
                    let canView = await canViewContent(content.id, request.session.userId!);

                    // Pokud uživatel nemůže zobrazit přes standardní oprávnění, kontroluje přístup ke čtení propojených sítí
                    if (!canView) {
                        const linkedNetworks = await prisma.postedContent.findMany({
                            where: {
                                contents_id: content.id,
                                posts_id: postId
                            },
                            select: {
                                networks_id: true
                            }
                        });

                        // Kontroluje, zda má uživatel přístup ke čtení kterékoliv propojené sítě
                        for (const link of linkedNetworks) {
                            const hasReadAccess = await hasNetworkReadAccess(link.networks_id, request.session.userId!);
                            if (hasReadAccess) {
                                canView = true;
                                break;
                            }
                        }
                    }

                    if (canView) {
                        // Kontroluje, zda může uživatel editovat tento obsah
                        const canEdit = await canEditContent(content.id, request.session.userId!);

                        // Získá propojené sítě pro tento obsah
                        const linkedNetworks = await prisma.postedContent.findMany({
                            where: {
                                contents_id: content.id,
                                posts_id: postId
                            },
                            select: {
                                networks_id: true
                            }
                        });

                        allowedContents.push({
                            id: content.id,
                            postId: content.posts_id,
                            content: content.content,
                            linkedNetworks: linkedNetworks.map(ln => ln.networks_id),
                            canEdit: canEdit
                        });
                    }
                }

                // Získá všechny přílohy pro tento příspěvek a filtruje podle oprávnění
                const allAttachments = await prisma.attachment.findMany({
                    where: {
                        posts_id: postId
                    }
                });

                const allowedAttachments = [];
                for (const attachment of allAttachments) {
                    let canView = await canViewAttachment(attachment.id, request.session.userId!);

                    // Pokud uživatel nemůže zobrazit přes standardní oprávnění, kontroluje přístup ke čtení propojených sítí
                    if (!canView) {
                        const linkedNetworks = await prisma.postedContentAttachment.findMany({
                            where: {
                                attachments_id: attachment.id,
                                posts_id: postId
                            },
                            select: {
                                networks_id: true
                            }
                        });

                        // Kontroluje, zda má uživatel přístup ke čtení kterékoliv propojené sítě
                        for (const link of linkedNetworks) {
                            const hasReadAccess = await hasNetworkReadAccess(link.networks_id, request.session.userId!);
                            if (hasReadAccess) {
                                canView = true;
                                break;
                            }
                        }
                    }

                    if (canView) {
                        // Kontroluje, zda soubor existuje na disku
                        const filePath = path.join(process.env.UPLOADS_DIR!, postId.toString(), path.basename(attachment.path));
                        try {
                            await fsPromises.access(filePath, constants.R_OK);

                            // Získá propojené sítě pro tuto přílohu
                            const linkedNetworks = await prisma.postedContentAttachment.findMany({
                                where: {
                                    attachments_id: attachment.id,
                                    posts_id: postId
                                },
                                select: {
                                    networks_id: true
                                }
                            });

                            allowedAttachments.push({
                                id: attachment.id,
                                postId: attachment.posts_id,
                                fileName: attachment.path,
                                linkedNetworks: linkedNetworks.map(ln => ln.networks_id)
                            });
                        } catch (err) {
                            // Soubor neexistuje na disku, přeskočí ho
                            fastify.log.error(err);
                        }
                    }
                }

                // Získá informace o editorech příspěvku
                const postEditors = await prisma.postEditor.findMany({
                    where: {
                        posts_id: postId
                    },
                    include: {
                        users: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                });

                const editors = postEditors.map(pe => ({
                    userId: pe.users.id,
                    username: pe.users.username
                }));

                // Získá naplánované časy pro obsahy, které může uživatel zobrazit
                const scheduledTimes = [];
                const allowedContentIds = allowedContents.map(c => c.id);

                if (allowedContentIds.length > 0) {
                    const postedContents = await prisma.postedContent.findMany({
                        where: {
                            posts_id: postId,
                            contents_id: {
                                in: allowedContentIds
                            }
                        }
                    });

                    for (const pc of postedContents) {
                        scheduledTimes.push({
                            networkId: pc.networks_id,
                            contentId: pc.contents_id,
                            postDate: pc.post_date?.toISOString(),
                            actualPostDate: pc.actual_post_date?.toISOString(),
                            networkPostId: pc.network_post_id || undefined
                        });
                    }
                }

                // Odstraní problematickou kontrolu - uživatel má přístup k příspěvku i když nemá žádný obsah/přílohy
                // Nyní vrátí data příspěvku (i když jsou prázdná pro nové příspěvky)
                reply.status(200).send({
                    postId: post.id,
                    creator: {
                        id: post.users.id,
                        username: post.users.username,
                        displayname: post.users.displayname
                    },
                    contents: allowedContents,
                    attachments: allowedAttachments,
                    editors: editors,
                    scheduledTimes: scheduledTimes
                });

            } catch (error) {
                fastify.log.error(error);
                throw error;
            }
        }
    );

    /**
     * Získá seznam příspěvků uživatele s detailními informacemi a stránkováním
     * @route GET /post/list/detailed
     * @param request.query.page - Číslo stránky (výchozí 1)
     * @param request.query.limit - Počet příspěvků na stránku (výchozí 10, maximum 100)
     * @returns Stránkovaný seznam příspěvků vlastněných uživatelem s detailními informacemi
     */
    fastify.get<{ Querystring: { page?: number, limit?: number }, Reply: PaginatedDetailedPostsType | IReply }>(
        '/post/list/detailed',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'List users posts with detailed information and pagination - saves multiple API calls',
                tags: ['post'],
                querystring: Type.Object({
                    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
                    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 }))
                }),
                response: {
                    200: PaginatedDetailedPosts
                },
            },
        },
        async (request, reply) => {
            const page = request.query.page || 1;
            const limit = request.query.limit || 10;
            const skip = (page - 1) * limit;

            // Získá celkový počet pro stránkování
            const totalPosts = await prisma.post.count({
                where: {
                    creator_id: request.session.userId!
                }
            });

            const posts = await prisma.post.findMany({
                where: {
                    creator_id: request.session.userId!
                },
                skip: skip,
                take: limit,
                orderBy: {
                    id: 'desc' // Řadí podle nejnovějších
                }
            });

            const totalPages = Math.ceil(totalPosts / limit);

            // Získá detailní informace o každém příspěvku
            const detailedPosts: PostDetailType[] = [];
            for (const post of posts) {
                const postDetail = await getPostDetail(post.id, request.session.userId!);
                if (postDetail) {
                    detailedPosts.push(postDetail);
                }
            }

            reply.status(200).send({
                posts: detailedPosts,
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalPosts,
                    totalPages: totalPages
                }
            });
        }
    );

    /**
     * Získá seznam příspěvků kde je uživatel přiřazen jako editor s detailními informacemi a stránkováním
     * @route GET /post/editorlist/detailed
     * @param request.query.page - Číslo stránky (výchozí 1)
     * @param request.query.limit - Počet příspěvků na stránku (výchozí 10, maximum 100)
     * @returns Stránkovaný seznam příspěvků kde je uživatel editorem s detailními informacemi
     */
    fastify.get<{ Querystring: { page?: number, limit?: number }, Reply: PaginatedDetailedPostsType | IReply }>(
        '/post/editorlist/detailed',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'List posts where user is assigned as editor with detailed information and pagination - saves multiple API calls',
                tags: ['post'],
                querystring: Type.Object({
                    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
                    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 }))
                }),
                response: {
                    200: PaginatedDetailedPosts
                },
            },
        },
        async (request, reply) => {
            const page = request.query.page || 1;
            const limit = request.query.limit || 10;
            const skip = (page - 1) * limit;

            // Získá celkový počet pro stránkování - počítá příspěvky kde je uživatel editorem
            const totalPosts = await prisma.postEditor.count({
                where: {
                    editor_id: request.session.userId!
                }
            });

            // Získá příspěvky kde je uživatel přiřazen jako editor
            const postEditors = await prisma.postEditor.findMany({
                where: {
                    editor_id: request.session.userId!
                },
                include: {
                    posts: true
                },
                skip: skip,
                take: limit,
                orderBy: {
                    posts: {
                        id: 'desc' // Řadí podle nejnovějších
                    }
                }
            });

            const totalPages = Math.ceil(totalPosts / limit);

            // Získá detailní informace o každém příspěvku
            const detailedPosts: PostDetailType[] = [];
            for (const postEditor of postEditors) {
                const postDetail = await getPostDetail(postEditor.posts.id, request.session.userId!);
                if (postDetail) {
                    detailedPosts.push(postDetail);
                }
            }

            reply.status(200).send({
                posts: detailedPosts,
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalPosts,
                    totalPages: totalPages
                }
            });
        }
    );


    /**
     * Získá seznam příspěvků (naplánovaných a publikovaných) kde je uživatel tvůrcem nebo má přístup k síti
     * @route GET /post/list/filtered
     * @param request.query.page - Číslo stránky (výchozí 1)
     * @param request.query.limit - Počet příspěvků na stránku (výchozí 10, maximum 200)
     * @param request.query.networkId - ID sítě pro filtraci
     * @param request.query.startDate - Začátek časového období (ISO 8601)
     * @param request.query.endDate - Konec časového období (ISO 8601)
     * @returns Stránkovaný seznam příspěvků splňujících kritéria filtrace
     */
    fastify.get<{ Querystring: { page?: number, limit?: number, networkId?: number, startDate?: string, endDate?: string }, Reply: PaginatedDetailedPostsType | IReply }>(
        '/post/list/filtered',
        {
            preValidation: isAuthenticated,
            schema: {
                description: 'List posts (scheduled and posted) filtered by social network ID and time period where user is creator or has network read access',
                tags: ['post'],
                querystring: Type.Object({
                    page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
                    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200, default: 10 })),
                    networkId: Type.Optional(Type.Integer()),
                    startDate: Type.Optional(Type.String({ format: 'date-time' })),
                    endDate: Type.Optional(Type.String({ format: 'date-time' }))
                }),
                response: {
                    200: PaginatedDetailedPosts
                },
            },
        },
        async (request, reply) => {
            try {
                const page = request.query.page || 1;
                const limit = request.query.limit || 10;
                const skip = (page - 1) * limit;
                const networkId = request.query.networkId;

                // Nastaví výchozí časové období na aktuální den, pokud není poskytnuto
                const now = new Date();
                const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

                const startDate = request.query.startDate ? new Date(request.query.startDate) : startOfDay;
                const endDate = request.query.endDate ? new Date(request.query.endDate) : endOfDay;

                // Validuje časový rozsah
                if (startDate > endDate) {
                    return reply.status(400).send({ error: 'Start date cannot be after end date' });
                }

                // Vytvoří where klauzuli pro příspěvky (jak naplánované, tak publikované)
                let whereClause: any = {
                    OR: [
                        // Naplánované příspěvky - filtruje podle naplánovaného data
                        {
                            post_date: {
                                gte: startDate,
                                lte: endDate
                            },
                            actual_post_date: null
                        },
                        // Publikované příspěvky - filtruje podle skutečného data publikování
                        {
                            actual_post_date: {
                                gte: startDate,
                                lte: endDate
                            }
                        }
                    ]
                };

                // Přidá filtraci podle sítě, pokud je poskytnuta
                if (networkId) {
                    whereClause.networks_id = networkId;
                }

                // Získá všechny příspěvky v časovém období (jak naplánované, tak publikované, filtrováno podle sítě pokud je specifikováno)
                const allPosts = await prisma.postedContent.findMany({
                    where: whereClause,
                    include: {
                        posts: {
                            include: {
                                users: true
                            }
                        },
                        networks: true,
                        contents: true
                    }
                });

                // Filtruje příspěvky na základě oprávnění uživatele
                const accessiblePostIds = new Set<number>();

                for (const post of allPosts) {
                    const postId = post.posts_id;
                    const userId = request.session.userId!;

                    // Kontroluje, zda je uživatel tvůrcem nebo editorem příspěvku
                    const hasBasicAccess = await hasPostPermission(postId, userId);

                    if (hasBasicAccess) {
                        accessiblePostIds.add(postId);
                        continue;
                    }

                    // Kontroluje, zda má uživatel přístup ke čtení sítě
                    const hasNetworkAccess = await hasNetworkReadAccess(post.networks_id, userId);
                    if (hasNetworkAccess) {
                        accessiblePostIds.add(postId);
                    }
                }

                // Získá unikátní ID příspěvků, ke kterým má uživatel přístup
                const accessiblePostIdsArray = Array.from(accessiblePostIds);

                if (accessiblePostIdsArray.length === 0) {
                    return reply.status(200).send({
                        posts: [],
                        pagination: {
                            page: page,
                            limit: limit,
                            total: 0,
                            totalPages: 0
                        }
                    });
                }

                // Získá celkový počet pro stránkování
                const totalPosts = accessiblePostIdsArray.length;

                // Aplikuje stránkování na přístupná ID příspěvků
                const paginatedPostIds = accessiblePostIdsArray.slice(skip, skip + limit);

                // Získá detailní informace o každém přístupném příspěvku
                const detailedPosts: PostDetailType[] = [];
                for (const postId of paginatedPostIds) {
                    const postDetail = await getPostDetail(postId, request.session.userId!);
                    if (postDetail) {
                        // Filtruje naplánované časy, aby zobrazovalo pouze ty v našem časovém období a podle filtru sítě
                        postDetail.scheduledTimes = postDetail.scheduledTimes.filter(st => {
                            // Pro naplánované příspěvky, kontroluje post_date
                            if (st.postDate && !st.actualPostDate) {
                                const scheduleDate = new Date(st.postDate);
                                const inTimeRange = scheduleDate >= startDate && scheduleDate <= endDate;

                                if (networkId) {
                                    return inTimeRange && st.networkId === networkId;
                                }
                                return inTimeRange;
                            }

                            // Pro publikované příspěvky, kontroluje actual_post_date
                            if (st.actualPostDate) {
                                const actualDate = new Date(st.actualPostDate);
                                const inTimeRange = actualDate >= startDate && actualDate <= endDate;

                                if (networkId) {
                                    return inTimeRange && st.networkId === networkId;
                                }
                                return inTimeRange;
                            }

                            return false;
                        });

                        // Zahrnuje pouze příspěvky, které stále mají naplánované časy po filtrování
                        if (postDetail.scheduledTimes.length > 0) {
                            detailedPosts.push(postDetail);
                        }
                    }
                }

                const totalPages = Math.ceil(totalPosts / limit);

                reply.status(200).send({
                    posts: detailedPosts,
                    pagination: {
                        page: page,
                        limit: limit,
                        total: totalPosts,
                        totalPages: totalPages
                    }
                });

            } catch (error) {
                fastify.log.error(error);
                return reply.status(500).send({ error: 'Internal server error' });
            }
        }
    );

    /**
     * Získá maximální povolenou velikost souboru pro nahrávání
     * @route GET /post/attachmentsize
     * @returns Maximální velikost souboru v bajtech
     */
    fastify.get<{ Reply: { maxFileSize: number } | IReply }>(
        '/post/attachmentsize',
        {
            schema: {
                description: 'Získání maximální povolené velikosti souboru pro nahrávání',
                tags: ['post'],
                response: {
                    200: Type.Object({
                        maxFileSize: Type.Integer({ description: 'Maximální velikost souboru v bajtech' })
                    })
                },
            },
        },
        async (request, reply) => {
            const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5000000", 10);
            reply.status(200).send({ maxFileSize });
        }
    );

}

export default routes;

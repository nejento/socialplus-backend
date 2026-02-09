import {PrismaClient} from "../generated/client";

export const prisma = new PrismaClient();

/**
 * Zkontrolovat, zda je uživatel autentizován pro preValidation hook
 * @param request
 * @param reply
 */
export async function isAuthenticated(request: any, reply: any) {
    if (!request.session.authenticated) return reply.status(401).send({ error: "Unauthorized" });
}

/**
 * Zkontrolovat, zda je uživatel tvůrce nebo editor příspěvku a má oprávnění k úpravě příspěvku
 * @param postId ID příspěvku
 * @param userId ID uživatele
 */
export async function hasPostPermission(postId: number, userId: number): Promise<boolean> {
    const postEditor = await prisma.postEditor.findFirst({
        where: {
            posts_id: postId,
            editor_id: userId
        }
    });

    const post = await prisma.post.findFirst({
        where: {
            id: postId,
            creator_id: userId
        }
    });

    return !!post || !!postEditor;
}

/**
 * Zkontrolovat, zda je uživatel tvůrce příspěvku
 * @param postId ID příspěvku
 * @param userId ID uživatele
 */
export async function isPostOwner(postId: number, userId: number): Promise<boolean> {
    const post = await prisma.post.findFirst({
        where: {
            id: postId,
            creator_id: userId
        }
    });
    return !!post;
}

/**
 * Získat síť podle ID
 * @param networkId ID sítě
 */
export async function getNetwork(networkId: number) {
    return prisma.network.findUnique({
        where: {
            id: networkId
        }
    });
}

/**
 * Zkontrolovat, zda uživatel může přispívat do sítě nebo je vlastníkem sítě
 * @param networkId
 * @param userId
 */
export async function canPostToNetwork(networkId: number, userId: number): Promise<boolean> {
    const networkMember = await prisma.networksUsers.findFirst({
        where: {
            networks_id: networkId,
            grantee_id: userId,
            permission: "post"
        }
    });

    const networkOwner = await prisma.network.findFirst({
        where: {
            id: networkId,
            owner_id: userId
        }
    });

    return !!networkMember || !!networkOwner;
}

/**
 * Zkontrolovat, zda uživatel může zobrazit obsah - buď má přístup k sítím, kde je obsah zveřejněn
 * nebo je uživatel editor/vlastník příspěvku
 * @param contentId ID obsahu
 * @param userId ID uživatele
 */
export async function canViewContent(contentId: number, userId: number): Promise<boolean> {
    // Získat obsah pro nalezení příspěvku, ke kterému patří
    const content = await prisma.content.findUnique({
        where: {
            id: contentId
        }
    });

    if (!content) return false;

    // Zkontrolovat, zda je uživatel editor/vlastník příspěvku - pokud ano, může vidět veškerý obsah
    const isEditor = await hasPostPermission(content.posts_id, userId);
    if (isEditor) return true;

    // Získat všechny zveřejněné obsahy pro tento obsah (sítě, kde je propojen)
    const postedContents = await prisma.postedContent.findMany({
        where: {
            contents_id: contentId
        }
    });

    // Pokud obsah není propojen s žádnou sítí, může ho vidět pouze editor/vlastník příspěvku
    if (postedContents.length === 0) return false;

    // Zkontrolovat, zda má uživatel přístup k jakékoli síti, kde je tento obsah zveřejněn
    for (const pc of postedContents) {
        // Zkontrolovat, zda je uživatel vlastník sítě
        const network = await prisma.network.findFirst({
            where: {
                id: pc.networks_id,
                owner_id: userId
            }
        });

        if (network) return true;

        // Zkontrolovat, zda má uživatel oprávnění ke čtení/zápisu v této síti
        const networkAccess = await prisma.networksUsers.findFirst({
            where: {
                networks_id: pc.networks_id,
                grantee_id: userId,
                permission: {
                    in: ['read', 'write']
                }
            }
        });

        if (networkAccess) return true;
    }

    return false;
}

/**
 * Zkontrolovat, zda uživatel může zobrazit přílohu - buď má přístup k sítím, kde je příloha zveřejněna
 * nebo je uživatel editor/vlastník příspěvku
 * @param attachmentId ID přílohy
 * @param userId ID uživatele
 */
export async function canViewAttachment(attachmentId: number, userId: number): Promise<boolean> {
    // Získat přílohu pro nalezení příspěvku, ke kterému patří
    const attachment = await prisma.attachment.findUnique({
        where: {
            id: attachmentId
        }
    });

    if (!attachment) return false;

    // Zkontrolovat, zda je uživatel editor/vlastník příspěvku - pokud ano, může vidět všechny přílohy
    const isEditor = await hasPostPermission(attachment.posts_id, userId);
    if (isEditor) return true;

    // Získat všechny přílohy zveřejněného obsahu pro tuto přílohu (sítě, kde je propojená)
    const postedAttachments = await prisma.postedContentAttachment.findMany({
        where: {
            attachments_id: attachmentId
        }
    });

    // Pokud příloha není propojena s žádnou sítí, může ji vidět pouze editor/vlastník příspěvku
    if (postedAttachments.length === 0) return false;

    // Zkontrolovat, zda má uživatel přístup k jakékoli síti, kde je tato příloha zveřejněna
    for (const pa of postedAttachments) {
        // Zkontrolovat, zda je uživatel vlastník sítě
        const network = await prisma.network.findFirst({
            where: {
                id: pa.networks_id,
                owner_id: userId
            }
        });

        if (network) return true;

        // Zkontrolovat, zda má uživatel oprávnění ke čtení/zápisu v této síti
        const networkAccess = await prisma.networksUsers.findFirst({
            where: {
                networks_id: pa.networks_id,
                grantee_id: userId,
                permission: {
                    in: ['read', 'write']
                }
            }
        });

        if (networkAccess) return true;
    }

    return false;
}

/**
 * Zkontrolovat, zda má uživatel oprávnění k zápisu do sítě (může přispívat/plánovat obsah)
 * @param networkId ID sítě
 * @param userId ID uživatele
 */
export async function hasNetworkWriteAccess(networkId: number, userId: number): Promise<boolean> {
    const networkOwner = await prisma.network.findFirst({
        where: {
            id: networkId,
            owner_id: userId
        }
    });

    if (networkOwner) return true;

    const networkMember = await prisma.networksUsers.findFirst({
        where: {
            networks_id: networkId,
            grantee_id: userId,
            permission: "write"
        }
    });

    return !!networkMember;
}

/**
 * Zkontrolovat, zda má uživatel oprávnění ke čtení ze sítě (může zobrazit obsah)
 * @param networkId ID sítě
 * @param userId ID uživatele
 */
export async function hasNetworkReadAccess(networkId: number, userId: number): Promise<boolean> {
    const networkOwner = await prisma.network.findFirst({
        where: {
            id: networkId,
            owner_id: userId
        }
    });

    if (networkOwner) return true;

    const networkMember = await prisma.networksUsers.findFirst({
        where: {
            networks_id: networkId,
            grantee_id: userId,
            permission: {
                in: ['read', 'write']
            }
        }
    });

    return !!networkMember;
}

/**
 * Zkontrolovat, zda uživatel může smazat/odpojit obsah z konkrétní sítě
 * Pravidla: Tvůrce příspěvku může kompletně smazat, vlastník sítě nebo editor může odpojit ze své sítě
 * @param contentId ID obsahu
 * @param networkId ID sítě (volitelné - pokud je zadáno, kontroluje oprávnění k odpojení)
 * @param userId ID uživatele
 */
export async function canDeleteContent(contentId: number, userId: number, networkId?: number): Promise<{ canDelete: boolean, canUnlink: boolean }> {
    const content = await prisma.content.findUnique({
        where: {
            id: contentId
        }
    });

    if (!content) return { canDelete: false, canUnlink: false };

    // Zkontrolovat, zda je uživatel tvůrce příspěvku - může kompletně smazat
    const isPostCreator = await isPostOwner(content.posts_id, userId);

    if (networkId) {
        // Zkontrolovat, zda uživatel může odpojit z konkrétní sítě (vlastník sítě nebo má oprávnění k zápisu)
        const canUnlinkFromNetwork = await hasNetworkWriteAccess(networkId, userId);
        return {
            canDelete: isPostCreator,
            canUnlink: canUnlinkFromNetwork
        };
    }

    return { canDelete: isPostCreator, canUnlink: false };
}

/**
 * Zkontrolovat, zda uživatel může naplánovat zveřejnění obsahu
 * Pravidla: Tvůrce příspěvku nebo vlastník sítě, kde je obsah propojen, může naplánovat obsah
 * @param contentId ID obsahu
 * @param networkId ID sítě
 * @param userId ID uživatele
 */
export async function canScheduleContent(contentId: number, networkId: number, userId: number): Promise<boolean> {
    const content = await prisma.content.findUnique({
        where: {
            id: contentId
        }
    });

    if (!content) return false;

    // Zkontrolovat, zda je uživatel tvůrce příspěvku
    const isPostCreator = await isPostOwner(content.posts_id, userId);
    if (isPostCreator) return true;

    // Zkontrolovat, zda je uživatel vlastník konkrétní sítě
    const network = await prisma.network.findFirst({
        where: {
            id: networkId,
            owner_id: userId
        }
    });

    return !!network;
}

/**
 * Zkontrolovat, zda uživatel může upravovat obsah
 * Pravidla:
 * 1. Uživatel je tvůrce příspěvku
 * 2. Uživatel je přidán jako editor příspěvku a obsah je propojen se sociální sítí, kde má oprávnění k zápisu
 * 3. Uživatel je vlastník sociální sítě, se kterou je obsah propojen
 * @param contentId ID obsahu
 * @param userId ID uživatele
 */
export async function canEditContent(contentId: number, userId: number): Promise<boolean> {
    const content = await prisma.content.findUnique({
        where: {
            id: contentId
        }
    });

    if (!content) return false;

    // Pravidlo 1: Zkontrolovat, zda je uživatel tvůrce příspěvku
    const isPostCreator = await isPostOwner(content.posts_id, userId);
    if (isPostCreator) return true;

    // Zkontrolovat, zda je uživatel přidán jako editor příspěvku
    const isPostEditor = await prisma.postEditor.findFirst({
        where: {
            posts_id: content.posts_id,
            editor_id: userId
        }
    });

    // Pokud uživatel není editor příspěvku, zkontrolovat, zda je vlastník sítě (Pravidlo 3)
    if (!isPostEditor) {
        // Získat sítě, kde je tento obsah propojen
        const linkedNetworks = await prisma.postedContent.findMany({
            where: {
                contents_id: contentId
            },
            select: {
                networks_id: true
            }
        });

        // Zkontrolovat, zda je uživatel vlastník jakékoli sítě, se kterou je obsah propojen
        for (const link of linkedNetworks) {
            const network = await prisma.network.findFirst({
                where: {
                    id: link.networks_id,
                    owner_id: userId
                }
            });
            if (network) return true;
        }

        return false;
    }

    // Pravidlo 2: Uživatel je editor příspěvku - zkontrolovat, zda je obsah propojen se sítěmi, kde má uživatel oprávnění k zápisu
    const linkedNetworks = await prisma.postedContent.findMany({
        where: {
            contents_id: contentId
        },
        select: {
            networks_id: true
        }
    });

    // Pokud obsah není propojen s žádnou sítí, editor příspěvku ho stále může upravovat
    if (linkedNetworks.length === 0) return true;

    // Zkontrolovat, zda má uživatel oprávnění k zápisu v jakékoli síti, se kterou je obsah propojen
    for (const link of linkedNetworks) {
        const hasWriteAccess = await hasNetworkWriteAccess(link.networks_id, userId);
        if (hasWriteAccess) return true;
    }

    return false;
}

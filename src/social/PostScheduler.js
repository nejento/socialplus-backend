"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostScheduler = void 0;
const SocialNetworkProviderFactory_1 = require("./SocialNetworkProviderFactory");
const logger_1 = require("../utils/logger");
/**
 * Hlavní plánovač pro zpracování naplánovaných příspěvků na sociálních sítích
 */
class PostScheduler {
    prisma;
    isRunning = false;
    schedulerInterval = null;
    checkIntervalMs;
    /**
     * Konstruktor pro PostScheduler
     * @param prisma - Instance Prisma klienta pro databázové operace
     * @param checkIntervalMinutes - Interval kontroly v minutách (výchozí: 1)
     */
    constructor(prisma, checkIntervalMinutes = 1) {
        this.prisma = prisma;
        this.checkIntervalMs = checkIntervalMinutes * 60 * 1000; // Převod na milisekundy
    }
    /**
     * Spustí plánovač
     * @returns void
     */
    start() {
        if (this.isRunning) {
            logger_1.logger.info('[PostScheduler] Post scheduler is already running');
            return;
        }
        this.isRunning = true;
        logger_1.logger.info(`[PostScheduler] Post scheduler started, checking every ${this.checkIntervalMs / 60000} minutes`);
        // Spustí okamžitě, poté nastaví interval
        this.checkAndProcessPosts();
        this.schedulerInterval = setInterval(() => {
            this.checkAndProcessPosts();
        }, this.checkIntervalMs);
    }
    /**
     * Zastaví plánovač
     * @returns void
     */
    stop() {
        if (this.schedulerInterval) {
            clearInterval(this.schedulerInterval);
            this.schedulerInterval = null;
        }
        this.isRunning = false;
        logger_1.logger.info('[PostScheduler] Post scheduler stopped');
    }
    /**
     * Zkontroluje příspěvky, které je třeba odeslat, a zpracuje je
     * @returns Promise<void>
     */
    async checkAndProcessPosts() {
        try {
            logger_1.logger.info('[PostScheduler] Checking for scheduled posts...');
            const now = new Date();
            const scheduledPosts = await this.getScheduledPosts(now);
            if (scheduledPosts.length === 0) {
                logger_1.logger.info('[PostScheduler] No posts to process at this time');
                return;
            }
            logger_1.logger.info(`[PostScheduler] Found ${scheduledPosts.length} posts to process`);
            // Zpracuje každý příspěvek
            for (const scheduledPost of scheduledPosts) {
                await this.processScheduledPost(scheduledPost);
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, '[PostScheduler] Error checking scheduled posts:');
        }
    }
    /**
     * Získá příspěvky, které jsou naplánovány k odeslání nyní nebo v minulosti
     * @param currentTime - Aktuální čas pro porovnání
     * @returns Promise<ScheduledPost[]> - Seznam naplánovaných příspěvků
     */
    async getScheduledPosts(currentTime) {
        const postedContent = await this.prisma.postedContent.findMany({
            where: {
                post_date: {
                    lte: currentTime
                },
                actual_post_date: null, // Ještě nebylo odesláno
                network_post_id: null // Žádné ID příspěvku znamená, že nebyl odeslán
            },
            include: {
                contents: true,
                networks: {
                    include: {
                        network_tokens: true
                    }
                },
                posts: {
                    include: {
                        attachments: true
                    }
                }
            },
            orderBy: {
                post_date: 'asc'
            }
        });
        // Transformace do formátu ScheduledPost
        const scheduledPosts = [];
        for (const pc of postedContent) {
            // Vytvoří mapu tokenů
            const tokens = {};
            pc.networks.network_tokens.forEach(token => {
                tokens[token.token_name] = token.token;
            });
            // Získá cesty příloh
            const attachments = pc.posts.attachments.map(att => att.path);
            scheduledPosts.push({
                postId: pc.posts_id,
                networkId: pc.networks_id,
                contentId: pc.contents_id,
                content: pc.contents.content,
                attachments: attachments,
                scheduledDate: pc.post_date,
                networkType: pc.networks.network_type,
                tokens: tokens
            });
        }
        return scheduledPosts;
    }
    /**
     * Zpracuje jeden naplánovaný příspěvek
     * @param scheduledPost - Naplánovaný příspěvek k zpracování
     * @returns Promise<void>
     */
    async processScheduledPost(scheduledPost) {
        try {
            logger_1.logger.info(`[PostScheduler] Processing post ${scheduledPost.postId} for ${scheduledPost.networkType}`);
            // Získá příslušný provider
            const provider = SocialNetworkProviderFactory_1.SocialNetworkProviderFactory.getProvider(scheduledPost.networkType);
            if (!provider) {
                throw new Error(`[PostScheduler] No provider found for network type: ${scheduledPost.networkType}`);
            }
            // Validuje tokeny
            if (!provider.validateTokens(scheduledPost.tokens)) {
                throw new Error(`[PostScheduler] Invalid tokens for ${scheduledPost.networkType}`);
            }
            // Odešle příspěvek
            const networkPostId = await provider.sendPost(scheduledPost.content, scheduledPost.attachments, scheduledPost.tokens);
            // Aktualizuje databázi s výsledkem
            await this.updatePostResult(scheduledPost, networkPostId);
            if (networkPostId) {
                logger_1.logger.info(`[PostScheduler] Successfully posted to ${scheduledPost.networkType} with ID: ${networkPostId}`);
            }
            else {
                logger_1.logger.error(`[PostScheduler] Failed to post to ${scheduledPost.networkType}`);
            }
        }
        catch (error) {
            logger_1.logger.error({ err: error }, `[PostScheduler] Error processing post ${scheduledPost.postId}:`);
            // Aktualizuje databázi s chybou (actual_post_date nastaveno ale bez network_post_id)
            await this.updatePostResult(scheduledPost, null);
        }
    }
    /**
     * Aktualizuje databázi s výsledkem odesílání
     * @param scheduledPost - Naplánovaný příspěvek
     * @param networkPostId - ID příspěvku na síti nebo null při chybě
     * @returns Promise<void>
     */
    async updatePostResult(scheduledPost, networkPostId) {
        try {
            await this.prisma.postedContent.update({
                where: {
                    posts_id_networks_id: {
                        posts_id: scheduledPost.postId,
                        networks_id: scheduledPost.networkId
                    }
                },
                data: {
                    actual_post_date: new Date(),
                    network_post_id: networkPostId
                }
            });
        }
        catch (error) {
            logger_1.logger.error({ err: error }, `[PostScheduler] Error updating post result for post ${scheduledPost.postId}:`);
        }
    }
    /**
     * Získá stav plánovače
     * @returns Objekt s informacemi o stavu plánovače
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            checkIntervalMinutes: this.checkIntervalMs / 60000,
            nextCheck: this.schedulerInterval ? new Date(Date.now() + this.checkIntervalMs) : undefined
        };
    }
    /**
     * Manuálně spustí kontrolu (užitečné pro testování)
     * @returns Promise<void>
     */
    async manualCheck() {
        logger_1.logger.info('[PostScheduler] Manual check triggered');
        await this.checkAndProcessPosts();
    }
    /**
     * Získá nadcházející naplánované příspěvky
     * @param hoursAhead - Počet hodin do budoucna (výchozí: 24)
     * @returns Promise<ScheduledPost[]> - Seznam nadcházejících příspěvků
     */
    async getUpcomingPosts(hoursAhead = 24) {
        const now = new Date();
        const futureTime = new Date(now.getTime() + (hoursAhead * 60 * 60 * 1000));
        const postedContent = await this.prisma.postedContent.findMany({
            where: {
                post_date: {
                    gt: now,
                    lte: futureTime
                },
                actual_post_date: null,
                network_post_id: null
            },
            include: {
                contents: true,
                networks: true,
                posts: {
                    include: {
                        attachments: true
                    }
                }
            },
            orderBy: {
                post_date: 'asc'
            }
        });
        return postedContent.map(pc => ({
            postId: pc.posts_id,
            networkId: pc.networks_id,
            contentId: pc.contents_id,
            content: pc.contents.content,
            attachments: pc.posts.attachments.map(att => att.path),
            scheduledDate: pc.post_date,
            networkType: pc.networks.network_type,
            tokens: {} // Nezveřejňuje tokeny v náhledu
        }));
    }
}
exports.PostScheduler = PostScheduler;

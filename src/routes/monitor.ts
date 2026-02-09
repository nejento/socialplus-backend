import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { PrismaClient } from '../generated/client';
import { PerformanceMonitorService } from '../social/PerformanceMonitorService';
import { isAuthenticated, hasPostPermission } from '../utils/helpers';

const prisma = new PrismaClient();

// Inicializuje službu monitorování výkonu (mělo by být ideálně singleton)
let performanceMonitor: PerformanceMonitorService | null = null;

// Schémata pro API odpovědi
const PostPerformanceMetrics = Type.Object({
    postId: Type.String(),
    networkType: Type.String(),
    timestamp: Type.String(),
    views: Type.Optional(Type.Number()),
    likes: Type.Optional(Type.Number()),
    shares: Type.Optional(Type.Number()),
    comments: Type.Optional(Type.Number()),
    reposts: Type.Optional(Type.Number()),
    reactions: Type.Optional(Type.Record(Type.String(), Type.Number())),
    reach: Type.Optional(Type.Number()),
    impressions: Type.Optional(Type.Number()),
    engagement: Type.Optional(Type.Number()),
    clickThroughRate: Type.Optional(Type.Number()),
    customMetrics: Type.Optional(Type.Record(Type.String(), Type.Any()))
});

const MonitorResponse = Type.Object({
    data: Type.Optional(Type.Any())
});

const MetricsHistoryResponse = Type.Object({
    metrics: Type.Array(PostPerformanceMetrics)
});

const GraphDataResponse = Type.Object({
    networks: Type.Array(Type.Object({
        networkId: Type.Number(),
        networkType: Type.String(),
        data: Type.Array(Type.Object({
            timestamp: Type.String(),
            likes: Type.Optional(Type.Number()),
            shares: Type.Optional(Type.Number()),
            comments: Type.Optional(Type.Number()),
            reposts: Type.Optional(Type.Number()),
            views: Type.Optional(Type.Number()),
            reach: Type.Optional(Type.Number()),
            impressions: Type.Optional(Type.Number()),
            engagement: Type.Optional(Type.Number()),
            clickThroughRate: Type.Optional(Type.Number())
        }, { additionalProperties: true }))
    }))
});

const AvailableMetricsResponse = Type.Object({
    networks: Type.Array(Type.Object({
        networkId: Type.Number(),
        networkType: Type.String(),
        availableMetrics: Type.Array(Type.String())
    }))
});

const CurrentMetricsResponse = Type.Object({
    networks: Type.Array(Type.Object({
        networkId: Type.Number(),
        networkType: Type.String(),
        data: Type.Object({
            timestamp: Type.String(),
            likes: Type.Optional(Type.Number()),
            shares: Type.Optional(Type.Number()),
            comments: Type.Optional(Type.Number()),
            reposts: Type.Optional(Type.Number()),
            views: Type.Optional(Type.Number()),
            reach: Type.Optional(Type.Number()),
            impressions: Type.Optional(Type.Number()),
            engagement: Type.Optional(Type.Number()),
            clickThroughRate: Type.Optional(Type.Number()),
            reactions: Type.Optional(Type.Record(Type.String(), Type.Number())),
            customMetrics: Type.Optional(Type.Record(Type.String(), Type.Any()))
        }, { additionalProperties: true })
    }))
});

const StatsResponse = Type.Object({
    unplannedPosts: Type.Number(),
    scheduledPosts: Type.Number(),
    nextScheduledDate: Type.Union([Type.String(), Type.Null()]),
    monitoredPosts: Type.Number()
});

interface IReply {
    200: { message: string; data?: any };
    400: { error: string };
    401: { error: string };
    403: { error: string };
    404: { error: string };
    500: { error: string };
}

interface IMetricsHistoryReply {
    200: { metrics: any[] };
    400: { error: string };
    401: { error: string };
    403: { error: string };
    404: { error: string };
    500: { error: string };
}

interface IGraphDataReply {
    200: { networks: any[] };
    400: { error: string };
    401: { error: string };
    403: { error: string };
    404: { error: string };
    500: { error: string };
}

interface IAvailableMetricsReply {
    200: { networks: any[] };
    400: { error: string };
    401: { error: string };
    403: { error: string };
    404: { error: string };
    500: { error: string };
}

interface ICurrentMetricsReply {
    200: { networks: any[] };
    400: { error: string };
    401: { error: string };
    403: { error: string };
    404: { error: string };
    500: { error: string };
}

interface IStatsReply {
    200: {
        unplannedPosts: number;
        scheduledPosts: number;
        nextScheduledDate: string | null;
        monitoredPosts: number;
    };
    400: { error: string };
    401: { error: string };
    500: { error: string };
}

/**
 * Modul pro monitorování výkonu příspěvků na sociálních sítích
 * Poskytuje API pro sběr metrik, historii výkonu a dashboard statistiky
 * @param fastify - Instance Fastify serveru
 */
async function routes(fastify: FastifyInstance) {

    /**
     * Inicializuje službu monitorování výkonu, pokud ještě nebyla inicializována
     * Vytváří singleton instanci pro připojení k InfluxDB
     * @returns PerformanceMonitorService instance
     */
    const initializeMonitorService = async (): Promise<PerformanceMonitorService> => {
        if (!performanceMonitor) {
            const config = {
                url: process.env.INFLUXDB_URL || 'http://localhost:8086',
                token: process.env.INFLUXDB_TOKEN || '',
                org: process.env.INFLUXDB_ORG || 'socialplus',
                bucket: process.env.INFLUXDB_BUCKET || 'performance'
            };
            performanceMonitor = new PerformanceMonitorService(config);
        }
        return performanceMonitor;
    };

    /**
     * Spustí manuální sběr metrik výkonu pro konkrétní příspěvek
     * Sbírá metriky ze všech sociálních sítí na které byl příspěvek publikován
     * @route POST /:postId/collect
     * @param request.params.postId - ID příspěvku pro sběr metrik
     * @returns Výsledky sběru metrik ze všech sítí včetně případných chyb
     */
    fastify.post<{
        Params: { postId: string };
        Reply: IReply;
    }>('/:postId/collect', {
        schema: {
            description: 'Manuálně spustí sběr metrik výkonu pro konkrétní příspěvek napříč všemi sítěmi, na které byl zveřejněn',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String()
            }),
            response: {
                200: MonitorResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId } = request.params;
            const userId = request.session.userId!;

            // Najde veškerý zveřejněný obsah pro tento příspěvek
            const postedContents = await prisma.postedContent.findMany({
                where: {
                    posts_id: parseInt(postId),
                    actual_post_date: {
                        not: null // Pouze příspěvky, které byly skutečně zveřejněny
                    },
                    network_post_id: {
                        not: null // Pouze příspěvky, které mají ID síťového příspěvku
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (postedContents.length === 0) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to any network' });
            }

            // Zkontroluje, zda má uživatel oprávnění monitorovat tento příspěvek
            const firstPost = postedContents[0];
            if (firstPost.posts.creator_id !== userId) {
                const hasPermission = await hasPostPermission(userId, firstPost.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to monitor this post' });
                }
            }

            // Inicializuje službu monitorování
            const monitor = await initializeMonitorService();

            // Sbírá metriky pro všechny sítě
            const results = [];
            const errors = [];

            for (const postedContent of postedContents) {
                try {
                    const metrics = await monitor.monitorPostManually(
                        postedContent.network_post_id!,
                        postedContent.networks.network_type,
                        userId
                    );

                    if (metrics) {
                        results.push({
                            networkId: postedContent.networks.id,
                            ...metrics,
                            networkType: postedContent.networks.network_type,
                            timestamp: metrics.timestamp.toISOString()
                        });
                    } else {
                        errors.push({
                            networkType: postedContent.networks.network_type,
                            error: 'Failed to retrieve metrics'
                        });
                    }
                } catch (networkError: any) {
                    errors.push({
                        networkType: postedContent.networks.network_type,
                        error: networkError.message || 'Unknown error'
                    });
                }
            }

            // Odešle odpověď s výsledky a případnými chybami
            reply.code(200).send({
                message: 'Performance metrics collected successfully',
                data: {
                    collected: results,
                    errors: errors.length > 0 ? errors : undefined,
                    totalNetworks: postedContents.length,
                    successfulCollections: results.length
                }
            });

        } catch (error: any) {
            fastify.log.error('Error triggering performance monitoring:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá nejnovější metriky výkonu pro příspěvek na konkrétní síti
     * @route GET /:postId/network/:networkId/latest
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sociální sítě
     * @returns Nejnovější dostupné metriky výkonu
     */
    fastify.get<{
        Params: { postId: string; networkId: string };
        Reply: IReply;
    }>('/:postId/network/:networkId/latest', {
        schema: {
            description: 'Získá nejnovější metriky výkonu pro konkrétní příspěvek na konkrétní síti',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String(),
                networkId: Type.String()
            }),
            response: {
                200: MonitorResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId, networkId } = request.params;
            const userId = request.session.userId!;

            // Získá síť pro validaci networkId a typ sítě
            const network = await prisma.network.findUnique({
                where: {
                    id: parseInt(networkId)
                }
            });

            if (!network) {
                return reply.code(404).send({ error: 'Network not found' });
            }

            // Validuje typ sítě
            const validNetworks = ['facebook', 'instagram', 'threads', 'twitter', 'bluesky', 'mastodon'];
            if (!validNetworks.includes(network.network_type)) {
                return reply.code(400).send({ error: 'Invalid network type' });
            }

            // Najde zveřejněný obsah a zkontroluje, zda byl již zveřejněn
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: parseInt(postId),
                    networks_id: parseInt(networkId),
                    actual_post_date: {
                        not: null
                    },
                    network_post_id: {
                        not: null
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (!postedContent) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to this network' });
            }

            // Zkontroluje oprávnění
            if (postedContent.posts.creator_id !== userId) {
                const hasPermission = await hasPostPermission(userId, postedContent.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to view metrics for this post' });
                }
            }

            // Získá metriky
            const monitor = await initializeMonitorService();
            const metrics = await monitor.getPostMetrics(postedContent.network_post_id!, network.network_type);

            if (metrics) {
                reply.code(200).send({
                    message: 'Metrics retrieved successfully',
                    data: {
                        ...metrics,
                        timestamp: metrics.timestamp.toISOString()
                    }
                });
            } else {
                reply.code(404).send({ error: 'No metrics found for this post' });
            }

        } catch (error: any) {
            fastify.log.error('Error retrieving performance metrics:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá historii metrik výkonu pro příspěvek v časovém rozmezí
     * @route GET /:postId/network/:networkId/history
     * @param request.params.postId - ID příspěvku
     * @param request.params.networkId - ID sociální sítě
     * @param request.query.startDate - Počáteční datum (volitelné, výchozí: 7 dní zpět)
     * @param request.query.endDate - Konečné datum (volitelné, výchozí: dnes)
     * @returns Historie metrik v zadaném časovém období
     */
    fastify.get<{
        Params: { postId: string; networkId: string };
        Querystring: { startDate?: string; endDate?: string };
        Reply: IMetricsHistoryReply;
    }>('/:postId/network/:networkId/history', {
        schema: {
            description: 'Získá historii metrik výkonu pro konkrétní příspěvek na konkrétní síti v časovém rozmezí',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String(),
                networkId: Type.String()
            }),
            querystring: Type.Object({
                startDate: Type.Optional(Type.String()),
                endDate: Type.Optional(Type.String())
            }),
            response: {
                200: MetricsHistoryResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId, networkId } = request.params;
            const { startDate, endDate } = request.query;
            const userId = request.session.userId!;

            // Získá síť pro validaci networkId a typ sítě
            const network = await prisma.network.findUnique({
                where: {
                    id: parseInt(networkId)
                }
            });

            if (!network) {
                return reply.code(404).send({ error: 'Network not found' });
            }

            // Validuje typ sítě
            const validNetworks = ['facebook', 'instagram', 'threads', 'twitter', 'bluesky', 'mastodon'];
            if (!validNetworks.includes(network.network_type)) {
                return reply.code(400).send({ error: 'Invalid network type' });
            }

            // Nastaví výchozí časové rozmezí (posledních 7 dní, pokud není zadáno)
            const endDateTime = endDate ? new Date(endDate) : new Date();
            const startDateTime = startDate ? new Date(startDate) : new Date(endDateTime.getTime() - 7 * 24 * 60 * 60 * 1000);

            // Validuje data
            if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
                return reply.code(400).send({ error: 'Invalid date format. Use ISO date format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)' });
            }

            if (startDateTime >= endDateTime) {
                return reply.code(400).send({ error: 'Start date must be before end date' });
            }

            // Najde zveřejněný obsah a zkontroluje, zda byl již zveřejněn
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: parseInt(postId),
                    networks_id: parseInt(networkId),
                    actual_post_date: {
                        not: null
                    },
                    network_post_id: {
                        not: null
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (!postedContent) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to this network' });
            }

            // Zkontroluje oprávnění
            if (postedContent.posts.creator_id !== userId) {
                const hasPermission = await hasPostPermission(userId, postedContent.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to view metrics for this post' });
                }
            }

            // Získá historii metrik
            const monitor = await initializeMonitorService();
            const metricsHistory = await monitor.getPostMetricsHistory(
                postedContent.network_post_id!,
                network.network_type,
                startDateTime,
                endDateTime
            );

            // Převede časová razítka na ISO řetězce pro JSON odpověď
            const formattedMetrics = metricsHistory.map(metrics => ({
                ...metrics,
                timestamp: metrics.timestamp.toISOString()
            }));

            reply.code(200).send({
                metrics: formattedMetrics
            });

        } catch (error: any) {
            fastify.log.error('Error retrieving performance metrics history:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá stav služby monitorování
     * @route GET /status
     */
    fastify.get('/status', {
        schema: {
            description: 'Získá stav služby monitorování výkonu',
            tags: ['monitor'],
            response: {
                200: MonitorResponse,
                401: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            await initializeMonitorService();

            reply.code(200).send({
                message: 'Performance monitoring service is running',
                data: {
                    serviceActive: true,
                    supportedNetworks: ['facebook', 'instagram', 'threads', 'twitter', 'bluesky', 'mastodon']
                }
            });

        } catch (error: any) {
            fastify.log.error('Error checking service status:', error);
            reply.code(500).send({ error: error.message || 'Service unavailable' });
        }
    });

    /**
     * Získá grafová data pro příspěvek na konkrétní síti
     * @route GET /:postId/network/:networkId/graph
     */
    fastify.get<{
        Params: { postId: string; networkId: string };
        Querystring: { metrics?: string };
        Reply: IGraphDataReply;
    }>('/:postId/network/:networkId/graph', {
        schema: {
            description: 'Získá grafová data pro konkrétní příspěvek na konkrétní síti, volitelně filtrováno podle metrik (oddělených čárkami)',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String(),
                networkId: Type.String()
            }),
            querystring: Type.Object({
                metrics: Type.Optional(Type.String())
            }),
            response: {
                200: GraphDataResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId, networkId } = request.params;
            const { metrics } = request.query;
            const userId = request.session.userId!;

            // Parsuje parametr metrik (seznam oddělený čárkami)
            const validMetrics = ['likes', 'shares', 'comments', 'reposts', 'views', 'reach', 'impressions', 'engagement', 'clickThroughRate'];
            let requestedMetrics: string[] = [];

            if (metrics) {
                requestedMetrics = metrics.split(',').map(m => m.trim());
                const invalidMetrics = requestedMetrics.filter(m => !validMetrics.includes(m));
                if (invalidMetrics.length > 0) {
                    return reply.code(400).send({
                        error: `Invalid metrics: ${invalidMetrics.join(', ')}. Valid options: ${validMetrics.join(', ')}`
                    });
                }
            }

            // Najde zveřejněný obsah pro tento konkrétní příspěvek a síť
            const postedContent = await prisma.postedContent.findFirst({
                where: {
                    posts_id: parseInt(postId),
                    networks_id: parseInt(networkId),
                    actual_post_date: {
                        not: null // Pouze příspěvky, které byly skutečně zveřejněny
                    },
                    network_post_id: {
                        not: null // Pouze příspěvky, které mají ID síťového příspěvku
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (!postedContent) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to this network' });
            }

            // Zkontroluje, zda má uživatel oprávnění zobrazit tento příspěvek
            if (postedContent.posts.creator_id !== userId) {
                const hasPermission = await hasPostPermission(userId, postedContent.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to view metrics for this post' });
                }
            }

            // Inicializuje službu monitorování
            const monitor = await initializeMonitorService();

            try {
                fastify.log.info(`[Graph] Fetching metrics history for post ${postId} on network ${networkId} (${postedContent.networks.network_type})`);
                fastify.log.info(`[Graph] Using network_post_id: ${postedContent.network_post_id}`);
                fastify.log.info(`[Graph] Requested metrics: ${requestedMetrics.length > 0 ? JSON.stringify(requestedMetrics) : 'all metrics'}`);

                // Získá všechna data historie metrik (od vytvoření příspěvku po současnost)
                const postDate = new Date(postedContent.actual_post_date!);
                fastify.log.info(`[Graph] Querying data from ${postDate.toISOString()} to ${new Date().toISOString()}`);

                const metricsHistory = await monitor.getPostMetricsHistory(
                    postedContent.network_post_id!,
                    postedContent.networks.network_type,
                    postDate,
                    new Date()
                );

                fastify.log.info(`[Graph] Retrieved ${metricsHistory.length} data points from InfluxDB`);

                if (metricsHistory.length > 0) {
                    fastify.log.info(`[Graph] Sample data point: ${JSON.stringify(metricsHistory[0], null, 2)}`);
                }

                // Transformuje data na základě požadovaných metrik
                let graphData;
                if (requestedMetrics.length > 0) {
                    // Vrátí pouze požadované metriky
                    graphData = metricsHistory.map(entry => {
                        const dataPoint: any = {
                            timestamp: entry.timestamp.toISOString()
                        };

                        requestedMetrics.forEach(metricName => {
                            dataPoint[metricName] = entry[metricName as keyof typeof entry] as number || 0;
                        });

                        return dataPoint;
                    });
                } else {
                    // Vrátí všechny dostupné metriky
                    graphData = metricsHistory.map(entry => ({
                        timestamp: entry.timestamp.toISOString(),
                        likes: entry.likes || 0,
                        shares: entry.shares || 0,
                        comments: entry.comments || 0,
                        reposts: entry.reposts || 0,
                        views: entry.views || 0,
                        reach: entry.reach || 0,
                        impressions: entry.impressions || 0,
                        engagement: entry.engagement || 0,
                        clickThroughRate: entry.clickThroughRate || 0
                    }));
                }

                fastify.log.info(`[Graph] Transformed to ${graphData.length} graph data points`);
                if (graphData.length > 0) {
                    fastify.log.info(`[Graph] Sample transformed data: ${JSON.stringify(graphData[0], null, 2)}`);
                }

                const networkData = {
                    networkId: postedContent.networks.id,
                    networkType: postedContent.networks.network_type,
                    data: graphData
                };

                fastify.log.info(`[Graph] Final response structure: ${JSON.stringify({ networks: [networkData] }, null, 2)}`);

                reply.code(200).send({
                    networks: [networkData]
                });

            } catch (networkError: any) {
                fastify.log.error(`Error retrieving metrics for network ${networkId}:`, networkError);
                reply.code(500).send({ error: 'Failed to retrieve metrics data' });
            }

        } catch (error: any) {
            fastify.log.error('Error retrieving graph data:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá dostupné metriky pro příspěvek
     * @route GET /:postId/availablemetrics
     */
    fastify.get<{
        Params: { postId: string };
        Reply: IAvailableMetricsReply;
    }>('/:postId/availablemetrics', {
        schema: {
            description: 'Získá dostupné metriky pro konkrétní příspěvek napříč všemi sítěmi, na které byl zveřejněn',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String()
            }),
            response: {
                200: AvailableMetricsResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId } = request.params;
            const userId = request.session.userId!;

            // Najde veškerý zveřejněný obsah pro tento příspěvek
            const postedContents = await prisma.postedContent.findMany({
                where: {
                    posts_id: parseInt(postId),
                    actual_post_date: {
                        not: null // Pouze příspěvky, které byly skutečně zveřejněny
                    },
                    network_post_id: {
                        not: null // Pouze příspěvky, které mají ID síťového příspěvku
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (postedContents.length === 0) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to any network' });
            }

            // Zkontroluje, zda má uživatel oprávnění zobrazit tento příspěvek (kontrola proti prvnímu příspěvku)
            const firstPost = postedContents[0];
            if (firstPost.posts.creator_id !== userId) {
                // Zkontroluje, zda má uživatel oprávnění k příspěvku
                const hasPermission = await hasPostPermission(userId, firstPost.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to view metrics for this post' });
                }
            }

            // Inicializuje službu monitorování
            const monitor = await initializeMonitorService();

            // Sbírá dostupné metriky pro každou síť
            const networks = [];

            for (const postedContent of postedContents) {
                try {
                    // Získá dostupné metriky
                    const availableMetrics = await monitor.getAvailableMetrics(postedContent.network_post_id!, postedContent.networks.network_type);

                    networks.push({
                        networkId: postedContent.networks.id,
                        networkType: postedContent.networks.network_type,
                        availableMetrics: availableMetrics
                    });

                } catch (networkError: any) {
                    fastify.log.error(`Error retrieving available metrics for network ${postedContent.networks_id}:`, networkError);
                    // Pokračuje s dalšími sítěmi i když jedna selže
                }
            }


            reply.code(200).send({
                networks: networks
            });

        } catch (error: any) {
            fastify.log.error('Error retrieving available metrics:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá aktuální metriky pro příspěvek
     * @route GET /:postId/currentmetrics
     */
    fastify.get<{
        Params: { postId: string };
        Reply: ICurrentMetricsReply;
    }>('/:postId/currentmetrics', {
        schema: {
            description: 'Získá aktuální (nejnovější) shromážděné metriky pro konkrétní příspěvek napříč všemi sítěmi, na které byl zveřejněn',
            tags: ['monitor'],
            params: Type.Object({
                postId: Type.String()
            }),
            response: {
                200: CurrentMetricsResponse,
                400: Type.Object({ error: Type.String() }),
                401: Type.Object({ error: Type.String() }),
                403: Type.Object({ error: Type.String() }),
                404: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const { postId } = request.params;
            const userId = request.session.userId!;

            // Najde veškerý zveřejněný obsah pro tento příspěvek
            const postedContents = await prisma.postedContent.findMany({
                where: {
                    posts_id: parseInt(postId),
                    actual_post_date: {
                        not: null // Pouze příspěvky, které byly skutečně zveřejněny
                    },
                    network_post_id: {
                        not: null // Pouze příspěvky, které mají ID síťového příspěvku
                    }
                },
                include: {
                    posts: true,
                    networks: true
                }
            });

            if (postedContents.length === 0) {
                return reply.code(404).send({ error: 'Post not found or not yet posted to any network' });
            }

            // Zkontroluje, zda má uživatel oprávnění zobrazit tento příspěvek (kontrola proti prvnímu příspěvku)
            const firstPost = postedContents[0];
            if (firstPost.posts.creator_id !== userId) {
                // Zkontroluje, zda má uživatel oprávnění k příspěvku
                const hasPermission = await hasPostPermission(userId, firstPost.posts_id);
                if (!hasPermission) {
                    return reply.code(403).send({ error: 'You do not have permission to view metrics for this post' });
                }
            }

            // Inicializuje službu monitorování
            const monitor = await initializeMonitorService();

            // Sbírá aktuální (nejnovější) metriky pro každou síť
            const networks = [];

            for (const postedContent of postedContents) {
                try {
                    // Získá aktuální metriky (nejnovější dostupné z InfluxDB)
                    const currentMetrics = await monitor.getPostMetrics(
                        postedContent.network_post_id!,
                        postedContent.networks.network_type
                    );

                    if (currentMetrics) {
                        // Vytvoří datový objekt podobný GraphDataResponse ale pro jeden metrický bod
                        const data = {
                            timestamp: currentMetrics.timestamp.toISOString(),
                            views: currentMetrics.views,
                            likes: currentMetrics.likes,
                            shares: currentMetrics.shares,
                            comments: currentMetrics.comments,
                            reposts: currentMetrics.reposts,
                            reach: currentMetrics.reach,
                            impressions: currentMetrics.impressions,
                            engagement: currentMetrics.engagement,
                            clickThroughRate: currentMetrics.clickThroughRate,
                            reactions: currentMetrics.reactions,
                            customMetrics: currentMetrics.customMetrics
                        };

                        networks.push({
                            networkId: postedContent.networks.id,
                            networkType: postedContent.networks.network_type,
                            data: data
                        });
                    }

                } catch (networkError: any) {
                    fastify.log.error(`Error retrieving current metrics for network ${postedContent.networks_id}:`, networkError);
                    // Pokračuje s dalšími sítěmi i když jedna selže
                }
            }

            reply.code(200).send({
                networks: networks
            });

        } catch (error: any) {
            fastify.log.error('Error retrieving current metrics:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });

    /**
     * Získá statistiky dashboardu pro aktuálního uživatele
     * @route GET /stats
     */
    fastify.get<{
        Reply: IStatsReply;
    }>('/stats', {
        schema: {
            description: 'Získá statistiky dashboardu pro ověřeného uživatele',
            tags: ['monitor'],
            response: {
                200: StatsResponse,
                401: Type.Object({ error: Type.String() }),
                500: Type.Object({ error: Type.String() })
            }
        },
        preHandler: isAuthenticated
    }, async (request, reply) => {
        try {
            const userId = request.session.userId!;

            // 1. Počet příspěvků bez žádného plánování (rozepsané, vlastní i těch, kterých je editor)
            const unplannedPosts = await prisma.post.count({
                where: {
                    OR: [
                        { creator_id: userId }, // vlastní příspěvky
                        {
                            PostEditor: {
                                some: {
                                    editor_id: userId
                                }
                            }
                        } // příspěvky kde je editor
                    ],
                    posted_content: {
                        none: {} // žádný naplánovaný obsah
                    }
                }
            });

            // 2. Počet příspěvků s naplánovaným obsahem na sítě, které uživateli patří nebo ke kterým má write permission
            const userNetworkIds = await prisma.network.findMany({
                where: {
                    OR: [
                        { owner_id: userId }, // sítě které vlastní
                        {
                            users_has_networks: {
                                some: {
                                    grantee_id: userId,
                                    permission: 'write'
                                }
                            }
                        } // sítě ke kterým má write permission
                    ]
                },
                select: { id: true }
            });

            const networkIds = userNetworkIds.map(n => n.id);

            const scheduledPosts = await prisma.post.count({
                where: {
                    posted_content: {
                        some: {
                            networks_id: {
                                in: networkIds
                            },
                            post_date: {
                                not: null, // má naplánované datum
                                gte: new Date() // v budoucnosti
                            },
                            actual_post_date: null // ještě nebylo odesláno
                        }
                    }
                }
            });

            // 3. Nejbližší datum odeslání plánovaného příspěvku (včetně sítí, ke kterým má read i write permission)
            const userNetworkIdsWithRead = await prisma.network.findMany({
                where: {
                    OR: [
                        { owner_id: userId }, // sítě které vlastní
                        {
                            users_has_networks: {
                                some: {
                                    grantee_id: userId,
                                    permission: {
                                        in: ['read', 'write']
                                    }
                                }
                            }
                        } // sítě ke kterým má read nebo write permission
                    ]
                },
                select: { id: true }
            });

            const networkIdsWithRead = userNetworkIdsWithRead.map(n => n.id);

            const nextScheduledPost = await prisma.postedContent.findFirst({
                where: {
                    networks_id: {
                        in: networkIdsWithRead
                    },
                    post_date: {
                        not: null,
                        gte: new Date() // v budoucnosti
                    },
                    actual_post_date: null // ještě nebylo odesláno
                },
                orderBy: {
                    post_date: 'asc'
                },
                select: {
                    post_date: true
                }
            });

            // 4. Počet monitorovaných příspěvků (publikované příspěvky maximálně 7 dní staré)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const monitoredPosts = await prisma.post.count({
                where: {
                    posted_content: {
                        some: {
                            networks_id: {
                                in: networkIdsWithRead
                            },
                            actual_post_date: {
                                not: null, // byl publikován
                                gte: sevenDaysAgo // maximálně 7 dní starý
                            },
                            network_post_id: {
                                not: null // má ID na sociální síti
                            }
                        }
                    }
                }
            });

            reply.code(200).send({
                unplannedPosts,
                scheduledPosts,
                nextScheduledDate: nextScheduledPost?.post_date?.toISOString() || null,
                monitoredPosts
            });

        } catch (error: any) {
            fastify.log.error('Error retrieving dashboard statistics:', error);
            reply.code(500).send({ error: error.message || 'Internal server error' });
        }
    });
}

export default routes;

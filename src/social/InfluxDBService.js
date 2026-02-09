"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluxDBService = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const logger_1 = require("../utils/logger");
/**
 * Služba pro správu InfluxDB operací pro metriky výkonu sociálních médií
 */
class InfluxDBService {
    influxDB;
    writeApi;
    queryApi;
    config;
    /**
     * Konstruktor pro InfluxDBService
     * @param config - Konfigurace pro připojení k InfluxDB
     */
    constructor(config) {
        this.config = config;
        this.influxDB = new influxdb_client_1.InfluxDB({
            url: config.url,
            token: config.token,
        });
        this.writeApi = this.influxDB.getWriteApi(config.org, config.bucket, 'ns');
        this.queryApi = this.influxDB.getQueryApi(config.org);
    }
    /**
     * Uloží metriky výkonu do InfluxDB
     * @param metrics - Metriky výkonu k uložení
     * @returns Promise<void>
     */
    async storeMetrics(metrics) {
        try {
            const point = new influxdb_client_1.Point('post_performance')
                .tag('network_type', metrics.networkType)
                .tag('post_id', metrics.postId)
                .timestamp(metrics.timestamp);
            // Přidá standardní metriky
            if (metrics.views !== undefined)
                point.intField('views', metrics.views);
            if (metrics.likes !== undefined)
                point.intField('likes', metrics.likes);
            if (metrics.shares !== undefined)
                point.intField('shares', metrics.shares);
            if (metrics.comments !== undefined)
                point.intField('comments', metrics.comments);
            if (metrics.reposts !== undefined)
                point.intField('reposts', metrics.reposts);
            if (metrics.reach !== undefined)
                point.intField('reach', metrics.reach);
            if (metrics.impressions !== undefined)
                point.intField('impressions', metrics.impressions);
            if (metrics.engagement !== undefined)
                point.floatField('engagement', metrics.engagement);
            if (metrics.clickThroughRate !== undefined)
                point.floatField('click_through_rate', metrics.clickThroughRate);
            // Přidá počty reakcí jako samostatná pole
            if (metrics.reactions) {
                Object.entries(metrics.reactions).forEach(([reactionType, count]) => {
                    point.intField(`reaction_${reactionType}`, count);
                });
            }
            // Přidá vlastní metriky jako JSON řetězec
            if (metrics.customMetrics) {
                point.stringField('custom_metrics', JSON.stringify(metrics.customMetrics));
            }
            this.writeApi.writePoint(point);
            await this.writeApi.flush();
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Error storing metrics to InfluxDB:');
            throw error;
        }
    }
    /**
     * Získá nejnovější metriky pro konkrétní příspěvek
     * @param postId - ID příspěvku k dotazu
     * @param networkType - Typ sítě
     * @returns Promise<PostPerformanceMetrics | null> - Nejnovější metriky výkonu nebo null pokud nenalezeno
     */
    async getLatestMetrics(postId, networkType) {
        try {
            const query = `
        from(bucket: "${this.config.bucket}")
          |> range(start: -7d)
          |> filter(fn: (r) => r._measurement == "post_performance")
          |> filter(fn: (r) => r.post_id == "${postId}")
          |> filter(fn: (r) => r.network_type == "${networkType}")
          |> last()
      `;
            const result = await this.queryApi.collectRows(query);
            if (result.length === 0)
                return null;
            // Seskupí pole podle časového razítka pro rekonstrukci metrik
            const latestTimestamp = Math.max(...result.map(row => new Date(row._time).getTime()));
            const latestRows = result.filter(row => new Date(row._time).getTime() === latestTimestamp);
            const metrics = {
                postId,
                networkType,
                timestamp: new Date(latestTimestamp),
                reactions: {},
                customMetrics: {}
            };
            // Rekonstruuje metriky z InfluxDB řádků
            latestRows.forEach((row) => {
                const influxRow = row;
                const field = influxRow._field;
                const value = influxRow._value;
                switch (field) {
                    case 'views':
                        metrics.views = value;
                        break;
                    case 'likes':
                        metrics.likes = value;
                        break;
                    case 'shares':
                        metrics.shares = value;
                        break;
                    case 'comments':
                        metrics.comments = value;
                        break;
                    case 'reposts':
                        metrics.reposts = value;
                        break;
                    case 'reach':
                        metrics.reach = value;
                        break;
                    case 'impressions':
                        metrics.impressions = value;
                        break;
                    case 'engagement':
                        metrics.engagement = value;
                        break;
                    case 'click_through_rate':
                        metrics.clickThroughRate = value;
                        break;
                    case 'custom_metrics':
                        try {
                            metrics.customMetrics = JSON.parse(value);
                        }
                        catch (e) {
                            logger_1.logger.warn({ err: e }, 'Failed to parse custom metrics:');
                        }
                        break;
                    default:
                        if (field.startsWith('reaction_')) {
                            const reactionType = field.replace('reaction_', '');
                            metrics.reactions[reactionType] = value;
                        }
                        break;
                }
            });
            return metrics;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Error querying metrics from InfluxDB:');
            return null;
        }
    }
    /**
     * Získá historii metrik pro příspěvek v časovém rozmezí
     * @param postId - ID příspěvku k dotazu
     * @param networkType - Typ sítě
     * @param startTime - Počáteční čas pro dotaz
     * @param endTime - Koncový čas pro dotaz
     * @returns Promise<PostPerformanceMetrics[]> - Pole metrik výkonu
     */
    async getMetricsHistory(postId, networkType, startTime, endTime) {
        try {
            const query = `
        from(bucket: "${this.config.bucket}")
          |> range(start: ${startTime.toISOString()}, stop: ${endTime.toISOString()})
          |> filter(fn: (r) => r._measurement == "post_performance")
          |> filter(fn: (r) => r.post_id == "${postId}")
          |> filter(fn: (r) => r.network_type == "${networkType}")
          |> sort(columns: ["_time"])
      `;
            const result = await this.queryApi.collectRows(query);
            // Seskupí výsledky podle časového razítka
            const timestampGroups = new Map();
            result.forEach((row) => {
                const influxRow = row;
                const timestamp = influxRow._time;
                if (!timestampGroups.has(timestamp)) {
                    timestampGroups.set(timestamp, []);
                }
                timestampGroups.get(timestamp).push(influxRow);
            });
            // Převede seskupené výsledky na pole PostPerformanceMetrics
            const metricsArray = [];
            timestampGroups.forEach((rows, timestamp) => {
                const metrics = {
                    postId,
                    networkType,
                    timestamp: new Date(timestamp),
                    reactions: {},
                    customMetrics: {}
                };
                rows.forEach((influxRow) => {
                    const field = influxRow._field;
                    const value = influxRow._value;
                    switch (field) {
                        case 'views':
                            metrics.views = value;
                            break;
                        case 'likes':
                            metrics.likes = value;
                            break;
                        case 'shares':
                            metrics.shares = value;
                            break;
                        case 'comments':
                            metrics.comments = value;
                            break;
                        case 'reposts':
                            metrics.reposts = value;
                            break;
                        case 'reach':
                            metrics.reach = value;
                            break;
                        case 'impressions':
                            metrics.impressions = value;
                            break;
                        case 'engagement':
                            metrics.engagement = value;
                            break;
                        case 'click_through_rate':
                            metrics.clickThroughRate = value;
                            break;
                        case 'custom_metrics':
                            try {
                                metrics.customMetrics = JSON.parse(value);
                            }
                            catch (e) {
                                logger_1.logger.warn({ err: e }, 'Failed to parse custom metrics:');
                            }
                            break;
                        default:
                            if (field.startsWith('reaction_')) {
                                const reactionType = field.replace('reaction_', '');
                                metrics.reactions[reactionType] = value;
                            }
                            break;
                    }
                });
                metricsArray.push(metrics);
            });
            return metricsArray;
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Error querying metrics history from InfluxDB:');
            return [];
        }
    }
    /**
     * Získá dostupné metriky pro konkrétní příspěvek
     * @param postId - ID příspěvku k dotazu
     * @param networkType - Typ sítě
     * @returns Promise<string[]> - Pole názvů dostupných metrik
     */
    async getAvailableMetrics(postId, networkType) {
        try {
            const query = `
        from(bucket: "${this.config.bucket}")
          |> range(start: -7d)
          |> filter(fn: (r) => r._measurement == "post_performance")
          |> filter(fn: (r) => r.post_id == "${postId}")
          |> filter(fn: (r) => r.network_type == "${networkType}")
          |> group(columns: ["_field"])
          |> distinct(column: "_field")
          |> group()
      `;
            const result = await this.queryApi.collectRows(query);
            const availableMetrics = [];
            const standardMetrics = [
                'views', 'likes', 'shares', 'comments', 'reposts',
                'reach', 'impressions', 'engagement', 'click_through_rate'
            ];
            result.forEach((row) => {
                const influxRow = row;
                const field = influxRow._value;
                if (standardMetrics.includes(field)) {
                    // Mapuje click_through_rate zpět na clickThroughRate pro konzistenci
                    const metricName = field === 'click_through_rate' ? 'clickThroughRate' : field;
                    availableMetrics.push(metricName);
                }
                else if (field.startsWith('reaction_')) {
                    // Zahrnuje metriky reakcí
                    availableMetrics.push(field);
                }
            });
            // Seřadí metriky pro konzistentní výstup
            return [...new Set(availableMetrics)].sort();
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Error querying available metrics from InfluxDB:');
            return [];
        }
    }
    /**
     * Uzavře připojení k InfluxDB
     * @returns Promise<void>
     */
    async close() {
        try {
            await this.writeApi.close();
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Error closing InfluxDB connection:');
        }
    }
}
exports.InfluxDBService = InfluxDBService;

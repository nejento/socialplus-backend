"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringConfig = void 0;
const PerformanceMonitorService_1 = require("../social/PerformanceMonitorService");
const logger_1 = require("./logger");
/**
 * Konfigurace pro systém monitorování výkonu
 */
class MonitoringConfig {
    static instance;
    performanceMonitor = null;
    constructor() { }
    static getInstance() {
        if (!MonitoringConfig.instance) {
            MonitoringConfig.instance = new MonitoringConfig();
        }
        return MonitoringConfig.instance;
    }
    /**
     * InfluxDB konfigurace z proměnných prostředí
     */
    getInfluxDBConfig() {
        return {
            url: process.env.INFLUXDB_URL || 'http://localhost:8086',
            token: process.env.INFLUXDB_TOKEN || '',
            org: process.env.INFLUXDB_ORG || 'socialplusorg',
            bucket: process.env.INFLUXDB_BUCKET || 'socialplus'
        };
    }
    /**
     * Inicializuje službu monitorování výkonu
     */
    async initializeMonitoring() {
        if (this.performanceMonitor) {
            logger_1.logger.info('Performance monitoring already initialized');
            return;
        }
        const config = this.getInfluxDBConfig();
        // Validace
        if (!config.token) {
            logger_1.logger.error('INFLUXDB_TOKEN environment variable is required');
            throw new Error('Missing InfluxDB token configuration');
        }
        this.performanceMonitor = new PerformanceMonitorService_1.PerformanceMonitorService(config);
        await this.performanceMonitor.start();
        logger_1.logger.info('[MonitoringConfig] Performance monitoring service initialized successfully');
    }
    /**
     * Zastaví službu monitorování výkonu
     */
    async stopMonitoring() {
        if (this.performanceMonitor) {
            await this.performanceMonitor.stop();
            this.performanceMonitor = null;
            logger_1.logger.info('Performance monitoring service stopped');
        }
    }
}
exports.MonitoringConfig = MonitoringConfig;

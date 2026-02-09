import { InfluxDBConfig } from '../social/ISocialNetworkProvider';
import { PerformanceMonitorService } from '../social/PerformanceMonitorService';
import { logger } from './logger';

/**
 * Konfigurace pro systém monitorování výkonu
 */
export class MonitoringConfig {
  private static instance: MonitoringConfig;
  private performanceMonitor: PerformanceMonitorService | null = null;

  private constructor() {}

  public static getInstance(): MonitoringConfig {
    if (!MonitoringConfig.instance) {
      MonitoringConfig.instance = new MonitoringConfig();
    }
    return MonitoringConfig.instance;
  }

  /**
   * InfluxDB konfigurace z proměnných prostředí
   */
  public getInfluxDBConfig(): InfluxDBConfig {
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
  public async initializeMonitoring(): Promise<void> {
    if (this.performanceMonitor) {
      logger.info('Performance monitoring already initialized');
      return;
    }

    const config = this.getInfluxDBConfig();

    // Validace
    if (!config.token) {
      logger.error('INFLUXDB_TOKEN environment variable is required');
      throw new Error('Missing InfluxDB token configuration');
    }

    this.performanceMonitor = new PerformanceMonitorService(config);
    await this.performanceMonitor.start();

    logger.info('[MonitoringConfig] Performance monitoring service initialized successfully');
  }

  /**
   * Zastaví službu monitorování výkonu
   */
  public async stopMonitoring(): Promise<void> {
    if (this.performanceMonitor) {
      await this.performanceMonitor.stop();
      this.performanceMonitor = null;
      logger.info('Performance monitoring service stopped');
    }
  }

}

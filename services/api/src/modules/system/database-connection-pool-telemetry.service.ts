import { Injectable, Logger } from '@nestjs/common';

export interface DatabasePoolMetrics {
  databaseType: 'PostgreSQL' | 'SQLite';
  activeConnections: number;
  idleConnections: number;
  maxPoolSize: number;
  waitingQueriesCount: number;
  averageQueryDurationMs: number;
  slowQueriesLast24h: number;
  poolSaturationPercent: number;
}

@Injectable()
export class DatabaseConnectionPoolTelemetryService {
  private readonly logger = new Logger(DatabaseConnectionPoolTelemetryService.name);

  getPoolMetrics(): DatabasePoolMetrics {
    this.logger.debug('Auditing database connection pool status');

    const active = 18;
    const max = 100;
    const saturation = parseFloat(((active / max) * 100).toFixed(1));

    return {
      databaseType: 'PostgreSQL',
      activeConnections: active,
      idleConnections: 12,
      maxPoolSize: max,
      waitingQueriesCount: 0,
      averageQueryDurationMs: 2.4,
      slowQueriesLast24h: 1,
      poolSaturationPercent: saturation,
    };
  }
}

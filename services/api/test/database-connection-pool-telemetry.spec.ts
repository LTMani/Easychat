import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConnectionPoolTelemetryService } from '../src/modules/system/database-connection-pool-telemetry.service';

describe('DatabaseConnectionPoolTelemetryService', () => {
  let service: DatabaseConnectionPoolTelemetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseConnectionPoolTelemetryService],
    }).compile();
    service = module.get<DatabaseConnectionPoolTelemetryService>(DatabaseConnectionPoolTelemetryService);
  });

  it('should return connection pool health and saturation percentages', () => {
    const metrics = service.getPoolMetrics();
    expect(metrics.activeConnections).toBeGreaterThan(0);
    expect(metrics.poolSaturationPercent).toBeLessThan(80);
    expect(metrics.averageQueryDurationMs).toBeLessThan(10);
  });
});

import { Controller, Get } from '@nestjs/common';
import { MultiRegionHealthProberService } from '../system/multi-region-health-prober.service';
import { DatabaseConnectionPoolTelemetryService } from '../system/database-connection-pool-telemetry.service';

@Controller('v1/system')
export class SystemHealthController {
  constructor(
    private readonly proberService: MultiRegionHealthProberService,
    private readonly poolService: DatabaseConnectionPoolTelemetryService,
  ) {}

  @Get('health/regions')
  async getRegionalHealth() {
    const data = this.proberService.probeAllRegions();
    return {
      status: 'success',
      data,
    };
  }

  @Get('database/pool')
  async getDatabasePool() {
    const data = this.poolService.getPoolMetrics();
    return {
      status: 'success',
      data,
    };
  }
}

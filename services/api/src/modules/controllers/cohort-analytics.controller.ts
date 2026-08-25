import { Controller, Get } from '@nestjs/common';
import { CohortRetentionMatrixService } from '../analytics/cohort-retention-matrix.service';

@Controller('v1/analytics/cohorts')
export class CohortAnalyticsController {
  constructor(private readonly cohortService: CohortRetentionMatrixService) {}

  @Get('matrix')
  async getCohortMatrix() {
    const data = this.cohortService.generateLongitudinalCohorts();
    return {
      status: 'success',
      data,
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CohortRetentionMatrixService } from '../src/modules/analytics/cohort-retention-matrix.service';

describe('CohortRetentionMatrixService', () => {
  let service: CohortRetentionMatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CohortRetentionMatrixService],
    }).compile();
    service = module.get<CohortRetentionMatrixService>(CohortRetentionMatrixService);
  });

  it('should generate longitudinal cohort matrices and evaluate NRR expansions', () => {
    const cohorts = service.generateLongitudinalCohorts();
    expect(cohorts.length).toBeGreaterThanOrEqual(4);
    expect(cohorts[0].averageNetRevenueRetentionPercent).toBeGreaterThanOrEqual(100);
    expect(cohorts[0].cells.length).toBeGreaterThan(0);
  });
});

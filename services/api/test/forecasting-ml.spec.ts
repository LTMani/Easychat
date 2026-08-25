import { Test, TestingModule } from '@nestjs/testing';
import { ForecastingMlService } from '../src/modules/analytics/forecasting-ml.service';

describe('ForecastingMlService', () => {
  let service: ForecastingMlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForecastingMlService],
    }).compile();
    service = module.get<ForecastingMlService>(ForecastingMlService);
  });

  it('should compute linear regression trend parameters', () => {
    const data = [
      { period: '2026-01', revenue: 100000, dealCount: 10 },
      { period: '2026-02', revenue: 120000, dealCount: 12 },
      { period: '2026-03', revenue: 140000, dealCount: 14 },
    ];

    const trend = service.computeLinearTrend(data);
    expect(trend.slope).toBeCloseTo(20000, 0);
    expect(trend.r2).toBeCloseTo(1.0, 1);
  });

  it('should generate future revenue projections with confidence bounds', () => {
    const data = [
      { period: '2026-01', revenue: 100000, dealCount: 10 },
      { period: '2026-02', revenue: 110000, dealCount: 11 },
      { period: '2026-03', revenue: 120000, dealCount: 12 },
    ];

    const projections = service.generateForecast(data, 3);
    expect(projections).toHaveLength(3);
    expect(projections[0].projectedRevenue).toBeGreaterThan(120000);
    expect(projections[0].confidenceLowerBound).toBeLessThan(projections[0].projectedRevenue);
    expect(projections[0].confidenceUpperBound).toBeGreaterThan(projections[0].projectedRevenue);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProfitsAnalyticsController } from '../src/modules/controllers/profits-analytics.controller';
import { ProfitMarginCalculatorService } from '../src/modules/analytics/profit-margin-calculator.service';

describe('ProfitsAnalyticsController', () => {
  let controller: ProfitsAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfitsAnalyticsController],
      providers: [ProfitMarginCalculatorService],
    }).compile();
    controller = module.get<ProfitsAnalyticsController>(ProfitsAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return profit summary with monthly trends', async () => {
    const res = await controller.getProfitSummary();
    expect(res.status).toBe('success');
    expect(res.data.profitLoss.grossRevenue).toBeGreaterThan(1000000);
    expect(res.data.monthlyTrend.length).toBeGreaterThanOrEqual(6);
  });
});

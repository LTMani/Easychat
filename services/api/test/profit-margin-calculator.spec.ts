import { Test, TestingModule } from '@nestjs/testing';
import { ProfitMarginCalculatorService } from '../src/modules/analytics/profit-margin-calculator.service';

describe('ProfitMarginCalculatorService', () => {
  let service: ProfitMarginCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfitMarginCalculatorService],
    }).compile();
    service = module.get<ProfitMarginCalculatorService>(ProfitMarginCalculatorService);
  });

  it('should calculate gross profit and EBITDA accurately', () => {
    const pl = service.calculateProfitLoss(100000, 20000, 30000, 20000, 10000);
    expect(pl.grossProfit).toBe(80000);
    expect(pl.grossMarginPercent).toBe(80);
    expect(pl.ebitda).toBe(20000); // 80000 - 60000
    expect(pl.netProfit).toBe(17000); // 20000 - 15% tax = 17000
  });

  it('should calculate LTV:CAC ratio and payback period', () => {
    const econ = service.calculateUnitEconomics(120000, 100, 500, 0.02, 80);
    expect(econ.customerAcquisitionCost).toBe(1200); // 120k / 100
    expect(econ.customerLifetimeValue).toBe(20000); // (500 * 0.8) / 0.02 = 20000
    expect(econ.ltvToCacRatio).toBe(16.67); // 20000 / 1200
    expect(econ.cacPaybackMonths).toBe(3.0); // 1200 / 400
  });
});

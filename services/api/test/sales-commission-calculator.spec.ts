import { Test, TestingModule } from '@nestjs/testing';
import { SalesCommissionCalculatorService } from '../src/modules/crm/sales-commission-calculator.service';

describe('SalesCommissionCalculatorService', () => {
  let service: SalesCommissionCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesCommissionCalculatorService],
    }).compile();
    service = module.get<SalesCommissionCalculatorService>(SalesCommissionCalculatorService);
  });

  it('should calculate base commission when rep is under 100% quota', () => {
    const res = service.calculateRepCommission('rep_1', 'Sarah Jenkins', 100000, 80000);
    expect(res.quotaAttainmentPercent).toBe(80);
    expect(res.baseCommissionEarned).toBe(8000);
    expect(res.acceleratorBonusEarned).toBe(0);
    expect(res.totalCommissionPayout).toBe(8000);
  });

  it('should apply 18% accelerator bonus for revenue above 100% quota', () => {
    const res = service.calculateRepCommission('rep_1', 'Sarah Jenkins', 100000, 120000);
    expect(res.quotaAttainmentPercent).toBe(120);
    expect(res.baseCommissionEarned).toBe(10000); // 10% on $100k
    expect(res.acceleratorBonusEarned).toBe(3600); // 18% on $20k excess
    expect(res.totalCommissionPayout).toBe(13600);
  });
});

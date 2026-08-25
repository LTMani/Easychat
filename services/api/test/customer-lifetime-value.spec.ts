import { Test, TestingModule } from '@nestjs/testing';
import { CustomerLifetimeValueService } from '../src/modules/crm/customer-lifetime-value.service';

describe('CustomerLifetimeValueService', () => {
  let service: CustomerLifetimeValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerLifetimeValueService],
    }).compile();
    service = module.get<CustomerLifetimeValueService>(CustomerLifetimeValueService);
  });

  it('should calculate observed and projected LTV for cohort', () => {
    const cohort = {
      cohortMonth: '2026-01',
      initialUsers: 100,
      retentionByMonth: [1.0, 0.9, 0.85, 0.8],
      arpuMonthly: 50,
    };

    const res = service.calculateCohortLtv(cohort, 200);
    expect(res.observedLtv).toBeGreaterThan(150);
    expect(res.projected12MonthLtv).toBeGreaterThan(res.observedLtv);
    expect(res.projected24MonthLtv).toBeGreaterThan(res.projected12MonthLtv);
    expect(res.expectedPaybackPeriodMonths).toBe(4.0); // 200 / 50 = 4 months
  });
});

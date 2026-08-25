import { Test, TestingModule } from '@nestjs/testing';
import { UsageAlertsService } from '../src/modules/billing/usage-alerts.service';

describe('UsageAlertsService', () => {
  let service: UsageAlertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageAlertsService],
    }).compile();
    service = module.get<UsageAlertsService>(UsageAlertsService);
  });

  it('should trigger alert at 80% threshold', () => {
    const res = service.evaluateQuotaAlerts(820, 1000);
    expect(res.shouldTriggerAlert).toBe(true);
    expect(res.thresholdReached).toBe(80);
    expect(res.alertMessage).toContain('80%');
  });

  it('should trigger critical alert at 100% threshold', () => {
    const res = service.evaluateQuotaAlerts(1050, 1000);
    expect(res.shouldTriggerAlert).toBe(true);
    expect(res.thresholdReached).toBe(100);
    expect(res.alertMessage).toContain('CRITICAL');
  });
});

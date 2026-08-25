import { Test, TestingModule } from '@nestjs/testing';
import { UsageMeterAggregatorService } from '../src/modules/billing/usage-meter-aggregator.service';

describe('UsageMeterAggregatorService', () => {
  let service: UsageMeterAggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageMeterAggregatorService],
    }).compile();
    service = module.get<UsageMeterAggregatorService>(UsageMeterAggregatorService);
  });

  it('should record API and email usage and detect quota limits', () => {
    service.recordApiCall('org_test', 950);
    service.recordEmailSent('org_test', 50);

    const snapshot = service.getUsageSnapshot('org_test', {
      organizationId: 'org_test',
      monthlyApiCallLimit: 1000,
      monthlyEmailLimit: 100,
      monthlyWhatsAppLimit: 500,
    });

    expect(snapshot.apiCallsCount).toBe(950);
    expect(snapshot.emailsSentCount).toBe(50);
    expect(snapshot.isApiQuotaExceeded).toBe(false);

    // Push past quota
    service.recordApiCall('org_test', 100);
    const exceededSnapshot = service.getUsageSnapshot('org_test', {
      organizationId: 'org_test',
      monthlyApiCallLimit: 1000,
      monthlyEmailLimit: 100,
      monthlyWhatsAppLimit: 500,
    });

    expect(exceededSnapshot.isApiQuotaExceeded).toBe(true);
  });

  it('should reset monthly usage meters cleanly', () => {
    service.recordApiCall('org_reset', 500);
    service.resetMonthlyUsage('org_reset');

    const snapshot = service.getUsageSnapshot('org_reset', {
      organizationId: 'org_reset',
      monthlyApiCallLimit: 1000,
      monthlyEmailLimit: 100,
      monthlyWhatsAppLimit: 500,
    });

    expect(snapshot.apiCallsCount).toBe(0);
  });
});

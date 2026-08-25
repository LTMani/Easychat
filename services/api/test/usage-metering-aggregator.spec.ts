import { Test, TestingModule } from '@nestjs/testing';
import { UsageMeteringAggregatorService } from '../src/modules/billing/usage-metering-aggregator.service';

describe('UsageMeteringAggregatorService', () => {
  let service: UsageMeteringAggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageMeteringAggregatorService],
    }).compile();
    service = module.get<UsageMeteringAggregatorService>(UsageMeteringAggregatorService);
  });

  it('should calculate metered usage and billable overages accurately', () => {
    const records = service.aggregateUsage('org_test', {
      API_CALLS: 150000, // 50k overage @ $0.50/k = $25
      SMS_SENT: 2000,    // 1k overage @ $0.015 = $15
      AI_TOKENS: 350000, // 100k overage @ $0.02/k = $2
    });

    expect(records.length).toBe(3);
    const api = records.find((r) => r.metricType === 'API_CALLS');
    expect(api?.totalOverageChargeUsd).toBe(25);

    const sms = records.find((r) => r.metricType === 'SMS_SENT');
    expect(sms?.totalOverageChargeUsd).toBe(15);
  });
});

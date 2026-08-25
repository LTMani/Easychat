import { Test, TestingModule } from '@nestjs/testing';
import { EmailDeliverabilityHealthService } from '../src/modules/marketing/email-deliverability-health.service';

describe('EmailDeliverabilityHealthService', () => {
  let service: EmailDeliverabilityHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailDeliverabilityHealthService],
    }).compile();
    service = module.get<EmailDeliverabilityHealthService>(EmailDeliverabilityHealthService);
  });

  it('should inspect domain DNS health and return 100% score for configured domain', () => {
    const report = service.inspectDomainDns('acme.com');
    expect(report.isReadyForBroadcast).toBe(true);
    expect(report.deliverabilityScorePercent).toBe(100);
    expect(report.records.length).toBe(4); // SPF, DKIM, DMARC, MX
  });
});

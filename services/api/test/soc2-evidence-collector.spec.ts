import { Test, TestingModule } from '@nestjs/testing';
import { Soc2EvidenceCollectorService } from '../src/modules/audit/soc2-evidence-collector.service';

describe('Soc2EvidenceCollectorService', () => {
  let service: Soc2EvidenceCollectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Soc2EvidenceCollectorService],
    }).compile();
    service = module.get<Soc2EvidenceCollectorService>(Soc2EvidenceCollectorService);
  });

  it('should generate passing SOC2 compliance report with >90% score', () => {
    const report = service.generateComplianceReport('org_enterprise_1');
    expect(report.overallStatus).toBe('PASS');
    expect(report.complianceScorePercent).toBeGreaterThanOrEqual(90);
    expect(report.items.length).toBeGreaterThan(0);
  });
});

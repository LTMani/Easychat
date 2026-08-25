import { Test, TestingModule } from '@nestjs/testing';
import { Soc2EvidenceCollectorService } from '../src/modules/security/soc2-evidence-collector.service';

describe('Soc2EvidenceCollectorService', () => {
  let service: Soc2EvidenceCollectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Soc2EvidenceCollectorService],
    }).compile();
    service = module.get<Soc2EvidenceCollectorService>(Soc2EvidenceCollectorService);
  });

  it('should collect SOC 2 Type II controls evidence report', () => {
    const report = service.collectEvidenceReport();
    expect(report.length).toBe(4);
    expect(report.every((r) => r.status === 'COMPLIANT')).toBe(true);
    expect(report.some((r) => r.controlId === 'CC6.1')).toBe(true);
  });
});

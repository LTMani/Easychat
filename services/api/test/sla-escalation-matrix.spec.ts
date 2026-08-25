import { Test, TestingModule } from '@nestjs/testing';
import { SlaEscalationMatrixService } from '../src/modules/sla/sla-escalation-matrix.service';

describe('SlaEscalationMatrixService', () => {
  let service: SlaEscalationMatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaEscalationMatrixService],
    }).compile();
    service = module.get<SlaEscalationMatrixService>(SlaEscalationMatrixService);
  });

  it('should escalate to SWAT team upon SLA breach', () => {
    const res = service.evaluateTicketSla('tkt_99', 65, 60);
    expect(res.urgencyLevel).toBe('BREACHED');
    expect(res.escalatedToRole).toBe('VP_OF_CUSTOMER_SUCCESS');
  });

  it('should trigger warning at 50% threshold', () => {
    const res = service.evaluateTicketSla('tkt_99', 35, 60);
    expect(res.urgencyLevel).toBe('WARNING_50_PCT');
    expect(res.escalatedToRole).toBe('SENIOR_SUPPORT_AGENT');
  });
});

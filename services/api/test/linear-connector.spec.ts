import { Test, TestingModule } from '@nestjs/testing';
import { LinearConnectorService } from '../src/modules/integrations/linear-connector.service';

describe('LinearConnectorService', () => {
  let service: LinearConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinearConnectorService],
    }).compile();
    service = module.get<LinearConnectorService>(LinearConnectorService);
  });

  it('should map urgent support ticket to Linear priority 1 issue', () => {
    const payload = service.buildLinearIssueFromTicket({
      id: 'tkt_882',
      ticketNumber: 'TKT-2026-882',
      subject: 'Webhook Latency Overrun',
      description: 'Webhook delivery queued for >500s',
      priority: 'URGENT',
    });

    expect(payload.teamId).toBe('team_eng');
    expect(payload.title).toContain('TKT-2026-882');
    expect(payload.priority).toBe(1); // Urgent
  });
});

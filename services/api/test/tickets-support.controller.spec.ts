import { Test, TestingModule } from '@nestjs/testing';
import { TicketsSupportController } from '../src/modules/controllers/tickets-support.controller';
import { TicketEscalationService } from '../src/modules/tickets/ticket-escalation.service';
import { SlaPolicyEngineService } from '../src/modules/sla/sla-policy-engine.service';

describe('TicketsSupportController', () => {
  let controller: TicketsSupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsSupportController],
      providers: [TicketEscalationService, SlaPolicyEngineService],
    }).compile();
    controller = module.get<TicketsSupportController>(TicketsSupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create ticket with automated SLA deadlines', async () => {
    const res = await controller.createTicket({
      subject: 'Okta SSO configuration issue',
      description: 'Customer cannot log in with SAML credentials.',
      priority: 'URGENT',
    });

    expect(res.status).toBe('success');
    expect(res.data.firstResponseDueAt).toBeDefined();
    expect(res.data.priority).toBe('URGENT');
  });
});

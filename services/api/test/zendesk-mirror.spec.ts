import { Test, TestingModule } from '@nestjs/testing';
import { ZendeskTicketMirrorService } from '../src/modules/integrations/zendesk-ticket-mirror.service';

describe('ZendeskTicketMirrorService', () => {
  let service: ZendeskTicketMirrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZendeskTicketMirrorService],
    }).compile();
    service = module.get<ZendeskTicketMirrorService>(ZendeskTicketMirrorService);
  });

  it('should mirror Zendesk tickets into EasyChat support queues', () => {
    const ticket = service.mirrorInboundTicket(88412, 'SAML SSO failure', 'HIGH', 'OPEN');
    expect(ticket.zendeskTicketId).toBe(88412);
    expect(ticket.easyChatTicketId).toContain('TKT-');

    const all = service.listMirroredTickets();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });
});

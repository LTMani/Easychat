import { Test, TestingModule } from '@nestjs/testing';
import { SlackNotificationService } from '../src/modules/integrations/slack-notification.service';

describe('SlackNotificationService', () => {
  let service: SlackNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackNotificationService],
    }).compile();
    service = module.get<SlackNotificationService>(SlackNotificationService);
  });

  it('should format Deal Won Block Kit payload with buttons and fields', () => {
    const msg = service.buildDealWonNotification({
      title: 'Enterprise Renewal',
      value: 120000,
      currency: 'USD',
      ownerName: 'Alice Smith',
      contactName: 'Bob Jones',
    });

    expect(msg.text).toContain('$120,000');
    expect(msg.blocks).toHaveLength(3);
    expect(msg.blocks?.[0].type).toBe('header');
  });

  it('should format SLA Breach Alert Block Kit message with danger button', () => {
    const alert = service.buildSlaBreachAlert({
      ticketId: 'TKT-555',
      subject: 'Database Timeout',
      priority: 'URGENT',
      assigneeName: 'Devon Vance',
      targetMinutes: 15,
      actualMinutes: 45,
    });

    expect(alert.text).toContain('TKT-555');
    expect(alert.blocks?.[1].type).toBe('section');
  });
});

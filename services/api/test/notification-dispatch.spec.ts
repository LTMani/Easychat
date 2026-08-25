import { Test, TestingModule } from '@nestjs/testing';
import { NotificationDispatchService, NotificationPayload } from '../src/modules/notifications/notification-dispatch.service';

describe('NotificationDispatchService', () => {
  let service: NotificationDispatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationDispatchService],
    }).compile();
    service = module.get<NotificationDispatchService>(NotificationDispatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should dispatch an IN_APP notification', async () => {
    const payload: NotificationPayload = {
      recipientUserId: 'user-123',
      channel: 'IN_APP',
      priority: 'NORMAL',
      title: 'New Deal Assigned',
      body: 'You have been assigned to Enterprise Deal Alpha',
      organizationId: 'org-1',
    };

    const res = await service.dispatch(payload);
    expect(res.dispatched).toBe(true);
    expect(res.channels).toContain('IN_APP');
  });

  it('should respect quiet hours or muting unless priority is URGENT', async () => {
    const userId = 'user-muted';
    const futureDate = new Date(Date.now() + 1000 * 60 * 60);
    await service.muteUntil(userId, futureDate);

    const normalPayload: NotificationPayload = {
      recipientUserId: userId,
      channel: 'EMAIL',
      priority: 'NORMAL',
      title: 'Weekly digest',
      body: 'Check out weekly stats',
      organizationId: 'org-1',
    };
    const resNormal = await service.dispatch(normalPayload);
    expect(resNormal.dispatched).toBe(false);

    const urgentPayload: NotificationPayload = {
      recipientUserId: userId,
      channel: 'IN_APP',
      priority: 'URGENT',
      title: 'CRITICAL SLA BREACH',
      body: 'Ticket #999 breached SLA',
      organizationId: 'org-1',
    };
    const resUrgent = await service.dispatch(urgentPayload);
    expect(resUrgent.dispatched).toBe(true);
  });

  it('should support updating user notification preferences', async () => {
    const userId = 'user-prefs-test';
    await service.updatePreferences(userId, {
      emailEnabled: false,
      smsEnabled: true,
      pushEnabled: true,
    });

    const prefs = await service.getPreferences(userId);
    expect(prefs.emailEnabled).toBe(false);
    expect(prefs.smsEnabled).toBe(true);
    expect(prefs.pushEnabled).toBe(true);
  });

  it('should dispatch across multiple channels via dispatchMultiChannel', async () => {
    const basePayload = {
      recipientUserId: 'user-multi',
      priority: 'NORMAL' as const,
      title: 'Multi Broadcast',
      body: 'Broadcast message',
      organizationId: 'org-1',
    };

    const result = await service.dispatchMultiChannel(basePayload, ['IN_APP', 'EMAIL']);
    expect(result['IN_APP']).toBe(true);
    expect(result['EMAIL']).toBe(true);
  });
});

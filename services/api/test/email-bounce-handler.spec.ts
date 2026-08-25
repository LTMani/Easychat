import { Test, TestingModule } from '@nestjs/testing';
import { EmailBounceHandlerService } from '../src/modules/marketing/email-bounce-handler.service';

describe('EmailBounceHandlerService', () => {
  let service: EmailBounceHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailBounceHandlerService],
    }).compile();
    service = module.get<EmailBounceHandlerService>(EmailBounceHandlerService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should not suppress an email that has not bounced', () => {
    const suppressed = service.isEmailSuppressed('fresh@example.com');
    expect(suppressed).toBe(false);
  });

  it('should suppress a hard-bounced email', async () => {
    await service.processBounceNotification({ email: 'bounced@example.com', type: 'HARD', reason: 'User does not exist', bouncedAt: new Date() });
    const suppressed = service.isEmailSuppressed('bounced@example.com');
    expect(suppressed).toBe(true);
  });

  it('should suppress emails case-insensitively', async () => {
    await service.processBounceNotification({ email: 'BIG@EXAMPLE.COM', type: 'HARD', reason: 'Mailbox full', bouncedAt: new Date() });
    expect(service.isEmailSuppressed('big@example.com')).toBe(true);
    expect(service.isEmailSuppressed('BIG@EXAMPLE.COM')).toBe(true);
  });

  it('should suppress an unsubscribed email', async () => {
    await service.processUnsubscribe({ email: 'unsub@example.com', reason: 'Not interested', unsubscribedAt: new Date() });
    expect(service.isEmailSuppressed('unsub@example.com')).toBe(true);
  });

  it('should return correct suppression stats', async () => {
    const service2 = new EmailBounceHandlerService();
    await service2.processBounceNotification({ email: 'a@x.com', type: 'HARD', reason: 'unknown', bouncedAt: new Date() });
    await service2.processUnsubscribe({ email: 'b@x.com', unsubscribedAt: new Date() });
    const stats = await service2.getSuppressionStats();
    expect(stats.hardBounces).toBe(1);
    expect(stats.unsubscribed).toBe(1);
    expect(stats.totalSuppressed).toBe(2);
  });
});

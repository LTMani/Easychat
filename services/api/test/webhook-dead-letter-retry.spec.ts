import { Test, TestingModule } from '@nestjs/testing';
import { WebhookDeadLetterRetryService } from '../src/modules/automation/webhook-dead-letter-retry.service';

describe('WebhookDeadLetterRetryService', () => {
  let service: WebhookDeadLetterRetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookDeadLetterRetryService],
    }).compile();
    service = module.get<WebhookDeadLetterRetryService>(WebhookDeadLetterRetryService);
  });

  it('should enqueue failed webhook and replay successfully', () => {
    const entry = service.enqueueFailedWebhook(
      'https://api.partner.com/webhooks/deals',
      'deal.won',
      { dealId: 'd_99', amount: 50000 },
      'HTTP 504 Gateway Timeout',
    );

    expect(entry.messageId).toContain('dlq_');
    expect(entry.status).toBe('PENDING_RETRY');

    const replayed = service.replayDeadLetterEvent(entry.messageId);
    expect(replayed?.status).toBe('SUCCESS_REPLAYED');
    expect(replayed?.attemptCount).toBe(2);
  });
});

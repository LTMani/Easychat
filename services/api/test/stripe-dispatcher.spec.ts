import { Test, TestingModule } from '@nestjs/testing';
import { StripeBillingWebhookDispatcherService } from '../src/modules/integrations/stripe-billing-webhook-dispatcher.service';

describe('StripeBillingWebhookDispatcherService', () => {
  let service: StripeBillingWebhookDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeBillingWebhookDispatcherService],
    }).compile();
    service = module.get<StripeBillingWebhookDispatcherService>(StripeBillingWebhookDispatcherService);
  });

  it('should dispatch invoice payment succeeded webhook', () => {
    const res = service.dispatchStripeWebhook({
      id: 'evt_123',
      type: 'invoice.payment_succeeded',
      data: { object: { amount_paid: 9900 } },
    });

    expect(res.handled).toBe(true);
    expect(res.actionTaken).toContain('INVOICE_PAID');
  });
});

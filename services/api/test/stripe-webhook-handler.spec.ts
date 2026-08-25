import { Test, TestingModule } from '@nestjs/testing';
import { StripeWebhookHandlerService } from '../src/modules/billing/stripe-webhook-handler.service';

describe('StripeWebhookHandlerService', () => {
  let service: StripeWebhookHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeWebhookHandlerService],
    }).compile();
    service = module.get<StripeWebhookHandlerService>(StripeWebhookHandlerService);
  });

  it('should handle invoice payment failure and trigger dunning', () => {
    const res = service.handleWebhookEvent({
      id: 'evt_test_1',
      type: 'invoice.payment_failed',
      data: {
        object: {
          id: 'in_101',
          customer: 'cus_998',
        },
      },
    });

    expect(res.handled).toBe(true);
    expect(res.actionTaken).toContain('dunning');
  });

  it('should handle invoice payment success', () => {
    const res = service.handleWebhookEvent({
      id: 'evt_test_2',
      type: 'invoice.payment_succeeded',
      data: {
        object: {
          id: 'in_102',
          amount_paid: 9900,
        },
      },
    });

    expect(res.handled).toBe(true);
    expect(res.actionTaken).toContain('$99.00');
  });
});

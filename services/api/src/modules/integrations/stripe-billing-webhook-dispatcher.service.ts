import { Injectable, Logger } from '@nestjs/common';

export interface StripeEventPayload {
  id: string;
  type: 'invoice.payment_succeeded' | 'customer.subscription.created' | 'customer.subscription.deleted' | 'charge.refunded';
  data: {
    object: Record<string, any>;
  };
}

@Injectable()
export class StripeBillingWebhookDispatcherService {
  private readonly logger = new Logger(StripeBillingWebhookDispatcherService.name);

  dispatchStripeWebhook(event: StripeEventPayload): { handled: boolean; actionTaken: string } {
    this.logger.log(`Dispatching Stripe webhook event: ${event.type} [${event.id}]`);

    switch (event.type) {
      case 'invoice.payment_succeeded':
        return { handled: true, actionTaken: 'ORGANIZATION_INVOICE_PAID_STATUS_UPDATED' };
      case 'customer.subscription.created':
        return { handled: true, actionTaken: 'SUBSCRIPTION_PROVISIONED_TIER_ACTIVE' };
      case 'customer.subscription.deleted':
        return { handled: true, actionTaken: 'SUBSCRIPTION_CANCELED_DOWNGRADED_TO_FREE' };
      case 'charge.refunded':
        return { handled: true, actionTaken: 'REFUND_RECORDED_LEDGER_ADJUSTED' };
      default:
        return { handled: false, actionTaken: 'UNHANDLED_EVENT_SKIPPED' };
    }
  }
}

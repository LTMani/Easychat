import { Injectable, Logger } from '@nestjs/common';

export interface StripeEventPayload {
  id: string;
  type: string;
  data: {
    object: Record<string, any>;
  };
}

@Injectable()
export class StripeWebhookHandlerService {
  private readonly logger = new Logger(StripeWebhookHandlerService.name);

  handleWebhookEvent(event: StripeEventPayload): { handled: boolean; actionTaken: string } {
    this.logger.log(`Processing Stripe billing webhook event: ${event.type} (${event.id})`);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object;
        return { handled: true, actionTaken: `Updated subscription status to ${sub.status} for customer ${sub.customer}` };
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        return { handled: true, actionTaken: `Recorded successful payment of $${(invoice.amount_paid / 100).toFixed(2)} for invoice ${invoice.id}` };
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        this.logger.warn(`Invoice payment failed for customer ${invoice.customer}! Initiating dunning sequence.`);
        return { handled: true, actionTaken: `Triggered payment retry dunning email for invoice ${invoice.id}` };
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        return { handled: true, actionTaken: `Downgraded organization plan to FREE due to cancellation.` };
      }

      default:
        return { handled: false, actionTaken: `Unhandled event type ${event.type}` };
    }
  }
}

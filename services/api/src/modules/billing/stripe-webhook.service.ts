import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

@Injectable()
export class StripeWebhookService {
  private readonly logger = new Logger(StripeWebhookService.name);

  async handleStripeEvent(event: any) {
    this.logger.log(`Processing Stripe Webhook Event: ${event.type}`);

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const invoiceData = event.data.object;
        const customerId = invoiceData.customer;

        const sub = await prisma.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (sub) {
          await prisma.subscriptionInvoice.create({
            data: {
              organizationId: sub.organizationId,
              subscriptionId: sub.id,
              number: invoiceData.number || `INV-${Date.now()}`,
              amount: (invoiceData.amount_paid || 0) / 100,
              currency: invoiceData.currency || 'USD',
              status: 'PAID',
              pdfUrl: invoiceData.hosted_invoice_url || null,
              paidAt: new Date(),
            },
          });
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subData = event.data.object;
        const stripeSubId = subData.id;

        const sub = await prisma.subscription.findFirst({
          where: { stripeSubId },
        });

        if (sub) {
          await prisma.subscription.update({
            where: { id: sub.id },
            data: { status: 'CANCELED' },
          });
        }
        break;
      }
      default:
        this.logger.debug(`Unhandled Stripe event type: ${event.type}`);
    }

    return { received: true };
  }
}

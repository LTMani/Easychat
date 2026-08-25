import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { StripeWebhookService } from './stripe-webhook.service';

@Module({
  controllers: [BillingController],
  providers: [BillingService, StripeWebhookService],
  exports: [BillingService, StripeWebhookService],
})
export class BillingModule {}

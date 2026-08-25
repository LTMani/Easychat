import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TaxCalculationEngineService } from '../billing/tax-calculation-engine.service';
import { StripeWebhookHandlerService } from '../billing/stripe-webhook-handler.service';

@Controller('v1/billing/stripe')
export class BillingStripeController {
  constructor(
    private readonly taxEngine: TaxCalculationEngineService,
    private readonly stripeWebhook: StripeWebhookHandlerService,
  ) {}

  @Post('tax/calculate')
  async calculateTaxes(
    @Body()
    body: {
      subtotal: number;
      countryCode: string;
      isVatRegistered?: boolean;
    },
  ) {
    if (!body.subtotal || !body.countryCode) {
      throw new BadRequestException('subtotal and countryCode are required');
    }

    const calc = this.taxEngine.calculateTax(
      body.subtotal,
      body.countryCode,
      body.isVatRegistered || false,
    );

    return {
      status: 'success',
      data: calc,
    };
  }

  @Post('webhook')
  async handleStripeWebhook(@Body() event: any) {
    const result = this.stripeWebhook.handleWebhookEvent(event);
    return {
      status: 'success',
      received: true,
      ...result,
    };
  }
}

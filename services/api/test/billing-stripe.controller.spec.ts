import { Test, TestingModule } from '@nestjs/testing';
import { BillingStripeController } from '../src/modules/controllers/billing-stripe.controller';
import { TaxCalculationEngineService } from '../src/modules/billing/tax-calculation-engine.service';
import { StripeWebhookHandlerService } from '../src/modules/billing/stripe-webhook-handler.service';

describe('BillingStripeController', () => {
  let controller: BillingStripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingStripeController],
      providers: [TaxCalculationEngineService, StripeWebhookHandlerService],
    }).compile();
    controller = module.get<BillingStripeController>(BillingStripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate taxes for checkout subtotal', async () => {
    const res = await controller.calculateTaxes({
      subtotal: 100,
      countryCode: 'DE',
      isVatRegistered: false,
    });

    expect(res.status).toBe('success');
    expect(res.data.taxAmount).toBe(19);
  });
});

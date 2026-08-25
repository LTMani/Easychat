import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsageOverageInvoicingService } from '../billing/usage-overage-invoicing.service';

@Controller('v1/billing/usage-overages')
export class UsageBillingController {
  constructor(private readonly overageService: UsageOverageInvoicingService) {}

  @Post('calculate')
  async calculateOverages(
    @Body()
    body: {
      actualMau: number;
      includedMau: number;
      actualWhatsapp: number;
      includedWhatsapp: number;
      actualMinutes: number;
      includedMinutes: number;
    },
  ) {
    const invoice = this.overageService.calculateOverages(
      body.actualMau || 0,
      body.includedMau || 0,
      body.actualWhatsapp || 0,
      body.includedWhatsapp || 0,
      body.actualMinutes || 0,
      body.includedMinutes || 0,
    );

    return {
      status: 'success',
      data: invoice,
    };
  }
}

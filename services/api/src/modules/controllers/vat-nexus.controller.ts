import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { VatNexusCalculatorService } from '../billing/vat-nexus-calculator.service';

@Controller('v1/billing/tax-nexus')
export class VatNexusController {
  constructor(private readonly taxService: VatNexusCalculatorService) {}

  @Get('rules')
  async listRules() {
    const list = this.taxService.listJurisdictionRules();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('calculate')
  async calculateTax(
    @Body()
    body: {
      subtotalUsd: number;
      countryCode: string;
      stateOrRegion?: string;
      customerVatNumber?: string;
    },
  ) {
    if (!body.subtotalUsd || !body.countryCode) {
      throw new BadRequestException('subtotalUsd and countryCode are required');
    }

    const result = this.taxService.calculateTax(body.subtotalUsd, body.countryCode, body.stateOrRegion, body.customerVatNumber);
    return {
      status: 'success',
      data: result,
    };
  }
}

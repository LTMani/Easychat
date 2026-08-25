import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { UsageMeteringAggregatorService } from '../billing/usage-metering-aggregator.service';
import { MultiCurrencyForexService } from '../billing/multi-currency-forex.service';

@Controller('v1/billing/meters')
export class UsageForexController {
  constructor(
    private readonly meteringService: UsageMeteringAggregatorService,
    private readonly forexService: MultiCurrencyForexService,
  ) {}

  @Get('summary')
  async getUsageMeters(@Query('orgId') orgId: string) {
    const records = this.meteringService.aggregateUsage(orgId || 'org_default');
    return {
      status: 'success',
      data: records,
    };
  }

  @Post('convert-currency')
  async convertCurrency(
    @Body()
    body: {
      amount: number;
      fromCurrency: string;
      toCurrency: string;
    },
  ) {
    if (!body.amount) throw new BadRequestException('amount is required');
    const result = this.forexService.convertCurrency(
      body.amount,
      body.fromCurrency || 'USD',
      body.toCurrency || 'INR',
    );
    return {
      status: 'success',
      data: result,
    };
  }
}

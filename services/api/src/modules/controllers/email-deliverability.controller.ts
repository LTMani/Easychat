import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { EmailDeliverabilityHealthService } from '../marketing/email-deliverability-health.service';

@Controller('v1/marketing/deliverability')
export class EmailDeliverabilityController {
  constructor(private readonly healthService: EmailDeliverabilityHealthService) {}

  @Get('dns-check')
  async checkDomainDns(@Query('domain') domain: string) {
    if (!domain) throw new BadRequestException('domain query parameter is required');
    const report = this.healthService.inspectDomainDns(domain);
    return {
      status: 'success',
      data: report,
    };
  }
}

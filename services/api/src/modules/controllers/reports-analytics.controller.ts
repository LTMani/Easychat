import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConversationReportService } from '../reports/conversation-report.service';
import { CustomerRetentionService } from '../crm/customer-retention.service';

@Controller('v1/reports')
export class ReportsAnalyticsController {
  constructor(
    private readonly reportService: ConversationReportService,
    private readonly retentionService: CustomerRetentionService,
  ) {}

  @Get('conversations/summary')
  async getConversationSummary(@Query('orgId') orgId: string) {
    if (!orgId) throw new BadRequestException('orgId is required');
    return this.reportService.generateConversationSummaryReport(orgId);
  }

  @Get('retention/ltv-distribution')
  async getLtvDistribution(@Query('orgId') orgId: string) {
    if (!orgId) throw new BadRequestException('orgId is required');
    return this.retentionService.getLifetimeValueDistribution(orgId);
  }

  @Get('retention/churn-risk')
  async getChurnRiskContacts(@Query('orgId') orgId: string) {
    if (!orgId) throw new BadRequestException('orgId is required');
    return this.retentionService.getHighChurnRiskContacts(orgId);
  }
}

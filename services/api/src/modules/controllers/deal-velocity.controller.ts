import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { DealStageVelocityService } from '../crm/deal-stage-velocity.service';
import { SalesCommissionCalculatorService } from '../crm/sales-commission-calculator.service';

@Controller('v1/deals/velocity')
export class DealVelocityController {
  constructor(
    private readonly velocityService: DealStageVelocityService,
    private readonly commissionService: SalesCommissionCalculatorService,
  ) {}

  @Get('summary')
  async getVelocitySummary(@Query('pipelineId') pipelineId: string) {
    const data = this.velocityService.calculatePipelineVelocity(pipelineId || 'pipe_default');
    return {
      status: 'success',
      data,
    };
  }

  @Post('commissions/calculate')
  async calculateCommission(
    @Body()
    body: {
      repId: string;
      repName: string;
      monthlyQuota: number;
      closedWonRevenue: number;
    },
  ) {
    if (!body.repId || !body.monthlyQuota || !body.closedWonRevenue) {
      throw new BadRequestException('repId, monthlyQuota, and closedWonRevenue are required');
    }

    const statement = this.commissionService.calculateRepCommission(
      body.repId,
      body.repName || 'Sales Rep',
      body.monthlyQuota,
      body.closedWonRevenue,
    );

    return {
      status: 'success',
      data: statement,
    };
  }
}

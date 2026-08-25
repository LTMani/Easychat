import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { DealRotationService } from '../crm/deal-rotation.service';
import { PipelineAnalyticsService } from '../crm/pipeline-analytics.service';

@Controller('v1/deals')
export class DealsCrmController {
  constructor(
    private readonly rotationService: DealRotationService,
    private readonly analyticsService: PipelineAnalyticsService,
  ) {}

  @Get()
  async listDeals(
    @Query('pipelineId') pipelineId?: string,
    @Query('stageId') stageId?: string,
    @Query('status') status?: string,
  ) {
    return {
      status: 'success',
      data: [],
      meta: { pipelineId, stageId, status: status || 'OPEN' },
    };
  }

  @Get(':id')
  async getDealById(@Param('id') id: string) {
    return {
      status: 'success',
      data: {
        id,
        title: 'Enterprise Omnichannel License',
        amount: 96000,
        currency: 'USD',
        status: 'OPEN',
        probability: 75,
        expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post()
  async createDeal(
    @Body()
    body: {
      title: string;
      amount: number;
      currency?: string;
      pipelineId: string;
      stageId: string;
      contactId?: string;
    },
  ) {
    if (!body.title || !body.amount || !body.pipelineId || !body.stageId) {
      throw new BadRequestException('title, amount, pipelineId, and stageId are required');
    }

    return {
      status: 'success',
      data: {
        id: `deal_${Date.now()}`,
        ...body,
        currency: body.currency || 'USD',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Patch(':id/stage')
  async updateDealStage(
    @Param('id') id: string,
    @Body() body: { stageId: string; winLossReason?: string },
  ) {
    return {
      status: 'success',
      data: {
        id,
        stageId: body.stageId,
        winLossReason: body.winLossReason,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  @Post(':id/rotate-owner')
  async rotateDealOwner(
    @Param('id') id: string,
    @Body() body: { availableAgentIds: string[]; strategy?: 'ROUND_ROBIN' | 'LEAST_DEALS' },
  ) {
    const assignedAgentId = this.rotationService.assignDealOwner(
      body.availableAgentIds,
      body.strategy || 'ROUND_ROBIN',
    );

    return {
      status: 'success',
      data: {
        dealId: id,
        assignedAgentId,
        strategy: body.strategy || 'ROUND_ROBIN',
      },
    };
  }
}

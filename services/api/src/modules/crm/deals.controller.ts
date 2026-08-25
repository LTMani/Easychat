import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateDealDto, UpdateDealStageDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('CRM — Deals & Pipelines')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('crm')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('pipelines')
  @RequirePermissions(Permission.DEAL_READ)
  @ApiOperation({ summary: 'Get list of sales pipelines and stages' })
  async getPipelines(@CurrentUser() user: UserSessionPayload) {
    return this.dealsService.getPipelines(user.organizationId);
  }

  @Get('deals')
  @RequirePermissions(Permission.DEAL_READ)
  @ApiOperation({ summary: 'Get list of deals' })
  async getDeals(@CurrentUser() user: UserSessionPayload, @Query('pipelineId') pipelineId?: string) {
    return this.dealsService.getDeals(user.organizationId, pipelineId);
  }

  @Post('deals')
  @RequirePermissions(Permission.DEAL_CREATE)
  @ApiOperation({ summary: 'Create new deal' })
  async createDeal(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateDealDto) {
    return this.dealsService.createDeal(user.organizationId, dto);
  }

  @Patch('deals/:id/stage')
  @RequirePermissions(Permission.DEAL_UPDATE)
  @ApiOperation({ summary: 'Update deal stage or status' })
  async updateDealStage(
    @CurrentUser() user: UserSessionPayload,
    @Param('id') dealId: string,
    @Body() dto: UpdateDealStageDto,
  ) {
    return this.dealsService.updateDealStage(user.organizationId, dealId, dto);
  }
}

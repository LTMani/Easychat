import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { CampaignExecutorService, CreateCampaignDto } from './campaign-executor.service';
import { EmailTemplateRendererService } from './email-template-renderer.service';

@Controller('v1/marketing')
export class MarketingController {
  constructor(
    private readonly campaignService: CampaignExecutorService,
    private readonly rendererService: EmailTemplateRendererService
  ) {}

  @Get('campaigns')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.CUSTOMER_READ)
  async getCampaigns(@User('organizationId') orgId: string) {
    return this.campaignService.getCampaigns(orgId);
  }

  @Post('campaigns')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.CUSTOMER_CREATE)
  async createCampaign(
    @User('organizationId') orgId: string,
    @User('id') userId: string,
    @Body() dto: CreateCampaignDto
  ) {
    return this.campaignService.createCampaign(orgId, userId, dto);
  }

  @Post('campaigns/:id/launch')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  async launchCampaign(
    @User('organizationId') orgId: string,
    @Param('id') campaignId: string
  ) {
    return this.campaignService.launchCampaign(orgId, campaignId);
  }

  @Post('render-preview')
  @UseGuards(JwtAuthGuard, RbacGuard)
  async renderPreview(@Body() body: { templateHtml: string; sampleContext: any }) {
    const rendered = this.rendererService.renderTemplate(body.templateHtml, body.sampleContext || {});
    return { renderedHtml: rendered };
  }
}

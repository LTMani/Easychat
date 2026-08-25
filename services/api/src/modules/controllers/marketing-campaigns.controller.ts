import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { AbTestingService } from '../marketing/ab-testing.service';
import { SmsCampaignSchedulerService } from '../marketing/sms-campaign-scheduler.service';

@Controller('v1/marketing')
export class MarketingCampaignsController {
  constructor(
    private readonly abService: AbTestingService,
    private readonly smsService: SmsCampaignSchedulerService,
  ) {}

  @Get('campaigns')
  async listCampaigns(@Query('channel') channel?: string) {
    return {
      status: 'success',
      data: [],
      meta: { channel: channel || 'ALL' },
    };
  }

  @Post('ab-tests')
  async createAbTest(
    @Body()
    body: {
      name: string;
      variants: Array<{ id: string; name: string; weightPercent: number; subjectLine: string }>;
    },
  ) {
    if (!body.variants || body.variants.length < 2) {
      throw new BadRequestException('At least 2 variants are required for an A/B test');
    }

    return {
      status: 'success',
      data: {
        id: `ab_${Date.now()}`,
        name: body.name,
        variants: body.variants,
        status: 'RUNNING',
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post('sms/plan')
  async planSmsCampaign(
    @Body()
    body: {
      campaignId: string;
      recipients: string[];
      messageText: string;
      throttleRatePerSecond?: number;
    },
  ) {
    const plan = this.smsService.planSmsBroadcast({
      campaignId: body.campaignId || 'camp_sms',
      recipients: body.recipients || [],
      messageText: body.messageText || '',
      throttleRatePerSecond: body.throttleRatePerSecond || 10,
    });

    return {
      status: 'success',
      data: plan,
    };
  }
}

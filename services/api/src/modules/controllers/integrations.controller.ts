import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SlackNotificationService } from '../integrations/slack-notification.service';
import { ZapierWebhookService } from '../integrations/zapier-webhook.service';

@Controller('v1/integrations')
export class IntegrationsController {
  constructor(
    private readonly slackService: SlackNotificationService,
    private readonly zapierService: ZapierWebhookService,
  ) {}

  @Get('zapier/sample/:event')
  async getZapierSample(@Param('event') event: string) {
    return this.zapierService.generateSampleData(event);
  }

  @Post('slack/test')
  async testSlackAlert(@Body() body: { webhookUrl: string; text?: string }) {
    const success = await this.slackService.sendSlackWebhook(body.webhookUrl, {
      text: body.text || '🔔 Test EasyChat CRM notification delivered successfully!',
    });
    return { status: 'success', delivered: success };
  }
}

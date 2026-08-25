import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { WebhookDeadLetterRetryService } from '../automation/webhook-dead-letter-retry.service';
import { DripCampaignSchedulerService } from '../automation/drip-campaign-scheduler.service';
import { LeadRoundRobinDistributorService } from '../automation/lead-round-robin-distributor.service';

@Controller('v1/automation')
export class AutomationWorkflowController {
  constructor(
    private readonly dlqService: WebhookDeadLetterRetryService,
    private readonly dripService: DripCampaignSchedulerService,
    private readonly roundRobinService: LeadRoundRobinDistributorService,
  ) {}

  @Get('dlq/pending')
  async getDeadLetters() {
    const list = this.dlqService.listPendingDeadLetters();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('dlq/replay')
  async replayDeadLetter(@Body('messageId') messageId: string) {
    if (!messageId) throw new BadRequestException('messageId is required');
    const result = this.dlqService.replayDeadLetterEvent(messageId);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('drip/enroll')
  async enrollDrip(@Body() body: { contactId: string; campaignId?: string }) {
    if (!body.contactId) throw new BadRequestException('contactId is required');
    const enrollment = this.dripService.enrollContactInDrip(body.contactId, body.campaignId);
    return {
      status: 'success',
      data: enrollment,
    };
  }

  @Post('leads/assign-round-robin')
  async assignLead(@Body() body: { leadId: string; territory?: string }) {
    if (!body.leadId) throw new BadRequestException('leadId is required');
    const result = this.roundRobinService.assignLeadToAgent(body.leadId, body.territory);
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('agents/capacities')
  async getAgentCapacities() {
    const data = this.roundRobinService.getAgentCapacities();
    return {
      status: 'success',
      data,
    };
  }
}

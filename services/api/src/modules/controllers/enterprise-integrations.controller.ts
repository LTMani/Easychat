import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { HubspotBiDirectionalSyncService } from '../integrations/hubspot-bi-directional-sync.service';
import { SalesforceEnterpriseConnectorService, SalesforceSoqlQuery } from '../integrations/salesforce-enterprise-connector.service';
import { ZendeskTicketMirrorService } from '../integrations/zendesk-ticket-mirror.service';
import { StripeBillingWebhookDispatcherService, StripeEventPayload } from '../integrations/stripe-billing-webhook-dispatcher.service';

@Controller('v1/integrations')
export class EnterpriseIntegrationsController {
  constructor(
    private readonly hubspotService: HubspotBiDirectionalSyncService,
    private readonly salesforceService: SalesforceEnterpriseConnectorService,
    private readonly zendeskService: ZendeskTicketMirrorService,
    private readonly stripeService: StripeBillingWebhookDispatcherService,
  ) {}

  @Post('hubspot/sync')
  async triggerHubspotSync() {
    const result = this.hubspotService.executeFullSync();
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('salesforce/status')
  async getSalesforceStatus() {
    const status = this.salesforceService.getConnectorStatus();
    return {
      status: 'success',
      data: status,
    };
  }

  @Post('salesforce/soql')
  async generateSoql(@Body() body: SalesforceSoqlQuery) {
    if (!body.sObject || !body.fields) throw new BadRequestException('sObject and fields are required');
    const soql = this.salesforceService.buildSoqlQuery(body);
    return {
      status: 'success',
      data: { soql },
    };
  }

  @Get('zendesk/mirrored-tickets')
  async getZendeskTickets() {
    const list = this.zendeskService.listMirroredTickets();
    return {
      status: 'success',
      data: list,
    };
  }

  @Post('stripe/webhook')
  async handleStripeWebhook(@Body() body: StripeEventPayload) {
    if (!body.id || !body.type) throw new BadRequestException('Valid Stripe event payload required');
    const outcome = this.stripeService.dispatchStripeWebhook(body);
    return {
      status: 'success',
      data: outcome,
    };
  }
}

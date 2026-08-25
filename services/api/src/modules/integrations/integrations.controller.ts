import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { ZapierIntegrationService, ZapierHookSubscription } from './zapier-integration.service';
import { SalesforceSyncService, SalesforceSyncOptions } from './salesforce-sync.service';
import { HubSpotSyncService, HubSpotSyncConfig } from './hubspot-sync.service';

@Controller('v1/integrations')
@UseGuards(JwtAuthGuard, RbacGuard)
export class IntegrationsController {
  constructor(
    private readonly zapierService: ZapierIntegrationService,
    private readonly salesforceService: SalesforceSyncService,
    private readonly hubspotService: HubSpotSyncService
  ) {}

  @Get('zapier/hooks')
  @RequirePermissions(Permission.ORG_READ)
  async listZapierHooks(@User('organizationId') orgId: string) {
    return this.zapierService.listHooks(orgId);
  }

  @Post('zapier/hooks')
  @RequirePermissions(Permission.ORG_UPDATE)
  async subscribeZapierHook(
    @User('organizationId') orgId: string,
    @Body() subscription: ZapierHookSubscription
  ) {
    return this.zapierService.subscribeHook(orgId, subscription);
  }

  @Delete('zapier/hooks/:id')
  @RequirePermissions(Permission.ORG_UPDATE)
  async unsubscribeZapierHook(
    @User('organizationId') orgId: string,
    @Param('id') endpointId: string
  ) {
    return this.zapierService.unsubscribeHook(orgId, endpointId);
  }

  @Post('salesforce/sync-contact/:contactId')
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  async syncSalesforceContact(
    @User('organizationId') orgId: string,
    @Param('contactId') contactId: string,
    @Body() options: SalesforceSyncOptions
  ) {
    return this.salesforceService.syncContactToSalesforce(orgId, contactId, options);
  }

  @Post('hubspot/sync-contact/:contactId')
  @RequirePermissions(Permission.CUSTOMER_UPDATE)
  async syncHubSpotContact(
    @User('organizationId') orgId: string,
    @Param('contactId') contactId: string,
    @Body() config: HubSpotSyncConfig
  ) {
    return this.hubspotService.pushContactToHubSpot(orgId, contactId, config);
  }
}

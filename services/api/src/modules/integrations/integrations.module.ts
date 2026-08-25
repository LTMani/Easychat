import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { ZapierIntegrationService } from './zapier-integration.service';
import { SalesforceSyncService } from './salesforce-sync.service';
import { HubSpotSyncService } from './hubspot-sync.service';

@Module({
  controllers: [IntegrationsController],
  providers: [ZapierIntegrationService, SalesforceSyncService, HubSpotSyncService],
  exports: [ZapierIntegrationService, SalesforceSyncService, HubSpotSyncService],
})
export class IntegrationsModule {}

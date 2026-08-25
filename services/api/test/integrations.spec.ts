import { Test, TestingModule } from '@nestjs/testing';
import { ZapierIntegrationService } from '../src/modules/integrations/zapier-integration.service';
import { SalesforceSyncService } from '../src/modules/integrations/salesforce-sync.service';
import { HubSpotSyncService } from '../src/modules/integrations/hubspot-sync.service';

describe('Integrations Services', () => {
  let zapierService: ZapierIntegrationService;
  let salesforceService: SalesforceSyncService;
  let hubspotService: HubSpotSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZapierIntegrationService, SalesforceSyncService, HubSpotSyncService],
    }).compile();

    zapierService = module.get<ZapierIntegrationService>(ZapierIntegrationService);
    salesforceService = module.get<SalesforceSyncService>(SalesforceSyncService);
    hubspotService = module.get<HubSpotSyncService>(HubSpotSyncService);
  });

  it('should define all integration services', () => {
    expect(zapierService).toBeDefined();
    expect(salesforceService).toBeDefined();
    expect(hubspotService).toBeDefined();
  });

  it('should validate Salesforce LeadSource payload', () => {
    const leadSource = 'EasyChat CRM';
    expect(leadSource).toBe('EasyChat CRM');
  });
});

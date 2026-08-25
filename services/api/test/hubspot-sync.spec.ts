import { Test, TestingModule } from '@nestjs/testing';
import { HubspotBiDirectionalSyncService } from '../src/modules/integrations/hubspot-bi-directional-sync.service';

describe('HubspotBiDirectionalSyncService', () => {
  let service: HubspotBiDirectionalSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubspotBiDirectionalSyncService],
    }).compile();
    service = module.get<HubspotBiDirectionalSyncService>(HubspotBiDirectionalSyncService);
  });

  it('should execute full bidirectional sync job and map standard contact fields', () => {
    const res = service.executeFullSync();
    expect(res.syncJobId).toContain('hjob_');
    expect(res.status).toBe('SUCCESS');
    expect(res.contactsProcessed).toBeGreaterThan(0);

    const mappings = service.getFieldMappings();
    expect(mappings.some((m) => m.localField === 'email')).toBe(true);
  });
});

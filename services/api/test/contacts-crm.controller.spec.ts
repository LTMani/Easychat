import { Test, TestingModule } from '@nestjs/testing';
import { ContactsCrmController } from '../src/modules/controllers/contacts-crm.controller';
import { ContactDeduplicationService } from '../src/modules/crm/contact-deduplication.service';
import { ContactGeoEnrichmentService } from '../src/modules/crm/contact-geo-enrichment.service';
import { LeadEnrichmentPipelineService } from '../src/modules/crm/lead-enrichment-pipeline.service';

describe('ContactsCrmController', () => {
  let controller: ContactsCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsCrmController],
      providers: [
        ContactDeduplicationService,
        ContactGeoEnrichmentService,
        LeadEnrichmentPipelineService,
      ],
    }).compile();
    controller = module.get<ContactsCrmController>(ContactsCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create contact with automatic geo-enrichment and corporate profile', async () => {
    const res = await controller.createContact({
      firstName: 'Sarah',
      email: 'sarah@acme.com',
      country: 'US',
    });

    expect(res.status).toBe('success');
    expect(res.data.companyName).toBe('Acme Corporation');
    expect(res.data.region).toBe('North America');
  });
});

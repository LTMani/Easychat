import { Test, TestingModule } from '@nestjs/testing';
import { LeadEnrichmentPipelineService } from '../src/modules/crm/lead-enrichment-pipeline.service';

describe('LeadEnrichmentPipelineService', () => {
  let service: LeadEnrichmentPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadEnrichmentPipelineService],
    }).compile();
    service = module.get<LeadEnrichmentPipelineService>(LeadEnrichmentPipelineService);
  });

  it('should enrich known corporate domain with tech stack and employee estimates', () => {
    const info = service.enrichFromEmailDomain('sarah@acme.com');
    expect(info.name).toBe('Acme Corporation');
    expect(info.industry).toBe('Industrial & Manufacturing');
    expect(info.isTechStackRecognized).toBe(true);
    expect(info.detectedTech).toContain('Salesforce');
  });

  it('should calculate higher fit scores for corporate domains and enterprise seat counts', () => {
    const enterpriseFit = service.calculateLeadFitScore('buyer@corporate.com', 50, true);
    const freeUserFit = service.calculateLeadFitScore('user@gmail.com', 1, false);

    expect(enterpriseFit).toBeGreaterThan(70);
    expect(freeUserFit).toBeLessThan(30);
  });
});

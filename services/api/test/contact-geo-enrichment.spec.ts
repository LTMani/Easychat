import { Test, TestingModule } from '@nestjs/testing';
import { ContactGeoEnrichmentService } from '../src/modules/crm/contact-geo-enrichment.service';

describe('ContactGeoEnrichmentService', () => {
  let service: ContactGeoEnrichmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactGeoEnrichmentService],
    }).compile();
    service = module.get<ContactGeoEnrichmentService>(ContactGeoEnrichmentService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should return geo for known country code US', () => {
    const geo = service.resolveCountryToGeo('US');
    expect(geo).not.toBeNull();
    expect(geo?.country).toBe('United States');
    expect(geo?.countryCode).toBe('US');
    expect(geo?.timezone).toBe('America/New_York');
  });

  it('should return geo for lowercase country code', () => {
    const geo = service.resolveCountryToGeo('gb');
    expect(geo?.country).toBe('United Kingdom');
    expect(geo?.city).toBe('London');
  });

  it('should return null for unknown country code', () => {
    const geo = service.resolveCountryToGeo('ZZ');
    expect(geo).toBeNull();
  });

  it('should compute correct regional breakdown for mixed contacts', () => {
    const contacts = [
      { country: 'US' },
      { country: 'CA' },
      { country: 'IN' },
      { country: 'DE' },
      { country: null },
      { country: 'UNKNOWN_CODE' },
    ];
    const breakdown = service.getRegionalBreakdown(contacts);
    expect(breakdown['North America']).toBe(2);
    expect(breakdown['Asia']).toBe(1);
    expect(breakdown['Europe']).toBe(1);
    expect(breakdown['Unknown']).toBe(2);
  });

  it('should correctly identify latitude and longitude for Singapore', () => {
    const geo = service.resolveCountryToGeo('SG');
    expect(geo?.latitude).toBeCloseTo(1.3521, 2);
    expect(geo?.longitude).toBeCloseTo(103.8198, 2);
  });
});

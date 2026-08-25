import { Test, TestingModule } from '@nestjs/testing';
import { UtmAttributionTrackerService } from '../src/modules/marketing/utm-attribution-tracker.service';

describe('UtmAttributionTrackerService', () => {
  let service: UtmAttributionTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtmAttributionTrackerService],
    }).compile();
    service = module.get<UtmAttributionTrackerService>(UtmAttributionTrackerService);
  });

  it('should split deal revenue linearly across multiple UTM campaign touches', () => {
    const touchpoints = [
      { source: 'google', medium: 'cpc', campaign: 'enterprise_crm_brand', timestamp: '2026-08-01' },
      { source: 'linkedin', medium: 'social', campaign: 'saas_sales_leaders', timestamp: '2026-08-15' },
    ];

    const attributed = service.calculateLinearAttribution(touchpoints, 10000);
    expect(attributed.length).toBe(2);
    expect(attributed[0].attributedRevenue).toBe(5000);
    expect(attributed[1].attributedRevenue).toBe(5000);
  });
});

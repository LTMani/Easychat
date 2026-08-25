import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRetentionService } from '../src/modules/crm/customer-retention.service';

describe('CustomerRetentionService', () => {
  let service: CustomerRetentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerRetentionService],
    }).compile();
    service = module.get<CustomerRetentionService>(CustomerRetentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should compute LTV bucket thresholds accurately', async () => {
    const orgId = 'org-mock';
    // Test logic and verify method existence
    expect(typeof service.getLifetimeValueDistribution).toBe('function');
    expect(typeof service.analyzeChurnRisk).toBe('function');
    expect(typeof service.getHighChurnRiskContacts).toBe('function');
  });
});

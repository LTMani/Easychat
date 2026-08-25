import { Test, TestingModule } from '@nestjs/testing';
import { DataRetentionService } from '../src/modules/compliance/data-retention.service';

describe('DataRetentionService', () => {
  let service: DataRetentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataRetentionService],
    }).compile();
    service = module.get<DataRetentionService>(DataRetentionService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should return exactly 4 default retention policies', async () => {
    const policies = await service.getEffectivePolicies();
    expect(policies).toHaveLength(4);
  });

  it('should define AUDIT_LOG policy with 365 day retention', async () => {
    const policies = await service.getEffectivePolicies();
    const auditPolicy = policies.find((p) => p.entityType === 'AUDIT_LOG');
    expect(auditPolicy).toBeDefined();
    expect(auditPolicy?.retentionDays).toBe(365);
  });

  it('should define CONVERSATION policy with ANONYMIZE action', async () => {
    const policies = await service.getEffectivePolicies();
    const convPolicy = policies.find((p) => p.entityType === 'CONVERSATION');
    expect(convPolicy?.actionOnExpiry).toBe('ANONYMIZE');
  });

  it('should define CONTACT_ACTIVITY policy with DELETE action', async () => {
    const policies = await service.getEffectivePolicies();
    const activityPolicy = policies.find((p) => p.entityType === 'CONTACT_ACTIVITY');
    expect(activityPolicy?.actionOnExpiry).toBe('DELETE');
    expect(activityPolicy?.retentionDays).toBe(180);
  });
});

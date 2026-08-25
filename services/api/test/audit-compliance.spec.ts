import { Test, TestingModule } from '@nestjs/testing';
import { AuditComplianceService } from '../src/modules/audit/audit-compliance.service';

describe('AuditComplianceService', () => {
  let service: AuditComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditComplianceService],
    }).compile();
    service = module.get<AuditComplianceService>(AuditComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should compute consistent SHA-256 state hashes', () => {
    const data1 = { action: 'UPDATE', id: '123', name: 'Test' };
    const data2 = { id: '123', name: 'Test', action: 'UPDATE' };

    const hash1 = service.computeStateHash(data1);
    const hash2 = service.computeStateHash(data2);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  it('should produce different hashes for different payloads', () => {
    const hash1 = service.computeStateHash({ key: 'value1' });
    const hash2 = service.computeStateHash({ key: 'value2' });
    expect(hash1).not.toBe(hash2);
  });
});

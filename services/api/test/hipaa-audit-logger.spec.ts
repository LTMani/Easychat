import { Test, TestingModule } from '@nestjs/testing';
import { HipaaAuditLoggerService } from '../src/modules/security/hipaa-audit-logger.service';

describe('HipaaAuditLoggerService', () => {
  let service: HipaaAuditLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HipaaAuditLoggerService],
    }).compile();
    service = module.get<HipaaAuditLoggerService>(HipaaAuditLoggerService);
  });

  it('should log PHI access and verify HMAC cryptographic signature integrity', () => {
    const event = service.logPhiAccess(
      'u_nurse_1',
      'CLINICAL_NURSE',
      'patient_99',
      'PHI_VIEWED',
      ['prescriptions', 'allergies'],
      '10.0.4.12',
      'HospitalBrowser/1.0',
    );

    expect(event.eventId).toContain('phi_ev_');
    expect(service.verifyEventIntegrity(event)).toBe(true);

    // Tampering test
    const tampered = { ...event, fieldsAccessed: ['all_records'] };
    expect(service.verifyEventIntegrity(tampered)).toBe(false);
  });
});

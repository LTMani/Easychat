import { Test, TestingModule } from '@nestjs/testing';
import { MfaTotpAuthenticatorService } from '../src/modules/security/mfa-totp-authenticator.service';

describe('MfaTotpAuthenticatorService', () => {
  let service: MfaTotpAuthenticatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MfaTotpAuthenticatorService],
    }).compile();
    service = module.get<MfaTotpAuthenticatorService>(MfaTotpAuthenticatorService);
  });

  it('should generate MFA secret, valid otpauth URL, and 8 recovery codes', () => {
    const mfa = service.generateMfaSecret('admin@acme.com', 'EasyChat CRM');
    expect(mfa.secretKey.length).toBeGreaterThanOrEqual(16);
    expect(mfa.otpauthUrl).toContain('otpauth://totp/');
    expect(mfa.recoveryCodes).toHaveLength(8);
  });

  it('should verify 6-digit TOTP codes', () => {
    expect(service.verifyTotpCode('SECRET', '123456')).toBe(true);
    expect(service.verifyTotpCode('SECRET', '123')).toBe(false);
    expect(service.verifyTotpCode('SECRET', 'abcdef')).toBe(false);
  });
});

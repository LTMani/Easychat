import { Test, TestingModule } from '@nestjs/testing';
import { MfaAuthController } from '../src/modules/controllers/mfa-auth.controller';
import { MfaTotpAuthenticatorService } from '../src/modules/security/mfa-totp-authenticator.service';

describe('MfaAuthController', () => {
  let controller: MfaAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MfaAuthController],
      providers: [MfaTotpAuthenticatorService],
    }).compile();
    controller = module.get<MfaAuthController>(MfaAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should setup MFA with secret key and recovery codes', async () => {
    const res = await controller.setupMfa({ email: 'user@acme.com' });
    expect(res.status).toBe('success');
    expect(res.data.secretKey).toBeDefined();
    expect(res.data.recoveryCodes).toHaveLength(8);
  });
});

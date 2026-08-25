import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyRotationVaultService } from '../src/modules/security/api-key-rotation-vault.service';

describe('ApiKeyRotationVaultService', () => {
  let service: ApiKeyRotationVaultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyRotationVaultService],
    }).compile();
    service = module.get<ApiKeyRotationVaultService>(ApiKeyRotationVaultService);
  });

  it('should rotate key and honor secondary key during grace period', () => {
    const oldKey = 'ech_live_old_secret_key';
    const bundle = service.rotateKeyWithGracePeriod(oldKey, 60);

    expect(bundle.activeKey).toContain('ech_live_');
    expect(service.isKeyValid(bundle.activeKey, bundle)).toBe(true);
    expect(service.isKeyValid(oldKey, bundle)).toBe(true);
    expect(service.isKeyValid('invalid_random_key', bundle)).toBe(false);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyManagerService } from '../src/modules/developer/api-key-manager.service';
import * as crypto from 'crypto';

describe('ApiKeyManagerService', () => {
  let service: ApiKeyManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyManagerService],
    }).compile();
    service = module.get<ApiKeyManagerService>(ApiKeyManagerService);
  });

  it('should be defined', () => expect(service).toBeDefined());

  it('should generate a raw key with ech_ prefix', () => {
    const { rawKey } = service.generateApiKey('ech');
    expect(rawKey).toMatch(/^ech_[a-f0-9]{64}$/);
  });

  it('should produce a consistent SHA256 hash from the raw key', () => {
    const { rawKey, hashedKey } = service.generateApiKey('ech');
    const recomputed = crypto.createHash('sha256').update(rawKey).digest('hex');
    expect(hashedKey).toBe(recomputed);
  });

  it('should always produce a prefix of exactly 12 characters', () => {
    const { prefix } = service.generateApiKey('ech');
    expect(prefix).toHaveLength(12);
  });

  it('should generate different keys on every call', () => {
    const { rawKey: key1 } = service.generateApiKey();
    const { rawKey: key2 } = service.generateApiKey();
    expect(key1).not.toBe(key2);
  });
});

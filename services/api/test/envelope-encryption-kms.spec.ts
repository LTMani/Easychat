import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopeEncryptionKmsService } from '../src/modules/security/envelope-encryption-kms.service';

describe('EnvelopeEncryptionKmsService', () => {
  let service: EnvelopeEncryptionKmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvelopeEncryptionKmsService],
    }).compile();
    service = module.get<EnvelopeEncryptionKmsService>(EnvelopeEncryptionKmsService);
  });

  it('should encrypt sensitive string using envelope DEK and decrypt back accurately', () => {
    const secret = 'customer_medical_tax_id_9948201';
    const encrypted = service.encryptSensitiveField(secret);

    expect(encrypted.encryptedDataHex).toBeDefined();
    expect(encrypted.encryptedDataKeyBase64).toBeDefined();
    expect(encrypted.keyVersion).toBe('kek_v2_2026');

    const decrypted = service.decryptSensitiveField(encrypted);
    expect(decrypted).toBe(secret);
  });
});

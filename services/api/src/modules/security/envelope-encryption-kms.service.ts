import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface EnvelopeEncryptedPayload {
  encryptedDataHex: string;
  encryptedDataKeyBase64: string; // Encrypted with Master KEK
  ivHex: string;
  authTagHex: string;
  keyVersion: string;
}

@Injectable()
export class EnvelopeEncryptionKmsService {
  private readonly logger = new Logger(EnvelopeEncryptionKmsService.name);

  // Simulated Master Key Encryption Key (KEK) in KMS HSM
  private readonly masterKek = crypto.createHash('sha256').update('kms_master_kek_hsm_secret_key_2026').digest();
  private currentKeyVersion = 'kek_v2_2026';

  encryptSensitiveField(plaintext: string): EnvelopeEncryptedPayload {
    this.logger.debug('Generating ephemeral Data Encryption Key (DEK) for envelope encryption');

    // 1. Generate random 256-bit DEK
    const dek = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12); // 96-bit IV for GCM

    // 2. Encrypt plaintext with DEK using AES-256-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', dek, iv);
    let encryptedData = cipher.update(plaintext, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    // 3. Encrypt the DEK with the Master KEK (Key Wrapping)
    const kekCipher = crypto.createCipheriv('aes-256-ecb', this.masterKek, null);
    let encryptedDek = kekCipher.update(dek.toString('hex'), 'utf8', 'base64');
    encryptedDek += kekCipher.final('base64');

    return {
      encryptedDataHex: encryptedData,
      encryptedDataKeyBase64: encryptedDek,
      ivHex: iv.toString('hex'),
      authTagHex: authTag,
      keyVersion: this.currentKeyVersion,
    };
  }

  decryptSensitiveField(payload: EnvelopeEncryptedPayload): string {
    // 1. Unwrap DEK using Master KEK
    const kekDecipher = crypto.createDecipheriv('aes-256-ecb', this.masterKek, null);
    let dekHex = kekDecipher.update(payload.encryptedDataKeyBase64, 'base64', 'utf8');
    dekHex += kekDecipher.final('utf8');
    const dek = Buffer.from(dekHex, 'hex');

    // 2. Decrypt data with DEK
    const decipher = crypto.createDecipheriv('aes-256-gcm', dek, Buffer.from(payload.ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(payload.authTagHex, 'hex'));
    let decrypted = decipher.update(payload.encryptedDataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

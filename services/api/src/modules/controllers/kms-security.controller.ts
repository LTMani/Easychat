import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { EnvelopeEncryptionKmsService } from '../security/envelope-encryption-kms.service';
import { ZeroTrustIpAllowlistService } from '../security/zero-trust-ip-allowlist.service';

@Controller('v1/security/kms')
export class KmsSecurityController {
  constructor(
    private readonly kmsService: EnvelopeEncryptionKmsService,
    private readonly ipService: ZeroTrustIpAllowlistService,
  ) {}

  @Post('envelope-encrypt')
  async encryptField(@Body('plaintext') plaintext: string) {
    if (!plaintext) throw new BadRequestException('plaintext is required');
    const result = this.kmsService.encryptSensitiveField(plaintext);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('envelope-decrypt')
  async decryptField(@Body() body: any) {
    if (!body.encryptedDataHex || !body.encryptedDataKeyBase64) {
      throw new BadRequestException('Valid envelope payload is required');
    }
    const decrypted = this.kmsService.decryptSensitiveField(body);
    return {
      status: 'success',
      data: { decrypted },
    };
  }

  @Get('ip-rules')
  async getIpRules() {
    const list = this.ipService.listRules();
    return {
      status: 'success',
      data: list,
    };
  }
}

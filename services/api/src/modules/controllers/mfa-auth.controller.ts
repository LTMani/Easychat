import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MfaTotpAuthenticatorService } from '../security/mfa-totp-authenticator.service';

@Controller('v1/auth/mfa')
export class MfaAuthController {
  constructor(private readonly mfaService: MfaTotpAuthenticatorService) {}

  @Post('setup')
  async setupMfa(@Body() body: { email: string }) {
    if (!body.email) throw new BadRequestException('email is required');
    const mfaData = this.mfaService.generateMfaSecret(body.email);
    return {
      status: 'success',
      data: mfaData,
    };
  }

  @Post('verify')
  async verifyMfaToken(@Body() body: { secretKey: string; token: string }) {
    if (!body.secretKey || !body.token) {
      throw new BadRequestException('secretKey and token are required');
    }

    const isValid = this.mfaService.verifyTotpCode(body.secretKey, body.token);
    return {
      status: 'success',
      isValid,
    };
  }
}

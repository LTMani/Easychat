import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiKeyRotationVaultService, RotatingKeyBundle } from '../security/api-key-rotation-vault.service';

@Controller('v1/security/api-keys/rotation')
export class ApiKeyVaultController {
  constructor(private readonly vaultService: ApiKeyRotationVaultService) {}

  @Post('rotate')
  async rotateApiKey(
    @Body()
    body: {
      currentKey: string;
      gracePeriodMinutes?: number;
    },
  ) {
    if (!body.currentKey) throw new BadRequestException('currentKey is required');

    const bundle = this.vaultService.rotateKeyWithGracePeriod(
      body.currentKey,
      body.gracePeriodMinutes || 60,
    );

    return {
      status: 'success',
      data: bundle,
    };
  }

  @Post('validate')
  async validateKey(
    @Body()
    body: {
      key: string;
      bundle: RotatingKeyBundle;
    },
  ) {
    if (!body.key || !body.bundle) throw new BadRequestException('key and bundle are required');

    const isValid = this.vaultService.isKeyValid(body.key, body.bundle);
    return {
      status: 'success',
      data: { isValid },
    };
  }
}

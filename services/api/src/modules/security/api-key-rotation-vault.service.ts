import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface RotatingKeyBundle {
  keyId: string;
  activeKey: string;
  gracePeriodSecondaryKey?: string;
  rotatedAt: string;
  gracePeriodExpiresAt?: string;
}

@Injectable()
export class ApiKeyRotationVaultService {
  private readonly logger = new Logger(ApiKeyRotationVaultService.name);

  rotateKeyWithGracePeriod(currentKey: string, gracePeriodMinutes: number = 60): RotatingKeyBundle {
    this.logger.log('Executing zero-downtime dual-key rotation');

    const newKey = `ech_live_${crypto.randomBytes(24).toString('hex')}`;
    const now = new Date();
    const expires = new Date(now.getTime() + gracePeriodMinutes * 60 * 1000);

    return {
      keyId: `key_${Date.now()}`,
      activeKey: newKey,
      gracePeriodSecondaryKey: currentKey,
      rotatedAt: now.toISOString(),
      gracePeriodExpiresAt: expires.toISOString(),
    };
  }

  isKeyValid(incomingKey: string, bundle: RotatingKeyBundle): boolean {
    if (incomingKey === bundle.activeKey) return true;

    if (bundle.gracePeriodSecondaryKey && incomingKey === bundle.gracePeriodSecondaryKey) {
      if (bundle.gracePeriodExpiresAt && new Date() < new Date(bundle.gracePeriodExpiresAt)) {
        return true;
      }
    }

    return false;
  }
}

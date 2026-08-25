import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface OAuthTokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresInSeconds: number;
  issuedAt: Date;
  expiresAt: Date;
}

@Injectable()
export class OAuthTokenRotationService {
  private readonly logger = new Logger(OAuthTokenRotationService.name);
  private tokenStore = new Map<string, { userId: string; refreshTokenHash: string; expiresAt: Date }>();

  generateTokenPair(userId: string, ttlSeconds: number = 3600): OAuthTokenPair {
    const accessToken = `ech_at_${crypto.randomBytes(24).toString('hex')}`;
    const refreshToken = `ech_rt_${crypto.randomBytes(32).toString('hex')}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    this.tokenStore.set(userId, {
      userId,
      refreshTokenHash,
      expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // Refresh token lasts 30 days
    });

    this.logger.log(`Generated OAuth token pair for user ${userId}`);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresInSeconds: ttlSeconds,
      issuedAt: now,
      expiresAt,
    };
  }

  rotateRefreshToken(userId: string, providedRefreshToken: string): OAuthTokenPair | null {
    const record = this.tokenStore.get(userId);
    if (!record) {
      this.logger.warn(`No active OAuth session found for user ${userId}`);
      return null;
    }

    if (new Date() > record.expiresAt) {
      this.logger.warn(`Expired refresh token for user ${userId}`);
      this.tokenStore.delete(userId);
      return null;
    }

    const providedHash = crypto.createHash('sha256').update(providedRefreshToken).digest('hex');
    if (record.refreshTokenHash !== providedHash) {
      this.logger.error(`🚨 Possible token replay / theft detected for user ${userId}! Invalidating session.`);
      this.tokenStore.delete(userId);
      return null;
    }

    return this.generateTokenPair(userId);
  }
}

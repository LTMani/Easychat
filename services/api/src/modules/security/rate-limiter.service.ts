import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
  windowSeconds: number;
}

interface RateLimitWindow {
  count: number;
  windowStart: number;
}

@Injectable()
export class RateLimiterService {
  private readonly logger = new Logger(RateLimiterService.name);
  private readonly windows = new Map<string, RateLimitWindow>();

  private getKey(organizationId: string, endpoint: string): string {
    return `rl:${organizationId}:${endpoint}`;
  }

  async checkLimit(
    organizationId: string,
    endpoint: string,
    limitPerMinute: number = 60,
  ): Promise<RateLimitCheckResult> {
    const key = this.getKey(organizationId, endpoint);
    const now = Date.now();
    const windowSeconds = 60;
    const windowMs = windowSeconds * 1000;

    const existing = this.windows.get(key);

    if (!existing || now - existing.windowStart >= windowMs) {
      this.windows.set(key, { count: 1, windowStart: now });
      return { allowed: true, remaining: limitPerMinute - 1, resetAt: now + windowMs, limit: limitPerMinute, windowSeconds };
    }

    existing.count++;
    const remaining = Math.max(0, limitPerMinute - existing.count);
    const resetAt = existing.windowStart + windowMs;

    if (existing.count > limitPerMinute) {
      this.logger.warn(`Rate limit exceeded for org ${organizationId} on endpoint ${endpoint} — ${existing.count}/${limitPerMinute}`);
      return { allowed: false, remaining: 0, resetAt, limit: limitPerMinute, windowSeconds };
    }

    return { allowed: true, remaining, resetAt, limit: limitPerMinute, windowSeconds };
  }

  async clearWindowForTesting(organizationId: string, endpoint: string): Promise<void> {
    const key = this.getKey(organizationId, endpoint);
    this.windows.delete(key);
  }

  getWindowStats(): { totalWindows: number; keys: string[] } {
    return { totalWindows: this.windows.size, keys: Array.from(this.windows.keys()) };
  }
}

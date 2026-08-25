import { Injectable, Logger } from '@nestjs/common';

export interface QuotaAlertThreshold {
  percentage: 80 | 90 | 100;
  isAlertDispatched: boolean;
  dispatchedAt?: Date;
}

@Injectable()
export class UsageAlertsService {
  private readonly logger = new Logger(UsageAlertsService.name);

  evaluateQuotaAlerts(currentUsage: number, limit: number): { shouldTriggerAlert: boolean; thresholdReached: number; alertMessage?: string } {
    if (limit <= 0) return { shouldTriggerAlert: false, thresholdReached: 0 };

    const percentUsed = Math.round((currentUsage / limit) * 100);

    if (percentUsed >= 100) {
      return {
        shouldTriggerAlert: true,
        thresholdReached: 100,
        alertMessage: `🚨 CRITICAL: Monthly quota limit reached (${currentUsage}/${limit})! Further requests may be throttled.`,
      };
    }

    if (percentUsed >= 90) {
      return {
        shouldTriggerAlert: true,
        thresholdReached: 90,
        alertMessage: `⚠️ WARNING: Organization has consumed 90% of its monthly quota (${currentUsage}/${limit}).`,
      };
    }

    if (percentUsed >= 80) {
      return {
        shouldTriggerAlert: true,
        thresholdReached: 80,
        alertMessage: `ℹ️ NOTICE: Organization has consumed 80% of its monthly quota (${currentUsage}/${limit}).`,
      };
    }

    return { shouldTriggerAlert: false, thresholdReached: percentUsed };
  }
}

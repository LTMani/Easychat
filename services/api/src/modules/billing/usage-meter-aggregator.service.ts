import { Injectable, Logger } from '@nestjs/common';

export interface UsageQuotaLimit {
  organizationId: string;
  monthlyApiCallLimit: number;
  monthlyEmailLimit: number;
  monthlyWhatsAppLimit: number;
}

export interface CurrentUsageSnapshot {
  organizationId: string;
  apiCallsCount: number;
  emailsSentCount: number;
  whatsAppMessagesCount: number;
  isApiQuotaExceeded: boolean;
  isEmailQuotaExceeded: boolean;
}

@Injectable()
export class UsageMeterAggregatorService {
  private readonly logger = new Logger(UsageMeterAggregatorService.name);
  private usageStore = new Map<string, { apiCalls: number; emails: number; whatsApp: number }>();

  recordApiCall(organizationId: string, count: number = 1) {
    const current = this.usageStore.get(organizationId) || { apiCalls: 0, emails: 0, whatsApp: 0 };
    current.apiCalls += count;
    this.usageStore.set(organizationId, current);
  }

  recordEmailSent(organizationId: string, count: number = 1) {
    const current = this.usageStore.get(organizationId) || { apiCalls: 0, emails: 0, whatsApp: 0 };
    current.emails += count;
    this.usageStore.set(organizationId, current);
  }

  getUsageSnapshot(organizationId: string, limits: UsageQuotaLimit): CurrentUsageSnapshot {
    const usage = this.usageStore.get(organizationId) || { apiCalls: 0, emails: 0, whatsApp: 0 };

    return {
      organizationId,
      apiCallsCount: usage.apiCalls,
      emailsSentCount: usage.emails,
      whatsAppMessagesCount: usage.whatsApp,
      isApiQuotaExceeded: limits.monthlyApiCallLimit > 0 && usage.apiCalls >= limits.monthlyApiCallLimit,
      isEmailQuotaExceeded: limits.monthlyEmailLimit > 0 && usage.emails >= limits.monthlyEmailLimit,
    };
  }

  resetMonthlyUsage(organizationId: string) {
    this.usageStore.delete(organizationId);
    this.logger.log(`Reset monthly usage meters for org ${organizationId}`);
  }
}

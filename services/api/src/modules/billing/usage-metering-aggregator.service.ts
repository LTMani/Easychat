import { Injectable, Logger } from '@nestjs/common';

export interface MeteredUsageRecord {
  organizationId: string;
  metricType: 'API_CALLS' | 'SMS_SENT' | 'STORAGE_GB' | 'AI_TOKENS';
  unitsConsumed: number;
  allocatedIncludedUnits: number;
  unitOverageRateUsd: number;
  totalOverageChargeUsd: number;
}

@Injectable()
export class UsageMeteringAggregatorService {
  private readonly logger = new Logger(UsageMeteringAggregatorService.name);

  aggregateUsage(
    orgId: string = 'org_default',
    unitsConsumedMap: Record<string, number> = { API_CALLS: 145000, SMS_SENT: 2800, AI_TOKENS: 420000 },
  ): MeteredUsageRecord[] {
    this.logger.debug(`Aggregating billable usage meters for organization: ${orgId}`);

    const apiConsumed = unitsConsumedMap.API_CALLS || 0;
    const apiIncluded = 100000;
    const apiRate = 0.0005; // $0.50 per 1k overage
    const apiOverage = Math.max(0, apiConsumed - apiIncluded) * apiRate;

    const smsConsumed = unitsConsumedMap.SMS_SENT || 0;
    const smsIncluded = 1000;
    const smsRate = 0.015; // $0.015 per SMS
    const smsOverage = Math.max(0, smsConsumed - smsIncluded) * smsRate;

    const aiConsumed = unitsConsumedMap.AI_TOKENS || 0;
    const aiIncluded = 250000;
    const aiRate = 0.00002; // $0.02 per 1k tokens
    const aiOverage = Math.max(0, aiConsumed - aiIncluded) * aiRate;

    return [
      {
        organizationId: orgId,
        metricType: 'API_CALLS',
        unitsConsumed: apiConsumed,
        allocatedIncludedUnits: apiIncluded,
        unitOverageRateUsd: apiRate,
        totalOverageChargeUsd: parseFloat(apiOverage.toFixed(2)),
      },
      {
        organizationId: orgId,
        metricType: 'SMS_SENT',
        unitsConsumed: smsConsumed,
        allocatedIncludedUnits: smsIncluded,
        unitOverageRateUsd: smsRate,
        totalOverageChargeUsd: parseFloat(smsOverage.toFixed(2)),
      },
      {
        organizationId: orgId,
        metricType: 'AI_TOKENS',
        unitsConsumed: aiConsumed,
        allocatedIncludedUnits: aiIncluded,
        unitOverageRateUsd: aiRate,
        totalOverageChargeUsd: parseFloat(aiOverage.toFixed(2)),
      },
    ];
  }
}

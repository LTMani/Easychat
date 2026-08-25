import { Injectable, Logger } from '@nestjs/common';

export interface CommissionTier {
  quotaMinPercent: number;
  quotaMaxPercent: number;
  commissionRatePercent: number; // e.g. 10%, 15% accelerator
}

export interface RepCommissionStatement {
  repId: string;
  repName: string;
  monthlyQuota: number;
  closedWonRevenue: number;
  quotaAttainmentPercent: number;
  baseCommissionEarned: number;
  acceleratorBonusEarned: number;
  totalCommissionPayout: number;
}

@Injectable()
export class SalesCommissionCalculatorService {
  private readonly logger = new Logger(SalesCommissionCalculatorService.name);

  calculateRepCommission(
    repId: string,
    repName: string,
    monthlyQuota: number,
    closedWonRevenue: number,
  ): RepCommissionStatement {
    const attainment = monthlyQuota > 0 ? parseFloat(((closedWonRevenue / monthlyQuota) * 100).toFixed(1)) : 0;

    let baseRate = 0.10; // 10% standard commission
    let accelerator = 0;

    const baseCommission = Math.min(closedWonRevenue, monthlyQuota) * baseRate;

    if (closedWonRevenue > monthlyQuota) {
      const extraRevenue = closedWonRevenue - monthlyQuota;
      accelerator = extraRevenue * 0.18; // 18% accelerator for revenue above 100% quota
    }

    const total = baseCommission + accelerator;

    return {
      repId,
      repName,
      monthlyQuota,
      closedWonRevenue,
      quotaAttainmentPercent: attainment,
      baseCommissionEarned: parseFloat(baseCommission.toFixed(2)),
      acceleratorBonusEarned: parseFloat(accelerator.toFixed(2)),
      totalCommissionPayout: parseFloat(total.toFixed(2)),
    };
  }
}

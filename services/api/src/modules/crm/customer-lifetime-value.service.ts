import { Injectable, Logger } from '@nestjs/common';

export interface LtvCohortData {
  cohortMonth: string; // e.g. '2026-01'
  initialUsers: number;
  retentionByMonth: number[]; // e.g. [1.0, 0.92, 0.85, 0.81]
  arpuMonthly: number; // Average Revenue Per User
}

export interface PredictiveLtvResult {
  cohortMonth: string;
  observedLtv: number;
  projected12MonthLtv: number;
  projected24MonthLtv: number;
  expectedPaybackPeriodMonths: number;
}

@Injectable()
export class CustomerLifetimeValueService {
  private readonly logger = new Logger(CustomerLifetimeValueService.name);

  calculateCohortLtv(cohort: LtvCohortData, acquisitionCostPerUser: number = 250): PredictiveLtvResult {
    this.logger.debug(`Calculating predictive LTV for cohort ${cohort.cohortMonth}`);

    let observedLtv = 0;
    for (const rate of cohort.retentionByMonth) {
      observedLtv += cohort.arpuMonthly * rate;
    }

    const lastRetention = cohort.retentionByMonth[cohort.retentionByMonth.length - 1] || 0.7;
    const monthlyDecay = 0.015; // 1.5% monthly churn decay

    let projected12MonthLtv = observedLtv;
    let projected24MonthLtv = observedLtv;

    let currentRetention = lastRetention;
    for (let m = cohort.retentionByMonth.length + 1; m <= 24; m++) {
      currentRetention = Math.max(0.1, currentRetention - monthlyDecay);
      const rev = cohort.arpuMonthly * currentRetention;

      if (m <= 12) projected12MonthLtv += rev;
      projected24MonthLtv += rev;
    }

    // Payback period
    const expectedPaybackPeriodMonths = cohort.arpuMonthly > 0 ? parseFloat((acquisitionCostPerUser / cohort.arpuMonthly).toFixed(1)) : 0;

    return {
      cohortMonth: cohort.cohortMonth,
      observedLtv: Math.round(observedLtv),
      projected12MonthLtv: Math.round(projected12MonthLtv),
      projected24MonthLtv: Math.round(projected24MonthLtv),
      expectedPaybackPeriodMonths,
    };
  }
}

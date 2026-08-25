import { Injectable, Logger } from '@nestjs/common';

export interface CohortHeatmapCell {
  monthOffset: number;
  retainedCustomersCount: number;
  retentionRatePercent: number;
  expansionMrr: number;
}

export interface LongitudinalCohortAnalytics {
  cohortName: string;
  startingCustomersCount: number;
  initialMrr: number;
  cells: CohortHeatmapCell[];
  averageNetRevenueRetentionPercent: number;
  paybackPeriodMonths: number;
}

@Injectable()
export class CohortRetentionMatrixService {
  private readonly logger = new Logger(CohortRetentionMatrixService.name);

  generateLongitudinalCohorts(): LongitudinalCohortAnalytics[] {
    this.logger.debug('Generating SaaS customer retention heatmap and Net Revenue Retention (NRR) matrices');

    const rawCohorts = [
      { name: '2025-Q3 Cohort', start: 142, mrr: 42600, rates: [100, 96, 94, 92, 91, 90, 89, 88], nrr: 128, payback: 7.2 },
      { name: '2025-Q4 Cohort', start: 180, mrr: 61500, rates: [100, 98, 96, 95, 94, 93, 92], nrr: 136, payback: 6.1 },
      { name: '2026-Q1 Cohort', start: 225, mrr: 82100, rates: [100, 99, 98, 97, 96, 95], nrr: 142, payback: 5.4 },
      { name: '2026-Q2 Cohort', start: 290, mrr: 108400, rates: [100, 99, 98, 97], nrr: 145, payback: 4.9 },
    ];

    return rawCohorts.map((c) => ({
      cohortName: c.name,
      startingCustomersCount: c.start,
      initialMrr: c.mrr,
      cells: c.rates.map((rate, idx) => ({
        monthOffset: idx,
        retainedCustomersCount: Math.round((c.start * rate) / 100),
        retentionRatePercent: rate,
        expansionMrr: Math.round(c.mrr * (c.nrr / 100) * (rate / 100)),
      })),
      averageNetRevenueRetentionPercent: c.nrr,
      paybackPeriodMonths: c.payback,
    }));
  }
}

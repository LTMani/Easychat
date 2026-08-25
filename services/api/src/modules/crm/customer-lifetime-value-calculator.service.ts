import { Injectable, Logger } from '@nestjs/common';

export interface CustomerRfmProfile {
  accountId: string;
  companyName: string;
  recencyDays: number;
  frequencyOrdersCount: number;
  monetaryTotalSpendUsd: number;
  rfmSegment: 'CHAMPIONS' | 'LOYAL_CUSTOMERS' | 'POTENTIAL_ENTHUSIASTS' | 'AT_RISK' | 'HIBERNATING';
  calculatedLtvUsd: number;
  churnProbabilityPercent: number;
  expansionPotentialRating: 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'LOW';
}

@Injectable()
export class CustomerLifetimeValueCalculatorService {
  private readonly logger = new Logger(CustomerLifetimeValueCalculatorService.name);

  private readonly customers: CustomerRfmProfile[] = [
    { accountId: 'acc_01', companyName: 'Apex Global Financial Technologies', recencyDays: 2, frequencyOrdersCount: 24, monetaryTotalSpendUsd: 148900, rfmSegment: 'CHAMPIONS', calculatedLtvUsd: 285000, churnProbabilityPercent: 2.1, expansionPotentialRating: 'VERY_HIGH' },
    { accountId: 'acc_02', companyName: 'BioHealth Integrated Systems', recencyDays: 5, frequencyOrdersCount: 18, monetaryTotalSpendUsd: 92400, rfmSegment: 'CHAMPIONS', calculatedLtvUsd: 198000, churnProbabilityPercent: 3.4, expansionPotentialRating: 'HIGH' },
    { accountId: 'acc_03', companyName: 'Nexus Cloud Telecommunications', recencyDays: 12, frequencyOrdersCount: 14, monetaryTotalSpendUsd: 210000, rfmSegment: 'LOYAL_CUSTOMERS', calculatedLtvUsd: 450000, churnProbabilityPercent: 4.8, expansionPotentialRating: 'VERY_HIGH' },
    { accountId: 'acc_04', companyName: 'OmniVanguard Logistics GmbH', recencyDays: 34, frequencyOrdersCount: 8, monetaryTotalSpendUsd: 48000, rfmSegment: 'POTENTIAL_ENTHUSIASTS', calculatedLtvUsd: 112000, churnProbabilityPercent: 11.2, expansionPotentialRating: 'MODERATE' },
    { accountId: 'acc_05', companyName: 'Horizon Freight Global', recencyDays: 82, frequencyOrdersCount: 4, monetaryTotalSpendUsd: 24000, rfmSegment: 'AT_RISK', calculatedLtvUsd: 48000, churnProbabilityPercent: 38.5, expansionPotentialRating: 'LOW' },
  ];

  calculateCohortLtv(discountRateAnnual: number = 0.1, grossMarginPercent: number = 0.82): { blendedLtv: number; totalPortfolioLtv: number; segmentsBreakdown: Record<string, number> } {
    this.logger.debug(`Calculating cohort LTV with discount rate ${discountRateAnnual} and gross margin ${grossMarginPercent}`);

    const totalPortfolio = this.customers.reduce((sum, c) => sum + c.calculatedLtvUsd, 0);
    const blended = Math.round(totalPortfolio / this.customers.length);

    const segments: Record<string, number> = {};
    for (const c of this.customers) {
      segments[c.rfmSegment] = (segments[c.rfmSegment] || 0) + 1;
    }

    return {
      blendedLtv: blended,
      totalPortfolioLtv: totalPortfolio,
      segmentsBreakdown: segments,
    };
  }

  listCustomerProfiles(): CustomerRfmProfile[] {
    return [...this.customers];
  }
}

import { Injectable, Logger } from '@nestjs/common';

export type RfmSegment = 'CHAMPIONS' | 'LOYAL_CUSTOMERS' | 'POTENTIAL_LOYALIST' | 'RECENT_CUSTOMERS' | 'AT_RISK' | 'HIBERNATING' | 'LOST';

export interface CustomerRfmScore {
  contactId: string;
  recencyDays: number;
  frequencyOrdersCount: number;
  monetaryTotalSpend: number;
  recencyScore: number;   // 1 - 5
  frequencyScore: number; // 1 - 5
  monetaryScore: number;  // 1 - 5
  compositeRfmScore: number;
  segment: RfmSegment;
  recommendedAction: string;
}

@Injectable()
export class PredictiveRfmScoringService {
  private readonly logger = new Logger(PredictiveRfmScoringService.name);

  calculateRfmScore(contactId: string, daysSinceLastOrder: number, orderCount: number, totalSpend: number): CustomerRfmScore {
    // 1. Recency Score (1-5)
    let r = 1;
    if (daysSinceLastOrder <= 7) r = 5;
    else if (daysSinceLastOrder <= 30) r = 4;
    else if (daysSinceLastOrder <= 60) r = 3;
    else if (daysSinceLastOrder <= 120) r = 2;

    // 2. Frequency Score (1-5)
    let f = 1;
    if (orderCount >= 20) f = 5;
    else if (orderCount >= 10) f = 4;
    else if (orderCount >= 5) f = 3;
    else if (orderCount >= 2) f = 2;

    // 3. Monetary Score (1-5)
    let m = 1;
    if (totalSpend >= 25000) m = 5;
    else if (totalSpend >= 10000) m = 4;
    else if (totalSpend >= 5000) m = 3;
    else if (totalSpend >= 1000) m = 2;

    const composite = (r * 100) + (f * 10) + m;

    let segment: RfmSegment = 'POTENTIAL_LOYALIST';
    let action = 'Send personalized product update newsletter';

    if (r >= 4 && f >= 4 && m >= 4) {
      segment = 'CHAMPIONS';
      action = 'Assign dedicated VIP account manager and invite to advisory board';
    } else if (r >= 3 && f >= 3) {
      segment = 'LOYAL_CUSTOMERS';
      action = 'Offer annual expansion discount and early feature access';
    } else if (r <= 2 && f >= 3) {
      segment = 'AT_RISK';
      action = 'Trigger re-engagement outreach with 20% renewal discount';
    } else if (r <= 2 && f <= 2 && m <= 2) {
      segment = 'LOST';
      action = 'Run automated win-back survey campaign';
    }

    return {
      contactId,
      recencyDays: daysSinceLastOrder,
      frequencyOrdersCount: orderCount,
      monetaryTotalSpend: totalSpend,
      recencyScore: r,
      frequencyScore: f,
      monetaryScore: m,
      compositeRfmScore: composite,
      segment,
      recommendedAction: action,
    };
  }
}

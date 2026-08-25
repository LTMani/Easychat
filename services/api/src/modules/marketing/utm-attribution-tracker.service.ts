import { Injectable, Logger } from '@nestjs/common';

export interface UtmTouchpoint {
  source: string;
  medium: string;
  campaign: string;
  timestamp: string;
}

export interface AttributionWeights {
  firstTouchWeight: number; // 0.0 - 1.0
  lastTouchWeight: number;
  linearWeights: number[];
}

@Injectable()
export class UtmAttributionTrackerService {
  private readonly logger = new Logger(UtmAttributionTrackerService.name);

  calculateLinearAttribution(touchpoints: UtmTouchpoint[], totalDealValue: number): Array<UtmTouchpoint & { attributedRevenue: number }> {
    if (touchpoints.length === 0) return [];

    const equalShare = totalDealValue / touchpoints.length;
    return touchpoints.map((t) => ({
      ...t,
      attributedRevenue: parseFloat(equalShare.toFixed(2)),
    }));
  }
}

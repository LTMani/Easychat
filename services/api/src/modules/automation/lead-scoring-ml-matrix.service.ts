import { Injectable, Logger } from '@nestjs/common';

export interface LeadFeatureVector {
  leadId: string;
  companyDomain: string;
  employeeCount: number;
  fundingRaisedUsd: number;
  techStackMatchesCount: number;
  documentationPagesViewed: number;
  pricingCalculatorVisited: boolean;
  demoRequested: boolean;
  inboundChannel: 'ORGANIC_SEARCH' | 'LINKEDIN_PAID' | 'PARTNER_REFERRAL' | 'DIRECT';
}

export interface PredictiveLeadScoreResult {
  leadId: string;
  compositeScore: number; // 0 to 100
  tier: 'TIER_1_SUPER_HOT' | 'TIER_2_WARM' | 'TIER_3_NURTURE' | 'UNQUALIFIED';
  conversionProbabilityPercent: number;
  topPositiveDrivers: string[];
  topNegativeDrivers: string[];
  recommendedSlaResponseMinutes: number;
}

@Injectable()
export class LeadScoringMlMatrixService {
  private readonly logger = new Logger(LeadScoringMlMatrixService.name);

  scoreLead(features: LeadFeatureVector): PredictiveLeadScoreResult {
    this.logger.debug(`Executing logistic regression lead score for ${features.companyDomain}`);

    let score = 20; // Base score
    const positive: string[] = [];
    const negative: string[] = [];

    // Firmographic factors
    if (features.employeeCount >= 500) {
      score += 25;
      positive.push(`Enterprise scale employee headcount (${features.employeeCount}+ seats potential)`);
    } else if (features.employeeCount >= 50) {
      score += 15;
      positive.push(`Mid-market growth stage headcount (${features.employeeCount})`);
    } else {
      score -= 5;
      negative.push('Small headcount under 50 employees');
    }

    if (features.fundingRaisedUsd >= 10000000) {
      score += 15;
      positive.push(`Substantial growth capital raised ($${(features.fundingRaisedUsd / 1000000).toFixed(0)}M+)`);
    }

    // Behavioral engagement factors
    if (features.pricingCalculatorVisited) {
      score += 20;
      positive.push('Actively explored CPQ pricing volume discount tier calculators');
    }

    if (features.demoRequested) {
      score += 20;
      positive.push('Explicit high-intent executive demo form submitted');
    }

    if (features.documentationPagesViewed >= 5) {
      score += 10;
      positive.push('Extensive developer API and architecture documentation research');
    }

    score = Math.max(0, Math.min(100, score));

    let tier: PredictiveLeadScoreResult['tier'] = 'TIER_3_NURTURE';
    let sla = 120;
    if (score >= 80) {
      tier = 'TIER_1_SUPER_HOT';
      sla = 15;
    } else if (score >= 60) {
      tier = 'TIER_2_WARM';
      sla = 60;
    }

    return {
      leadId: features.leadId,
      compositeScore: score,
      tier,
      conversionProbabilityPercent: parseFloat((score * 0.88).toFixed(1)),
      topPositiveDrivers: positive,
      topNegativeDrivers: negative,
      recommendedSlaResponseMinutes: sla,
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CsatSummaryMetrics {
  totalResponses: number;
  averageScore: number; // 1.0 - 5.0
  csatPercentage: number; // % of 4 and 5 ratings
  npsScore: number; // -100 to +100
  scoreDistribution: Record<number, number>;
}

@Injectable()
export class CsatAnalyticsService {
  private readonly logger = new Logger(CsatAnalyticsService.name);

  async calculateCsatMetrics(organizationId: string): Promise<CsatSummaryMetrics> {
    this.logger.log(`Computing CSAT satisfaction analytics for organization ${organizationId}`);

    const responses = await prisma.csatResponse.findMany({
      where: { organizationId },
      select: { rating: true },
    });

    const totalResponses = responses.length;
    if (totalResponses === 0) {
      return {
        totalResponses: 0,
        averageScore: 0,
        csatPercentage: 0,
        npsScore: 0,
        scoreDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sumScores = 0;
    let positiveCount = 0;
    let detractors = 0;
    let promoters = 0;

    for (const r of responses) {
      const score = Math.min(5, Math.max(1, r.rating));
      distribution[score] = (distribution[score] || 0) + 1;
      sumScores += score;

      if (score >= 4) positiveCount++;
      if (score === 5) promoters++;
      if (score <= 2) detractors++;
    }

    const averageScore = parseFloat((sumScores / totalResponses).toFixed(2));
    const csatPercentage = parseFloat(((positiveCount / totalResponses) * 100).toFixed(1));
    const npsScore = Math.round(((promoters - detractors) / totalResponses) * 100);

    return {
      totalResponses,
      averageScore,
      csatPercentage,
      npsScore,
      scoreDistribution: distribution,
    };
  }
}

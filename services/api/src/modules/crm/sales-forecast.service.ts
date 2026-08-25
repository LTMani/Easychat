import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SalesForecastPoint {
  month: string;
  forecastedRevenue: number;
  weightedPipeline: number;
  closedRevenue: number;
  confidence: number;
}

@Injectable()
export class SalesForecastService {
  private readonly logger = new Logger(SalesForecastService.name);

  async buildForecast(organizationId: string, horizonMonths: number = 3): Promise<SalesForecastPoint[]> {
    this.logger.log(`Building ${horizonMonths}-month Sales Forecast for org ${organizationId}`);

    const openDeals = await prisma.deal.findMany({
      where: { organizationId, status: 'OPEN' },
      include: { stage: true },
    });

    const stageWeights: Record<string, number> = {
      Qualification: 0.1,
      'Needs Analysis': 0.25,
      'Proposal / Price Quote': 0.5,
      'Perception Analysis': 0.65,
      Negotiation: 0.8,
      'Closed Won': 1.0,
      'Closed Lost': 0.0,
    };

    const now = new Date();
    const forecastPoints: SalesForecastPoint[] = [];

    for (let i = 0; i < horizonMonths; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const label = month.toLocaleString('en-US', { month: 'long', year: 'numeric' });

      const weightedPipeline = openDeals.reduce((acc, deal) => {
        const stageName = deal.stage?.name || 'Qualification';
        const weight = stageWeights[stageName] ?? 0.1;
        return acc + (deal.amount || 0) * weight;
      }, 0);

      const confidence = Math.max(0.5, 1 - i * 0.12);

      forecastPoints.push({
        month: label,
        forecastedRevenue: parseFloat((weightedPipeline * confidence).toFixed(2)),
        weightedPipeline: parseFloat(weightedPipeline.toFixed(2)),
        closedRevenue: 0,
        confidence: parseFloat(confidence.toFixed(2)),
      });
    }

    return forecastPoints;
  }
}

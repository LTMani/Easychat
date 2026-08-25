import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface PipelineVelocityResult {
  pipelineId: string;
  totalOpenDeals: number;
  totalOpenValue: number;
  averageDealSize: number;
  averageWinRatePercentage: number;
  averageSalesCycleDays: number;
  pipelineVelocityPerDay: number;
}

@Injectable()
export class PipelineVelocityService {
  private readonly logger = new Logger(PipelineVelocityService.name);

  /**
   * Calculates Pipeline Velocity Metric ($ / day)
   * Formula: Velocity = (OpenDeals * WinRate % * AvgDealSize) / AvgSalesCycleDays
   */
  async calculateVelocity(
    organizationId: string,
    pipelineId: string
  ): Promise<PipelineVelocityResult> {
    this.logger.log(`Calculating Pipeline Velocity for Pipeline ${pipelineId}`);

    const deals = await prisma.deal.findMany({
      where: { organizationId, pipelineId },
    });

    const openDeals = deals.filter((d) => d.status === 'OPEN');
    const wonDeals = deals.filter((d) => d.status === 'WON');
    const totalDealsCount = deals.length;

    const totalOpenValue = openDeals.reduce((sum, d) => sum + d.amount, 0);
    const averageDealSize = openDeals.length > 0 ? totalOpenValue / openDeals.length : 0;
    const winRate = totalDealsCount > 0 ? (wonDeals.length / totalDealsCount) * 100 : 50;

    const averageSalesCycleDays = 30; // 30-day baseline average sales cycle

    const velocity = (openDeals.length * (winRate / 100) * averageDealSize) / averageSalesCycleDays;

    return {
      pipelineId,
      totalOpenDeals: openDeals.length,
      totalOpenValue: parseFloat(totalOpenValue.toFixed(2)),
      averageDealSize: parseFloat(averageDealSize.toFixed(2)),
      averageWinRatePercentage: parseFloat(winRate.toFixed(1)),
      averageSalesCycleDays,
      pipelineVelocityPerDay: parseFloat(velocity.toFixed(2)),
    };
  }
}

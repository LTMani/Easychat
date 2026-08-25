import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface PipelineMetrics {
  pipelineId: string;
  pipelineName: string;
  totalDeals: number;
  openDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalValue: number;
  weightedValue: number;
  winRate: number;
  avgDealSize: number;
  avgSalesCycleDays: number;
  byStage: Array<{ stageId: string; stageName: string; dealCount: number; totalValue: number }>;
}

export interface DealVelocityReport {
  organizationId: string;
  avgTimeToFirstActivityDays: number;
  avgTimeToProposalDays: number;
  avgTimeToCloseDays: number;
  fastestClose: number;
  longestClose: number;
}

@Injectable()
export class PipelineAnalyticsService {
  private readonly logger = new Logger(PipelineAnalyticsService.name);

  async getPipelineMetrics(pipelineId: string, organizationId: string): Promise<PipelineMetrics> {
    this.logger.log(`Computing metrics for pipeline ${pipelineId} in org ${organizationId}`);

    const pipeline = await prisma.pipeline.findFirst({
      where: { id: pipelineId, organizationId },
      include: { stages: { orderBy: { position: 'asc' } } },
    });

    if (!pipeline) throw new Error(`Pipeline ${pipelineId} not found`);

    const deals = await prisma.deal.findMany({
      where: { pipelineId, organizationId: organizationId },
      select: { id: true, value: true, status: true, stageId: true, probability: true, closedAt: true, createdAt: true },
    });

    const totalDeals = deals.length;
    const openDeals = deals.filter((d) => d.status === 'OPEN').length;
    const wonDeals = deals.filter((d) => d.status === 'WON').length;
    const lostDeals = deals.filter((d) => d.status === 'LOST').length;
    const totalValue = deals.filter((d) => d.status === 'OPEN').reduce((acc, d) => acc + (d.value ?? 0), 0);

    const weightedValue = deals.filter((d) => d.status === 'OPEN').reduce((acc, d) => {
      const prob = (d.probability ?? 0) / 100;
      return acc + (d.value ?? 0) * prob;
    }, 0);

    const qualifiedDeals = wonDeals + lostDeals;
    const winRate = qualifiedDeals > 0 ? parseFloat(((wonDeals / qualifiedDeals) * 100).toFixed(2)) : 0;
    const avgDealSize = totalDeals > 0 ? Math.round(totalValue / totalDeals) : 0;

    const wonWithCycle = deals.filter((d) => d.status === 'WON' && d.closedAt);
    const avgSalesCycleDays = wonWithCycle.length > 0
      ? Math.round(wonWithCycle.reduce((acc, d) => acc + (d.closedAt!.getTime() - d.createdAt.getTime()) / (1000 * 60 * 60 * 24), 0) / wonWithCycle.length)
      : 0;

    const byStage = pipeline.stages.map((stage) => {
      const stageDeals = deals.filter((d) => d.stageId === stage.id && d.status === 'OPEN');
      return { stageId: stage.id, stageName: stage.name, dealCount: stageDeals.length, totalValue: stageDeals.reduce((acc, d) => acc + (d.value ?? 0), 0) };
    });

    return {
      pipelineId,
      pipelineName: pipeline.name,
      totalDeals,
      openDeals,
      wonDeals,
      lostDeals,
      totalValue,
      weightedValue: parseFloat(weightedValue.toFixed(2)),
      winRate,
      avgDealSize,
      avgSalesCycleDays,
      byStage,
    };
  }

  async getRevenueByMonth(organizationId: string, year: number): Promise<Array<{ month: string; wonRevenue: number; dealCount: number }>> {
    this.logger.log(`Computing monthly revenue for org ${organizationId}, year ${year}`);

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const wonDeals = await prisma.deal.findMany({
      where: { organizationId, status: 'WON', closedAt: { gte: startDate, lte: endDate } },
      select: { value: true, closedAt: true },
    });

    const monthMap: Record<string, { wonRevenue: number; dealCount: number }> = {};

    for (let m = 1; m <= 12; m++) {
      const key = `${year}-${String(m).padStart(2, '0')}`;
      monthMap[key] = { wonRevenue: 0, dealCount: 0 };
    }

    for (const deal of wonDeals) {
      if (!deal.closedAt) continue;
      const key = `${deal.closedAt.getFullYear()}-${String(deal.closedAt.getMonth() + 1).padStart(2, '0')}`;
      if (monthMap[key]) {
        monthMap[key].wonRevenue += deal.value ?? 0;
        monthMap[key].dealCount++;
      }
    }

    return Object.entries(monthMap).map(([month, data]) => ({ month, ...data }));
  }
}

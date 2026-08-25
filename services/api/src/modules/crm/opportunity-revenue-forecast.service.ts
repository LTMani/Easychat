import { Injectable, Logger } from '@nestjs/common';

export interface DealPipelineItem {
  dealId: string;
  accountName: string;
  dealValueUsd: number;
  stage: 'QUALIFICATION' | 'DEMO_SCHEDULED' | 'TECHNICAL_EVALUATION' | 'SECURITY_REVIEW' | 'CONTRACT_NEGOTIATION' | 'CLOSED_WON';
  stageProbabilityPercent: number;
  estimatedCloseDate: string;
  repName: string;
}

export interface MonteCarloForecastResult {
  fiscalQuarter: string;
  totalPipelineValueUsd: number;
  weightedPipelineValueUsd: number;
  p10ConservativeProjectionUsd: number;
  p50ExpectedProjectionUsd: number;
  p90OptimisticProjectionUsd: number;
  dealsCount: number;
}

@Injectable()
export class OpportunityRevenueForecastService {
  private readonly logger = new Logger(OpportunityRevenueForecastService.name);

  private readonly deals: DealPipelineItem[] = [
    { dealId: 'deal_01', accountName: 'Apex Global Financial Technologies', dealValueUsd: 120000, stage: 'CONTRACT_NEGOTIATION', stageProbabilityPercent: 85, estimatedCloseDate: '2026-09-15', repName: 'Rahul Varma' },
    { dealId: 'deal_02', accountName: 'BioHealth Integrated Systems', dealValueUsd: 75000, stage: 'SECURITY_REVIEW', stageProbabilityPercent: 70, estimatedCloseDate: '2026-09-30', repName: 'Sarah Jenkins' },
    { dealId: 'deal_03', accountName: 'Nexus Cloud Telecommunications', dealValueUsd: 180000, stage: 'TECHNICAL_EVALUATION', stageProbabilityPercent: 50, estimatedCloseDate: '2026-10-15', repName: 'Rahul Varma' },
    { dealId: 'deal_04', accountName: 'OmniVanguard Logistics GmbH', dealValueUsd: 45000, stage: 'DEMO_SCHEDULED', stageProbabilityPercent: 30, estimatedCloseDate: '2026-10-31', repName: 'David Chen' },
    { dealId: 'deal_05', accountName: 'Vertex Precision Biotech', dealValueUsd: 90000, stage: 'QUALIFICATION', stageProbabilityPercent: 20, estimatedCloseDate: '2026-11-15', repName: 'Emily Thorne' },
  ];

  calculateMonteCarloForecast(iterations: number = 1000): MonteCarloForecastResult {
    this.logger.debug(`Running ${iterations} Monte Carlo pipeline simulations`);

    const totalPipeline = this.deals.reduce((sum, d) => sum + d.dealValueUsd, 0);
    const weightedPipeline = this.deals.reduce((sum, d) => sum + (d.dealValueUsd * d.stageProbabilityPercent) / 100, 0);

    const simulationOutcomes: number[] = [];

    for (let i = 0; i < iterations; i++) {
      let runTotal = 0;
      for (const d of this.deals) {
        const rand = Math.random() * 100;
        if (rand <= d.stageProbabilityPercent) {
          runTotal += d.dealValueUsd;
        }
      }
      simulationOutcomes.push(runTotal);
    }

    simulationOutcomes.sort((a, b) => a - b);

    const p10 = simulationOutcomes[Math.floor(iterations * 0.1)];
    const p50 = simulationOutcomes[Math.floor(iterations * 0.5)];
    const p90 = simulationOutcomes[Math.floor(iterations * 0.9)];

    return {
      fiscalQuarter: 'FY2026-Q3/Q4',
      totalPipelineValueUsd: totalPipeline,
      weightedPipelineValueUsd: Math.round(weightedPipeline),
      p10ConservativeProjectionUsd: p10,
      p50ExpectedProjectionUsd: p50,
      p90OptimisticProjectionUsd: p90,
      dealsCount: this.deals.length,
    };
  }

  listDeals(): DealPipelineItem[] {
    return [...this.deals];
  }
}

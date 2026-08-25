import { Injectable, Logger } from '@nestjs/common';

export interface StageDurationRecord {
  stageName: string;
  averageDaysInStage: number;
  benchmarkDays: number;
  isBottleneck: boolean;
  activeDealCount: number;
  totalStageValue: number;
}

export interface PipelineVelocitySummary {
  pipelineId: string;
  overallAverageSalesCycleDays: number;
  stages: StageDurationRecord[];
  bottleneckWarning: string | null;
}

@Injectable()
export class DealStageVelocityService {
  private readonly logger = new Logger(DealStageVelocityService.name);

  calculatePipelineVelocity(pipelineId: string = 'pipe_default'): PipelineVelocitySummary {
    this.logger.debug(`Calculating pipeline stage velocity and bottleneck metrics for ${pipelineId}`);

    const stages: StageDurationRecord[] = [
      { stageName: 'Discovery', averageDaysInStage: 4.2, benchmarkDays: 5.0, isBottleneck: false, activeDealCount: 120, totalStageValue: 2540000 },
      { stageName: 'Contacted', averageDaysInStage: 6.8, benchmarkDays: 7.0, isBottleneck: false, activeDealCount: 95, totalStageValue: 1875000 },
      { stageName: 'Qualified', averageDaysInStage: 8.5, benchmarkDays: 8.0, isBottleneck: false, activeDealCount: 63, totalStageValue: 1230000 },
      { stageName: 'Proposal', averageDaysInStage: 16.4, benchmarkDays: 10.0, isBottleneck: true, activeDealCount: 32, totalStageValue: 890000 },
      { stageName: 'Negotiation', averageDaysInStage: 9.1, benchmarkDays: 10.0, isBottleneck: false, activeDealCount: 18, totalStageValue: 450000 },
    ];

    const overallAvg = stages.reduce((sum, s) => sum + s.averageDaysInStage, 0);
    const bottleneck = stages.find((s) => s.isBottleneck);

    return {
      pipelineId,
      overallAverageSalesCycleDays: parseFloat(overallAvg.toFixed(1)),
      stages,
      bottleneckWarning: bottleneck ? `Stage '${bottleneck.stageName}' exceeds benchmark by ${(bottleneck.averageDaysInStage - bottleneck.benchmarkDays).toFixed(1)} days.` : null,
    };
  }
}

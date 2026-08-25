import { Injectable, Logger } from '@nestjs/common';

export interface RepSplitEntry {
  agentId: string;
  splitPercentage: number;
  role: 'PRIMARY_CLOSER' | 'OVERLAY_ENGINEER' | 'CSM_INTRO';
}

export interface SplitCalculationResult {
  dealAmount: number;
  totalPercent: number;
  isValid: boolean;
  allocations: Array<{
    agentId: string;
    allocatedAmount: number;
    splitPercentage: number;
    role: string;
  }>;
  errorMessage?: string;
}

@Injectable()
export class OpportunitySplitService {
  private readonly logger = new Logger(OpportunitySplitService.name);

  calculateSplits(dealAmount: number, splits: RepSplitEntry[]): SplitCalculationResult {
    this.logger.debug(`Calculating opportunity revenue splits for deal amount $${dealAmount}`);

    const totalPercent = splits.reduce((sum, s) => sum + s.splitPercentage, 0);

    if (Math.abs(totalPercent - 100) > 0.01) {
      return {
        dealAmount,
        totalPercent,
        isValid: false,
        allocations: [],
        errorMessage: `Total split percentage must equal 100% (currently ${totalPercent}%)`,
      };
    }

    const allocations = splits.map((s) => ({
      agentId: s.agentId,
      allocatedAmount: parseFloat(((dealAmount * s.splitPercentage) / 100).toFixed(2)),
      splitPercentage: s.splitPercentage,
      role: s.role,
    }));

    return {
      dealAmount,
      totalPercent: 100,
      isValid: true,
      allocations,
    };
  }
}

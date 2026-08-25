import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface AbTestVariant {
  id: string;
  name: string;
  content: string;
  weight: number;
}

export interface AbTestCampaign {
  id: string;
  name: string;
  variants: AbTestVariant[];
  winnerVariantId?: string;
  status: 'RUNNING' | 'COMPLETED' | 'DRAFT';
}

export interface AbTestResult {
  variantId: string;
  variantName: string;
  sentCount: number;
  openCount: number;
  clickCount: number;
  openRate: number;
  clickRate: number;
  isWinner: boolean;
}

@Injectable()
export class AbTestingService {
  private readonly logger = new Logger(AbTestingService.name);

  selectVariant(variants: AbTestVariant[]): AbTestVariant {
    const totalWeight = variants.reduce((acc, v) => acc + v.weight, 0);
    let random = Math.random() * totalWeight;

    for (const variant of variants) {
      random -= variant.weight;
      if (random <= 0) return variant;
    }

    return variants[variants.length - 1];
  }

  analyzeTestResults(results: Array<{ variantId: string; variantName: string; sentCount: number; openCount: number; clickCount: number }>): AbTestResult[] {
    const processed = results.map((r) => ({
      ...r,
      openRate: r.sentCount > 0 ? parseFloat(((r.openCount / r.sentCount) * 100).toFixed(2)) : 0,
      clickRate: r.sentCount > 0 ? parseFloat(((r.clickCount / r.sentCount) * 100).toFixed(2)) : 0,
      isWinner: false,
    }));

    const maxClickRate = Math.max(...processed.map((r) => r.clickRate));
    processed.forEach((r) => { if (r.clickRate === maxClickRate) r.isWinner = true; });

    return processed;
  }

  determineWinner(results: AbTestResult[]): AbTestResult | null {
    const winner = results.reduce((prev, curr) => (curr.clickRate > prev.clickRate ? curr : prev), results[0]);
    return winner || null;
  }

  async createAbTestRecord(
    organizationId: string,
    name: string,
    variantASubject: string,
    variantBSubject: string,
  ): Promise<{ testId: string }> {
    this.logger.log(`Creating A/B test '${name}' for org ${organizationId}`);

    const broadcast = await prisma.broadcastCampaign.create({
      data: {
        organizationId,
        name: `[A/B TEST] ${name}`,
        content: JSON.stringify({ variantA: variantASubject, variantB: variantBSubject }),
        status: 'DRAFT',
      },
    });

    return { testId: broadcast.id };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface UsageMeteringSummary {
  organizationId: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  totalSeats: number;
  seatCost: number;
  totalCost: number;
}

@Injectable()
export class UsageMeteringService {
  private readonly logger = new Logger(UsageMeteringService.name);

  async computeCurrentPeriodUsage(organizationId: string): Promise<UsageMeteringSummary> {
    this.logger.log(`Computing billing period usage for org ${organizationId}`);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const members = await prisma.organizationMember.count({ where: { organizationId } });
    const seatCost = parseFloat((members * 29.0).toFixed(2));
    const totalCost = seatCost;

    return {
      organizationId,
      billingPeriodStart: startOfMonth.toISOString(),
      billingPeriodEnd: now.toISOString(),
      totalSeats: members,
      seatCost,
      totalCost,
    };
  }
}

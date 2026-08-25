import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface DealRotationRule {
  pipelineId: string;
  strategy: 'ROUND_ROBIN' | 'LEAST_DEALS' | 'WEIGHTED_SCORE';
  agentPool: string[];
}

export interface DealAssignmentResult {
  dealId: string;
  assignedToUserId: string;
  assignedToName: string;
  strategy: string;
}

@Injectable()
export class DealRotationService {
  private readonly logger = new Logger(DealRotationService.name);
  private readonly roundRobinCounters = new Map<string, number>();

  async assignDeal(dealId: string, organizationId: string, pipelineId: string): Promise<DealAssignmentResult> {
    this.logger.log(`Auto-assigning deal ${dealId} for pipeline ${pipelineId}`);

    const agents = await prisma.organizationMember.findMany({
      where: { organizationId, role: { not: 'OWNER' } },
      include: { user: { select: { id: true, name: true } } },
    });

    if (agents.length === 0) throw new Error(`No agents available in org ${organizationId} for deal rotation`);

    const dealCounts = await Promise.all(
      agents.map(async (agent) => ({
        userId: agent.user.id,
        name: agent.user.name ?? 'Unknown',
        count: await prisma.deal.count({ where: { assignedToId: agent.user.id, closedAt: null } }),
      }))
    );

    const leastLoaded = dealCounts.reduce((prev, curr) => (curr.count < prev.count ? curr : prev), dealCounts[0]);

    await prisma.deal.update({ where: { id: dealId }, data: { assignedToId: leastLoaded.userId } });

    this.logger.log(`Deal ${dealId} assigned to ${leastLoaded.name} (${leastLoaded.count} active deals)`);

    return { dealId, assignedToUserId: leastLoaded.userId, assignedToName: leastLoaded.name, strategy: 'LEAST_DEALS' };
  }

  async rotateRoundRobin(organizationId: string, pipelineId: string, dealId: string): Promise<DealAssignmentResult> {
    const agents = await prisma.organizationMember.findMany({
      where: { organizationId },
      include: { user: { select: { id: true, name: true } } },
    });

    const key = `${organizationId}:${pipelineId}`;
    const current = this.roundRobinCounters.get(key) ?? 0;
    const selected = agents[current % agents.length];
    this.roundRobinCounters.set(key, current + 1);

    await prisma.deal.update({ where: { id: dealId }, data: { assignedToId: selected.user.id } });

    this.logger.log(`Round-robin assigned deal ${dealId} to ${selected.user.name}`);

    return { dealId, assignedToUserId: selected.user.id, assignedToName: selected.user.name ?? 'Unknown', strategy: 'ROUND_ROBIN' };
  }
}

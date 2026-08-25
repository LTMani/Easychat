import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface AgentPerformanceSummary {
  agentId: string;
  agentName: string;
  assignedTickets: number;
  resolvedTickets: number;
  csatAverage: number;
}

@Injectable()
export class AgentPerformanceService {
  private readonly logger = new Logger(AgentPerformanceService.name);

  async getTeamPerformance(organizationId: string, from: Date, to: Date): Promise<AgentPerformanceSummary[]> {
    this.logger.log(`Fetching team agent performance metrics for org ${organizationId}`);

    const members = await prisma.organizationMember.findMany({
      where: { organizationId },
      include: { user: true },
    });

    const summaries: AgentPerformanceSummary[] = await Promise.all(
      members.map(async (member) => {
        const assigned = await prisma.ticket.count({
          where: { organizationId, assignedToId: member.userId, createdAt: { gte: from, lte: to } },
        });
        const resolved = await prisma.ticket.count({
          where: { organizationId, assignedToId: member.userId, status: 'RESOLVED', createdAt: { gte: from, lte: to } },
        });
        const csatResponses = await prisma.csatResponse.findMany({
          where: { agentId: member.userId, createdAt: { gte: from, lte: to } },
        });
        const avgCsat = csatResponses.length > 0
          ? parseFloat((csatResponses.reduce((acc, c) => acc + c.rating, 0) / csatResponses.length).toFixed(2))
          : 0;

        return {
          agentId: member.userId,
          agentName: `${member.user.firstName} ${member.user.lastName}`,
          assignedTickets: assigned,
          resolvedTickets: resolved,
          csatAverage: avgCsat,
        };
      })
    );

    return summaries;
  }
}

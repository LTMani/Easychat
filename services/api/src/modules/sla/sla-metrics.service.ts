import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SlaMetricsReport {
  organizationId: string;
  totalTickets: number;
  breachedTickets: number;
  complianceRate: number;
  byPriority: Array<{ priority: string; total: number; breached: number }>;
}

@Injectable()
export class SlaMetricsService {
  private readonly logger = new Logger(SlaMetricsService.name);

  async computeOrganizationMetrics(organizationId: string, from: Date, to: Date): Promise<SlaMetricsReport> {
    this.logger.log(`Computing SLA metrics for org ${organizationId}`);

    const tickets = await prisma.ticket.findMany({
      where: { organizationId, createdAt: { gte: from, lte: to } },
    });

    const breaches = await prisma.slaBreachLog.findMany({
      where: { ticket: { organizationId }, breachedAt: { gte: from, lte: to } },
    });

    const breachedTicketIds = new Set(breaches.map((b) => b.ticketId));
    const breachedCount = tickets.filter((t) => breachedTicketIds.has(t.id)).length;
    const complianceRate = tickets.length > 0
      ? parseFloat((((tickets.length - breachedCount) / tickets.length) * 100).toFixed(2))
      : 100;

    const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    const byPriority = priorities.map((priority) => {
      const priorityTickets = tickets.filter((t) => t.priority === priority);
      const priorityBreached = priorityTickets.filter((t) => breachedTicketIds.has(t.id)).length;
      return { priority, total: priorityTickets.length, breached: priorityBreached };
    });

    return { organizationId, totalTickets: tickets.length, breachedTickets: breachedCount, complianceRate, byPriority };
  }
}

import { Injectable } from '@nestjs/common';
import { prisma, DealStatus, TicketStatus } from '@easychat/database';
import { ApiResponse, AnalyticsSummaryPayload } from '@easychat/shared';

@Injectable()
export class AnalyticsService {
  async getSummary(orgId: string): Promise<ApiResponse<AnalyticsSummaryPayload>> {
    const totalLeads = await prisma.lead.count({ where: { organizationId: orgId } });
    const totalContacts = await prisma.contact.count({ where: { organizationId: orgId } });

    const deals = await prisma.deal.findMany({ where: { organizationId: orgId } });
    const totalPipelineRevenue = deals.reduce((acc, d) => acc + d.amount, 0);
    const openDealsCount = deals.filter((d) => d.status === DealStatus.OPEN).length;
    const wonDealsCount = deals.filter((d) => d.status === DealStatus.WON).length;
    const winRatePercentage = deals.length > 0 ? Math.round((wonDealsCount / deals.length) * 100) : 0;

    const tickets = await prisma.ticket.findMany({ where: { organizationId: orgId } });
    const openTicketsCount = tickets.filter((t) => t.status === TicketStatus.OPEN).length;
    const now = new Date();
    const slaBreachedTicketsCount = tickets.filter(
      (t) => t.status !== TicketStatus.RESOLVED && t.firstResponseDueAt && t.firstResponseDueAt < now,
    ).length;

    return {
      success: true,
      data: {
        totalLeads,
        totalContacts,
        totalPipelineRevenue,
        openDealsCount,
        wonDealsCount,
        winRatePercentage,
        openTicketsCount,
        slaBreachedTicketsCount,
        avgResponseTimeMinutes: 18,
      },
    };
  }
}

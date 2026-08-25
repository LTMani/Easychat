import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface TicketEscalationRule {
  triggerAfterMinutes: number;
  escalateTo: 'MANAGER' | 'SENIOR_AGENT' | 'ENGINEERING';
  condition: 'UNANSWERED' | 'SLA_BREACH' | 'CUSTOMER_ESCALATION';
}

export interface EscalationEvent {
  ticketId: string;
  fromUserId: string;
  toUserId: string;
  reason: string;
  escalatedAt: string;
}

@Injectable()
export class TicketEscalationService {
  private readonly logger = new Logger(TicketEscalationService.name);

  async escalateUnansweredTickets(organizationId: string, thresholdMinutes: number = 60): Promise<EscalationEvent[]> {
    this.logger.log(`Checking unanswered tickets older than ${thresholdMinutes}m for org ${organizationId}`);

    const cutoff = new Date(Date.now() - thresholdMinutes * 60 * 1000);

    const staleTickets = await prisma.ticket.findMany({
      where: {
        organizationId,
        status: { in: ['OPEN', 'IN_PROGRESS'] },
        updatedAt: { lt: cutoff },
      },
      include: { assignedTo: { select: { id: true, name: true } } },
      take: 50,
    });

    const escalations: EscalationEvent[] = [];

    for (const ticket of staleTickets) {
      const manager = await prisma.organizationMember.findFirst({
        where: { organizationId, role: 'OWNER' },
        include: { user: { select: { id: true } } },
      });

      if (!manager) continue;

      await prisma.ticket.update({
        where: { id: ticket.id },
        data: { priority: 'URGENT', assignedToId: manager.user.id },
      });

      escalations.push({
        ticketId: ticket.id,
        fromUserId: ticket.assignedToId ?? 'unassigned',
        toUserId: manager.user.id,
        reason: `Ticket unanswered for more than ${thresholdMinutes} minutes`,
        escalatedAt: new Date().toISOString(),
      });

      this.logger.warn(`Ticket ${ticket.id} escalated to manager ${manager.user.id}`);
    }

    return escalations;
  }

  async markTicketAsCustomerEscalated(ticketId: string, requestedById: string): Promise<void> {
    this.logger.log(`Customer escalation requested on ticket ${ticketId} by ${requestedById}`);

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { priority: 'URGENT', status: 'IN_PROGRESS' },
    });
  }

  async getEscalationCandidates(organizationId: string): Promise<Array<{ id: string; subject: string; priority: string; minutesSinceUpdate: number }>> {
    const thresholdMinutes = 30;
    const cutoff = new Date(Date.now() - thresholdMinutes * 60 * 1000);

    const tickets = await prisma.ticket.findMany({
      where: { organizationId, status: { in: ['OPEN'] }, updatedAt: { lt: cutoff } },
      select: { id: true, subject: true, priority: true, updatedAt: true },
    });

    return tickets.map((t) => ({
      id: t.id,
      subject: t.subject,
      priority: t.priority,
      minutesSinceUpdate: Math.floor((Date.now() - new Date(t.updatedAt).getTime()) / 60000),
    }));
  }
}

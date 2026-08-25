import { prisma } from '@easychat/database';

export interface SlaJobData {
  ticketId: string;
  organizationId: string;
  slaPolicyId?: string;
  breachCheckType: 'FIRST_RESPONSE' | 'RESOLUTION';
  targetMinutes: number;
}

export class SlaTimerProcessor {
  async processJob(data: SlaJobData): Promise<boolean> {
    console.log(`[SLA Worker] Evaluating SLA compliance for Ticket: ${data.ticketId} (Type: ${data.breachCheckType})`);

    const ticket = await prisma.ticket.findUnique({
      where: { id: data.ticketId },
      include: {
        slaPolicy: true,
      },
    });

    if (!ticket) {
      console.warn(`[SLA Worker] Ticket ${data.ticketId} not found, skipping evaluation.`);
      return false;
    }

    if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') {
      console.log(`[SLA Worker] Ticket ${data.ticketId} is already resolved/closed (${ticket.status}), no breach.`);
      return true;
    }

    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - ticket.createdAt.getTime()) / (1000 * 60));
    const isBreached = elapsedMinutes > data.targetMinutes;

    if (isBreached) {
      console.error(`[SLA Worker] ⚠️ BREACH DETECTED: Ticket ${data.ticketId} breached ${data.breachCheckType} target (${elapsedMinutes}m > ${data.targetMinutes}m)`);

      if (ticket.slaPolicyId) {
        await prisma.slaBreachLog.create({
          data: {
            slaPolicyId: ticket.slaPolicyId,
            ticketId: ticket.id,
            breachType: data.breachCheckType,
            targetMinutes: data.targetMinutes,
            actualMinutes: elapsedMinutes,
            breachedAt: now,
          },
        });
      }

      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: 'SLA_BREACHED',
          entityType: 'TICKET',
          entityId: ticket.id,
          metadata: JSON.stringify({
            breachType: data.breachCheckType,
            targetMinutes: data.targetMinutes,
            actualMinutes: elapsedMinutes,
            assignedToId: ticket.assignedToId,
          }),
        },
      });
    }

    return true;
  }

  async processSlaChecks(): Promise<number> {
    const openTickets = await prisma.ticket.findMany({
      where: {
        status: { in: ['OPEN', 'IN_PROGRESS', 'WAITING'] },
        slaPolicyId: { not: null },
      },
      include: { slaPolicy: true },
      take: 50,
    });

    let breachCount = 0;
    const now = new Date();

    for (const ticket of openTickets) {
      if (!ticket.slaPolicy) continue;
      const targetMin = ticket.slaPolicy.firstResponseMinutes || 60;
      const elapsed = Math.floor((now.getTime() - ticket.createdAt.getTime()) / (1000 * 60));

      if (elapsed > targetMin) {
        breachCount++;
        await this.processJob({
          ticketId: ticket.id,
          organizationId: ticket.organizationId,
          slaPolicyId: ticket.slaPolicyId || undefined,
          breachCheckType: 'FIRST_RESPONSE',
          targetMinutes: targetMin,
        });
      }
    }

    return breachCount;
  }
}

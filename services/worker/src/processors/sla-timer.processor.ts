import { prisma } from '@easychat/database';

export class SlaTimerProcessor {
  async processSlaChecks(): Promise<number> {
    console.log('[Worker] Running Scheduled SLA Breach Scan...');
    const now = new Date();

    const tickets = await prisma.ticket.findMany({
      where: {
        status: { in: ['OPEN', 'IN_PROGRESS'] },
      },
      include: { slaPolicy: true },
    });

    let breachLoggedCount = 0;

    for (const ticket of tickets) {
      if (ticket.firstResponseDueAt && !ticket.firstRespondedAt && now > ticket.firstResponseDueAt) {
        const existing = await prisma.slaBreachLog.findFirst({
          where: { ticketId: ticket.id, breachType: 'FIRST_RESPONSE' },
        });

        if (!existing && ticket.slaPolicyId) {
          await prisma.slaBreachLog.create({
            data: {
              slaPolicyId: ticket.slaPolicyId,
              ticketId: ticket.id,
              breachType: 'FIRST_RESPONSE',
              targetMinutes: ticket.slaPolicy?.firstResponseMinutes || 60,
              actualMinutes: Math.floor((now.getTime() - ticket.createdAt.getTime()) / (1000 * 60)),
            },
          });

          // Create notification for assigned agent
          if (ticket.assignedToId) {
            await prisma.notification.create({
              data: {
                organizationId: ticket.organizationId,
                userId: ticket.assignedToId,
                type: 'SLA_BREACH',
                title: `SLA Breach Alert: Ticket #${ticket.ticketNumber}`,
                body: `Ticket "${ticket.subject}" has breached first response SLA target.`,
                link: `/tickets/${ticket.id}`,
              },
            });
          }

          breachLoggedCount++;
        }
      }
    }

    return breachLoggedCount;
  }
}

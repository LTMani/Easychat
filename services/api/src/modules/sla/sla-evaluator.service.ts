import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SlaCalculationResult {
  firstResponseDueAt: Date;
  resolutionDueAt: Date;
  isBreachedFirstResponse: boolean;
  isBreachedResolution: boolean;
}

@Injectable()
export class SlaEvaluatorService {
  private readonly logger = new Logger(SlaEvaluatorService.name);

  /**
   * Calculates SLA target timestamps for a ticket based on priority policy
   */
  async calculateTicketSla(
    organizationId: string,
    priority: string,
    createdAt: Date = new Date()
  ): Promise<SlaCalculationResult> {
    const policy = await prisma.slaPolicy.findFirst({
      where: {
        organizationId,
        priority,
      },
    });

    // Default fallback SLA times: 60 mins first response, 480 mins resolution
    const firstResponseMins = policy ? policy.firstResponseMinutes : 60;
    const resolutionMins = policy ? policy.resolutionMinutes : 480;

    const firstResponseDueAt = new Date(createdAt.getTime() + firstResponseMins * 60 * 1000);
    const resolutionDueAt = new Date(createdAt.getTime() + resolutionMins * 60 * 1000);

    const now = new Date();

    return {
      firstResponseDueAt,
      resolutionDueAt,
      isBreachedFirstResponse: now > firstResponseDueAt,
      isBreachedResolution: now > resolutionDueAt,
    };
  }

  /**
   * Evaluate SLA breaches across open tickets
   */
  async evaluateAllOpenBreaches(organizationId: string): Promise<number> {
    const now = new Date();
    const openTickets = await prisma.ticket.findMany({
      where: {
        organizationId,
        status: { in: ['OPEN', 'IN_PROGRESS'] },
      },
      include: {
        slaPolicy: true,
      },
    });

    let breachCount = 0;

    for (const ticket of openTickets) {
      if (
        ticket.firstResponseDueAt &&
        !ticket.firstRespondedAt &&
        now > ticket.firstResponseDueAt
      ) {
        // Log first response breach
        const existingBreach = await prisma.slaBreachLog.findFirst({
          where: {
            ticketId: ticket.id,
            breachType: 'FIRST_RESPONSE',
          },
        });

        if (!existingBreach && ticket.slaPolicyId) {
          await prisma.slaBreachLog.create({
            data: {
              slaPolicyId: ticket.slaPolicyId,
              ticketId: ticket.id,
              breachType: 'FIRST_RESPONSE',
              targetMinutes: ticket.slaPolicy?.firstResponseMinutes || 60,
              actualMinutes: Math.floor(
                (now.getTime() - ticket.createdAt.getTime()) / (1000 * 60)
              ),
            },
          });
          breachCount++;
          this.logger.warn(`SLA First Response Breach logged for ticket #${ticket.ticketNumber}`);
        }
      }

      if (ticket.resolutionDueAt && !ticket.resolvedAt && now > ticket.resolutionDueAt) {
        const existingBreach = await prisma.slaBreachLog.findFirst({
          where: {
            ticketId: ticket.id,
            breachType: 'RESOLUTION',
          },
        });

        if (!existingBreach && ticket.slaPolicyId) {
          await prisma.slaBreachLog.create({
            data: {
              slaPolicyId: ticket.slaPolicyId,
              ticketId: ticket.id,
              breachType: 'RESOLUTION',
              targetMinutes: ticket.slaPolicy?.resolutionMinutes || 480,
              actualMinutes: Math.floor(
                (now.getTime() - ticket.createdAt.getTime()) / (1000 * 60)
              ),
            },
          });
          breachCount++;
          this.logger.warn(`SLA Resolution Breach logged for ticket #${ticket.ticketNumber}`);
        }
      }
    }

    return breachCount;
  }
}

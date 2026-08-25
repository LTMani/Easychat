import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface TimelineEventItem {
  id: string;
  eventType: 'NOTE' | 'ACTIVITY' | 'TASK' | 'TICKET' | 'DEAL' | 'VOICE_CALL';
  timestamp: Date;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class CustomerTimelineService {
  private readonly logger = new Logger(CustomerTimelineService.name);

  async getCustomerTimeline(organizationId: string, contactId: string): Promise<TimelineEventItem[]> {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ${contactId} not found`);
    }

    this.logger.log(`Aggregating Customer 360 Timeline for ${contact.email}`);

    const notes = await prisma.customerNote.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });

    const activities = await prisma.activity.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });

    const tickets = await prisma.ticket.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });

    const events: TimelineEventItem[] = [
      ...notes.map((n) => ({
        id: n.id,
        eventType: 'NOTE' as const,
        timestamp: n.createdAt,
        title: 'Customer Note Added',
        description: n.content,
      })),
      ...activities.map((a) => ({
        id: a.id,
        eventType: 'ACTIVITY' as const,
        timestamp: a.createdAt,
        title: `Activity: ${a.type}`,
        description: a.notes || undefined,
      })),
      ...tickets.map((t) => ({
        id: t.id,
        eventType: 'TICKET' as const,
        timestamp: t.createdAt,
        title: `Support Ticket ${t.ticketNumber}: ${t.subject}`,
        description: t.description,
      })),
    ];

    events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return events;
  }
}

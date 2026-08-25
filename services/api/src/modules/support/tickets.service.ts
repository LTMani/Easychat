import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, TicketPriority as DBTicketPriority, TicketStatus as DBTicketStatus } from '@easychat/database';
import { CreateTicketDto, UpdateTicketStatusDto, AddTicketCommentDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class TicketsService {
  async getTickets(orgId: string): Promise<ApiResponse> {
    const tickets = await prisma.ticket.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        contact: true,
        assignedTo: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
        comments: {
          include: {
            user: { select: { id: true, email: true, firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    const now = new Date();
    const enrichedTickets = tickets.map((t) => ({
      ...t,
      isSlaBreached: t.status !== DBTicketStatus.RESOLVED && t.status !== DBTicketStatus.CLOSED && t.firstResponseDueAt && t.firstResponseDueAt < now,
    }));

    return {
      success: true,
      data: enrichedTickets,
    };
  }

  async createTicket(orgId: string, userId: string, dto: CreateTicketDto): Promise<ApiResponse> {
    const now = new Date();
    let firstResponseHours = 24;
    let resolutionHours = 72;

    if (dto.priority === 'URGENT') {
      firstResponseHours = 0.25; // 15 mins
      resolutionHours = 4;
    } else if (dto.priority === 'HIGH') {
      firstResponseHours = 2;
      resolutionHours = 12;
    } else if (dto.priority === 'MEDIUM') {
      firstResponseHours = 8;
      resolutionHours = 24;
    }

    const firstResponseDueAt = new Date(now.getTime() + firstResponseHours * 60 * 60 * 1000);
    const resolutionDueAt = new Date(now.getTime() + resolutionHours * 60 * 60 * 1000);
    const ticketNumber = `TICK-${Math.floor(100000 + Math.random() * 900000)}`;

    const ticket = await prisma.ticket.create({
      data: {
        organizationId: orgId,
        ticketNumber,
        subject: dto.subject,
        description: dto.description,
        priority: (dto.priority || 'MEDIUM') as unknown as DBTicketPriority,
        contactId: dto.contactId,
        conversationId: dto.conversationId,
        assignedToId: dto.assignedToId || userId,
        firstResponseDueAt,
        resolutionDueAt,
      },
      include: {
        contact: true,
        assignedTo: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        userId,
        action: 'TICKET_CREATED',
        entityType: 'Ticket',
        entityId: ticket.id,
      },
    });

    return {
      success: true,
      message: 'Support ticket created successfully',
      data: ticket,
    };
  }

  async updateTicketStatus(orgId: string, ticketId: string, dto: UpdateTicketStatusDto): Promise<ApiResponse> {
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId, organizationId: orgId },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: dto.status as unknown as DBTicketStatus,
        resolvedAt: dto.status === 'RESOLVED' ? new Date() : null,
      },
    });

    return {
      success: true,
      message: 'Ticket status updated',
      data: updated,
    };
  }

  async addComment(orgId: string, userId: string, dto: AddTicketCommentDto): Promise<ApiResponse> {
    const ticket = await prisma.ticket.findFirst({
      where: { id: dto.ticketId, organizationId: orgId },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const comment = await prisma.ticketComment.create({
      data: {
        ticketId: dto.ticketId,
        userId,
        content: dto.content,
        isInternal: dto.isInternal || false,
      },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return {
      success: true,
      message: 'Comment added to ticket',
      data: comment,
    };
  }
}

import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { TicketEscalationService } from '../tickets/ticket-escalation.service';
import { SlaPolicyEngineService } from '../sla/sla-policy-engine.service';

@Controller('v1/tickets')
export class TicketsSupportController {
  constructor(
    private readonly escalationService: TicketEscalationService,
    private readonly slaEngine: SlaPolicyEngineService,
  ) {}

  @Get()
  async listTickets(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('assignedToId') assignedToId?: string,
  ) {
    return {
      status: 'success',
      data: [],
      meta: { status, priority, assignedToId },
    };
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string) {
    return {
      status: 'success',
      data: {
        id,
        ticketNumber: 'TKT-2026-1001',
        subject: 'Okta SAML assertion signature validation failure',
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        category: 'SECURITY',
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Post()
  async createTicket(
    @Body()
    body: {
      subject: string;
      description: string;
      priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
      category?: string;
      contactId?: string;
    },
  ) {
    if (!body.subject || !body.description) {
      throw new BadRequestException('subject and description are required');
    }

    const priority = body.priority || 'MEDIUM';
    const targetMin = priority === 'URGENT' ? 15 : priority === 'HIGH' ? 60 : 240;
    const deadlines = this.slaEngine.calculateDeadlines(new Date(), targetMin, targetMin * 8);

    return {
      status: 'success',
      data: {
        id: `tkt_${Date.now()}`,
        ticketNumber: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        ...body,
        priority,
        status: 'OPEN',
        firstResponseDueAt: deadlines.firstResponseDeadline.toISOString(),
        resolutionDueAt: deadlines.resolutionDeadline.toISOString(),
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Patch(':id/escalate')
  async escalateTicket(
    @Param('id') id: string,
    @Body() body: { reason: string; managerId?: string },
  ) {
    const action = this.escalationService.determineEscalationAction(
      'URGENT',
      120, // 120 minutes elapsed
      15, // 15m target
    );

    return {
      status: 'success',
      data: {
        ticketId: id,
        escalationTier: action.escalationTier,
        reassignedRole: action.reassignedRole,
        alertSent: action.sendManagerAlert,
        reason: body.reason,
      },
    };
  }

  @Patch(':id/status')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() body: { status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED' },
  ) {
    return {
      status: 'success',
      data: {
        id,
        status: body.status,
        updatedAt: new Date().toISOString(),
      },
    };
  }
}

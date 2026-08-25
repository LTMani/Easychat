import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateTicketDto, UpdateTicketStatusDto, AddTicketCommentDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Support — Tickets & SLA Engine')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('support/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @RequirePermissions(Permission.TICKET_READ)
  @ApiOperation({ summary: 'Get list of support tickets with SLA indicators' })
  async getTickets(@CurrentUser() user: UserSessionPayload) {
    return this.ticketsService.getTickets(user.organizationId);
  }

  @Post()
  @RequirePermissions(Permission.TICKET_CREATE)
  @ApiOperation({ summary: 'Create new support ticket' })
  async createTicket(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateTicketDto) {
    return this.ticketsService.createTicket(user.organizationId, user.userId, dto);
  }

  @Patch(':id/status')
  @RequirePermissions(Permission.TICKET_UPDATE)
  @ApiOperation({ summary: 'Update ticket status' })
  async updateTicketStatus(
    @CurrentUser() user: UserSessionPayload,
    @Param('id') ticketId: string,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateTicketStatus(user.organizationId, ticketId, dto);
  }

  @Post('comments')
  @RequirePermissions(Permission.TICKET_UPDATE)
  @ApiOperation({ summary: 'Add internal note or customer response to ticket' })
  async addComment(@CurrentUser() user: UserSessionPayload, @Body() dto: AddTicketCommentDto) {
    return this.ticketsService.addComment(user.organizationId, user.userId, dto);
  }
}

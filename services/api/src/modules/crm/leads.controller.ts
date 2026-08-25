import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateLeadDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('CRM — Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('crm/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @RequirePermissions(Permission.DEAL_READ)
  @ApiOperation({ summary: 'Get list of leads' })
  async getLeads(@CurrentUser() user: UserSessionPayload) {
    return this.leadsService.getLeads(user.organizationId);
  }

  @Post()
  @RequirePermissions(Permission.DEAL_CREATE)
  @ApiOperation({ summary: 'Create new sales lead' })
  async createLead(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateLeadDto) {
    return this.leadsService.createLead(user.organizationId, dto);
  }

  @Patch(':id/convert')
  @RequirePermissions(Permission.DEAL_CREATE)
  @ApiOperation({ summary: 'Convert lead to Contact and Deal' })
  async convertLead(@CurrentUser() user: UserSessionPayload, @Param('id') leadId: string) {
    return this.leadsService.convertLead(user.organizationId, user.userId, leadId);
  }
}

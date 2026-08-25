import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Permission, CreateCustomFieldDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Enterprise & Hardening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get('audit-logs')
  @RequirePermissions(Permission.AUDIT_READ)
  @ApiOperation({ summary: 'Get enterprise security audit log history' })
  async getAuditLogs(@CurrentUser() user: UserSessionPayload) {
    return this.enterpriseService.getAuditLogs(user.organizationId);
  }

  @Get('custom-fields')
  @ApiOperation({ summary: 'Get custom field definitions' })
  async getCustomFields(@CurrentUser() user: UserSessionPayload) {
    return this.enterpriseService.getCustomFields(user.organizationId);
  }

  @Post('custom-fields')
  @RequirePermissions(Permission.ORG_UPDATE)
  @ApiOperation({ summary: 'Create custom field definition' })
  async createCustomField(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateCustomFieldDto) {
    return this.enterpriseService.createCustomField(user.organizationId, dto);
  }
}

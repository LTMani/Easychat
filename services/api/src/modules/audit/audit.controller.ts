import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { AuditService } from './audit.service';
import { GdprService } from './gdpr.service';

@Controller('v1/audit')
@UseGuards(JwtAuthGuard, RbacGuard)
export class AuditController {
  constructor(
    private readonly auditService: AuditService,
    private readonly gdprService: GdprService
  ) {}

  @Get('logs')
  @RequirePermissions(Permission.AUDIT_READ)
  async listAuditLogs(
    @User('organizationId') orgId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.auditService.listAuditLogs(
      orgId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20
    );
  }

  @Get('security')
  async listSecurityLogs(@User('id') userId: string) {
    return this.auditService.listSecurityLogs(userId);
  }

  @Get('gdpr/export/:contactId')
  @RequirePermissions(Permission.CUSTOMER_READ)
  async exportCustomerData(
    @User('organizationId') orgId: string,
    @Param('contactId') contactId: string
  ) {
    return this.gdprService.exportCustomerData(orgId, contactId);
  }

  @Post('gdpr/erase/:contactId')
  @RequirePermissions(Permission.CUSTOMER_DELETE)
  async eraseCustomerData(
    @User('organizationId') orgId: string,
    @Param('contactId') contactId: string
  ) {
    return this.gdprService.eraseCustomerData(orgId, contactId);
  }
}

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Permission } from '@easychat/shared';
import { EtlImporterService, EtlMappingConfig, EtlImportRow } from './etl-importer.service';

@Controller('v1/etl')
@UseGuards(JwtAuthGuard, RbacGuard)
export class EtlController {
  constructor(private readonly etlService: EtlImporterService) {}

  @Get('jobs')
  @RequirePermissions(Permission.CUSTOMER_READ)
  async getJobs(@User('organizationId') orgId: string) {
    return this.etlService.getJobs(orgId);
  }

  @Post('jobs')
  @RequirePermissions(Permission.CUSTOMER_CREATE)
  async createJob(
    @User('organizationId') orgId: string,
    @User('id') userId: string,
    @Body() body: { fileName: string; entityType: string; fieldMapping: EtlMappingConfig }
  ) {
    return this.etlService.createJob(
      orgId,
      userId,
      body.fileName,
      body.entityType,
      body.fieldMapping
    );
  }

  @Post('jobs/:id/process')
  @RequirePermissions(Permission.CUSTOMER_CREATE)
  async processJob(
    @Param('id') jobId: string,
    @Body() body: { rows: EtlImportRow[] }
  ) {
    return this.etlService.processRows(jobId, body.rows);
  }
}

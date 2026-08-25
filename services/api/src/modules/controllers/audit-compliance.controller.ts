import { Controller, Get, Post, Query, Param, Res, BadRequestException } from '@nestjs/common';
import { AuditComplianceService } from '../audit/audit-compliance.service';
import type { Response } from 'express';

@Controller('v1/audit-logs')
export class AuditComplianceController {
  constructor(private readonly service: AuditComplianceService) {}

  @Get()
  async getAuditLogs(
    @Query('orgId') orgId: string,
    @Query('entityType') entityType?: string,
    @Query('userId') userId?: string,
    @Query('limit') limit?: number,
  ) {
    if (!orgId) throw new BadRequestException('orgId is required');
    return this.service.getAuditTrail(orgId, { entityType, userId, limit });
  }

  @Get('export/csv')
  async exportCsv(@Query('orgId') orgId: string, @Res() res: Response) {
    if (!orgId) throw new BadRequestException('orgId is required');
    const csv = await this.service.exportAuditLogsAsCsv(orgId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="easychat-audit-trail.csv"');
    return res.send(csv);
  }
}

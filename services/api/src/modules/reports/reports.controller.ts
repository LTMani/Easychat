import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RbacGuard } from '../../common/guards/rbac.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UserSessionPayload } from '@easychat/shared';

@ApiTags('Custom Reporting & Pivot Builder')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RbacGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of custom report definitions' })
  async getReports(@CurrentUser() user: UserSessionPayload) {
    return this.reportsService.getReports(user.organizationId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new report definition' })
  async createReport(
    @CurrentUser() user: UserSessionPayload,
    @Body() body: { name: string; reportType: string; metrics: string[]; chartType: string },
  ) {
    return this.reportsService.createReport(user.organizationId, user.userId, body);
  }
}

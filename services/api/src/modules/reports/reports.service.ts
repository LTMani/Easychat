import { Injectable } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

@Injectable()
export class ReportsService {
  async getReports(orgId: string): Promise<ApiResponse> {
    const reports = await prisma.reportDefinition.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return { success: true, data: reports };
  }

  async createReport(
    orgId: string,
    userId: string,
    body: { name: string; reportType: string; metrics: string[]; chartType: string },
  ): Promise<ApiResponse> {
    const report = await prisma.reportDefinition.create({
      data: {
        organizationId: orgId,
        createdById: userId,
        name: body.name,
        reportType: body.reportType || 'REVENUE',
        metrics: JSON.stringify(body.metrics || []),
        chartType: body.chartType || 'BAR',
      },
    });

    return { success: true, message: 'Custom report generated', data: report };
  }
}

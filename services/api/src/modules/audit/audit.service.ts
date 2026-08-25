import { Injectable } from '@nestjs/common';
import { prisma, DatabaseQueryHelper } from '@easychat/database';

@Injectable()
export class AuditService {
  private queryHelper = new DatabaseQueryHelper(prisma);

  async listAuditLogs(
    organizationId: string,
    page: number = 1,
    limit: number = 20
  ) {
    return this.queryHelper.paginate(
      'auditLog',
      organizationId,
      { page, limit },
      {},
      { user: true }
    );
  }

  async recordAction(
    organizationId: string | null,
    userId: string | null,
    action: string,
    entityType: string,
    entityId: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ) {
    return this.queryHelper.recordAuditLog(
      organizationId,
      userId,
      action,
      entityType,
      entityId,
      metadata,
      ipAddress,
      userAgent
    );
  }

  async listSecurityLogs(userId: string) {
    return prisma.securityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

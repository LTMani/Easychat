import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface AuditLogEntry {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  previousStateHash?: string;
  currentStateHash?: string;
  createdAt: Date;
}

export interface TamperVerificationResult {
  isVerified: boolean;
  totalRecordsChecked: number;
  tamperedLogId?: string;
  details?: string;
}

@Injectable()
export class AuditComplianceService {
  private readonly logger = new Logger(AuditComplianceService.name);

  computeStateHash(data: unknown): string {
    const serialized = JSON.stringify(data, Object.keys(data as object || {}).sort());
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  async recordAuditEvent(entry: Omit<AuditLogEntry, 'id' | 'createdAt' | 'previousStateHash' | 'currentStateHash'>): Promise<AuditLogEntry> {
    this.logger.debug(`Recording audit action ${entry.action} on ${entry.entityType}:${entry.entityId} by user ${entry.userId}`);

    const metadataStr = entry.metadata ? JSON.stringify(entry.metadata) : '{}';
    const stateHash = this.computeStateHash({
      org: entry.organizationId,
      user: entry.userId,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      meta: entry.metadata,
      ip: entry.ipAddress,
    });

    const record = await prisma.auditLog.create({
      data: {
        organizationId: entry.organizationId,
        userId: entry.userId,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        metadata: metadataStr,
        ipAddress: entry.ipAddress || null,
        userAgent: entry.userAgent || null,
      },
    });

    return {
      id: record.id,
      organizationId: record.organizationId,
      userId: record.userId,
      action: record.action,
      entityType: record.entityType,
      entityId: record.entityId,
      metadata: entry.metadata,
      ipAddress: record.ipAddress || undefined,
      userAgent: record.userAgent || undefined,
      currentStateHash: stateHash,
      createdAt: record.createdAt,
    };
  }

  async getAuditTrail(organizationId: string, filter?: { entityType?: string; entityId?: string; userId?: string; from?: Date; to?: Date; limit?: number; offset?: number }) {
    this.logger.log(`Fetching audit trail for organization ${organizationId}`);

    const where: any = { organizationId };
    if (filter?.entityType) where.entityType = filter.entityType;
    if (filter?.entityId) where.entityId = filter.entityId;
    if (filter?.userId) where.userId = filter.userId;
    if (filter?.from || filter?.to) {
      where.createdAt = {};
      if (filter.from) where.createdAt.gte = filter.from;
      if (filter.to) where.createdAt.lte = filter.to;
    }

    const [total, logs] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filter?.limit || 50,
        skip: filter?.offset || 0,
      }),
    ]);

    return {
      total,
      data: logs.map((l) => ({
        ...l,
        metadata: l.metadata ? JSON.parse(l.metadata) : {},
      })),
    };
  }

  async exportAuditLogsAsCsv(organizationId: string, fromDate?: Date, toDate?: Date): Promise<string> {
    this.logger.log(`Exporting CSV audit logs for org ${organizationId}`);

    const logs = await prisma.auditLog.findMany({
      where: {
        organizationId,
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const headers = ['Timestamp', 'Log ID', 'User ID', 'Action', 'Entity Type', 'Entity ID', 'IP Address', 'Metadata'];
    const rows = logs.map((log) => [
      log.createdAt.toISOString(),
      log.id,
      log.userId,
      log.action,
      log.entityType,
      log.entityId,
      log.ipAddress || 'N/A',
      `"${(log.metadata || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}

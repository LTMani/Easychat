import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface DataRetentionPolicy {
  entityType: 'AUDIT_LOG' | 'CONVERSATION' | 'MESSAGE' | 'CONTACT_ACTIVITY';
  retentionDays: number;
  actionOnExpiry: 'DELETE' | 'ANONYMIZE' | 'ARCHIVE';
}

export interface RetentionRunResult {
  entityType: string;
  processedCount: number;
  action: string;
  cutoffDate: string;
}

@Injectable()
export class DataRetentionService {
  private readonly logger = new Logger(DataRetentionService.name);

  private defaultPolicies: DataRetentionPolicy[] = [
    { entityType: 'AUDIT_LOG', retentionDays: 365, actionOnExpiry: 'ARCHIVE' },
    { entityType: 'CONVERSATION', retentionDays: 730, actionOnExpiry: 'ANONYMIZE' },
    { entityType: 'MESSAGE', retentionDays: 730, actionOnExpiry: 'ANONYMIZE' },
    { entityType: 'CONTACT_ACTIVITY', retentionDays: 180, actionOnExpiry: 'DELETE' },
  ];

  async enforceRetentionPolicies(organizationId: string): Promise<RetentionRunResult[]> {
    this.logger.log(`Enforcing data retention policies for org ${organizationId}`);
    const results: RetentionRunResult[] = [];

    for (const policy of this.defaultPolicies) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - policy.retentionDays);
      let processedCount = 0;

      if (policy.entityType === 'AUDIT_LOG' && policy.actionOnExpiry === 'ARCHIVE') {
        processedCount = await prisma.auditLog.count({
          where: { organizationId, createdAt: { lt: cutoff } },
        });
      }

      if (policy.entityType === 'MESSAGE' && policy.actionOnExpiry === 'ANONYMIZE') {
        processedCount = await prisma.message.count({
          where: { conversation: { organizationId }, createdAt: { lt: cutoff } },
        });
      }

      if (policy.entityType === 'CONTACT_ACTIVITY' && policy.actionOnExpiry === 'DELETE') {
        processedCount = await prisma.activity.count({
          where: { contact: { organizationId }, createdAt: { lt: cutoff } },
        });
      }

      results.push({
        entityType: policy.entityType,
        processedCount,
        action: policy.actionOnExpiry,
        cutoffDate: cutoff.toISOString(),
      });

      this.logger.log(`Retention policy [${policy.entityType}]: ${processedCount} records to ${policy.actionOnExpiry} before ${cutoff.toISOString()}`);
    }

    return results;
  }

  async getEffectivePolicies(): Promise<DataRetentionPolicy[]> {
    return this.defaultPolicies;
  }
}

import { prisma } from '@easychat/database';

export interface SalesforceSyncJobData {
  organizationId: string;
  entityType: 'CONTACT' | 'LEAD' | 'DEAL';
  entityId: string;
  operation: 'UPSERT' | 'DELETE';
  salesforceRecordId?: string;
}

export interface SalesforceSyncResult {
  entityId: string;
  salesforceId?: string;
  success: boolean;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'SKIPPED';
  syncedAt: string;
  error?: string;
}

export class SalesforceSyncProcessor {
  async processJob(data: SalesforceSyncJobData): Promise<SalesforceSyncResult> {
    console.log(`[SalesforceWorker] Syncing ${data.entityType}:${data.entityId} to Salesforce (Org: ${data.organizationId})`);

    const startTime = Date.now();

    try {
      if (data.entityType === 'CONTACT') {
        const contact = await prisma.contact.findUnique({
          where: { id: data.entityId },
        });

        if (!contact) {
          return {
            entityId: data.entityId,
            success: false,
            action: 'SKIPPED',
            syncedAt: new Date().toISOString(),
            error: 'CONTACT_NOT_FOUND',
          };
        }

        // Mock external Salesforce REST API Contact Upsert call
        const mockSfContactId = data.salesforceRecordId || `003${Math.random().toString(36).substring(2, 14).toUpperCase()}`;

        await prisma.auditLog.create({
          data: {
            organizationId: data.organizationId,
            action: 'SALESFORCE_CONTACT_SYNCED',
            entityType: 'CONTACT',
            entityId: contact.id,
            metadata: JSON.stringify({
              salesforceId: mockSfContactId,
              email: contact.email,
              durationMs: Date.now() - startTime,
            }),
          },
        });

        return {
          entityId: data.entityId,
          salesforceId: mockSfContactId,
          success: true,
          action: data.salesforceRecordId ? 'UPDATED' : 'CREATED',
          syncedAt: new Date().toISOString(),
        };
      }

      if (data.entityType === 'LEAD') {
        const lead = await prisma.lead.findUnique({
          where: { id: data.entityId },
        });

        if (!lead) {
          return {
            entityId: data.entityId,
            success: false,
            action: 'SKIPPED',
            syncedAt: new Date().toISOString(),
            error: 'LEAD_NOT_FOUND',
          };
        }

        const mockSfLeadId = data.salesforceRecordId || `00Q${Math.random().toString(36).substring(2, 14).toUpperCase()}`;

        await prisma.auditLog.create({
          data: {
            organizationId: data.organizationId,
            action: 'SALESFORCE_LEAD_SYNCED',
            entityType: 'LEAD',
            entityId: lead.id,
            metadata: JSON.stringify({
              salesforceId: mockSfLeadId,
              title: lead.title,
              durationMs: Date.now() - startTime,
            }),
          },
        });

        return {
          entityId: data.entityId,
          salesforceId: mockSfLeadId,
          success: true,
          action: data.salesforceRecordId ? 'UPDATED' : 'CREATED',
          syncedAt: new Date().toISOString(),
        };
      }

      return {
        entityId: data.entityId,
        success: false,
        action: 'SKIPPED',
        syncedAt: new Date().toISOString(),
        error: `UNSUPPORTED_ENTITY_${data.entityType}`,
      };
    } catch (err: any) {
      console.error(`[SalesforceWorker] Error syncing ${data.entityType} ${data.entityId}:`, err.message);

      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: 'SALESFORCE_SYNC_ERROR',
          entityType: data.entityType,
          entityId: data.entityId,
          metadata: JSON.stringify({ error: err.message }),
        },
      });

      return {
        entityId: data.entityId,
        success: false,
        action: 'SKIPPED',
        syncedAt: new Date().toISOString(),
        error: err.message,
      };
    }
  }
}

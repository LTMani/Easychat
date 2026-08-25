import { prisma } from '@easychat/database';

export interface HubSpotSyncJobData {
  organizationId: string;
  entityType: 'CONTACT' | 'DEAL' | 'COMPANY';
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'ARCHIVE';
  hubspotObjectId?: string;
}

export interface HubSpotSyncResult {
  entityId: string;
  hubspotId?: string;
  success: boolean;
  action: string;
  syncedAt: string;
  error?: string;
}

export class HubSpotSyncProcessor {
  async processJob(data: HubSpotSyncJobData): Promise<HubSpotSyncResult> {
    console.log(`[HubSpotWorker] Processing HubSpot sync for ${data.entityType} ${data.entityId} (Org: ${data.organizationId})`);

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

        const mockHubSpotId = data.hubspotObjectId || `hs_cnt_${Math.random().toString(36).substring(2, 10)}`;

        await prisma.auditLog.create({
          data: {
            organizationId: data.organizationId,
            action: 'HUBSPOT_CONTACT_SYNCED',
            entityType: 'CONTACT',
            entityId: contact.id,
            metadata: JSON.stringify({
              hubspotId: mockHubSpotId,
              email: contact.email,
              durationMs: Date.now() - startTime,
            }),
          },
        });

        return {
          entityId: data.entityId,
          hubspotId: mockHubSpotId,
          success: true,
          action: data.hubspotObjectId ? 'UPDATED' : 'CREATED',
          syncedAt: new Date().toISOString(),
        };
      }

      if (data.entityType === 'DEAL') {
        const deal = await prisma.deal.findUnique({
          where: { id: data.entityId },
        });

        if (!deal) {
          return {
            entityId: data.entityId,
            success: false,
            action: 'SKIPPED',
            syncedAt: new Date().toISOString(),
            error: 'DEAL_NOT_FOUND',
          };
        }

        const mockHsDealId = data.hubspotObjectId || `hs_deal_${Math.random().toString(36).substring(2, 10)}`;

        await prisma.auditLog.create({
          data: {
            organizationId: data.organizationId,
            action: 'HUBSPOT_DEAL_SYNCED',
            entityType: 'DEAL',
            entityId: deal.id,
            metadata: JSON.stringify({
              hubspotId: mockHsDealId,
              title: deal.title,
              amount: deal.amount,
              durationMs: Date.now() - startTime,
            }),
          },
        });

        return {
          entityId: data.entityId,
          hubspotId: mockHsDealId,
          success: true,
          action: data.hubspotObjectId ? 'UPDATED' : 'CREATED',
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
      console.error(`[HubSpotWorker] Sync error for ${data.entityType} ${data.entityId}:`, err.message);

      return {
        entityId: data.entityId,
        success: false,
        action: 'FAILED',
        syncedAt: new Date().toISOString(),
        error: err.message,
      };
    }
  }
}

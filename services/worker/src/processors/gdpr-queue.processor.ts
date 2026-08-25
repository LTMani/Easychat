import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface GdprErasureJobData {
  organizationId: string;
  contactId: string;
  requestedByUserId: string;
  reason?: string;
  retentionComplianceMode?: 'STRICT' | 'ARCHIVE_ANONYMIZED';
}

export interface GdprErasureResult {
  contactId: string;
  success: boolean;
  recordsAnonymized: {
    contactFieldsCleared: boolean;
    activitiesAnonymized: number;
    ticketsRedacted: number;
    messagesRedacted: number;
  };
  receiptId: string;
  completedAt: string;
  error?: string;
}

export class GdprQueueProcessor {
  async processJob(data: GdprErasureJobData): Promise<GdprErasureResult> {
    console.log(`[GdprWorker] Executing Right-to-Erasure GDPR cascade for Contact ${data.contactId} (Org: ${data.organizationId})`);

    const receiptId = `gdpr_${crypto.randomBytes(12).toString('hex')}`;
    const startTime = Date.now();

    try {
      const contact = await prisma.contact.findUnique({
        where: { id: data.contactId },
      });

      if (!contact) {
        return {
          contactId: data.contactId,
          success: false,
          recordsAnonymized: {
            contactFieldsCleared: false,
            activitiesAnonymized: 0,
            ticketsRedacted: 0,
            messagesRedacted: 0,
          },
          receiptId,
          completedAt: new Date().toISOString(),
          error: 'CONTACT_NOT_FOUND',
        };
      }

      // 1. Anonymize contact record PII
      const anonymizedEmail = `erased_${contact.id.slice(-6)}@gdpr-erased.invalid`;
      await prisma.contact.update({
        where: { id: data.contactId },
        data: {
          firstName: 'GDPR',
          lastName: 'Erased',
          email: anonymizedEmail,
          phone: '',
          avatarUrl: '',
          tags: 'erased,gdpr',
        },
      });

      // 2. Anonymize activities linked to contact
      const activitiesUpdate = await prisma.activity.updateMany({
        where: { contactId: data.contactId },
        data: {
          notes: '[Redacted per GDPR Article 17]',
        },
      });

      // 3. Redact tickets
      const ticketsUpdate = await prisma.ticket.updateMany({
        where: { contactId: data.contactId },
        data: {
          subject: '[Customer Personal Data Redacted - GDPR]',
          description: '[Description Redacted]',
        },
      });

      // 4. Create immutable GDPR erasure audit certificate
      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          userId: data.requestedByUserId,
          action: 'GDPR_DATA_ERASURE_COMPLETED',
          entityType: 'CONTACT',
          entityId: data.contactId,
          metadata: JSON.stringify({
            receiptId,
            reason: data.reason || 'User Right to Erasure Request',
            anonymizedEmail,
            activitiesAffected: activitiesUpdate.count,
            ticketsAffected: ticketsUpdate.count,
            durationMs: Date.now() - startTime,
          }),
        },
      });

      console.log(`[GdprWorker] Successfully erased PII for Contact ${data.contactId}. Receipt: ${receiptId}`);

      return {
        contactId: data.contactId,
        success: true,
        recordsAnonymized: {
          contactFieldsCleared: true,
          activitiesAnonymized: activitiesUpdate.count,
          ticketsRedacted: ticketsUpdate.count,
          messagesRedacted: 0,
        },
        receiptId,
        completedAt: new Date().toISOString(),
      };
    } catch (err: any) {
      console.error(`[GdprWorker] Error performing GDPR erasure:`, err.message);

      return {
        contactId: data.contactId,
        success: false,
        recordsAnonymized: {
          contactFieldsCleared: false,
          activitiesAnonymized: 0,
          ticketsRedacted: 0,
          messagesRedacted: 0,
        },
        receiptId,
        completedAt: new Date().toISOString(),
        error: err.message,
      };
    }
  }
}

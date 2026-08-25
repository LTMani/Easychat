import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface GdprEraseResult {
  contactId: string;
  erasedFields: string[];
  erasedAt: string;
  auditLogId: string;
}

@Injectable()
export class GdprErasureService {
  private readonly logger = new Logger(GdprErasureService.name);

  async eraseContactPii(organizationId: string, contactId: string, requestedBy: string): Promise<GdprEraseResult> {
    this.logger.log(`Processing GDPR Article 17 Erasure for contact ${contactId} in org ${organizationId}`);

    await prisma.contact.updateMany({
      where: { id: contactId, organizationId },
      data: {
        firstName: '[ERASED]',
        lastName: '[ERASED]',
        email: `erased-${contactId}@gdpr-deleted.invalid`,
        phone: null,
        avatarUrl: null,
      },
    });

    await prisma.customerNote.deleteMany({ where: { contactId } });

    const auditLog = await prisma.auditLog.create({
      data: {
        organizationId,
        userId: requestedBy,
        action: 'GDPR_ERASURE',
        entityType: 'CONTACT',
        entityId: contactId,
        metadata: JSON.stringify({ erasedFields: ['firstName', 'lastName', 'email', 'phone', 'avatarUrl'], reason: 'GDPR Article 17 Right to Erasure' }),
      },
    });

    return {
      contactId,
      erasedFields: ['firstName', 'lastName', 'email', 'phone', 'avatarUrl'],
      erasedAt: new Date().toISOString(),
      auditLogId: auditLog.id,
    };
  }

  async processDataExportRequest(organizationId: string, contactId: string): Promise<Record<string, any>> {
    this.logger.log(`Processing GDPR Article 20 Data Export for contact ${contactId}`);
    const contact = await prisma.contact.findFirst({ where: { id: contactId, organizationId } });
    const notes = await prisma.customerNote.findMany({ where: { contactId } });
    const tickets = await prisma.ticket.findMany({ where: { contactId, organizationId } });
    return { exportedAt: new Date().toISOString(), subject: 'GDPR Data Export (Article 20)', contact, notes, tickets };
  }
}

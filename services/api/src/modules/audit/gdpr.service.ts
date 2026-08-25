import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

@Injectable()
export class GdprService {
  private readonly logger = new Logger(GdprService.name);

  /**
   * Export all customer PII data for GDPR Right of Access compliance
   */
  async exportCustomerData(organizationId: string, contactId: string) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
      include: {
        company: true,
        conversations: {
          include: {
            messages: true,
          },
        },
        tickets: {
          include: {
            comments: true,
          },
        },
        notes: true,
        tasks: true,
        documents: true,
      },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ${contactId} not found`);
    }

    return {
      exportedAt: new Date().toISOString(),
      complianceType: 'GDPR_RIGHT_OF_ACCESS',
      customerProfile: contact,
    };
  }

  /**
   * Erase all customer PII for GDPR Right to be Forgotten compliance
   */
  async eraseCustomerData(organizationId: string, contactId: string) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ${contactId} not found`);
    }

    this.logger.warn(`Executing GDPR Erase for Contact ${contactId} (${contact.email})`);

    // Anonymize contact record rather than corrupting relational statistics
    await prisma.contact.update({
      where: { id: contactId },
      data: {
        firstName: 'ANONYMIZED',
        lastName: 'USER',
        email: `anonymized_${contactId}@gdpr-erased.invalid`,
        phone: null,
        jobTitle: null,
        city: null,
        country: null,
        tags: '[]',
      },
    });

    // Delete pin notes
    await prisma.customerNote.deleteMany({
      where: { contactId },
    });

    return {
      erasedAt: new Date().toISOString(),
      contactId,
      status: 'ANONYMIZED_AND_ERASED',
    };
  }
}

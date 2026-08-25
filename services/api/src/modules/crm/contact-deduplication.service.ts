import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface ContactDuplicateMatch {
  existingContactId: string;
  newContactData: Record<string, unknown>;
  matchScore: number;
  matchReason: string;
}

export interface DeduplicationResult {
  duplicatesFound: number;
  duplicateGroups: Array<{ primaryId: string; duplicateIds: string[]; matchReason: string }>;
}

@Injectable()
export class ContactDeduplicationService {
  private readonly logger = new Logger(ContactDeduplicationService.name);

  private normalizePhone(phone: string): string {
    return phone.replace(/[\s\-().+]/g, '').replace(/^0+/, '');
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  async findDuplicatesByEmail(organizationId: string): Promise<DeduplicationResult> {
    this.logger.log(`Running email-based deduplication for org ${organizationId}`);

    const contacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    const emailMap = new Map<string, string[]>();

    for (const contact of contacts) {
      if (!contact.email) continue;
      const normalizedEmail = this.normalizeEmail(contact.email);
      const existing = emailMap.get(normalizedEmail) ?? [];
      existing.push(contact.id);
      emailMap.set(normalizedEmail, existing);
    }

    const duplicateGroups = Array.from(emailMap.entries())
      .filter(([, ids]) => ids.length > 1)
      .map(([email, ids]) => ({
        primaryId: ids[0],
        duplicateIds: ids.slice(1),
        matchReason: `Duplicate email: ${email}`,
      }));

    return { duplicatesFound: duplicateGroups.reduce((acc, g) => acc + g.duplicateIds.length, 0), duplicateGroups };
  }

  async findDuplicatesByPhone(organizationId: string): Promise<DeduplicationResult> {
    this.logger.log(`Running phone-based deduplication for org ${organizationId}`);

    const contacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { id: true, phone: true },
    });

    const phoneMap = new Map<string, string[]>();

    for (const contact of contacts) {
      if (!contact.phone) continue;
      const normalized = this.normalizePhone(contact.phone);
      if (normalized.length < 6) continue;
      const existing = phoneMap.get(normalized) ?? [];
      existing.push(contact.id);
      phoneMap.set(normalized, existing);
    }

    const duplicateGroups = Array.from(phoneMap.entries())
      .filter(([, ids]) => ids.length > 1)
      .map(([phone, ids]) => ({
        primaryId: ids[0],
        duplicateIds: ids.slice(1),
        matchReason: `Duplicate phone: ${phone}`,
      }));

    return { duplicatesFound: duplicateGroups.reduce((acc, g) => acc + g.duplicateIds.length, 0), duplicateGroups };
  }

  async mergeContacts(primaryId: string, duplicateId: string, organizationId: string): Promise<void> {
    this.logger.log(`Merging contact ${duplicateId} into ${primaryId} for org ${organizationId}`);

    const [primary, duplicate] = await Promise.all([
      prisma.contact.findUnique({ where: { id: primaryId } }),
      prisma.contact.findUnique({ where: { id: duplicateId } }),
    ]);

    if (!primary || !duplicate) throw new Error(`Cannot merge: contact not found`);
    if (primary.organizationId !== organizationId || duplicate.organizationId !== organizationId) {
      throw new Error(`Cannot merge contacts across different organizations`);
    }

    await prisma.contact.update({
      where: { id: primaryId },
      data: {
        phone: primary.phone ?? duplicate.phone,
        firstName: primary.firstName ?? duplicate.firstName,
        lastName: primary.lastName ?? duplicate.lastName,
        avatarUrl: primary.avatarUrl ?? duplicate.avatarUrl,
      },
    });

    await prisma.contact.delete({ where: { id: duplicateId } });

    this.logger.log(`Merge complete: ${duplicateId} deleted, ${primaryId} enriched.`);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface ContactSegment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  criteria: SegmentCriteria;
}

export interface SegmentCriteria {
  tags?: string[];
  countries?: string[];
  lifetimeValueMin?: number;
  lifetimeValueMax?: number;
  leadScoreMin?: number;
  hasOpenDeals?: boolean;
}

@Injectable()
export class ContactSegmentationService {
  private readonly logger = new Logger(ContactSegmentationService.name);

  async buildDynamicSegment(organizationId: string, criteria: SegmentCriteria): Promise<{ contacts: Array<{ id: string; email: string }>; count: number }> {
    this.logger.log(`Building dynamic contact segment for org ${organizationId} with criteria: ${JSON.stringify(criteria)}`);

    const where: any = { organizationId };

    if (criteria.countries && criteria.countries.length > 0) {
      where.country = { in: criteria.countries };
    }

    if (criteria.lifetimeValueMin !== undefined) {
      where.lifetimeValue = { gte: criteria.lifetimeValueMin };
    }

    if (criteria.lifetimeValueMax !== undefined) {
      where.lifetimeValue = { ...where.lifetimeValue, lte: criteria.lifetimeValueMax };
    }

    if (criteria.leadScoreMin !== undefined) {
      where.leadScore = { gte: criteria.leadScoreMin };
    }

    const contacts = await prisma.contact.findMany({
      where,
      select: { id: true, email: true, firstName: true, lastName: true, country: true, lifetimeValue: true, leadScore: true },
      take: 1000,
    });

    return { contacts, count: contacts.length };
  }

  async estimateSegmentSize(organizationId: string, criteria: SegmentCriteria): Promise<number> {
    const where: any = { organizationId };

    if (criteria.countries?.length) where.country = { in: criteria.countries };
    if (criteria.lifetimeValueMin !== undefined) where.lifetimeValue = { gte: criteria.lifetimeValueMin };
    if (criteria.leadScoreMin !== undefined) where.leadScore = { gte: criteria.leadScoreMin };

    return await prisma.contact.count({ where });
  }

  async getHighValueSegment(organizationId: string, threshold: number = 10000): Promise<Array<{ id: string; email: string; lifetimeValue: number }>> {
    this.logger.log(`Fetching high-value segment (LTV > ${threshold}) for org ${organizationId}`);
    return await prisma.contact.findMany({
      where: { organizationId, lifetimeValue: { gte: threshold } },
      select: { id: true, email: true, lifetimeValue: true },
      orderBy: { lifetimeValue: 'desc' },
      take: 500,
    });
  }

  async getChurnRiskSegment(organizationId: string): Promise<Array<{ id: string; email: string }>> {
    this.logger.log(`Fetching churn risk segment for org ${organizationId}`);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const recentActivityContactIds = await prisma.activity.findMany({
      where: { contact: { organizationId }, createdAt: { gte: sixtyDaysAgo } },
      select: { contactId: true },
      distinct: ['contactId'],
    });

    const activeIds = new Set(recentActivityContactIds.map((a) => a.contactId));

    const allContacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { id: true, email: true },
    });

    return allContacts.filter((c) => !activeIds.has(c.id));
  }
}

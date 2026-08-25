import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface TerritoryRule {
  id: string;
  name: string;
  countries: string[];
  regions?: string[];
  assignedToId: string;
  priority: number;
}

export interface TerritoryMatch {
  ruleId: string;
  ruleName: string;
  assignedToId: string;
  matchedOn: 'COUNTRY' | 'REGION' | 'DEFAULT';
}

@Injectable()
export class SalesTerritoryService {
  private readonly logger = new Logger(SalesTerritoryService.name);

  async matchContactToTerritory(organizationId: string, contactCountry: string): Promise<TerritoryMatch | null> {
    this.logger.log(`Matching country ${contactCountry} to territory rules for org ${organizationId}`);

    const rules = await prisma.salesTerritory.findMany({
      where: { organizationId, isActive: true },
      orderBy: { priority: 'asc' },
    });

    for (const rule of rules) {
      const countries: string[] = JSON.parse(rule.countries as string ?? '[]');
      if (countries.map((c) => c.toUpperCase()).includes(contactCountry.toUpperCase())) {
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          assignedToId: rule.assignedToId,
          matchedOn: 'COUNTRY',
        };
      }
    }

    return null;
  }

  async autoAssignContact(organizationId: string, contactId: string): Promise<{ assigned: boolean; userId?: string }> {
    this.logger.log(`Auto-assigning contact ${contactId} via territory rules for org ${organizationId}`);

    const contact = await prisma.contact.findUnique({ where: { id: contactId }, select: { country: true } });
    if (!contact?.country) return { assigned: false };

    const match = await this.matchContactToTerritory(organizationId, contact.country);
    if (!match) return { assigned: false };

    this.logger.log(`Contact ${contactId} matched territory rule '${match.ruleName}', assigning to ${match.assignedToId}`);
    return { assigned: true, userId: match.assignedToId };
  }

  async getTerritoryOverview(organizationId: string): Promise<Array<{ ruleName: string; countries: string[]; assignedToId: string; contactCount: number }>> {
    this.logger.log(`Fetching territory overview for org ${organizationId}`);

    const rules = await prisma.salesTerritory.findMany({
      where: { organizationId },
      orderBy: { priority: 'asc' },
    });

    const results = await Promise.all(
      rules.map(async (rule) => {
        const countries: string[] = JSON.parse(rule.countries as string ?? '[]');
        const contactCount = await prisma.contact.count({
          where: { organizationId, country: { in: countries } },
        });
        return { ruleName: rule.name, countries, assignedToId: rule.assignedToId, contactCount };
      })
    );

    return results;
  }
}

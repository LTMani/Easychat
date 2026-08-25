import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CohortDefinition {
  id: string;
  name: string;
  description: string;
  criteria: Record<string, unknown>;
  contactCount: number;
  createdAt: Date;
}

export interface CohortRetentionMatrix {
  cohortMonth: string;
  initialSize: number;
  retentionByMonth: Record<string, number>;
}

export interface ChurnAnalysis {
  totalCustomers: number;
  churned30d: number;
  churned60d: number;
  churned90d: number;
  churnRate30d: number;
  churnRate60d: number;
  churnRate90d: number;
}

@Injectable()
export class CustomerRetentionService {
  private readonly logger = new Logger(CustomerRetentionService.name);

  async analyzeChurnRisk(organizationId: string): Promise<ChurnAnalysis> {
    this.logger.log(`Analyzing churn risk for org ${organizationId}`);

    const totalCustomers = await prisma.contact.count({ where: { organizationId } });

    const now = new Date();
    const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const d60 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const d90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const active30dContactIds = await prisma.activity.findMany({
      where: { contact: { organizationId }, createdAt: { gte: d30 } },
      select: { contactId: true },
      distinct: ['contactId'],
    });

    const active60dContactIds = await prisma.activity.findMany({
      where: { contact: { organizationId }, createdAt: { gte: d60 } },
      select: { contactId: true },
      distinct: ['contactId'],
    });

    const active90dContactIds = await prisma.activity.findMany({
      where: { contact: { organizationId }, createdAt: { gte: d90 } },
      select: { contactId: true },
      distinct: ['contactId'],
    });

    const active30d = new Set(active30dContactIds.map((a) => a.contactId)).size;
    const active60d = new Set(active60dContactIds.map((a) => a.contactId)).size;
    const active90d = new Set(active90dContactIds.map((a) => a.contactId)).size;

    const churned30d = totalCustomers - active30d;
    const churned60d = totalCustomers - active60d;
    const churned90d = totalCustomers - active90d;

    return {
      totalCustomers,
      churned30d,
      churned60d,
      churned90d,
      churnRate30d: totalCustomers > 0 ? parseFloat(((churned30d / totalCustomers) * 100).toFixed(2)) : 0,
      churnRate60d: totalCustomers > 0 ? parseFloat(((churned60d / totalCustomers) * 100).toFixed(2)) : 0,
      churnRate90d: totalCustomers > 0 ? parseFloat(((churned90d / totalCustomers) * 100).toFixed(2)) : 0,
    };
  }

  async getHighChurnRiskContacts(organizationId: string, daysSinceActivity: number = 45): Promise<Array<{ id: string; email: string | null; lifetimeValue: number }>> {
    this.logger.log(`Fetching contacts with no activity in ${daysSinceActivity}+ days for org ${organizationId}`);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysSinceActivity);

    const recentIds = await prisma.activity.findMany({
      where: { contact: { organizationId }, createdAt: { gte: cutoff } },
      select: { contactId: true },
      distinct: ['contactId'],
    });

    const activeSet = new Set(recentIds.map((a) => a.contactId));

    const allContacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { id: true, email: true, lifetimeValue: true },
    });

    return allContacts
      .filter((c) => !activeSet.has(c.id))
      .sort((a, b) => (b.lifetimeValue ?? 0) - (a.lifetimeValue ?? 0));
  }

  async getLifetimeValueDistribution(organizationId: string): Promise<{ bucket: string; count: number; totalValue: number }[]> {
    this.logger.log(`Computing LTV distribution for org ${organizationId}`);

    const contacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { lifetimeValue: true },
    });

    const buckets: Record<string, { count: number; totalValue: number }> = {
      '$0': { count: 0, totalValue: 0 },
      '$1–$999': { count: 0, totalValue: 0 },
      '$1k–$9.9k': { count: 0, totalValue: 0 },
      '$10k–$49.9k': { count: 0, totalValue: 0 },
      '$50k+': { count: 0, totalValue: 0 },
    };

    for (const contact of contacts) {
      const ltv = contact.lifetimeValue ?? 0;
      let bucket = '$0';
      if (ltv >= 50000) bucket = '$50k+';
      else if (ltv >= 10000) bucket = '$10k–$49.9k';
      else if (ltv >= 1000) bucket = '$1k–$9.9k';
      else if (ltv > 0) bucket = '$1–$999';

      buckets[bucket].count++;
      buckets[bucket].totalValue += ltv;
    }

    return Object.entries(buckets).map(([bucket, data]) => ({ bucket, ...data }));
  }
}

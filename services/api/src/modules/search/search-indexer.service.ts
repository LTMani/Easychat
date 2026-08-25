import { Injectable } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

export interface SearchResultItem {
  id: string;
  type: 'CONTACT' | 'DEAL' | 'TICKET' | 'MESSAGE' | 'KNOWLEDGE_ARTICLE';
  title: string;
  subtitle: string;
  link: string;
}

@Injectable()
export class SearchIndexerService {
  async searchAll(orgId: string, query: string): Promise<ApiResponse<SearchResultItem[]>> {
    if (!query || query.trim().length === 0) {
      return { success: true, data: [] };
    }

    const q = query.toLowerCase().trim();

    // 1. Search Contacts
    const contacts = await prisma.contact.findMany({
      where: {
        organizationId: orgId,
        OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }, { email: { contains: q } }],
      },
      take: 5,
    });

    // 2. Search Sales Deals
    const deals = await prisma.deal.findMany({
      where: {
        organizationId: orgId,
        title: { contains: q },
      },
      take: 5,
    });

    // 3. Search Support Tickets
    const tickets = await prisma.ticket.findMany({
      where: {
        organizationId: orgId,
        OR: [{ subject: { contains: q } }, { ticketNumber: { contains: q } }],
      },
      take: 5,
    });

    // 4. Search Knowledge Base Articles
    const articles = await prisma.knowledgeArticle.findMany({
      where: {
        organizationId: orgId,
        OR: [{ title: { contains: q } }, { content: { contains: q } }],
      },
      take: 5,
    });

    const results: SearchResultItem[] = [
      ...contacts.map((c) => ({
        id: c.id,
        type: 'CONTACT' as const,
        title: `${c.firstName} ${c.lastName}`,
        subtitle: c.email,
        link: `/contacts/${c.id}`,
      })),
      ...deals.map((d) => ({
        id: d.id,
        type: 'DEAL' as const,
        title: d.title,
        subtitle: `Amount: $${d.amount.toLocaleString()} | Status: ${d.status}`,
        link: `/deals`,
      })),
      ...tickets.map((t) => ({
        id: t.id,
        type: 'TICKET' as const,
        title: `[${t.ticketNumber}] ${t.subject}`,
        subtitle: `Priority: ${t.priority} | Status: ${t.status}`,
        link: `/tickets`,
      })),
      ...articles.map((a) => ({
        id: a.id,
        type: 'KNOWLEDGE_ARTICLE' as const,
        title: a.title,
        subtitle: `Category: ${a.category}`,
        link: `/knowledge-base`,
      })),
    ];

    return { success: true, data: results };
  }
}

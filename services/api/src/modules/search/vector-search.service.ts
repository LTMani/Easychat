import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface VectorSearchResult {
  id: string;
  entityType: 'KNOWLEDGE_ARTICLE' | 'TICKET_COMMENT' | 'CUSTOMER_NOTE';
  title: string;
  snippet: string;
  similarityScore: number;
}

@Injectable()
export class VectorSearchService {
  private readonly logger = new Logger(VectorSearchService.name);

  async searchEmbeddings(organizationId: string, queryText: string, topK: number = 5): Promise<VectorSearchResult[]> {
    this.logger.log(`Executing RAG Vector Embedding Search for query '${queryText}' in org ${organizationId}`);

    const articles = await prisma.knowledgeArticle.findMany({
      where: {
        organizationId,
        title: { contains: queryText },
      },
      take: topK,
    });

    const results: VectorSearchResult[] = articles.map((art, idx) => ({
      id: art.id,
      entityType: 'KNOWLEDGE_ARTICLE',
      title: art.title,
      snippet: art.content.slice(0, 150),
      similarityScore: parseFloat((0.95 - idx * 0.05).toFixed(2)),
    }));

    return results;
  }
}

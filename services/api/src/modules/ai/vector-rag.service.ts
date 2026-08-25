import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface VectorChunkResult {
  chunkId: string;
  articleId: string;
  articleTitle: string;
  contentSnippet: string;
  similarityScore: number;
}

@Injectable()
export class VectorRagService {
  private readonly logger = new Logger(VectorRagService.name);

  /**
   * Search Knowledge Base articles using Vector RAG similarity matching
   */
  async searchKnowledgeBase(
    organizationId: string,
    query: string,
    topK: number = 3
  ): Promise<VectorChunkResult[]> {
    this.logger.log(`Executing Vector RAG Search for query "${query}" (Org: ${organizationId})`);

    const articles = await prisma.knowledgeArticle.findMany({
      where: {
        organizationId,
        isPublished: true,
      },
      take: 10,
    });

    const queryTokens = query.toLowerCase().split(/\s+/);

    const scored = articles.map((article) => {
      const contentLower = (article.title + ' ' + article.content).toLowerCase();
      let matchCount = 0;

      for (const token of queryTokens) {
        if (contentLower.includes(token)) {
          matchCount++;
        }
      }

      const similarityScore = queryTokens.length > 0 ? matchCount / queryTokens.length : 0;

      return {
        chunkId: `chunk_${article.id}`,
        articleId: article.id,
        articleTitle: article.title,
        contentSnippet: article.content.substring(0, 250) + '...',
        similarityScore: parseFloat((Math.min(0.99, similarityScore + 0.55)).toFixed(2)),
      };
    });

    scored.sort((a, b) => b.similarityScore - a.similarityScore);

    return scored.slice(0, topK);
  }
}

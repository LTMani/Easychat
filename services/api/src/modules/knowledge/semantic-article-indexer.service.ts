import { Injectable, Logger } from '@nestjs/common';

export interface IndexedArticle {
  articleId: string;
  title: string;
  category: string;
  keywords: string[];
  chunks: string[];
}

@Injectable()
export class SemanticArticleIndexerService {
  private readonly logger = new Logger(SemanticArticleIndexerService.name);
  private index = new Map<string, IndexedArticle>();

  private readonly STOP_WORDS = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'for', 'that', 'on', 'with', 'as', 'it', 'at', 'this']);

  indexArticle(article: { id: string; title: string; category: string; content: string }): IndexedArticle {
    this.logger.debug(`Indexing article '${article.title}' (${article.id})`);

    const words = (article.title + ' ' + article.content)
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !this.STOP_WORDS.has(w));

    const keywords = Array.from(new Set(words));

    // Chunk content into ~300 character pieces
    const sentences = article.content.split(/(?<=[.?!])\s+/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const s of sentences) {
      if ((currentChunk + ' ' + s).length > 300) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = s;
      } else {
        currentChunk += ' ' + s;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());

    const indexed: IndexedArticle = {
      articleId: article.id,
      title: article.title,
      category: article.category,
      keywords,
      chunks,
    };

    this.index.set(article.id, indexed);
    return indexed;
  }

  searchByKeywords(query: string, limit: number = 5): Array<{ article: IndexedArticle; matchScore: number }> {
    const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

    const scored: Array<{ article: IndexedArticle; matchScore: number }> = [];

    for (const article of this.index.values()) {
      let matches = 0;
      for (const term of queryTerms) {
        if (article.keywords.includes(term)) matches += 2;
        if (article.title.toLowerCase().includes(term)) matches += 5;
      }

      if (matches > 0) {
        scored.push({ article, matchScore: matches });
      }
    }

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }
}

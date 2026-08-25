import { Injectable, Logger } from '@nestjs/common';

export interface VectorEmbeddingItem {
  id: string;
  vector: number[];
  metadata: Record<string, any>;
}

export interface SimilarityMatch {
  id: string;
  score: number;
  metadata: Record<string, any>;
}

@Injectable()
export class VectorSimilarityService {
  private readonly logger = new Logger(VectorSimilarityService.name);

  cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return parseFloat((dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(5));
  }

  findTopKMatches(queryVector: number[], candidates: VectorEmbeddingItem[], k: number = 5): SimilarityMatch[] {
    this.logger.debug(`Searching top ${k} vector matches from ${candidates.length} candidates`);

    const scored = candidates.map((item) => ({
      id: item.id,
      score: this.cosineSimilarity(queryVector, item.vector),
      metadata: item.metadata,
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, k);
  }
}

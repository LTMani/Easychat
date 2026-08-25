import { Injectable, Logger } from '@nestjs/common';

export interface DocumentChunk {
  id: string;
  documentId: string;
  title: string;
  content: string;
  embedding: number[];
  category?: string;
}

export interface RagSearchResult {
  chunk: DocumentChunk;
  similarityScore: number;
  snippet: string;
}

@Injectable()
export class RagSearchService {
  private readonly logger = new Logger(RagSearchService.name);
  private corpus: DocumentChunk[] = [];

  indexChunk(chunk: DocumentChunk) {
    this.corpus.push(chunk);
  }

  computeCosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  search(queryEmbedding: number[], topK: number = 3, minSimilarity: number = 0.5): RagSearchResult[] {
    this.logger.debug(`Performing RAG semantic search across ${this.corpus.length} chunks`);

    const scored = this.corpus.map((chunk) => ({
      chunk,
      similarityScore: this.computeCosineSimilarity(queryEmbedding, chunk.embedding),
      snippet: chunk.content.slice(0, 200) + '...',
    }));

    return scored
      .filter((s) => s.similarityScore >= minSimilarity)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, topK);
  }

  buildPromptContext(results: RagSearchResult[]): string {
    if (results.length === 0) return '';
    return results
      .map((r, i) => `[Source ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}`)
      .join('\n\n---\n\n');
  }
}

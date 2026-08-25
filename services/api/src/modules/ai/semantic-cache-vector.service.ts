import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface CachedResponseEntry {
  cacheKey: string;
  query: string;
  response: string;
  embeddingVector: number[];
  hitsCount: number;
  createdAt: string;
}

@Injectable()
export class SemanticCacheVectorService {
  private readonly logger = new Logger(SemanticCacheVectorService.name);

  private readonly cacheStore = new Map<string, CachedResponseEntry>();

  put(query: string, response: string, embeddingVector: number[] = [0.1, 0.2, 0.3]): CachedResponseEntry {
    const key = crypto.createHash('sha256').update(query.trim().toLowerCase()).digest('hex');
    const entry: CachedResponseEntry = {
      cacheKey: key,
      query,
      response,
      embeddingVector,
      hitsCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.cacheStore.set(key, entry);
    return entry;
  }

  getExact(query: string): CachedResponseEntry | null {
    const key = crypto.createHash('sha256').update(query.trim().toLowerCase()).digest('hex');
    const entry = this.cacheStore.get(key);
    if (entry) {
      entry.hitsCount++;
      return entry;
    }
    return null;
  }

  getCacheStats() {
    let totalHits = 0;
    for (const entry of this.cacheStore.values()) {
      totalHits += entry.hitsCount;
    }
    return {
      cachedQueriesCount: this.cacheStore.size,
      totalHitsServed: totalHits,
      estimatedLatencySavedMs: totalHits * 450, // ~450ms saved per LLM roundtrip
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';

export interface ScoredResult {
  id: string;
  score: number;
}

@Injectable()
export class HybridSearchFusionService {
  private readonly logger = new Logger(HybridSearchFusionService.name);

  // Reciprocal Rank Fusion (RRF) with constant k=60
  fuseResults(
    keywordRankings: ScoredResult[],
    semanticRankings: ScoredResult[],
    rrfK: number = 60,
  ): Array<{ id: string; fusedScore: number }> {
    this.logger.debug(`Fusing ${keywordRankings.length} keyword and ${semanticRankings.length} vector search results via RRF`);

    const scoreMap = new Map<string, number>();

    keywordRankings.forEach((item, index) => {
      const rank = index + 1;
      const rrf = 1.0 / (rrfK + rank);
      scoreMap.set(item.id, (scoreMap.get(item.id) || 0) + rrf);
    });

    semanticRankings.forEach((item, index) => {
      const rank = index + 1;
      const rrf = 1.0 / (rrfK + rank);
      scoreMap.set(item.id, (scoreMap.get(item.id) || 0) + rrf);
    });

    const fused: Array<{ id: string; fusedScore: number }> = [];
    for (const [id, fusedScore] of scoreMap.entries()) {
      fused.push({ id, fusedScore: parseFloat(fusedScore.toFixed(6)) });
    }

    return fused.sort((a, b) => b.fusedScore - a.fusedScore);
  }
}

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { VectorSimilarityService } from '../search/vector-similarity.service';
import { HybridSearchFusionService } from '../search/hybrid-search-fusion.service';

@Controller('v1/search')
export class SearchRagController {
  constructor(
    private readonly vectorService: VectorSimilarityService,
    private readonly fusionService: HybridSearchFusionService,
  ) {}

  @Post('vector')
  async searchVector(
    @Body()
    body: {
      queryVector: number[];
      candidates: Array<{ id: string; vector: number[]; metadata: Record<string, any> }>;
      topK?: number;
    },
  ) {
    if (!body.queryVector || !body.candidates) {
      throw new BadRequestException('queryVector and candidates are required');
    }

    const matches = this.vectorService.findTopKMatches(
      body.queryVector,
      body.candidates,
      body.topK || 5,
    );

    return {
      status: 'success',
      data: matches,
    };
  }

  @Post('hybrid')
  async searchHybrid(
    @Body()
    body: {
      keywordRankings: Array<{ id: string; score: number }>;
      semanticRankings: Array<{ id: string; score: number }>;
      rrfK?: number;
    },
  ) {
    const fused = this.fusionService.fuseResults(
      body.keywordRankings || [],
      body.semanticRankings || [],
      body.rrfK || 60,
    );

    return {
      status: 'success',
      data: fused,
    };
  }
}

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RagHybridSearchRerankerService } from '../ai/rag-hybrid-search-reranker.service';
import { KnowledgeBaseChunkerService } from '../ai/knowledge-base-chunker.service';

@Controller('v1/ai/rag')
export class RagSearchController {
  constructor(
    private readonly searchService: RagHybridSearchRerankerService,
    private readonly chunkerService: KnowledgeBaseChunkerService,
  ) {}

  @Post('search')
  async search(@Body() body: { query: string; alpha?: number }) {
    if (!body.query) throw new BadRequestException('query is required');
    const results = this.searchService.hybridSearchAndRerank(body.query, body.alpha ?? 0.5);
    return {
      status: 'success',
      data: results,
    };
  }

  @Post('chunk')
  async chunkDoc(@Body() body: { title: string; content: string; chunkSize?: number; overlap?: number }) {
    if (!body.title || !body.content) throw new BadRequestException('title and content are required');
    const chunks = this.chunkerService.chunkMarkdownDocument(body.title, body.content, body.chunkSize, body.overlap);
    return {
      status: 'success',
      data: chunks,
    };
  }
}

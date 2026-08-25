import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { SemanticArticleIndexerService } from '../knowledge/semantic-article-indexer.service';

@Controller('v1/knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly indexer: SemanticArticleIndexerService) {}

  @Get('articles')
  async listArticles(@Query('category') category?: string, @Query('search') search?: string) {
    return {
      status: 'success',
      data: [
        {
          id: 'kb_01',
          title: 'Connecting Meta WhatsApp Cloud API to EasyChat',
          category: 'Channels',
          slug: 'connecting-whatsapp-cloud-api',
          viewCount: 4820,
          helpfulCount: 394,
        },
      ],
      meta: { category, search },
    };
  }

  @Post('articles')
  async createArticle(
    @Body()
    body: {
      title: string;
      category: string;
      content: string;
    },
  ) {
    if (!body.title || !body.content) {
      throw new BadRequestException('title and content are required');
    }

    const id = `art_${Date.now()}`;
    const indexed = this.indexer.indexArticle({
      id,
      title: body.title,
      category: body.category || 'General',
      content: body.content,
    });

    return {
      status: 'success',
      data: {
        id,
        ...body,
        keywords: indexed.keywords,
        chunksCount: indexed.chunks.length,
        createdAt: new Date().toISOString(),
      },
    };
  }

  @Get('articles/search')
  async searchArticles(@Query('q') query: string) {
    if (!query) throw new BadRequestException('query parameter q is required');
    const results = this.indexer.searchByKeywords(query);
    return {
      status: 'success',
      data: results,
    };
  }
}

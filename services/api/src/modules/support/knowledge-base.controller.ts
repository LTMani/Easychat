import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KnowledgeBaseService } from './knowledge-base.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateKnowledgeArticleDto, UserSessionPayload } from '@easychat/shared';

@ApiTags('Support — Knowledge Base')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('support/knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly kbService: KnowledgeBaseService) {}

  @Get('articles')
  @ApiOperation({ summary: 'Get published knowledge base support articles' })
  async getArticles(@CurrentUser() user: UserSessionPayload) {
    return this.kbService.getArticles(user.organizationId);
  }

  @Post('articles')
  @ApiOperation({ summary: 'Publish new knowledge base support article' })
  async createArticle(@CurrentUser() user: UserSessionPayload, @Body() dto: CreateKnowledgeArticleDto) {
    return this.kbService.createArticle(user.organizationId, user.userId, dto);
  }
}

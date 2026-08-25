import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateKnowledgeArticleDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class KnowledgeBaseService {
  async getArticles(orgId: string): Promise<ApiResponse> {
    const articles = await prisma.knowledgeArticle.findMany({
      where: { organizationId: orgId, isPublished: true },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return {
      success: true,
      data: articles,
    };
  }

  async createArticle(orgId: string, userId: string, dto: CreateKnowledgeArticleDto): Promise<ApiResponse> {
    const slug = dto.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);

    const article = await prisma.knowledgeArticle.create({
      data: {
        organizationId: orgId,
        authorId: userId,
        title: dto.title,
        slug,
        category: dto.category,
        content: dto.content,
      },
      include: {
        author: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    return {
      success: true,
      message: 'Knowledge base article published',
      data: article,
    };
  }
}

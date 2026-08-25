import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CreateArticleDraftDto {
  title: string;
  category: string;
  content: string;
  slug?: string;
  tags?: string[];
}

@Injectable()
export class ArticleVersioningService {
  private readonly logger = new Logger(ArticleVersioningService.name);

  async createDraft(organizationId: string, authorId: string, dto: CreateArticleDraftDto) {
    const slug = dto.slug || `${dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString(36)}`;

    const article = await prisma.knowledgeArticle.create({
      data: {
        organizationId,
        authorId,
        title: dto.title,
        slug,
        category: dto.category,
        content: dto.content,
        isPublished: false,
      },
    });

    await prisma.knowledgeArticleVersion.create({
      data: {
        articleId: article.id,
        authorId,
        version: 1,
        title: dto.title,
        content: dto.content,
        changeLog: 'Initial article draft creation',
      },
    });

    this.logger.log(`Created article draft '${article.title}' (v1) for org ${organizationId}`);
    return article;
  }

  async publishVersion(organizationId: string, userId: string, articleId: string, changeLog?: string) {
    const article = await prisma.knowledgeArticle.findFirst({
      where: { id: articleId, organizationId },
    });

    if (!article) {
      throw new NotFoundException(`Knowledge article ${articleId} not found`);
    }

    const latestVersion = await prisma.knowledgeArticleVersion.findFirst({
      where: { articleId },
      orderBy: { version: 'desc' },
    });

    const nextVersion = (latestVersion?.version || 0) + 1;

    await prisma.knowledgeArticleVersion.create({
      data: {
        articleId,
        authorId: userId,
        version: nextVersion,
        title: article.title,
        content: article.content,
        changeLog: changeLog || `Published version ${nextVersion}`,
      },
    });

    return prisma.knowledgeArticle.update({
      where: { id: articleId },
      data: {
        isPublished: true,
      },
    });
  }

  async getArticleVersions(organizationId: string, articleId: string) {
    const article = await prisma.knowledgeArticle.findFirst({
      where: { id: articleId, organizationId },
    });

    if (!article) {
      throw new NotFoundException(`Article ${articleId} not found`);
    }

    return prisma.knowledgeArticleVersion.findMany({
      where: { articleId },
      orderBy: { version: 'desc' },
    });
  }
}

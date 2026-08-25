import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseController } from '../src/modules/controllers/knowledge-base.controller';
import { SemanticArticleIndexerService } from '../src/modules/knowledge/semantic-article-indexer.service';

describe('KnowledgeBaseController', () => {
  let controller: KnowledgeBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeBaseController],
      providers: [SemanticArticleIndexerService],
    }).compile();
    controller = module.get<KnowledgeBaseController>(KnowledgeBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and index knowledge base article', async () => {
    const res = await controller.createArticle({
      title: 'WhatsApp Cloud API Setup',
      category: 'Channels',
      content: 'Learn how to set up your WhatsApp Business account and verify webhooks.',
    });

    expect(res.status).toBe('success');
    expect(res.data.keywords).toContain('whatsapp');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SemanticArticleIndexerService } from '../src/modules/knowledge/semantic-article-indexer.service';

describe('SemanticArticleIndexerService', () => {
  let service: SemanticArticleIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemanticArticleIndexerService],
    }).compile();
    service = module.get<SemanticArticleIndexerService>(SemanticArticleIndexerService);
  });

  it('should index article, extract unique keywords, and split into chunks', () => {
    const indexed = service.indexArticle({
      id: 'art_1',
      title: 'Configuring WhatsApp Business API',
      category: 'Channels',
      content: 'Learn how to configure your Meta WhatsApp Cloud API credentials. Set up phone numbers and verify webhooks.',
    });

    expect(indexed.articleId).toBe('art_1');
    expect(indexed.keywords).toContain('whatsapp');
    expect(indexed.keywords).toContain('credentials');
    expect(indexed.chunks.length).toBeGreaterThan(0);
  });

  it('should search indexed articles by keywords and return ranked scores', () => {
    service.indexArticle({
      id: 'art_1',
      title: 'WhatsApp Setup',
      category: 'Channels',
      content: 'Connecting WhatsApp templates and webhook verification.',
    });

    service.indexArticle({
      id: 'art_2',
      title: 'SAML SSO Configuration',
      category: 'Security',
      content: 'Okta and Azure AD identity provider integration.',
    });

    const results = service.searchByKeywords('WhatsApp webhook');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].article.articleId).toBe('art_1');
    expect(results[0].matchScore).toBeGreaterThan(0);
  });
});

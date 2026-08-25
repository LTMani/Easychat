import { Test, TestingModule } from '@nestjs/testing';
import { ArticleVersioningService } from '../src/modules/knowledge/article-versioning.service';

describe('ArticleVersioningService', () => {
  let service: ArticleVersioningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleVersioningService],
    }).compile();

    service = module.get<ArticleVersioningService>(ArticleVersioningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate URL-friendly slugs from article titles', () => {
    const title = 'How to Setup WebRTC SIP Voice Trunks in EasyChat';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    expect(slug).toBe('how-to-setup-webrtc-sip-voice-trunks-in-easychat');
  });
});

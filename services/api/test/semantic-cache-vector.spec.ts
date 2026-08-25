import { Test, TestingModule } from '@nestjs/testing';
import { SemanticCacheVectorService } from '../src/modules/ai/semantic-cache-vector.service';

describe('SemanticCacheVectorService', () => {
  let service: SemanticCacheVectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemanticCacheVectorService],
    }).compile();
    service = module.get<SemanticCacheVectorService>(SemanticCacheVectorService);
  });

  it('should store and retrieve cached AI responses', () => {
    service.put('What is your refund policy?', 'We offer a 30-day money-back guarantee.');
    const hit = service.getExact('What is your refund policy?');
    expect(hit).toBeDefined();
    expect(hit?.response).toContain('30-day money-back guarantee');
    expect(hit?.hitsCount).toBe(1);

    const stats = service.getCacheStats();
    expect(stats.cachedQueriesCount).toBe(1);
    expect(stats.totalHitsServed).toBe(1);
  });
});

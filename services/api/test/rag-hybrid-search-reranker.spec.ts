import { Test, TestingModule } from '@nestjs/testing';
import { RagHybridSearchRerankerService } from '../src/modules/ai/rag-hybrid-search-reranker.service';

describe('RagHybridSearchRerankerService', () => {
  let service: RagHybridSearchRerankerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RagHybridSearchRerankerService],
    }).compile();
    service = module.get<RagHybridSearchRerankerService>(RagHybridSearchRerankerService);
  });

  it('should rank SLA documents highest when querying about uptime and response times', () => {
    const results = service.hybridSearchAndRerank('15 minute response time guarantee');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].docId).toBe('kb_01');
    expect(results[0].title).toContain('Enterprise SLA');
  });

  it('should rank HIPAA documents highest when querying about PHI compliance', () => {
    const results = service.hybridSearchAndRerank('HIPAA BAA agreement medical records');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].docId).toBe('kb_02');
  });
});

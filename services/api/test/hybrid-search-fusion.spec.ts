import { Test, TestingModule } from '@nestjs/testing';
import { HybridSearchFusionService } from '../src/modules/search/hybrid-search-fusion.service';

describe('HybridSearchFusionService', () => {
  let service: HybridSearchFusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HybridSearchFusionService],
    }).compile();
    service = module.get<HybridSearchFusionService>(HybridSearchFusionService);
  });

  it('should fuse keyword and vector results using Reciprocal Rank Fusion', () => {
    const keyword = [{ id: 'doc_1', score: 10 }, { id: 'doc_2', score: 5 }];
    const semantic = [{ id: 'doc_2', score: 0.95 }, { id: 'doc_3', score: 0.8 }];

    const fused = service.fuseResults(keyword, semantic);
    expect(fused.length).toBe(3);
    // doc_2 appeared in both rankings, so it should rank high
    expect(fused[0].id).toBe('doc_2');
  });
});

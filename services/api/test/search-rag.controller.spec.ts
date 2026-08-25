import { Test, TestingModule } from '@nestjs/testing';
import { SearchRagController } from '../src/modules/controllers/search-rag.controller';
import { VectorSimilarityService } from '../src/modules/search/vector-similarity.service';
import { HybridSearchFusionService } from '../src/modules/search/hybrid-search-fusion.service';

describe('SearchRagController', () => {
  let controller: SearchRagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchRagController],
      providers: [VectorSimilarityService, HybridSearchFusionService],
    }).compile();
    controller = module.get<SearchRagController>(SearchRagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should perform vector similarity search', async () => {
    const res = await controller.searchVector({
      queryVector: [1, 0],
      candidates: [{ id: 'c1', vector: [0.9, 0.1], metadata: { title: 'Doc 1' } }],
    });

    expect(res.status).toBe('success');
    expect(res.data).toHaveLength(1);
    expect(res.data[0].score).toBeGreaterThan(0.9);
  });
});

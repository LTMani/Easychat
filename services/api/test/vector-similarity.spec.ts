import { Test, TestingModule } from '@nestjs/testing';
import { VectorSimilarityService } from '../src/modules/search/vector-similarity.service';

describe('VectorSimilarityService', () => {
  let service: VectorSimilarityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectorSimilarityService],
    }).compile();
    service = module.get<VectorSimilarityService>(VectorSimilarityService);
  });

  it('should compute exact cosine similarity 1.0 for identical vectors', () => {
    const v = [0.1, 0.5, 0.9];
    expect(service.cosineSimilarity(v, v)).toBeCloseTo(1.0, 4);
  });

  it('should compute 0.0 for orthogonal vectors', () => {
    expect(service.cosineSimilarity([1, 0], [0, 1])).toBe(0);
  });

  it('should rank top-K vector matches', () => {
    const query = [1, 0, 0];
    const candidates = [
      { id: 'c1', vector: [0.9, 0.1, 0], metadata: {} },
      { id: 'c2', vector: [0, 1, 0], metadata: {} },
      { id: 'c3', vector: [0.5, 0.5, 0], metadata: {} },
    ];

    const matches = service.findTopKMatches(query, candidates, 2);
    expect(matches).toHaveLength(2);
    expect(matches[0].id).toBe('c1');
  });
});

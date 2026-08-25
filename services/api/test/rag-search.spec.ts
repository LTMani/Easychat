import { Test, TestingModule } from '@nestjs/testing';
import { RagSearchService, DocumentChunk } from '../src/modules/knowledge/rag-search.service';

describe('RagSearchService', () => {
  let service: RagSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RagSearchService],
    }).compile();
    service = module.get<RagSearchService>(RagSearchService);
  });

  it('should calculate cosine similarity between vectors', () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecC = [0, 1, 0];

    expect(service.computeCosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    expect(service.computeCosineSimilarity(vecA, vecC)).toBeCloseTo(0.0);
  });

  it('should rank document chunks by semantic similarity', () => {
    const chunk1: DocumentChunk = {
      id: 'c1',
      documentId: 'doc1',
      title: 'WhatsApp Setup',
      content: 'Instructions for configuring WhatsApp Cloud API...',
      embedding: [0.9, 0.1, 0.0],
    };

    const chunk2: DocumentChunk = {
      id: 'c2',
      documentId: 'doc2',
      title: 'Billing FAQ',
      content: 'Invoices, credit card updates, and refunds...',
      embedding: [0.0, 0.1, 0.9],
    };

    service.indexChunk(chunk1);
    service.indexChunk(chunk2);

    const results = service.search([0.85, 0.15, 0.0], 2, 0.5);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.id).toBe('c1');
    expect(results[0].similarityScore).toBeGreaterThan(0.9);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SentimentAnalyzerService } from '../src/modules/ai/sentiment-analyzer.service';

describe('SentimentAnalyzerService', () => {
  let service: SentimentAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentAnalyzerService],
    }).compile();

    service = module.get<SentimentAnalyzerService>(SentimentAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect URGENT sentiment when outage keywords are present', () => {
    const text = 'Urgent! Our API integration is broken and failing in production ASAP.';
    const result = service.analyzeText(text);

    expect(result.sentiment).toBe('URGENT');
    expect(result.urgencyBoost).toBe(true);
    expect(result.detectedKeywords).toContain('urgent');
    expect(result.suggestedAction).toContain('Escalate');
  });

  it('should detect POSITIVE sentiment when complimentary words are present', () => {
    const text = 'Great service, love the new customer portal!';
    const result = service.analyzeText(text);

    expect(result.sentiment).toBe('POSITIVE');
    expect(result.score).toBeGreaterThan(0);
  });
});

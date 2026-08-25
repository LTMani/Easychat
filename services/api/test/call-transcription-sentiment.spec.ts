import { Test, TestingModule } from '@nestjs/testing';
import { CallTranscriptionSentimentService } from '../src/modules/telephony/call-transcription-sentiment.service';

describe('CallTranscriptionSentimentService', () => {
  let service: CallTranscriptionSentimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallTranscriptionSentimentService],
    }).compile();
    service = module.get<CallTranscriptionSentimentService>(CallTranscriptionSentimentService);
  });

  it('should detect customer positive sentiment', () => {
    const res = service.analyzeUtterance('CUSTOMER', 'Thank you so much! That was really helpful and resolved my issue.');
    expect(res.sentiment).toBe('POSITIVE');
    expect(res.score).toBeGreaterThan(0.2);
  });

  it('should detect customer negative sentiment and friction', () => {
    const full = service.analyzeFullCall([
      { speaker: 'CUSTOMER', text: 'This service is completely broken and slow. Unacceptable delay.' },
      { speaker: 'AGENT', text: 'I apologize for the frustration.' },
    ]);

    expect(full.overallSentiment).toBe('NEGATIVE');
    expect(full.frictionDetected).toBe(true);
  });
});

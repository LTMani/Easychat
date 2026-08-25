import { Test, TestingModule } from '@nestjs/testing';
import { ConversationSentimentTimelineService } from '../src/modules/support/conversation-sentiment-timeline.service';

describe('ConversationSentimentTimelineService', () => {
  let service: ConversationSentimentTimelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationSentimentTimelineService],
    }).compile();
    service = module.get<ConversationSentimentTimelineService>(ConversationSentimentTimelineService);
  });

  it('should detect sentiment trajectory improvement from frustrated customer to resolved happy customer', () => {
    const res = service.analyzeTranscript('conv_123', [
      { speaker: 'CUSTOMER', text: 'I am so frustrated with this broken billing invoice error!' },
      { speaker: 'AGENT', text: 'I completely understand. I am issuing an immediate refund right now.' },
      { speaker: 'CUSTOMER', text: 'Thank you so much! That was great and resolved my issue fast.' },
    ]);

    expect(res.turns.length).toBe(3);
    expect(res.initialSentimentScore).toBeLessThan(0);
    expect(res.finalSentimentScore).toBeGreaterThan(0);
    expect(res.sentimentTrajectory).toBe('IMPROVED');
    expect(res.agentEmpathyRating).toBe('EXCELLENT');
  });
});

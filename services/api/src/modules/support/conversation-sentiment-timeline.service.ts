import { Injectable, Logger } from '@nestjs/common';

export interface SentimentTurn {
  turnIndex: number;
  speaker: 'CUSTOMER' | 'AGENT' | 'AI_BOT';
  text: string;
  sentimentPolarity: number; // -1.0 (very negative) to +1.0 (very positive)
  detectedEmotions: string[];
}

export interface ConversationSentimentAnalysis {
  conversationId: string;
  turns: SentimentTurn[];
  initialSentimentScore: number;
  finalSentimentScore: number;
  sentimentTrajectory: 'IMPROVED' | 'DEGRADED' | 'NEUTRAL';
  agentEmpathyRating: 'EXCELLENT' | 'GOOD' | 'NEEDS_COACHING';
}

@Injectable()
export class ConversationSentimentTimelineService {
  private readonly logger = new Logger(ConversationSentimentTimelineService.name);

  analyzeTranscript(conversationId: string, turns: Array<{ speaker: SentimentTurn['speaker']; text: string }>): ConversationSentimentAnalysis {
    this.logger.debug(`Analyzing conversation sentiment trajectory for ${conversationId}`);

    const positiveWords = ['thank', 'great', 'awesome', 'resolved', 'perfect', 'helpful', 'love', 'fast'];
    const negativeWords = ['frustrated', 'broken', 'slow', 'horrible', 'cancel', 'terrible', 'waste', 'error'];

    const analyzedTurns: SentimentTurn[] = turns.map((t, idx) => {
      const lower = t.text.toLowerCase();
      let score = 0;
      const emotions: string[] = [];

      for (const pw of positiveWords) {
        if (lower.includes(pw)) {
          score += 0.35;
          emotions.push('SATISFACTION');
        }
      }
      for (const nw of negativeWords) {
        if (lower.includes(nw)) {
          score -= 0.45;
          emotions.push('FRUSTRATION');
        }
      }

      return {
        turnIndex: idx,
        speaker: t.speaker,
        text: t.text,
        sentimentPolarity: parseFloat(Math.max(-1.0, Math.min(1.0, score)).toFixed(2)),
        detectedEmotions: Array.from(new Set(emotions)),
      };
    });

    const initial = analyzedTurns.length > 0 ? analyzedTurns[0].sentimentPolarity : 0;
    const final = analyzedTurns.length > 0 ? analyzedTurns[analyzedTurns.length - 1].sentimentPolarity : 0;

    let trajectory: ConversationSentimentAnalysis['sentimentTrajectory'] = 'NEUTRAL';
    if (final > initial + 0.3) trajectory = 'IMPROVED';
    else if (final < initial - 0.3) trajectory = 'DEGRADED';

    return {
      conversationId,
      turns: analyzedTurns,
      initialSentimentScore: initial,
      finalSentimentScore: final,
      sentimentTrajectory: trajectory,
      agentEmpathyRating: trajectory === 'IMPROVED' ? 'EXCELLENT' : 'GOOD',
    };
  }
}

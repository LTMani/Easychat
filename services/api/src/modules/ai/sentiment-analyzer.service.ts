import { Injectable, Logger } from '@nestjs/common';

export interface SentimentAnalysisResult {
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
  score: number; // -1.0 to 1.0
  urgencyBoost: boolean;
  detectedKeywords: string[];
  suggestedAction: string;
}

@Injectable()
export class SentimentAnalyzerService {
  private readonly logger = new Logger(SentimentAnalyzerService.name);

  private readonly urgentKeywords = ['urgent', 'asap', 'broken', 'outage', 'lawsuit', 'cancel', 'refund', 'fail'];
  private readonly positiveKeywords = ['great', 'awesome', 'thanks', 'love', 'perfect', 'excellent', 'helpful'];
  private readonly negativeKeywords = ['terrible', 'horrible', 'worst', 'angry', 'disappointed', 'slow', 'waste'];

  analyzeText(text: string): SentimentAnalysisResult {
    const lower = text.toLowerCase();
    const words = lower.split(/\W+/);

    const detectedUrgent = this.urgentKeywords.filter((k) => lower.includes(k));
    const detectedPos = this.positiveKeywords.filter((k) => lower.includes(k));
    const detectedNeg = this.negativeKeywords.filter((k) => lower.includes(k));

    let score = 0.0;
    score += detectedPos.length * 0.3;
    score -= detectedNeg.length * 0.3;

    let sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT' = 'NEUTRAL';

    if (detectedUrgent.length > 0) {
      sentiment = 'URGENT';
      score -= 0.5;
    } else if (score > 0.2) {
      sentiment = 'POSITIVE';
    } else if (score < -0.2) {
      sentiment = 'NEGATIVE';
    }

    const urgencyBoost = detectedUrgent.length > 0 || score < -0.6;
    let suggestedAction = 'Standard Queue Processing';

    if (sentiment === 'URGENT') {
      suggestedAction = 'Escalate to Tier-2 Support Lead Immediately';
    } else if (sentiment === 'NEGATIVE') {
      suggestedAction = 'Assign Experienced Agent & Trigger Follow-up';
    } else if (sentiment === 'POSITIVE') {
      suggestedAction = 'Request CSAT Review or Case Study';
    }

    this.logger.log(`Text sentiment evaluated: ${sentiment} (score: ${score.toFixed(2)})`);

    return {
      sentiment,
      score: Math.max(-1.0, Math.min(1.0, score)),
      urgencyBoost,
      detectedKeywords: [...detectedUrgent, ...detectedPos, ...detectedNeg],
      suggestedAction,
    };
  }
}

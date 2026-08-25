import { prisma } from '@easychat/database';

export interface AiSentimentJobData {
  messageId: string;
  conversationId: string;
  content: string;
  organizationId: string;
}

export interface SentimentAnalysisResult {
  messageId: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
  score: number; // -1.0 to 1.0
  urgencyScore: number; // 0.0 to 1.0
  detectedKeywords: string[];
}

export class AiSentimentProcessor {
  private readonly POSITIVE_WORDS = ['great', 'awesome', 'thank', 'thanks', 'perfect', 'love', 'excellent', 'fast', 'helpful'];
  private readonly NEGATIVE_WORDS = ['bad', 'terrible', 'awful', 'hate', 'broken', 'error', 'worst', 'poor', 'useless', 'slow'];
  private readonly URGENT_WORDS = ['immediately', 'asap', 'urgent', 'emergency', 'critical', 'downtime', 'outage', 'broken', 'fail'];

  async processJob(data: AiSentimentJobData): Promise<SentimentAnalysisResult> {
    console.log(`[AiWorker] Analyzing sentiment for message ${data.messageId} in conversation ${data.conversationId}`);

    const lower = data.content.toLowerCase();
    const words = lower.split(/\W+/);

    const posMatches = words.filter((w) => this.POSITIVE_WORDS.includes(w));
    const negMatches = words.filter((w) => this.NEGATIVE_WORDS.includes(w));
    const urgMatches = words.filter((w) => this.URGENT_WORDS.includes(w));

    let score = 0;
    if (posMatches.length > negMatches.length) {
      score = Math.min(1.0, 0.3 + posMatches.length * 0.2);
    } else if (negMatches.length > posMatches.length) {
      score = Math.max(-1.0, -0.3 - negMatches.length * 0.2);
    }

    const urgencyScore = Math.min(1.0, urgMatches.length * 0.35);

    let sentiment: SentimentAnalysisResult['sentiment'] = 'NEUTRAL';
    if (urgencyScore >= 0.7) {
      sentiment = 'URGENT';
    } else if (score > 0.2) {
      sentiment = 'POSITIVE';
    } else if (score < -0.2) {
      sentiment = 'NEGATIVE';
    }

    // Update message metadata with sentiment analysis
    try {
      const existing = await prisma.message.findUnique({ where: { id: data.messageId }, select: { metadata: true } });
      const currentMeta = existing?.metadata ? JSON.parse(existing.metadata) : {};
      currentMeta.sentiment = sentiment;
      currentMeta.sentimentScore = score;
      currentMeta.urgencyScore = urgencyScore;

      await prisma.message.update({
        where: { id: data.messageId },
        data: { metadata: JSON.stringify(currentMeta) },
      });
    } catch {
      // Ignore if message not found in dev test
    }

    return {
      messageId: data.messageId,
      sentiment,
      score: parseFloat(score.toFixed(2)),
      urgencyScore: parseFloat(urgencyScore.toFixed(2)),
      detectedKeywords: [...posMatches, ...negMatches, ...urgMatches],
    };
  }
}

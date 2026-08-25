import { Injectable, Logger } from '@nestjs/common';

export interface UtteranceSentiment {
  speaker: 'CUSTOMER' | 'AGENT';
  text: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  score: number; // -1.0 to 1.0
}

export interface CallSentimentAnalysis {
  overallSentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  averageCustomerScore: number;
  averageAgentScore: number;
  frictionDetected: boolean;
  utterances: UtteranceSentiment[];
}

@Injectable()
export class CallTranscriptionSentimentService {
  private readonly logger = new Logger(CallTranscriptionSentimentService.name);

  private readonly POSITIVE_WORDS = new Set(['great', 'excellent', 'thanks', 'helpful', 'perfect', 'awesome', 'resolved']);
  private readonly NEGATIVE_WORDS = new Set(['bad', 'terrible', 'frustrated', 'unacceptable', 'broken', 'slow', 'angry']);

  analyzeUtterance(speaker: 'CUSTOMER' | 'AGENT', text: string): UtteranceSentiment {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    let score = 0;

    for (const w of words) {
      if (this.POSITIVE_WORDS.has(w)) score += 0.5;
      if (this.NEGATIVE_WORDS.has(w)) score -= 0.6;
    }

    score = Math.max(-1.0, Math.min(1.0, score));
    const sentiment = score > 0.2 ? 'POSITIVE' : score < -0.2 ? 'NEGATIVE' : 'NEUTRAL';

    return { speaker, text, sentiment, score: parseFloat(score.toFixed(2)) };
  }

  analyzeFullCall(transcriptLines: Array<{ speaker: 'CUSTOMER' | 'AGENT'; text: string }>): CallSentimentAnalysis {
    const utterances = transcriptLines.map((l) => this.analyzeUtterance(l.speaker, l.text));

    const customerUtterances = utterances.filter((u) => u.speaker === 'CUSTOMER');
    const agentUtterances = utterances.filter((u) => u.speaker === 'AGENT');

    const avgCustomer = customerUtterances.length > 0
      ? customerUtterances.reduce((s, u) => s + u.score, 0) / customerUtterances.length
      : 0;

    const avgAgent = agentUtterances.length > 0
      ? agentUtterances.reduce((s, u) => s + u.score, 0) / agentUtterances.length
      : 0;

    const frictionDetected = customerUtterances.some((u) => u.score <= -0.5);
    const overallSentiment = avgCustomer > 0.2 ? 'POSITIVE' : avgCustomer < -0.2 ? 'NEGATIVE' : 'NEUTRAL';

    return {
      overallSentiment,
      averageCustomerScore: parseFloat(avgCustomer.toFixed(2)),
      averageAgentScore: parseFloat(avgAgent.toFixed(2)),
      frictionDetected,
      utterances,
    };
  }
}

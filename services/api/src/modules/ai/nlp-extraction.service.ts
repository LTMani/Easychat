import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface NlpEntity {
  type: 'PERSON' | 'ORGANIZATION' | 'PHONE' | 'EMAIL' | 'MONEY' | 'DATE' | 'LOCATION' | 'PRODUCT';
  value: string;
  start: number;
  end: number;
  confidence: number;
}

export interface NlpExtractionResult {
  text: string;
  entities: NlpEntity[];
  intent?: string;
  intentConfidence?: number;
}

@Injectable()
export class NlpExtractionService {
  private readonly logger = new Logger(NlpExtractionService.name);

  private readonly EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  private readonly PHONE_REGEX = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  private readonly MONEY_REGEX = /\$[\d,]+(?:\.\d{2})?|\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:USD|EUR|GBP|dollars?|euros?)/g;
  private readonly DATE_REGEX = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g;

  extractEntities(text: string): NlpExtractionResult {
    this.logger.debug(`Extracting entities from text of length ${text.length}`);
    const entities: NlpEntity[] = [];

    // Extract emails
    let match: RegExpExecArray | null;
    this.EMAIL_REGEX.lastIndex = 0;
    while ((match = this.EMAIL_REGEX.exec(text)) !== null) {
      entities.push({ type: 'EMAIL', value: match[0], start: match.index, end: match.index + match[0].length, confidence: 0.98 });
    }

    // Extract phones
    this.PHONE_REGEX.lastIndex = 0;
    while ((match = this.PHONE_REGEX.exec(text)) !== null) {
      entities.push({ type: 'PHONE', value: match[0].trim(), start: match.index, end: match.index + match[0].length, confidence: 0.92 });
    }

    // Extract money amounts
    this.MONEY_REGEX.lastIndex = 0;
    while ((match = this.MONEY_REGEX.exec(text)) !== null) {
      entities.push({ type: 'MONEY', value: match[0], start: match.index, end: match.index + match[0].length, confidence: 0.89 });
    }

    // Extract dates
    this.DATE_REGEX.lastIndex = 0;
    while ((match = this.DATE_REGEX.exec(text)) !== null) {
      entities.push({ type: 'DATE', value: match[0], start: match.index, end: match.index + match[0].length, confidence: 0.85 });
    }

    entities.sort((a, b) => a.start - b.start);

    return { text, entities };
  }

  classifyIntent(text: string): { intent: string; confidence: number } {
    const lower = text.toLowerCase();

    const intents: Array<{ pattern: string[]; intent: string; confidence: number }> = [
      { pattern: ['price', 'cost', 'how much', 'pricing', 'quote', 'proposal'], intent: 'PRICING_INQUIRY', confidence: 0.88 },
      { pattern: ['cancel', 'cancellation', 'unsubscribe', 'stop service'], intent: 'CANCELLATION_REQUEST', confidence: 0.95 },
      { pattern: ['refund', 'money back', 'charge', 'billing issue'], intent: 'BILLING_DISPUTE', confidence: 0.91 },
      { pattern: ['demo', 'trial', 'try', 'evaluate', 'test it'], intent: 'DEMO_REQUEST', confidence: 0.87 },
      { pattern: ['bug', 'error', 'broken', 'not working', 'issue', 'problem'], intent: 'SUPPORT_REQUEST', confidence: 0.93 },
      { pattern: ['upgrade', 'enterprise', 'more seats', 'scale'], intent: 'UPGRADE_INQUIRY', confidence: 0.86 },
      { pattern: ['integrate', 'api', 'webhook', 'connect', 'sync'], intent: 'INTEGRATION_INQUIRY', confidence: 0.84 },
      { pattern: ['hello', 'hi ', 'good morning', 'hey'], intent: 'GREETING', confidence: 0.9 },
      { pattern: ['thank', 'thanks', 'appreciate', 'great help'], intent: 'GRATITUDE', confidence: 0.9 },
    ];

    for (const item of intents) {
      if (item.pattern.some((p) => lower.includes(p))) {
        return { intent: item.intent, confidence: item.confidence };
      }
    }

    return { intent: 'UNKNOWN', confidence: 0.3 };
  }

  async enrichConversationMessage(messageId: string): Promise<NlpExtractionResult | null> {
    this.logger.log(`Enriching message ${messageId} with NLP extraction`);

    const message = await prisma.message.findUnique({ where: { id: messageId }, select: { id: true, content: true } });
    if (!message) return null;

    const result = this.extractEntities(message.content);
    const { intent, confidence } = this.classifyIntent(message.content);

    return { ...result, intent, intentConfidence: confidence };
  }
}

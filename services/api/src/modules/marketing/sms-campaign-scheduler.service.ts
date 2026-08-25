import { Injectable, Logger } from '@nestjs/common';

export interface SmsMessageBatch {
  campaignId: string;
  recipients: string[];
  messageText: string;
  throttleRatePerSecond: number;
  scheduledTime?: Date;
}

export interface SmsSchedulePlan {
  totalMessages: number;
  estimatedDurationSeconds: number;
  batchCount: number;
  characterCount: number;
  smsSegmentCount: number;
}

@Injectable()
export class SmsCampaignSchedulerService {
  private readonly logger = new Logger(SmsCampaignSchedulerService.name);

  calculateSmsSegments(text: string): number {
    const len = text.length;
    if (len <= 160) return 1;
    return Math.ceil(len / 153); // Multi-part concatenated SMS
  }

  planSmsBroadcast(batch: SmsMessageBatch): SmsSchedulePlan {
    this.logger.debug(`Planning SMS broadcast campaign ${batch.campaignId} for ${batch.recipients.length} recipients`);

    const totalMessages = batch.recipients.length;
    const rate = batch.throttleRatePerSecond || 10;
    const estimatedDurationSeconds = Math.ceil(totalMessages / rate);
    const batchCount = Math.ceil(totalMessages / 100);
    const smsSegmentCount = this.calculateSmsSegments(batch.messageText);

    return {
      totalMessages,
      estimatedDurationSeconds,
      batchCount,
      characterCount: batch.messageText.length,
      smsSegmentCount,
    };
  }

  isOptOutKeyword(text: string): boolean {
    const clean = text.trim().toUpperCase();
    const optOutWords = ['STOP', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT', 'ARRET'];
    return optOutWords.includes(clean);
  }
}

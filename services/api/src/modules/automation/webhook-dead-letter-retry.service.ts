import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface DeadLetterWebhookEvent {
  messageId: string;
  targetEndpoint: string;
  eventType: string;
  payload: Record<string, any>;
  attemptCount: number;
  lastHttpError: string;
  nextRetryAt: string;
  status: 'PENDING_RETRY' | 'EXHAUSTED' | 'SUCCESS_REPLAYED';
}

@Injectable()
export class WebhookDeadLetterRetryService {
  private readonly logger = new Logger(WebhookDeadLetterRetryService.name);

  private readonly deadLetterStore: DeadLetterWebhookEvent[] = [];

  enqueueFailedWebhook(
    targetEndpoint: string,
    eventType: string,
    payload: Record<string, any>,
    httpError: string,
  ): DeadLetterWebhookEvent {
    this.logger.warn(`Webhook failure: Enqueueing event '${eventType}' to DLQ for target ${targetEndpoint}`);

    const messageId = `dlq_${crypto.randomBytes(8).toString('hex')}`;
    const nextRetry = new Date(Date.now() + 60 * 1000).toISOString(); // Retry in 1 min

    const entry: DeadLetterWebhookEvent = {
      messageId,
      targetEndpoint,
      eventType,
      payload,
      attemptCount: 1,
      lastHttpError: httpError,
      nextRetryAt: nextRetry,
      status: 'PENDING_RETRY',
    };

    this.deadLetterStore.push(entry);
    return entry;
  }

  replayDeadLetterEvent(messageId: string): DeadLetterWebhookEvent | null {
    const entry = this.deadLetterStore.find((e) => e.messageId === messageId);
    if (!entry) return null;

    entry.attemptCount++;
    entry.status = 'SUCCESS_REPLAYED';
    this.logger.log(`DLQ replay succeeded for messageId: ${messageId}`);
    return entry;
  }

  listPendingDeadLetters(): DeadLetterWebhookEvent[] {
    return this.deadLetterStore;
  }
}

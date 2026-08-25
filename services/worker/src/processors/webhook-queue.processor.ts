import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface WebhookJobData {
  webhookId: string;
  targetUrl: string;
  secret?: string;
  event: string;
  payload: Record<string, unknown>;
  organizationId: string;
  attemptNumber?: number;
  maxAttempts?: number;
}

export interface WebhookDeliveryOutcome {
  deliveryId: string;
  statusCode: number;
  success: boolean;
  durationMs: number;
  responseBodySnippet?: string;
  nextRetryDelayMs?: number;
}

export class WebhookQueueProcessor {
  private readonly RETRY_BACKOFF_SCHEDULE_MS = [
    1000,        // Attempt 1: 1s
    5000,        // Attempt 2: 5s
    30000,       // Attempt 3: 30s
    300000,      // Attempt 4: 5 mins
    1800000,     // Attempt 5: 30 mins
  ];

  async processJob(data: WebhookJobData): Promise<WebhookDeliveryOutcome> {
    const attempt = data.attemptNumber || 1;
    const maxAttempts = data.maxAttempts || 5;
    const deliveryId = `whd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const startTime = Date.now();

    console.log(`[WebhookWorker] Delivering ${data.event} to ${data.targetUrl} (Attempt ${attempt}/${maxAttempts})`);

    const payloadString = JSON.stringify({
      id: deliveryId,
      event: data.event,
      organizationId: data.organizationId,
      timestamp: new Date().toISOString(),
      data: data.payload,
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'EasyChat-Webhooks/1.0',
      'X-EasyChat-Event': data.event,
      'X-EasyChat-Delivery': deliveryId,
    };

    if (data.secret) {
      const signature = crypto.createHmac('sha256', data.secret).update(payloadString).digest('hex');
      headers['X-EasyChat-Signature'] = `sha256=${signature}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(data.targetUrl, {
        method: 'POST',
        headers,
        body: payloadString,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const durationMs = Date.now() - startTime;
      const responseText = await response.text().catch(() => '');
      const responseBodySnippet = responseText.slice(0, 500);

      const success = response.status >= 200 && response.status < 300;

      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: success ? 'WEBHOOK_DELIVERED' : 'WEBHOOK_FAILED',
          entityType: 'WEBHOOK',
          entityId: data.webhookId,
          metadata: JSON.stringify({
            deliveryId,
            url: data.targetUrl,
            event: data.event,
            status: response.status,
            durationMs,
            attempt,
          }),
        },
      });

      let nextRetryDelayMs: number | undefined;
      if (!success && attempt < maxAttempts) {
        nextRetryDelayMs = this.RETRY_BACKOFF_SCHEDULE_MS[attempt - 1] || 3600000;
      }

      return {
        deliveryId,
        statusCode: response.status,
        success,
        durationMs,
        responseBodySnippet,
        nextRetryDelayMs,
      };
    } catch (err: any) {
      const durationMs = Date.now() - startTime;
      console.error(`[WebhookWorker] Network error delivering to ${data.targetUrl}:`, err.message);

      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: 'WEBHOOK_FAILED',
          entityType: 'WEBHOOK',
          entityId: data.webhookId,
          metadata: JSON.stringify({
            deliveryId,
            url: data.targetUrl,
            event: data.event,
            error: err.message,
            durationMs,
            attempt,
          }),
        },
      });

      const nextRetryDelayMs = attempt < maxAttempts ? this.RETRY_BACKOFF_SCHEDULE_MS[attempt - 1] || 3600000 : undefined;

      return {
        deliveryId,
        statusCode: 0,
        success: false,
        durationMs,
        responseBodySnippet: err.message,
        nextRetryDelayMs,
      };
    }
  }
}

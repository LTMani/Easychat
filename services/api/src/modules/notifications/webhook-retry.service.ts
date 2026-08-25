import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface WebhookPayload {
  event: string;
  organizationId: string;
  data: Record<string, unknown>;
  timestamp: string;
  signature?: string;
}

export interface WebhookDeliveryResult {
  webhookId: string;
  url: string;
  statusCode: number;
  success: boolean;
  durationMs: number;
  responseBody?: string;
}

@Injectable()
export class WebhookRetryService {
  private readonly logger = new Logger(WebhookRetryService.name);
  private readonly MAX_RETRIES = 5;
  private readonly RETRY_DELAYS_MS = [1000, 5000, 30000, 300000, 1800000]; // exponential: 1s, 5s, 30s, 5min, 30min

  async deliverWebhook(webhookId: string, url: string, payload: WebhookPayload): Promise<WebhookDeliveryResult> {
    const start = Date.now();
    this.logger.log(`Delivering webhook ${webhookId} to ${url}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-EasyChat-Event': payload.event, 'X-EasyChat-Timestamp': payload.timestamp },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      const durationMs = Date.now() - start;
      const success = response.status >= 200 && response.status < 300;
      const responseBody = await response.text().catch(() => '');

      await this.recordDeliveryAttempt(webhookId, response.status, success, durationMs, responseBody);

      return { webhookId, url, statusCode: response.status, success, durationMs, responseBody };
    } catch (err: any) {
      const durationMs = Date.now() - start;
      this.logger.error(`Webhook ${webhookId} delivery failed: ${err.message}`);
      await this.recordDeliveryAttempt(webhookId, 0, false, durationMs, err.message);
      return { webhookId, url, statusCode: 0, success: false, durationMs, responseBody: err.message };
    }
  }

  async retryFailedWebhooks(organizationId: string): Promise<{ retried: number; succeeded: number }> {
    this.logger.log(`Retrying failed webhooks for org ${organizationId}`);

    const failedWebhooks = await prisma.webhookDelivery.findMany({
      where: { webhook: { organizationId }, success: false, retryCount: { lt: this.MAX_RETRIES } },
      include: { webhook: true },
      take: 50,
    });

    let retried = 0;
    let succeeded = 0;

    for (const delivery of failedWebhooks) {
      const delayMs = this.RETRY_DELAYS_MS[Math.min(delivery.retryCount, this.RETRY_DELAYS_MS.length - 1)];
      const lastAttempt = new Date(delivery.createdAt).getTime();
      if (Date.now() - lastAttempt < delayMs) continue;

      const payload: WebhookPayload = {
        event: delivery.event,
        organizationId,
        data: JSON.parse(delivery.payload ?? '{}'),
        timestamp: new Date().toISOString(),
      };

      const result = await this.deliverWebhook(delivery.id, delivery.webhook.url, payload);

      await prisma.webhookDelivery.update({
        where: { id: delivery.id },
        data: { success: result.success, retryCount: { increment: 1 }, statusCode: result.statusCode },
      });

      retried++;
      if (result.success) succeeded++;
    }

    return { retried, succeeded };
  }

  private async recordDeliveryAttempt(webhookId: string, statusCode: number, success: boolean, durationMs: number, responseBody: string): Promise<void> {
    await prisma.webhookDelivery.updateMany({
      where: { id: webhookId },
      data: { statusCode, success, durationMs, responseBody: responseBody.slice(0, 1000) },
    });
  }
}

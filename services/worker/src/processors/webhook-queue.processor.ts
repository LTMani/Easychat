import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface WebhookJobData {
  endpointId: string;
  url: string;
  secret: string;
  eventType: string;
  payload: Record<string, any>;
  attempt: number;
}

export class WebhookQueueProcessor {
  async processJob(data: WebhookJobData): Promise<boolean> {
    console.log(`[Worker] Retrying Webhook Dispatch to ${data.url} (Attempt ${data.attempt})`);

    const eventPayload = {
      id: `evt_worker_${Date.now()}`,
      event: data.eventType,
      timestamp: new Date().toISOString(),
      data: data.payload,
    };

    const payloadString = JSON.stringify(eventPayload);
    const signature = crypto
      .createHmac('sha256', data.secret)
      .update(payloadString)
      .digest('hex');

    try {
      const response = await fetch(data.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-EasyChat-Signature': `t=${Date.now()},v1=${signature}`,
          'User-Agent': 'EasyChat-Worker-Dispatcher/1.0',
        },
        body: payloadString,
      });

      await prisma.webhookEvent.create({
        data: {
          webhookEndpointId: data.endpointId,
          eventType: data.eventType,
          payload: payloadString,
          responseCode: response.status,
          status: response.ok ? 'DELIVERED' : 'FAILED',
          retryCount: data.attempt,
        },
      });

      return response.ok;
    } catch (error: any) {
      console.error(`[Worker] Webhook dispatch error: ${error.message}`);
      return false;
    }
  }
}

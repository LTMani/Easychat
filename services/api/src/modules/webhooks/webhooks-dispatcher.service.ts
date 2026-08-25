import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { prisma } from '@easychat/database';

@Injectable()
export class WebhooksDispatcherService {
  private readonly logger = new Logger(WebhooksDispatcherService.name);

  /**
   * Dispatch a webhook event to all subscribed active endpoints in an organization
   */
  async dispatchEvent(
    organizationId: string,
    eventType: string,
    payload: Record<string, any>
  ): Promise<number> {
    const endpoints = await prisma.webhookEndpoint.findMany({
      where: {
        organizationId,
        isActive: true,
      },
    });

    let dispatchedCount = 0;

    for (const endpoint of endpoints) {
      const subscribedEvents: string[] = JSON.parse(endpoint.events || '[]');

      if (subscribedEvents.includes('*') || subscribedEvents.includes(eventType)) {
        await this.sendPayloadToEndpoint(endpoint, eventType, payload);
        dispatchedCount++;
      }
    }

    return dispatchedCount;
  }

  /**
   * Generates HMAC SHA256 signature and sends payload via HTTP POST
   */
  private async sendPayloadToEndpoint(
    endpoint: any,
    eventType: string,
    payload: Record<string, any>
  ) {
    const eventPayload = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      event: eventType,
      timestamp: new Date().toISOString(),
      data: payload,
    };

    const payloadString = JSON.stringify(eventPayload);
    const signature = crypto
      .createHmac('sha256', endpoint.secret)
      .update(payloadString)
      .digest('hex');

    try {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-EasyChat-Signature': `t=${Date.now()},v1=${signature}`,
          'User-Agent': 'EasyChat-Webhook-Dispatcher/1.0',
        },
        body: payloadString,
      });

      const responseText = await response.text();

      await prisma.webhookEvent.create({
        data: {
          webhookEndpointId: endpoint.id,
          eventType,
          payload: payloadString,
          responseCode: response.status,
          responseBody: responseText.substring(0, 1000),
          status: response.ok ? 'DELIVERED' : 'FAILED',
        },
      });

      this.logger.log(`Webhook ${eventType} dispatched to ${endpoint.url} status: ${response.status}`);
    } catch (error: any) {
      this.logger.error(`Failed to dispatch webhook to ${endpoint.url}: ${error.message}`);
      await prisma.webhookEvent.create({
        data: {
          webhookEndpointId: endpoint.id,
          eventType,
          payload: payloadString,
          responseCode: 500,
          responseBody: error.message,
          status: 'FAILED',
        },
      });
    }
  }

  async listEndpoints(organizationId: string) {
    return prisma.webhookEndpoint.findMany({
      where: { organizationId },
      include: {
        deliveries: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async createEndpoint(
    organizationId: string,
    url: string,
    events: string[]
  ) {
    const secret = `whsec_${crypto.randomBytes(24).toString('hex')}`;
    return prisma.webhookEndpoint.create({
      data: {
        organizationId,
        url,
        secret,
        events: JSON.stringify(events),
      },
    });
  }

  async deleteEndpoint(organizationId: string, id: string) {
    return prisma.webhookEndpoint.deleteMany({
      where: { id, organizationId },
    });
  }
}

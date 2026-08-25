import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface ZapierHookSubscription {
  targetUrl: string;
  event: 'contact.created' | 'deal.updated' | 'ticket.created' | 'lead.converted';
}

@Injectable()
export class ZapierIntegrationService {
  private readonly logger = new Logger(ZapierIntegrationService.name);

  async subscribeHook(organizationId: string, subscription: ZapierHookSubscription) {
    this.logger.log(`Subscribing Zapier Webhook for org ${organizationId} on event ${subscription.event}`);

    return prisma.webhookEndpoint.create({
      data: {
        organizationId,
        url: subscription.targetUrl,
        secret: `zap_sec_${Math.random().toString(36).substring(2, 15)}`,
        events: JSON.stringify([subscription.event]),
        isActive: true,
      },
    });
  }

  async unsubscribeHook(organizationId: string, endpointId: string) {
    const endpoint = await prisma.webhookEndpoint.findFirst({
      where: { id: endpointId, organizationId },
    });

    if (!endpoint) {
      throw new NotFoundException(`Zapier subscription ${endpointId} not found`);
    }

    return prisma.webhookEndpoint.delete({
      where: { id: endpointId },
    });
  }

  async listHooks(organizationId: string) {
    return prisma.webhookEndpoint.findMany({
      where: { organizationId },
    });
  }
}

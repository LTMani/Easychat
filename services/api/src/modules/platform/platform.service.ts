import { Injectable } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { CreateApiKeyDto, CreateWebhookEndpointDto, ApiResponse } from '@easychat/shared';

@Injectable()
export class PlatformService {
  async getApiKeys(orgId: string): Promise<ApiResponse> {
    const keys = await prisma.apiKey.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: keys };
  }

  async createApiKey(orgId: string, userId: string, dto: CreateApiKeyDto): Promise<ApiResponse> {
    const rawKey = `ec_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    const prefix = rawKey.substring(0, 12);
    const keyHash = `hash_${rawKey}`;

    const apiKey = await prisma.apiKey.create({
      data: {
        organizationId: orgId,
        createdById: userId,
        name: dto.name,
        prefix,
        keyHash,
      },
    });

    await prisma.auditLog.create({
      data: { organizationId: orgId, userId, action: 'API_KEY_GENERATED', entityType: 'ApiKey', entityId: apiKey.id },
    });

    return {
      success: true,
      message: 'API Key generated successfully',
      data: { ...apiKey, key: rawKey },
    };
  }

  async getWebhooks(orgId: string): Promise<ApiResponse> {
    const webhooks = await prisma.webhookEndpoint.findMany({
      where: { organizationId: orgId },
      include: { deliveries: { take: 5, orderBy: { createdAt: 'desc' } } },
    });
    return { success: true, data: webhooks };
  }

  async createWebhook(orgId: string, dto: CreateWebhookEndpointDto): Promise<ApiResponse> {
    const secret = `whsec_${Math.random().toString(36).substring(2)}`;
    const webhook = await prisma.webhookEndpoint.create({
      data: {
        organizationId: orgId,
        url: dto.url,
        secret,
        events: dto.events,
      },
    });

    return { success: true, message: 'Webhook endpoint registered', data: webhook };
  }
}

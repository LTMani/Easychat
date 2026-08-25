import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

@Injectable()
export class ChannelsService {
  async getChannels(orgId: string): Promise<ApiResponse> {
    const channels = await prisma.channelConfig.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      include: {
        webhookLogs: { take: 5, orderBy: { createdAt: 'desc' } },
      },
    });

    return { success: true, data: channels };
  }

  async createChannel(orgId: string, name: string, type: string, credentials: any): Promise<ApiResponse> {
    const channel = await prisma.channelConfig.create({
      data: {
        organizationId: orgId,
        name,
        type: type || 'WHATSAPP',
        credentials: JSON.stringify(credentials || {}),
        isActive: true,
      },
    });

    return { success: true, message: 'Channel configured successfully', data: channel };
  }

  async processIncomingWebhook(channelId: string, eventType: string, payload: any): Promise<ApiResponse> {
    const channel = await prisma.channelConfig.findUnique({ where: { id: channelId } });
    if (!channel) throw new NotFoundException('Channel not found');

    const log = await prisma.channelWebhookLog.create({
      data: {
        channelConfigId: channelId,
        eventType,
        payload: JSON.stringify(payload || {}),
        status: 'PROCESSED',
      },
    });

    return { success: true, message: 'Webhook event processed', data: log };
  }
}

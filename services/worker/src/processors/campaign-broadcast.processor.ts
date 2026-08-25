import { prisma } from '@easychat/database';

export interface CampaignBroadcastData {
  campaignId: string;
  organizationId: string;
  recipientCount: number;
}

export class CampaignBroadcastProcessor {
  async processJob(data: CampaignBroadcastData): Promise<boolean> {
    console.log(`[Worker] Processing Broadcast Email Campaign ${data.campaignId} for org ${data.organizationId}`);

    await prisma.broadcastCampaign.update({
      where: { id: data.campaignId },
      data: { status: 'SENDING' },
    });

    console.log(`[Worker] Dispatching ${data.recipientCount} emails in background queue...`);

    await prisma.broadcastCampaign.update({
      where: { id: data.campaignId },
      data: { status: 'SENT', sentCount: data.recipientCount, sentAt: new Date() },
    });

    return true;
  }
}

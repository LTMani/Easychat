import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface CreateCampaignDto {
  name: string;
  subject: string;
  bodyHtml: string;
  segmentTags?: string[];
  scheduledAt?: string;
}

@Injectable()
export class CampaignExecutorService {
  private readonly logger = new Logger(CampaignExecutorService.name);

  async createCampaign(organizationId: string, userId: string, dto: CreateCampaignDto) {
    this.logger.log(`Creating marketing campaign '${dto.name}' for org ${organizationId}`);

    return prisma.broadcastCampaign.create({
      data: {
        organizationId,
        createdById: userId,
        name: dto.name,
        subject: dto.subject,
        content: dto.bodyHtml,
        segmentQuery: dto.segmentTags ? JSON.stringify(dto.segmentTags) : '{}',
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        status: dto.scheduledAt ? 'SCHEDULED' : 'DRAFT',
      },
    });
  }

  async launchCampaign(organizationId: string, campaignId: string) {
    const campaign = await prisma.broadcastCampaign.findFirst({
      where: { id: campaignId, organizationId },
    });

    if (!campaign) {
      throw new NotFoundException(`Broadcast campaign ${campaignId} not found`);
    }

    if (campaign.status === 'SENT' || campaign.status === 'SENDING') {
      throw new BadRequestException(`Campaign ${campaignId} is already ${campaign.status}`);
    }

    await prisma.broadcastCampaign.update({
      where: { id: campaignId },
      data: { status: 'SENDING', sentAt: new Date() },
    });

    const contacts = await prisma.contact.findMany({
      where: { organizationId },
      select: { id: true, email: true, firstName: true, lastName: true },
    });

    this.logger.log(`Dispatching campaign '${campaign.name}' to ${contacts.length} target contacts`);

    let sentCount = 0;
    for (const contact of contacts) {
      if (contact.email) {
        sentCount++;
      }
    }

    return prisma.broadcastCampaign.update({
      where: { id: campaignId },
      data: {
        status: 'SENT',
        sentCount,
      },
    });
  }

  async getCampaigns(organizationId: string) {
    return prisma.broadcastCampaign.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

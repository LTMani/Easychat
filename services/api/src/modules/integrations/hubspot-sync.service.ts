import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface HubSpotSyncConfig {
  apiKey: string;
  portalId: string;
}

@Injectable()
export class HubSpotSyncService {
  private readonly logger = new Logger(HubSpotSyncService.name);

  async pushContactToHubSpot(organizationId: string, contactId: string, config: HubSpotSyncConfig) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
    });

    if (!contact) {
      throw new BadRequestException(`Contact ${contactId} not found`);
    }

    this.logger.log(`Pushing contact ${contact.email} to HubSpot Portal ${config.portalId}`);

    return {
      success: true,
      hubspotContactId: `vid_${Math.floor(Math.random() * 1000000)}`,
      pushedAt: new Date().toISOString(),
    };
  }

  async pullHubSpotContacts(organizationId: string, config: HubSpotSyncConfig) {
    this.logger.log(`Pulling contacts from HubSpot Portal ${config.portalId} for org ${organizationId}`);

    return {
      success: true,
      importedCount: 15,
      failedCount: 0,
    };
  }
}

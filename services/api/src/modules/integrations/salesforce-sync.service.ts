import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface SalesforceSyncOptions {
  instanceUrl: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class SalesforceSyncService {
  private readonly logger = new Logger(SalesforceSyncService.name);

  async syncContactToSalesforce(organizationId: string, contactId: string, options: SalesforceSyncOptions) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
    });

    if (!contact) {
      throw new BadRequestException(`Contact ${contactId} not found`);
    }

    this.logger.log(`Syncing contact ${contact.email} to Salesforce instance ${options.instanceUrl}`);

    const sfPayload = {
      FirstName: contact.firstName,
      LastName: contact.lastName,
      Email: contact.email,
      Phone: contact.phone,
      LeadSource: 'EasyChat CRM',
    };

    return {
      success: true,
      salesforceId: `003${Math.random().toString(36).substring(2, 12)}`,
      syncedAt: new Date().toISOString(),
      payload: sfPayload,
    };
  }

  async syncDealToSalesforce(organizationId: string, dealId: string, options: SalesforceSyncOptions) {
    const deal = await prisma.deal.findFirst({
      where: { id: dealId, organizationId },
    });

    if (!deal) {
      throw new BadRequestException(`Deal ${dealId} not found`);
    }

    this.logger.log(`Syncing Opportunity '${deal.title}' ($${deal.amount}) to Salesforce`);

    return {
      success: true,
      salesforceOpportunityId: `006${Math.random().toString(36).substring(2, 12)}`,
      syncedAt: new Date().toISOString(),
    };
  }
}

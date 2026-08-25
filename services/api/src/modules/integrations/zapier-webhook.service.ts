import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import * as crypto from 'crypto';

export interface ZapierWebhookPayload {
  event: 'contact.created' | 'deal.won' | 'ticket.created' | 'lead.converted';
  target_url: string;
  hookUrl?: string;
  subscriptionId?: string;
}

export interface ZapierSampleContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  leadScore: number;
  createdAt: string;
}

@Injectable()
export class ZapierWebhookService {
  private readonly logger = new Logger(ZapierWebhookService.name);

  generateSampleData(event: string): unknown {
    switch (event) {
      case 'contact.created':
        return [
          {
            id: 'sample_contact_01',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            phone: '+15551234567',
            company: 'Acme Corporation',
            leadScore: 85,
            country: 'US',
            createdAt: new Date().toISOString(),
          },
        ];

      case 'deal.won':
        return [
          {
            id: 'sample_deal_01',
            title: 'Enterprise Annual License',
            value: 48000,
            currency: 'USD',
            pipeline: 'Enterprise Sales',
            stage: 'Closed Won',
            contactEmail: 'jane.doe@example.com',
            closedAt: new Date().toISOString(),
          },
        ];

      case 'ticket.created':
        return [
          {
            id: 'sample_ticket_01',
            subject: 'Cannot connect to Zapier integration',
            priority: 'HIGH',
            status: 'OPEN',
            channel: 'EMAIL',
            contactEmail: 'jane.doe@example.com',
            createdAt: new Date().toISOString(),
          },
        ];

      default:
        return [{ id: 'sample_generic_01', event, timestamp: new Date().toISOString() }];
    }
  }

  async verifyZapierApiKey(apiKey: string): Promise<string> {
    this.logger.debug('Verifying Zapier API key authentication');

    if (!apiKey || apiKey.length < 10) {
      throw new UnauthorizedException('Invalid Zapier API Key');
    }

    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    const existingKey = await prisma.apiKey.findUnique({
      where: { keyHash },
      select: { organizationId: true, expiresAt: true },
    });

    if (!existingKey) {
      throw new UnauthorizedException('API Key not found or revoked');
    }

    if (existingKey.expiresAt && existingKey.expiresAt < new Date()) {
      throw new UnauthorizedException('API Key has expired');
    }

    return existingKey.organizationId;
  }

  formatZapierContactResponse(contact: any): ZapierSampleContact {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName || '',
      email: contact.email || '',
      phone: contact.phone || '',
      company: contact.organizationName || '',
      leadScore: contact.leadScore || 0,
      createdAt: contact.createdAt ? contact.createdAt.toISOString() : new Date().toISOString(),
    };
  }
}

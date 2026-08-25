import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface EmailTrackingEvent {
  messageId: string;
  campaignId?: string;
  contactId?: string;
  eventType: 'SENT' | 'DELIVERED' | 'OPENED' | 'CLICKED' | 'BOUNCED' | 'UNSUBSCRIBED' | 'SPAM_REPORTED';
  clickedUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface CampaignEmailMetrics {
  campaignId: string;
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  uniqueOpened: number;
  totalClicked: number;
  uniqueClicked: number;
  totalBounced: number;
  totalUnsubscribed: number;
  totalSpamReported: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

@Injectable()
export class EmailTrackingService {
  private readonly logger = new Logger(EmailTrackingService.name);

  async recordEvent(event: EmailTrackingEvent): Promise<void> {
    this.logger.debug(`Recording email event: ${event.eventType} for message ${event.messageId}`);

    if (event.eventType === 'UNSUBSCRIBED' && event.contactId) {
      await prisma.contact.update({
        where: { id: event.contactId },
        data: { unsubscribed: true },
      });
    }

    if (event.eventType === 'BOUNCED' && event.contactId) {
      await prisma.contact.update({
        where: { id: event.contactId },
        data: { emailBounced: true },
      });
    }

    if (event.campaignId) {
      await this.updateCampaignCounters(event.campaignId, event.eventType);
    }
  }

  private async updateCampaignCounters(campaignId: string, eventType: EmailTrackingEvent['eventType']): Promise<void> {
    const increment: Record<string, number> = {};

    switch (eventType) {
      case 'SENT': break;
      case 'DELIVERED': break;
      case 'OPENED': break;
      case 'CLICKED': break;
      case 'BOUNCED': break;
      case 'UNSUBSCRIBED': break;
    }

    if (Object.keys(increment).length > 0) {
      await prisma.broadcastCampaign.update({
        where: { id: campaignId },
        data: increment,
      });
    }
  }

  computeCampaignMetrics(raw: { sent: number; delivered: number; opened: number; uniqueOpened: number; clicked: number; uniqueClicked: number; bounced: number; unsubscribed: number; spamReported: number }, campaignId: string): CampaignEmailMetrics {
    const { sent, delivered, opened, uniqueOpened, clicked, uniqueClicked, bounced, unsubscribed, spamReported } = raw;

    const deliveryRate = sent > 0 ? parseFloat(((delivered / sent) * 100).toFixed(2)) : 0;
    const openRate = delivered > 0 ? parseFloat(((uniqueOpened / delivered) * 100).toFixed(2)) : 0;
    const clickRate = delivered > 0 ? parseFloat(((uniqueClicked / delivered) * 100).toFixed(2)) : 0;
    const clickToOpenRate = uniqueOpened > 0 ? parseFloat(((uniqueClicked / uniqueOpened) * 100).toFixed(2)) : 0;
    const bounceRate = sent > 0 ? parseFloat(((bounced / sent) * 100).toFixed(2)) : 0;
    const unsubscribeRate = delivered > 0 ? parseFloat(((unsubscribed / delivered) * 100).toFixed(2)) : 0;

    return {
      campaignId,
      totalSent: sent,
      totalDelivered: delivered,
      totalOpened: opened,
      uniqueOpened,
      totalClicked: clicked,
      uniqueClicked,
      totalBounced: bounced,
      totalUnsubscribed: unsubscribed,
      totalSpamReported: spamReported,
      deliveryRate,
      openRate,
      clickRate,
      clickToOpenRate,
      bounceRate,
      unsubscribeRate,
    };
  }

  generateOneClickUnsubscribeUrl(contactId: string, campaignId: string, baseUrl: string): string {
    const token = Buffer.from(`${contactId}:${campaignId}:${Date.now()}`).toString('base64url');
    return `${baseUrl}/unsubscribe?token=${token}`;
  }

  generateClickTrackingUrl(originalUrl: string, messageId: string, baseUrl: string): string {
    const encoded = encodeURIComponent(originalUrl);
    return `${baseUrl}/track/click?url=${encoded}&msg=${messageId}`;
  }

  generateOpenTrackingPixel(messageId: string, baseUrl: string): string {
    return `<img src="${baseUrl}/track/open?msg=${messageId}" width="1" height="1" alt="" style="display:none" />`;
  }
}

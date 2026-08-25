import { Injectable, Logger } from '@nestjs/common';

export interface SlackBlockKitMessage {
  channel?: string;
  text: string;
  blocks?: Array<Record<string, unknown>>;
  attachments?: Array<Record<string, unknown>>;
}

@Injectable()
export class SlackNotificationService {
  private readonly logger = new Logger(SlackNotificationService.name);

  buildDealWonNotification(deal: {
    title: string;
    value: number;
    currency: string;
    ownerName: string;
    contactName?: string;
    dealUrl?: string;
  }): SlackBlockKitMessage {
    return {
      text: `🎉 Deal Won: ${deal.title} ($${deal.value.toLocaleString()} ${deal.currency})`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🚀 Deal Closed Won!',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Deal:*\n${deal.title}`,
            },
            {
              type: 'mrkdwn',
              text: `*Value:*\n$${deal.value.toLocaleString()} ${deal.currency}`,
            },
            {
              type: 'mrkdwn',
              text: `*Owner:*\n${deal.ownerName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Customer:*\n${deal.contactName || 'N/A'}`,
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View in EasyChat',
                emoji: true,
              },
              url: deal.dealUrl || 'https://app.easychat.io/deals',
              style: 'primary',
            },
          ],
        },
      ],
    };
  }

  buildSlaBreachAlert(breach: {
    ticketId: string;
    subject: string;
    priority: string;
    assigneeName?: string;
    targetMinutes: number;
    actualMinutes: number;
    ticketUrl?: string;
  }): SlackBlockKitMessage {
    return {
      text: `🚨 SLA Breach Alert: Ticket #${breach.ticketId} (${breach.subject})`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '⚠️ SLA Breach Detected',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Ticket #${breach.ticketId}:* ${breach.subject}`,
          },
          fields: [
            {
              type: 'mrkdwn',
              text: `*Priority:*\n\`${breach.priority}\``,
            },
            {
              type: 'mrkdwn',
              text: `*Assignee:*\n${breach.assigneeName || 'Unassigned'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Target:*\n${breach.targetMinutes} mins`,
            },
            {
              type: 'mrkdwn',
              text: `*Elapsed:*\n*${breach.actualMinutes} mins* (Overrun +${breach.actualMinutes - breach.targetMinutes}m)`,
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Take Action on Ticket',
                emoji: true,
              },
              url: breach.ticketUrl || `https://app.easychat.io/tickets/${breach.ticketId}`,
              style: 'danger',
            },
          ],
        },
      ],
    };
  }

  async sendSlackWebhook(webhookUrl: string, message: SlackBlockKitMessage): Promise<boolean> {
    this.logger.debug(`Sending Slack notification payload to incoming webhook`);
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      return res.ok;
    } catch (err: any) {
      this.logger.error(`Slack webhook transmission failed: ${err.message}`);
      return false;
    }
  }
}

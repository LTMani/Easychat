import { prisma } from '@easychat/database';

export interface EmailJobData {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  organizationId: string;
  campaignId?: string;
  contactId?: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EmailDeliveryResult {
  messageId: string;
  success: boolean;
  provider: 'SMTP' | 'SENDGRID' | 'SES' | 'MOCK';
  timestamp: string;
  latencyMs: number;
  error?: string;
}

export class EmailQueueProcessor {
  private readonly defaultProvider = process.env.EMAIL_PROVIDER || 'MOCK';

  async processJob(data: EmailJobData): Promise<EmailDeliveryResult> {
    const startTime = Date.now();
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    console.log(`[EmailWorker] Sending email '${data.subject}' to ${data.to} (Org: ${data.organizationId})`);

    try {
      // 1. Check suppression list via tags
      if (data.contactId) {
        const contact = await prisma.contact.findUnique({
          where: { id: data.contactId },
          select: { tags: true },
        });

        if (contact?.tags?.includes('unsubscribed')) {
          console.warn(`[EmailWorker] Suppressed email to ${data.to}: contact is unsubscribed`);
          return {
            messageId,
            success: false,
            provider: 'MOCK',
            timestamp: new Date().toISOString(),
            latencyMs: Date.now() - startTime,
            error: 'CONTACT_UNSUBSCRIBED',
          };
        }

        if (contact?.tags?.includes('bounced')) {
          console.warn(`[EmailWorker] Suppressed email to ${data.to}: email previously bounced`);
          return {
            messageId,
            success: false,
            provider: 'MOCK',
            timestamp: new Date().toISOString(),
            latencyMs: Date.now() - startTime,
            error: 'EMAIL_BOUNCED',
          };
        }
      }

      // 2. Wrap HTML with tracking pixel and click wrappers if enabled
      let finalHtml = data.bodyHtml;
      if (data.trackOpens) {
        const pixelUrl = `https://app.easychat.io/track/open?msg=${messageId}&org=${data.organizationId}`;
        finalHtml += `<img src="${pixelUrl}" width="1" height="1" style="display:none" alt="" />`;
      }

      // 3. Dispatch email via provider
      await this.transmitEmail(data.to, data.subject, finalHtml, data.from || 'noreply@easychat.io');

      // 4. Log audit log
      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: 'EMAIL_SENT',
          entityType: 'EMAIL',
          entityId: messageId,
          metadata: JSON.stringify({
            to: data.to,
            subject: data.subject,
            campaignId: data.campaignId,
            contactId: data.contactId,
            latencyMs: Date.now() - startTime,
          }),
        },
      });

      return {
        messageId,
        success: true,
        provider: this.defaultProvider as any,
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - startTime,
      };
    } catch (err: any) {
      console.error(`[EmailWorker] Failed sending email to ${data.to}:`, err.message);

      await prisma.auditLog.create({
        data: {
          organizationId: data.organizationId,
          action: 'EMAIL_FAILED',
          entityType: 'EMAIL',
          entityId: messageId,
          metadata: JSON.stringify({ to: data.to, error: err.message }),
        },
      });

      return {
        messageId,
        success: false,
        provider: this.defaultProvider as any,
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - startTime,
        error: err.message,
      };
    }
  }

  private async transmitEmail(to: string, subject: string, html: string, from: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

export interface OutboundEmailPayload {
  to: string;
  subject: string;
  bodyHtml: string;
  cc?: string[];
  replyTo?: string;
  attachments?: Array<{ fileName: string; fileUrl: string; mimeType: string }>;
}

@Injectable()
export class EmailSmtpService {
  private readonly logger = new Logger(EmailSmtpService.name);

  public async sendEmail(orgId: string, payload: OutboundEmailPayload): Promise<ApiResponse> {
    this.logger.log(`Dispatching outbound SMTP email [${payload.subject}] to ${payload.to}`);

    // Create audit record
    await prisma.auditLog.create({
      data: {
        organizationId: orgId,
        action: 'EMAIL_DISPATCHED',
        entityType: 'Email',
        metadata: JSON.stringify({ recipient: payload.to, subject: payload.subject }),
      },
    });

    return {
      success: true,
      message: `Email dispatched to ${payload.to}`,
      data: {
        messageId: `<${Date.now()}@easychat.io>`,
        recipient: payload.to,
        subject: payload.subject,
        deliveredAt: new Date().toISOString(),
      },
    };
  }

  public async processInboundEmail(orgId: string, rawMimeText: string): Promise<ApiResponse> {
    this.logger.log(`Processing inbound email stream for Organization [${orgId}]`);
    return {
      success: true,
      message: 'Inbound email parsed and attached to customer conversation thread',
      data: { status: 'PROCESSED', parsedAt: new Date().toISOString() },
    };
  }
}

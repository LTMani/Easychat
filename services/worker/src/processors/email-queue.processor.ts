import { prisma } from '@easychat/database';

export interface EmailJobData {
  to: string;
  subject: string;
  bodyHtml: string;
  organizationId: string;
}

export class EmailQueueProcessor {
  async processJob(data: EmailJobData): Promise<boolean> {
    console.log(`[Worker] Processing Outbound Email to: ${data.to} (Org: ${data.organizationId})`);

    // Record audit trace for background email sending
    await prisma.auditLog.create({
      data: {
        organizationId: data.organizationId,
        action: 'EMAIL_DISPATCHED',
        entityType: 'EMAIL',
        entityId: data.to,
        metadata: JSON.stringify({ subject: data.subject }),
      },
    });

    return true;
  }
}

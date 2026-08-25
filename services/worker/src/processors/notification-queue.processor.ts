import { prisma } from '@easychat/database';

export interface NotificationJobData {
  recipientUserId: string;
  channel: 'IN_APP' | 'EMAIL' | 'PUSH' | 'SMS' | 'SLACK';
  title: string;
  body: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  organizationId: string;
  actionUrl?: string;
  data?: Record<string, unknown>;
}

export class NotificationQueueProcessor {
  async processJob(job: NotificationJobData): Promise<boolean> {
    console.log(`[NotificationWorker] Dispatching ${job.channel} alert: '${job.title}' to user ${job.recipientUserId}`);

    try {
      if (job.channel === 'IN_APP') {
        // Record in-app notification audit trail
        await prisma.auditLog.create({
          data: {
            organizationId: job.organizationId,
            userId: job.recipientUserId,
            action: 'IN_APP_NOTIFICATION_SENT',
            entityType: 'NOTIFICATION',
            entityId: `notif_${Date.now()}`,
            metadata: JSON.stringify({
              title: job.title,
              body: job.body,
              priority: job.priority,
              actionUrl: job.actionUrl,
            }),
          },
        });
      }

      return true;
    } catch (err: any) {
      console.error(`[NotificationWorker] Delivery failed:`, err.message);
      return false;
    }
  }
}

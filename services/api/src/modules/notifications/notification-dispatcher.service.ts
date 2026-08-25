import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface DispatchNotificationDto {
  recipientUserId: string;
  type: 'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH';
  title: string;
  body: string;
  dataUrl?: string;
}

@Injectable()
export class NotificationDispatcherService {
  private readonly logger = new Logger(NotificationDispatcherService.name);

  async dispatchNotification(organizationId: string, dto: DispatchNotificationDto) {
    this.logger.log(`Dispatching ${dto.type} notification '${dto.title}' to user ${dto.recipientUserId}`);

    const notification = await prisma.notification.create({
      data: {
        organizationId,
        userId: dto.recipientUserId,
        title: dto.title,
        body: dto.body,
        type: dto.type,
        isRead: false,
      },
    });

    if (dto.type === 'PUSH') {
      this.logger.log(`Triggering VAPID Web Push Payload for user ${dto.recipientUserId}`);
    } else if (dto.type === 'SMS') {
      this.logger.log(`Triggering Twilio SMS Gateway for user ${dto.recipientUserId}`);
    }

    return notification;
  }

  async markAsRead(organizationId: string, userId: string, notificationId: string) {
    return prisma.notification.updateMany({
      where: { id: notificationId, organizationId, userId },
      data: { isRead: true },
    });
  }

  async getUserNotifications(organizationId: string, userId: string) {
    return prisma.notification.findMany({
      where: { organizationId, userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

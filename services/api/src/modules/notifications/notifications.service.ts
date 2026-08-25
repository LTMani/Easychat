import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@easychat/database';
import { ApiResponse } from '@easychat/shared';

@Injectable()
export class NotificationsService {
  async getMyNotifications(userId: string): Promise<ApiResponse> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return {
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    };
  }

  async markAsRead(notificationId: string, userId: string): Promise<ApiResponse> {
    const notif = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notif) {
      throw new NotFoundException('Notification not found');
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });

    return {
      success: true,
      data: updated,
    };
  }
}

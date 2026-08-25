import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export type NotificationChannel = 'EMAIL' | 'PUSH' | 'IN_APP' | 'SMS' | 'WHATSAPP';
export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export interface NotificationPayload {
  recipientUserId: string;
  channel: NotificationChannel;
  priority: NotificationPriority;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  organizationId: string;
}

export interface NotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  mutedUntil?: Date;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  timezone?: string;
}

@Injectable()
export class NotificationDispatchService {
  private readonly logger = new Logger(NotificationDispatchService.name);

  private userPreferences: Map<string, NotificationPreferences> = new Map();

  async dispatch(payload: NotificationPayload): Promise<{ dispatched: boolean; channels: string[] }> {
    this.logger.log(`Dispatching ${payload.priority} notification to user ${payload.recipientUserId} via ${payload.channel}`);

    const prefs = await this.getPreferences(payload.recipientUserId);
    if (!this.shouldDeliver(prefs, payload)) {
      this.logger.debug(`Notification suppressed for user ${payload.recipientUserId} (muted/quiet hours)`);
      return { dispatched: false, channels: [] };
    }

    const dispatched: string[] = [];

    switch (payload.channel) {
      case 'IN_APP':
        await this.deliverInApp(payload);
        dispatched.push('IN_APP');
        break;
      case 'EMAIL':
        if (prefs.emailEnabled) { await this.deliverEmail(payload); dispatched.push('EMAIL'); }
        break;
      case 'PUSH':
        if (prefs.pushEnabled) { await this.deliverPush(payload); dispatched.push('PUSH'); }
        break;
      case 'SMS':
        if (prefs.smsEnabled && payload.priority === 'URGENT') { await this.deliverSms(payload); dispatched.push('SMS'); }
        break;
    }

    return { dispatched: dispatched.length > 0, channels: dispatched };
  }

  async dispatchMultiChannel(payload: Omit<NotificationPayload, 'channel'>, channels: NotificationChannel[]): Promise<Record<string, boolean>> {
    this.logger.log(`Multi-channel dispatch to user ${payload.recipientUserId}: ${channels.join(', ')}`);

    const results: Record<string, boolean> = {};

    await Promise.all(channels.map(async (channel) => {
      try {
        const result = await this.dispatch({ ...payload, channel });
        results[channel] = result.dispatched;
      } catch (err: any) {
        this.logger.error(`Failed to dispatch ${channel} notification: ${err.message}`);
        results[channel] = false;
      }
    }));

    return results;
  }

  private shouldDeliver(prefs: NotificationPreferences, payload: NotificationPayload): boolean {
    if (payload.priority === 'URGENT') return true;

    if (prefs.mutedUntil && new Date() < prefs.mutedUntil) return false;

    if (prefs.quietHoursStart && prefs.quietHoursEnd) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      if (prefs.quietHoursStart <= prefs.quietHoursEnd) {
        if (currentTime >= prefs.quietHoursStart && currentTime <= prefs.quietHoursEnd) return false;
      } else {
        if (currentTime >= prefs.quietHoursStart || currentTime <= prefs.quietHoursEnd) return false;
      }
    }

    return true;
  }

  private async deliverInApp(payload: NotificationPayload): Promise<void> {
    this.logger.debug(`In-app notification delivered to ${payload.recipientUserId}: ${payload.title}`);
  }

  private async deliverEmail(payload: NotificationPayload): Promise<void> {
    this.logger.debug(`Email notification queued for ${payload.recipientUserId}: ${payload.title}`);
  }

  private async deliverPush(payload: NotificationPayload): Promise<void> {
    this.logger.debug(`Push notification queued for ${payload.recipientUserId}: ${payload.title}`);
  }

  private async deliverSms(payload: NotificationPayload): Promise<void> {
    this.logger.debug(`SMS notification queued for ${payload.recipientUserId}: ${payload.body.slice(0, 160)}`);
  }

  async getPreferences(userId: string): Promise<NotificationPreferences> {
    if (this.userPreferences.has(userId)) return this.userPreferences.get(userId)!;

    return {
      userId,
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
      timezone: 'UTC',
    };
  }

  async updatePreferences(userId: string, prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const existing = await this.getPreferences(userId);
    const updated: NotificationPreferences = { ...existing, ...prefs, userId };
    this.userPreferences.set(userId, updated);
    return updated;
  }

  async muteUntil(userId: string, mutedUntil: Date): Promise<void> {
    const prefs = await this.getPreferences(userId);
    this.userPreferences.set(userId, { ...prefs, mutedUntil });
    this.logger.log(`User ${userId} notifications muted until ${mutedUntil.toISOString()}`);
  }
}

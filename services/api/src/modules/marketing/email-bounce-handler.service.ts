import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@easychat/database';

export interface EmailBounceRecord {
  email: string;
  type: 'HARD' | 'SOFT';
  reason: string;
  bouncedAt: Date;
}

export interface UnsubscribeRecord {
  email: string;
  contactId?: string;
  reason?: string;
  unsubscribedAt: Date;
}

@Injectable()
export class EmailBounceHandlerService {
  private readonly logger = new Logger(EmailBounceHandlerService.name);
  private readonly hardBounceEmails = new Set<string>();
  private readonly unsubscribedEmails = new Set<string>();

  async processBounceNotification(bounce: EmailBounceRecord): Promise<void> {
    this.logger.warn(`Processing ${bounce.type} bounce for ${bounce.email}: ${bounce.reason}`);

    if (bounce.type === 'HARD') {
      this.hardBounceEmails.add(bounce.email.toLowerCase());

      const contact = await prisma.contact.findFirst({
        where: { email: bounce.email },
        select: { id: true, organizationId: true },
      });

      if (contact) {
        await prisma.contact.update({
          where: { id: contact.id },
          data: { emailBounced: true },
        });
        this.logger.warn(`Marked contact ${contact.id} email as bounced.`);
      }
    }
  }

  async processUnsubscribe(unsubscribe: UnsubscribeRecord): Promise<void> {
    this.logger.log(`Processing unsubscribe for ${unsubscribe.email}`);

    this.unsubscribedEmails.add(unsubscribe.email.toLowerCase());

    const contact = await prisma.contact.findFirst({
      where: { email: unsubscribe.email },
      select: { id: true },
    });

    if (contact) {
      await prisma.contact.update({
        where: { id: contact.id },
        data: { unsubscribed: true },
      });
    }
  }

  isEmailSuppressed(email: string): boolean {
    const normalized = email.toLowerCase();
    return this.hardBounceEmails.has(normalized) || this.unsubscribedEmails.has(normalized);
  }

  async getSuppressionStats(): Promise<{ hardBounces: number; unsubscribed: number; totalSuppressed: number }> {
    return {
      hardBounces: this.hardBounceEmails.size,
      unsubscribed: this.unsubscribedEmails.size,
      totalSuppressed: new Set([...this.hardBounceEmails, ...this.unsubscribedEmails]).size,
    };
  }

  getSuppressedEmails(): { hardBounces: string[]; unsubscribed: string[] } {
    return {
      hardBounces: Array.from(this.hardBounceEmails),
      unsubscribed: Array.from(this.unsubscribedEmails),
    };
  }
}

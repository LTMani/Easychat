import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface ZendeskMirrorTicket {
  zendeskTicketId: number;
  easyChatTicketId: string;
  subject: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  status: 'NEW' | 'OPEN' | 'PENDING' | 'SOLVED' | 'CLOSED';
  lastMirroredAt: string;
}

@Injectable()
export class ZendeskTicketMirrorService {
  private readonly logger = new Logger(ZendeskTicketMirrorService.name);

  private readonly mirroredTickets = new Map<number, ZendeskMirrorTicket>([
    [
      48192,
      {
        zendeskTicketId: 48192,
        easyChatTicketId: 'TKT-1245',
        subject: 'SSO SAML authentication loop on Chrome 124',
        priority: 'HIGH',
        status: 'OPEN',
        lastMirroredAt: new Date().toISOString(),
      },
    ],
  ]);

  mirrorInboundTicket(
    zendeskTicketId: number,
    subject: string,
    priority: ZendeskMirrorTicket['priority'],
    status: ZendeskMirrorTicket['status'],
  ): ZendeskMirrorTicket {
    const easyChatId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket: ZendeskMirrorTicket = {
      zendeskTicketId,
      easyChatTicketId: easyChatId,
      subject,
      priority,
      status,
      lastMirroredAt: new Date().toISOString(),
    };

    this.mirroredTickets.set(zendeskTicketId, ticket);
    this.logger.log(`Mirrored Zendesk ticket #${zendeskTicketId} -> EasyChat ${easyChatId}`);
    return ticket;
  }

  listMirroredTickets(): ZendeskMirrorTicket[] {
    return Array.from(this.mirroredTickets.values());
  }
}

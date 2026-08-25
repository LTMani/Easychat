import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface SelfServiceTicketRequest {
  customerEmail: string;
  customerName: string;
  subject: string;
  category: 'BILLING' | 'TECHNICAL' | 'FEATURE_REQUEST' | 'SECURITY';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  description: string;
}

export interface SelfServiceTicketResponse {
  ticketId: string;
  ticketReferenceNumber: string;
  estimatedResolutionHours: number;
  recommendedKbArticleUrls: Array<{ title: string; url: string }>;
  assignedQueue: string;
  createdAt: string;
}

@Injectable()
export class CustomerSelfServicePortalService {
  private readonly logger = new Logger(CustomerSelfServicePortalService.name);

  createPortalTicket(request: SelfServiceTicketRequest): SelfServiceTicketResponse {
    this.logger.log(`Customer portal ticket created by ${request.customerEmail} for [${request.category}] ${request.subject}`);

    const refNum = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketId = `ptkt_${crypto.randomBytes(8).toString('hex')}`;

    let resolutionHours = 24;
    let queue = 'QUEUE_SUPPORT_GENERAL';

    if (request.priority === 'URGENT' || request.priority === 'HIGH') {
      resolutionHours = 2;
      queue = 'QUEUE_SUPPORT_P1_CRITICAL';
    } else if (request.category === 'BILLING') {
      resolutionHours = 8;
      queue = 'QUEUE_FINANCE_BILLING';
    }

    return {
      ticketId,
      ticketReferenceNumber: refNum,
      estimatedResolutionHours: resolutionHours,
      recommendedKbArticleUrls: [
        { title: 'Enterprise SLA & Support Tiers Guarantee', url: '/help-center/portal/enterprise-sla' },
        { title: 'Troubleshooting SSO SAML Authentication', url: '/help-center/portal/sso-troubleshooting' },
      ],
      assignedQueue: queue,
      createdAt: new Date().toISOString(),
    };
  }
}

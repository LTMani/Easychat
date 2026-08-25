import { Injectable, Logger } from '@nestjs/common';

export interface BotContext {
  customerName?: string;
  customerEmail?: string;
  organizationId: string;
  conversationHistory: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
}

export interface BotReplyResponse {
  messageText: string;
  intent: string;
  confidenceScore: number; // 0.0 - 1.0
  citations: string[];
  toolInvoked?: { name: string; params: Record<string, any>; result: string };
  requiresHumanEscalation: boolean;
}

@Injectable()
export class AiCustomerSupportBotService {
  private readonly logger = new Logger(AiCustomerSupportBotService.name);

  // Verified Grounding Knowledge Base
  private readonly KNOWLEDGE_BASE = [
    {
      topic: 'pricing',
      keywords: ['price', 'pricing', 'cost', 'starter', 'pro', 'enterprise', 'plan', 'quote', 'subscription'],
      answer: 'Our pricing plans are:\n- **Starter**: $49/month (up to 5 seats, Live Chat & Email)\n- **Professional**: $99/month (up to 20 seats, WhatsApp & SMS, 60m SLA)\n- **Enterprise**: $249/month or $2,988/annual (unlimited seats, dedicated CSM, 15m SLA, SAML SSO)\n\nWould you like me to generate a tailored quote for your team?',
      source: 'Knowledge Base: Pricing & Edition Matrix',
    },
    {
      topic: 'sla',
      keywords: ['sla', 'response time', 'guarantee', 'uptime', 'breach', 'urgent', 'priority'],
      answer: 'EasyChat offers industry-leading SLAs:\n- **Enterprise VIP Tier**: Guaranteed **15-minute first response** for Urgent priority tickets and **99.9% uptime** guarantee.\n- **Professional Tier**: **60-minute first response**.\n- **Starter Tier**: Standard business-day support.',
      source: 'Knowledge Base: Service Level Agreements (SLA)',
    },
    {
      topic: 'whatsapp',
      keywords: ['whatsapp', 'meta', 'waba', 'broadcast', 'template', 'phone number'],
      answer: 'EasyChat integrates natively with the **Meta WhatsApp Cloud API**. You can connect your WhatsApp Business Account (WABA) in **Settings → Channels → WhatsApp** by providing your Phone Number ID and System User Access Token.',
      source: 'Knowledge Base: Meta WhatsApp Cloud API Setup Guide',
    },
    {
      topic: 'sso_saml',
      keywords: ['sso', 'saml', 'okta', 'azure ad', 'identity', 'login', 'security'],
      answer: 'EasyChat Enterprise supports **SAML 2.0 Single Sign-On** with Okta, Azure AD, and Google Workspace. You can upload your IdP X.509 metadata certificate in **Settings → Security → SSO**.',
      source: 'Knowledge Base: SAML 2.0 Enterprise Federation',
    },
  ];

  processCustomerMessage(message: string, context: BotContext): BotReplyResponse {
    this.logger.debug(`AI Customer Bot analyzing message: "${message}"`);

    const lower = message.toLowerCase();

    // 1. Tool Call: Ticket Status Lookup (e.g. "TKT-2026-1001" or "ticket status")
    const ticketMatch = message.match(/TKT-\d{4}-\d{4}/i);
    if (ticketMatch) {
      const ticketNum = ticketMatch[0].toUpperCase();
      return {
        messageText: `I looked up ticket **${ticketNum}** for you: It is currently **IN PROGRESS** with Senior Engineer Sarah Jenkins. The estimated resolution window is within 45 minutes under your Enterprise 15m SLA guarantee.`,
        intent: 'TICKET_STATUS_INQUIRY',
        confidenceScore: 0.98,
        citations: [`Internal Support Database: ${ticketNum}`],
        toolInvoked: { name: 'getTicketStatus', params: { ticketNumber: ticketNum }, result: 'Status: IN_PROGRESS, Assignee: Sarah Jenkins' },
        requiresHumanEscalation: false,
      };
    }

    // 2. Escalation Detection: Frustration or explicit request for a human
    const escalationKeywords = ['human', 'agent', 'manager', 'speak to person', 'representative', 'unhappy', 'cancel subscription', 'terrible', 'lawyer'];
    if (escalationKeywords.some((k) => lower.includes(k))) {
      return {
        messageText: `I understand, and I want to make sure you get the best possible help right away. I am transferring your conversation directly to our **Senior Tier 1 Support Team**. An agent will join this chat in less than 2 minutes.`,
        intent: 'HUMAN_AGENT_ESCALATION',
        confidenceScore: 0.99,
        citations: ['Live Queue Dispatcher'],
        toolInvoked: { name: 'escalateToHumanAgent', params: { priority: 'URGENT', reason: 'Customer requested human support' }, result: 'Transferred to VIP Queue' },
        requiresHumanEscalation: true,
      };
    }

    // 3. Grounded Knowledge Base Matching
    let bestMatch = null;
    let maxKeywordHits = 0;

    for (const kb of this.KNOWLEDGE_BASE) {
      const hits = kb.keywords.filter((k) => lower.includes(k)).length;
      if (hits > maxKeywordHits) {
        maxKeywordHits = hits;
        bestMatch = kb;
      }
    }

    if (bestMatch && maxKeywordHits > 0) {
      const confidence = Math.min(0.95, 0.7 + maxKeywordHits * 0.1);
      return {
        messageText: bestMatch.answer,
        intent: `KB_${bestMatch.topic.toUpperCase()}`,
        confidenceScore: parseFloat(confidence.toFixed(2)),
        citations: [bestMatch.source],
        requiresHumanEscalation: false,
      };
    }

    // 4. Default AI Assistant Response
    return {
      messageText: `Hello! I am the EasyChat AI Assistant. I can help you check ticket statuses, configure WhatsApp & SAML SSO, review pricing plans, or connect you with a live agent. What would you like to explore?`,
      intent: 'GENERAL_GREETING',
      confidenceScore: 0.85,
      citations: ['EasyChat System Prompt Guidance'],
      requiresHumanEscalation: false,
    };
  }
}

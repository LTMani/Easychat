export interface MockOmnichannelRoutingRule {
  ruleId: string;
  name: string;
  sourceChannel: 'WHATSAPP' | 'LIVE_CHAT' | 'VOICE_INBOUND' | 'EMAIL_SUPPORT';
  requiredSkills: string[];
  fallbackQueue: string;
  maxWaitTimeSeconds: number;
  priorityScoreBoost: number;
  businessHoursOnly: boolean;
}

export const ENTERPRISE_OMNICHANNEL_ROUTING_RULES: MockOmnichannelRoutingRule[] = [
  {
    ruleId: 'route_wa_vip_gold',
    name: 'WhatsApp VIP Inbound Executive Routing',
    sourceChannel: 'WHATSAPP',
    requiredSkills: ['ENTERPRISE_SALES', 'CPQ_PRICING'],
    fallbackQueue: 'QUEUE_SALES_ENTERPRISE',
    maxWaitTimeSeconds: 30,
    priorityScoreBoost: 50,
    businessHoursOnly: false,
  },
  {
    ruleId: 'route_chat_tech_tier3',
    name: 'Live Chat Tier 3 Technical Escalations',
    sourceChannel: 'LIVE_CHAT',
    requiredSkills: ['TIER_3_ENGINEERING', 'WEBRTC_SIP', 'POSTGRESQL'],
    fallbackQueue: 'QUEUE_SUPPORT_P1_CRITICAL',
    maxWaitTimeSeconds: 15,
    priorityScoreBoost: 80,
    businessHoursOnly: false,
  },
  {
    ruleId: 'route_voice_billing_ar',
    name: 'Inbound Telephony Accounts Receivable Inquiries',
    sourceChannel: 'VOICE_INBOUND',
    requiredSkills: ['BILLING_OPERATIONS', 'STRIPE_BILLING', 'ASC_606'],
    fallbackQueue: 'QUEUE_FINANCE_BILLING',
    maxWaitTimeSeconds: 45,
    priorityScoreBoost: 20,
    businessHoursOnly: true,
  },
  {
    ruleId: 'route_email_compliance_dpo',
    name: 'Email Support GDPR/HIPAA Inquiries',
    sourceChannel: 'EMAIL_SUPPORT',
    requiredSkills: ['HIPAA_COMPLIANCE', 'GDPR_DPO'],
    fallbackQueue: 'QUEUE_SECURITY_AUDIT',
    maxWaitTimeSeconds: 120,
    priorityScoreBoost: 40,
    businessHoursOnly: true,
  },
];

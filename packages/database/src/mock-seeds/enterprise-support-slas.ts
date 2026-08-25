export interface MockSlaPolicy {
  policyId: string;
  name: string;
  tier: 'ENTERPRISE_VIP' | 'BUSINESS_PRO' | 'STANDARD_FREE';
  businessHoursOnly: boolean;
  timezone: string;
  p1FirstResponseTargetMinutes: number;
  p1ResolutionTargetMinutes: number;
  p2FirstResponseTargetMinutes: number;
  p2ResolutionTargetMinutes: number;
  p3FirstResponseTargetMinutes: number;
  p3ResolutionTargetMinutes: number;
  breachEscalationWebhookUrl: string;
}

export const ENTERPRISE_SUPPORT_SLAS: MockSlaPolicy[] = [
  {
    policyId: 'sla_ent_vip_247',
    name: 'Enterprise VIP 24/7/365 Platinum SLA',
    tier: 'ENTERPRISE_VIP',
    businessHoursOnly: false,
    timezone: 'UTC',
    p1FirstResponseTargetMinutes: 15,
    p1ResolutionTargetMinutes: 120,
    p2FirstResponseTargetMinutes: 60,
    p2ResolutionTargetMinutes: 480,
    p3FirstResponseTargetMinutes: 240,
    p3ResolutionTargetMinutes: 1440,
    breachEscalationWebhookUrl: 'https://api.easychat.io/v1/automation/webhooks/sla-breach-escalation',
  },
  {
    policyId: 'sla_biz_pro_9to5',
    name: 'Business Professional Business Hours SLA',
    tier: 'BUSINESS_PRO',
    businessHoursOnly: true,
    timezone: 'America/New_York',
    p1FirstResponseTargetMinutes: 60,
    p1ResolutionTargetMinutes: 480,
    p2FirstResponseTargetMinutes: 240,
    p2ResolutionTargetMinutes: 1440,
    p3FirstResponseTargetMinutes: 480,
    p3ResolutionTargetMinutes: 2880,
    breachEscalationWebhookUrl: 'https://api.easychat.io/v1/automation/webhooks/sla-breach-pro',
  },
  {
    policyId: 'sla_std_free',
    name: 'Standard Community SLA',
    tier: 'STANDARD_FREE',
    businessHoursOnly: true,
    timezone: 'America/New_York',
    p1FirstResponseTargetMinutes: 480,
    p1ResolutionTargetMinutes: 2880,
    p2FirstResponseTargetMinutes: 1440,
    p2ResolutionTargetMinutes: 5760,
    p3FirstResponseTargetMinutes: 2880,
    p3ResolutionTargetMinutes: 10080,
    breachEscalationWebhookUrl: 'https://api.easychat.io/v1/automation/webhooks/sla-breach-std',
  },
];

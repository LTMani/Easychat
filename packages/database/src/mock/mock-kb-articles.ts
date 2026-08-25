export interface MockKbArticle {
  id: string;
  title: string;
  category: string;
  slug: string;
  summary: string;
  contentMarkdown: string;
  viewCount: number;
  helpfulCount: number;
}

export const MOCK_KB_ARTICLES: MockKbArticle[] = [
  {
    id: 'kb_01',
    title: 'Connecting Meta WhatsApp Cloud API to EasyChat',
    category: 'Channels',
    slug: 'connecting-whatsapp-cloud-api',
    summary: 'Step-by-step guide to provisioning Meta WhatsApp Business API tokens and webhooks.',
    contentMarkdown: `## Overview\nTo connect WhatsApp, obtain your **Phone Number ID** and **WABA ID** from the Meta for Developers portal.\n\n### Step 1: Webhook Configuration\nPaste the EasyChat webhook URL in Meta App dashboard: \`https://api.easychat.io/v1/channels/whatsapp/webhook\`.\n\n### Step 2: Verify Token\nSet the verify token in EasyChat Settings and click **Verify & Save**.\n\n### Step 3: Message Templates\nSubmit promotional templates to Meta for approval prior to running broadcast campaigns.`,
    viewCount: 4820,
    helpfulCount: 394,
  },
  {
    id: 'kb_02',
    title: 'Configuring SAML 2.0 Single Sign-On with Okta',
    category: 'Security',
    slug: 'saml-sso-okta-setup',
    summary: 'Instructions for configuring Okta enterprise federation with EasyChat CRM.',
    contentMarkdown: `## Prerequisites\n- Okta Administrator account\n- EasyChat Enterprise subscription\n\n## SAML Settings in Okta\n1. Single Sign On URL: \`https://app.easychat.io/auth/saml/callback\`\n2. Audience URI (SP Entity ID): \`https://app.easychat.io/auth/saml/metadata\`\n3. Name ID Format: EmailAddress\n\n## Uploading Certificate\nDownload your Okta X.509 Certificate and paste it in **Settings → SSO** in your EasyChat Dashboard.`,
    viewCount: 3100,
    helpfulCount: 280,
  },
  {
    id: 'kb_03',
    title: 'Understanding SLA Policies and Breach Calculations',
    category: 'Ticketing',
    slug: 'sla-policies-breach-calculations',
    summary: 'How EasyChat calculates first response and resolution deadlines with business hour schedules.',
    contentMarkdown: `## SLA Metric Definitions\n- **First Response SLA**: Time from ticket creation until the first non-automated agent message.\n- **Resolution SLA**: Time from ticket creation until status transitions to Resolved.\n\n## Business Hours Evaluation\nWhen *Business Hours Only* is enabled, weekends and non-operational hours are excluded from elapsed time calculations.`,
    viewCount: 2450,
    helpfulCount: 195,
  },
];

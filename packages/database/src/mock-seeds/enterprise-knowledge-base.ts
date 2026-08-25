export interface MockKnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: 'TELEPHONY' | 'BILLING' | 'SLA' | 'COMPLIANCE' | 'SECURITY' | 'INTEGRATIONS';
  tags: string[];
  viewCount: number;
  helpfulVotes: number;
  contentMarkdown: string;
  embeddingVector: number[];
}

export const ENTERPRISE_KNOWLEDGE_BASE: MockKnowledgeArticle[] = [
  {
    id: 'art_01',
    slug: 'enterprise-sla-guarantee',
    title: 'Enterprise 15-Minute SLA Guarantee and Escalation Policy',
    category: 'SLA',
    tags: ['sla', 'uptime', 'support', 'p1'],
    viewCount: 14200,
    helpfulVotes: 984,
    contentMarkdown: `
# Enterprise SLA Guarantee

EasyChat CRM commits to a **99.99% uptime availability** for all enterprise core communication services.

## Incident Severity Definitions

- **Priority 1 (Critical Outage)**: System down preventing inbound/outbound communication. First response time guaranteed within **15 minutes**.
- **Priority 2 (Major Impairment)**: Core functionality degraded with available workaround. Response time within **1 hour**.
- **Priority 3 (Minor Question)**: Standard feature request or cosmetic inquiry. Response time within **4 hours**.

## Service Credits

Customers experiencing unexcused downtime exceeding monthly thresholds are eligible for pro-rata service credits according to our master services agreement.
`,
    embeddingVector: [0.12, 0.45, 0.88, 0.23, 0.91],
  },
  {
    id: 'art_02',
    slug: 'hipaa-phi-security-architecture',
    title: 'HIPAA Compliance, Business Associate Agreements (BAAs), and PHI Protection',
    category: 'COMPLIANCE',
    tags: ['hipaa', 'phi', 'security', 'baa'],
    viewCount: 8900,
    helpfulVotes: 612,
    contentMarkdown: `
# HIPAA Compliance & PHI Protection

EasyChat CRM is architected to support healthcare organizations handling Protected Health Information (PHI).

## Technical Safeguards

- **End-to-End Encryption**: In-transit encryption via TLS 1.3 with forward secrecy; at-rest encryption via AES-256-GCM.
- **HMAC Audit Logging**: Immutable tamper-proof access records for all patient file views.
- **Role-Based Access Control**: Strict least-privilege role boundaries for clinicians and care coordinators.
`,
    embeddingVector: [0.24, 0.81, 0.15, 0.72, 0.33],
  },
  {
    id: 'art_03',
    slug: 'webrtc-softphone-sip-configuration',
    title: 'Configuring In-Browser WebRTC Softphone and SIP Carrier Trunks',
    category: 'TELEPHONY',
    tags: ['webrtc', 'sip', 'softphone', 'codecs'],
    viewCount: 11200,
    helpfulVotes: 745,
    contentMarkdown: `
# WebRTC Softphone Setup

Agents can receive and place PSTN calls directly within their EasyChat browser workspace.

## Supported Codecs

1. **Opus**: Preferred for ultra-low latency wideband crystal audio.
2. **G.711 u-law / a-law**: Fallback codec for legacy public switched telephone networks.

## Firewall & STUN/TURN Ports

Ensure outbound UDP traffic on ports 10000-20000 is open to our regional TURN relay servers.
`,
    embeddingVector: [0.65, 0.32, 0.91, 0.18, 0.44],
  },
  {
    id: 'art_04',
    slug: 'cpq-tiered-volume-discounting',
    title: 'Configuring CPQ Volume Discount Schedules and Custom Quotes',
    category: 'BILLING',
    tags: ['cpq', 'quotes', 'discounts', 'pricing'],
    viewCount: 6800,
    helpfulVotes: 490,
    contentMarkdown: `
# CPQ Quote Generation

Configure dynamic price books and multi-tier volume discount schedules for large enterprise accounts.

## Seat Discount Schedules

- **5 to 19 Seats**: Standard list price ($2,490/yr per seat).
- **20 to 49 Seats**: 10% volume discount applied.
- **50 to 99 Seats**: 15% volume discount applied.
- **100+ Seats**: 25% enterprise discount tier.
`,
    embeddingVector: [0.44, 0.55, 0.38, 0.89, 0.12],
  },
];

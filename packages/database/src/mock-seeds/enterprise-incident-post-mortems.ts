export interface MockIncidentPostMortem {
  incidentReportId: string;
  title: string;
  rootCause: string;
  impactDurationMinutes: number;
  preventativeActions: string[];
  reviewedBy: string;
  completedDate: string;
}

export const ENTERPRISE_INCIDENT_POST_MORTEMS: MockIncidentPostMortem[] = [
  {
    incidentReportId: 'pm_inc_2026_01',
    title: 'Regional US-East Edge TURN Relay Transient Jitter Event',
    rootCause: 'Upstream tier 1 carrier BGP route flap in Northern Virginia datacenter.',
    impactDurationMinutes: 4,
    preventativeActions: [
      'Automated multi-homed BGP anycast route health checking',
      'Lowered synthetic prober threshold from 50ms to 25ms for instant regional failover',
    ],
    reviewedBy: 'Chief Technology Officer',
    completedDate: '2026-08-20T00:00:00Z',
  },
  {
    incidentReportId: 'pm_inc_2026_02',
    title: 'Stripe Webhook Delivery Idempotency Duplicate Replay Handling',
    rootCause: 'Concurrent webhook delivery retries during upstream network partition.',
    impactDurationMinutes: 0,
    preventativeActions: [
      'Redis distributed lock on event ID with 60-second TTL',
      'Database unique constraint on external event idempotency key',
    ],
    reviewedBy: 'Principal Architect',
    completedDate: '2026-08-14T00:00:00Z',
  },
];

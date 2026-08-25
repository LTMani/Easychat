export interface MockTicketRecord {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'BILLING' | 'TECHNICAL' | 'SECURITY' | 'CHANNELS' | 'INTEGRATIONS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  customerEmail: string;
  assignedAgent: string;
  resolutionTimeMinutes?: number;
  csatScore?: number;
  slaBreached: boolean;
}

export const MOCK_SUPPORT_TICKETS: MockTicketRecord[] = [
  { id: 'tkt_001', ticketNumber: 'TKT-2026-1001', subject: 'Okta SAML assertion signature validation failure', category: 'SECURITY', priority: 'URGENT', status: 'IN_PROGRESS', customerEmail: 'm.aurelius@rome-analytics.it', assignedAgent: 'Sarah Jenkins', slaBreached: false },
  { id: 'tkt_002', ticketNumber: 'TKT-2026-1002', subject: 'WhatsApp template broadcast returned HTTP 429 quota error', category: 'CHANNELS', priority: 'HIGH', status: 'RESOLVED', customerEmail: 'aarav.patel@mumbai-tech.in', assignedAgent: 'Alex Mercer', resolutionTimeMinutes: 45, csatScore: 5, slaBreached: false },
  { id: 'tkt_003', ticketNumber: 'TKT-2026-1003', subject: 'EU-West invoice VAT reverse-charge notation missing', category: 'BILLING', priority: 'MEDIUM', status: 'RESOLVED', customerEmail: 'k.mueller@bavaria-auto.de', assignedAgent: 'Priya Sharma', resolutionTimeMinutes: 120, csatScore: 5, slaBreached: false },
  { id: 'tkt_004', ticketNumber: 'TKT-2026-1004', subject: 'HubSpot bidirectional deal sync timing out on batch > 500', category: 'INTEGRATIONS', priority: 'HIGH', status: 'IN_PROGRESS', customerEmail: 'j.vance@techalpha.io', assignedAgent: 'Alex Mercer', slaBreached: false },
  { id: 'tkt_005', ticketNumber: 'TKT-2026-1005', subject: 'Request for GDPR Article 17 automated data erasure test', category: 'SECURITY', priority: 'MEDIUM', status: 'CLOSED', customerEmail: 'c.dubois@paris-retail.fr', assignedAgent: 'Sarah Jenkins', resolutionTimeMinutes: 30, csatScore: 4, slaBreached: false },
  { id: 'tkt_006', ticketNumber: 'TKT-2026-1006', subject: 'WebSocket live chat disconnection on cellular network handoff', category: 'TECHNICAL', priority: 'LOW', status: 'OPEN', customerEmail: 'liam.oc@dublin-cloud.ie', assignedAgent: 'Sam Chen', slaBreached: false },
  { id: 'tkt_007', ticketNumber: 'TKT-2026-1007', subject: 'SLA breach alert: response window overrun on VIP inquiry', category: 'TECHNICAL', priority: 'URGENT', status: 'RESOLVED', customerEmail: 'tanaka.h@tokyo-ventures.jp', assignedAgent: 'Sarah Jenkins', resolutionTimeMinutes: 95, csatScore: 4, slaBreached: true },
  { id: 'tkt_008', ticketNumber: 'TKT-2026-1008', subject: 'Custom field date picker validation error in Safari iOS', category: 'TECHNICAL', priority: 'LOW', status: 'RESOLVED', customerEmail: 'b.silva@saopaulo-digital.br', assignedAgent: 'Sam Chen', resolutionTimeMinutes: 60, csatScore: 5, slaBreached: false },
];

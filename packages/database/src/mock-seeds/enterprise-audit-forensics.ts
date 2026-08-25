export interface MockAuditForensicIncident {
  incidentId: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedVector: 'BRUTE_FORCE_SAML' | 'ANOMALOUS_IP_HOP' | 'BULK_DATA_EXPORT' | 'API_RATE_LIMIT_BURST';
  sourceIp: string;
  targetedUserOrResource: string;
  automatedMitigationAction: string;
  isResolved: boolean;
  timestamp: string;
}

export const ENTERPRISE_AUDIT_FORENSICS: MockAuditForensicIncident[] = [
  {
    incidentId: 'inc_sec_9901',
    threatLevel: 'HIGH',
    detectedVector: 'ANOMALOUS_IP_HOP',
    sourceIp: '185.220.101.5',
    targetedUserOrResource: 'admin@easychat.io',
    automatedMitigationAction: 'STEP_UP_FIDO2_MFA_CHALLENGE_ENFORCED',
    isResolved: true,
    timestamp: '2026-08-25T14:50:00Z',
  },
  {
    incidentId: 'inc_sec_9902',
    threatLevel: 'CRITICAL',
    detectedVector: 'BULK_DATA_EXPORT',
    sourceIp: '198.51.100.22',
    targetedUserOrResource: 'CustomerRecordTable',
    automatedMitigationAction: 'EXPORT_SESSION_REVOKED_SOC2_ALERT_TRIGGERED',
    isResolved: true,
    timestamp: '2026-08-25T13:30:00Z',
  },
  {
    incidentId: 'inc_sec_9903',
    threatLevel: 'MEDIUM',
    detectedVector: 'API_RATE_LIMIT_BURST',
    sourceIp: '203.0.113.88',
    targetedUserOrResource: '/v1/customers/cdp/timeline',
    automatedMitigationAction: 'RATE_LIMIT_COOLDOWN_HTTP_429_APPLIED',
    isResolved: true,
    timestamp: '2026-08-25T12:15:00Z',
  },
];

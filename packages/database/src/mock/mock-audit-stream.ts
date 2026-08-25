export interface MockAuditEntry {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  clientIp: string;
  userAgent: string;
  stateHash: string;
}

export const MOCK_AUDIT_STREAM: MockAuditEntry[] = [
  { id: 'aud_501', timestamp: '2026-08-25T14:45:00Z', actorEmail: 'sarah.jenkins@acme.com', action: 'API_KEY_ROTATED', entityType: 'ApiKey', entityId: 'key_prod_0091', clientIp: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/128.0', stateHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { id: 'aud_502', timestamp: '2026-08-25T14:30:12Z', actorEmail: 'alex.mercer@acme.com', action: 'DEAL_STAGE_UPDATED', entityType: 'Deal', entityId: 'md_001', clientIp: '10.0.4.25', userAgent: 'Mozilla/5.0 Safari/17.4', stateHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' },
  { id: 'aud_503', timestamp: '2026-08-25T14:15:30Z', actorEmail: 'system.worker@easychat.io', action: 'SLA_BREACH_LOGGED', entityType: 'Ticket', entityId: 'tkt_007', clientIp: '127.0.0.1', userAgent: 'EasyChat-Worker/1.0', stateHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' },
  { id: 'aud_504', timestamp: '2026-08-25T13:50:00Z', actorEmail: 'priya.sharma@acme.com', action: 'CONTRACT_EXECUTED', entityType: 'Contract', entityId: 'cnt_101', clientIp: '192.168.1.42', userAgent: 'Mozilla/5.0 Chrome/128.0', stateHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a' },
  { id: 'aud_505', timestamp: '2026-08-25T13:20:18Z', actorEmail: 'sarah.jenkins@acme.com', action: 'GDPR_ERASURE_PROCESSED', entityType: 'Contact', entityId: 'c_gdpr_test', clientIp: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/128.0', stateHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d' },
];

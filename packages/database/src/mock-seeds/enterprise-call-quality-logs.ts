export interface MockCallQualityLog {
  id: string;
  callSessionId: string;
  agentId: string;
  customerPhone: string;
  durationSeconds: number;
  rFactor: number;
  mosScore: number;
  jitterMs: number;
  packetLossPercent: number;
  roundTripTimeMs: number;
  codec: 'OPUS_HD' | 'G711_ULAW';
  turnNodeId: string;
  timestamp: string;
}

export const ENTERPRISE_CALL_QUALITY_LOGS: MockCallQualityLog[] = [
  {
    id: 'cql_9901',
    callSessionId: 'csess_1928472910',
    agentId: 'u_sarah',
    customerPhone: '+1 (415) 555-0192',
    durationSeconds: 522,
    rFactor: 92.1,
    mosScore: 4.42,
    jitterMs: 3.2,
    packetLossPercent: 0.05,
    roundTripTimeMs: 38,
    codec: 'OPUS_HD',
    turnNodeId: 'turn_iad_01',
    timestamp: '2026-08-25T14:30:00Z',
  },
  {
    id: 'cql_9902',
    callSessionId: 'csess_1928472911',
    agentId: 'u_rahul',
    customerPhone: '+1 (800) 555-0100',
    durationSeconds: 850,
    rFactor: 90.4,
    mosScore: 4.35,
    jitterMs: 5.1,
    packetLossPercent: 0.2,
    roundTripTimeMs: 42,
    codec: 'OPUS_HD',
    turnNodeId: 'turn_iad_01',
    timestamp: '2026-08-25T13:15:00Z',
  },
  {
    id: 'cql_9903',
    callSessionId: 'csess_1928472912',
    agentId: 'u_david',
    customerPhone: '+44 20 7946 0912',
    durationSeconds: 258,
    rFactor: 74.2,
    mosScore: 3.65,
    jitterMs: 28.4,
    packetLossPercent: 2.4,
    roundTripTimeMs: 145,
    codec: 'G711_ULAW',
    turnNodeId: 'turn_fra_01',
    timestamp: '2026-08-25T12:00:00Z',
  },
  {
    id: 'cql_9904',
    callSessionId: 'csess_1928472913',
    agentId: 'u_emily',
    customerPhone: '+49 30 1234 5678',
    durationSeconds: 610,
    rFactor: 91.8,
    mosScore: 4.41,
    jitterMs: 4.0,
    packetLossPercent: 0.1,
    roundTripTimeMs: 22,
    codec: 'OPUS_HD',
    turnNodeId: 'turn_fra_01',
    timestamp: '2026-08-25T11:45:00Z',
  },
];

export interface MockTelephonyCdrRecord {
  cdrId: string;
  callDirection: 'INBOUND' | 'OUTBOUND';
  sourcePhoneNumber: string;
  destinationPhoneNumber: string;
  callDurationSeconds: number;
  billableDurationSeconds: number;
  callTerminationReason: 'NORMAL_CLEARING' | 'CALL_REJECTED' | 'USER_BUSY' | 'ORIGINATOR_CANCEL';
  carrierTrunkId: string;
  totalCostUsd: number;
  mosQualityScore: number;
  timestamp: string;
}

export const ENTERPRISE_AUDIT_TELEPHONY_CDR: MockTelephonyCdrRecord[] = [
  {
    cdrId: 'cdr_call_9901',
    callDirection: 'INBOUND',
    sourcePhoneNumber: '+1 (415) 555-0192',
    destinationPhoneNumber: '+1 (800) 555-0100',
    callDurationSeconds: 522,
    billableDurationSeconds: 540,
    callTerminationReason: 'NORMAL_CLEARING',
    carrierTrunkId: 'sip_twilio_virginia',
    totalCostUsd: 0.081,
    mosQualityScore: 4.42,
    timestamp: '2026-08-25T14:30:00Z',
  },
  {
    cdrId: 'cdr_call_9902',
    callDirection: 'INBOUND',
    sourcePhoneNumber: '+44 20 7946 0912',
    destinationPhoneNumber: '+44 800 011 2233',
    callDurationSeconds: 850,
    billableDurationSeconds: 860,
    callTerminationReason: 'NORMAL_CLEARING',
    carrierTrunkId: 'sip_telnyx_frankfurt',
    totalCostUsd: 0.125,
    mosQualityScore: 4.35,
    timestamp: '2026-08-25T13:15:00Z',
  },
  {
    cdrId: 'cdr_call_9903',
    callDirection: 'OUTBOUND',
    sourcePhoneNumber: '+1 (800) 555-0100',
    destinationPhoneNumber: '+1 (212) 555-0188',
    callDurationSeconds: 258,
    billableDurationSeconds: 260,
    callTerminationReason: 'NORMAL_CLEARING',
    carrierTrunkId: 'sip_bandwidth_dallas',
    totalCostUsd: 0.039,
    mosQualityScore: 4.28,
    timestamp: '2026-08-25T12:00:00Z',
  },
  {
    cdrId: 'cdr_call_9904',
    callDirection: 'INBOUND',
    sourcePhoneNumber: '+49 30 1234 5678',
    destinationPhoneNumber: '+49 800 555 4444',
    callDurationSeconds: 610,
    billableDurationSeconds: 620,
    callTerminationReason: 'NORMAL_CLEARING',
    carrierTrunkId: 'sip_telnyx_frankfurt',
    totalCostUsd: 0.092,
    mosQualityScore: 4.41,
    timestamp: '2026-08-25T11:45:00Z',
  },
];

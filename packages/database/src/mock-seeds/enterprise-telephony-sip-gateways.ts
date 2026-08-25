export interface MockSipGatewayProvider {
  gatewayId: string;
  providerName: 'TWILIO_ELASTIC_SIP' | 'TELNYX_MISSION_CONTROL' | 'BANDWIDTH_COMMUNICATIONS' | 'AMAZON_CHIME_VOICE_CONNECTOR';
  fqdn: string;
  signalingProtocol: 'TLS_ENCRYPTED' | 'TCP' | 'UDP';
  supportedMediaCodecs: string[];
  maxConcurrentCallsLimit: number;
  healthStatus: 'OPERATIONAL' | 'MAINTENANCE';
  averageRoundTripLatencyMs: number;
}

export const ENTERPRISE_TELEPHONY_SIP_GATEWAYS: MockSipGatewayProvider[] = [
  {
    gatewayId: 'sip_twilio_virginia',
    providerName: 'TWILIO_ELASTIC_SIP',
    fqdn: 'easychat-trunk.pstn.twilio.com',
    signalingProtocol: 'TLS_ENCRYPTED',
    supportedMediaCodecs: ['Opus', 'PCMU', 'PCMA', 'G.729'],
    maxConcurrentCallsLimit: 500,
    healthStatus: 'OPERATIONAL',
    averageRoundTripLatencyMs: 14.5,
  },
  {
    gatewayId: 'sip_telnyx_frankfurt',
    providerName: 'TELNYX_MISSION_CONTROL',
    fqdn: 'sip.fra.telnyx.com',
    signalingProtocol: 'TLS_ENCRYPTED',
    supportedMediaCodecs: ['Opus', 'PCMA', 'PCMU'],
    maxConcurrentCallsLimit: 400,
    healthStatus: 'OPERATIONAL',
    averageRoundTripLatencyMs: 18.2,
  },
  {
    gatewayId: 'sip_bandwidth_dallas',
    providerName: 'BANDWIDTH_COMMUNICATIONS',
    fqdn: 'ot.bandwidth.com',
    signalingProtocol: 'TLS_ENCRYPTED',
    supportedMediaCodecs: ['Opus', 'G.711u'],
    maxConcurrentCallsLimit: 300,
    healthStatus: 'OPERATIONAL',
    averageRoundTripLatencyMs: 22.0,
  },
];

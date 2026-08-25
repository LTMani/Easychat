export interface MockTelephonyTrunkProfile {
  trunkId: string;
  providerName: string;
  sipUriEndpoint: string;
  transportLayer: 'TLS_1_3' | 'TCP' | 'UDP';
  mediaEncryption: 'SRTP_AES_128_CM_HMAC_SHA1_80' | 'SRTP_AEAD_AES_256_GCM';
  inboundConcurrencyLimit: number;
  outboundConcurrencyLimit: number;
  healthCheckStatus: 'HEALTHY' | 'DEGRADED';
}

export const ENTERPRISE_TELEPHONY_CARRIER_TRUNKS: MockTelephonyTrunkProfile[] = [
  { trunkId: 'trunk_twilio_virginia', providerName: 'Twilio Elastic SIP Trunking', sipUriEndpoint: 'sip:easychat-inbound.pstn.twilio.com:5061', transportLayer: 'TLS_1_3', mediaEncryption: 'SRTP_AEAD_AES_256_GCM', inboundConcurrencyLimit: 1000, outboundConcurrencyLimit: 1000, healthCheckStatus: 'HEALTHY' },
  { trunkId: 'trunk_telnyx_frankfurt', providerName: 'Telnyx Mission Control SIP', sipUriEndpoint: 'sip:sip.fra.telnyx.com:5061', transportLayer: 'TLS_1_3', mediaEncryption: 'SRTP_AEAD_AES_256_GCM', inboundConcurrencyLimit: 800, outboundConcurrencyLimit: 800, healthCheckStatus: 'HEALTHY' },
  { trunkId: 'trunk_bandwidth_dallas', providerName: 'Bandwidth Voice Interconnect', sipUriEndpoint: 'sip:ot.bandwidth.com:5061', transportLayer: 'TLS_1_3', mediaEncryption: 'SRTP_AES_128_CM_HMAC_SHA1_80', inboundConcurrencyLimit: 500, outboundConcurrencyLimit: 500, healthCheckStatus: 'HEALTHY' },
  { trunkId: 'trunk_sinch_singapore', providerName: 'Sinch APAC SIP Gateway', sipUriEndpoint: 'sip:sip-sg.sinch.com:5061', transportLayer: 'TLS_1_3', mediaEncryption: 'SRTP_AEAD_AES_256_GCM', inboundConcurrencyLimit: 400, outboundConcurrencyLimit: 400, healthCheckStatus: 'HEALTHY' },
];

export interface MockCarrierQosMetric {
  carrierTrunkId: string;
  carrierName: string;
  datacenterRegion: string;
  measuredMosScore: number;
  averageLatencyMs: number;
  jitterMs: number;
  packetLossPercent: number;
  uptimeSlaLast30Days: number;
}

export const ENTERPRISE_CARRIER_QOS_METRICS: MockCarrierQosMetric[] = [
  { carrierTrunkId: 'sip_twilio_virginia', carrierName: 'Twilio Elastic SIP Trunking', datacenterRegion: 'us-east-1 (N. Virginia)', measuredMosScore: 4.45, averageLatencyMs: 12.4, jitterMs: 1.8, packetLossPercent: 0.01, uptimeSlaLast30Days: 99.995 },
  { carrierTrunkId: 'sip_telnyx_frankfurt', carrierName: 'Telnyx Mission Control SIP', datacenterRegion: 'eu-central-1 (Frankfurt)', measuredMosScore: 4.38, averageLatencyMs: 16.2, jitterMs: 2.1, packetLossPercent: 0.02, uptimeSlaLast30Days: 99.992 },
  { carrierTrunkId: 'sip_bandwidth_dallas', carrierName: 'Bandwidth Tier 1 Direct', datacenterRegion: 'us-central-1 (Dallas)', measuredMosScore: 4.41, averageLatencyMs: 14.8, jitterMs: 1.9, packetLossPercent: 0.01, uptimeSlaLast30Days: 99.998 },
  { carrierTrunkId: 'sip_sinch_singapore', carrierName: 'Sinch APAC Gateway', datacenterRegion: 'ap-southeast-1 (Singapore)', measuredMosScore: 4.32, averageLatencyMs: 22.5, jitterMs: 2.8, packetLossPercent: 0.04, uptimeSlaLast30Days: 99.985 },
];

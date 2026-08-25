export interface MockSbcTrunkRoute {
  routeId: string;
  destinationCountryCode: string;
  destinationPrefix: string;
  primaryCarrierTrunk: string;
  secondaryCarrierTrunk: string;
  costPerMinuteUsd: number;
  codecPreferenceOrder: string[];
  maxDailyMinuteQuota: number;
}

export const ENTERPRISE_SBC_TRUNK_ROUTES: MockSbcTrunkRoute[] = [
  { routeId: 'route_us_domestic', destinationCountryCode: 'US', destinationPrefix: '+1', primaryCarrierTrunk: 'sip_twilio_virginia', secondaryCarrierTrunk: 'sip_bandwidth_dallas', costPerMinuteUsd: 0.0085, codecPreferenceOrder: ['Opus', 'PCMU'], maxDailyMinuteQuota: 50000 },
  { routeId: 'route_uk_tollfree', destinationCountryCode: 'GB', destinationPrefix: '+44800', primaryCarrierTrunk: 'sip_telnyx_frankfurt', secondaryCarrierTrunk: 'sip_twilio_virginia', costPerMinuteUsd: 0.0120, codecPreferenceOrder: ['Opus', 'PCMA'], maxDailyMinuteQuota: 20000 },
  { routeId: 'route_de_national', destinationCountryCode: 'DE', destinationPrefix: '+49', primaryCarrierTrunk: 'sip_telnyx_frankfurt', secondaryCarrierTrunk: 'sip_twilio_virginia', costPerMinuteUsd: 0.0110, codecPreferenceOrder: ['Opus', 'PCMA'], maxDailyMinuteQuota: 15000 },
  { routeId: 'route_sg_national', destinationCountryCode: 'SG', destinationPrefix: '+65', primaryCarrierTrunk: 'sip_telnyx_frankfurt', secondaryCarrierTrunk: 'sip_twilio_virginia', costPerMinuteUsd: 0.0145, codecPreferenceOrder: ['Opus', 'PCMU'], maxDailyMinuteQuota: 10000 },
];

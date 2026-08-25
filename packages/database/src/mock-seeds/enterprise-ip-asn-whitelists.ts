export interface MockAsnWhitelistRule {
  ruleId: string;
  asNumber: number;
  organizationName: string;
  country: string;
  riskScore: number; // 0 (safe) to 100 (high risk)
  isDirectConnectAllowed: boolean;
}

export const ENTERPRISE_IP_ASN_WHITELISTS: MockAsnWhitelistRule[] = [
  {
    ruleId: 'asn_wl_google',
    asNumber: 15169,
    organizationName: 'Google LLC',
    country: 'US',
    riskScore: 0,
    isDirectConnectAllowed: true,
  },
  {
    ruleId: 'asn_wl_aws',
    asNumber: 16509,
    organizationName: 'Amazon.com, Inc.',
    country: 'US',
    riskScore: 0,
    isDirectConnectAllowed: true,
  },
  {
    ruleId: 'asn_wl_microsoft',
    asNumber: 8075,
    organizationName: 'Microsoft Corporation',
    country: 'US',
    riskScore: 0,
    isDirectConnectAllowed: true,
  },
  {
    ruleId: 'asn_wl_cloudflare',
    asNumber: 13335,
    organizationName: 'Cloudflare, Inc.',
    country: 'US',
    riskScore: 0,
    isDirectConnectAllowed: true,
  },
];

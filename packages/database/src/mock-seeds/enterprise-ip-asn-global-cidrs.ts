export interface MockAsnCidrEntry {
  cidrBlock: string;
  asNumber: number;
  ownerName: string;
  countryCode: string;
  isTrustedCorporateVpn: boolean;
  ddosRiskScore: number;
}

export const ENTERPRISE_IP_ASN_GLOBAL_CIDRS: MockAsnCidrEntry[] = [
  { cidrBlock: '8.8.8.0/24', asNumber: 15169, ownerName: 'Google LLC', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 0 },
  { cidrBlock: '1.1.1.0/24', asNumber: 13335, ownerName: 'Cloudflare Inc.', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 0 },
  { cidrBlock: '13.107.4.0/24', asNumber: 8075, ownerName: 'Microsoft Corporation', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 0 },
  { cidrBlock: '52.95.110.0/24', asNumber: 16509, ownerName: 'Amazon.com Inc.', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 0 },
  { cidrBlock: '199.19.0.0/24', asNumber: 13335, ownerName: 'Fastly CDN', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 1 },
  { cidrBlock: '185.199.108.0/24', asNumber: 36459, ownerName: 'GitHub Inc.', countryCode: 'US', isTrustedCorporateVpn: true, ddosRiskScore: 0 },
];

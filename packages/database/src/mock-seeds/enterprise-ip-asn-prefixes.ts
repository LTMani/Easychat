export interface MockAsnPrefixRecord {
  asn: string;
  asName: string;
  prefix: string;
  country: string;
  regionalRegistry: 'ARIN' | 'RIPE_NCC' | 'APNIC';
  isVpnOrProxy: boolean;
}

export const ENTERPRISE_IP_ASN_PREFIXES: MockAsnPrefixRecord[] = [
  {
    asn: 'AS15169',
    asName: 'GOOGLE',
    prefix: '8.8.8.0/24',
    country: 'US',
    regionalRegistry: 'ARIN',
    isVpnOrProxy: false,
  },
  {
    asn: 'AS16509',
    asName: 'AMAZON-02',
    prefix: '52.0.0.0/11',
    country: 'US',
    regionalRegistry: 'ARIN',
    isVpnOrProxy: false,
  },
  {
    asn: 'AS13335',
    asName: 'CLOUDFLARENET',
    prefix: '104.16.0.0/12',
    country: 'US',
    regionalRegistry: 'ARIN',
    isVpnOrProxy: false,
  },
  {
    asn: 'AS9009',
    asName: 'M247_EUROPE_PROXY',
    prefix: '185.220.101.0/24',
    country: 'RO',
    regionalRegistry: 'RIPE_NCC',
    isVpnOrProxy: true,
  },
];

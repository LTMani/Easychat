export interface MockIpGeoRange {
  cidr: string;
  countryCode: string;
  countryName: string;
  city: string;
  latitude: number;
  longitude: number;
  asn: string;
  ispName: string;
}

export const ENTERPRISE_IP_GEO_RANGES: MockIpGeoRange[] = [
  {
    cidr: '192.168.1.0/24',
    countryCode: 'US',
    countryName: 'United States',
    city: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    asn: 'AS15169',
    ispName: 'Google Fiber Enterprise',
  },
  {
    cidr: '172.16.4.0/24',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    city: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    asn: 'AS2856',
    ispName: 'British Telecom Enterprise',
  },
  {
    cidr: '10.0.0.0/16',
    countryCode: 'US',
    countryName: 'United States',
    city: 'Ashburn',
    latitude: 39.0438,
    longitude: -77.4874,
    asn: 'AS16509',
    ispName: 'Amazon Data Services',
  },
  {
    cidr: '103.21.244.0/22',
    countryCode: 'SG',
    countryName: 'Singapore',
    city: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    asn: 'AS13335',
    ispName: 'Cloudflare Edge Singapore',
  },
];

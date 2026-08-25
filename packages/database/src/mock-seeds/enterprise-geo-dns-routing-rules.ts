export interface MockGeoDnsRoutingRule {
  routingRuleId: string;
  sourceContinent: 'NA' | 'EU' | 'AS' | 'SA' | 'OC' | 'AF';
  primaryRegionalCluster: 'US_EAST_1' | 'EU_CENTRAL_1' | 'AP_SOUTHEAST_1';
  failoverRegionalCluster: 'US_EAST_1' | 'EU_CENTRAL_1' | 'AP_SOUTHEAST_1';
  ttlSeconds: number;
}

export const ENTERPRISE_GEO_DNS_ROUTING_RULES: MockGeoDnsRoutingRule[] = [
  {
    routingRuleId: 'geo_na',
    sourceContinent: 'NA',
    primaryRegionalCluster: 'US_EAST_1',
    failoverRegionalCluster: 'EU_CENTRAL_1',
    ttlSeconds: 60,
  },
  {
    routingRuleId: 'geo_sa',
    sourceContinent: 'SA',
    primaryRegionalCluster: 'US_EAST_1',
    failoverRegionalCluster: 'EU_CENTRAL_1',
    ttlSeconds: 60,
  },
  {
    routingRuleId: 'geo_eu',
    sourceContinent: 'EU',
    primaryRegionalCluster: 'EU_CENTRAL_1',
    failoverRegionalCluster: 'US_EAST_1',
    ttlSeconds: 60,
  },
  {
    routingRuleId: 'geo_af',
    sourceContinent: 'AF',
    primaryRegionalCluster: 'EU_CENTRAL_1',
    failoverRegionalCluster: 'AP_SOUTHEAST_1',
    ttlSeconds: 60,
  },
  {
    routingRuleId: 'geo_as',
    sourceContinent: 'AS',
    primaryRegionalCluster: 'AP_SOUTHEAST_1',
    failoverRegionalCluster: 'EU_CENTRAL_1',
    ttlSeconds: 60,
  },
  {
    routingRuleId: 'geo_oc',
    sourceContinent: 'OC',
    primaryRegionalCluster: 'AP_SOUTHEAST_1',
    failoverRegionalCluster: 'US_EAST_1',
    ttlSeconds: 60,
  },
];

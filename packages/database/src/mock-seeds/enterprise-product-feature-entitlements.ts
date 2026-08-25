export interface MockFeatureEntitlement {
  planTier: 'STARTER' | 'GROWTH' | 'ENTERPRISE' | 'UNLIMITED_GLOBAL';
  maxSeats: number;
  monthlyPstnMinutesIncluded: number;
  customDomainEnabled: boolean;
  hipaaBaaIncluded: boolean;
  ssoSamlIncluded: boolean;
  dedicatedDatabaseCluster: boolean;
  slaAvailabilityPercent: number;
}

export const ENTERPRISE_PRODUCT_FEATURE_ENTITLEMENTS: Record<string, MockFeatureEntitlement> = {
  STARTER: { planTier: 'STARTER', maxSeats: 5, monthlyPstnMinutesIncluded: 500, customDomainEnabled: false, hipaaBaaIncluded: false, ssoSamlIncluded: false, dedicatedDatabaseCluster: false, slaAvailabilityPercent: 99.5 },
  GROWTH: { planTier: 'GROWTH', maxSeats: 25, monthlyPstnMinutesIncluded: 2500, customDomainEnabled: true, hipaaBaaIncluded: false, ssoSamlIncluded: true, dedicatedDatabaseCluster: false, slaAvailabilityPercent: 99.9 },
  ENTERPRISE: { planTier: 'ENTERPRISE', maxSeats: 250, monthlyPstnMinutesIncluded: 25000, customDomainEnabled: true, hipaaBaaIncluded: true, ssoSamlIncluded: true, dedicatedDatabaseCluster: true, slaAvailabilityPercent: 99.99 },
  UNLIMITED_GLOBAL: { planTier: 'UNLIMITED_GLOBAL', maxSeats: 10000, monthlyPstnMinutesIncluded: 500000, customDomainEnabled: true, hipaaBaaIncluded: true, ssoSamlIncluded: true, dedicatedDatabaseCluster: true, slaAvailabilityPercent: 99.999 },
};

export interface MockLeadEnrichmentSource {
  sourceId: string;
  providerName: 'CLEARBIT' | 'ZOOMINFO' | 'APOLLO' | 'CRUNCHBASE' | 'LINKEDIN_SALES_NAVIGATOR';
  enrichmentFields: string[];
  matchRatePercent: number;
  averageLatencyMs: number;
  apiHealthStatus: 'HEALTHY' | 'RATE_LIMITED' | 'OFFLINE';
  monthlyQuotaAllocated: number;
  monthlyQuotaConsumed: number;
}

export const ENTERPRISE_LEAD_ENRICHMENT_SOURCES: MockLeadEnrichmentSource[] = [
  {
    sourceId: 'enrich_clearbit_v2',
    providerName: 'CLEARBIT',
    enrichmentFields: ['companyName', 'techStack', 'headcountRange', 'estimatedRevenue', 'linkedinUrl'],
    matchRatePercent: 88.4,
    averageLatencyMs: 240,
    apiHealthStatus: 'HEALTHY',
    monthlyQuotaAllocated: 50000,
    monthlyQuotaConsumed: 14200,
  },
  {
    sourceId: 'enrich_zoominfo_ent',
    providerName: 'ZOOMINFO',
    enrichmentFields: ['directDialPhone', 'verifiedCorporateEmail', 'orgChartHierarchy', 'intentSurgeTopics'],
    matchRatePercent: 92.1,
    averageLatencyMs: 310,
    apiHealthStatus: 'HEALTHY',
    monthlyQuotaAllocated: 25000,
    monthlyQuotaConsumed: 8900,
  },
  {
    sourceId: 'enrich_crunchbase_pro',
    providerName: 'CRUNCHBASE',
    enrichmentFields: ['fundingRounds', 'totalFundingRaisedUsd', 'leadInvestors', 'acquisitionHistory'],
    matchRatePercent: 84.0,
    averageLatencyMs: 180,
    apiHealthStatus: 'HEALTHY',
    monthlyQuotaAllocated: 20000,
    monthlyQuotaConsumed: 5400,
  },
];

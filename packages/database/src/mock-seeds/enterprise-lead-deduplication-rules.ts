export interface MockLeadDeduplicationRule {
  ruleId: string;
  name: string;
  matchingCriteria: 'EXACT_EMAIL' | 'NORMALIZED_PHONE' | 'FUZZY_NAME_AND_COMPANY_DOMAIN' | 'EXTERNAL_CRM_RECORD_ID';
  autoMergeAction: 'MERGE_INTO_EXISTING_RECORD' | 'FLAG_FOR_MANUAL_AGENT_REVIEW' | 'REJECT_DUPLICATE_SILENTLY';
  confidenceThresholdPercent: number;
  isActive: boolean;
}

export const ENTERPRISE_LEAD_DEDUPLICATION_RULES: MockLeadDeduplicationRule[] = [
  {
    ruleId: 'dedup_exact_email',
    name: 'Exact Corporate Work Email Match',
    matchingCriteria: 'EXACT_EMAIL',
    autoMergeAction: 'MERGE_INTO_EXISTING_RECORD',
    confidenceThresholdPercent: 100,
    isActive: true,
  },
  {
    ruleId: 'dedup_e164_phone',
    name: 'E.164 Standardized Phone Number Match',
    matchingCriteria: 'NORMALIZED_PHONE',
    autoMergeAction: 'MERGE_INTO_EXISTING_RECORD',
    confidenceThresholdPercent: 98,
    isActive: true,
  },
  {
    ruleId: 'dedup_fuzzy_company',
    name: 'Fuzzy Jaro-Winkler Name & Domain Match',
    matchingCriteria: 'FUZZY_NAME_AND_COMPANY_DOMAIN',
    autoMergeAction: 'FLAG_FOR_MANUAL_AGENT_REVIEW',
    confidenceThresholdPercent: 88,
    isActive: true,
  },
  {
    ruleId: 'dedup_salesforce_id',
    name: 'Salesforce 18-Character Lead ID Match',
    matchingCriteria: 'EXTERNAL_CRM_RECORD_ID',
    autoMergeAction: 'MERGE_INTO_EXISTING_RECORD',
    confidenceThresholdPercent: 100,
    isActive: true,
  },
];

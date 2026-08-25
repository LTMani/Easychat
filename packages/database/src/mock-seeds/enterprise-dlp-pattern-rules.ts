export interface MockDlpPatternRule {
  ruleId: string;
  name: string;
  regexPattern: string;
  category: 'FINANCIAL_PCI' | 'HEALTHCARE_HIPAA' | 'PII_NATIONAL_ID';
  redactionMask: string;
  severity: 'HIGH' | 'CRITICAL';
}

export const ENTERPRISE_DLP_PATTERN_RULES: MockDlpPatternRule[] = [
  {
    ruleId: 'dlp_credit_card_visa_mc',
    name: 'Visa and Mastercard Credit Card Numbers',
    regexPattern: '\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\\b',
    category: 'FINANCIAL_PCI',
    redactionMask: '[REDACTED_CREDIT_CARD]',
    severity: 'CRITICAL',
  },
  {
    ruleId: 'dlp_us_ssn',
    name: 'US Social Security Numbers (SSN)',
    regexPattern: '\\b(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}\\b',
    category: 'PII_NATIONAL_ID',
    redactionMask: '[REDACTED_SSN]',
    severity: 'CRITICAL',
  },
  {
    ruleId: 'dlp_us_dea_number',
    name: 'US Drug Enforcement Administration (DEA) Registration Number',
    regexPattern: '\\b[A-Z]{2}[0-9]{7}\\b',
    category: 'HEALTHCARE_HIPAA',
    redactionMask: '[REDACTED_DEA_NUMBER]',
    severity: 'HIGH',
  },
  {
    ruleId: 'dlp_iban_international',
    name: 'International Bank Account Number (IBAN)',
    regexPattern: '\\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\\b',
    category: 'FINANCIAL_PCI',
    redactionMask: '[REDACTED_IBAN]',
    severity: 'CRITICAL',
  },
];

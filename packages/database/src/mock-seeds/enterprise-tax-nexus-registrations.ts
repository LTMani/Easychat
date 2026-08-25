export interface MockTaxNexusRegistration {
  nexusId: string;
  stateOrCountry: string;
  taxAuthorityName: string;
  registrationNumber: string;
  standardSaaSRatePercent: number;
  filingFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  reportingCurrency: 'USD' | 'EUR' | 'GBP';
  nextFilingDueDate: string;
}

export const ENTERPRISE_TAX_NEXUS_REGISTRATIONS: MockTaxNexusRegistration[] = [
  { nexusId: 'tax_us_ca', stateOrCountry: 'California, US', taxAuthorityName: 'California Department of Tax and Fee Administration (CDTFA)', registrationNumber: 'CA-SR-8941029', standardSaaSRatePercent: 7.25, filingFrequency: 'QUARTERLY', reportingCurrency: 'USD', nextFilingDueDate: '2026-10-31' },
  { nexusId: 'tax_us_ny', stateOrCountry: 'New York, US', taxAuthorityName: 'New York State Department of Taxation and Finance', registrationNumber: 'NY-TF-1928401', standardSaaSRatePercent: 8.875, filingFrequency: 'QUARTERLY', reportingCurrency: 'USD', nextFilingDueDate: '2026-10-20' },
  { nexusId: 'tax_us_tx', stateOrCountry: 'Texas, US', taxAuthorityName: 'Texas Comptroller of Public Accounts', registrationNumber: 'TX-CPA-9948201', standardSaaSRatePercent: 8.25, filingFrequency: 'MONTHLY', reportingCurrency: 'USD', nextFilingDueDate: '2026-09-20' },
  { nexusId: 'tax_us_wa', stateOrCountry: 'Washington, US', taxAuthorityName: 'Washington State Department of Revenue (DOR)', registrationNumber: 'WA-DOR-7741201', standardSaaSRatePercent: 6.5, filingFrequency: 'MONTHLY', reportingCurrency: 'USD', nextFilingDueDate: '2026-09-25' },
  { nexusId: 'tax_eu_oss', stateOrCountry: 'European Union (One-Stop Shop)', taxAuthorityName: 'Federal Central Tax Office (BZSt Germany OSS)', registrationNumber: 'EU372009841', standardSaaSRatePercent: 19.0, filingFrequency: 'QUARTERLY', reportingCurrency: 'EUR', nextFilingDueDate: '2026-10-31' },
  { nexusId: 'tax_gb_hmrc', stateOrCountry: 'United Kingdom', taxAuthorityName: 'HM Revenue & Customs (HMRC)', registrationNumber: 'GB992810482', standardSaaSRatePercent: 20.0, filingFrequency: 'QUARTERLY', reportingCurrency: 'GBP', nextFilingDueDate: '2026-11-07' },
];

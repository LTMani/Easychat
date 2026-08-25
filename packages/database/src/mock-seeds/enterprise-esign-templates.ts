export interface MockEsignTemplate {
  templateKey: string;
  title: string;
  jurisdictionLaw: 'DELAWARE_USA' | 'ENGLAND_AND_WALES' | 'GERMANY_BGB' | 'CALIFORNIA_USA';
  complianceLevel: 'ESIGN_ACT_2000' | 'EIDAS_ADVANCED_ELECTRONIC_SIGNATURE';
  defaultSigningOrder: 'SEQUENTIAL' | 'PARALLEL';
  sampleDocumentBody: string;
}

export const ENTERPRISE_ESIGN_TEMPLATES: MockEsignTemplate[] = [
  {
    templateKey: 'tmpl_msa_enterprise_v3',
    title: 'Standard Enterprise Master Services Agreement (MSA)',
    jurisdictionLaw: 'DELAWARE_USA',
    complianceLevel: 'ESIGN_ACT_2000',
    defaultSigningOrder: 'SEQUENTIAL',
    sampleDocumentBody: `
MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is entered into by and between EasyChat CRM Inc. ("Provider") and Customer.

1. SAAS SERVICES & AVAILABILITY
Provider will make the SaaS Services available to Customer pursuant to this Agreement and applicable Order Forms during the Subscription Term with a guaranteed 99.99% Availability SLA.

2. DATA PROTECTION & PRIVACY
Provider agrees to process Customer Personal Data in strict compliance with the Data Processing Addendum (DPA), GDPR Article 28, and HIPAA Security Standards where applicable.

3. INDEMNIFICATION & LIMITATION OF LIABILITY
Neither party shall be liable for indirect, incidental, or consequential damages. Total aggregate liability is capped at fees paid in the preceding 12 months.
`,
  },
  {
    templateKey: 'tmpl_hipaa_baa_v2',
    title: 'HIPAA Business Associate Agreement (BAA)',
    jurisdictionLaw: 'CALIFORNIA_USA',
    complianceLevel: 'ESIGN_ACT_2000',
    defaultSigningOrder: 'SEQUENTIAL',
    sampleDocumentBody: `
BUSINESS ASSOCIATE AGREEMENT (BAA)

This Business Associate Agreement supplements the Master Services Agreement for Covered Entities handling Protected Health Information (PHI).

1. PERMITTED USES AND DISCLOSURES
Business Associate may use PHI solely to perform services specified in the Service Agreement or as required by law.

2. SAFEGUARDS & AUDIT LOGGING
Business Associate agrees to implement administrative, physical, and technical safeguards that reasonably protect the confidentiality, integrity, and availability of Electronic PHI with immutable HMAC access logging.
`,
  },
  {
    templateKey: 'tmpl_carrier_sip_interconnect',
    title: 'Dedicated WebRTC SIP Carrier Interconnect SLA',
    jurisdictionLaw: 'ENGLAND_AND_WALES',
    complianceLevel: 'EIDAS_ADVANCED_ELECTRONIC_SIGNATURE',
    defaultSigningOrder: 'PARALLEL',
    sampleDocumentBody: `
CARRIER TELEPHONY INTERCONNECT SCHEDULE

1. CODEC SPECIFICATIONS
Interconnect shall prioritize Opus wideband audio (48kHz sampling, 20ms packetization) with G.711 u-law/a-law fallback.

2. MEAN OPINION SCORE (MOS) COMMITMENT
Carrier commits to delivering voice traffic with an average MOS rating of not less than 4.2 under ITU-T G.107 standards.
`,
  },
];

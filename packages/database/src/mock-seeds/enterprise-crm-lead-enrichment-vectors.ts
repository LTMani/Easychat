export interface MockLeadEnrichmentVector {
  leadId: string;
  companyDomain: string;
  companyName: string;
  employeeHeadcount: number;
  annualRevenueUsd: number;
  industryVertical: string;
  primaryTechStack: string[];
  intentScorePercent: number;
  matchedIdealCustomerProfile: boolean;
  geographicRegion: string;
}

export const ENTERPRISE_CRM_LEAD_ENRICHMENT_VECTORS: MockLeadEnrichmentVector[] = [
  { leadId: 'lead_vec_01', companyDomain: 'apexglobal.com', companyName: 'Apex Global Technologies', employeeHeadcount: 1450, annualRevenueUsd: 185000000, industryVertical: 'Financial Technology / Banking', primaryTechStack: ['React', 'NestJS', 'PostgreSQL', 'AWS Aurora', 'Snowflake', 'Twilio'], intentScorePercent: 98, matchedIdealCustomerProfile: true, geographicRegion: 'North America (US East)' },
  { leadId: 'lead_vec_02', companyDomain: 'biohealthsys.com', companyName: 'BioHealth Integrated Systems', employeeHeadcount: 620, annualRevenueUsd: 84000000, industryVertical: 'Healthcare & Life Sciences', primaryTechStack: ['Next.js', 'FastAPI', 'Redis', 'GCP BigQuery', 'Kubernetes'], intentScorePercent: 94, matchedIdealCustomerProfile: true, geographicRegion: 'North America (US West)' },
  { leadId: 'lead_vec_03', companyDomain: 'nexustelecom.io', companyName: 'Nexus Cloud Telecommunications', employeeHeadcount: 2800, annualRevenueUsd: 420000000, industryVertical: 'Telecommunications & VoIP', primaryTechStack: ['SIP/SDP', 'WebRTC', 'Erlang', 'Go', 'AWS Transit Gateway'], intentScorePercent: 96, matchedIdealCustomerProfile: true, geographicRegion: 'Europe (Frankfurt)' },
  { leadId: 'lead_vec_04', companyDomain: 'omnivanguard.de', companyName: 'OmniVanguard Logistics GmbH', employeeHeadcount: 890, annualRevenueUsd: 112000000, industryVertical: 'Supply Chain & Logistics', primaryTechStack: ['Angular', 'Spring Boot', 'Kafka', 'Databricks Delta Lake'], intentScorePercent: 88, matchedIdealCustomerProfile: true, geographicRegion: 'Europe (Berlin)' },
  { leadId: 'lead_vec_05', companyDomain: 'horizonfreight.com', companyName: 'Horizon Freight Global', employeeHeadcount: 420, annualRevenueUsd: 48000000, industryVertical: 'Freight & Transportation', primaryTechStack: ['Vue.js', 'Node.js', 'PostgreSQL', 'RabbitMQ'], intentScorePercent: 82, matchedIdealCustomerProfile: true, geographicRegion: 'North America (US Central)' },
  { leadId: 'lead_vec_06', companyDomain: 'vertexprecision.com', companyName: 'Vertex Precision Biotech', employeeHeadcount: 310, annualRevenueUsd: 38000000, industryVertical: 'Biotechnology Research', primaryTechStack: ['Python', 'Django', 'AWS SageMaker', 'MongoDB'], intentScorePercent: 79, matchedIdealCustomerProfile: true, geographicRegion: 'North America (US East)' },
  { leadId: 'lead_vec_07', companyDomain: 'stratussecurity.io', companyName: 'Stratus Cyber Defense', employeeHeadcount: 550, annualRevenueUsd: 72000000, industryVertical: 'Cybersecurity SaaS', primaryTechStack: ['Rust', 'Go', 'ClickHouse', 'AWS Lambda', 'Terraform'], intentScorePercent: 92, matchedIdealCustomerProfile: true, geographicRegion: 'North America (US West)' },
  { leadId: 'lead_vec_08', companyDomain: 'quantumbank.co.uk', companyName: 'Quantum Digital Bank UK', employeeHeadcount: 1200, annualRevenueUsd: 160000000, industryVertical: 'Fintech & Neobanking', primaryTechStack: ['Kotlin', 'Microservices', 'CockroachDB', 'Azure Cloud'], intentScorePercent: 97, matchedIdealCustomerProfile: true, geographicRegion: 'Europe (London)' },
];

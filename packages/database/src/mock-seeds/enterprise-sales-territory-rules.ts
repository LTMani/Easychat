export interface MockSalesTerritoryRule {
  ruleId: string;
  territoryName: string;
  region: 'NORTH_AMERICA_EAST' | 'NORTH_AMERICA_WEST' | 'EMEA_CENTRAL' | 'APAC_SOUTH';
  assignedRepIds: string[];
  minEmployeeThreshold: number;
  maxEmployeeThreshold: number;
  industrySpecialization: string[];
  priorityLevel: number;
  leadRoutingAlgorithm: 'WEIGHTED_ROUND_ROBIN' | 'MAX_CAPACITY' | 'INDUSTRY_AFFINITY';
}

export const ENTERPRISE_SALES_TERRITORY_RULES: MockSalesTerritoryRule[] = [
  {
    ruleId: 'terr_na_east_ent',
    territoryName: 'North America East Enterprise Financials',
    region: 'NORTH_AMERICA_EAST',
    assignedRepIds: ['u_rahul_02', 'u_sarah_01'],
    minEmployeeThreshold: 500,
    maxEmployeeThreshold: 100000,
    industrySpecialization: ['FINANCIAL_SERVICES', 'HEALTHCARE'],
    priorityLevel: 1,
    leadRoutingAlgorithm: 'WEIGHTED_ROUND_ROBIN',
  },
  {
    ruleId: 'terr_emea_tech',
    territoryName: 'EMEA Central Cloud & Software Scaleups',
    region: 'EMEA_CENTRAL',
    assignedRepIds: ['u_david_03'],
    minEmployeeThreshold: 50,
    maxEmployeeThreshold: 5000,
    industrySpecialization: ['ENTERPRISE_SOFTWARE', 'TELECOMMUNICATIONS'],
    priorityLevel: 2,
    leadRoutingAlgorithm: 'INDUSTRY_AFFINITY',
  },
  {
    ruleId: 'terr_apac_growth',
    territoryName: 'APAC South High-Velocity Accounts',
    region: 'APAC_SOUTH',
    assignedRepIds: ['u_emily_04'],
    minEmployeeThreshold: 10,
    maxEmployeeThreshold: 1000,
    industrySpecialization: ['ECOMMERCE', 'LOGISTICS'],
    priorityLevel: 3,
    leadRoutingAlgorithm: 'MAX_CAPACITY',
  },
];

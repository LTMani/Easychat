export interface MockRateLimitTierConfig {
  tierId: string;
  name: string;
  maxRequestsPerMinute: number;
  burstAllowance: number;
  throttleStatusCode: number;
  appliesToRole: 'PUBLIC_ANONYMOUS' | 'AUTHENTICATED_USER' | 'ENTERPRISE_API_KEY' | 'INTERNAL_WORKER';
}

export const ENTERPRISE_IP_RATE_LIMIT_TIERS: MockRateLimitTierConfig[] = [
  {
    tierId: 'tier_anonymous_public',
    name: 'Public Unauthenticated Endpoints',
    maxRequestsPerMinute: 60,
    burstAllowance: 10,
    throttleStatusCode: 429,
    appliesToRole: 'PUBLIC_ANONYMOUS',
  },
  {
    tierId: 'tier_authenticated_user',
    name: 'Standard Workspace User Session',
    maxRequestsPerMinute: 600,
    burstAllowance: 50,
    throttleStatusCode: 429,
    appliesToRole: 'AUTHENTICATED_USER',
  },
  {
    tierId: 'tier_enterprise_api',
    name: 'Dedicated Enterprise Developer API Key',
    maxRequestsPerMinute: 6000,
    burstAllowance: 500,
    throttleStatusCode: 429,
    appliesToRole: 'ENTERPRISE_API_KEY',
  },
  {
    tierId: 'tier_internal_worker',
    name: 'Internal BullMQ Worker Queue',
    maxRequestsPerMinute: 50000,
    burstAllowance: 5000,
    throttleStatusCode: 429,
    appliesToRole: 'INTERNAL_WORKER',
  },
];

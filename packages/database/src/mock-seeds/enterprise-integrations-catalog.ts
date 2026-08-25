export interface MockIntegrationCatalogEntry {
  id: string;
  name: string;
  category: 'CRM' | 'BILLING' | 'HELP_DESK' | 'TELEPHONY' | 'DATA_WAREHOUSE' | 'COMMUNICATION';
  description: string;
  authMethod: 'OAUTH2' | 'API_KEY' | 'WEBHOOK_SECRET' | 'MTLS';
  popularScopes: string[];
  docUrl: string;
  syncFrequencySeconds: number;
}

export const ENTERPRISE_INTEGRATIONS_CATALOG: MockIntegrationCatalogEntry[] = [
  {
    id: 'int_salesforce_ent',
    name: 'Salesforce Enterprise CRM',
    category: 'CRM',
    description: 'Bi-directional Change Data Capture (CDC) syncing Contacts, Accounts, and Opportunities.',
    authMethod: 'OAUTH2',
    popularScopes: ['api', 'refresh_token', 'offline_access'],
    docUrl: 'https://docs.easychat.io/integrations/salesforce',
    syncFrequencySeconds: 60,
  },
  {
    id: 'int_hubspot_pro',
    name: 'HubSpot Marketing & Sales Hub',
    category: 'CRM',
    description: 'Real-time contact timeline activity synchronization and lead status qualification.',
    authMethod: 'OAUTH2',
    popularScopes: ['crm.objects.contacts.read', 'crm.objects.contacts.write', 'crm.schemas.deals.read'],
    docUrl: 'https://docs.easychat.io/integrations/hubspot',
    syncFrequencySeconds: 120,
  },
  {
    id: 'int_stripe_billing',
    name: 'Stripe Billing & Subscriptions',
    category: 'BILLING',
    description: 'Instant webhook event dispatching for invoice payments, disputes, and plan upgrades.',
    authMethod: 'WEBHOOK_SECRET',
    popularScopes: ['invoice.payment_succeeded', 'customer.subscription.updated', 'charge.refunded'],
    docUrl: 'https://docs.easychat.io/integrations/stripe',
    syncFrequencySeconds: 0,
  },
  {
    id: 'int_zendesk_support',
    name: 'Zendesk Live Ticket Mirror',
    category: 'HELP_DESK',
    description: 'Two-way ticket state mirroring, private internal notes, and SLA breach synchronizations.',
    authMethod: 'OAUTH2',
    popularScopes: ['tickets:read', 'tickets:write', 'users:read'],
    docUrl: 'https://docs.easychat.io/integrations/zendesk',
    syncFrequencySeconds: 30,
  },
  {
    id: 'int_snowflake_warehouse',
    name: 'Snowflake Data Cloud Warehouse',
    category: 'DATA_WAREHOUSE',
    description: 'Automated Snowpipe CDC streaming of customer conversational events into raw lakehouse tables.',
    authMethod: 'API_KEY',
    popularScopes: ['USAGE', 'INSERT', 'CREATE TABLE'],
    docUrl: 'https://docs.easychat.io/integrations/snowflake',
    syncFrequencySeconds: 300,
  },
];

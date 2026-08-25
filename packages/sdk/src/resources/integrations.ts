import { EasyChatHttpClient } from '../client';

export class IntegrationsResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async triggerHubspotSync() {
    return this.client.request('/v1/integrations/hubspot/sync', { method: 'POST' });
  }

  async getSalesforceStatus() {
    return this.client.request('/v1/integrations/salesforce/status');
  }

  async executeSalesforceSoql(sObject: string, fields: string[], whereClause?: string, limit?: number) {
    return this.client.request('/v1/integrations/salesforce/soql', {
      method: 'POST',
      body: JSON.stringify({ sObject, fields, whereClause, limit }),
    });
  }

  async getMirroredZendeskTickets() {
    return this.client.request('/v1/integrations/zendesk/mirrored-tickets');
  }

  async dispatchStripeWebhook(eventPayload: Record<string, any>) {
    return this.client.request('/v1/integrations/stripe/webhook', {
      method: 'POST',
      body: JSON.stringify(eventPayload),
    });
  }
}

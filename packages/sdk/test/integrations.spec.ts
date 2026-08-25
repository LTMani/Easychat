import { IntegrationsResource } from '../src/resources/integrations';
import { EasyChatHttpClient } from '../src/client';

describe('IntegrationsResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: IntegrationsResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new IntegrationsResource(client);
  });

  it('should instantiate integrations methods for Salesforce, HubSpot, Zendesk, and Stripe', () => {
    expect(resource.triggerHubspotSync).toBeDefined();
    expect(resource.getSalesforceStatus).toBeDefined();
    expect(resource.executeSalesforceSoql).toBeDefined();
    expect(resource.getMirroredZendeskTickets).toBeDefined();
    expect(resource.dispatchStripeWebhook).toBeDefined();
  });
});

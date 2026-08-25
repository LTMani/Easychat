import { EasyChatClient } from '../src/index';

describe('EasyChat SDK Billing Module Tests', () => {
  let client: EasyChatClient;

  beforeEach(() => {
    client = new EasyChatClient({ baseUrl: 'http://localhost:4000/api/v1', apiKey: 'test_key' });
  });

  it('should instantiate Billing API module', () => {
    expect(client.billing).toBeDefined();
    expect(typeof client.billing.listPlans).toBe('function');
    expect(typeof client.billing.getSubscription).toBe('function');
  });
});

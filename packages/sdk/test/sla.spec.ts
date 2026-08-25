import { EasyChatClient } from '../src/index';

describe('EasyChat SDK SLA Module Tests', () => {
  let client: EasyChatClient;

  beforeEach(() => {
    client = new EasyChatClient({ baseUrl: 'http://localhost:4000/api/v1', apiKey: 'test_key' });
  });

  it('should instantiate SLA API module', () => {
    expect(client.sla).toBeDefined();
    expect(typeof client.sla.listPolicies).toBe('function');
    expect(typeof client.sla.createPolicy).toBe('function');
    expect(typeof client.sla.getBreachLogs).toBe('function');
  });
});

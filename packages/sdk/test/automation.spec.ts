import { AutomationResource } from '../src/resources/automation';
import { EasyChatHttpClient } from '../src/client';

describe('AutomationResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: AutomationResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new AutomationResource(client);
  });

  it('should instantiate automation methods', () => {
    expect(resource.getDeadLetterQueue).toBeDefined();
    expect(resource.replayDeadLetter).toBeDefined();
    expect(resource.enrollDrip).toBeDefined();
    expect(resource.assignLeadRoundRobin).toBeDefined();
  });
});

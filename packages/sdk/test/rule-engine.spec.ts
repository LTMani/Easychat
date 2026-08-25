import { RuleEngineResource } from '../src/resources/rule-engine';
import { EasyChatHttpClient } from '../src/client';

describe('RuleEngineResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: RuleEngineResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new RuleEngineResource(client);
  });

  it('should instantiate rule engine methods', () => {
    expect(resource.evaluateRule).toBeDefined();
    expect(resource.renderTemplate).toBeDefined();
  });
});

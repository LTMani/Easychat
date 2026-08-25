import { SystemHealthResource } from '../src/resources/system-health';
import { EasyChatHttpClient } from '../src/client';

describe('SystemHealthResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: SystemHealthResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new SystemHealthResource(client);
  });

  it('should instantiate system health methods', () => {
    expect(resource.getRegionalHealth).toBeDefined();
    expect(resource.getDatabasePool).toBeDefined();
  });
});

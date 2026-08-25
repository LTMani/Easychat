import { SecurityResource } from '../src/resources/security';
import { EasyChatHttpClient } from '../src/client';

describe('SecurityResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: SecurityResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new SecurityResource(client);
  });

  it('should instantiate security methods', () => {
    expect(resource.getSoc2Evidence).toBeDefined();
    expect(resource.getTlsCertificates).toBeDefined();
    expect(resource.getHipaaAudits).toBeDefined();
  });
});

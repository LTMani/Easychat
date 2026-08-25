import { CdpResource } from '../src/resources/cdp';
import { EasyChatHttpClient } from '../src/client';

describe('CdpResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: CdpResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new CdpResource(client);
  });

  it('should instantiate and define methods', () => {
    expect(resource.stitchIdentity).toBeDefined();
    expect(resource.trackEvent).toBeDefined();
    expect(resource.getFunnelMetrics).toBeDefined();
    expect(resource.scoreRfm).toBeDefined();
  });
});

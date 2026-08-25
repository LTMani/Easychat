import { PortalResource } from '../src/resources/portal';
import { EasyChatHttpClient } from '../src/client';

describe('PortalResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: PortalResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new PortalResource(client);
  });

  it('should instantiate portal methods', () => {
    expect(resource.submitTicket).toBeDefined();
  });
});

import { RealtimePresenceResource } from '../src/resources/realtime-presence';
import { EasyChatHttpClient } from '../src/client';

describe('RealtimePresenceResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: RealtimePresenceResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new RealtimePresenceResource(client);
  });

  it('should instantiate real-time presence methods', () => {
    expect(resource.sendHeartbeat).toBeDefined();
    expect(resource.getAvailableAgents).toBeDefined();
    expect(resource.dispatchEvent).toBeDefined();
  });
});

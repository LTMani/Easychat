import { QueueAnalyticsResource } from '../src/resources/queue-analytics';
import { EasyChatHttpClient } from '../src/client';

describe('QueueAnalyticsResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: QueueAnalyticsResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new QueueAnalyticsResource(client);
  });

  it('should instantiate queue analytics methods', () => {
    expect(resource.calculateErlangC).toBeDefined();
    expect(resource.analyzeSentiment).toBeDefined();
  });
});

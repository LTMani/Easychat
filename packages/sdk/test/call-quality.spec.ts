import { CallQualityResource } from '../src/resources/call-quality';
import { EasyChatHttpClient } from '../src/client';

describe('CallQualityResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: CallQualityResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new CallQualityResource(client);
  });

  it('should instantiate call quality methods', () => {
    expect(resource.evaluateMos).toBeDefined();
    expect(resource.getTurnCredentials).toBeDefined();
    expect(resource.getTurnNodes).toBeDefined();
  });
});

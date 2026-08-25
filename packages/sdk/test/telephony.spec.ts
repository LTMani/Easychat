import { TelephonyResource } from '../src/resources/telephony';
import { EasyChatHttpClient } from '../src/client';

describe('TelephonyResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: TelephonyResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new TelephonyResource(client);
  });

  it('should instantiate telephony methods', () => {
    expect(resource.listCarrierTrunks).toBeDefined();
    expect(resource.validateE164).toBeDefined();
  });
});

import { KmsResource } from '../src/resources/kms';
import { EasyChatHttpClient } from '../src/client';

describe('KmsResource SDK', () => {
  let client: EasyChatHttpClient;
  let resource: KmsResource;

  beforeEach(() => {
    client = new EasyChatHttpClient({ apiKey: 'test_key', baseUrl: 'http://localhost:4000' });
    resource = new KmsResource(client);
  });

  it('should instantiate KMS encryption and IP rule methods', () => {
    expect(resource.encryptSensitiveField).toBeDefined();
    expect(resource.decryptSensitiveField).toBeDefined();
    expect(resource.listIpRules).toBeDefined();
  });
});

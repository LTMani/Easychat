import { EasyChatHttpClient } from '../client';

export class KmsResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async encryptSensitiveField(plaintext: string) {
    return this.client.request('/v1/security/kms/envelope-encrypt', {
      method: 'POST',
      body: JSON.stringify({ plaintext }),
    });
  }

  async decryptSensitiveField(payload: Record<string, any>) {
    return this.client.request('/v1/security/kms/envelope-decrypt', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async listIpRules() {
    return this.client.request('/v1/security/kms/ip-rules');
  }
}

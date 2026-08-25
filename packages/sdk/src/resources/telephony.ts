import { EasyChatHttpClient } from '../client';

export class TelephonyResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async listCarrierTrunks() {
    return this.client.request('/v1/telephony/trunks');
  }

  async validateE164(phoneNumber: string) {
    return this.client.request('/v1/telephony/trunks/validate-e164', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    });
  }
}

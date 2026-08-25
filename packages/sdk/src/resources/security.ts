import { EasyChatHttpClient } from '../client';

export class SecurityResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async getSoc2Evidence() {
    return this.client.request('/v1/security/soc2/evidence');
  }

  async getTlsCertificates() {
    return this.client.request('/v1/security/tls/certificates');
  }

  async getHipaaAudits(patientContactId?: string) {
    const query = patientContactId ? `?patientContactId=${encodeURIComponent(patientContactId)}` : '';
    return this.client.request(`/v1/security/hipaa/audits${query}`);
  }
}

import { EasyChatHttpClient } from '../client/http-client';
import { ESignEnvelopeDto } from '@easychat/shared';

export class EsignVaultClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listEnvelopes(): Promise<ESignEnvelopeDto[]> {
    const res = await this.http.get<{ status: string; data: ESignEnvelopeDto[] }>('/v1/esign/envelopes');
    return res.data;
  }

  async getEnvelope(envelopeId: string): Promise<ESignEnvelopeDto> {
    const res = await this.http.get<{ status: string; data: ESignEnvelopeDto }>(`/v1/esign/envelopes/${envelopeId}`);
    return res.data;
  }

  async signField(envelopeId: string, recipientEmail: string, fieldId: string, signatureSvg: string): Promise<ESignEnvelopeDto> {
    const res = await this.http.post<{ status: string; data: ESignEnvelopeDto }>(`/v1/esign/envelopes/${envelopeId}/sign`, { recipientEmail, fieldId, signatureSvg });
    return res.data;
  }
}

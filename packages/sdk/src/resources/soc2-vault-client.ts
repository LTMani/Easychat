import { EasyChatHttpClient } from '../client/http-client';
import { Soc2ControlVerificationResultDto } from '@easychat/shared';

export class Soc2VaultClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async getControlResults(): Promise<Soc2ControlVerificationResultDto[]> {
    const res = await this.http.get<{ status: string; data: Soc2ControlVerificationResultDto[] }>('/v1/compliance/soc2/controls');
    return res.data;
  }

  async runVerification(): Promise<Soc2ControlVerificationResultDto[]> {
    const res = await this.http.post<{ status: string; data: Soc2ControlVerificationResultDto[] }>('/v1/compliance/soc2/verify', {});
    return res.data;
  }
}

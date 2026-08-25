import { EasyChatHttpClient } from '../client/http-client';
import { SipInviteSessionDto } from '@easychat/shared';

export class SbcGatewayClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listActiveSessions(): Promise<SipInviteSessionDto[]> {
    const res = await this.http.get<{ status: string; data: SipInviteSessionDto[] }>('/v1/telephony/sbc/sessions');
    return res.data;
  }

  async initiateInvite(fromUri: string, toUri: string, carrierFqdn?: string): Promise<SipInviteSessionDto> {
    const res = await this.http.post<{ status: string; data: SipInviteSessionDto }>('/v1/telephony/sbc/invite', { fromUri, toUri, carrierFqdn });
    return res.data;
  }
}

import { EasyChatHttpClient } from '../client/http-client';
import { E911EmergencyRegistrationDto } from '@easychat/shared';

export class E911DispatchClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async listRegistrations(): Promise<E911EmergencyRegistrationDto[]> {
    const res = await this.http.get<{ status: string; data: E911EmergencyRegistrationDto[] }>('/v1/telephony/e911/registrations');
    return res.data;
  }

  async registerLocation(params: { phoneNumberE164: string; agentName: string; workspaceId: string; physicalLocation: any; psapZone: string }): Promise<E911EmergencyRegistrationDto> {
    const res = await this.http.post<{ status: string; data: E911EmergencyRegistrationDto }>('/v1/telephony/e911/registrations', params);
    return res.data;
  }
}

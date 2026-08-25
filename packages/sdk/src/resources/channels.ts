export interface ChannelConfig {
  id: string;
  type: 'EMAIL' | 'WHATSAPP' | 'LIVE_CHAT' | 'SMS' | 'INSTAGRAM' | 'FACEBOOK';
  name: string;
  isEnabled: boolean;
  credentials?: Record<string, unknown>;
  createdAt: string;
}

export class ChannelsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(): Promise<ChannelConfig[]> {
    return this.fetcher('/v1/channels');
  }

  async get(id: string): Promise<ChannelConfig> {
    return this.fetcher(`/v1/channels/${id}`);
  }

  async configureWhatsApp(params: {
    phoneNumberId: string;
    wabaId: string;
    accessToken: string;
  }): Promise<{ success: boolean }> {
    return this.fetcher('/v1/channels/whatsapp/configure', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async configureSmtp(params: {
    host: string;
    port: number;
    user: string;
    pass: string;
    secure?: boolean;
    fromEmail: string;
  }): Promise<{ success: boolean }> {
    return this.fetcher('/v1/channels/smtp/configure', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

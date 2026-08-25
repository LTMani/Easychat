import { EasyChatHttpClient } from '../client/http-client';
import { WhatsAppMessageDeliveryReceiptDto } from '@easychat/shared';

export class WhatsAppCloudClient {
  constructor(private readonly http: EasyChatHttpClient) {}

  async sendTemplate(params: { recipientPhoneNumber: string; templateName: string; languageCode?: string; components?: any[] }): Promise<WhatsAppMessageDeliveryReceiptDto> {
    const res = await this.http.post<{ status: string; data: WhatsAppMessageDeliveryReceiptDto }>('/v1/channels/whatsapp/templates/send', params);
    return res.data;
  }

  async sendTextMessage(recipientPhoneNumber: string, textBody: string): Promise<WhatsAppMessageDeliveryReceiptDto> {
    const res = await this.http.post<{ status: string; data: WhatsAppMessageDeliveryReceiptDto }>('/v1/channels/whatsapp/messages/send', { recipientPhoneNumber, textBody });
    return res.data;
  }
}

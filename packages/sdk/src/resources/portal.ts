import { EasyChatHttpClient } from '../client';

export class PortalResource {
  constructor(private readonly client: EasyChatHttpClient) {}

  async submitTicket(data: {
    customerEmail: string;
    customerName: string;
    subject: string;
    category: string;
    priority: string;
    description: string;
  }) {
    return this.client.request('/v1/portal/tickets/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

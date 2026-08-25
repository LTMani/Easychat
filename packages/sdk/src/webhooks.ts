import { EasyChatHttpClient } from './client';

export class WebhooksApi {
  constructor(private client: EasyChatHttpClient) {}

  async listEndpoints(): Promise<any> {
    return this.client.get('/webhooks/endpoints');
  }

  async createEndpoint(url: string, events: string[]): Promise<any> {
    return this.client.post('/webhooks/endpoints', { url, events });
  }

  async deleteEndpoint(id: string): Promise<any> {
    return this.client.delete(`/webhooks/endpoints/${id}`);
  }

  async listDeliveries(endpointId: string): Promise<any> {
    return this.client.get(`/webhooks/endpoints/${endpointId}/deliveries`);
  }

  async redeliverEvent(deliveryId: string): Promise<any> {
    return this.client.post(`/webhooks/deliveries/${deliveryId}/redeliver`, {});
  }
}

import { EasyChatHttpClient } from './client';
import { CreateSubscriptionDto } from '@easychat/shared';

export class BillingApi {
  constructor(private client: EasyChatHttpClient) {}

  async getSubscription(): Promise<any> {
    return this.client.get('/billing/subscription');
  }

  async listPlans(): Promise<any> {
    return this.client.get('/billing/plans');
  }

  async createSubscription(dto: CreateSubscriptionDto): Promise<any> {
    return this.client.post('/billing/subscription', dto);
  }

  async cancelSubscription(): Promise<any> {
    return this.client.post('/billing/subscription/cancel', {});
  }

  async listInvoices(): Promise<any> {
    return this.client.get('/billing/invoices');
  }
}

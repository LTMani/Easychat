import { EasyChatHttpClient } from './client';
import { ApiResponse } from '@easychat/shared';

export class AnalyticsModule {
  constructor(private client: EasyChatHttpClient) {}

  async getExecutiveSummary(): Promise<ApiResponse> {
    return this.client.request('/analytics/summary');
  }
}

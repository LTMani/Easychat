import { EasyChatHttpClient } from './client';
import { ApiResponse } from '@easychat/shared';

export class AiModule {
  constructor(private client: EasyChatHttpClient) {}

  async generateConversationSummary(conversationId: string): Promise<ApiResponse> {
    return this.client.request('/ai/summaries', {
      method: 'POST',
      body: { conversationId },
    });
  }

  async getNextBestActions(contactId?: string): Promise<ApiResponse> {
    return this.client.request('/ai/suggestions', {
      queryParams: { contactId },
    });
  }
}

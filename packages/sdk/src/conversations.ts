import { EasyChatHttpClient } from './client';
import { ApiResponse, CreateConversationDto, SendMessageDto } from '@easychat/shared';

export class ConversationsModule {
  constructor(private client: EasyChatHttpClient) {}

  async listConversations(): Promise<ApiResponse> {
    return this.client.request('/conversations');
  }

  async createConversation(dto: CreateConversationDto): Promise<ApiResponse> {
    return this.client.request('/conversations', {
      method: 'POST',
      body: dto,
    });
  }

  async getMessages(conversationId: string): Promise<ApiResponse> {
    return this.client.request(`/conversations/${conversationId}/messages`);
  }

  async sendMessage(dto: SendMessageDto): Promise<ApiResponse> {
    return this.client.request('/conversations/messages', {
      method: 'POST',
      body: dto,
    });
  }
}

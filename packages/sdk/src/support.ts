import { EasyChatHttpClient } from './client';
import {
  ApiResponse,
  CreateTicketDto,
  AddTicketCommentDto,
  CreateKnowledgeArticleDto,
} from '@easychat/shared';

export class SupportModule {
  constructor(private client: EasyChatHttpClient) {}

  async listTickets(): Promise<ApiResponse> {
    return this.client.request('/support/tickets');
  }

  async createTicket(dto: CreateTicketDto): Promise<ApiResponse> {
    return this.client.request('/support/tickets', {
      method: 'POST',
      body: dto,
    });
  }

  async updateTicketStatus(ticketId: string, status: string): Promise<ApiResponse> {
    return this.client.request(`/support/tickets/${ticketId}/status`, {
      method: 'PATCH',
      body: { status },
    });
  }

  async addTicketComment(dto: AddTicketCommentDto): Promise<ApiResponse> {
    return this.client.request('/support/tickets/comments', {
      method: 'POST',
      body: dto,
    });
  }

  async listKnowledgeArticles(category?: string): Promise<ApiResponse> {
    return this.client.request('/support/knowledge-base/articles', {
      queryParams: { category },
    });
  }

  async createKnowledgeArticle(dto: CreateKnowledgeArticleDto): Promise<ApiResponse> {
    return this.client.request('/support/knowledge-base/articles', {
      method: 'POST',
      body: dto,
    });
  }
}

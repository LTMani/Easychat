import { EasyChatHttpClient } from './client';
import { ApiResponse, CreateApiKeyDto, CreateWebhookEndpointDto, CreateCustomFieldDto } from '@easychat/shared';

export class PlatformModule {
  constructor(private client: EasyChatHttpClient) {}

  async listApiKeys(): Promise<ApiResponse> {
    return this.client.request('/platform/api-keys');
  }

  async createApiKey(dto: CreateApiKeyDto): Promise<ApiResponse> {
    return this.client.request('/platform/api-keys', {
      method: 'POST',
      body: dto,
    });
  }

  async listWebhooks(): Promise<ApiResponse> {
    return this.client.request('/platform/webhooks');
  }

  async createWebhook(dto: CreateWebhookEndpointDto): Promise<ApiResponse> {
    return this.client.request('/platform/webhooks', {
      method: 'POST',
      body: dto,
    });
  }

  async getAuditLogs(): Promise<ApiResponse> {
    return this.client.request('/enterprise/audit-logs');
  }

  async listCustomFields(): Promise<ApiResponse> {
    return this.client.request('/enterprise/custom-fields');
  }

  async createCustomField(dto: CreateCustomFieldDto): Promise<ApiResponse> {
    return this.client.request('/enterprise/custom-fields', {
      method: 'POST',
      body: dto,
    });
  }
}

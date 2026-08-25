import { EasyChatHttpClient } from './client';
import { ApiResponse, CreateWorkflowRuleDto } from '@easychat/shared';

export class AutomationModule {
  constructor(private client: EasyChatHttpClient) {}

  async listWorkflows(): Promise<ApiResponse> {
    return this.client.request('/automation/workflows');
  }

  async createWorkflow(dto: CreateWorkflowRuleDto): Promise<ApiResponse> {
    return this.client.request('/automation/workflows', {
      method: 'POST',
      body: dto,
    });
  }

  async executeWorkflow(workflowId: string, payload: any): Promise<ApiResponse> {
    return this.client.request(`/automation/workflows/${workflowId}/execute`, {
      method: 'POST',
      body: payload,
    });
  }
}

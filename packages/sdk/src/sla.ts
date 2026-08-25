import { EasyChatHttpClient } from './client';
import { CreateSlaPolicyDto, CreateTicketQueueDto } from '@easychat/shared';

export class SlaApi {
  constructor(private client: EasyChatHttpClient) {}

  async listPolicies(): Promise<any> {
    return this.client.get('/sla/policies');
  }

  async createPolicy(dto: CreateSlaPolicyDto): Promise<any> {
    return this.client.post('/sla/policies', dto);
  }

  async getPolicyById(id: string): Promise<any> {
    return this.client.get(`/sla/policies/${id}`);
  }

  async updatePolicy(id: string, dto: Partial<CreateSlaPolicyDto>): Promise<any> {
    return this.client.put(`/sla/policies/${id}`, dto);
  }

  async deletePolicy(id: string): Promise<any> {
    return this.client.delete(`/sla/policies/${id}`);
  }

  async listQueues(): Promise<any> {
    return this.client.get('/sla/queues');
  }

  async createQueue(dto: CreateTicketQueueDto): Promise<any> {
    return this.client.post('/sla/queues', dto);
  }

  async getBreachLogs(): Promise<any> {
    return this.client.get('/sla/breaches');
  }
}

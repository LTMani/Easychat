import { EasyChatHttpClient } from './client';
import {
  ApiResponse,
  CreateContactDto,
  CreateCompanyDto,
  CreateLeadDto,
  CreateDealDto,
  UpdateDealStageDto,
} from '@easychat/shared';

export class CrmModule {
  constructor(private client: EasyChatHttpClient) {}

  async listContacts(): Promise<ApiResponse> {
    return this.client.request('/crm/contacts');
  }

  async createContact(dto: CreateContactDto): Promise<ApiResponse> {
    return this.client.request('/crm/contacts', {
      method: 'POST',
      body: dto,
    });
  }

  async listCompanies(): Promise<ApiResponse> {
    return this.client.request('/crm/companies');
  }

  async createCompany(dto: CreateCompanyDto): Promise<ApiResponse> {
    return this.client.request('/crm/companies', {
      method: 'POST',
      body: dto,
    });
  }

  async listLeads(): Promise<ApiResponse> {
    return this.client.request('/crm/leads');
  }

  async createLead(dto: CreateLeadDto): Promise<ApiResponse> {
    return this.client.request('/crm/leads', {
      method: 'POST',
      body: dto,
    });
  }

  async convertLead(leadId: string): Promise<ApiResponse> {
    return this.client.request(`/crm/leads/${leadId}/convert`, {
      method: 'PATCH',
    });
  }

  async getPipelines(): Promise<ApiResponse> {
    return this.client.request('/crm/pipelines');
  }

  async listDeals(pipelineId?: string): Promise<ApiResponse> {
    return this.client.request('/crm/deals', {
      queryParams: { pipelineId },
    });
  }

  async createDeal(dto: CreateDealDto): Promise<ApiResponse> {
    return this.client.request('/crm/deals', {
      method: 'POST',
      body: dto,
    });
  }

  async updateDealStage(dealId: string, dto: UpdateDealStageDto): Promise<ApiResponse> {
    return this.client.request(`/crm/deals/${dealId}/stage`, {
      method: 'PATCH',
      body: dto,
    });
  }
}

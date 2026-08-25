export interface SlaPolicyItem {
  id: string;
  name: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  firstResponseMinutes: number;
  nextResponseMinutes: number;
  resolutionMinutes: number;
  isDefault: boolean;
  businessHoursOnly?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlaPolicyParams {
  name: string;
  description?: string;
  priority: SlaPolicyItem['priority'];
  firstResponseMinutes: number;
  nextResponseMinutes?: number;
  resolutionMinutes: number;
  isDefault?: boolean;
  businessHoursOnly?: boolean;
}

export interface SlaBreachItem {
  id: string;
  slaPolicyId: string;
  ticketId: string;
  breachType: 'FIRST_RESPONSE' | 'RESOLUTION';
  targetMinutes: number;
  actualMinutes: number;
  breachedAt: string;
}

export class SlaResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async listPolicies(): Promise<{ data: SlaPolicyItem[]; total: number }> {
    return this.fetcher('/v1/sla/policies');
  }

  async getPolicy(id: string): Promise<SlaPolicyItem> {
    return this.fetcher(`/v1/sla/policies/${id}`);
  }

  async createPolicy(params: CreateSlaPolicyParams): Promise<SlaPolicyItem> {
    return this.fetcher('/v1/sla/policies', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async updatePolicy(id: string, params: Partial<CreateSlaPolicyParams>): Promise<SlaPolicyItem> {
    return this.fetcher(`/v1/sla/policies/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
    });
  }

  async deletePolicy(id: string): Promise<{ success: boolean; id: string }> {
    return this.fetcher(`/v1/sla/policies/${id}`, {
      method: 'DELETE',
    });
  }

  async listBreaches(params?: { from?: string; to?: string; policyId?: string; limit?: number }): Promise<{ data: SlaBreachItem[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.from) query.set('from', params.from);
    if (params?.to) query.set('to', params.to);
    if (params?.policyId) query.set('policyId', params.policyId);
    if (params?.limit) query.set('limit', String(params.limit));

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.fetcher(`/v1/sla/breaches${qs}`);
  }

  async getComplianceMetrics(policyId?: string): Promise<{ totalTickets: number; breachedCount: number; complianceRate: number }> {
    const query = policyId ? `?policyId=${policyId}` : '';
    return this.fetcher(`/v1/sla/metrics${query}`);
  }
}

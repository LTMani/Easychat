// EasyChat TypeScript SDK — Full Client Implementation

import type {
  Contact,
  Deal,
  Ticket,
  Conversation,
  Lead,
  Pipeline,
  BroadcastCampaign,
  Webhook,
  Organization,
  OrganizationMember,
  WorkflowRule,
  PaginatedResponse,
  ApiResponse,
  ApiError,
} from '@easychat/shared/src/types/models';
import type {
  CreateContactDto,
  UpdateContactDto,
  ContactFilterDto,
  CreateDealDto,
  UpdateDealDto,
  MoveDealDto,
  CreateTicketDto,
  UpdateTicketDto,
  SendMessageDto,
  CreateLeadDto,
  CreateCampaignDto,
  CreateWebhookDto,
  CreateApiKeyDto,
  SegmentCriteriaDto,
  UpdateOrganizationDto,
  InviteMemberDto,
  ReportQueryDto,
  Pagination,
} from '@easychat/shared/src/schemas/index';

// ─── Configuration ────────────────────────────────────────────────────────────

export interface EasyChatClientConfig {
  apiKey?: string;
  accessToken?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

// ─── HTTP Client ──────────────────────────────────────────────────────────────

class HttpClient {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly debug: boolean;

  constructor(config: EasyChatClientConfig) {
    this.baseUrl = config.baseUrl ?? 'https://api.easychat.io/v1';
    this.timeout = config.timeout ?? 10000;
    this.retries = config.retries ?? 2;
    this.debug = config.debug ?? false;

    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-SDK-Version': '1.0.0',
      'X-SDK-Language': 'typescript',
    };

    if (config.apiKey) this.headers['X-API-Key'] = config.apiKey;
    if (config.accessToken) this.headers['Authorization'] = `Bearer ${config.accessToken}`;
  }

  private buildUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.set(key, String(value));
          }
        }
      });
    }
    return url.toString();
  }

  async request<T>(method: string, path: string, options?: { body?: unknown; params?: Record<string, unknown> }): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        if (this.debug) console.log(`[EasyChat SDK] ${method} ${url} (attempt ${attempt + 1})`);

        const response = await fetch(url, {
          method,
          headers: this.headers,
          body: options?.body ? JSON.stringify(options.body) : undefined,
          signal: AbortSignal.timeout(this.timeout),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({})) as Partial<ApiError>;
          const error = new EasyChatError(
            errorBody.message ?? `HTTP ${response.status}`,
            response.status,
            errorBody.code ?? 'API_ERROR',
            errorBody,
          );
          if (response.status < 500) throw error;
          lastError = error;
          if (attempt < this.retries) await this.sleep(Math.pow(2, attempt) * 500);
          continue;
        }

        const data = await response.json() as ApiResponse<T>;
        return (data as any).data ?? data as T;
      } catch (err: any) {
        if (err instanceof EasyChatError && err.statusCode < 500) throw err;
        lastError = err;
        if (attempt < this.retries) await this.sleep(Math.pow(2, attempt) * 500);
      }
    }

    throw lastError ?? new Error('Unknown error');
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>('GET', path, { params });
  }

  async post<T>(path: string, body?: unknown, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>('POST', path, { body, params });
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, { body });
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, { body });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ─── Custom Error ─────────────────────────────────────────────────────────────

export class EasyChatError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'EasyChatError';
  }

  isNotFound(): boolean { return this.statusCode === 404; }
  isUnauthorized(): boolean { return this.statusCode === 401; }
  isForbidden(): boolean { return this.statusCode === 403; }
  isRateLimited(): boolean { return this.statusCode === 429; }
  isValidationError(): boolean { return this.statusCode === 400; }
}

// ─── Contacts Resource ────────────────────────────────────────────────────────

class ContactsResource {
  constructor(private http: HttpClient) {}

  list(filter?: ContactFilterDto & Pagination): Promise<PaginatedResponse<Contact>> {
    return this.http.get('/contacts', filter as Record<string, unknown>);
  }

  get(id: string): Promise<Contact> {
    return this.http.get(`/contacts/${id}`);
  }

  create(data: CreateContactDto): Promise<Contact> {
    return this.http.post('/contacts', data);
  }

  update(id: string, data: UpdateContactDto): Promise<Contact> {
    return this.http.patch(`/contacts/${id}`, data);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/contacts/${id}`);
  }

  getActivities(contactId: string, pagination?: Pagination): Promise<PaginatedResponse<unknown>> {
    return this.http.get(`/contacts/${contactId}/activities`, pagination as Record<string, unknown>);
  }

  getDeals(contactId: string): Promise<Deal[]> {
    return this.http.get(`/contacts/${contactId}/deals`);
  }

  getTickets(contactId: string): Promise<Ticket[]> {
    return this.http.get(`/contacts/${contactId}/tickets`);
  }

  getTimeline(contactId: string): Promise<unknown[]> {
    return this.http.get(`/contacts/${contactId}/timeline`);
  }

  score(contactId: string): Promise<{ score: number; signals: Record<string, number> }> {
    return this.http.post(`/contacts/${contactId}/score`);
  }

  merge(primaryId: string, duplicateId: string): Promise<Contact> {
    return this.http.post(`/contacts/${primaryId}/merge`, { duplicateId });
  }

  bulkImport(csvUrl: string, mappings: Record<string, string>): Promise<{ importId: string }> {
    return this.http.post('/contacts/bulk-import', { csvUrl, mappings });
  }

  segment(criteria: SegmentCriteriaDto): Promise<{ contacts: Contact[]; count: number }> {
    return this.http.post('/contacts/segment', criteria);
  }
}

// ─── Deals Resource ───────────────────────────────────────────────────────────

class DealsResource {
  constructor(private http: HttpClient) {}

  list(filter?: Record<string, unknown> & Pagination): Promise<PaginatedResponse<Deal>> {
    return this.http.get('/deals', filter);
  }

  get(id: string): Promise<Deal> {
    return this.http.get(`/deals/${id}`);
  }

  create(data: CreateDealDto): Promise<Deal> {
    return this.http.post('/deals', data);
  }

  update(id: string, data: UpdateDealDto): Promise<Deal> {
    return this.http.patch(`/deals/${id}`, data);
  }

  moveStage(id: string, data: MoveDealDto): Promise<Deal> {
    return this.http.post(`/deals/${id}/stage`, data);
  }

  markWon(id: string): Promise<Deal> {
    return this.http.post(`/deals/${id}/won`);
  }

  markLost(id: string, reason?: string): Promise<Deal> {
    return this.http.post(`/deals/${id}/lost`, { reason });
  }

  getActivities(id: string): Promise<unknown[]> {
    return this.http.get(`/deals/${id}/activities`);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/deals/${id}`);
  }

  getForecast(pipelineId: string): Promise<unknown> {
    return this.http.get(`/deals/forecast`, { pipelineId });
  }
}

// ─── Tickets Resource ─────────────────────────────────────────────────────────

class TicketsResource {
  constructor(private http: HttpClient) {}

  list(filter?: Record<string, unknown> & Pagination): Promise<PaginatedResponse<Ticket>> {
    return this.http.get('/tickets', filter);
  }

  get(id: string): Promise<Ticket> {
    return this.http.get(`/tickets/${id}`);
  }

  create(data: CreateTicketDto): Promise<Ticket> {
    return this.http.post('/tickets', data);
  }

  update(id: string, data: UpdateTicketDto): Promise<Ticket> {
    return this.http.patch(`/tickets/${id}`, data);
  }

  reply(id: string, content: string, attachmentUrls?: string[]): Promise<unknown> {
    return this.http.post(`/tickets/${id}/reply`, { content, attachmentUrls });
  }

  assign(id: string, userId: string): Promise<Ticket> {
    return this.http.post(`/tickets/${id}/assign`, { userId });
  }

  resolve(id: string): Promise<Ticket> {
    return this.http.post(`/tickets/${id}/resolve`);
  }

  close(id: string): Promise<Ticket> {
    return this.http.post(`/tickets/${id}/close`);
  }

  escalate(id: string, reason: string): Promise<void> {
    return this.http.post(`/tickets/${id}/escalate`, { reason });
  }
}

// ─── Conversations Resource ───────────────────────────────────────────────────

class ConversationsResource {
  constructor(private http: HttpClient) {}

  list(filter?: Record<string, unknown> & Pagination): Promise<PaginatedResponse<Conversation>> {
    return this.http.get('/conversations', filter);
  }

  get(id: string): Promise<Conversation> {
    return this.http.get(`/conversations/${id}`);
  }

  getMessages(id: string, pagination?: Pagination): Promise<PaginatedResponse<unknown>> {
    return this.http.get(`/conversations/${id}/messages`, pagination as Record<string, unknown>);
  }

  sendMessage(id: string, data: SendMessageDto): Promise<unknown> {
    return this.http.post(`/conversations/${id}/messages`, data);
  }

  assign(id: string, userId: string): Promise<Conversation> {
    return this.http.post(`/conversations/${id}/assign`, { userId });
  }

  resolve(id: string): Promise<Conversation> {
    return this.http.post(`/conversations/${id}/resolve`);
  }

  archive(id: string): Promise<Conversation> {
    return this.http.post(`/conversations/${id}/archive`);
  }
}

// ─── Leads Resource ───────────────────────────────────────────────────────────

class LeadsResource {
  constructor(private http: HttpClient) {}

  list(filter?: Record<string, unknown> & Pagination): Promise<PaginatedResponse<Lead>> {
    return this.http.get('/leads', filter);
  }

  get(id: string): Promise<Lead> {
    return this.http.get(`/leads/${id}`);
  }

  create(data: CreateLeadDto): Promise<Lead> {
    return this.http.post('/leads', data);
  }

  score(id: string): Promise<{ score: number }> {
    return this.http.post(`/leads/${id}/score`);
  }

  convert(id: string): Promise<{ contactId: string; dealId?: string }> {
    return this.http.post(`/leads/${id}/convert`);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/leads/${id}`);
  }
}

// ─── Campaigns Resource ───────────────────────────────────────────────────────

class CampaignsResource {
  constructor(private http: HttpClient) {}

  list(pagination?: Pagination): Promise<PaginatedResponse<BroadcastCampaign>> {
    return this.http.get('/marketing/campaigns', pagination as Record<string, unknown>);
  }

  create(data: CreateCampaignDto): Promise<BroadcastCampaign> {
    return this.http.post('/marketing/campaigns', data);
  }

  send(id: string): Promise<{ queued: number }> {
    return this.http.post(`/marketing/campaigns/${id}/send`);
  }

  getStats(id: string): Promise<{ sent: number; opened: number; clicked: number; bounced: number; unsubscribed: number }> {
    return this.http.get(`/marketing/campaigns/${id}/stats`);
  }
}

// ─── Reports Resource ─────────────────────────────────────────────────────────

class ReportsResource {
  constructor(private http: HttpClient) {}

  pivot(query: ReportQueryDto): Promise<unknown> {
    return this.http.get('/reports/pivot', query as Record<string, unknown>);
  }

  agentPerformance(from?: string, to?: string): Promise<unknown[]> {
    return this.http.get('/reports/agent-performance', { from, to });
  }

  slaCompliance(from?: string, to?: string): Promise<unknown[]> {
    return this.http.get('/reports/sla-compliance', { from, to });
  }

  revenueForecast(pipelineId?: string): Promise<unknown[]> {
    return this.http.get('/reports/revenue-forecast', { pipelineId });
  }

  export(query: ReportQueryDto, format: 'CSV' | 'PDF' | 'EXCEL'): Promise<{ downloadUrl: string }> {
    return this.http.post('/reports/export', { query, format });
  }
}

// ─── Webhooks Resource ────────────────────────────────────────────────────────

class WebhooksResource {
  constructor(private http: HttpClient) {}

  list(): Promise<Webhook[]> {
    return this.http.get('/webhooks');
  }

  create(data: CreateWebhookDto): Promise<Webhook> {
    return this.http.post('/webhooks', data);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/webhooks/${id}`);
  }

  getDeliveries(id: string): Promise<unknown[]> {
    return this.http.get(`/webhooks/${id}/deliveries`);
  }

  retry(webhookId: string, deliveryId: string): Promise<void> {
    return this.http.post(`/webhooks/${webhookId}/deliveries/${deliveryId}/retry`);
  }
}

// ─── Organization Resource ────────────────────────────────────────────────────

class OrganizationResource {
  constructor(private http: HttpClient) {}

  get(): Promise<Organization> {
    return this.http.get('/organization');
  }

  update(data: UpdateOrganizationDto): Promise<Organization> {
    return this.http.patch('/organization', data);
  }

  getMembers(): Promise<OrganizationMember[]> {
    return this.http.get('/organization/members');
  }

  inviteMember(data: InviteMemberDto): Promise<{ inviteId: string }> {
    return this.http.post('/organization/members/invite', data);
  }

  removeMember(userId: string): Promise<void> {
    return this.http.delete(`/organization/members/${userId}`);
  }

  getOnboardingProgress(): Promise<{ completedSteps: number; totalSteps: number; percentComplete: number }> {
    return this.http.get('/organization/onboarding');
  }
}

// ─── API Keys Resource ────────────────────────────────────────────────────────

class ApiKeysResource {
  constructor(private http: HttpClient) {}

  list(): Promise<Array<{ id: string; name: string; prefix: string; permissions: string[]; lastUsedAt?: string }>> {
    return this.http.get('/developer/api-keys');
  }

  create(data: CreateApiKeyDto): Promise<{ id: string; key: string; prefix: string }> {
    return this.http.post('/developer/api-keys', data);
  }

  revoke(id: string): Promise<void> {
    return this.http.delete(`/developer/api-keys/${id}`);
  }
}

// ─── System Resource ──────────────────────────────────────────────────────────

class SystemResource {
  constructor(private http: HttpClient) {}

  health(): Promise<{ overallStatus: string; checks: Array<{ service: string; status: string; latencyMs?: number }> }> {
    return this.http.get('/health');
  }
}

// ─── Main Client ──────────────────────────────────────────────────────────────

export class EasyChatClient {
  public readonly contacts: ContactsResource;
  public readonly deals: DealsResource;
  public readonly tickets: TicketsResource;
  public readonly conversations: ConversationsResource;
  public readonly leads: LeadsResource;
  public readonly campaigns: CampaignsResource;
  public readonly reports: ReportsResource;
  public readonly webhooks: WebhooksResource;
  public readonly organization: OrganizationResource;
  public readonly apiKeys: ApiKeysResource;
  public readonly system: SystemResource;

  private readonly http: HttpClient;

  constructor(config: EasyChatClientConfig) {
    this.http = new HttpClient(config);
    this.contacts = new ContactsResource(this.http);
    this.deals = new DealsResource(this.http);
    this.tickets = new TicketsResource(this.http);
    this.conversations = new ConversationsResource(this.http);
    this.leads = new LeadsResource(this.http);
    this.campaigns = new CampaignsResource(this.http);
    this.reports = new ReportsResource(this.http);
    this.webhooks = new WebhooksResource(this.http);
    this.organization = new OrganizationResource(this.http);
    this.apiKeys = new ApiKeysResource(this.http);
    this.system = new SystemResource(this.http);
  }

  static withApiKey(apiKey: string, options?: Omit<EasyChatClientConfig, 'apiKey'>): EasyChatClient {
    return new EasyChatClient({ apiKey, ...options });
  }

  static withAccessToken(accessToken: string, options?: Omit<EasyChatClientConfig, 'accessToken'>): EasyChatClient {
    return new EasyChatClient({ accessToken, ...options });
  }
}

export default EasyChatClient;

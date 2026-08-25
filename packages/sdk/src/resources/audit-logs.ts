export interface AuditLogItem {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  currentStateHash?: string;
  createdAt: string;
}

export interface AuditLogListParams {
  entityType?: string;
  entityId?: string;
  userId?: string;
  action?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export class AuditLogsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(params?: AuditLogListParams): Promise<{ data: AuditLogItem[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.entityType) query.set('entityType', params.entityType);
    if (params?.entityId) query.set('entityId', params.entityId);
    if (params?.userId) query.set('userId', params.userId);
    if (params?.action) query.set('action', params.action);
    if (params?.from) query.set('from', params.from);
    if (params?.to) query.set('to', params.to);
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.offset) query.set('offset', String(params.offset));

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.fetcher(`/v1/audit-logs${qs}`);
  }

  async get(id: string): Promise<AuditLogItem> {
    return this.fetcher(`/v1/audit-logs/${id}`);
  }

  async verifyIntegrity(id: string): Promise<{ isVerified: boolean; calculatedHash: string; storedHash: string }> {
    return this.fetcher(`/v1/audit-logs/${id}/verify`);
  }

  async exportCsv(from?: string, to?: string): Promise<string> {
    const query = new URLSearchParams();
    if (from) query.set('from', from);
    if (to) query.set('to', to);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.fetcher(`/v1/audit-logs/export/csv${qs}`);
  }
}

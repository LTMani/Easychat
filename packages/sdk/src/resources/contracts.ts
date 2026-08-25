export interface ContractItem {
  id: string;
  organizationId: string;
  title: string;
  documentHash: string;
  status: 'DRAFT' | 'SENT_FOR_SIGNATURE' | 'VIEWED' | 'SIGNED' | 'DECLINED' | 'EXPIRED';
  recipients: Array<{
    email: string;
    name: string;
    role: 'SIGNER' | 'VIEWER' | 'APPROVER';
    status: 'PENDING' | 'VIEWED' | 'SIGNED' | 'DECLINED';
    signedAt?: string;
  }>;
  expiresAt: string;
  signedAt?: string;
  auditCertificateId?: string;
  createdAt: string;
}

export interface CreateContractParams {
  title: string;
  contentHtml: string;
  recipients: Array<{ email: string; name: string; role?: 'SIGNER' | 'VIEWER' | 'APPROVER' }>;
  expiresInDays?: number;
}

export class ContractsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(status?: ContractItem['status']): Promise<{ data: ContractItem[]; total: number }> {
    const query = status ? `?status=${status}` : '';
    return this.fetcher(`/v1/contracts${query}`);
  }

  async get(id: string): Promise<ContractItem> {
    return this.fetcher(`/v1/contracts/${id}`);
  }

  async create(params: CreateContractParams): Promise<ContractItem> {
    return this.fetcher('/v1/contracts', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async send(id: string): Promise<ContractItem> {
    return this.fetcher(`/v1/contracts/${id}/send`, {
      method: 'POST',
    });
  }

  async sign(
    id: string,
    params: { signerEmail: string; signatureDataUrl: string; ipAddress?: string },
  ): Promise<{ contract: ContractItem; isFullySigned: boolean }> {
    return this.fetcher(`/v1/contracts/${id}/sign`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getAuditCertificate(id: string): Promise<Record<string, unknown>> {
    return this.fetcher(`/v1/contracts/${id}/certificate`);
  }
}

export interface QuoteLineItem {
  id?: string;
  productId?: string;
  name: string;
  unitPrice: number;
  quantity: number;
  discountPercent?: number;
  totalPrice?: number;
}

export interface QuoteItem {
  id: string;
  dealId?: string;
  contactId?: string;
  quoteNumber: string;
  title: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'SIGNED' | 'EXPIRED' | 'REJECTED';
  currency: string;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  items: QuoteLineItem[];
  expiresAt?: string;
  createdAt: string;
}

export class QuotesResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(status?: QuoteItem['status']): Promise<{ data: QuoteItem[]; total: number }> {
    const query = status ? `?status=${status}` : '';
    return this.fetcher(`/v1/quotes${query}`);
  }

  async get(id: string): Promise<QuoteItem> {
    return this.fetcher(`/v1/quotes/${id}`);
  }

  async create(params: {
    title: string;
    dealId?: string;
    contactId?: string;
    items: Array<Omit<QuoteLineItem, 'id' | 'totalPrice'>>;
    notes?: string;
  }): Promise<QuoteItem> {
    return this.fetcher('/v1/quotes', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async send(id: string): Promise<QuoteItem> {
    return this.fetcher(`/v1/quotes/${id}/send`, {
      method: 'POST',
    });
  }

  async downloadPdf(id: string): Promise<ArrayBuffer> {
    return this.fetcher(`/v1/quotes/${id}/pdf`);
  }
}

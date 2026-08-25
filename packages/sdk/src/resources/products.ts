export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  currency: string;
  category?: string;
  description?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
}

export interface CreateProductParams {
  name: string;
  sku: string;
  price: number;
  currency?: string;
  category?: string;
  description?: string;
}

export class ProductsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(params?: { category?: string; status?: ProductItem['status'] }): Promise<{ data: ProductItem[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.status) query.set('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.fetcher(`/v1/products${qs}`);
  }

  async get(id: string): Promise<ProductItem> {
    return this.fetcher(`/v1/products/${id}`);
  }

  async create(params: CreateProductParams): Promise<ProductItem> {
    return this.fetcher('/v1/products', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async update(id: string, params: Partial<CreateProductParams>): Promise<ProductItem> {
    return this.fetcher(`/v1/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
    });
  }

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    return this.fetcher(`/v1/products/${id}`, {
      method: 'DELETE',
    });
  }
}

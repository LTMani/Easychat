export interface CustomFieldDefinition {
  id: string;
  name: string;
  key: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'SELECT' | 'MULTI_SELECT' | 'URL' | 'EMAIL' | 'JSON';
  target: 'CONTACT' | 'DEAL' | 'TICKET' | 'LEAD' | 'PRODUCT' | 'COMPANY';
  isRequired: boolean;
  defaultValue?: unknown;
  options?: string[];
  description?: string;
  validationRegex?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomFieldParams {
  name: string;
  key: string;
  type: CustomFieldDefinition['type'];
  target: CustomFieldDefinition['target'];
  isRequired?: boolean;
  defaultValue?: unknown;
  options?: string[];
  description?: string;
  validationRegex?: string;
}

export interface UpdateCustomFieldParams {
  name?: string;
  isRequired?: boolean;
  defaultValue?: unknown;
  options?: string[];
  description?: string;
  validationRegex?: string;
}

export class CustomFieldsResource {
  constructor(private readonly fetcher: (path: string, options?: RequestInit) => Promise<any>) {}

  async list(target?: CustomFieldDefinition['target']): Promise<{ data: CustomFieldDefinition[]; total: number }> {
    const query = target ? `?target=${target}` : '';
    return this.fetcher(`/v1/custom-fields${query}`);
  }

  async get(id: string): Promise<CustomFieldDefinition> {
    return this.fetcher(`/v1/custom-fields/${id}`);
  }

  async getByKey(key: string, target: CustomFieldDefinition['target']): Promise<CustomFieldDefinition> {
    return this.fetcher(`/v1/custom-fields/key/${key}?target=${target}`);
  }

  async create(params: CreateCustomFieldParams): Promise<CustomFieldDefinition> {
    return this.fetcher('/v1/custom-fields', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async update(id: string, params: UpdateCustomFieldParams): Promise<CustomFieldDefinition> {
    return this.fetcher(`/v1/custom-fields/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
    });
  }

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    return this.fetcher(`/v1/custom-fields/${id}`, {
      method: 'DELETE',
    });
  }

  async validateValues(
    target: CustomFieldDefinition['target'],
    values: Record<string, unknown>,
  ): Promise<{ isValid: boolean; normalizedValues: Record<string, unknown>; errors: Record<string, string[]> }> {
    return this.fetcher('/v1/custom-fields/validate', {
      method: 'POST',
      body: JSON.stringify({ target, values }),
    });
  }
}

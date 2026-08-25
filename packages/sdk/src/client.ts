import { ApiResponse } from '@easychat/shared';

export interface EasyChatSdkConfig {
  baseUrl?: string;
  apiKey?: string;
  accessToken?: string;
  timeoutMs?: number;
}

export class EasyChatHttpClient {
  private baseUrl: string;
  private apiKey?: string;
  private accessToken?: string;
  private timeoutMs: number;

  constructor(config: EasyChatSdkConfig = {}) {
    this.baseUrl = config.baseUrl || 'http://localhost:4000/api/v1';
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken;
    this.timeoutMs = config.timeoutMs || 15000;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public setApiKey(key: string) {
    this.apiKey = key;
  }

  public async request<T = any>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      body?: any;
      queryParams?: Record<string, string | number | boolean | undefined>;
      headers?: Record<string, string>;
    } = {},
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, queryParams, headers = {} } = options;

    let url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (queryParams) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    };

    if (this.accessToken) {
      requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
    } else if (this.apiKey) {
      requestHeaders['X-API-Key'] = this.apiKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: json.message || response.statusText || 'API Request Failed',
          message: json.message,
        };
      }

      return json;
    } catch (error: any) {
      clearTimeout(timeoutId);
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Request Timeout' : error.message || 'Network Error',
      };
    }
  }

  public async get<T = any>(endpoint: string, queryParams?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', queryParams });
  }

  public async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  public async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  public async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

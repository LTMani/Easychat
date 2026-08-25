export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function fetchApi<T = any>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  } = {},
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  const { method = 'GET', body, headers = {} } = options;
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: json.message || res.statusText || 'API Request Failed',
        message: json.message,
      };
    }

    return json;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network Error',
    };
  }
}

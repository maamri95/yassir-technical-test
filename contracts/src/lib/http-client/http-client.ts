export abstract class HttpClient {
  public abstract request<T>(method: HttpClientMethod, url: string, options?: HttpClientOptionsWithBody): Promise<T>;

  public get<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.request<T>('GET', url, options);
  }

  public post<T>(url: string, body: unknown, options?: HttpClientOptions): Promise<T> {
    return this.request<T>('POST', url, { ...options, body });
  }

  public put<T>(url: string, body: unknown, options?: HttpClientOptions): Promise<T> {
    return this.request<T>('PUT', url, { ...options, body });
  }

  public delete<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.request<T>('DELETE', url, options);
  }

  protected transformParams(params?: Record<string, string>): string {
    if (!params) return '';
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    return `?${searchParams.toString()}`;
  }
}

export interface HttpClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

export type HttpClientOptionsWithBody = HttpClientOptions & {body?: unknown};

export type HttpClientMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
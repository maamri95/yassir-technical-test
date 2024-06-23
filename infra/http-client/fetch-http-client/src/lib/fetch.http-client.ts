import {errors, HttpClient, HttpClientError, HttpClientMethod, HttpClientOptionsWithBody} from "contracts";

export class FetchHttpClient extends HttpClient {
  constructor(
      private readonly baseUrl: string,
      private readonly defaultOptions?: RequestInit, private readonly client= fetch) {
    super();
  }
  async request<T>(method: HttpClientMethod, url: string, options?: HttpClientOptionsWithBody): Promise<T> {
    const response = await this.client(this.buildUrl(url, options?.params), this.buildOptions(method, options));
    this.handleErrors(response);
    return response.json();
  }
  private buildUrl(url: string, params?: Record<string, string>): string {
    const query = this.transformParams(params);
    const requestUrl = new URL(`${url}${query}`, this.baseUrl);
    return requestUrl.toString();
  }
  private buildOptions(method: HttpClientMethod, options?: HttpClientOptionsWithBody): RequestInit {
    const result:RequestInit = {}
    result.method = method;
    const headers = {
      ...this.defaultOptions?.headers,
      ...options?.headers,
    };
    if (options?.body) {
      result.body = options.body;
    }
    if (Object.keys(headers).length > 0) {
      result.headers = headers;
    }
    return result;
  }
  private handleErrors(response: Response) {
    if (response.ok) return
    if (response.status in errors){
      throw new errors[response.status as keyof typeof errors]();
    }else {
      throw new HttpClientError(response.status, response.statusText);
    }
  }
}
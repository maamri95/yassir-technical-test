import {errors, HttpClient, HttpClientError, HttpClientMethod, HttpClientOptionsWithBody} from "contracts";
import ky, {Options} from "ky";

export class KyHttpClient extends HttpClient{
  constructor(private readonly client: typeof ky) {
    super();
  }
  async request<T>(method: HttpClientMethod, url: string, options?: HttpClientOptionsWithBody): Promise<T> {
    try {
      return this.client(url, this.buildOptions(method, options)).json<T>();
    } catch (error) {
      this.handleErrors(error as Error);
      return {} as T;
    }
  }

  private buildOptions(method: HttpClientMethod, options: HttpClientOptionsWithBody | undefined): Options {
    const result: Options = {};
    result.method = method;
    if (options?.body) {
      result.body = options.body;
    }
    if (options?.headers) {
      result.headers = options.headers;
    }
    if (options?.params) {
        result.searchParams = options.params;
    }
    return result;
  }

  private handleErrors(error: Error) {
    if (error instanceof ky.HTTPError) {
      if (error.response.status in errors){
        throw new errors[error.response.status as keyof typeof errors]();
      } else {
        throw new HttpClientError(error.response.status, error.response.statusText)
      }
    }
  }
}
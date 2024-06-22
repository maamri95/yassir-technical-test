import {HttpClient, HttpClientMethod, HttpClientOptionsWithBody} from "./http-client";
import {errors} from "./http-client-error";

/**
 * MockHttpClient is a mock implementation of HttpClient that returns mocked data.
 * It can be used in tests to avoid making real HTTP requests.
 * You can configure the delay, data, and error that the request should return, using the params option.
 * @example
 * ```typescript
 * const httpClient = new MockHttpClient();
 * const data = await httpClient.request('GET', 'url', { params: { error: 404 } }); // throw NotFoundError
 * ```
 * @example
 * ```typescript
 * const httpClient = new MockHttpClient();
 * const data = await httpClient.request('GET', 'url', { params: { data: { data: { message: "hello world" } } } });
 * console.log(data); // { data: { message: "hello world" } }
 * ```
 * @example
 * ```typescript
 * const httpClient = new MockHttpClient();
 * const data = await httpClient.request('GET', 'url', { params: { delay: 1000 } });
 * console.log(data); // resolve after 1s with { data: 'mocked data' }
 * ```
 * @category HTTP Client
 * @class MockHttpClient
 * @extends HttpClient
 */
export class MockHttpClient extends HttpClient {
    override async request<T>(method: HttpClientMethod, url: string, options?: HttpClientOptionsWithBody) {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                if (options?.params?.['error']) {
                    reject(new errors[options.params['error'] as keyof typeof errors]());
                }
                resolve(options?.params?.["data"] as T ?? {
                    data: 'mocked data',
                } as unknown as T);
            }, options?.params?.["delay"] as number ?? 0);
        });
    }
}
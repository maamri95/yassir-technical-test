import {beforeAll, describe, expect, vi} from "vitest";
import {errors} from "./http-client-error";
import {HttpClient} from "./http-client";
import {MockHttpClient} from "./mock-http-client";


describe('http-client', () => {
  let httpClient: HttpClient;
  beforeAll(() => {
    httpClient = new MockHttpClient();
  });

  it('should be defined', () => {
    expect(httpClient).toBeDefined();
  });

  describe('request', () => {
    it('should return mocked data', async () => {
      const data = await httpClient.request('GET', 'url', { params: { delay: 1000 } });
      expect(data).toEqual({ data: 'mocked data' });
    });

    for (const error in errors) {
        it(`should throw error ${error}`, async () => {
            expect(httpClient.request('GET', 'url', { params: { error: error } })).rejects.toThrowError(errors[error as unknown as keyof typeof errors]);
        });
    }

  });

  describe('methods', () => {
    for (const method of ['POST', 'PUT'] as const) {
      it(`should call request with ${method} method`, async () => {
        const methods = {
          POST: httpClient.post.bind(httpClient),
          PUT: httpClient.put.bind(httpClient),
        } as const
        const requestSpy = vi.spyOn(httpClient, 'request');
        expect(methods[method]('url', {})).resolves.toBeTruthy();
        expect(requestSpy).toBeCalledWith(method, 'url', {body: {}});
      });
    }
    for (const method of ['GET', 'DELETE'] as const) {
      it(`should call request with ${method} method`, async () => {
        const methods = {
          GET: httpClient.get.bind(httpClient),
          DELETE: httpClient.delete.bind(httpClient),
        } as const
        const requestSpy = vi.spyOn(httpClient, 'request');
        expect(methods[method]('url')).resolves.toBeTruthy();
        expect(requestSpy).toBeCalledWith(method, 'url', undefined);
      });
    }
  });
});
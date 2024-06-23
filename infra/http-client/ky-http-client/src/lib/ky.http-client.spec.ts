import { KyHttpClient } from './ky.http-client';
import { beforeEach, describe, Mock} from "vitest";
import ky from "ky";
import {KyFactory} from "./ky.factory";

describe('kyHttpClient', () => {
  describe('unit', () => {
    let httpClient: KyHttpClient;
    let kyMock: Mock
    beforeEach(() => {
        kyMock = vi.fn().mockResolvedValue({
          json: vi.fn().mockResolvedValue({
            data: 'data'
          })
        });
        httpClient = new KyHttpClient(kyMock as unknown as typeof ky);
    });

    it('should be define', () => {
        expect(httpClient).toBeDefined();
    });

    it('should call ky method', async () => {
        await httpClient.request('GET', '/posts');
        expect(kyMock).toHaveBeenCalled();
    });

    it('should call ky with correct params', async () => {
        const options = {headers: {Authorization: 'Bearer token' }};
        await httpClient.request('GET', '/posts', options);
        expect(kyMock).toHaveBeenCalledWith('/posts', {headers: options.headers, method: 'GET' });
    });

    it('should call ky with search params', async () => {
        const options = {params: {id: '1', name: 'test'}};
        await httpClient.request('GET', '/posts', options);
        expect(kyMock).toHaveBeenCalledWith('/posts', {searchParams: options.params, method: 'GET'});
    });

    it('should call ky with body', async () => {
        const options = {body: 'body'};
        await httpClient.request('POST', '/posts', options);
        expect(kyMock).toHaveBeenCalledWith('/posts', {body: options.body, method: 'POST'});
    });
  });

  describe('integration', () => {
    let httpClient: KyHttpClient;
    beforeEach(() => {
        httpClient = new KyHttpClient(KyFactory.createInstance({
            prefixUrl: 'https://jsonplaceholder.typicode.com'
        }));
    });

    it('should request', async () => {
        const result = await httpClient.get('/posts');
        expect(result).toBeDefined();
    });
  });
});

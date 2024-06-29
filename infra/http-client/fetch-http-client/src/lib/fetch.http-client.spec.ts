import "reflect-metadata";
import { FetchHttpClient } from './fetch.http-client';
import {HttpClient} from "http-client";
import { beforeEach, Mock} from "vitest";

describe('fetchHttpClient', () => {
  describe('unit', () => {
    let httpClient: FetchHttpClient;
    let fetchMock: Mock

    beforeEach(() => {
      fetchMock = vi.fn().mockResolvedValue({
        ok: 200,
        json: async () => ({})
      });
      httpClient = new FetchHttpClient('https://jsonplaceholder.typicode.com', {}, fetchMock);
    });

    it('should define', () => {
      expect(httpClient).toBeDefined();
    });

    it('should instance of httpClient', () => {
      expect(httpClient).toBeInstanceOf(HttpClient);
    });

    it('should call fetch', async () => {
      await httpClient.request('GET', '/posts');
      expect(fetchMock).toHaveBeenCalled();
    });

    it('should call fetch with correct params', async () => {
      const options = {headers: {Authorization: 'Bearer token'}};
      await httpClient.request('GET', '/posts', options);
      expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {...options, method: 'GET'});
    });

    it('should put params in url search params', async () => {
      const options = {params: {id: '1', name: 'test'}};
      await httpClient.request('GET', '/posts', options);
      expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?id=1&name=test', { method: 'GET' });
    });
  });

  describe('integration', () => {
    let httpClient: FetchHttpClient;

    beforeEach(() => {
      httpClient = new FetchHttpClient('https://jsonplaceholder.typicode.com');
    });

    it('should request', async () => {
      const result = await httpClient.get('/posts');
      expect(result).toBeDefined();
    });

  });

});

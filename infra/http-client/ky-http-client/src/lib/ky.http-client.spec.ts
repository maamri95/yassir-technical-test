import "reflect-metadata";
import { KyHttpClient } from './ky.http-client';
import { beforeAll, beforeEach, describe, Mock } from 'vitest';
import ky from "ky";
import {KyFactory} from "./ky.factory";
import { container } from 'tsyringe';
import { Parser } from 'parser';
import { HttpClient } from 'http-client';

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
    let httpClient: HttpClient;
    beforeAll(() => {
        container.register('KyOption', {useValue: {prefixUrl: 'https://jsonplaceholder.typicode.com'}});
        container.register(Parser.name, {useValue: JSON});
        container.register<HttpClient>(HttpClient.name, {useFactory: () => {
          const factory = container.resolve(KyFactory);
          return new KyHttpClient(factory.createInstance());
          }});
    })
    beforeEach(() => {
        httpClient = container.resolve<HttpClient>(HttpClient.name);
    });

    it('should request', async () => {
        const result = await httpClient.get('/posts');
        expect(result).toBeDefined();
    });
  });
});

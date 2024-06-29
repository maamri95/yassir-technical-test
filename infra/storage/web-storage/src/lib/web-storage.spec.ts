import "reflect-metadata";
import { WebStorage } from './web-storage';
import { beforeAll, beforeEach, describe, Mocked, vi } from 'vitest';
import {container} from 'tsyringe';
import { StorageWebApi } from './storage-web-api';
describe('webStorage', () => {
  let webStorage: Mocked<Storage>
  let webStorageInstance: WebStorage;
  beforeAll(() => {
    webStorage = {
      length: 0,
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn()
    } satisfies Storage
    container.register(StorageWebApi.name, {useValue: webStorage});
  })
  beforeEach(() => {
    webStorageInstance = container.resolve(WebStorage)
  })
  it('should be define', () => {
    expect(webStorage).toBeDefined();
  });

  describe('get', () => {
    it('should call getItem method of webStorage', async () => {
      const key = 'key';
      await webStorageInstance.get(key);
      expect(webStorage.getItem).toHaveBeenCalledWith(key);
    });
  });

  describe('set', () => {
    it('should call setItem method of webStorage', async () => {
      const key = 'key';
      const value = 'value';
      await webStorageInstance.set(key, value);
      expect(webStorage.setItem).toHaveBeenCalledWith(key, value);
    });
  });

  describe('remove', () => {
    it('should call removeItem method of webStorage', async () => {
      const key = 'key';
      await webStorageInstance.remove(key);
      expect(webStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });

  describe('has', () => {
    it('should call getItem method of webStorage', async () => {
      const key = 'key';
      await webStorageInstance.get(key);
      expect(webStorage.getItem).toHaveBeenCalledWith(key);
    });
  });

  describe('clear', () => {
    it('should call clear method of webStorage', async () => {
      await webStorageInstance.clear();
      expect(webStorage.clear).toHaveBeenCalled();
    });
  });
});

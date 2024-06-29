import { Storage as BaseStorage } from 'storage';
import { inject, injectable } from 'tsyringe';
import { StorageWebApi } from './storage-web-api';
@injectable()
export class WebStorage extends BaseStorage {
  constructor(@inject(StorageWebApi.name) private readonly storage: StorageWebApi) {
    super();
  }
  clear(): Promise<void> {
    this.storage.clear();
    return Promise.resolve();
  }

  get(key: string): Promise<string | null> {
    return Promise.resolve(this.storage.getItem(key));
  }

  has(key: string): Promise<boolean> {
    return Promise.resolve(this.storage.getItem(key) !== null);
  }

  remove(key: string): Promise<void> {
    this.storage.removeItem(key);
    return Promise.resolve();
  }

  set(key: string, value: string): Promise<void> {
    this.storage.setItem(key, value);
    return Promise.resolve();
  }
}


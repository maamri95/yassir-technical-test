import { Storage } from './storage';
import {beforeEach, describe} from "vitest";
import {StorageMock} from "./storage.mock";

describe('storage', () => {
  let storage: Storage;
  let store: Map<string, unknown>;

  beforeEach(() => {
    store = new Map<string, unknown>();
    storage = new StorageMock(store)
  });

  it('should be define', () => {
    expect(storage).toBeDefined();
  });

  describe('get', () => {
    it('should call get method of store', async () => {
        const key = 'key';
        const f = vi.spyOn(store, 'get');
        await storage.get(key);
        expect(f).toHaveBeenCalledWith(key);
    });

    it('should return value from store', async () => {
        const key = 'key';
        const value = 'value';
        store.set(key, value);
        const result = await storage.get(key);
        expect(result).toBe(value);
    });
  });

  describe('set', () => {
    it('should call set method of store', async () => {
      const key = 'key';
      const value = 'value';
      const f = vi.spyOn(store, 'set');
      await storage.set(key, value);
      expect(f).toHaveBeenCalledWith(key, value);
    });

    it('should set value in store', async () => {
        const key = 'key';
        const value = 'value';
        await storage.set(key, value);
        expect(store.get(key)).toBe(value);
    });
  });

  describe('remove', () => {
    it('should call remove method of store', async () => {
        const key = 'key';
        const f = vi.spyOn(store, 'delete');
        await storage.remove(key);
        expect(f).toHaveBeenCalledWith(key);
    });

    it('should remove value from store', async () => {
        const key = 'key';
        const value = 'value';
        store.set(key, value);
        await storage.remove(key);
        expect(store.get(key)).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should call has method of store', async () => {
      const key = 'key';
      const f = vi.spyOn(store, 'has');
      await storage.has(key);
      expect(f).toHaveBeenCalledWith(key);
    });

    it('should return true if key exists', async () => {
        const key = 'key';
        store.set(key, 'value');
        const result = await storage.has(key);
        expect(result).toBe(true);
    });

    it('should return false if key does not exist', async () => {
        const key = 'key';
        const result = await storage.has(key);
        expect(result).toBe(false);
    });
  });

    describe('clear', () => {
        it('should call clear method of store', async () => {
        const f = vi.spyOn(store, 'clear');
        await storage.clear();
        expect(f).toHaveBeenCalled();
        });

        it('should clear all values from store', async () => {
            store.set('key1', 'value1');
            store.set('key2', 'value2');
            await storage.clear();
            expect(store.size).toBe(0);
        });
    });
});

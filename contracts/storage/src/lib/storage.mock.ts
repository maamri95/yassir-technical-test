import { Storage } from './storage';
export class StorageMock extends Storage {
    constructor(private readonly storage: Map<string, unknown>) {
        super();
    }

    public async get<T>(key: string): Promise<T | null> {
        return new Promise((resolve) => {
            resolve(this.storage.get(key) as T | null);
        });
    }

    public async set<T>(key: string, value: T): Promise<void> {
        return new Promise(
            (resolve) => {
                this.storage.set(key, value);
                resolve();
            }
        );
    }

    public async remove(key: string): Promise<void> {
        return new Promise(
            (resolve) => {
                this.storage.delete(key);
                resolve();
            }
        );
    }

    public async has(key: string): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(this.storage.has(key));
        });
    }

    public async clear(): Promise<void> {
        return new Promise((resolve) => {
            this.storage.clear();
            resolve();
        });
    }
}
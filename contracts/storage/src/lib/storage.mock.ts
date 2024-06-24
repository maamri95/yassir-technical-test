import { Storage } from './storage';
export class StorageMock extends Storage {
    constructor(private readonly storage: Map<string, string>) {
        super();
    }

    public async get(key: string): Promise<string | null> {
        return Promise.resolve(this.storage.get(key) ?? null);
    }

    public async set(key: string, value: string): Promise<void> {
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
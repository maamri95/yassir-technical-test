export abstract class Storage {
    public abstract get<T>(key: string): Promise<T | null>;

    public abstract set<T>(key: string, value: T): Promise<void>;

    public abstract remove(key: string): Promise<void>;

    public abstract has(key: string): Promise<boolean>;

    public abstract clear(): Promise<void>;
}

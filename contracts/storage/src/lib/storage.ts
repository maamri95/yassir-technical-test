export abstract class Storage {
    public abstract get(key: string): Promise<string | null>;

    public abstract set(key: string, value: string): Promise<void>;

    public abstract remove(key: string): Promise<void>;

    public abstract has(key: string): Promise<boolean>;

    public abstract clear(): Promise<void>;
}

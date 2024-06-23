export abstract class Parser {
    public abstract parse<T>(data: string): T;
    public abstract stringify<T>(data: T): string;
}

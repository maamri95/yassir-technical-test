import {Parser} from "parser";
import { injectable } from 'tsyringe';
@injectable()
export class JsonParser extends Parser {
    public parse<T>(data: string): T {
        return JSON.parse(data, this.reviver);
    }

    public stringify<T>(data: T): string {
        return JSON.stringify(data);
    }

    private reviver(key: string, value: unknown) {
        if (key === '__proto__') return undefined;
        return value;
    }
}
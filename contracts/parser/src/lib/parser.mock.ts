import {Parser} from "./parser";

export class ParserMock extends Parser {
    constructor(private readonly parser: Parser) {
        super();
    }
    public parse<T>(data: string): T {
        return this.parser.parse(data);
    }

    public stringify<T>(data: T): string {
        return this.parser.stringify(data);
    }
}
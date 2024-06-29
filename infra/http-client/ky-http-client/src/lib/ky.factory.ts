import ky, {Options} from "ky";
import {Parser} from "parser";
import { inject, injectable } from 'tsyringe';
@injectable()
export class KyFactory {
    constructor(
      @inject("KyOption") private readonly config: Options,
      @inject(Parser.name) private readonly parser: Parser
    ) {
    }
    createInstance() {
        return ky.create({
            parseJson: this.parser.parse,
            ...this.config
        });
    }
}

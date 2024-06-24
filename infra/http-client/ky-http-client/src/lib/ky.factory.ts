import ky, {Options} from "ky";
import {Parser} from "parser";

export class KyFactory {
    static createInstance(config: Options, parser: Parser) {
        return ky.create({
            parseJson: parser.parse,
            ...config
        });
    }
}
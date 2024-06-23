import ky, {Options} from "ky";

export class KyFactory {
    static createInstance(config: Options) {
        return ky.create({
            parseJson: (text) => JSON.parse(text, (key, value) => {
                if (key === '__proto__') return undefined;
                return value;
            }),
            ...config
        });
    }
}
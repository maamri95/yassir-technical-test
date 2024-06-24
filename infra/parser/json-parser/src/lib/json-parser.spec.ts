import { JsonParser } from './json-parser';
import {beforeAll, describe} from "vitest";

describe('jsonParser', () => {
  let jsonParser: JsonParser;

  beforeAll(() => {
    jsonParser = new JsonParser();
  });

  it('should be define', () => {
    expect(jsonParser).toBeDefined();
  });

  describe('parse', () => {

    it('should parse json', () => {
      const data = '{"name": "John"}';
      const result = jsonParser.parse(data);
      expect(result).toEqual({name: 'John'});
    });

    it('should protect from prototype attack', () => {
        const data = '{"__proto__": {"isAdmin": true}}';
        const result = jsonParser.parse<Record<string, string>>(data);
        expect(result).toEqual({});
        expect(result['isAdmin']).toBeUndefined();
    });
  });

  describe('stringify', () => {

    it('should stringify json', () => {
      const data = {name: 'John'};
      const result = jsonParser.stringify(data);
      expect(result).toEqual('{"name":"John"}');
    });

  });

});

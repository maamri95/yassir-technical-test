import { ParserMock } from './parser.mock';
import {beforeEach, expect, Mock, vi} from "vitest";

describe('parser', () => {
  let parseMock: Mock
  let stringifyMock: Mock
  let parserMock: ParserMock

  beforeEach(() => {
    parseMock = vi.fn();
    stringifyMock = vi.fn();
    parserMock = new ParserMock({
        parse: parseMock,
        stringify: stringifyMock,
    });
  });

  it('should defined', () => {
    expect(parserMock).toBeDefined();
  });

  it('should be call parseMock', () => {
    parseMock.mockReturnValue({data: 1});
    expect(parserMock.parse('{data: 1}')).toEqual({data: 1});
    expect(parseMock).toHaveBeenCalledWith('{data: 1}');
  });

  it('should be call stringify', () => {
    stringifyMock.mockReturnValue('{data: 1}');
    expect(parserMock.stringify({data: 1})).toEqual('{data: 1}');
    expect(stringifyMock).toHaveBeenCalledWith({data: 1});
  });
});

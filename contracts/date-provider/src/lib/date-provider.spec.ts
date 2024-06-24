import {DateProviderMock} from "./date-provider.mock";
import {beforeAll} from "vitest";


describe('dateProvider', () => {
  let dateProvider: DateProviderMock;
  const now = new Date('2021-01-01T00:00:00Z');
  beforeAll(() => {
    dateProvider = new DateProviderMock(now);
  });

  it('should be define', () => {
    expect(dateProvider).toBeDefined();
  });

  it('should return date now', () => {
    expect(dateProvider.now()).toEqual(now);
  });
});

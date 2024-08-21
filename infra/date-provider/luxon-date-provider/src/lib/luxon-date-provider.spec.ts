import "reflect-metadata";
import { LuxonDateProvider } from './luxon-date-provider';
import {beforeAll, describe} from "vitest";

describe('luxonDateProvider', () => {
  let luxonDateProvider: LuxonDateProvider;
  beforeAll(() =>{
    luxonDateProvider = new LuxonDateProvider();
  });

  it('should be defined', () => {
    expect(luxonDateProvider).toBeDefined();
  });

  it('should return true when date is same day of start', () => {
    const date = new Date();
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 1);
    expect(luxonDateProvider.isSameDay(date, start)).toBe(true);
  });

  it('should return false when date is not same day of start', () => {
    const date = new Date();
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 2);
    expect(luxonDateProvider.isSameDay(date, start)).toBe(false);
  });

  it('should format date with currect format', () => {
    const date = new Date();
    const format = 'yyyy-MM-dd';
    expect(luxonDateProvider.format(date, format)).toBe(date.toISOString().split('T')[0]);
  });
});

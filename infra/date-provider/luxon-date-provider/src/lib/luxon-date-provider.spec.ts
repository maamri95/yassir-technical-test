import { LuxonDateProvider } from './luxon-date-provider';
import {beforeAll, describe} from "vitest";

describe('luxonDateProvider', () => {
  let luxonDateProvider: LuxonDateProvider;
  beforeAll(() =>{
    luxonDateProvider = new LuxonDateProvider({format: 'yyyy-MM-dd'});
  });

  it('should be define', () => {
    expect(luxonDateProvider).toBeDefined();
  });

  describe('now method', () => {
    it('should return Date object', () => {
      expect(luxonDateProvider.now()).toBeInstanceOf(Date);
    });

    it('should return right date now', () => {
      expect(luxonDateProvider.now().getTime()).toBeCloseTo(new Date().getTime(), -3);
    });
  });
  describe('format method', () => {
    it('should format date', () => {
        const date = new Date('2021-01-01T00:00:00Z');
        expect(luxonDateProvider.format(date)).toBe('2021-01-01');
    });

    it('should format date with the good format', () => {
        const date = new Date('2021-01-01T00:00:00Z');
        expect(luxonDateProvider.format(date, {format: 'dd/MM/yyyy'})).toBe('01/01/2021');
    });
  });

  describe('formatDistanceToNow method', () => {
    it('should format distance to now', () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - 10);
        expect(luxonDateProvider.formatDistanceToNow(date)).toBe('10 seconds ago');
    });

    it('should format distance from tomorrow to now', () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(date.getHours() + 1)
        expect(luxonDateProvider.formatDistanceToNow(date)).toBe('in 1 day');
    });

    it('should format distance from yesterday to now', () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        expect(luxonDateProvider.formatDistanceToNow(date)).toBe('1 day ago');
    });
  });

  describe('add method', () => {
    it('should update date by the value', () => {
        const date = new Date('2021-01-01T00:00:00Z');
        expect(luxonDateProvider.add(date, 1, 'day')).toEqual(new Date('2021-01-02T00:00:00Z'));
    });
  });
  describe('minus method', () => {
    it('should update date by the value', () => {
        const date = new Date('2021-01-02T00:00:00Z');
        expect(luxonDateProvider.minus(date, 1, 'day')).toEqual(new Date('2021-01-01T00:00:00Z'));
    });
  });

  describe('hasSame method', () => {
    it('should return true if the date is the same', () => {
        const date = new Date('2021-01-01T00:00:00Z');
        const dateToCompare = new Date('2021-01-01T00:00:00Z');
        expect(luxonDateProvider.hasSame(date, dateToCompare, 'day')).toBe(true);
    });

    it('should return false if the date is not the same', () => {
        const date = new Date('2021-01-01T00:00:00Z');
        const dateToCompare = new Date('2021-01-02T00:00:00Z');
        expect(luxonDateProvider.hasSame(date, dateToCompare, 'day')).toBe(false);
    });
  });
});

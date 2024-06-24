export abstract class DateProvider {
  constructor(protected config: DateOptionsWithFormat = {}) {
  }
  public abstract now(): Date;
  public abstract format(date: Date, options?:DateOptionsWithFormat): string;
  public abstract formatDistanceToNow(date: Date, options?:DateOptions): string | null;
  public abstract differenceInMilliseconds(date: Date, dateToCompare: Date): number;
  public abstract hasSame(date: Date, dateToCompare: Date, unit: DateUnit): boolean;
  public abstract add(date: Date, value: number, unit: DateUnit): Date;
  public abstract minus(date: Date, value: number, unit: DateUnit): Date;

  public minusDays(date: Date, days: number): Date{
    return this.minus(date, days, 'day');
  }
  public minusMonths(date: Date, months: number): Date {
    return this.minus(date, months, 'month');
  }
  public minusYears(date: Date, years: number): Date{
    return this.minus(date, years, 'year');
  }
  public minusHours(date: Date, hours: number): Date{
    return this.minus(date, hours, 'hour');
  }
  public minusMinutes(date: Date, minutes: number): Date{
    return this.minus(date, minutes, 'minute');
  }
  public minusSeconds(date: Date, minutes: number): Date{
    return this.minus(date, minutes, 'second');
  }
  public minusMilliseconds(date: Date, minutes: number): Date{
    return this.minus(date, minutes, 'millisecond');
  }
  public addDays(date: Date, days: number): Date{
    return this.add(date, days, 'day');
  }
  public addMonths(date: Date, months: number): Date {
    return this.add(date, months, 'month');
  }
  public addYears(date: Date, years: number): Date{
    return this.add(date, years, 'year');
  }
  public addHours(date: Date, hours: number): Date{
    return this.add(date, hours, 'hour');
  }
  public addMinutes(date: Date, minutes: number): Date{
    return this.add(date, minutes, 'minute');
  }
  public addSeconds(date: Date, minutes: number): Date{
    return this.add(date, minutes, 'second');
  }
  public addMilliseconds(date: Date, minutes: number): Date{
    return this.add(date, minutes, 'millisecond');
  }
  public isSameYear(date: Date, dateToCompare: Date): boolean {
    return this.hasSame(date, dateToCompare, 'year');
  }
  public isSameMonth(date: Date, dateToCompare: Date): boolean {
    return this.hasSame(date, dateToCompare, 'month');
  }
  public isSameDay(date: Date, dateToCompare: Date): boolean {
    return this.hasSame(date, dateToCompare, 'day');
  }
  public isSameHour(date: Date, dateToCompare: Date): boolean {
    return this.hasSame(date, dateToCompare, 'hour');
  }
  public isSameMinute(date: Date, dateToCompare: Date): boolean {
      return this.hasSame(date, dateToCompare, 'minute');
  }
  public isSameSecond(date: Date, dateToCompare: Date): boolean {
      return this.hasSame(date, dateToCompare, 'second');
  }
  public isSameMillisecond(date: Date, dateToCompare: Date): boolean {
    return this.hasSame(date, dateToCompare, 'millisecond');
  }
  public isToday(date: Date): boolean {
    return this.hasSame(date, this.now(), 'day');
  }
  public isTomorrow(date: Date): boolean {
    return this.hasSame(date, this.addDays(this.now(), 1), 'day');
  }
  public isYesterday(date: Date): boolean {
    return this.hasSame(date, this.addDays(this.now(), -1), 'day');
  }
  public isBefore(date: Date, dateToCompare: Date): boolean {
    return this.differenceInMilliseconds(date, dateToCompare) < 0;
  }
  public isAfter(date: Date, dateToCompare: Date): boolean {
    return this.differenceInMilliseconds(date, dateToCompare) > 0;
  }

}

export interface DateOptions {
    locale?: string;
    timeZone?: string;
    weekStartsOn?: number;
    firstWeekContainsDate?: number;
}

export interface DateOptionsWithFormat extends DateOptions {
  format?: string;
}
export type DateUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
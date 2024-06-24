import { DateOptions, DateOptionsWithFormat, DateProvider, DateUnit } from './date-provider';

export class DateProviderMock extends DateProvider {
    constructor(private dateNow: Date) {
        super();
    }
    now(): Date {
        return this.dateNow;
    }

    public add(date: Date, value: number, unit: DateUnit): Date {
        switch (unit){
            case 'day':
                return new Date(date.getTime() + value * 24 * 60 * 60 * 1000);
            case 'month':
                return new Date(date.setMonth(date.getMonth() + value));
            case 'year':
                return new Date(date.setFullYear(date.getFullYear() + value));
            case 'hour':
                return new Date(date.getTime() + value * 60 * 60 * 1000);
            case 'minute':
                return new Date(date.getTime() + value * 60 * 1000);
            case "second":
                return new Date(date.getTime() + value * 1000);
            case "millisecond":
                return new Date(date.getTime() + value);
        }
    }

    differenceInMilliseconds(date: Date, dateToCompare: Date): number {
        return date.getTime() - dateToCompare.getTime();
    }

    format(date: Date, options?: DateOptionsWithFormat): string {
        if (!options?.format && !this.config.format) throw new Error('Format is required');
        return `formatted ${date.toISOString()} with format ${options?.format ?? this.config.format}`;
    }

    formatDistanceToNow(date: Date, options?: DateOptions): string | null {
        return `formatted distance to now ${date.toISOString()} with options ${options}`;
    }

    public hasSame(date: Date, dateToCompare: Date, unit: DateUnit): boolean {
        switch (unit){
            case 'day':
                return date.getDate() === dateToCompare.getDate();
            case 'month':
                return date.getMonth() === dateToCompare.getMonth();
            case 'year':
                return date.getFullYear() === dateToCompare.getFullYear();
            case 'hour':
                return date.getHours() === dateToCompare.getHours();
            case 'minute':
                return date.getMinutes() === dateToCompare.getMinutes();
            case "second":
                return date.getSeconds() === dateToCompare.getSeconds();
            case "millisecond":
                return date.getMilliseconds() === dateToCompare.getMilliseconds();
        }
    }

    public minus(date: Date, value: number, unit: DateUnit): Date {
        switch (unit){
            case 'day':
                return new Date(date.getTime() - value * 24 * 60 * 60 * 1000);
            case 'month':
                return new Date(date.setMonth(date.getMonth() - value));
            case 'year':
                return new Date(date.setFullYear(date.getFullYear() - value));
            case 'hour':
                return new Date(date.getTime() - value * 60 * 60 * 1000);
            case 'minute':
                return new Date(date.getTime() - value * 60 * 1000);
            case "second":
                return new Date(date.getTime() - value * 1000);
            case "millisecond":
                return new Date(date.getTime() - value);
        }
    }

    public setDateNow(date: Date) {
        this.dateNow = date;
    }
}
import {DateOptions, DateOptionsWithFormat, DateProvider, DateUnit} from "date-provider";
import {DateTime} from "luxon";

export class LuxonDateProvider extends DateProvider {
    now(): Date {
        return DateTime.now().toJSDate();
    }

    differenceInMilliseconds(date: Date, dateToCompare: Date): number {
        return DateTime.fromJSDate(date).diff(DateTime.fromJSDate(dateToCompare)).milliseconds;
    }

    format(date: Date, options?: DateOptionsWithFormat): string {
        if (!this.config.format && !options?.format) throw new Error('Format is required');
        return this.setLocale(
            DateTime.fromJSDate(date),
            options?.locale ?? this.config.locale
        ).toFormat(options?.format ?? this.config.format!);
    }

    formatDistanceToNow(date: Date, options?: DateOptions): string | null {
        return this.setLocale(
            DateTime.fromJSDate(date),
            options?.locale ?? this.config.locale
        ).toRelative({
            style: 'long',
        });
    }

    add(date: Date, value: number, unit: DateUnit): Date {
        return DateTime.fromJSDate(date).plus({[unit]: value}).toJSDate();
    }

    hasSame(date: Date, dateToCompare: Date, unit: DateUnit): boolean {
        return DateTime.fromJSDate(date).hasSame(DateTime.fromJSDate(dateToCompare), unit);
    }

    minus(date: Date, value: number, unit: DateUnit): Date {
        return DateTime.fromJSDate(date).minus({[unit]: value}).toJSDate();
    }

    protected setLocale(dateTime: DateTime, locale: string | undefined): DateTime {
        if (locale) {
            return dateTime.setLocale(locale);
        }
        return dateTime
    }
}

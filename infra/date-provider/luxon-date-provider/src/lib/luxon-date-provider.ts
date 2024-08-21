import {DateProvider} from "@yassir-test/date-provider";
import {DateTime} from "luxon";
import { injectable } from 'tsyringe';
@injectable()
export class LuxonDateProvider extends DateProvider {
    isSameDay(currentDate: Date, expectedDate:Date): boolean {
        return DateTime.fromJSDate(currentDate).hasSame(DateTime.fromJSDate(expectedDate), 'day');
    }

    format(date: Date, format: string): string {
        return DateTime.fromJSDate(date).toFormat(format);
    }
}

import {DateProvider} from "@yassir-test/date-provider";
import {DateTime} from "luxon";
import { injectable } from 'tsyringe';
@injectable()
export class LuxonDateProvider extends DateProvider {
    between(date: Date, start: Date, end?: Date): boolean {
        const dateInDateTime = DateTime.fromJSDate(date);
        if (!end) {
            return dateInDateTime >= DateTime.fromJSDate(start);
        }
        return dateInDateTime >= DateTime.fromJSDate(start) && dateInDateTime <= DateTime.fromJSDate(end);
    }

    format(date: Date, format: string): string {
        return DateTime.fromJSDate(date).toFormat(format);
    }
}

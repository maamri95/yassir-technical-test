import {DateProvider} from "date-provider";

export class DateProviderMock extends DateProvider {
    constructor(private dateNow: Date) {
        super();
    }
    now(): Date {
        return this.dateNow;
    }

    format(date: Date, format: string): string {
        return  format
    }

    public setDateNow(date: Date) {
        this.dateNow = date;
    }
}
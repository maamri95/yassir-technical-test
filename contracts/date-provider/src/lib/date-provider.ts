export abstract class DateProvider {
  abstract between(date: Date, start: Date, end?: Date): boolean;
}
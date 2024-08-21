export abstract class DateProvider {
  abstract isSameDay(currentDate: Date, expectedDate: Date): boolean;
  abstract format(date: Date, format: string): string;
}
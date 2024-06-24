export abstract class DateProvider {
  public abstract now(): Date;
  public abstract format(date: Date, format: string): string;
}
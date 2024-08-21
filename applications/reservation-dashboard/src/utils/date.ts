import { container } from 'tsyringe';
import { DateProvider } from '@yassir-test/date-provider';

export const formatDate = (date: Date, format: string) => {
  const dateProvider = container.resolve<DateProvider>(DateProvider.name);
  return dateProvider.format(date, format);
}
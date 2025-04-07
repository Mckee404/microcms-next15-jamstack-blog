import dayjs from 'dayjs';

export function formatDate(date: string, format: string = 'YY/MM/DD'): string {
  return dayjs(date).format(format);
}
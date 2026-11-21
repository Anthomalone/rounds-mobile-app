import { parseDate } from '@/logic/engine';

/** 30 Apr 2027 */
export function fmtDate(d: string | Date): string {
  const date = typeof d === 'string' ? parseDate(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Saturday, November 21 */
export function fmtLongDay(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

/** Days left before a deadline, never negative: "160 days", "1 day", "Due today", "Expired". */
export function daysLabel(days: number): string {
  if (days < 0) return 'Expired';
  if (days === 0) return 'Due today';
  return days === 1 ? '1 day' : `${days} days`;
}

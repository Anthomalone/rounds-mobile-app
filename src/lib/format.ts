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

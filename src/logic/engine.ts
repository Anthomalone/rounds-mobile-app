// Compliance engine. Logic from rounds-handoff.md section 6, same as the web prototype.
// Pure functions: every screen passes in the current certificates.
import { CA, FL, type FlReq } from '../data/rules.ts';
import { COURSES, type Cert, type Course } from '../data/catalog.ts';

const DAY = 86_400_000;

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function daysUntil(iso: string, today: Date = new Date()): number {
  return Math.round((parseDate(iso).getTime() - startOfDay(today).getTime()) / DAY);
}

export type FlReqStatus = FlReq & { have: number; raw: number };
export type FlStatus = {
  reqs: FlReqStatus[];
  done: number;
  total: number;
  missing: FlReqStatus[];
  missingTopics: FlReqStatus[];
  complete: boolean;
  generalFull: boolean;
};

export function flStatus(certs: Cert[]): FlStatus {
  const raw: Record<string, number> = { general: 0, medErrors: 0, laws: 0, impairment: 0, trafficking: 0 };
  for (const c of certs) if (c.fl && c.fl in raw) raw[c.fl] += c.hours;
  const reqs = FL.reqs.map((r) => ({ ...r, have: Math.min(raw[r.key], r.need), raw: raw[r.key] }));
  const done = reqs.reduce((a, r) => a + r.have, 0);
  const missing = reqs.filter((r) => r.have < r.need);
  const general = reqs.find((r) => r.key === 'general')!;
  return {
    reqs,
    done,
    total: FL.total,
    missing,
    missingTopics: missing.filter((r) => r.key !== 'general'),
    complete: missing.length === 0,
    generalFull: general.have >= general.need,
  };
}

export type CaStatus = { done: number; raw: number; total: number; left: number; complete: boolean };

export function caStatus(certs: Cert[]): CaStatus {
  const raw = certs.filter((c) => c.ca).reduce((a, c) => a + c.hours, 0);
  const done = Math.min(raw, CA.total);
  return { done, raw, total: CA.total, left: CA.total - done, complete: done >= CA.total };
}

export const completedCourseIds = (certs: Cert[]) => certs.map((c) => c.course).filter((x): x is string => !!x);

export type Path = { courses: Course[]; hours: number; complete: boolean; uncovered: string[] };

export function shortestPath(certs: Cert[]): Path {
  const fl = flStatus(certs);
  const done = completedCourseIds(certs);
  const plan: Course[] = [];
  let caLeft = caStatus(certs).left;
  const pool = COURSES.filter((c) => c.kind === 'module' && !done.includes(c.id));

  // 1) Each missing Florida required topic, preferring a course that also counts for California.
  for (const r of fl.missingTopics) {
    const opts = pool.filter((c) => c.fl === r.key).sort((a, b) => Number(b.ca) - Number(a.ca));
    const pick = opts[0];
    if (pick && !plan.includes(pick)) {
      plan.push(pick);
      if (pick.ca) caLeft -= pick.hours;
    }
  }

  // 2) Largest remaining courses that count for California or Florida general, until both gaps close.
  const general = fl.reqs.find((r) => r.key === 'general')!;
  let flGeneralLeft = general.need - general.have;
  const rest = pool
    .filter((c) => !plan.includes(c) && c.fl !== 'dv' && (c.ca || c.fl === 'general'))
    .sort((a, b) => b.hours - a.hours);
  for (const c of rest) {
    if (caLeft <= 0 && flGeneralLeft <= 0) break;
    plan.push(c);
    if (c.ca) caLeft -= c.hours;
    if (c.fl === 'general') flGeneralLeft -= c.hours;
  }

  // Gaps the catalog cannot close are reported, never hidden behind "Complete".
  const uncovered: string[] = fl.missingTopics.filter((r) => !plan.some((c) => c.fl === r.key)).map((r) => r.label);
  if (flGeneralLeft > 0) uncovered.push('Florida general hours');
  if (caLeft > 0) uncovered.push('California hours');
  const complete = fl.complete && caStatus(certs).complete;
  return { courses: plan, hours: plan.reduce((a, c) => a + c.hours, 0), complete, uncovered };
}

export type CountsTag = { state: 'FL' | 'CA'; label: string; required: boolean };

export function countsToward(c: { fl: Course['fl']; ca: boolean }): CountsTag[] {
  const out: CountsTag[] = [];
  if (c.fl) {
    const r = FL.reqs.find((x) => x.key === c.fl);
    const label = c.fl === 'general' ? 'Florida · general' : r ? `Florida · ${r.short}` : c.fl === 'dv' ? 'Florida · Domestic Violence' : 'Florida';
    out.push({ state: 'FL', label, required: !!r && c.fl !== 'general' }); // only topics due this cycle
  }
  if (c.ca) out.push({ state: 'CA', label: 'California', required: false });
  return out;
}

// BLS eCard: valid 2 years, to the end of the month (AHA).
export function blsExpiry(issued: Date): Date {
  return new Date(issued.getFullYear() + 2, issued.getMonth() + 1, 0);
}

// Sample data (made up). Source: rounds-handoff.md section 7 and the web prototype.
import type { FlKey } from './rules.ts';

export type ProviderKey = 'rounds' | 'harbor' | 'brightwater' | 'meridian';
export type Provider = { name: string; fl: string; ca: string | null; ancc?: string };

export const PROVIDERS: Record<ProviderKey, Provider> = {
  rounds: { name: 'Rounds Learning', fl: 'FL Board provider #50-31088 (sample)', ca: 'CA BRN CEP #18245 (sample)', ancc: 'ANCC-accredited provider (sample)' },
  harbor: { name: 'Harbor Health Learning', fl: 'FL Board provider #50-22917 (sample)', ca: null },
  brightwater: { name: 'Brightwater Nursing Education', fl: 'FL Board provider #50-10482 (sample)', ca: 'CA BRN CEP #17730 (sample)' },
  meridian: { name: 'Meridian Clinical Institute', fl: 'Accredited (national body) (sample)', ca: 'CA BRN CEP #16204 (sample)' },
};

export type Course = {
  id: string;
  title: string;
  hours: number;
  kind: 'module' | 'blended';
  prov: ProviderKey | null;
  fl: FlKey | null;
  ca: boolean;
  minutes: number;
  blurb: string;
};

export const COURSES: Course[] = [
  { id: 'med-errors', title: 'Prevention of Medical Errors', hours: 2, kind: 'module', prov: 'rounds', fl: 'medErrors', ca: true, minutes: 120,
    blurb: 'Root-cause analysis, error reduction and patient safety, built around real ward situations.' },
  { id: 'impairment', title: 'Recognizing Impairment in the Workplace', hours: 2, kind: 'module', prov: 'rounds', fl: 'impairment', ca: true, minutes: 120,
    blurb: 'Signs of substance-use impairment in colleagues, how to respond and how to report safely.' },
  { id: 'high-alert', title: 'High-Alert Medications: Insulin, Heparin, Opioids', hours: 4, kind: 'module', prov: 'rounds', fl: 'general', ca: true, minutes: 240,
    blurb: 'Independent double checks, smart-pump limits and reversal agents.' },
  { id: 'delirium', title: 'Delirium Prevention in Hospitalized Older Adults', hours: 4, kind: 'module', prov: 'rounds', fl: 'general', ca: true, minutes: 240,
    blurb: 'Screening with CAM, non-drug prevention bundles and family involvement.' },
  { id: 'handoff', title: 'Safer Handoffs with SBAR', hours: 2, kind: 'module', prov: 'rounds', fl: 'general', ca: true, minutes: 120,
    blurb: 'Structured bedside handoff and closed-loop communication.' },
  { id: 'fl-dv', title: 'Domestic Violence for Florida Nurses', hours: 2, kind: 'module', prov: 'rounds', fl: 'dv', ca: true, minutes: 120,
    blurb: 'Required every third Florida renewal. Not due for you this cycle.' },
  { id: 'bls', title: 'BLS Provider Renewal (blended)', hours: 0, kind: 'blended', prov: null, fl: null, ca: false, minutes: 0,
    blurb: 'Online part with the training center, then a hands-on skills check. Employer requirement.' },
];

export const courseById = (id: string) => COURSES.find((c) => c.id === id);

export type CertSource = 'platform' | 'external' | 'upload';
export type Cert = {
  id: string;
  title: string;
  hours: number;
  prov: string;
  date: string; // YYYY-MM-DD
  fl: FlKey | null;
  ca: boolean;
  src: CertSource;
  course?: string; // catalog id when earned in Rounds
  reported?: boolean; // CE Broker report finished (simulated)
};

export const SEED_CERTS: Cert[] = [
  { id: 'c1', title: 'Sepsis Recognition and Early Management', hours: 3, prov: 'Rounds Learning', date: '2025-06-12', fl: 'general', ca: true, src: 'platform', reported: true },
  { id: 'c2', title: 'Nursing Laws and Rules in Florida', hours: 2, prov: 'Harbor Health Learning', date: '2025-08-03', fl: 'laws', ca: false, src: 'external', reported: true },
  { id: 'c3', title: 'Human Trafficking: Recognize and Respond', hours: 2, prov: 'Harbor Health Learning', date: '2025-08-03', fl: 'trafficking', ca: false, src: 'external', reported: true },
  { id: 'c4', title: 'Pain Management in Older Adults', hours: 4, prov: 'Rounds Learning', date: '2025-11-20', fl: 'general', ca: true, src: 'platform', reported: true },
  { id: 'c5', title: 'Acute Stroke Care: Door to Needle', hours: 2, prov: 'Rounds Learning', date: '2026-02-09', fl: 'general', ca: true, src: 'platform', reported: true },
  { id: 'c6', title: 'Wound Care Essentials', hours: 6, prov: 'Rounds Learning', date: '2026-04-17', fl: 'general', ca: true, src: 'platform', reported: true },
  { id: 'c7', title: 'Cardiac Rhythm Interpretation', hours: 3, prov: 'Rounds Learning', date: '2026-07-22', fl: 'general', ca: true, src: 'platform', reported: true },
];

export const NURSE = {
  name: 'Jordan Reyes, RN',
  first: 'Jordan',
  initials: 'JR',
  flLicenseMasked: 'RN •••4821',
  blsExpires: '2027-01-31',
};

// Sample outside certificate for the upload flow. Confidence 0..1; below 0.9 is flagged "Check".
export const SAMPLE_EXTRACT: { label: string; value: string; conf: number }[] = [
  { label: 'Course title', value: 'Antimicrobial Stewardship for Nurses', conf: 0.98 },
  { label: 'Contact hours', value: '3.0', conf: 0.99 },
  { label: 'Completion date', value: '2026-10-14', conf: 0.97 },
  { label: 'Provider', value: 'Gulf Coast Critical Care Conference', conf: 0.95 },
  { label: 'Accreditation', value: 'Accredited by a national nursing CE body (sample)', conf: 0.88 },
  { label: 'California CEP #', value: 'Not found on certificate', conf: 0.93 },
];
export const SAMPLE_UPLOAD = {
  title: 'Antimicrobial Stewardship for Nurses',
  hours: 3,
  prov: 'Gulf Coast Critical Care Conference',
  date: '2026-10-14',
  accredited: true,
  caCep: null as string | null,
};

export const TRAINING_CENTER = 'Lakeside Hospital Training Center (sample)';
export const BLS_ONLINE_SCORE = 92;
export const BLS_SLOTS = [
  { id: 'a', inDays: 6, time: '08:00–10:45', where: 'Sim Lab, 2nd floor', inst: 'Instructor-led' },
  { id: 'b', inDays: 9, time: '14:00–16:45', where: 'Sim Lab, 2nd floor', inst: 'Instructor-led' },
  { id: 'c', inDays: 12, time: 'Any time, 24/7', where: 'Self-directed station, ED corridor', inst: 'Manikin station' },
];

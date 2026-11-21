// State rules used by Rounds. Real rules, simplified for the demo.
// Source: rounds-handoff.md section 4. Every rule keeps its source link and check date.
// Never add a rule here without an official source.

export const RULES_CHECKED = '2026-11-21';
export const RULES_CHECKED_LABEL = '21 Nov 2026';

export type FlReqKey = 'general' | 'medErrors' | 'laws' | 'impairment' | 'trafficking';
export type FlKey = FlReqKey | 'dv';

export type FlReq = { key: FlReqKey; label: string; short: string; need: number; note: string };

export const FL = {
  code: 'FL',
  name: 'Florida',
  license: 'RN · Multistate (Compact)',
  expires: '2027-04-30',
  total: 24,
  system: 'CE Broker',
  reqs: [
    { key: 'general', label: 'General hours', short: 'general', need: 16, note: 'From a provider accredited by a state or national nursing CE body' },
    { key: 'medErrors', label: 'Prevention of Medical Errors', short: 'Medical Errors', need: 2, note: 'Board-approved provider · required every renewal' },
    { key: 'laws', label: 'Florida Laws & Rules', short: 'Laws & Rules', need: 2, note: 'Board-approved provider' },
    { key: 'impairment', label: 'Recognizing Impairment in the Workplace', short: 'Impairment', need: 2, note: 'Required every other renewal · due this cycle' },
    { key: 'trafficking', label: 'Human Trafficking', short: 'Human Trafficking', need: 2, note: 'Board approval not required for this topic' },
  ] as FlReq[],
  info: [
    { label: 'Domestic Violence (2 h)', note: 'Every third renewal · not due this cycle' },
    { label: 'HIV/AIDS (1 h)', note: 'One-time · completed before first renewal' },
  ],
};

export const CA = {
  code: 'CA',
  name: 'California',
  license: 'RN · Single-state',
  expires: '2027-08-31',
  total: 30,
  note: 'Any course from a provider with a California BRN provider number (CEP) counts.',
  info: [{ label: 'Implicit bias (1 h)', note: 'Applies to newly licensed RNs · not required for Jordan' }],
};

export type RuleSource = { label: string; url: string };
export type RuleEntry = { id: string; title: string; state: 'FL' | 'CA' | 'All'; summary: string; sources: RuleSource[] };

export const RULE_SOURCES: RuleEntry[] = [
  {
    id: 'fl-rn',
    title: 'Florida RN: 24 hours every 2 years',
    state: 'FL',
    summary:
      '16 general + Prevention of Medical Errors 2 + Florida Laws & Rules 2 + Recognizing Impairment in the Workplace 2 (every other renewal) + Human Trafficking 2. Domestic Violence 2 h every third renewal (on top of the 24). HIV/AIDS 1 h once, before first renewal. Hours can’t carry over.',
    sources: [{ label: 'Florida Board of Nursing, RN renewal', url: 'https://floridasnursing.gov/registered-nurse-renewal/' }],
  },
  {
    id: 'fl-reporting',
    title: 'Florida reporting and providers',
    state: 'FL',
    summary:
      'Completions are reported in CE Broker, the state tracking system. Required topics need a Florida Board-approved provider, except Human Trafficking. General hours need a provider approved by a state or national nursing CE accreditor. Approved providers report to CE Broker.',
    sources: [
      { label: 'Florida Board of Nursing, RN renewal', url: 'https://floridasnursing.gov/registered-nurse-renewal/' },
      { label: 'CE Broker, Florida provider requirements', url: 'https://cebroker.com/documentation/requirements/18/Florida%20Board%20of%20Nursing/1000' },
    ],
  },
  {
    id: 'fl-groups',
    title: 'Florida renewal groups',
    state: 'FL',
    summary: 'Group 3 RN licenses expire 30 Apr 2027 (used for Jordan).',
    sources: [{ label: 'Florida Board of Nursing, RN renewal', url: 'https://floridasnursing.gov/registered-nurse-renewal/' }],
  },
  {
    id: 'ca-rn',
    title: 'California RN: 30 hours every 2 years',
    state: 'CA',
    summary:
      'Only courses from providers with a California BRN provider number (CEP) count. The BRN approves providers, not courses. Implicit bias (1 h) applies to newly licensed RNs. No state tracking system: nurses keep certificates in case of audit.',
    sources: [
      { label: 'California BRN, CE for renewal', url: 'https://rn.ca.gov/licensees/ce-renewal.shtml' },
      { label: 'California BRN, CEP provider number', url: 'https://rn.ca.gov/applicants/cep-lic.shtml' },
    ],
  },
  {
    id: 'compact',
    title: 'Florida multistate license and California',
    state: 'CA',
    summary: 'California is not a Nurse Licensure Compact state, so a Florida multistate (Compact) license doesn’t cover it. Jordan needs a separate California license.',
    sources: [{ label: 'Nurse Licensure Compact, member map', url: 'https://www.nursecompact.com/map.page' }],
  },
  {
    id: 'awarding',
    title: 'Who can award contact hours',
    state: 'All',
    summary:
      'ANCC accreditation (directly, or Approved Provider via a state nursing association), Florida Board approval, California CEP number.',
    sources: [
      { label: 'ANCC NCPD accreditation', url: 'https://www.nursingworld.org/organizational-programs/accreditation/ncpd/' },
      {
        label: 'ANCC NCPD provider manual 2025',
        url: 'https://email.nursingworld.org/hubfs/ANCC%20Organizational%20Credentialing/NCPD/ANCC-3375-NCPD-PROVIDER-MANUAL-2025_FNL10.pdf',
      },
    ],
  },
  {
    id: 'bls',
    title: 'BLS (blended)',
    state: 'All',
    summary:
      'Online part plus a hands-on skills session with an instructor or a manikin station. eCard valid 2 years, to the end of the month. Tracked as an employer credential, not license hours.',
    sources: [{ label: 'American Heart Association, BLS course options', url: 'https://cpr.heart.org/en/courses/basic-life-support-course-options' }],
  },
];

export const NOT_CLAIMED =
  'Not verified, so not claimed: California’s exact certificate-retention period (the app says “keep certificates in case of audit”) and California’s contact-hour minutes.';

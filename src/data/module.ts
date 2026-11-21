// Course content for Prevention of Medical Errors (written for the demo, general patient-safety knowledge).
// Source: rounds-handoff.md section 7 and the web prototype. Other courses use generic sections and a demo shortcut.

export type Section = { title: string; minutes: number; paragraphs: string[]; bullets?: string[]; onTheWard?: string };
export type Question = { scenario: string; question: string; options: string[]; answer: number; why: string };

export const MED_ERRORS_SECTIONS: Section[] = [
  {
    title: 'Why errors happen',
    minutes: 25,
    paragraphs: [
      'Most harm doesn’t come from careless people. It comes from systems that make the wrong action easy. The “Swiss cheese” model describes how several small gaps line up: a look-alike label, a busy shift, an interrupted check.',
      'Florida requires this course to cover root-cause analysis, error reduction and prevention, and patient safety. A root-cause analysis asks what in the process allowed the error, not who to blame.',
    ],
    bullets: ['Look for the process gap first.', 'Fix the system: order sets, storage, alerts.', 'Share the learning across units.'],
    onTheWard:
      'A patient receives a double dose of enoxaparin. The day nurse gave it at 09:00; the order set also scheduled it at 10:00 after a transfer. The root cause is the duplicated order, not the second nurse.',
  },
  {
    title: 'Medication safety',
    minutes: 35,
    paragraphs: ['Medication errors are among the most common preventable harms in hospitals. Three habits prevent most of them.'],
    bullets: [
      'Look-alike, sound-alike drugs: store them apart and use tall-man lettering, for example hydrOXYzine and hydrALAZINE.',
      'High-alert medications such as insulin, heparin and opioids need an independent double check by a second nurse.',
      'Scan at the bedside: barcode checks catch wrong-patient and wrong-dose errors before they reach the patient.',
    ],
    onTheWard:
      'Two vials with similar labels sit side by side in the dispensing cabinet. A reminder email won’t fix this; moving one vial and adding tall-man labels will.',
  },
  {
    title: 'Wrong-site procedures',
    minutes: 25,
    paragraphs: [
      'The Universal Protocol has three steps before any invasive procedure: pre-procedure verification, site marking by the person doing the procedure, and a time-out just before starting, where the whole team confirms patient, procedure and site.',
    ],
    onTheWard:
      'During a bedside chest-tube insertion the physician starts prepping before the time-out. As the nurse, you can and should stop the procedure until the time-out is done.',
  },
  {
    title: 'Communication and reporting',
    minutes: 35,
    paragraphs: [
      'Handoffs are where information gets lost. SBAR (Situation, Background, Assessment, Recommendation) gives every handoff the same structure, and closed-loop communication confirms each instruction was heard.',
      'A just culture separates honest mistakes from reckless behavior. Report near misses too: an error you caught today is the one that reaches a patient next month.',
    ],
    onTheWard:
      'You notice a wrong dose before giving it. No harm occurred, but you report it as a near miss so pharmacy can fix the label that caused it.',
  },
];

export const MED_ERRORS_QUIZ: Question[] = [
  {
    scenario: 'Hydroxyzine and hydralazine vials are stored side by side and were almost swapped twice this month.',
    question: 'What is the most effective fix?',
    options: ['Email staff to be more careful', 'Separate the storage and add tall-man lettering', 'Discipline the nurses involved', 'Add a second signature on every medication'],
    answer: 1,
    why: 'Reminders and blame don’t change the system. Separating storage and tall-man labels remove the trap.',
  },
  {
    scenario: 'The team is about to start a bedside procedure. Site marked, consent signed.',
    question: 'Which step must happen immediately before starting?',
    options: ['Pre-procedure verification', 'A time-out with the whole team', 'Documenting the procedure note', 'Calling the charge nurse'],
    answer: 1,
    why: 'The time-out is the final check, done just before the procedure starts.',
  },
  {
    scenario: 'You catch a wrong insulin dose before giving it. The patient is unharmed.',
    question: 'What should you do?',
    options: ['Nothing, since no harm occurred', 'Tell a colleague informally', 'Report it as a near miss', 'Only document it in the patient’s chart'],
    answer: 2,
    why: 'Near-miss reports let the hospital fix the cause before harm occurs.',
  },
  {
    scenario: 'You hand over a deteriorating patient using SBAR.',
    question: 'What does the “R” ask you to give?',
    options: ['Results of the last labs', 'Your recommendation or request', 'A risk score', 'The room number'],
    answer: 1,
    why: 'R is your Recommendation: what you think should happen next.',
  },
  {
    scenario: 'Your unit runs a root-cause analysis after a medication error.',
    question: 'What is the main focus?',
    options: ['Who made the error', 'The processes and systems that allowed it', 'How to discipline staff', 'Whether to inform the patient'],
    answer: 1,
    why: 'Root-cause analysis looks at systems, not individual blame.',
  },
];

export const PASS_MARK = 0.8;

export const OUTCOMES: Record<string, string[]> = {
  'med-errors': [
    'Explain how system gaps, not individuals, cause most medication and procedure errors',
    'Use root-cause analysis to find the process failure behind an error',
    'Apply look-alike/sound-alike, high-alert and Universal Protocol safeguards on the ward',
    'Report near misses and communicate with SBAR in a just culture',
  ],
};
export const GENERIC_OUTCOMES = [
  'Explain the key clinical risks this course covers',
  'Apply the recommended practices to common ward situations',
  'Know when and how to escalate or report',
];
export const AUTHORS: Record<string, string> = { 'med-errors': 'Dana Whitfield, MSN, RN, CPHQ · patient safety specialist (sample)' };
export const DEFAULT_AUTHOR = 'Rounds clinical faculty (sample)';
export const NURSE_PLANNER = 'Lena Ortiz, DNP, RN (sample)';
export const DISCLOSURES = 'None of the planners or authors have relevant financial relationships with ineligible companies (sample)';
export const GENERIC_SECTIONS = ['Overview', 'Recognizing the signs', 'Responding and reporting', 'Case studies'];

/** Only Prevention of Medical Errors has full lessons; other modules use the demo shortcut (as in the web prototype). */
export const hasFullContent = (id: string) => id === 'med-errors';

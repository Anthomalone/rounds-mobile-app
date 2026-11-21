# Feature list: Rounds mobile app

Source: `docs/prd.md`. One row per feature, in build order: data first, then the screens that use it. Logic, sample data and acceptance criteria come from `rounds-handoff.md` sections 6, 7 and 8.

## Features

| ID | Feature (what a person can do or see) | Done check (an action and what they see) | Version | Status |
|---|---|---|---|---|
| F1 | Jordan's sample data and the Florida and California rules are in the app, and a "Rules & sources" screen lists each rule with its source link and "checked 21 Nov 2026" | I open Rules & sources and see the Florida and California rules, each with a tappable source link and the date 21 Nov 2026 | v1 | not started |
| F2 | Home shows a Florida tile (20/24 h, renew by 30 Apr 2027, days left) and a California tile (18/30 h, 31 Aug 2027) with half-circle gauges | I open the app and see the mint Florida tile at 20/24 and the lavender California tile at 18/30, each with its deadline and days left | v1 | not started |
| F3 | Home names each missing Florida required topic, even when total hours look enough, with a requirement list per license | On Home I see the amber note "Enough Florida hours, but not the right ones" and Prevention of Medical Errors and Recognizing Impairment listed as missing | v1 | not started |
| F4 | Home shows the shortest path across both licenses: courses in order, each with "counts toward" chips, and a "Start next" button | On Home the black tile reads "4 courses · 12 h", the list starts with Prevention of Medical Errors, and each course shows a mint Florida and/or lavender California chip | v1 | not started |
| F5 | Home shows "Needs your attention": BLS card expiring and outside certificate waiting | On Home I see BLS expiring in a number of days matching 31 Jan 2027, and tapping it opens the BLS renewal | v1 | not started |
| F6 | Courses tab lists the catalog, and a course detail shows provider, accreditation, FL/CA provider numbers, outcomes, author, Nurse Planner, how contact hours were calculated, disclosures and the syllabus | I tap Courses, then Prevention of Medical Errors, and see "120 min = 2.0 h", the provider numbers, and 4 sections plus a locked post-test | v1 | not started |
| F7 | Lesson reader: read each section with its "On the ward" case, see progress, and mark it complete | I open section 1, tap "Mark complete and continue" four times, and the progress dashes fill; the post-test unlocks only after the fourth | v1 | not started |
| F8 | Post-test: 5 questions, 80% to pass, feedback on each answer, retake if below 80% | I answer 3 of 5 right and see "no hours" with "Your answer" / "Correct answer" on each question and a Retake button; I retake with 5 right and pass | v1 | not started |
| F9 | Evaluation, then certificate (SAMPLE), then "reported to CE Broker by Rounds" (simulated, labelled), then progress and path update | After passing I submit the 3 ratings, see the certificate with contact hours, date and ID, watch the status go to "Reported to CE Broker (simulated)", and back on Home Florida shows 22/24 and the path shows 3 courses | v1 | not started |
| F10 | When every requirement is met, the path shows "Complete" and recommends nothing | I finish the remaining path courses and the path tile reads "Complete" with no course suggested | v1 | not started |
| F11 | Certificates tab: totals (count, Florida h, California h) and a list showing where each counts and its status (Reported by Rounds / Reported by provider / Self-reported) | I tap Certificates and see 7 certificates at the start, Florida and California hour totals, and a status on each | v1 | not started |
| F12 | Add an outside certificate: "Use sample certificate", simulated AI reading (labelled), fields with confidence (below 90% flagged "Check"), rule checks per state | I tap Add certificate, then Use sample certificate, and see Antimicrobial Stewardship 3.0 h, an 88% field marked "Check", Florida "counts as general but already full, adds 0 useful hours" and California "does not count: no CEP number" | v1 | not started |
| F13 | After the checks, choose "Save for Florida only" (adds a self-reported certificate) or "Ask provider for a California CEP number" (drafted message, never sent) | I tap Save for Florida only and the Certificates list shows 8 with the new one "Self-reported"; on a fresh try I tap Ask provider and see an editable draft with a clear "Not sent" note and no send happens | v1 | not started |
| F14 | BLS renewal: online part (leaving Rounds, simulated return), pick one of 3 skills sessions, simulated instructor pass, new eCard valid to end of month + 2 years | I go through the 4 steps, pick a session, tap the simulated instructor pass, and see a new eCard with an expiry two years out at month end; the BLS warning leaves Home | v1 | not started |
| F15 | Manager view on the phone: team KPIs, filters, nurse cards, Draft reminder with "Approve and queue" (nothing sent) | I switch to Manager and see 12 nurses with Jordan's status matching the nurse side | later | not started |
| F16 | Camera capture of a paper certificate or BLS card, feeding the add-certificate flow | I photograph a certificate and it goes into the same simulated reading flow | later | not started |
| F17 | Push reminders 90/60/30 days before each deadline, BLS expiry, and "reported to CE Broker" | I get a phone notification for a deadline I set close to today | later | not started |
| F18 | Offline lessons: read a lesson with no signal and sync completion later | I turn on airplane mode, finish a section, turn it off, and the completion is kept | later | not started |
| F19 | Add a BLS skills session to the phone calendar, and a Wallet-style pass for the BLS eCard | I tap Add to calendar and the session appears in my calendar | later | not started |
| F20 | Face ID to open the app | I close and reopen the app and it asks for Face ID before showing Home | later | not started |
| F21 | Spec screen with user stories, ticket, personas, metrics and risks | I open Spec and see US-1 to US-3 with their acceptance criteria | later | not started |

Status is one of: not started, in progress, done (merged to main).

## Later

- Mobile-only extras F16 to F20 come from handoff section 12; pick any for v1 by answering PRD open question 4.

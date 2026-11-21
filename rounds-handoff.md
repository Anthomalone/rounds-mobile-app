# Rounds: handoff for the mobile app

Everything produced so far for "Rounds", gathered in one file so a new project can start from it.
Prepared 21 Nov 2026 by Claude Code for Anthony Malon.

- **Live web prototype:** https://license-renewal-demo.vercel.app (single static HTML file, no backend, data kept in the browser).
- **Original files (job-search workspace):** `Documents/Applications/Job-applications/2026-11-18-distantjob-pm-ai-first-edtech/demo/index.html`, plus `demo-walkthrough.md` and `Interview_Prep_DistantJob.pdf` in the folder above it.
- **Full web source:** Appendix A at the end of this file.

---

## 1. Why this exists
Anthony is interviewing with DistantJob (recruiter) for a remote **Product Manager, AI-First EdTech** role. The client (a US company, not named) runs a **learning platform for licensed healthcare professionals** who must keep their licenses and certifications up to date. The job asks for development-ready tickets, clear acceptance criteria and acceptance testing, a prioritised backlog, daily Claude / Claude Code use, and **clickable prototypes built with AI coding tools**.

Rounds is that proof: a realistic concept product built around real state rules, with a spec whose acceptance criteria can be tested in the prototype.

**Next step (this project):** turn the web prototype into a mobile app. Nurses check this between shifts, so mobile is the natural home for the nurse side.

---

## 2. Problem and goal
**Problem.** US nurses renew their license every two years with a set number of contact hours, and some states require specific topics. Rules differ by state and change over time. Nurses with more than one license (for example travel nurses) track it by hand, and some only discover a missing topic at renewal. For hospitals, a lapsed license or BLS card means a nurse can't be scheduled.

**Goal.** Every nurse knows, at any moment, what is left for each license and the shortest way to finish it. Managers see risk 60+ days before a deadline.

**Business model assumed.** Rounds is the **accredited provider of its own courses** (ANCC, Florida Board, California CEP), so it issues certificates and reports to CE Broker. Courses taken elsewhere are checked against each state's rules but never certified by Rounds.

### Key industry principle
Only accredited or approved providers can award nursing contact hours. Hours come from completing an accredited learning activity (content + time); the post-test only confirms completion. A platform can't just ask a few questions and issue a certificate unless it is the accredited provider.

Three business models exist in this market:
1. **Platform is the provider** (e.g. NetCE, CEUfast, Elite Learning): writes or licenses content, holds ANCC + state approvals, issues certificates, reports to CE Broker. **Rounds uses this model.**
2. **Platform hosts other providers' courses**: certificate carries the provider's name and numbers.
3. **Platform only tracks**: nurses upload certificates from anywhere; it checks them against the rules.

Question to ask the client: *"Are you the accredited provider for your content, do you also host partner courses, and do you report to CE Broker yourselves?"*

---

## 3. Personas (made up)
| Persona | Who | Pain |
|---|---|---|
| **Jordan Reyes, RN** (main) | Travel nurse. Florida multistate (Compact) license + California license. Takes courses on her phone between shifts. | Different rules per state; doesn't know which hours count twice. |
| **Priya Natarajan** | Staff nurse, one Florida license, busy unit. | Has "enough hours" but misses a required topic; finds out late. |
| **Carla Mendes** | Nurse Manager, 4 West Med-Surg, 12 nurses. | Learns about lapsed licenses or BLS cards only when building the schedule. |

---

## 4. Rules used (checked 21 Nov 2026, simplified for the demo)
| Rule | Used in the prototype | Source |
|---|---|---|
| **Florida RN: 24 hours every 2 years** | 16 general + Prevention of Medical Errors 2 + Florida Laws & Rules 2 + Recognizing Impairment in the Workplace 2 (every other renewal) + Human Trafficking 2. Domestic Violence 2 h every third renewal (on top of the 24). HIV/AIDS 1 h once, before first renewal. Hours can't carry over. | [Florida Board of Nursing, RN renewal](https://floridasnursing.gov/registered-nurse-renewal/) |
| **Florida reporting and providers** | Completions are reported in **CE Broker**, the state tracking system. Required topics need a **Florida Board-approved provider**, except Human Trafficking. General hours need a provider approved by a state or national nursing CE accreditor. Approved providers report to CE Broker. | Same page; [CE Broker FL provider requirements](https://cebroker.com/documentation/requirements/18/Florida%20Board%20of%20Nursing/1000) |
| **Florida renewal groups** | Group 3 RN licenses expire 30 Apr 2027 (used for Jordan). | Florida RN renewal page |
| **California RN: 30 hours every 2 years** | Only courses from providers with a **California BRN provider number (CEP)** count. The BRN approves providers, not courses. Implicit bias (1 h) applies to newly licensed RNs. No state tracking system: nurses keep certificates in case of audit. | [California BRN, CE for renewal](https://rn.ca.gov/licensees/ce-renewal.shtml), [CEP provider number](https://rn.ca.gov/applicants/cep-lic.shtml) |
| **Who can award contact hours** | ANCC accreditation (directly, or Approved Provider via a state nursing association), Florida Board approval, California CEP number. | [ANCC NCPD](https://www.nursingworld.org/organizational-programs/accreditation/ncpd/), [ANCC provider manual 2025](https://email.nursingworld.org/hubfs/ANCC%20Organizational%20Credentialing/NCPD/ANCC-3375-NCPD-PROVIDER-MANUAL-2025_FNL10.pdf) (criteria revised for 2026) |
| **BLS (blended)** | Online part (HeartCode-style) + hands-on skills session with an instructor or a manikin station. eCard valid 2 years, to the end of the month. Tracked as an **employer credential**, not license hours. | [American Heart Association BLS course options](https://cpr.heart.org/en/courses/basic-life-support-course-options) |

**Not verified, so not claimed:** California's exact certificate-retention period (the app says "keep certificates in case of audit"), California's contact-hour minutes. California is **not** a Nurse Licensure Compact state, so a Florida multistate license doesn't cover it.

---

## 5. Screens (web prototype)
Three views, switched at the top: **Nurse**, **Manager**, **Spec**.

### Nurse
1. **Home**
   - Tiles: Florida (mint, half-circle gauge 20/24 h, renew by 30 Apr 2027, days left), California (lavender, 18/30 h, 31 Aug 2027), Shortest path (black: "4 courses · 12 h", Florida topics missing, California hours left, "Start next" button).
   - Amber insight: *"Enough Florida hours, but not the right ones"* (general 18/16 but two required topics missing).
   - "Your courses, in order" list with "counts toward" chips (mint = Florida, lavender = California).
   - "Needs your attention": conference certificate waiting, BLS expiring (71 days), Florida audits.
   - Florida and California requirement cards (rows with check, hours, hatched bars).
2. **Courses (catalog):** each course shows type, which license/requirement it counts toward, hours, provider.
3. **Course detail:** type tag, counts chips, provider + accreditation + FL/CA provider numbers; **Learning outcomes, Author, Nurse Planner, how contact hours were calculated (120 min = 2.0 h, 1 contact hour = 60 min), what it takes to earn hours, Disclosures**; syllabus (4 sections + locked post-test); "Why this course" and "After you pass".
4. **Lesson reader:** section text, "On the ward" case box, progress dashes, Previous / Mark complete and continue.
5. **Post-test:** 5 case-based questions, pass mark 80% (4 of 5); after submit, each option marked "Your answer" / "Correct answer" with feedback; below 80% = no hours, retake.
6. **Course evaluation:** 3 ratings (met outcomes, useful for practice, free of commercial bias) + optional "What will you change?". Certificate is issued only after submit.
7. **Certificate:** issued by Rounds Learning, accreditation statement, contact hours, date, certificate ID, Nurse Planner signature, SAMPLE ribbon, Download PDF (demo). Timeline: test + evaluation → certificate issued → **reported to CE Broker by Rounds** (simulated, ~2 s) → counted toward renewals.
8. **Certificates:** KPI tiles (count, Florida h, California h), table with where each counts and status (Reported by Rounds / Reported by provider / Self-reported), "Export audit pack" (demo).
9. **Credentials (BLS renewal):** 4-step flow: online part at training center ("Leaving Rounds" modal → simulate return) → pick a skills session (3 slots) → booked → simulate instructor pass → new eCard (valid to end of month + 2 years).
10. **Add certificate (outside course):** drop zone or "Use sample certificate" → simulated AI reading (3 progress messages) → extracted fields with confidence pills (<90% flagged "Check") → rule checks (within cycle ✓; Florida counts as general but already full ⚠; California ✗ no CEP) → choose "Ask provider for a California CEP number" (drafted message, never sent) or "Save for Florida only" (adds a self-reported certificate).

### Manager (Carla Mendes, 4 West Med-Surg)
- KPI tiles: Ready to renew 42% (mint), Blocked 3, At risk 4, BLS expiring within 90 days (black).
- Filters: All, Blocked, At risk, On track, BLS < 90 days.
- Table (cards on phone): nurse, licenses, status, what's blocking, BLS card, **Draft reminder** → editable message → "Approve and queue" (nothing sent).
- Jordan's row is **live**: computed from the nurse view.
- "Export for Joint Commission survey" (demo).

### Spec
Tabs: User stories, Ticket, Problem & personas, Metrics & risks, Rules & sources (content in sections 7–9 below).

---

## 6. Logic
### Florida status
For each certificate with a Florida requirement key (`general`, `medErrors`, `laws`, `impairment`, `trafficking`), add its hours to that bucket. Each bucket counts at most its need (16/2/2/2/2). Total = sum of capped buckets / 24. Missing = buckets below need. Extra general hours never fill a required topic.

### California status
Sum hours of certificates whose provider has a CEP number; cap at 30.

### Shortest path
1. For each missing Florida required topic, pick a not-yet-completed module that satisfies it, preferring one that also counts for California.
2. Then add remaining modules (excluding Domestic Violence, not due) that count for California or Florida general, largest hours first, until California hours left ≤ 0 and Florida general left ≤ 0.
3. Show count and total hours. Starting data → 4 courses, 12 h: Medical Errors (2), Impairment (2), High-Alert Medications (4), Delirium (4).

### Manager status for Jordan
Missing Florida required topic → **Blocked** ("Missing …"); else California hours left → **At risk**; else **On track**.

### Status chips
On track (green), At risk (amber), Blocked (red), Overdue (red).

---

## 7. Sample data (all made up unless marked as a rule)
### Providers
| Key | Name | Florida | California | Accreditation |
|---|---|---|---|---|
| rounds | Rounds Learning | FL Board provider #50-31088 (sample) | CA BRN CEP #18245 (sample) | ANCC-accredited provider (sample) |
| harbor | Harbor Health Learning | FL Board provider #50-22917 (sample) | none | |
| brightwater / meridian | legacy sample providers (kept in data) | | | |

### Catalog (Rounds Learning)
| id | Title | Hours | Florida | California |
|---|---|---|---|---|
| med-errors | Prevention of Medical Errors | 2 | medErrors | yes |
| impairment | Recognizing Impairment in the Workplace | 2 | impairment | yes |
| high-alert | High-Alert Medications: Insulin, Heparin, Opioids | 4 | general | yes |
| delirium | Delirium Prevention in Hospitalized Older Adults | 4 | general | yes |
| handoff | Safer Handoffs with SBAR | 2 | general | yes |
| fl-dv | Domestic Violence for Florida Nurses | 2 | dv (not due) | yes |
| bls | BLS Provider Renewal (blended) | 0 | employer credential | n/a |

### Jordan's completed certificates (start state)
| Course | Hours | Provider | Date | Florida | California | Source |
|---|---|---|---|---|---|---|
| Sepsis Recognition and Early Management | 3 | Rounds Learning | 2025-06-12 | general | yes | platform |
| Nursing Laws and Rules in Florida | 2 | Harbor Health Learning | 2025-08-03 | laws | no | outside provider |
| Human Trafficking: Recognize and Respond | 2 | Harbor Health Learning | 2025-08-03 | trafficking | no | outside provider |
| Pain Management in Older Adults | 4 | Rounds Learning | 2025-11-20 | general | yes | platform |
| Acute Stroke Care: Door to Needle | 2 | Rounds Learning | 2026-02-09 | general | yes | platform |
| Wound Care Essentials | 6 | Rounds Learning | 2026-04-17 | general | yes | platform |
| Cardiac Rhythm Interpretation | 3 | Rounds Learning | 2026-07-22 | general | yes | platform |

Result: Florida 20/24 (general 18/16 capped at 16, Laws ✓, Trafficking ✓, Medical Errors 0/2, Impairment 0/2). California 18/30.
Jordan: FL license RN •••4821; BLS card expires 31 Jan 2027.

### Sample outside certificate (upload flow)
Antimicrobial Stewardship for Nurses · 3.0 h · 14 Oct 2026 · Gulf Coast Critical Care Conference · accredited by a national nursing CE body (88% confidence) · no California CEP number (93%).

### BLS skills sessions
Today + 6 days 08:00–10:45 Sim Lab 2nd floor, instructor-led · today + 9 days 14:00–16:45 Sim Lab, instructor-led · today + 12 days any time, self-directed manikin station, ED corridor. Training center: Lakeside Hospital Training Center (sample). Online part score: 92%.

### Team (4 West Med-Surg)
| Nurse | Licenses | Status | Blocking | BLS |
|---|---|---|---|---|
| Jordan Reyes | FL (multistate) + CA | live | live | 2027-01-31 |
| Priya Natarajan | FL | Blocked | Missing Prevention of Medical Errors (2 h) | 2027-09-30 |
| Marcus Bell | FL | On track | All requirements met | 2028-03-31 |
| Elena Petrova | FL | At risk | 8 general hours left | 2026-12-31 |
| Samuel Okafor | FL + GA | At risk | Impairment course due this cycle | 2027-06-30 |
| Hannah Kim | FL | On track | | 2027-11-30 |
| Diego Alvarez | FL | Blocked | Human Trafficking + Laws & Rules missing | 2027-02-28 |
| Aisha Rahman | FL | On track | | 2027-08-31 |
| Tom Whitaker | FL + CA | At risk | California: 14 hours left | 2027-05-31 |
| Grace Liu | FL | On track | | 2027-04-30 |
| Noah Brennan | FL | At risk | Certificate under review (external) | 2028-01-31 |
| Fatou Diallo | FL | On track | | 2027-10-31 |

### Course content: Prevention of Medical Errors (written for the demo, general patient-safety knowledge)
- **Authors:** Dana Whitfield, MSN, RN, CPHQ (sample). **Nurse Planner:** Lena Ortiz, DNP, RN (sample).
- **Learning outcomes:** explain how system gaps cause most errors; use root-cause analysis; apply look-alike/sound-alike, high-alert and Universal Protocol safeguards; report near misses and use SBAR in a just culture.
- **Sections:** 1 Why errors happen (25 min, Swiss cheese model, root-cause analysis; enoxaparin double-dose case). 2 Medication safety (35 min, LASA + tall-man lettering, independent double check for insulin/heparin/opioids, bedside barcode scanning). 3 Wrong-site procedures (25 min, Universal Protocol: verification, site marking, time-out). 4 Communication and reporting (35 min, SBAR, closed-loop, just culture, near misses).
- **Post-test (correct answer in bold):**
  1. Hydroxyzine/hydralazine stored side by side, nearly swapped twice. Best fix? Email staff / **Separate storage and add tall-man lettering** / Discipline / Second signature on every medication.
  2. Step immediately before starting a procedure? Pre-procedure verification / **Time-out with the whole team** / Procedure note / Call charge nurse.
  3. Wrong insulin dose caught, no harm. What to do? Nothing / Tell a colleague / **Report as a near miss** / Chart only.
  4. SBAR "R"? Results / **Recommendation or request** / Risk score / Room number.
  5. Root-cause analysis focus? Who made the error / **Processes and systems that allowed it** / Discipline / Inform the patient.
- **Evaluation:** 3 Likert ratings + optional free text.

---

## 8. User stories and acceptance criteria
**US-1 Shortest path across licenses** (Jordan). *As a nurse holding more than one state license, I want one plan that tells me which courses close my gaps for every license, so that I don't waste hours on courses that only count once.*
1. Given required topics missing in Florida, when she opens Home, then each missing topic is listed by name, even if total hours look sufficient.
2. Given a course counts toward more than one license, then the path shows every requirement it counts toward.
3. Given required topics are missing, then the path schedules them first.
4. Given a course is completed, then progress, the path and the manager view update without a reload.
5. Given every requirement is met, then the path shows "Complete" and recommends nothing.

**US-2 Self-paced module with post-test** (any nurse). *As a nurse, I want to complete a required course and have it reported to the state automatically, so that my record is correct without extra admin.*
1. Given not all sections are finished, then the post-test is locked.
2. Given a score below 80%, then no hours are added and the nurse can retake, with feedback on each answer.
3. Given a pass, then the nurse submits a short evaluation before the certificate is issued.
4. Given the evaluation is submitted, then a certificate is issued by the accredited provider with accreditation statement, contact hours and date.
5. Given a Florida requirement, then completion is reported to CE Broker and the status is visible to the nurse.

**US-3 Certificate from another provider** (any nurse). *As a nurse who took a course elsewhere, I want to know exactly which license it counts for before I rely on it, so that I don't discover a gap at renewal time.*
1. Extracted fields are shown with a confidence level; nothing counts until the nurse confirms.
2. No California CEP number → flagged as not counting for California, with the reason.
3. Matching Florida requirement already full → app says it adds 0 useful hours.
4. Nurse chooses to ask the provider → a request is drafted and never sent without approval.

### Sample ticket: RND-142 Report Florida completions to CE Broker (Story, 5 pts, needs refinement)
- When a nurse passes a course that counts toward a Florida requirement, send the completion to CE Broker. Part of US-2.
- AC: sent within 5 minutes of the certificate; nurse sees Sending / Reported / Failed with retry; a failed report never removes in-app hours but nurse and support are told; only courses approved by the Florida Board for that requirement are reported as that requirement.
- Out of scope: self-reported outside certificates; states other than Florida.
- Open questions: real time or daily batches? Do partner courses report themselves or through us? Which license identifier do we hold?
- Epic: State reporting. Depends on RND-138 License profile.

---

## 9. Metrics, risks, questions
**Success metrics:** on-time renewal rate (all requirements met 30 days before deadline); wasted hours (hours that count toward no open requirement, target −50%); early warning (share of at-risk nurses reached 60+ days ahead); path completion.

**Risks:** rule accuracy (rules table with source, owner, review date); CE Broker outages (retries, visible status); AI reading errors (confidence shown, nurse confirms); personal data (license numbers are sensitive: store the minimum, mask in UI).

**Questions for stakeholders:** which states cover most users; do providers already report to CE Broker; do hospitals buy per unit or nurses sign up alone; who owns rule updates.

**Not in this version:** real board or CE Broker integrations, states beyond FL and CA, live AI certificate reading, paying for courses, specialty certifications (e.g. CCRN).

---

## 10. Design system (current web version)
Inspired by two references Anthony chose: a clean light analytics dashboard (grey canvas, white cards, black pill selections, monospace numbers) and a playful card set (mint and lavender filled tiles, black tile, hatched patterns, circle badges, ↗ arrow buttons). Rule: **mostly white and grey, a few colored tiles.**

| Token | Value |
|---|---|
| Canvas | `#ECEEE9` |
| Surface / surface-2 / surface-3 | `#FFFFFF` / `#F4F5F2` / `#EEF0EB` |
| Ink / ink-2 / muted | `#121412` / `#4B504B` / `#8B908A` |
| Lines | `#E4E7E1`, `#EEF0EB` |
| Mint tile / text | `#B8F2A6` / `#173F12` |
| Lavender tile / text | `#CBC2FF` / `#2A2160` |
| Accent green (progress) | `#3CB54A` |
| OK / warn / bad / info (text, soft bg) | `#23863A`/`#E3F6DC`, `#A86400`/`#FBEFD5`, `#C2402B`/`#FBE4DF`, `#4C3FB0`/`#ECE9FF` |
| Fonts | Geist (UI), **Geist Mono** for all numbers |
| Radius | cards 22px, tiles 26px, buttons and chips fully round (pill) |
| Hatch | 135° stripes, ink at 16% opacity, 1.5px every 6px (remaining progress) |

**Components:** pill buttons (black primary, white ghost, mint), segmented role switch (black active), status chips with dot, half-circle gauge (black = done, hatched = remaining), tiles (mint = Florida, lavender = California, black = path / key KPI), circle badges, ↗ arrow buttons, timelines with black/mint dots, floating white bottom tab bar on phone.

Colour convention: **mint = Florida, lavender = California, black = action or headline number.**

---

## 11. What is simulated (say it out loud in demos)
People, providers, provider numbers, the conference, dates of past courses; AI certificate reading; CE Broker reporting (2-second delay); BLS training-center return and instructor confirmation; PDF downloads and exports; reminders and provider requests (drafted, never sent). State rules are real but simplified.

---

## 12. Ideas for the mobile app (to decide in /brief)
- **Platform:** native iOS (SwiftUI), cross-platform (React Native / Expo), or an installable web app (PWA). Decision for Anthony.
- **Scope:** nurse side first (Home, path, course flow, certificates, BLS, upload). Manager view probably stays web/tablet.
- **Mobile-only strengths:**
  - **Camera capture** of paper certificates and BLS cards (feeds the upload flow).
  - **Push notifications**: 90/60/30 days before each deadline, BLS expiry, "reported to CE Broker".
  - **Offline lessons** for shifts with no signal; sync completion later.
  - **Calendar** add for skills sessions; **Wallet-style pass** for the BLS eCard.
  - Face ID to open (license numbers are sensitive).
- Keep the same logic (section 6), data (section 7) and acceptance criteria (section 8) so the web spec stays the source of truth.

---

## Appendix A: full web prototype source (index.html)
Single file: HTML + CSS + JavaScript, no dependencies except Google Fonts. Data lives in the constants near the top of the script (`FL`, `CA`, `PROV`, `COURSES`, `SEED`, `TEAM`, `MODULE`, `OUTCOMES`, `SLOTS`, `EXTRACT`, `STORIES`). State is saved in localStorage under `rounds-demo-v3`.

````html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#ECEEE9">
<title>Rounds · License & CE Renewal (concept prototype)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;450;500;550;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#ECEEE9;--surface:#fff;--surface-2:#F4F5F2;--surface-3:#EEF0EB;--ink:#121412;--ink-2:#4B504B;--muted:#8B908A;--line:#E4E7E1;--line-2:#EEF0EB;
  --brand:#121412;--brand-ink:#121412;--brand-soft:#F1F2EE;--navy:#121412;
  --mint:#B8F2A6;--mint-2:#A6EB92;--mint-ink:#173F12;--lav:#CBC2FF;--lav-2:#B9AEFB;--lav-ink:#2A2160;--green:#3CB54A;
  --ok:#23863A;--ok-soft:#E3F6DC;--warn:#A86400;--warn-soft:#FBEFD5;--bad:#C2402B;--bad-soft:#FBE4DF;--info:#4C3FB0;--info-soft:#ECE9FF;
  --radius:22px;--shadow:none;
  --font:"Geist",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;--display:"Geist",-apple-system,sans-serif;--mono:"Geist Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  --hatch:repeating-linear-gradient(135deg,rgba(18,20,18,.16) 0 1.5px,transparent 1.5px 6px);
}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--bg);color:var(--ink);font:14.5px/1.55 var(--font);-webkit-font-smoothing:antialiased}
button{font:inherit;cursor:pointer;color:inherit}
a{color:var(--ink)}
:focus-visible{outline:2px solid var(--ink);outline-offset:2px;border-radius:8px}
h1,h2,h3,h4,p{margin:0}
h1{font:500 clamp(1.7rem,3.2vw,2.15rem)/1.12 var(--display);letter-spacing:-.035em}
h2{font:600 1.02rem/1.3 var(--display);letter-spacing:-.015em}
h3{font-size:.93rem;font-weight:550;letter-spacing:-.005em}
.muted{color:var(--muted)} .small{font-size:.84rem} .tiny{font-size:.76rem}
.num,.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;letter-spacing:-.02em}

/* Shell */
.app{display:grid;grid-template-columns:252px minmax(0,1fr);min-height:100vh;gap:0}
.side{background:var(--surface);color:var(--ink);margin:12px;border-radius:24px;padding:20px 14px;position:sticky;top:12px;height:calc(100vh - 24px);display:flex;flex-direction:column;gap:22px}
.logo{display:flex;align-items:center;gap:10px;color:var(--ink);font:600 1.08rem var(--display);letter-spacing:-.02em;padding:0 6px}
.logo-mark{width:30px;height:30px;border-radius:10px;background:var(--ink);display:grid;place-items:center;flex:none}
.logo small{display:block;font:450 .7rem var(--font);color:var(--muted);letter-spacing:0}
.role{background:var(--surface-3);border-radius:999px;padding:4px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px}
.role button{background:none;border:0;border-radius:999px;padding:7px 4px;font-size:.78rem;font-weight:550;color:var(--ink-2)}
.role button[aria-pressed=true]{background:var(--ink);color:#fff}
.navlist{display:flex;flex-direction:column;gap:2px}
.navlist button{display:flex;align-items:center;gap:11px;background:none;border:0;border-radius:12px;padding:9px 10px;text-align:left;color:var(--ink-2);font-weight:500;font-size:.9rem}
.navlist button:hover{background:var(--surface-2)}
.navlist button[aria-current=page]{background:var(--surface-3);color:var(--ink)}
.navlist svg{width:18px;height:18px;flex:none}
.navlist .badge{margin-left:auto;background:var(--mint);color:var(--mint-ink);border-radius:99px;font:600 .7rem var(--mono);padding:1px 7px}
.side-foot{margin-top:auto;font-size:.75rem;color:var(--muted);line-height:1.45}
.side-foot button{background:var(--surface-2);border:0;color:var(--ink-2);border-radius:999px;padding:6px 12px;font-size:.75rem;margin-top:8px}
.who{display:flex;align-items:center;gap:10px;padding:10px;border-radius:16px;background:var(--surface-2)}
.avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:600;font-size:.78rem;flex:none;background:var(--mint);color:var(--mint-ink)}
.who b{display:block;color:var(--ink);font-size:.86rem;font-weight:600}
.who span{font-size:.74rem;color:var(--muted)}

.mainwrap{min-width:0;display:flex;flex-direction:column}
main{padding:30px 32px 60px 20px;max-width:1220px;width:100%}
main:focus{outline:none}
.topbar,.tabbar{display:none}

/* Building blocks */
.card{background:var(--surface);border-radius:var(--radius);padding:22px}
.card + .card{margin-top:14px}
.grid2>.card,.grid3>.card,.grid-main>.card,.grid-main>*{margin-top:0}
.stack{display:flex;flex-direction:column;gap:14px}
.row{display:flex;gap:12px;align-items:center}
.between{justify-content:space-between}
.wrap{flex-wrap:wrap}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.grid-main{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:14px;align-items:start}
.eyebrow{font-size:.76rem;font-weight:500;color:var(--muted)}
.pagehead{display:flex;justify-content:space-between;gap:16px;align-items:flex-end;flex-wrap:wrap;margin-bottom:22px}
.pagehead p{margin-top:8px;color:var(--muted);max-width:64ch}
.pagehead .eyebrow{margin-bottom:6px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;font-size:.74rem;font-weight:550;white-space:nowrap;background:var(--surface-3);color:var(--ink-2)}
.chip::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.75}
.chip.plain::before{display:none}
.chip.ok{background:var(--ok-soft);color:var(--ok)} .chip.warn{background:var(--warn-soft);color:var(--warn)}
.chip.bad{background:var(--bad-soft);color:var(--bad)} .chip.info{background:var(--info-soft);color:var(--info)}
.chip.brand{background:var(--surface-3);color:var(--ink-2)}
.chip.mint{background:var(--mint);color:var(--mint-ink)} .chip.lav{background:var(--lav);color:var(--lav-ink)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--ink);color:#fff;border:1px solid var(--ink);border-radius:999px;padding:9px 18px;font-weight:550;font-size:.86rem;white-space:nowrap;text-decoration:none;transition:background .15s,transform .05s}
.btn:hover{background:#2B2E2B} .btn:active{transform:translateY(1px)}
.btn.ghost{background:var(--surface);color:var(--ink);border-color:var(--line)} .btn.ghost:hover{background:var(--surface-2)}
.btn.mint{background:var(--mint);border-color:var(--mint);color:var(--mint-ink)} .btn.mint:hover{background:var(--mint-2)}
.btn.quiet{background:none;border-color:transparent;color:var(--ink-2);padding-left:4px;padding-right:8px}
.btn.quiet:hover{color:var(--ink)}
.btn.sm{padding:6px 14px;font-size:.8rem}
.btn[disabled]{opacity:.4;cursor:not-allowed}
.btn svg{width:16px;height:16px;flex:none}
.chip svg,.link svg{width:14px;height:14px}
.link{background:none;border:0;padding:0;color:var(--ink);font-weight:550;text-decoration:underline;text-decoration-color:var(--line);text-decoration-thickness:2px;text-underline-offset:4px}
.link:hover{text-decoration-color:var(--ink)}
.divider{height:1px;background:var(--line-2);margin:16px 0}
.callout{border-radius:16px;padding:13px 15px;font-size:.87rem;display:flex;gap:10px;align-items:flex-start}
.callout svg{flex:none;width:18px;height:18px;margin-top:1px}
.callout.warn{background:#FFF4DC;color:#5C3B05} .callout.info{background:var(--info-soft);color:#2D2477}
.callout.ok{background:var(--ok-soft);color:#13502A} .callout.bad{background:var(--bad-soft);color:#7A2410}
.kv{display:grid;grid-template-columns:auto 1fr;gap:7px 18px;font-size:.87rem}
.kv dt{color:var(--muted)} .kv dd{margin:0;font-weight:500}

/* Colored tiles */
.tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.tile{border-radius:26px;padding:20px;display:flex;flex-direction:column;gap:14px;min-height:252px;position:relative;overflow:hidden}
.tile.mint{background:var(--mint);color:var(--mint-ink)} .tile.lav{background:var(--lav);color:var(--lav-ink)} .tile.dark{background:var(--ink);color:#fff}
.tile.white{background:var(--surface)}
.tile-head{display:flex;gap:12px;align-items:center}
.tile-head h2{color:inherit;font-size:1.05rem}
.tile-head p{font-size:.78rem;opacity:.7}
.disc{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;flex:none;background:#fff;color:var(--ink);font:600 .82rem var(--mono)}
.disc svg{width:18px;height:18px}
.tile.dark .disc{background:var(--mint);color:var(--mint-ink)}
.arrow-btn{margin-left:auto;width:34px;height:34px;border-radius:50%;border:1px solid currentColor;background:transparent;display:grid;place-items:center;opacity:.75;flex:none}
.arrow-btn:hover{opacity:1}
.arrow-btn svg{width:15px;height:15px}
.gauge{position:relative;width:100%;max-width:230px;margin:2px auto 0}
.gauge svg{display:block;width:100%;height:auto}
.g-lbl{position:absolute;left:0;right:0;bottom:2px;text-align:center}
.g-lbl b{font:500 2.1rem/1 var(--mono);letter-spacing:-.04em}
.g-lbl span{font:500 .82rem var(--mono);opacity:.65;margin-left:2px}
.tile-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:10px}
.tile-foot span{display:block;font-size:.74rem;opacity:.7}
.tile-foot b{font:500 1.05rem var(--mono);letter-spacing:-.02em}
.pill-dark{background:var(--ink);color:#fff;border-radius:999px;padding:5px 12px;font:500 .76rem var(--mono);white-space:nowrap}
.tile.dark .big{font:500 3.1rem/1 var(--mono);letter-spacing:-.05em;margin-top:6px}
.tile.dark .big small{font:500 .95rem var(--font);letter-spacing:0;opacity:.6;margin-left:6px}
.mini{display:grid;gap:8px}
.mini div{display:flex;justify-content:space-between;align-items:center;font-size:.8rem;padding:9px 12px;border-radius:12px;background:rgba(255,255,255,.07)}
.mini b{font:500 .9rem var(--mono)}
.mini i{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px}

/* Licence detail */
.lic-head{display:flex;justify-content:space-between;gap:12px;align-items:center}
.lic-state{display:flex;gap:12px;align-items:center}
.state-badge{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font:600 .78rem var(--mono);background:var(--mint);color:var(--mint-ink)}
.state-badge.lav{background:var(--lav);color:var(--lav-ink)}
.reqlist{margin-top:12px}
.req{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:12px;align-items:center;padding:11px 0;border-top:1px solid var(--line-2);font-size:.87rem}
.req .ico{width:20px;height:20px;border-radius:50%;display:grid;place-items:center}
.req .ico.ok{background:var(--ink);color:var(--mint)} .req .ico.todo{border:1.5px dashed #B9BEB7} .req .ico.na{background:var(--surface-3);color:var(--muted);font-size:.7rem}
.req .ico svg{width:11px;height:11px}
.req small{display:block;color:var(--muted);font-size:.75rem;margin-top:1px}
.req .num{font-size:.82rem}
.bar{height:8px;background:var(--surface-3);background-image:var(--hatch);border-radius:99px;overflow:hidden;margin-top:7px}
.bar i{display:block;height:100%;background:var(--green);border-radius:99px;transition:width .5s ease}
.bar i.full{background:var(--ink)}
.ring{position:relative;flex:none}
.ring svg{transform:rotate(-90deg)}
.ring .lbl{position:absolute;inset:0;display:grid;place-items:center;text-align:center;line-height:1.1}
.ring .lbl b{font:500 1.3rem var(--mono)} .ring .lbl span{font-size:.7rem;color:var(--muted)}
.countdown{font:500 1.5rem/1 var(--mono);letter-spacing:-.03em}

/* Path */
.step{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:14px;align-items:center;padding:14px 0;border-top:1px solid var(--line-2)}
.step:first-child{border-top:0;padding-top:4px}
.step .n{width:32px;height:32px;border-radius:50%;background:var(--surface-3);color:var(--ink);display:grid;place-items:center;font:500 .8rem var(--mono)}
.step:first-child .n{background:var(--mint);color:var(--mint-ink)}
.step h3{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.step p{font-size:.79rem;color:var(--muted);margin-top:3px}
.counts{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}
.summary-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px}
.summary-strip div{background:var(--surface-2);border-radius:14px;padding:11px 13px;font-size:.76rem;color:var(--muted)}
.summary-strip b{font:500 1.3rem/1.15 var(--mono);display:block;color:var(--ink);letter-spacing:-.03em}

/* Alerts */
.alert{display:flex;gap:12px;padding:13px 0;border-top:1px solid var(--line-2);align-items:flex-start}
.alert:first-of-type{border-top:0;padding-top:2px}
.alert .dot{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex:none}
.alert .dot svg{width:16px;height:16px}
.dot.warn{background:#FFF1D2;color:var(--warn)} .dot.bad{background:var(--bad-soft);color:var(--bad)} .dot.info{background:var(--lav);color:var(--lav-ink)} .dot.ok{background:var(--mint);color:var(--mint-ink)}
.alert h3{font-size:.87rem} .alert p{font-size:.79rem;color:var(--muted);margin-top:2px}

/* Course page */
.course-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:start}
.type-tag{display:inline-flex;gap:6px;align-items:center;font-size:.75rem;font-weight:550;color:var(--mint-ink);background:var(--mint);padding:4px 11px;border-radius:999px}
.syllabus{list-style:none;margin:0;padding:0}
.syllabus li{display:flex;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--line-2)}
.syllabus li:first-child{border-top:0}
.syllabus .sn{width:30px;height:30px;border-radius:50%;background:var(--surface-3);display:grid;place-items:center;font:500 .78rem var(--mono);flex:none;color:var(--ink-2)}
.syllabus li.done .sn{background:var(--ink);color:var(--mint)}
.reader{max-width:740px}
.reader h2{font-size:1.4rem;font-weight:550;letter-spacing:-.025em;margin-bottom:10px}
.reader p,.reader li{color:var(--ink-2);font-size:.95rem}
.reader p{margin-bottom:12px}
.reader ul{padding-left:20px;margin:0 0 12px}
.reader li{margin-bottom:6px}
.case{background:var(--mint);color:var(--mint-ink);border-radius:18px;padding:15px 17px;margin:16px 0}
.case b{display:block;font:600 .72rem var(--mono);letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px;opacity:.8}
.progress-dots{display:flex;gap:5px}
.progress-dots i{width:24px;height:6px;border-radius:9px;background:var(--surface-3);background-image:var(--hatch)}
.progress-dots i.on{background:var(--ink)}
.q{padding:18px 0;border-top:1px solid var(--line-2)}
.q:first-of-type{border-top:0;padding-top:0}
.q h3{font-size:.95rem;margin-bottom:4px}
.q .scenario{font-size:.86rem;color:var(--muted);margin-bottom:10px}
.opt{display:flex;gap:10px;align-items:center;padding:11px 14px;border:1px solid var(--line);border-radius:14px;margin-top:8px;cursor:pointer;font-size:.88rem;background:#fff;transition:border-color .15s}
.opt:hover{border-color:#C5CAC3}
.opt input{margin:0;width:17px;height:17px;accent-color:var(--ink);flex:none}
.opt:has(input:checked){border-color:var(--ink)}
.opt .tag{margin-left:auto;font-size:.72rem;font-weight:600;white-space:nowrap;padding-left:8px}
.opt.right{border-color:var(--green);background:var(--ok-soft)} .opt.wrong{border-color:var(--bad);background:var(--bad-soft)}
.opt.right .tag{color:var(--ok)} .opt.wrong .tag{color:var(--bad)}
.opt input:disabled{opacity:1}
.fb{font-size:.82rem;margin-top:8px;padding:9px 12px;border-radius:12px}
.fb.right{background:var(--ok-soft);color:#13502A} .fb.wrong{background:var(--bad-soft);color:#7A2410}
.score{font:500 3.2rem/1 var(--mono);letter-spacing:-.05em}

/* Certificate */
.cert{border-radius:24px;padding:28px;background:var(--surface);position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px var(--line)}
.cert::after{content:"SAMPLE";position:absolute;right:-46px;top:26px;transform:rotate(35deg);text-align:center;width:180px;background:var(--lav);color:var(--lav-ink);font:600 .66rem var(--mono);letter-spacing:.22em;padding:4px 44px}
.cert h2{font-size:1.4rem;font-weight:550;letter-spacing:-.025em;margin:6px 0 2px}
.seal{width:56px;height:56px;border-radius:50%;background:var(--mint);color:var(--mint-ink);display:grid;place-items:center;flex:none}
.sig{display:flex;justify-content:space-between;gap:20px;align-items:flex-end;margin-top:22px;flex-wrap:wrap}
.sig div{min-width:180px;border-top:1px solid var(--line);padding-top:6px;font-size:.76rem;color:var(--muted)}
.sig i{display:block;font-family:Georgia,serif;font-size:1.12rem;color:var(--ink);margin-bottom:4px}
.timeline{list-style:none;margin:0;padding:0}
.timeline li{display:grid;grid-template-columns:24px 1fr;gap:12px;padding-bottom:16px;position:relative}
.timeline li::before{content:"";position:absolute;left:11px;top:26px;bottom:2px;width:1.5px;background:var(--line)}
.timeline li:last-child::before{display:none}
.timeline .tdot{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--surface-3);color:var(--muted);font:500 .72rem var(--mono)}
.timeline .tdot svg{width:12px;height:12px}
.timeline li.done .tdot{background:var(--ink);color:var(--mint)}
.timeline li.now .tdot{background:var(--mint);color:var(--mint-ink);box-shadow:0 0 0 4px #E2F8D9}
.timeline h3{font-size:.87rem} .timeline p{font-size:.79rem;color:var(--muted)}
.spin{width:14px;height:14px;border:2px solid rgba(23,63,18,.25);border-top-color:var(--mint-ink);border-radius:50%;animation:spin .8s linear infinite;display:inline-block}
.spin.dark{border-color:rgba(18,20,18,.15);border-top-color:var(--ink)}
@keyframes spin{to{transform:rotate(360deg)}}

/* Slots & upload */
.slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.slot{border:1px solid var(--line);border-radius:18px;padding:14px;text-align:left;background:#fff}
.slot:hover{border-color:#C5CAC3}
.slot[aria-pressed=true]{background:var(--mint);border-color:var(--mint);color:var(--mint-ink)}
.slot b{display:block;font:500 .95rem var(--mono);letter-spacing:-.02em} .slot span{font-size:.78rem;opacity:.75}
.drop{border:1.5px dashed #C3C8C1;border-radius:22px;padding:38px 20px;text-align:center;background:var(--surface-2)}
.drop.over{border-color:var(--ink);background:var(--mint)}
.field{display:grid;grid-template-columns:150px 1fr auto;gap:12px;align-items:center;padding:11px 0;border-top:1px solid var(--line-2);font-size:.87rem}
.field:first-child{border-top:0}
.field dt{color:var(--muted)}
.conf{font:500 .72rem var(--mono);color:var(--ok);background:var(--ok-soft);border-radius:99px;padding:2px 9px;white-space:nowrap;justify-self:end}
.conf.low{color:var(--warn);background:var(--warn-soft)}
.check{display:flex;gap:10px;align-items:flex-start;padding:11px 0;border-top:1px solid var(--line-2);font-size:.87rem}
.check:first-of-type{border-top:0}
.check .ci{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;flex:none;font-weight:700;font-size:.75rem}
.check .ci svg{width:11px;height:11px}
.ci.ok{background:var(--ink);color:var(--mint)} .ci.bad{background:var(--bad);color:#fff} .ci.warn{background:#F2B33D;color:#3B2700}
.check p{font-size:.79rem;color:var(--muted);margin-top:2px}

/* Tables */
.table-wrap{overflow-x:auto;margin:0 -22px;padding:0 22px}
table{width:100%;border-collapse:collapse;font-size:.86rem}
th{text-align:left;font-size:.74rem;font-weight:500;color:var(--muted);padding:10px 10px;border-bottom:1px solid var(--line-2)}
td{padding:12px 10px;border-bottom:1px solid var(--line-2);vertical-align:middle}
tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--surface-2)}
.person{display:flex;gap:10px;align-items:center}
.person .avatar{width:32px;height:32px;font-size:.72rem;background:var(--surface-3);color:var(--ink-2)}
.kpi{position:relative}
.kpi b{display:block;font:500 2.1rem/1.1 var(--mono);letter-spacing:-.05em;margin-top:10px}
.kpi p{font-size:.79rem;color:var(--muted);margin-top:6px}
.kpi.mint{background:var(--mint);color:var(--mint-ink)} .kpi.mint p,.kpi.mint .eyebrow{color:var(--mint-ink);opacity:.75}
.kpi.dark{background:var(--ink);color:#fff} .kpi.dark p,.kpi.dark .eyebrow{color:#fff;opacity:.6}
.kpi.lav{background:var(--lav);color:var(--lav-ink)} .kpi.lav p,.kpi.lav .eyebrow{color:var(--lav-ink);opacity:.75}
.filters{display:flex;gap:6px;flex-wrap:wrap}
.filters button{border:1px solid var(--line);background:#fff;border-radius:99px;padding:6px 13px;font-size:.8rem;font-weight:500;color:var(--ink-2)}
.filters button[aria-pressed=true]{background:var(--ink);border-color:var(--ink);color:#fff}
.mlist{display:none}
.mcard{border-radius:18px;padding:14px;background:var(--surface-2)}
.mcard + .mcard{margin-top:10px}

/* Spec */
.spec h2{margin-bottom:10px}
.spec p,.spec li{color:var(--ink-2);font-size:.9rem}
.spec ul{padding-left:20px;margin:6px 0 0} .spec li{margin-bottom:5px}
.story{border-radius:22px;overflow:hidden;background:#fff}
.story + .story{margin-top:14px}
.story-head{padding:15px 20px;border-bottom:1px solid var(--line-2);display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
.story-body{padding:16px 20px 18px}
.story-body blockquote{margin:0 0 14px;font-size:.95rem;color:var(--mint-ink);background:var(--mint);border-radius:16px;padding:13px 16px}
.ac{list-style:none;padding:0;margin:0}
.ac li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:start;padding:10px 0;border-top:1px solid var(--line-2);font-size:.86rem;color:var(--ink-2)}
.ac li:first-child{border-top:0}
.ac .acid{font:600 .74rem var(--mono);color:var(--ink);background:var(--surface-3);border-radius:99px;padding:1px 8px}
.ac em{font-style:normal;font-weight:600;color:var(--ink)}
.ticket{border-radius:22px;font-size:.86rem;background:#fff}
.ticket-head{display:flex;gap:10px;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line-2);flex-wrap:wrap}
.ticket-key{font:600 .86rem var(--mono);color:var(--lav-ink);background:var(--lav);border-radius:99px;padding:2px 10px}
.ticket-body{padding:16px 18px;display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:22px}
.ticket-body h4{font-size:.74rem;font-weight:500;color:var(--muted);margin:14px 0 4px}
.ticket-body h4:first-child{margin-top:0}
.persona{display:flex;gap:12px;align-items:flex-start}
.persona .avatar{width:42px;height:42px}
.tabs{display:inline-flex;gap:4px;margin-bottom:20px;overflow-x:auto;background:var(--surface);border-radius:999px;padding:4px;max-width:100%}
.tabs button{background:none;border:0;border-radius:999px;padding:8px 15px;font-weight:500;font-size:.85rem;color:var(--ink-2);white-space:nowrap}
.tabs button[aria-selected=true]{background:var(--ink);color:#fff}

/* Modal + toast */
.scrim{position:fixed;inset:0;background:rgba(18,20,18,.35);backdrop-filter:blur(3px);display:grid;place-items:center;padding:16px;z-index:50;animation:fade .15s ease}
.modal{background:#fff;border-radius:26px;max-width:540px;width:100%;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.18);max-height:90vh;overflow:auto}
.modal h2{margin-bottom:6px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;padding:11px 18px;border-radius:999px;font-size:.86rem;box-shadow:0 10px 30px rgba(0,0,0,.18);z-index:60;animation:rise .2s ease;max-width:calc(100% - 32px)}
@keyframes fade{from{opacity:0}} @keyframes rise{from{opacity:0;transform:translate(-50%,8px)}}
.view{animation:viewin .22s ease}
@keyframes viewin{from{opacity:0;transform:translateY(4px)}}
textarea{width:100%;font:inherit;font-size:.88rem;border:1px solid var(--line);border-radius:16px;padding:12px;min-height:230px;resize:vertical;color:var(--ink);background:var(--surface-2)}

/* Responsive */
@media (max-width:1180px){.tiles{grid-template-columns:repeat(2,minmax(0,1fr))}.tiles .tile.dark{grid-column:1/-1;min-height:0}}
@media (max-width:1080px){.grid-main{grid-template-columns:1fr}}
@media (max-width:860px){
  .app{grid-template-columns:1fr}
  .side{display:none}
  .topbar{display:flex;position:sticky;top:0;z-index:20;background:rgba(236,238,233,.92);backdrop-filter:blur(10px);color:var(--ink);padding:10px 16px;align-items:center;justify-content:space-between;gap:10px}
  .topbar .logo{font-size:1rem;padding:0} .topbar .logo-mark{width:28px;height:28px}
  .topbar .role{grid-template-columns:repeat(3,auto);background:#fff}
  .topbar .role button{padding:6px 10px;font-size:.74rem}
  main{padding:14px 16px 100px}
  .tabbar{display:flex;position:fixed;bottom:10px;left:10px;right:10px;z-index:20;background:#fff;border-radius:22px;box-shadow:0 8px 30px rgba(18,20,18,.12);padding:6px 6px calc(6px + env(safe-area-inset-bottom));justify-content:space-around}
  .tabbar button{background:none;border:0;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:.66rem;font-weight:550;color:var(--muted);padding:5px 8px;border-radius:14px;min-width:56px;position:relative}
  .tabbar button svg{width:20px;height:20px}
  .tabbar button[aria-current=page]{color:var(--ink);background:var(--surface-3)}
  .tabbar .badge{position:absolute;top:1px;right:9px;background:var(--mint);color:var(--mint-ink);border-radius:99px;font-size:.6rem;padding:0 5px}
  .toast{bottom:calc(92px + env(safe-area-inset-bottom));width:90%;text-align:center;border-radius:18px}
  .tiles{grid-template-columns:1fr}
  .tile{min-height:0}
  .grid2,.grid3{grid-template-columns:1fr}
  .kpis{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .course-hero{grid-template-columns:1fr}
  .slots{grid-template-columns:1fr}
  .field{grid-template-columns:110px 1fr}
  .field .conf{grid-column:2;justify-self:start}
  .ticket-body{grid-template-columns:1fr}
  .step{grid-template-columns:32px minmax(0,1fr)}
  .step > .btn,.step > .chip{grid-column:2;justify-self:start}
  .counts .chip{white-space:normal}
  .summary-strip b{font-size:1.1rem}
  .hide-m{display:none}
  .team-table{display:none}
  .mlist{display:block}
  .card{padding:18px}
  .table-wrap{margin:0 -18px;padding:0 18px}
  h1{font-size:1.65rem}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="app">
  <aside class="side" aria-label="Sidebar">
    <div class="logo"><span class="logo-mark" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 8-8"/><path d="m4 4 0 4 4 0"/><path d="m9 12 2 2 4-4"/></svg></span><span>Rounds<small>License &amp; CE renewal</small></span></div>
    <div><div class="eyebrow" style="color:#7e9ca2;margin-bottom:6px">Viewing as</div><div class="role" role="group" aria-label="Choose view" data-role-switch></div></div>
    <nav class="navlist" aria-label="Main" id="sidenav"></nav>
    <div class="side-foot">
      <div class="who" id="whoBox"></div>
      <p style="margin-top:12px">Concept prototype by Anthony Malon, built with Claude Code.</p>
      <button type="button" data-action="reset">Reset demo</button>
    </div>
  </aside>
  <div class="mainwrap">
    <header class="topbar">
      <div class="logo"><span class="logo-mark" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 8-8"/><path d="m4 4 0 4 4 0"/><path d="m9 12 2 2 4-4"/></svg></span>Rounds</div>
      <div class="role" role="group" aria-label="Choose view" data-role-switch></div>
    </header>
    <main id="main" tabindex="-1"></main>
  </div>
</div>
<nav class="tabbar" aria-label="Main" id="tabbar"></nav>
<div id="layer"></div>

<script>
/* ---------- Icons ---------- */
const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 19v3H6.5"/></svg>',
  cert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m0 0-4 4m4-4 4 4"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/></svg>',
  team:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  lock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  arrowUR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  route:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ext:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  back:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6 6-6-6 6-6"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z"/></svg>'
};

/* ---------- Dates ---------- */
const DAY = 864e5;
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const D = s => new Date(s + 'T00:00:00');
const daysTo = s => Math.round((D(s) - today()) / DAY);
const fmt = (d, o={day:'numeric',month:'short',year:'numeric'}) => (typeof d === 'string' ? D(d) : d).toLocaleDateString('en-US', o);
const iso = d => d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
const addDays = n => { const d = today(); d.setDate(d.getDate()+n); return d; };

/* ---------- Rules (simplified from official board pages) ---------- */
const FL = {
  code:'FL', name:'Florida', license:'RN · Multistate (Compact)', expires:'2027-04-30', total:24, system:'CE Broker',
  reqs:[
    {key:'general', label:'General hours', need:16, note:'From a provider accredited by a state or national nursing CE body'},
    {key:'medErrors', label:'Prevention of Medical Errors', short:'Medical Errors', need:2, note:'Board-approved provider · required every renewal'},
    {key:'laws', label:'Florida Laws & Rules', short:'Laws & Rules', need:2, note:'Board-approved provider'},
    {key:'impairment', label:'Recognizing Impairment in the Workplace', short:'Impairment', need:2, note:'Required every other renewal · due this cycle'},
    {key:'trafficking', label:'Human Trafficking', short:'Human Trafficking', need:2, note:'Board approval not required for this topic'}
  ],
  info:[
    {label:'Domestic Violence (2 h)', note:'Every third renewal · not due this cycle'},
    {label:'HIV/AIDS (1 h)', note:'One-time · completed before first renewal'}
  ]
};
const CA = { code:'CA', name:'California', license:'RN · Single-state', expires:'2027-08-31', total:30,
  note:'Any course from a provider with a California BRN provider number (CEP) counts.',
  info:[{label:'Implicit bias (1 h)', note:'Applies to newly licensed RNs · not required for Jordan'}]
};

/* ---------- Catalog ---------- */
const PROV = {
  rounds:{name:'Rounds Learning', fl:'FL Board provider #50-31088 (sample)', ca:'CA BRN CEP #18245 (sample)', ancc:'ANCC-accredited provider (sample)'},
  brightwater:{name:'Brightwater Nursing Education', fl:'FL Board provider #50-10482 (sample)', ca:'CA BRN CEP #17730 (sample)'},
  harbor:{name:'Harbor Health Learning', fl:'FL Board provider #50-22917 (sample)', ca:null},
  meridian:{name:'Meridian Clinical Institute', fl:'Accredited (national body) (sample)', ca:'CA BRN CEP #16204 (sample)'}
};
const COURSES = {
  'med-errors':{title:'Prevention of Medical Errors', hours:2, kind:'module', prov:'rounds', fl:'medErrors', ca:true, minutes:120,
    blurb:'Root-cause analysis, error reduction and patient safety, built around real ward situations.'},
  'impairment':{title:'Recognizing Impairment in the Workplace', hours:2, kind:'module', prov:'rounds', fl:'impairment', ca:true, minutes:120,
    blurb:'Signs of substance-use impairment in colleagues, how to respond and how to report safely.'},
  'high-alert':{title:'High-Alert Medications: Insulin, Heparin, Opioids', hours:4, kind:'module', prov:'rounds', fl:'general', ca:true, minutes:240,
    blurb:'Independent double checks, smart-pump limits and reversal agents.'},
  'delirium':{title:'Delirium Prevention in Hospitalized Older Adults', hours:4, kind:'module', prov:'rounds', fl:'general', ca:true, minutes:240,
    blurb:'Screening with CAM, non-drug prevention bundles and family involvement.'},
  'handoff':{title:'Safer Handoffs with SBAR', hours:2, kind:'module', prov:'rounds', fl:'general', ca:true, minutes:120,
    blurb:'Structured bedside handoff and closed-loop communication.'},
  'fl-dv':{title:'Domestic Violence for Florida Nurses', hours:2, kind:'module', prov:'rounds', fl:'dv', ca:true, minutes:120,
    blurb:'Required every third Florida renewal. Not due for you this cycle.'},
  'bls':{title:'BLS Provider Renewal (blended)', hours:0, kind:'blended', prov:null, minutes:0,
    blurb:'Online part with the training center, then a hands-on skills check. Employer requirement.'}
};

/* ---------- Seed state ---------- */
const SEED = () => ({
  role:'nurse',
  certs:[
    {id:'c1', title:'Sepsis Recognition and Early Management', hours:3, prov:'Rounds Learning', date:'2025-06-12', fl:'general', ca:true, src:'platform'},
    {id:'c2', title:'Nursing Laws and Rules in Florida', hours:2, prov:'Harbor Health Learning', date:'2025-08-03', fl:'laws', ca:false, src:'external'},
    {id:'c3', title:'Human Trafficking: Recognize and Respond', hours:2, prov:'Harbor Health Learning', date:'2025-08-03', fl:'trafficking', ca:false, src:'external'},
    {id:'c4', title:'Pain Management in Older Adults', hours:4, prov:'Rounds Learning', date:'2025-11-20', fl:'general', ca:true, src:'platform'},
    {id:'c5', title:'Acute Stroke Care: Door to Needle', hours:2, prov:'Rounds Learning', date:'2026-02-09', fl:'general', ca:true, src:'platform'},
    {id:'c6', title:'Wound Care Essentials', hours:6, prov:'Rounds Learning', date:'2026-04-17', fl:'general', ca:true, src:'platform'},
    {id:'c7', title:'Cardiac Rhythm Interpretation', hours:3, prov:'Rounds Learning', date:'2026-07-22', fl:'general', ca:true, src:'platform'}
  ],
  progress:{}, // courseId -> {sections:[], passed:bool}
  bls:{stage:0, slot:null}, // 0 online not started, 1 online done, 2 booked, 3 card issued
  upload:{stage:0, decision:null},
  reminded:{},
  uploadNotice:true
});
let S;
const KEY = 'rounds-demo-v3';
try { S = JSON.parse(localStorage.getItem(KEY)) || SEED(); } catch(e) { S = SEED(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} };

/* ---------- Compliance engine ---------- */
function flStatus(){
  const have = {general:0, medErrors:0, laws:0, impairment:0, trafficking:0};
  S.certs.forEach(c => { if (c.fl && have[c.fl] !== undefined) have[c.fl] += c.hours; });
  const reqs = FL.reqs.map(r => ({...r, have:Math.min(have[r.key], r.need), raw:have[r.key]}));
  const done = reqs.reduce((a,r) => a + r.have, 0);
  const missing = reqs.filter(r => r.have < r.need);
  const rawTotal = S.certs.filter(c => c.fl).reduce((a,c) => a + c.hours, 0);
  return {reqs, done, total:FL.total, missing, complete:!missing.length, rawTotal, days:daysTo(FL.expires)};
}
function caStatus(){
  const raw = S.certs.filter(c => c.ca).reduce((a,c) => a + c.hours, 0);
  const done = Math.min(raw, CA.total);
  return {done, total:CA.total, left:CA.total - done, complete:done >= CA.total, days:daysTo(CA.expires)};
}
const completedIds = () => S.certs.map(c => c.course).filter(Boolean);
function shortestPath(){
  // 1) close Florida mandatory gaps with courses that also count for California
  // 2) close the California gap with the fewest, largest courses
  const fl = flStatus(); const plan = []; let caLeft = caStatus().left;
  const pool = Object.entries(COURSES).filter(([id,c]) => c.kind === 'module' && !completedIds().includes(id));
  fl.missing.filter(r => r.key !== 'general').forEach(r => {
    const opts = pool.filter(([,c]) => c.fl === r.key).sort((a,b) => (b[1].ca - a[1].ca));
    if (opts[0] && !plan.find(p => p[0] === opts[0][0])) { plan.push(opts[0]); if (opts[0][1].ca) caLeft -= opts[0][1].hours; }
  });
  let flGeneralLeft = (fl.reqs.find(r => r.key === 'general') || {}).need - (fl.reqs.find(r => r.key === 'general') || {}).have;
  const rest = pool.filter(([id,c]) => !plan.find(p => p[0] === id) && c.fl !== 'dv' && (c.ca || c.fl === 'general')).sort((a,b) => b[1].hours - a[1].hours);
  for (const p of rest) {
    if (caLeft <= 0 && flGeneralLeft <= 0) break;
    plan.push(p); if (p[1].ca) caLeft -= p[1].hours; if (p[1].fl === 'general') flGeneralLeft -= p[1].hours;
  }
  const hours = plan.reduce((a,p) => a + p[1].hours, 0);
  return {plan, hours};
}
function countsFor(c){
  const out = [];
  if (c.fl) {
    const r = FL.reqs.find(r => r.key === c.fl);
    out.push(r ? (c.fl === 'general' ? 'Florida · general' : 'Florida · ' + (r.short || r.label)) : (c.fl === 'dv' ? 'Florida · Domestic Violence' : 'Florida'));
  }
  if (c.ca) out.push('California');
  return out;
}

/* ---------- Team (made-up) ---------- */
const TEAM = [
  {n:'Jordan Reyes', i:'JR', lic:'FL (multistate) + CA', dl:'2027-04-30', bls:'2027-01-31', self:true},
  {n:'Priya Natarajan', i:'PN', lic:'FL (multistate)', dl:'2027-04-30', st:'blocked', why:'Missing Prevention of Medical Errors (2 h)', bls:'2027-09-30'},
  {n:'Marcus Bell', i:'MB', lic:'FL (multistate)', dl:'2027-04-30', st:'ok', why:'All requirements met', bls:'2028-03-31'},
  {n:'Elena Petrova', i:'EP', lic:'FL (multistate)', dl:'2027-04-30', st:'risk', why:'8 general hours left', bls:'2026-12-31'},
  {n:'Samuel Okafor', i:'SO', lic:'FL (multistate) + GA', dl:'2027-04-30', st:'risk', why:'Impairment course due this cycle', bls:'2027-06-30'},
  {n:'Hannah Kim', i:'HK', lic:'FL (multistate)', dl:'2027-04-30', st:'ok', why:'All requirements met', bls:'2027-11-30'},
  {n:'Diego Alvarez', i:'DA', lic:'FL (multistate)', dl:'2027-04-30', st:'blocked', why:'Human Trafficking + Laws & Rules missing', bls:'2027-02-28'},
  {n:'Aisha Rahman', i:'AR', lic:'FL (multistate)', dl:'2027-04-30', st:'ok', why:'All requirements met', bls:'2027-08-31'},
  {n:'Tom Whitaker', i:'TW', lic:'FL (multistate) + CA', dl:'2027-04-30', st:'risk', why:'California: 14 hours left', bls:'2027-05-31'},
  {n:'Grace Liu', i:'GL', lic:'FL (multistate)', dl:'2027-04-30', st:'ok', why:'All requirements met', bls:'2027-04-30'},
  {n:'Noah Brennan', i:'NB', lic:'FL (multistate)', dl:'2027-04-30', st:'risk', why:'Certificate under review (external)', bls:'2028-01-31'},
  {n:'Fatou Diallo', i:'FD', lic:'FL (multistate)', dl:'2027-04-30', st:'ok', why:'All requirements met', bls:'2027-10-31'}
];
function jordanTeamRow(){
  const fl = flStatus(), ca = caStatus();
  let st = 'ok', why = 'All requirements met';
  const flMand = fl.missing.filter(r => r.key !== 'general');
  if (flMand.length) { st = 'blocked'; why = 'Missing ' + flMand.map(r => r.label).join(' + '); }
  else if (!ca.complete) { st = 'risk'; why = 'California: ' + ca.left + ' hours left'; }
  return {st, why};
}
const ST = {ok:['ok','On track'], risk:['warn','At risk'], blocked:['bad','Blocked'], overdue:['bad','Overdue']};

/* ---------- Router ---------- */
const NAV = {
  nurse:[['home','Home',I.home],['courses','Courses',I.book],['certs','Certificates',I.cert],['bls','Credentials',I.heart],['upload','Add certificate',I.upload]],
  manager:[['team','Team compliance',I.team]],
  spec:[['spec','Product spec',I.doc]]
};
const ROLE_HOME = {nurse:'home', manager:'team', spec:'spec'};
function route(){ const h = location.hash.replace(/^#\/?/, '') || ROLE_HOME[S.role]; return h.split('/'); }
function go(path){ location.hash = '#/' + path; }
function roleOf(page){ if (page === 'team') return 'manager'; if (page === 'spec') return 'spec'; return 'nurse'; }

function renderChrome(page){
  S.role = roleOf(page); save();
  document.querySelectorAll('[data-role-switch]').forEach(el => {
    el.innerHTML = [['nurse','Nurse'],['manager','Manager'],['spec','Spec']].map(([k,l]) =>
      `<button type="button" data-role="${k}" aria-pressed="${S.role===k}">${l}</button>`).join('');
  });
  const pending = S.upload.stage === 0 && S.uploadNotice ? 1 : 0;
  const items = NAV[S.role];
  const cur = p => (p === page || (page === 'course' && p === 'courses') || (page === 'learn' && p === 'courses') || (page === 'test' && p === 'courses') || (page === 'done' && p === 'courses') || (page === 'eval' && p === 'courses')) ? 'page' : 'false';
  document.getElementById('sidenav').innerHTML = items.map(([p,l,ic]) =>
    `<button type="button" data-go="${p}" aria-current="${cur(p)}">${ic}<span>${l}</span>${p==='upload'&&pending?'<span class="badge">1</span>':''}</button>`).join('');
  const tb = document.getElementById('tabbar');
  tb.style.display = '';
  tb.innerHTML = items.length > 1 ? items.map(([p,l,ic]) =>
    `<button type="button" data-go="${p}" aria-current="${cur(p)}">${ic}<span>${l.replace('Add certificate','Add')}</span>${p==='upload'&&pending?'<span class="badge">1</span>':''}</button>`).join('') : '';
  if (items.length <= 1) tb.style.display = 'none';
  document.getElementById('whoBox').innerHTML = S.role === 'manager'
    ? '<span class="avatar" style="background:#e6eefa;color:#2d5fa8">CM</span><div><b>Carla Mendes</b><span>Nurse Manager · 4 West Med-Surg</span></div>'
    : '<span class="avatar">JR</span><div><b>Jordan Reyes, RN</b><span>Travel nurse · FL + CA licenses</span></div>';
}

function render(){
  closeModal();
  const [page, a, b] = route();
  renderChrome(page);
  const views = {home, courses, course, learn, test, eval: evaluation, done, certs, bls, upload, team, spec};
  const v = views[page] || home;
  const main = document.getElementById('main');
  main.innerHTML = `<div class="view">${v(a, b)}</div>`;
  window.scrollTo(0, 0);
  if (render.focus) { main.focus({preventScroll:true}); }
  render.focus = true;
  if (v.after) v.after(a, b);
}

/* ---------- Helpers ---------- */
function ring(done, total, size=96, stroke=9){
  const r = (size - stroke)/2, c = 2*Math.PI*r, pct = Math.min(1, done/total);
  const col = pct >= 1 ? 'var(--ok)' : 'var(--brand)';
  return `<div class="ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}" aria-hidden="true">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line-2)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}" style="transition:stroke-dashoffset .6s ease"/></svg>
    <div class="lbl"><div><b class="num">${done}</b><span>/ ${total} h</span></div></div></div>`;
}
const chip = (cls, txt) => `<span class="chip ${cls}">${txt}</span>`;
const bar = (have, need) => `<div class="bar"><i class="${have>=need?'full':''}" style="width:${Math.min(100, have/need*100)}%"></i></div>`;
function toast(msg){ const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role','status'); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
function modal(html){ const l = document.getElementById('layer'); l.innerHTML = `<div class="scrim" data-close><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`; const f = l.querySelector('button,textarea'); if (f) f.focus(); }
function closeModal(){ document.getElementById('layer').innerHTML = ''; }
function addCert(c){ S.certs.push(c); save(); }
function provChips(p){ const P = PROV[p]; if (!P) return ''; return `${chip('brand', 'Florida approved')}${P.ca ? chip('brand', 'California CEP') : chip('plain', 'No California CEP')}`; }

/* ---------- Views: Nurse ---------- */
function gauge(done, total, id){
  const pct = Math.min(100, Math.round(done/total*100));
  return `<div class="gauge"><svg viewBox="0 0 220 124" aria-hidden="true">
    <defs><pattern id="h-${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="rgba(255,255,255,.35)"/><line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/></pattern></defs>
    <path d="M22 112 A88 88 0 0 1 198 112" fill="none" stroke="url(#h-${id})" stroke-width="22" stroke-linecap="round"/>
    <path d="M22 112 A88 88 0 0 1 198 112" fill="none" stroke="#121412" stroke-width="22" stroke-linecap="round" pathLength="100" stroke-dasharray="${pct} 100" style="transition:stroke-dasharray .6s ease"/></svg>
    <div class="g-lbl"><b>${done}</b><span>/${total} h</span></div></div>`;
}
function licTile(st, done, total, days, complete, cls){
  return `<section class="tile ${cls}" aria-label="${st.name} license">
    <div class="tile-head"><span class="disc">${st.code}</span><div><h2>${st.name}</h2><p>${st.license}</p></div>
      <button class="arrow-btn" data-action="scroll" data-target="req-${st.code}" aria-label="See ${st.name} requirements">${I.arrowUR}</button></div>
    ${gauge(done, total, st.code)}
    <div class="tile-foot"><div><span>Renew by</span><b>${fmt(st.expires,{month:'short',day:'numeric',year:'numeric'})}</b></div><span class="pill-dark">${complete ? 'Ready' : days + ' days'}</span></div></section>`;
}
function home(){
  const fl = flStatus(), ca = caStatus(), sp = shortestPath();
  const blsDays = daysTo(S.bls.stage === 3 ? iso(new Date(today().getFullYear()+2, today().getMonth()+1, 0)) : '2027-01-31');
  const flMand = fl.missing.filter(r => r.key !== 'general');
  const insight = (fl.reqs[0].raw > fl.reqs[0].need && flMand.length)
    ? `<div class="callout warn" style="margin-top:14px">${I.alert}<div><b>Enough Florida hours, but not the right ones.</b> Your general hours are full (${fl.reqs[0].raw} done, ${fl.reqs[0].need} needed), but extra general hours don't replace required topics. You still need ${flMand.map(r => r.label).join(' and ')}.</div></div>` : '';
  const alerts = [];
  if (S.upload.stage === 0 && S.uploadNotice) alerts.push(['warn', I.upload, 'A certificate from a conference is waiting', 'Add it so we can check which license it counts for.', 'upload', 'Add certificate']);
  if (S.upload.decision === 'fl-only') alerts.push(['info', I.info, 'Antimicrobial Stewardship counted for Florida only', 'No California provider number on the certificate.', 'certs', 'View']);
  if (S.bls.stage < 3) alerts.push([blsDays < 90 ? 'bad' : 'warn', I.heart, `BLS card expires in ${blsDays} days`, S.bls.stage === 2 ? 'Skills check booked. Waiting for the instructor to confirm.' : 'Your employer requires a valid card to work shifts.', 'bls', S.bls.stage === 0 ? 'Start renewal' : 'Continue']);
  else alerts.push(['ok', I.heart, 'BLS card renewed', 'Your manager can see the new expiry date.', 'bls', 'View']);
  alerts.push(['info', I.doc, 'Florida audits licensees at random', 'Keep certificates for each cycle. Your audit pack is always ready.', 'certs', 'Audit pack']);
  const next = sp.plan[0];
  const pathTile = `<section class="tile dark" aria-label="Shortest path">
    <div class="tile-head"><span class="disc">${I.route}</span><div><h2>Shortest path</h2><p>Counts toward both licenses where possible</p></div></div>
    ${sp.plan.length ? `<div class="big">${sp.plan.length}<small>courses · ${sp.hours} h</small></div>
    <div class="mini"><div><span><i style="background:var(--mint)"></i>Florida topics missing</span><b>${flMand.length}</b></div><div><span><i style="background:var(--lav)"></i>California hours left</span><b>${ca.left} h</b></div></div>
    <button class="btn mint" style="margin-top:auto;align-self:flex-start" data-go="course/${next[0]}">Start next: ${next[1].title.length > 26 ? next[1].title.slice(0,24) + '…' : next[1].title} ${I.arrow}</button>`
    : `<div class="big">0<small>courses left</small></div><p style="opacity:.7;font-size:.86rem">Both licenses meet the requirements. Renew on the board websites before each deadline.</p>`}
  </section>`;

  return `
  <div class="pagehead"><div><div class="eyebrow">${fmt(today(),{weekday:'long',month:'long',day:'numeric'})}</div><h1>Good to see you, Jordan</h1>
    <p>${fl.complete && ca.complete ? 'Both licenses are ready to renew. Nice work.' : `Two renewals on track. Here's the shortest way to finish both.`}</p></div>
    <button class="btn ghost" data-go="upload">${I.upload}Add a certificate</button></div>

  <div class="tiles">
    ${licTile(FL, fl.done, fl.total, fl.days, fl.complete, 'mint')}
    ${licTile(CA, ca.done, ca.total, ca.days, ca.complete, 'lav')}
    ${pathTile}
  </div>
  ${insight}

  <div class="grid-main" style="margin-top:14px">
    <section class="card" aria-labelledby="pathH">
      <div class="row between wrap" style="margin-bottom:10px"><div><h2 id="pathH">Your courses, in order</h2><p class="small muted" style="margin-top:2px">Required topics first, then the courses that close both gaps fastest.</p></div>
      ${sp.plan.length ? chip('mint', `${sp.plan.length} courses · ${sp.hours} h`) : chip('ok','Complete')}</div>
      ${sp.plan.length ? `<div class="path">${sp.plan.map(([id,c],i) => `
        <div class="step"><span class="n">${i+1}</span>
          <div><h3>${c.title}</h3><p>${c.hours} h · ${PROV[c.prov].name} · self-paced</p>
          <div class="counts">${countsFor(c).map(x => chip(x.startsWith('California') ? 'lav' : 'mint', x)).join('')}</div></div>
          <button class="btn sm ${i ? 'ghost' : ''}" data-go="course/${id}">${S.progress[id] && S.progress[id].sections && S.progress[id].sections.length ? 'Continue' : 'Start'}</button></div>`).join('')}</div>`
      : `<div class="callout ok">${I.check}<div><b>Nothing left to do.</b> Both licenses meet the requirements.</div></div>`}
    </section>
    <aside class="card" aria-labelledby="alH"><h2 id="alH" style="margin-bottom:12px">Needs your attention</h2>
      ${alerts.map(([cls,ic,t,p,to,btn]) => `<div class="alert"><span class="dot ${cls}">${ic}</span><div style="flex:1"><h3>${t}</h3><p>${p}</p><button class="link small" style="margin-top:6px" data-go="${to}">${btn}</button></div></div>`).join('')}
    </aside>
  </div>

  <div class="grid2" style="margin-top:14px;align-items:start">
    ${reqCard(FL, fl.reqs.map(r => reqRow(r.label, r.raw, r.need, r.note)).join('') + FL.info.map(x => naRow(x.label, x.note)).join(''), 'Hours are reported to CE Broker, the state tracking system.', '')}
    ${reqCard(CA, reqRow('Contact hours from a CEP provider', ca.done, ca.total, CA.note) + CA.info.map(x => naRow(x.label, x.note)).join(''), 'California has no tracking system: keep certificates in case of audit.', 'lav')}
  </div>`;
}
function reqCard(st, rows, foot, cls){
  return `<section class="card" id="req-${st.code}" aria-label="${st.name} requirements">
    <div class="lic-head"><div class="lic-state"><span class="state-badge ${cls}">${st.code}</span><div><h2>${st.name} requirements</h2><div class="small muted">${st.license}</div></div></div></div>
    <div class="reqlist">${rows}</div>
    <p class="tiny muted" style="margin-top:10px">${foot}</p></section>`;
}
function reqRow(label, have, need, note){
  const ok = have >= need;
  return `<div class="req"><span class="ico ${ok?'ok':'todo'}">${ok?I.check:''}</span><div>${label}<small>${note}</small>${need > 2 ? bar(have,need) : ''}</div><span class="num ${ok?'':'muted'}">${have}/${need} h</span></div>`;
}
function naRow(label, note){ return `<div class="req"><span class="ico na">–</span><div class="muted">${label}<small>${note}</small></div><span></span></div>`; }

function courses(){
  const done = completedIds();
  const list = Object.entries(COURSES);
  return `<div class="pagehead"><div><div class="eyebrow">Catalog</div><h1>Courses</h1><p>Every course shows which license and requirement it counts toward before you start, so no hours are wasted.</p></div></div>
  <div class="grid2">${list.map(([id,c]) => {
    const isDone = done.includes(id) || (id === 'bls' && S.bls.stage === 3);
    const type = c.kind === 'blended' ? 'Blended · online + hands-on' : 'Self-paced module';
    return `<article class="card" style="display:flex;flex-direction:column;gap:10px">
      <div class="row between"><span class="type-tag">${c.kind==='blended'?I.heart.replace('<svg','<svg width="14" height="14"'):I.book.replace('<svg','<svg width="14" height="14"')} ${type}</span>${isDone?chip('ok','Completed'):c.fl==='dv'?chip('plain','Not due'):''}</div>
      <h2>${c.title}</h2><p class="small muted">${c.blurb}</p>
      <div class="counts">${c.kind==='blended' ? chip('info','Employer credential · not license hours') : countsFor(c).map(x => chip('brand','Counts: '+x)).join('')}</div>
      <div class="row between" style="margin-top:auto;padding-top:6px"><span class="small muted">${c.hours ? c.hours + ' contact hours' : 'Card valid 2 years'}${c.prov ? ' · ' + PROV[c.prov].name : ''}</span>
      <button class="btn sm ${isDone?'ghost':''}" data-go="${id==='bls'?'bls':'course/'+id}">${isDone?'View':'Open'}</button></div></article>`;}).join('')}</div>`;
}

/* --- Course detail --- */
const MODULE = {
  sections:[
    {t:'Why errors happen', min:25, body:`
      <p>Most harm doesn't come from careless people. It comes from systems that make the wrong action easy. The "Swiss cheese" model describes how several small gaps line up: a look-alike label, a busy shift, an interrupted check.</p>
      <p>Florida requires this course to cover <b>root-cause analysis, error reduction and prevention, and patient safety</b>. A root-cause analysis asks what in the process allowed the error, not who to blame.</p>
      <div class="case"><b>On the ward</b>A patient receives a double dose of enoxaparin. The day nurse gave it at 09:00; the order set also scheduled it at 10:00 after a transfer. The root cause is the duplicated order, not the second nurse.</div>
      <ul><li>Look for the process gap first.</li><li>Fix the system: order sets, storage, alerts.</li><li>Share the learning across units.</li></ul>`},
    {t:'Medication safety', min:35, body:`
      <p>Medication errors are among the most common preventable harms in hospitals. Three habits prevent most of them.</p>
      <ul><li><b>Look-alike, sound-alike drugs.</b> Store them apart and use tall-man lettering, for example hydrOXYzine and hydrALAZINE.</li>
      <li><b>High-alert medications</b> such as insulin, heparin and opioids need an independent double check by a second nurse.</li>
      <li><b>Scan at the bedside.</b> Barcode checks catch wrong-patient and wrong-dose errors before they reach the patient.</li></ul>
      <div class="case"><b>On the ward</b>Two vials with similar labels sit side by side in the dispensing cabinet. A reminder email won't fix this; moving one vial and adding tall-man labels will.</div>`},
    {t:'Wrong-site procedures', min:25, body:`
      <p>The Universal Protocol has three steps before any invasive procedure: <b>pre-procedure verification</b>, <b>site marking</b> by the person doing the procedure, and a <b>time-out</b> just before starting, where the whole team confirms patient, procedure and site.</p>
      <div class="case"><b>On the ward</b>During a bedside chest-tube insertion the physician starts prepping before the time-out. As the nurse, you can and should stop the procedure until the time-out is done.</div>`},
    {t:'Communication and reporting', min:35, body:`
      <p>Handoffs are where information gets lost. <b>SBAR</b> (Situation, Background, Assessment, Recommendation) gives every handoff the same structure, and closed-loop communication confirms each instruction was heard.</p>
      <p>A <b>just culture</b> separates honest mistakes from reckless behavior. Report near misses too: an error you caught today is the one that reaches a patient next month.</p>
      <div class="case"><b>On the ward</b>You notice a wrong dose before giving it. No harm occurred, but you report it as a near miss so pharmacy can fix the label that caused it.</div>`}
  ],
  quiz:[
    {s:'Hydroxyzine and hydralazine vials are stored side by side and were almost swapped twice this month.', q:'What is the most effective fix?',
      o:['Email staff to be more careful','Separate the storage and add tall-man lettering','Discipline the nurses involved','Add a second signature on every medication'], a:1,
      w:'Reminders and blame don\'t change the system. Separating storage and tall-man labels remove the trap.'},
    {s:'The team is about to start a bedside procedure. Site marked, consent signed.', q:'Which step must happen immediately before starting?',
      o:['Pre-procedure verification','A time-out with the whole team','Documenting the procedure note','Calling the charge nurse'], a:1,
      w:'The time-out is the final check, done just before the procedure starts.'},
    {s:'You catch a wrong insulin dose before giving it. The patient is unharmed.', q:'What should you do?',
      o:['Nothing, since no harm occurred','Tell a colleague informally','Report it as a near miss','Only document it in the patient\'s chart'], a:2,
      w:'Near-miss reports let the hospital fix the cause before harm occurs.'},
    {s:'You hand over a deteriorating patient using SBAR.', q:'What does the "R" ask you to give?',
      o:['Results of the last labs','Your recommendation or request','A risk score','The room number'], a:1,
      w:'R is your Recommendation: what you think should happen next.'},
    {s:'Your unit runs a root-cause analysis after a medication error.', q:'What is the main focus?',
      o:['Who made the error','The processes and systems that allowed it','How to discipline staff','Whether to inform the patient'], a:1,
      w:'Root-cause analysis looks at systems, not individual blame.'}
  ]
};
function prog(id){ return S.progress[id] || (S.progress[id] = {sections:[], passed:false}); }
function course(id){
  const c = COURSES[id]; if (!c) return courses();
  if (c.kind === 'blended') { go('bls'); return ''; }
  const P = PROV[c.prov], p = prog(id), isDone = completedIds().includes(id);
  const full = id === 'med-errors';
  const secs = full ? MODULE.sections : [{t:'Overview',min:30},{t:'Recognizing the signs',min:30},{t:'Responding and reporting',min:30},{t:'Case studies',min:30}];
  const next = secs.findIndex((s,i) => !p.sections.includes(i));
  return `<button class="btn quiet sm" data-go="courses">${I.back} All courses</button>
  <div class="card" style="margin-top:10px">
    <div class="course-hero"><div><span class="type-tag">${I.book.replace('<svg','<svg width="14" height="14"')} Self-paced module · post-test</span>
      <h1 style="margin-top:12px">${c.title}</h1><p class="muted" style="margin-top:6px;max-width:60ch">${c.blurb}</p>
      <div class="counts" style="margin-top:12px">${countsFor(c).map(x => chip(x.includes('·') && c.fl!=='general' ? 'warn':'brand','Counts: '+x)).join('')}</div></div>
      <div style="min-width:220px"><dl class="kv"><dt>Contact hours</dt><dd>${c.hours}.0</dd><dt>Provider</dt><dd>${P.name}</dd><dt>Accreditation</dt><dd>${P.ancc}</dd><dt>Florida</dt><dd>${P.fl}</dd><dt>California</dt><dd>${P.ca}</dd></dl></div></div>
  </div>
  ${courseDetails(id, c, P)}
  <div class="grid-main" style="margin-top:16px">
    <section class="card"><div class="row between" style="margin-bottom:6px"><h2>What you'll cover</h2><span class="small muted">${p.sections.length}/${secs.length} sections</span></div>
      <ul class="syllabus">${secs.map((s,i) => `<li class="${p.sections.includes(i)?'done':''}"><span class="sn">${p.sections.includes(i)?I.check.replace('<svg','<svg width="13" height="13"'):i+1}</span><div style="flex:1"><h3>${s.t}</h3><span class="small muted">${s.min} min</span></div>
        ${full && p.sections.includes(i) ? `<button class="link small" data-go="learn/${id}/${i}">Review</button>` : ''}</li>`).join('')}
        <li class="${p.passed?'done':''}"><span class="sn">${p.passed?I.check.replace('<svg','<svg width="13" height="13"'):(p.sections.length < secs.length ? I.lock : '5')}</span><div style="flex:1"><h3>Post-test · 5 case questions</h3><span class="small muted">${p.sections.length < secs.length ? 'Locked until all sections are complete' : 'Ready'}</span></div>
        ${full && p.sections.length >= secs.length && !isDone ? `<button class="btn sm" data-go="test/${id}">Start test</button>` : ''}</li></ul>
      ${!full && !isDone ? `<div class="callout info" style="margin-top:14px">${I.info}<div>This module follows the same flow as <button class="link" data-go="course/med-errors">Prevention of Medical Errors</button> (sections, then a case-based test). To keep the demo short, you can complete it in one click.</div></div>
        <button class="btn" style="margin-top:12px" data-action="quick-complete" data-id="${id}">Complete module (demo shortcut)</button>` : ''}
      ${full && !isDone && next >= 0 ? `<button class="btn" style="margin-top:14px" data-go="learn/${id}/${next}">${p.sections.length ? 'Continue' : 'Start course'} ${I.arrow}</button>` : ''}
      ${isDone ? `<div class="callout ok" style="margin-top:14px">${I.check}<div><b>Completed.</b> Certificate issued and hours counted. <button class="link" data-go="done/${id}">See certificate</button></div></div>` : ''}
    </section>
    <aside class="card"><h2 style="margin-bottom:10px">Why this course</h2>
      <p class="small" style="color:var(--ink-2)">${c.fl && c.fl !== 'general' ? `Florida requires <b>${FL.reqs.find(r=>r.key===c.fl)?.label || 'this topic'}</b> from a board-approved provider. ` : ''}${c.ca ? `${P.name} also holds a California provider number (CEP), so the same hours count toward your California renewal.` : 'No California provider number, so it counts for Florida only.'}</p>
      <div class="divider"></div><h3 style="margin-bottom:6px">After you pass</h3>
      <ul class="small" style="padding-left:18px;margin:0;color:var(--ink-2)"><li>Short course evaluation</li><li>Certificate issued by Rounds Learning</li><li>Reported to CE Broker for Florida</li><li>Saved to your audit pack for California</li></ul></aside>
  </div>`;
}
function learn(id, i){
  i = +i; const s = MODULE.sections[i]; if (!s) { go('course/'+id); return ''; }
  return `<button class="btn quiet sm" data-go="course/${id}">${I.back} Course overview</button>
  <article class="card reader" style="margin-top:10px"><div class="row between wrap"><div class="eyebrow">Section ${i+1} of ${MODULE.sections.length} · ${s.min} min</div><div class="progress-dots" aria-label="Section ${i+1} of 4">${MODULE.sections.map((_,k) => `<i class="${k<=i?'on':''}"></i>`).join('')}</div></div><h2 style="margin-top:6px">${s.t}</h2>${s.body}
    <div class="row between" style="margin-top:20px">${i>0?`<button class="btn ghost" data-go="learn/${id}/${i-1}">${I.back} Previous</button>`:'<span></span>'}
    <button class="btn" data-action="section-done" data-id="${id}" data-i="${i}">${i < MODULE.sections.length-1 ? 'Mark complete and continue' : 'Finish and go to the test'} ${I.arrow}</button></div></article>`;
}
let quizAns = {}, quizChecked = false;
function test(id){
  return `<button class="btn quiet sm" data-go="course/${id}">${I.back} Course overview</button>
  <section class="card reader" style="margin-top:10px"><div class="eyebrow">Post-test · pass mark 80% (4 of 5)</div><h2 style="margin:6px 0 4px">Prevention of Medical Errors</h2><p class="small muted" style="margin-bottom:18px">Case-based questions. You can retake the test if you don't pass.</p>
  <form id="quiz">${MODULE.quiz.map((q,k) => `<fieldset class="q" style="border:0;margin:0;padding-left:0;padding-right:0"><legend class="sr" style="position:absolute;left:-9999px">Question ${k+1}</legend>
    <div class="scenario">${q.s}</div><h3>${k+1}. ${q.q}</h3>
    ${q.o.map((o,j) => { const cls = quizChecked ? (j===q.a ? 'right' : (quizAns[k]===j ? 'wrong' : '')) : ''; return `<label class="opt ${cls}"><input type="radio" name="q${k}" value="${j}" ${quizAns[k]===j?'checked':''} ${quizChecked?'disabled':''}> <span>${o}</span>${quizChecked && quizAns[k]===j ? `<span class="tag">Your answer${j===q.a?' · correct':''}</span>` : (quizChecked && j===q.a ? '<span class="tag">Correct answer</span>' : '')}</label>`; }).join('')}
    ${quizChecked ? `<div class="fb ${quizAns[k]===q.a?'right':'wrong'}">${quizAns[k]===q.a?'Correct. ':'Not quite. '}${q.w}</div>` : ''}</fieldset>`).join('')}</form>
  ${quizChecked ? resultBlock(id) : `<button class="btn" style="margin-top:18px" data-action="submit-quiz" data-id="${id}">Submit answers</button>`}</section>`;
}
function resultBlock(id){
  const score = MODULE.quiz.filter((q,k) => quizAns[k] === q.a).length, pct = score*20, pass = pct >= 80;
  return `<div class="divider"></div><div class="row wrap" style="gap:20px"><div class="score num" style="color:${pass?'var(--ok)':'var(--bad)'}">${pct}%</div>
    <div style="flex:1;min-width:200px"><h3>${pass ? 'Passed' : 'Not passed yet'}</h3><p class="small muted">${pass ? 'Your certificate is being issued and reported.' : 'You need 4 of 5. Review the feedback above and try again: no hours are added until you pass.'}</p></div>
    ${pass ? `<button class="btn" data-action="finish-course" data-id="${id}">Get certificate ${I.arrow}</button>` : `<button class="btn" data-action="retake" data-id="${id}">Retake test</button>`}</div>`;
}
const OUTCOMES = {
  'med-errors':['Explain how system gaps, not individuals, cause most medication and procedure errors','Use root-cause analysis to find the process failure behind an error','Apply look-alike/sound-alike, high-alert and Universal Protocol safeguards on the ward','Report near misses and communicate with SBAR in a just culture']
};
const AUTHORS = {'med-errors':'Dana Whitfield, MSN, RN, CPHQ · patient safety specialist (sample)'};
function courseDetails(id, c, P){
  const out = OUTCOMES[id] || ['Explain the key clinical risks this course covers','Apply the recommended practices to common ward situations','Know when and how to escalate or report'];
  return `<section class="card" style="margin-top:16px"><div class="grid2">
    <div><h2 style="margin-bottom:8px">Learning outcomes</h2><p class="small muted" style="margin-bottom:6px">After this course, you will be able to:</p>
      <ul class="small" style="padding-left:18px;margin:0;color:var(--ink-2)">${out.map(o => `<li style="margin-bottom:5px">${o}</li>`).join('')}</ul></div>
    <div><dl class="kv"><dt>Author</dt><dd>${AUTHORS[id] || 'Rounds clinical faculty (sample)'}</dd>
      <dt>Nurse Planner</dt><dd>Lena Ortiz, DNP, RN (sample)</dd>
      <dt>Contact hours</dt><dd>${c.hours}.0, based on the average time to finish the sections and test (${c.minutes} min; 1 contact hour = 60 min)</dd>
      <dt>To earn hours</dt><dd>Complete every section, score 80% or more on the post-test, and submit the evaluation</dd>
      <dt>Disclosures</dt><dd>None of the planners or authors have relevant financial relationships with ineligible companies (sample)</dd></dl></div>
  </div></section>`;
}
function evaluation(id){
  const c = COURSES[id]; if (!c) return courses();
  if (completedIds().includes(id)) { go('done/'+id); return ''; }
  const scale = ['Strongly agree','Agree','Neutral','Disagree','Strongly disagree'];
  const qs = ['The course met its stated learning outcomes.','The content will help me in my nursing practice.','The content was fair and free of commercial bias.'];
  return `<button class="btn quiet sm" data-go="course/${id}">${I.back} Course overview</button>
  <section class="card reader" style="margin-top:10px"><div class="eyebrow">Last step · about 1 minute</div><h2 style="margin:6px 0 4px">Course evaluation</h2>
  <p class="small muted" style="margin-bottom:18px">Accredited providers ask for feedback after every course and use it to improve the content. Your certificate is issued as soon as you submit.</p>
  <form id="evalf">${qs.map((q,k) => `<fieldset class="q" style="border:0;margin:0;padding-left:0;padding-right:0"><h3>${k+1}. ${q}</h3>
    <div class="row wrap" style="gap:6px;margin-top:8px">${scale.map((s,j) => `<label class="opt" style="margin-top:0;padding:8px 12px"><input type="radio" name="e${k}" value="${j}"> <span>${s}</span></label>`).join('')}</div></fieldset>`).join('')}
    <fieldset class="q" style="border:0;margin:0;padding-left:0;padding-right:0"><h3>4. What will you change in your practice? <span class="muted" style="font-weight:500">(optional)</span></h3>
    <textarea style="min-height:90px;margin-top:8px" aria-label="What will you change in your practice"></textarea></fieldset></form>
  <button class="btn" style="margin-top:12px" data-action="submit-eval" data-id="${id}">Submit and get certificate ${I.arrow}</button></section>`;
}
function done(id){
  const c = COURSES[id], P = PROV[c.prov], cert = S.certs.find(x => x.course === id);
  if (!cert) { go('course/'+id); return ''; }
  return `<button class="btn quiet sm" data-go="home">${I.back} Home</button>
  <div class="grid-main" style="margin-top:10px">
    <div><div class="cert"><div class="row" style="gap:16px;align-items:flex-start"><span class="seal">${I.cert.replace('<svg','<svg width="26" height="26"')}</span><div><div class="eyebrow">Certificate of completion · ${P.name}</div><h2>${c.title}</h2><p class="muted">awarded to <b style="color:var(--ink)">Jordan Reyes, RN</b> · FL license RN •••4821</p></div></div>
      <div class="divider"></div><dl class="kv"><dt>Contact hours</dt><dd>${c.hours}.0</dd><dt>Completed</dt><dd>${fmt(cert.date)}</dd><dt>Accredited provider</dt><dd>${P.name}</dd><dt>Certificate ID</dt><dd class="num">RND-2026-${String(S.certs.indexOf(cert)+1).padStart(5,'0')}</dd></dl>
      <p class="tiny muted" style="margin-top:14px;line-height:1.5">${P.name} is accredited as a provider of nursing continuing professional development by the American Nurses Credentialing Center's Commission on Accreditation (sample statement). Provider approved by the California Board of Registered Nursing, Provider #18245, for ${c.hours}.0 contact hours (sample). Florida Board of Nursing provider #50-31088 (sample).</p>
      <div class="sig"><div><i>Lena Ortiz, DNP, RN</i>Nurse Planner, ${P.name} (sample)</div><div><i>${fmt(cert.date)}</i>Date of completion</div></div></div>
      <div class="row wrap" style="margin-top:12px"><button class="btn ghost" data-action="pdf">${I.doc} Download PDF</button><button class="btn quiet" data-go="certs">All certificates ${I.arrow}</button></div></div>
    <aside class="card"><h2 style="margin-bottom:14px">What happens next</h2><ul class="timeline" id="tl">
      <li class="done"><span class="tdot">${I.check}</span><div><h3>Post-test passed and evaluation submitted</h3><p>Both are required for contact hours</p></div></li>
      <li class="done"><span class="tdot">${I.check}</span><div><h3>Certificate issued</h3><p>Added to your audit pack</p></div></li>
      <li class="${cert.reported?'done':'now'}" id="tl-ceb"><span class="tdot">${cert.reported?I.check:'<span class="spin" style="width:11px;height:11px"></span>'}</span><div><h3>Reported to CE Broker by Rounds</h3><p>${cert.reported?'As the approved provider, Rounds reported it. Florida now shows these hours (simulated)':'Sending completion for Florida…'}</p></div></li>
      <li class="${cert.reported?'done':''}"><span class="tdot">${I.check}</span><div><h3>Counted toward your renewals</h3><p>${countsFor(c).join(' · ')}</p></div></li></ul>
      <button class="btn" style="width:100%;margin-top:4px" data-go="home">See updated progress</button></aside>
  </div>`;
}
done.after = id => {
  const cert = S.certs.find(x => x.course === id);
  if (cert && !cert.reported) setTimeout(() => { cert.reported = true; save(); if (route()[0] === 'done') { render.focus = false; render(); toast('Reported to CE Broker (simulated). Florida hours updated.'); } }, 1800);
};

function certs(){
  const fl = flStatus(), ca = caStatus();
  const rows = [...S.certs].sort((a,b) => b.date.localeCompare(a.date));
  return `<div class="pagehead"><div><div class="eyebrow">Audit-ready</div><h1>Certificates</h1><p>Every certificate in one place, with where it counts. Florida audits licensees at random, and California has no tracking system, so keep certificates in case of audit.</p></div>
    <button class="btn" data-action="audit">${I.doc.replace('<svg','<svg width="16" height="16"')} Export audit pack</button></div>
  <div class="grid3 kpis" style="margin-bottom:16px">
    <div class="card kpi dark"><span class="eyebrow">Certificates</span><b class="num">${S.certs.length}</b><p>This renewal cycle</p></div>
    <div class="card kpi mint"><span class="eyebrow">Florida</span><b class="num">${fl.done}/${fl.total} h</b><p>${fl.complete ? 'Complete' : fl.missing.length + ' requirement(s) open'}</p></div>
    <div class="card kpi lav"><span class="eyebrow">California</span><b class="num">${ca.done}/${ca.total} h</b><p>${ca.complete ? 'Complete' : ca.left + ' hours left'}</p></div></div>
  <section class="card"><div class="table-wrap"><table><thead><tr><th>Course</th><th class="hide-m">Provider</th><th>Hours</th><th>Counts toward</th><th class="hide-m">Status</th></tr></thead><tbody>
  ${rows.map(c => `<tr><td><b style="font-weight:600">${c.title}</b><div class="tiny muted">${fmt(c.date)}${c.src==='upload'?' · uploaded by you':c.src==='external'?' · outside provider':''}</div></td><td class="hide-m small">${c.prov}</td><td class="num">${c.hours}</td>
    <td><div class="counts" style="margin:0">${countsFor(c).map(x => chip('brand', x.replace('Florida · ','FL · ').replace('California','CA'))).join('') || chip('plain','None')}</div></td>
    <td class="hide-m">${c.src==='upload' ? chip('info','Self-reported') : c.src==='external' ? chip('ok','Reported by provider') : c.fl ? chip('ok','Reported by Rounds') : chip('ok','Saved')}</td></tr>`).join('')}
  </tbody></table></div></section>`;
}

/* --- BLS blended journey --- */
const SLOTS = [
  {id:'a', d:addDays(6), t:'08:00–10:45', where:'Sim Lab, 2nd floor', inst:'Instructor-led'},
  {id:'b', d:addDays(9), t:'14:00–16:45', where:'Sim Lab, 2nd floor', inst:'Instructor-led'},
  {id:'c', d:addDays(12), t:'Any time, 24/7', where:'Self-directed station, ED corridor', inst:'Manikin station'}
];
function bls(){
  const st = S.bls.stage;
  const exp = st === 3 ? new Date(today().getFullYear()+2, today().getMonth()+1, 0) : D('2027-01-31');
  const steps = [
    ['Online part', 'Video lessons and exam at the training center, about 1–2 hours.'],
    ['Book your skills check', 'Hands-on compressions, AED and bag-mask with an instructor or a manikin station.'],
    ['Skills check', 'Instructor confirms you passed.'],
    ['New card', 'eCard valid for 2 years, to the end of the month.']
  ];
  const slot = SLOTS.find(s => s.id === S.bls.slot);
  let panel = '';
  if (st === 0) panel = `<h2>Step 1 · Online part</h2><p class="small muted" style="margin:6px 0 14px">This part happens on the training center's website. When you finish, the center sends us your completion and you come back here to book the skills check.</p>
    <div class="callout info">${I.info}<div>BLS is an <b>employer credential</b>, not license hours. We track it here because your unit can't schedule you without a valid card.</div></div>
    <button class="btn" style="margin-top:14px" data-action="bls-online">Continue to training center ${I.ext}</button>`;
  if (st === 1) panel = `<div class="callout ok" style="margin-bottom:14px">${I.check}<div><b>Welcome back.</b> The training center confirmed your online part (score 92%).</div></div>
    <h2>Step 2 · Book your skills check</h2><p class="small muted" style="margin:6px 0 14px">Pick a session. We'll add it to your calendar and tell your manager.</p>
    <div class="slots" role="group" aria-label="Skills sessions">${SLOTS.map(s => `<button type="button" class="slot" data-action="pick-slot" data-id="${s.id}" aria-pressed="${S.bls.slot===s.id}"><b>${fmt(s.d,{weekday:'short',month:'short',day:'numeric'})}</b><span>${s.t}</span><span style="display:block;margin-top:6px">${s.where}</span><span style="display:block;white-space:nowrap">${s.inst}</span></button>`).join('')}</div>
    <button class="btn" style="margin-top:14px" data-action="bls-book" ${S.bls.slot?'':'disabled'}>Book session</button>`;
  if (st === 2) panel = `<h2>Step 3 · Skills check booked</h2>
    <div class="callout info" style="margin:12px 0">${I.clock}<div><b>${fmt(slot.d,{weekday:'long',month:'long',day:'numeric'})}, ${slot.t}</b><br>${slot.where} · ${slot.inst}. Bring your badge. Your manager can see this booking.</div></div>
    <p class="small muted">In real life the instructor marks you as passed after the session. For the demo, simulate it:</p>
    <div class="row wrap" style="margin-top:12px"><button class="btn" data-action="bls-pass">Simulate: instructor confirms pass</button><button class="btn ghost" data-action="bls-resched">Change session</button></div>`;
  if (st === 3) panel = `<div class="callout ok">${I.check}<div><b>Your new BLS card is in.</b> Valid until ${fmt(exp,{month:'long',year:'numeric'})}. Your manager's dashboard updated automatically.</div></div>
    <div class="cert" style="margin-top:14px"><div class="eyebrow">BLS Provider eCard</div><h2>Basic Life Support</h2><p class="muted">Jordan Reyes, RN</p><div class="divider"></div>
    <dl class="kv"><dt>Issued</dt><dd>${fmt(today())}</dd><dt>Valid until</dt><dd>${fmt(exp)}</dd><dt>Training center</dt><dd>Lakeside Hospital Training Center (sample)</dd><dt>Skills check</dt><dd>${slot ? slot.inst : 'Instructor-led'}</dd></dl></div>`;
  return `<div class="pagehead"><div><div class="eyebrow">Credentials</div><h1>BLS renewal</h1><p>A blended course: part online with the training center, part hands-on at the hospital. Rounds keeps track of where you are, so nothing falls between the two.</p></div>
    ${st === 3 ? chip('ok','Valid until ' + fmt(exp,{month:'short',year:'numeric'})) : chip(daysTo('2027-01-31') < 90 ? 'bad':'warn', 'Expires ' + fmt('2027-01-31') + ' · ' + daysTo('2027-01-31') + ' days')}</div>
  <div class="grid-main"><section class="card">${panel}</section>
  <aside class="card"><h2 style="margin-bottom:14px">Progress</h2><ul class="timeline">${steps.map((s,k) => `<li class="${k<st || st===3?'done':k===st?'now':''}"><span class="tdot">${k<st || st===3 ? I.check : k+1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></li>`).join('')}</ul></aside></div>`;
}

/* --- Upload external certificate --- */
const EXTRACT = [
  ['Course title','Antimicrobial Stewardship for Nurses', 0.98],
  ['Contact hours','3.0', 0.99],
  ['Completion date', fmt('2026-10-14'), 0.97],
  ['Provider','Gulf Coast Critical Care Conference', 0.95],
  ['Accreditation','Accredited by a national nursing CE body (sample)', 0.88],
  ['California CEP #','Not found on certificate', 0.93]
];
function upload(){
  const st = S.upload.stage;
  const fl = flStatus(); const gen = fl.reqs.find(r => r.key === 'general');
  if (st === 0) return `<div class="pagehead"><div><div class="eyebrow">Courses taken elsewhere</div><h1>Add a certificate</h1><p>Took a course at a conference or another provider? Upload the certificate. Rounds reads it, checks it against each license's rules and tells you exactly what it counts for.</p></div></div>
    <section class="card"><div class="drop" id="drop"><div style="width:52px;height:52px;border-radius:14px;background:var(--brand-soft);color:var(--brand-ink);display:grid;place-items:center;margin:0 auto 12px">${I.upload.replace('<svg','<svg width="24" height="24"')}</div>
      <h2>Drop a PDF or photo here</h2><p class="small muted" style="margin:6px 0 16px">This prototype doesn't store files. Use the sample to see the checks.</p>
      <div class="row wrap" style="justify-content:center"><button class="btn" data-action="use-sample">Use sample certificate</button><label class="btn ghost" style="cursor:pointer">Choose a file<input type="file" accept=".pdf,image/*" id="file" style="display:none"></label></div></div>
      <p class="tiny muted" style="margin-top:12px">${I.sparkle.replace('<svg','<svg width="13" height="13" style="vertical-align:-2px"')} In the product, an AI model would read the certificate. Here the reading is simulated with a fixed sample.</p></section>`;
  if (st === 1) return `<div class="pagehead"><div><div class="eyebrow">Courses taken elsewhere</div><h1>Reading your certificate…</h1></div></div>
    <section class="card"><div class="row"><span class="spin dark"></span><span class="small muted" id="reading">Finding course details…</span></div></section>`;
  const gFull = gen.have >= gen.need;
  const decided = S.upload.decision;
  return `<div class="pagehead"><div><div class="eyebrow">Courses taken elsewhere</div><h1>Here's what we found</h1><p>Check the details, then choose what to do. Nothing is counted until you confirm.</p></div></div>
  <div class="grid-main">
    <section class="card"><div class="row between" style="margin-bottom:6px"><h2>Read from <span class="muted" style="font-weight:500">${S.upload.file || 'sample-certificate.pdf'}</span></h2>${chip('info','AI reading · simulated')}</div>
      <dl>${EXTRACT.map(([k,v,c]) => `<div class="field"><dt>${k}</dt><dd style="margin:0;font-weight:500">${v}</dd><span class="conf ${c<0.9?'low':''}">${c<0.9?'Check · ':''}${Math.round(c*100)}%</span></div>`).join('')}</dl></section>
    <aside class="card"><h2 style="margin-bottom:8px">Rule checks</h2>
      <div class="check"><span class="ci ok">${I.check}</span><div><b>Within your current cycle</b><p>Completed before both renewal deadlines.</p></div></div>
      <div class="check"><span class="ci ${gFull?'warn':'ok'}">${gFull?'!':I.check}</span><div><b>${gFull ? 'Florida: counts as general hours, but you\'re already full' : 'Florida: adds 3 general hours'}</b><p>${gFull ? `Accredited provider, not a required topic. Your general hours are complete (${gen.raw}/${gen.need}), so it adds nothing useful.` : 'Accredited provider. Helps close your general hours.'}</p></div></div>
      <div class="check"><span class="ci bad">${I.x}</span><div><b>California: doesn't count</b><p>No California BRN provider number (CEP) on the certificate. California only accepts hours from CEP providers.</p></div></div>
    </aside>
  </div>
  <section class="card" style="margin-top:16px">
    ${decided ? `<div class="callout ${decided==='fl-only'?'ok':'info'}">${decided==='fl-only'?I.check:I.info}<div>${decided==='fl-only' ? '<b>Saved for Florida only.</b> Florida certificates from outside providers are self-reported to CE Broker; we added a reminder to your checklist.' : '<b>Request drafted.</b> We prepared a message asking the conference for its California provider number. Nothing is sent until you approve it.'}</div></div>
      <div class="row wrap" style="margin-top:12px"><button class="btn" data-go="home">Back to home</button><button class="btn ghost" data-action="upload-again">Try again</button></div>`
    : `<h2 style="margin-bottom:6px">What would you like to do?</h2><p class="small muted" style="margin-bottom:14px">Tip: since your Florida general hours are full, this certificate only helps if the provider has a California number.</p>
      <div class="row wrap"><button class="btn" data-action="upload-decide" data-d="ask">Ask provider for a California CEP number</button><button class="btn ghost" data-action="upload-decide" data-d="fl-only">Save for Florida only</button></div>`}
  </section>`;
}
upload.after = () => {
  if (S.upload.stage === 1) {
    const msgs = ['Finding course details…','Checking provider accreditation…','Comparing with Florida and California rules…'];
    let k = 0; const t = setInterval(() => { k++; const el = document.getElementById('reading'); if (el && msgs[k]) el.textContent = msgs[k]; }, 650);
    setTimeout(() => { clearInterval(t); S.upload.stage = 2; save(); if (route()[0] === 'upload') { render.focus = false; render(); } }, 2100);
  }
  const drop = document.getElementById('drop');
  if (drop) {
    ['dragenter','dragover'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.add('over'); }));
    ['dragleave','drop'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', ev => { const f = ev.dataTransfer.files[0]; startUpload(f ? f.name : null); });
    document.getElementById('file').addEventListener('change', ev => { const f = ev.target.files[0]; startUpload(f ? f.name : null); });
  }
};
function startUpload(name){ S.upload = {stage:1, decision:null, file: name ? name.replace(/[<>&"]/g,'').slice(0,60) : null}; S.uploadNotice = false; save(); render(); }

/* ---------- View: Manager ---------- */
let teamFilter = 'all';
function team(){
  const rows = TEAM.map(t => t.self ? {...t, ...jordanTeamRow(), bls: S.bls.stage === 3 ? iso(new Date(today().getFullYear()+2, today().getMonth()+1, 0)) : t.bls} : t);
  const c = k => rows.filter(r => r.st === k).length;
  const blsSoon = rows.filter(r => daysTo(r.bls) < 90).length;
  const pct = Math.round(c('ok') / rows.length * 100);
  const shown = rows.filter(r => teamFilter === 'all' || r.st === teamFilter || (teamFilter === 'bls' && daysTo(r.bls) < 90));
  return `<div class="pagehead"><div><div class="eyebrow">4 West Med-Surg · ${rows.length} nurses</div><h1>Team compliance</h1><p>Who is ready to renew, who is at risk and what's blocking them, before it becomes a staffing problem. Next Florida deadline: ${fmt(FL.expires)} (${daysTo(FL.expires)} days).</p></div>
    <button class="btn ghost" data-action="export-team">${I.doc.replace('<svg','<svg width="16" height="16"')} Export for Joint Commission survey</button></div>
  <div class="grid3 kpis" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-bottom:16px">
    <div class="card kpi mint"><span class="eyebrow">Ready to renew</span><b class="num">${pct}%</b><p>${c('ok')} of ${rows.length} nurses</p></div>
    <div class="card kpi"><span class="eyebrow">Blocked</span><b class="num" style="color:var(--bad)">${c('blocked')}</b><p>Missing a required topic</p></div>
    <div class="card kpi"><span class="eyebrow">At risk</span><b class="num" style="color:var(--warn)">${c('risk')}</b><p>Hours left or under review</p></div>
    <div class="card kpi dark"><span class="eyebrow">BLS expiring</span><b class="num">${blsSoon}</b><p>Within 90 days</p></div></div>
  <section class="card"><div class="row between wrap" style="margin-bottom:12px"><h2>Nurses</h2>
    <div class="filters" role="group" aria-label="Filter">${[['all','All'],['blocked','Blocked'],['risk','At risk'],['ok','On track'],['bls','BLS < 90 days']].map(([k,l]) => `<button type="button" data-action="filter" data-f="${k}" aria-pressed="${teamFilter===k}">${l}</button>`).join('')}</div></div>
    <div class="table-wrap team-table"><table><thead><tr><th>Nurse</th><th class="hide-m">Licenses</th><th>Status</th><th>What's blocking</th><th class="hide-m">BLS card</th><th></th></tr></thead><tbody>
    ${shown.map(r => { const bd = daysTo(r.bls); return `<tr><td><div class="person"><span class="avatar">${r.i}</span><div><b style="font-weight:600">${r.n}</b>${r.self?'<div class="tiny muted">Live from the nurse view</div>':''}</div></div></td>
      <td class="hide-m small">${r.lic}</td><td>${chip(ST[r.st][0], ST[r.st][1])}</td><td class="small">${r.why}</td>
      <td class="hide-m small ${bd<90?'':'muted'}">${bd<90?`<b style="color:var(--bad)">${bd} days</b>`:fmt(r.bls,{month:'short',year:'numeric'})}</td>
      <td style="text-align:right">${r.st !== 'ok' ? (S.reminded[r.n] ? chip('ok','Reminder queued') : `<button class="btn sm ghost" data-action="remind" data-n="${r.n}">Draft reminder</button>`) : ''}</td></tr>`; }).join('') || `<tr><td colspan="6" class="muted">No nurses match this filter.</td></tr>`}
    </tbody></table></div>
    <div class="mlist">${shown.map(r => { const bd = daysTo(r.bls); return `<div class="mcard"><div class="row between"><div class="person"><span class="avatar">${r.i}</span><div><b style="font-weight:600">${r.n}</b><div class="tiny muted">${r.lic}</div></div></div>${chip(ST[r.st][0], ST[r.st][1])}</div>
      <p class="small" style="margin-top:10px">${r.why}</p><p class="tiny muted" style="margin-top:4px">BLS card: ${bd<90?`<b style="color:var(--bad)">expires in ${bd} days</b>`:fmt(r.bls,{month:'short',year:'numeric'})}</p>
      ${r.st !== 'ok' ? (S.reminded[r.n] ? `<div style="margin-top:10px">${chip('ok','Reminder queued')}</div>` : `<button class="btn sm ghost" style="width:100%;margin-top:10px" data-action="remind" data-n="${r.n}">Draft reminder</button>`) : ''}</div>`; }).join('') || '<p class="muted">No nurses match this filter.</p>'}</div></section>
  <p class="tiny muted" style="margin-top:12px">Jordan's row is calculated live from the nurse view: complete a course there and come back. All other nurses are sample data.</p>`;
}
function remindModal(n){
  const r = n === 'Jordan Reyes' ? {...TEAM[0], ...jordanTeamRow()} : TEAM.find(t => t.n === n);
  const first = n.split(' ')[0];
  const text = `Hi ${first},\n\nQuick heads-up on your license renewal (due ${fmt(r.dl)}): ${r.why.charAt(0).toLowerCase() + r.why.slice(1)}.\n\nYou can finish it in Rounds; your path shows the fastest way, and the hours count toward every license you hold where possible. Let me know if you need protected time on a shift to complete it.\n\nThanks,\nCarla`;
  modal(`<h2>Reminder to ${n}</h2><p class="small muted" style="margin-bottom:12px">Drafted from ${first}'s live status. Edit before approving. Nothing is sent from this prototype.</p><p class="small" style="margin-bottom:8px"><span class="muted">To:</span> <b>${n}</b> · in-app message and email</p>
    <textarea id="remText" aria-label="Reminder text">${text}</textarea>
    <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-action="close">Cancel</button><button class="btn" data-action="approve-remind" data-n="${n}">Approve and queue</button></div>`);
}

/* ---------- View: Spec ---------- */
let specTab = 'stories';
function spec(){
  const tabs = [['stories','User stories'],['ticket','Ticket'],['context','Problem & personas'],['metrics','Metrics & risks'],['sources','Rules & sources']];
  return `<div class="pagehead"><div><div class="eyebrow">Product spec · v0.2</div><h1>License & CE renewal</h1><p>One-page spec behind this prototype: who it's for, three user stories with testable acceptance criteria, an example ticket, metrics, risks and the rules it's based on.</p></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k,l]) => `<button role="tab" aria-selected="${specTab===k}" data-action="spec-tab" data-t="${k}">${l}</button>`).join('')}</div>
  <div class="spec">${({stories:specStories, ticket:specTicket, context:specContext, metrics:specMetrics, sources:specSources})[specTab]()}</div>`;
}
const STORIES = [
  {id:'US-1', title:'Shortest path across licenses', who:'Jordan, travel nurse with FL + CA licenses', story:'As a nurse holding more than one state license, I want one plan that tells me which courses close my gaps for every license, so that I don\'t waste hours on courses that only count once.', go:'home',
   ac:[
    ['Given a nurse has required topics missing in Florida, when she opens Home, then each missing topic is listed by name, even if her total hours look sufficient.','Home: "not the right ones" alert'],
    ['Given a course counts toward more than one license, when it appears in the path, then it shows every requirement it counts toward.','Counts chips on each step'],
    ['Given required topics are missing, then the path schedules them first, before general hours.','Path order'],
    ['Given a course is completed, when the nurse returns to Home, then progress, the path and the manager view update without a page reload.','Complete any path course'],
    ['Given every requirement is met, then the path shows "Complete" and no course is recommended.','Finish the path']]},
  {id:'US-2', title:'Self-paced module with post-test', who:'Any nurse', story:'As a nurse, I want to complete a required course and have it reported to the state automatically, so that my record is correct without extra admin.', go:'course/med-errors',
   ac:[
    ['Given the nurse hasn\'t finished all sections, then the post-test is locked.','Open the course'],
    ['Given a score below 80%, then no hours are added and the nurse can retake the test, with feedback on each answer.','Answer 2 questions wrong'],
    ['Given a pass, then the nurse submits a short evaluation before the certificate is issued.','Pass the test'],
    ['Given the evaluation is submitted, then a certificate is issued by the accredited provider, with accreditation statement, contact hours and date.','Submit the evaluation'],
    ['Given a Florida requirement, then completion is reported to CE Broker and the status is visible to the nurse.','Certificate page timeline']]},
  {id:'US-3', title:'Certificate from another provider', who:'Any nurse', story:'As a nurse who took a course elsewhere, I want to know exactly which license it counts for before I rely on it, so that I don\'t discover a gap at renewal time.', go:'upload',
   ac:[
    ['Given an uploaded certificate, then the extracted fields are shown with a confidence level and nothing is counted until the nurse confirms.','Use sample certificate'],
    ['Given the provider has no California CEP number, then the certificate is flagged as not counting for California, with the reason.','Rule checks panel'],
    ['Given the matching Florida requirement is already full, then the app says it adds 0 useful hours.','Rule checks panel'],
    ['Given the nurse chooses to ask the provider, then a request is drafted and never sent without approval.','Choose "Ask provider"']]}
];
function specStories(){
  return STORIES.map(s => `<article class="story"><div class="story-head"><div><span class="ticket-key">${s.id}</span> · <b>${s.title}</b><div class="tiny muted">${s.who}</div></div><button class="btn sm ghost" data-go="${s.go}">Try it in the prototype ${I.arrow}</button></div>
    <div class="story-body"><blockquote>${s.story}</blockquote><h3 style="margin-bottom:4px">Acceptance criteria</h3><ul class="ac">${s.ac.map(([t,how],k) => `<li><span class="acid">AC${k+1}</span><span>${t.replace(/^(Given|when|then)/g,'<em>$1</em>').replace(/, (when|then) /g, ', <em>$1</em> ')}</span><span class="tiny muted hide-m" style="white-space:nowrap">${how}</span></li>`).join('')}</ul></div></article>`).join('');
}
function specTicket(){
  return `<div class="ticket"><div class="ticket-head"><span class="ticket-key">RND-142</span><b>Report Florida completions to CE Broker</b>${chip('info','Story')}${chip('plain','5 pts')}${chip('warn','Needs refinement')}</div>
  <div class="ticket-body"><div>
    <h4>Description</h4><p>When a nurse passes a course that counts toward a Florida requirement, send the completion to CE Broker so her state record matches ours. Part of US-2.</p>
    <h4>Acceptance criteria</h4><ul><li>Completion is sent within 5 minutes of the certificate being issued.</li><li>The nurse sees one of: Sending, Reported, or Failed with a retry.</li><li>A failed report never removes hours from the nurse's in-app progress, but the nurse and support are told.</li><li>Only courses approved by the Florida Board for that requirement are reported as that requirement.</li></ul>
    <h4>Out of scope</h4><ul><li>Self-reported certificates from outside providers (see US-3).</li><li>States other than Florida.</li></ul>
    <h4>Open questions</h4><ul><li>Do we report each completion in real time or in daily batches?</li><li>Do partner courses (if any) report themselves, or through us?</li><li>Which license identifier do we hold: license number only, or more?</li></ul></div>
    <div><dl class="kv"><dt>Epic</dt><dd>State reporting</dd><dt>Depends on</dt><dd>RND-138 License profile</dd><dt>Design</dt><dd>Certificate timeline</dd><dt>QA</dt><dd>Sandbox account + failure cases</dd><dt>Owner</dt><dd>Product</dd></dl></div></div></div>`;
}
function specContext(){
  return `<div class="grid2"><div class="card"><h2>Problem</h2><p>Licensed nurses must renew every two years with a set number of contact hours, and some states require specific topics. Rules differ by state and change over time. Nurses with more than one license, like travel nurses, track it by hand, and some only discover a missing topic at renewal. For hospitals, a lapsed license or BLS card means a nurse can't be scheduled.</p></div>
  <div class="card"><h2>Goal for this release</h2><p>Every nurse knows, at any moment, what is left for each license and the shortest way to finish it. Managers see risk 60+ days before a deadline.</p><p style="margin-top:8px"><b>Business model assumed:</b> Rounds is the accredited provider of its own courses (ANCC, Florida Board, California CEP), so it issues certificates and reports to CE Broker. Courses taken elsewhere are checked against each state's rules, never certified by Rounds.</p></div></div>
  <h2 style="margin:22px 0 12px">Personas</h2><div class="grid3">
    ${[['JR','Jordan, travel nurse','FL multistate + CA licenses. Takes courses on her phone between shifts. Pain: different rules per state; doesn\'t know which hours count twice.'],
      ['PN','Priya, staff nurse','One Florida license, busy unit. Pain: has "enough hours" but misses a required topic; finds out late.'],
      ['CM','Carla, nurse manager','Runs a 12-nurse unit. Pain: learns about lapsed licenses or BLS cards when building the schedule.']]
      .map(([i,n,d]) => `<div class="card persona"><span class="avatar">${i}</span><div><h3>${n}</h3><p class="small" style="margin-top:4px">${d}</p></div></div>`).join('')}</div>
  <div class="card" style="margin-top:16px"><h2>Not in this version</h2><ul><li>Real board or CE Broker integrations (simulated here)</li><li>States other than Florida and California</li><li>Live AI reading of certificates (simulated with a fixed sample)</li><li>Paying for courses, and specialty certifications such as CCRN</li></ul></div>`;
}
function specMetrics(){
  return `<div class="grid2"><div class="card"><h2>Success metrics</h2><ul><li><b>On-time renewal rate:</b> share of nurses with all requirements met 30 days before the deadline.</li><li><b>Wasted hours:</b> hours completed that count toward no open requirement. Target: down by half.</li><li><b>Early warning:</b> share of at-risk nurses reached 60+ days before the deadline.</li><li><b>Path completion:</b> share of nurses who finish the recommended path.</li></ul></div>
  <div class="card"><h2>Risks</h2><ul><li><b>Rule accuracy:</b> state rules change. Mitigation: a rules table with sources, owner and review date, checked with compliance.</li><li><b>Reporting failures:</b> CE Broker outages. Mitigation: retries and visible status (RND-142).</li><li><b>AI reading errors:</b> wrong hours or provider. Mitigation: confidence shown, nurse confirms, nothing counted automatically.</li><li><b>Personal data:</b> license numbers are sensitive. Mitigation: store the minimum and mask in the UI.</li></ul></div></div>
  <div class="card" style="margin-top:16px"><h2>Questions for stakeholders</h2><ul><li>Which states cover most of your users today, and which next?</li><li>Do providers on the platform already report to CE Broker themselves?</li><li>Do hospitals buy this per unit, or do nurses sign up on their own?</li><li>Who owns rule updates today, and how do we get notified of changes?</li></ul></div>`;
}
function specSources(){
  return `<div class="card"><h2>Rules used, and where they come from</h2><p class="small" style="margin-bottom:12px">Checked on ${fmt('2026-11-21')}. Simplified for the demo; a real product would keep these in a rules table with an owner and review date.</p>
  <div class="table-wrap"><table><thead><tr><th>Rule</th><th>Used in the prototype</th><th>Source</th></tr></thead><tbody>
  <tr><td>Florida RN: 24 hours every 2 years</td><td>16 general + Medical Errors 2 + Laws & Rules 2 + Impairment 2 (every other renewal) + Human Trafficking 2. Domestic Violence every third renewal; HIV/AIDS once before first renewal.</td><td><a href="https://floridasnursing.gov/registered-nurse-renewal/" target="_blank" rel="noopener">Florida Board of Nursing</a></td></tr>
  <tr><td>Florida reporting</td><td>Completions reported in CE Broker, the state tracking system. Required topics need a board-approved provider, except Human Trafficking.</td><td><a href="https://floridasnursing.gov/registered-nurse-renewal/" target="_blank" rel="noopener">Florida Board of Nursing</a></td></tr>
  <tr><td>California RN: 30 hours every 2 years</td><td>Only courses from providers with a California BRN provider number (CEP) count. Implicit bias hour applies to newly licensed RNs.</td><td><a href="https://www.rn.ca.gov/licensees/ce-renewal.shtml" target="_blank" rel="noopener">California BRN</a></td></tr>
  <tr><td>Who can award contact hours</td><td>Only accredited or approved providers: ANCC accreditation (directly or through a state nursing association), Florida Board approval for Florida's required topics, a California BRN provider number. A quiz alone earns nothing: hours come from completing an accredited activity.</td><td><a href="https://www.nursingworld.org/organizational-programs/accreditation/ncpd/" target="_blank" rel="noopener">ANCC NCPD</a> · <a href="https://rn.ca.gov/applicants/cep-lic.shtml" target="_blank" rel="noopener">CA BRN providers</a></td></tr>
  <tr><td>BLS (blended)</td><td>Online part plus a hands-on skills session; card valid 2 years to the end of the month. Tracked as an employer credential.</td><td><a href="https://cpr.heart.org/en/courses/basic-life-support-course-options" target="_blank" rel="noopener">American Heart Association</a></td></tr>
  </tbody></table></div>
  <div class="callout warn" style="margin-top:14px">${I.alert}<div>Group dates, provider numbers, people and the conference are made up. Rules are simplified: always verify with the board before relying on them.</div></div></div>`;
}

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-go],[data-action],[data-role],[data-close]');
  if (!el) return;
  if (el.hasAttribute('data-close') && e.target === el) { closeModal(); return; }
  if (el.dataset.role) { go(ROLE_HOME[el.dataset.role]); return; }
  if (el.dataset.go) { closeModal(); go(el.dataset.go); return; }
  const a = el.dataset.action, id = el.dataset.id;
  const A = {
    reset(){ S = SEED(); save(); quizAns = {}; quizChecked = false; teamFilter = 'all'; specTab = 'stories'; toast('Demo reset'); go('home'); render(); },
    close: closeModal,
    scroll(){ document.getElementById(el.dataset.target)?.scrollIntoView({behavior:'smooth', block:'start'}); },
    'section-done'(){ const p = prog(id), i = +el.dataset.i; if (!p.sections.includes(i)) p.sections.push(i); save(); go(i < MODULE.sections.length-1 ? `learn/${id}/${i+1}` : `test/${id}`); quizAns = {}; quizChecked = false; },
    'submit-quiz'(){ const f = document.getElementById('quiz'); quizAns = {}; MODULE.quiz.forEach((q,k) => { const v = f.querySelector(`input[name=q${k}]:checked`); if (v) quizAns[k] = +v.value; });
      if (Object.keys(quizAns).length < MODULE.quiz.length) { toast('Answer all 5 questions first'); return; } quizChecked = true; render.focus = false; render(); setTimeout(() => document.querySelector('.score')?.scrollIntoView({behavior:'smooth',block:'center'}), 50); },
    retake(){ quizAns = {}; quizChecked = false; render(); },
    'finish-course'(){ quizAns = {}; quizChecked = false; go('eval/'+id); },
    'submit-eval'(){ const f = document.getElementById('evalf'); const ok = [0,1,2].every(k => f.querySelector(`input[name=e${k}]:checked`)); if (!ok) { toast('Answer the three rating questions first'); return; } completeCourse(id); go('done/'+id); },
    'quick-complete'(){ completeCourse(id); go('done/'+id); },
    'bls-online'(){ modal(`<div class="eyebrow">Leaving Rounds</div><h2>Opening the training center</h2><p class="small muted" style="margin:6px 0 14px">In the product, this opens the training center's online course in a new tab. When you finish, the center sends your completion back and Rounds moves you to the next step.</p>
        <div class="callout info">${I.info}<div>Demo: we'll simulate that you completed the online part.</div></div>
        <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-action="close">Cancel</button><button class="btn" data-action="bls-return">Simulate: I finished online</button></div>`); },
    'bls-return'(){ closeModal(); S.bls.stage = 1; save(); render(); toast('Welcome back: online part confirmed by the training center'); },
    'pick-slot'(){ S.bls.slot = id; save(); render.focus = false; render(); },
    'bls-book'(){ S.bls.stage = 2; save(); render(); toast('Skills check booked and added to your calendar'); },
    'bls-resched'(){ S.bls.stage = 1; save(); render(); },
    'bls-pass'(){ S.bls.stage = 3; save(); render(); toast('New BLS eCard received. Your manager can see it.'); },
    'use-sample'(){ startUpload(null); },
    'upload-decide'(){ const d = el.dataset.d; S.upload.decision = d;
      if (d === 'fl-only' && !S.certs.find(c => c.id === 'ext1')) addCert({id:'ext1', title:'Antimicrobial Stewardship for Nurses', hours:3, prov:'Gulf Coast Critical Care Conference', date:'2026-10-14', fl:'general', ca:false, src:'upload'});
      save(); render.focus = false; render(); if (d === 'ask') askModal(); },
    'upload-again'(){ S.certs = S.certs.filter(c => c.id !== 'ext1'); S.upload = {stage:0, decision:null}; S.uploadNotice = true; save(); render(); },
    pdf(){ toast('PDF download is not part of this prototype'); },
    audit(){ toast('Audit pack prepared: ' + S.certs.length + ' certificates, grouped by license (demo, no file)'); },
    'export-team'(){ toast('Survey export prepared: license and BLS status for ' + TEAM.length + ' nurses (demo, no file)'); },
    filter(){ teamFilter = el.dataset.f; render.focus = false; render(); },
    remind(){ remindModal(el.dataset.n); },
    'approve-remind'(){ S.reminded[el.dataset.n] = true; save(); closeModal(); render.focus = false; render(); toast('Reminder queued as an in-app message (prototype: nothing sent)'); },
    'spec-tab'(){ specTab = el.dataset.t; render.focus = false; render(); }
  };
  if (A[a]) A[a]();
});
function askModal(){
  modal(`<h2>Request to the provider</h2><p class="small muted" style="margin-bottom:12px">Drafted for you. Edit, then approve. The prototype never sends it.</p>
  <textarea aria-label="Request text">Hello,\n\nI attended "Antimicrobial Stewardship for Nurses" (3.0 contact hours) on ${fmt('2026-10-14')}. Could you tell me whether your organization holds a California Board of Registered Nursing provider number (CEP), and if so, send a certificate that shows it?\n\nThank you,\nJordan Reyes, RN</textarea>
  <div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-action="close">Not now</button><button class="btn" data-action="close">Approve (demo: not sent)</button></div>`);
}
function completeCourse(id){
  if (completedIds().includes(id)) return;
  const c = COURSES[id]; const p = prog(id); p.passed = true;
  addCert({id:'p'+(S.certs.length+1), course:id, title:c.title, hours:c.hours, prov:PROV[c.prov].name, date:iso(today()), fl:c.fl, ca:c.ca, src:'platform', reported:false});
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
window.addEventListener('hashchange', render);
render.focus = false;
render();
</script>
</body>
</html>

````

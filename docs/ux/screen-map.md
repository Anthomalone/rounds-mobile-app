# Screen map: Rounds mobile app

One row per screen (v1, nurse side). Each screen is judged against its row, on a screenshot of the running app at phone width (390 wide). Routes are Expo Router paths. A row may cover a short flow of steps that share one job; each step still has one primary action.

| Route | Type | User | Job (one line) | Main content (must stand out) | Primary action (exactly one) | Other actions | States |
|---|---|---|---|---|---|---|---|
| `/` (Home tab) | dashboard | Nurse | Know what is left for each license and what to do next | Florida and California tiles with hours done / needed and days left, then the shortest-path tile | Start next (opens the first course on the path) | Open a requirement card, open a "Needs your attention" item | empty (no licenses), loading, error, path complete ("Complete", nothing recommended), missing topic warning |
| `/courses` and `/courses/[id]` (Courses tab) | list, then detail | Nurse | Pick a course and trust that it counts | List: each course with its hours and Florida / California chips. Detail: what it counts toward and how the hours were calculated | List: open a course. Detail: Start course | Back, read disclosures, see syllabus | empty, loading, error, already completed, post-test locked |
| `/learn/[id]` (lesson, post-test, evaluation, certificate) | form flow | Nurse | Finish the course and get the certificate counted | The current step: lesson text, or the question, or the certificate with contact hours | Lesson: Mark complete and continue. Test: Submit answers. Evaluation: Submit evaluation. Certificate: Back to Home | Previous section, Retake (after a fail) | loading, error, failed (below 80%, no hours), passed, reporting to CE Broker (simulated: Sending / Reported), reported |
| `/certificates` and `/certificates/add` (Certificates tab) | list, then form flow | Nurse | See every certificate and where it counts; add one from another provider | List: totals (count, Florida h, California h) and each certificate's status. Add: extracted fields with confidence, then the rule check per state | List: Add certificate. Add: Save for Florida only (or Confirm and save, when it counts everywhere) | Use sample certificate, Ask provider for a California CEP number (draft, never sent), edit a flagged field | empty, loading, error, reading (simulated AI, labelled), field needs checking (below 90%), does not count for a state, draft not sent |
| `/bls` | form flow | Nurse | Renew the BLS card before it expires | The 4-step progress and the current step (online part, skills session, instructor pass, new eCard) | The current step's one button (Start online part / Book this session / Instructor pass (simulated) / Done) | Pick a different session, go back | empty, loading, error, leaving Rounds (online part), booked, new eCard issued |
| `/rules` | detail | Nurse | Check where each rule comes from | Each Florida and California rule with its source link and "checked 21 Nov 2026" | Open source (link) | Back | empty, loading, error |

Hidden on every screen: real names or license numbers (license number always masked, for example •••4821), any "send" that happens without approval.

## Users and access

- **Nurse (Jordan Reyes, made up):** no sign-in in v1 (one sample nurse on the device). Reaches every route above through the bottom tab bar (Home, Courses, Certificates) and links (BLS from Home, Rules & sources from Home and the requirement cards).
- **Manager (Carla Mendes):** not in v1 of the mobile app; stays in the web prototype.

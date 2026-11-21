# Plan: F6–F10 courses, lessons, post-test, evaluation, certificate

## Goal
Jordan can browse the catalog, open a course and see why it counts, read the lessons, pass the post-test, fill in the evaluation, get the certificate, watch it being reported to CE Broker (simulated), and see Home update. When the whole path is done, the path says Complete.

## Feature
One pull request for the course flow (same reason as Home: one review stop).
- F6: Courses tab and course detail (provider, accreditation, FL/CA provider numbers, outcomes, author, Nurse Planner, "120 min = 2.0 h", disclosures, syllabus with locked post-test).
- F7: Lesson reader: sections with "On the ward" case, progress dashes, Mark complete and continue; post-test unlocks only after the 4th section.
- F8: Post-test: 5 questions, 80% pass mark, "Your answer" / "Correct answer" with feedback, Retake below 80%, no hours.
- F9: Evaluation (3 ratings + optional text) → certificate (SAMPLE, contact hours, date, ID) → "Reported to CE Broker (simulated)" after about 2 s → Home shows Florida 22/24 and a 3-course path.
- F10: When every requirement is met, the path tile says Complete and recommends nothing.

## Steps
1. Store: course progress (sections done, passed, evaluated), complete a course (adds a certificate, not yet reported), mark it reported.
2. Courses tab: catalog cards with type, hours, provider, counts-toward chips, Completed / Not due tags; BLS opens /bls.
3. Course detail `/courses/[id]`: header facts, details, syllabus with lock, "Why this course", primary action Start course / Continue / Take the post-test / See certificate. Other courses: "Complete module (demo shortcut)" as in the web prototype, labelled as a demo shortcut.
4. Learn flow `/learn/[id]`: lesson step, post-test step, evaluation step, certificate step, chosen from the course's progress.
5. Certificate step: SAMPLE ribbon, certificate details and accreditation statement (sample), timeline with simulated CE Broker report (Sending… → Reported, about 2 s), PDF download labelled as a demo.

## Files
`src/store.tsx`, `src/app/(tabs)/courses.tsx`, `src/app/courses/[id].tsx`, `src/app/learn/[id].tsx`, `src/components/course/*.tsx`.

## Checks
- typecheck, lint, test, expo-doctor pass.
- Browser at 375 wide: Courses tab lists 7 courses; Prevention of Medical Errors detail shows "120 min", "1 contact hour = 60 min", FL #50-31088 and CA CEP #18245 (sample), 4 sections and a locked post-test.
- Start course, tap "Mark complete and continue" 3 times and "Finish and go to the test" once; the post-test opens only then.
- Answer 3 of 5 correctly → 60%, "Not passed yet", no hours, each question shows Your answer / Correct answer and feedback, Retake button. Retake with 5 correct → 100% Passed.
- Submit the 3 ratings → certificate with 2.0 contact hours, today's date, ID; timeline shows "Sending…" then "Reported to CE Broker by Rounds (simulated)".
- Home: Florida 22/24, California 20/30, path 3 courses · 10 h.
- Use the demo shortcut on Impairment, High-Alert and Delirium → Home path tile says Complete, list says Nothing left to do, both tiles say Ready.

## What could break
Home numbers now change when a course is completed; the rules engine tests already pin those numbers. Completing the same course twice must not double-count (store already guards it).

## Not doing
Real CE Broker reporting, real PDF, saving progress between launches, lesson content for courses other than Prevention of Medical Errors (demo shortcut instead, as in the web prototype).

## Questions
None.

# Lane brief: Lane A

Written by the Chief Architect, 21 Nov 2026.

| Field | Value |
|---|---|
| Lane name | Lane A |
| Goal | Jordan can browse the catalog, take Prevention of Medical Errors from first lesson to certificate, see it reported to CE Broker (simulated), and see Home update. |
| Features | F6, F7, F8, F9, F10 |
| Worktree and branch | `.claude/worktrees/lane-a`, branch `worktree-lane-a` |
| Starting point | main after the foundation pull request was merged |
| Allowed files and folders | `src/app/(tabs)/courses.tsx`, `src/app/courses/`, `src/app/learn/`, `src/components/course/`, `plans/lane-a-*.md` |
| Do not touch | Everything else, in particular `src/store.tsx`, `src/components/ui.tsx`, `src/theme.ts`, `src/logic/`, `src/data/`, `src/app/(tabs)/index.tsx` (Home), `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `package.json`, `docs/`. Ask the Chief Architect for any change there. |
| Builds on | `useStore()` from `src/store.tsx` (`certs`, `progress`, `markSection`, `markPassed`, `completeCourse`, `markReported`); `src/logic/engine.ts`; `src/data/catalog.ts` and `src/data/module.ts` (`hasFullContent`, sections, quiz, outcomes); parts in `src/components/ui.tsx`; tokens in `src/theme.ts`. |
| Dev server port | 8082 (`npx expo start --web --port 8082`) |
| Depends on / blocks | None. Lane B works on other files at the same time. |

## Head start

Work already written before the lanes (not yet checked in the browser or reviewed) is on branch `feature/course-flow`. Bring over only your allowed files, then check, fix and finish them:

```bash
git fetch origin
git checkout origin/feature/course-flow -- "src/app/(tabs)/courses.tsx" "src/app/courses/[id].tsx" "src/app/learn/[id].tsx"
```

The plan written for it is `plans/2026-11-21-course-flow.md` on that branch: copy its content into your own `plans/lane-a-2026-11-21-course-flow.md`.

## Done means

Checked in the browser at 375 wide (and screen contracts `/courses`, `/courses/[id]`, `/learn/[id]` in `docs/ux/screen-map.md`):

- [ ] Courses tab lists 7 courses, each with hours, provider and mint Florida / lavender California chips; BLS opens `/bls`.
- [ ] Prevention of Medical Errors detail shows "120 min", "1 contact hour = 60 min", FL #50-31088 and CA CEP #18245 (sample), 4 sections and a locked post-test.
- [ ] The post-test unlocks only after the 4th section is marked complete.
- [ ] 3 of 5 right → 60%, "no hours", Your answer / Correct answer with feedback on each question, Retake. 5 of 5 → Passed.
- [ ] After the 3 ratings: certificate (SAMPLE, 2.0 h, today's date, ID); timeline goes from Sending to "Reported to CE Broker by Rounds", visibly labelled simulated.
- [ ] Home then shows Florida 22/24 and a 3-course path.
- [ ] Demo shortcut on Impairment, High-Alert and Delirium → Home path tile says Complete and recommends nothing.
- [ ] Exactly one primary action per screen or step; numbers in Geist Mono; no sideways scroll.

## Checks to run before reporting

`npm run typecheck`, `npm run lint`, `npm test`, `npx expo-doctor` all pass, then /codex-review with every finding triaged by Anthony, then /pr. Do not merge: the Chief Architect checks the pull request (including a /ux-check of your screens) and merges after Anthony approves.

## How to report

Send a message to "Chief Architect" in this format:

```text
STATUS: DONE | BLOCKED | QUESTION
PR: #<number>
Checks: green | red (what failed)
Files changed outside my allowed list: none
Look at: <one line on what to check first>
```

## When to stop and ask instead of guessing

- You need to change a file on the "Do not touch" list (for example a new store action or a new UI part).
- The brief and the handoff disagree.
- The same error happens 3 times.
- You are about to build something not in "Done means".

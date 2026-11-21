# Lane brief: Lane B

Written by the Chief Architect, 21 Nov 2026.

| Field | Value |
|---|---|
| Lane name | Lane B |
| Goal | Jordan can see all her certificates and where each counts, add a certificate from another provider and decide what to do with it, and renew her BLS card. |
| Features | F11, F12, F13, F14 |
| Worktree and branch | `.claude/worktrees/lane-b`, branch `worktree-lane-b` |
| Starting point | main after the foundation pull request was merged |
| Allowed files and folders | `src/app/(tabs)/certificates.tsx`, `src/app/certificates/`, `src/app/bls.tsx`, `src/components/certificates/`, `src/components/bls/`, `plans/lane-b-*.md` |
| Do not touch | Everything else, in particular `src/store.tsx`, `src/components/ui.tsx`, `src/theme.ts`, `src/logic/`, `src/data/`, `src/app/(tabs)/index.tsx` (Home), `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `package.json`, `docs/`. Ask the Chief Architect for any change there. |
| Builds on | `useStore()` from `src/store.tsx` (`certs`, `addCert`, `bls`, `setBls`); `src/logic/engine.ts` (`flStatus`, `caStatus`, `countsToward`, `blsExpiry`); `src/data/catalog.ts` (`SAMPLE_EXTRACT`, `SAMPLE_UPLOAD`, `BLS_SLOTS`, `BLS_ONLINE_SCORE`, `TRAINING_CENTER`, `NURSE`); parts in `src/components/ui.tsx` (including `SimulatedTag`); tokens in `src/theme.ts`. The web prototype (`web-prototype-index.html`, functions `certs`, `upload`, `askModal`, `bls`) is the reference. |
| Dev server port | 8083 (`npx expo start --web --port 8083`) |
| Depends on / blocks | None. Lane A works on other files at the same time. |

## Done means

Checked in the browser at 375 wide (and screen contracts `/certificates`, `/certificates/add`, `/bls` in `docs/ux/screen-map.md`):

- [ ] F11: Certificates tab shows 7 certificates at the start, totals (count, Florida 20/24 h, California 18/30 h) and a status on each: Reported by Rounds / Reported by provider / Self-reported. Primary action: Add certificate.
- [ ] F12: Add certificate → Use sample certificate → a reading step labelled "AI reading · simulated" → Antimicrobial Stewardship 3.0 h with confidence per field; the 88% field is flagged "Check"; rule checks: within cycle ✓, Florida "counts as general but already full, adds 0 useful hours", California "doesn't count: no CEP number". Nothing counts until the nurse chooses.
- [ ] F13: "Save for Florida only" adds an 8th certificate marked Self-reported (Home's conference alert disappears; California stays 18/30). "Ask provider for a California CEP number" shows an editable drafted message with a clear "Not sent" note; approving it sends nothing.
- [ ] F14: BLS 4 steps: online part ("Leaving Rounds" note, simulated return with 92%) → pick one of 3 sessions → booked → "Instructor pass (simulated)" → new eCard valid to the end of the month two years out; Home's BLS alert then says renewed.
- [ ] Exactly one primary action per screen or step; anything simulated carries a visible label; numbers in Geist Mono; no sideways scroll.

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
- Anything would be sent outside the app (it never is: drafts only).

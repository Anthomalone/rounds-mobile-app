# Plan: F1 app skeleton, sample data, rules engine, Rules & sources

## Goal
The Expo app opens on a phone or in a browser with the Rounds look, three bottom tabs, and a Rules & sources screen. Under the hood it holds Jordan's sample data and the Florida / California rules engine that every later screen uses.

## Feature
F1: Jordan's sample data and the Florida and California rules are in the app, and a "Rules & sources" screen lists each rule with its source link and "checked 21 Nov 2026".
Done check: I open Rules & sources and see the Florida and California rules, each with a tappable source link and the date 21 Nov 2026.

## Steps
1. Expo app at the repo root from the SDK 58 template, trimmed to our own files; scripts `typecheck`, `lint`, `test`; CI workflow from `ci-mobile.yml` plus a test step. Result: `npm run typecheck` and `npm run lint` pass.
2. Design tokens (`src/theme.ts`) from handoff section 10, Geist and Geist Mono fonts, and basic parts (Card, Pill button, Chip, Screen). Result: the app renders on the grey canvas in Geist.
3. Sample data (`src/data/`): rules with source links and check date, providers, catalog, Jordan's seven certificates, Medical Errors course content, BLS sessions, sample outside certificate. All copied from the handoff, nothing invented.
4. Rules engine (`src/logic/`): Florida status, California status, shortest path, counts-toward labels, days left. Unit tests with Node's test runner. Result: `npm test` shows Florida 20/24, California 18/30, path 4 courses 12 h.
5. App state (`src/store.tsx`): one React context holding certificates and course progress, kept in memory (a reload starts the demo fresh).
6. Navigation: bottom tabs Home, Courses, Certificates (placeholders for now) and a Rules & sources screen reached from Home. Result: tabs switch; Rules & sources lists every rule with its source link and "Checked 21 Nov 2026".

## Files
`package.json`, `app.json`, `tsconfig.json`, `eslint.config.js`, `.github/workflows/ci.yml`, `assets/`, `src/theme.ts`, `src/components/*`, `src/data/*`, `src/logic/*` (+ tests), `src/store.tsx`, `src/app/_layout.tsx`, `src/app/(tabs)/*`, `src/app/rules.tsx`.

## Checks
- `npm run typecheck`, `npm run lint`, `npm test`, `npx expo-doctor`, `npx expo export --platform all --output-dir dist` all pass.
- `npm test`: Florida 20/24 with Medical Errors and Impairment missing; California 18/30; shortest path = Medical Errors, Impairment, High-Alert, Delirium = 4 courses, 12 h; after adding a Medical Errors certificate Florida is 22/24 and the path has 3 courses.
- In the browser at phone width: three tabs at the bottom; Home has a "Rules & sources" link; that screen shows Florida RN (24 h), Florida reporting and providers, California RN (30 h), who can award contact hours, BLS, each with a source link that opens the official page, and "Checked 21 Nov 2026".

## What could break
The rules engine is what every later number depends on; the unit tests pin the handoff's numbers so later features cannot drift.

## Not doing
Home tiles, course flow, certificates, BLS (later features). No saving between app launches, no sign-in, no Manager or Spec view.

## Questions
None. Platform (Expo) and in-memory state follow the decisions of 21 Nov 2026.

## Changes from the plan
- Courses other than Prevention of Medical Errors will use the web prototype's "Complete module (demo shortcut)", so no new course content is invented (answers PRD open question 6).
- Tab bar imports from `expo-router/js-tabs` (SDK 58 API: `navigateToTab`).

## Verification
- `npm run typecheck`: pass. `npm run lint`: pass. `npm test`: 10/10 pass (Florida 20/24 with Medical Errors + Impairment missing, California 18/30, path 4 courses 12 h, after Medical Errors 22/24 and 3 courses, complete path recommends nothing).
- `npx expo-doctor`: 20/20 checks passed. `npx expo export --platform all`: done.
- Browser at 375 wide: three tabs at the bottom; Home → Rules & sources shows all six rules with source links and "Checked 21 Nov 2026".
- Plan step 5 said the store would also hold course progress; progress state arrives with F7 (lesson reader), where it is first used (codex #7).

## Codex review

Round 1, `VERDICT: FINDINGS(9)`. Decisions by Anthony, 21 Nov 2026.

| # | Severity | Finding | Decision |
|---|---|---|---|
| 1 | BLOCKER | `npm test` fails on Node 24 (CI) when given a folder | Fixed: test script uses `src/logic/*.test.ts` |
| 2 | MAJOR | Path said complete when no course was left even if a requirement was open | Fixed: complete only when Florida and California are complete; uncovered gaps listed; test added |
| 3 | MAJOR | Certificates from earlier cycles still count | Dismissed: handoff logic (section 6) defines no cycle start; filtering would drop California from the agreed 18/30 and invent a rule |
| 4 | MAJOR | California credit comes from the certificate flag, not the provider | Dismissed: same data model as the handoff and web prototype; the flag is set from the provider in seed data and the upload flow |
| 5 | MAJOR | Same certificate added twice counts twice | Fixed: store ignores a repeated id or course |
| 6 | MAJOR | Hours could be NaN | Dismissed: hours never come from user input, only fixed sample data |
| 7 | MINOR | Store has no course progress yet | Fixed in the plan: progress arrives with F7 |
| 8 | MINOR | Compact claim without a source link | Fixed: own rule linked to the Nurse Licensure Compact member map. The page loads; the state list is an interactive map, so California's non-member status still needs one human look |
| 9 | MINOR | Source-link test passes with zero rules | Fixed: asserts the expected rule ids and official source hosts |

Round 2, `VERDICT: FINDINGS(4)`. Decisions by Anthony, 21 Nov 2026: fix all four.

| # | Severity | Finding | Decision |
|---|---|---|---|
| 1 | MAJOR | `updateCert` could change an id and bypass the duplicate check | Fixed: replaced by `markReported`, the only change the app makes |
| 2 | MAJOR | California card presented the CEP-only filter as the full state rule | Fixed: card says "Simplified for the demo" and points to the BRN page |
| 3 | MINOR | Domestic Violence tagged as required while not due | Fixed: only topics due this cycle are required; test added |
| 4 | MINOR | "Member map" link opens the Compact home page | Fixed: relabelled "Nurse Licensure Compact (official site)"; test renamed. California's status still needs one human look |

Stopped after round 2: every finding fixed; remaining rounds would only re-check these small edits.

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

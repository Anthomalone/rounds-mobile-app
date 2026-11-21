# Rounds mobile app

Project type: app (follow the course workflow: /brief → /plan → /build → /codex-review → /pr).

## Context
Mobile version of "Rounds", a license and continuing-education (CE) renewal app for US nurses, first built as a web prototype for a DistantJob interview (AI-first EdTech PM role, client serves licensed healthcare professionals).

Everything known so far is in `rounds-handoff.md`: concept, real state rules with sources, screens, logic, sample data, user stories with acceptance criteria, design system, and the full web prototype source (appendix). Read it before /brief.

## Rules for this project
- Made-up people, providers and numbers only. No real nurse data.
- State rules must keep their source link and verification date; never invent a rule.
- Certificate reading (AI) and CE Broker reporting stay simulated unless a plan says otherwise, and are labelled as simulated in the spec.
- Nothing is ever sent (reminders, provider requests) without the user's approval in the app.

## Lanes (from 21 Nov 2026)
Built in lanes. "Chief Architect" owns shared files and checks every lane pull request; lanes change only their own files. Lane briefs: `docs/lanes/`.

| Folder or file | Owner |
|---|---|
| `src/store.tsx`, `src/theme.ts`, `src/components/ui.tsx`, `src/components/gauge.tsx`, `src/lib/`, `src/logic/`, `src/data/` | Chief Architect |
| `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`, `src/app/(tabs)/index.tsx` (Home), `src/app/rules.tsx` | Chief Architect |
| `package.json`, `package-lock.json`, `app.json`, `tsconfig.json`, `eslint.config.js`, `.github/`, `.gitignore`, `docs/`, `design/`, `CLAUDE.md` | Chief Architect |
| `src/app/(tabs)/courses.tsx`, `src/app/courses/`, `src/app/learn/`, `src/components/course/`, `plans/lane-a-*.md` | Lane A |
| `src/app/(tabs)/certificates.tsx`, `src/app/certificates/`, `src/app/bls.tsx`, `src/components/certificates/`, `src/components/bls/`, `plans/lane-b-*.md` | Lane B |

Ports (Expo dev server): main 8081, Lane A 8082, Lane B 8083 (`npx expo start --web --port 8082`).

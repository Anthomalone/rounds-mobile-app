# Design brief: Rounds mobile app

For: the coding agent (Claude Code). From: Anthony Malon. Date: 21 Nov 2026.

Decision (21 Nov 2026): Claude Design is skipped for v1. The look is taken from the existing web prototype (`web-prototype-index.html`, design system in `rounds-handoff.md` section 10), adapted to a phone. This brief records what must hold on every screen.

## What this is and who uses it

Rounds tells a US nurse what is left for each license renewal and the shortest way to finish it, and lets her take Rounds' accredited courses on her phone between shifts. Concept product with made-up people, providers and numbers.

The one person it is for: Jordan Reyes, RN (made up), a travel nurse with a Florida multistate license and a California license, who wants to know which courses count for both.

## Read these first

- Screen map: `docs/ux/screen-map.md`
- Design system: `rounds-handoff.md` section 10 (tokens, components, colour convention).
- Reference build: `web-prototype-index.html` (the phone layout at 390 wide, with its floating bottom tab bar). Take the tokens, tiles, chips, gauges and hatching; not the desktop sidebar or the Manager and Spec views.

## Screens to design

- `/` Home
- `/courses`, `/courses/[id]` Courses
- `/learn/[id]` Lesson, post-test, evaluation, certificate
- `/certificates`, `/certificates/add` Certificates and Add certificate
- `/bls` BLS renewal
- `/rules` Rules & sources

## Rules that cannot bend

1. One primary action per screen (or per step of a flow), drawn as the black pill button.
2. Every screen has its empty, loading and error states.
3. Mint always means Florida, lavender always means California, black means the action or the headline number. No other colour stands for a license.
4. Anything simulated (AI certificate reading, CE Broker reporting, BLS instructor pass, PDF downloads) carries a visible "Simulated" label on the screen where it happens.
5. All numbers (hours, days, scores, dates) are set in Geist Mono; nothing scrolls sideways at 390 wide.

## Words to use (and never use)

Use: license, renewal, contact hours, required topic, shortest path, counts toward, certificate, CE Broker, provider, CEP number, BLS card / eCard, skills session, post-test, evaluation, Self-reported, Reported by Rounds.

Never use: credits (say contact hours), CEUs, units, "submit to the state" (Rounds reports to CE Broker), "verified" for an outside certificate (it is "checked against the rules").

## Sample content

From `rounds-handoff.md` section 7, unchanged: Jordan Reyes, Florida 20/24 h due 30 Apr 2027, California 18/30 h due 31 Aug 2027, BLS card expires 31 Jan 2027, Rounds Learning and Harbor Health Learning as providers, Antimicrobial Stewardship as the sample outside certificate. US dates and US English. (This is a US product, so the course's usual AED/UAE sample rule does not apply.)

## You decide

Spacing and the phone layout of each tile, within the tokens above. Any departure from the web design system gets one line in the plan that introduces it.

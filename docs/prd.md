# PRD: Rounds mobile app

For: Anthony Malon, as a portfolio piece for the DistantJob interview (PM, AI-First EdTech; the end client runs a learning platform for licensed healthcare professionals). Written: 21 Nov 2026. Source: `rounds-handoff.md` (web prototype at https://license-renewal-demo.vercel.app, source in its Appendix A and `web-prototype-index.html`).

## The client

A US company (not named) that runs a learning platform for licensed healthcare professionals who must keep their licenses and certifications up to date. Rounds is a made-up concept product built to show how that platform could work. In Rounds' story, Rounds Learning is the accredited provider of its own courses (ANCC, Florida Board, California CEP), so it issues certificates and reports to CE Broker.

## The problem

US nurses renew their license every two years with a set number of contact hours, and some states require specific topics. Rules differ by state and change over time. Nurses with more than one license (for example travel nurses) track it by hand, and some only discover a missing topic at renewal. Nurses check this between shifts, so the phone is the natural home for the nurse side.

Goal: every nurse knows, at any moment, what is left for each license and the shortest way to finish it.

## Who uses it

- **Jordan Reyes, RN** (main persona, made up): travel nurse with a Florida multistate license and a California license. Takes courses on her phone between shifts. Wants to know which hours count twice.
- **Priya Natarajan** (made up): staff nurse with one Florida license. Has "enough hours" but misses a required topic and finds out late.
- **Carla Mendes** (made up): nurse manager, 4 West Med-Surg, 12 nurses. The handoff suggests the manager view stays on web/tablet (see Open questions).

## What it must do (app projects only)

The nurse side of the web prototype, on a phone, with the same logic (handoff section 6), sample data (section 7) and acceptance criteria (section 8).

1. See each license's progress (Florida, California) with hours done, hours needed, deadline and days left, and each missing required topic by name.
2. See one shortest path across both licenses: which courses to take, in what order, and which license each one counts toward.
3. Browse the course catalog and open a course's details (provider, accreditation, contact-hour calculation, outcomes, syllabus).
4. Take a course: read the lessons, pass a post-test (80%), fill in the evaluation, get a certificate, and see it reported to CE Broker (simulated).
5. See all certificates with where each counts and its reporting status.
6. Add a certificate from another provider: AI reading (simulated) with confidence levels, rule checks per state, and a choice to save it for Florida only or draft a request to the provider (never sent without approval).
7. Renew BLS: online part, pick a skills session, instructor pass (simulated), new eCard.

## How the client will judge it (app projects only)

From the user stories in the handoff (US-1 to US-3):

- With Jordan's starting data, Home shows Florida 20/24 and California 18/30, names Prevention of Medical Errors and Recognizing Impairment as missing even though general hours are full, and the path says "4 courses · 12 h".
- After finishing a course, progress and the path update without restarting the app.
- The post-test stays locked until every section is done; below 80% gives no hours and allows a retake with feedback on each answer.
- An outside certificate with no California CEP number is flagged as not counting for California, with the reason, and nothing counts until the nurse confirms.
- A provider request is drafted and never sent without approval.

## Constraints

- Phone first, built with Expo / React Native (decided 21 Nov 2026). Shown in Expo Go on a phone and in a web browser at phone width.
- Made-up people, providers and numbers only. No real nurse data. License numbers masked in the UI.
- State rules keep their source link and the verification date (21 Nov 2026); no invented rules.
- AI certificate reading and CE Broker reporting stay simulated and are labelled as simulated.
- Nothing is ever sent (reminders, provider requests) without the user's approval in the app.
- Same design system as the web version (handoff section 10): mostly white and grey, mint = Florida, lavender = California, black = action or headline number; Geist and Geist Mono.

## Not in this version

real board or CE Broker integrations, states beyond FL and CA, live AI certificate reading, paying for courses, specialty certifications (e.g. CCRN).

## Data

All sample data from handoff section 7, kept on the device: providers, the Rounds Learning catalog, Jordan's seven completed certificates, the sample outside certificate, BLS skills sessions, and the Prevention of Medical Errors course content and post-test. State rules from handoff section 4, each with its source link. No backend and no accounts, same as the web prototype.

## Open questions

1. ~~Platform~~ Decided 21 Nov 2026: Expo / React Native.
2. ~~Manager view~~ Decided 21 Nov 2026: later; stays in the web prototype for v1.
3. **Spec view:** the web prototype has a Spec tab (user stories, ticket, rules and sources). Does the mobile app need it, or is a "Rules & sources" screen enough? I have kept only the rule sources inside the app.
4. ~~Mobile-only extras~~ Decided 21 Nov 2026: all later.
5. **Saved progress:** should course progress and new certificates stay after closing the app, and should there be a "reset demo" button for interviews?
6. **Which courses are playable:** the handoff has full content only for Prevention of Medical Errors. Do the other catalog courses need lessons too, or a short "demo: mark as complete" step?

# Decision

Author: opencode/designer subagent. Date: 2026-11-08. Session: local.

**A, instrument-led.** For a skeptical reader: counters in the first screen, a lead card carrying the real manifest, four cards with counts, a working cards/table switch, the A to D grade scale. Costs warmth: the five read as index entries and the table view drifts toward dashboard cosplay.

**B, narrative-led.** Optimises for the argument: one large artifact (six rounds in four days, none in July, one in August), a verbatim quote from the round-5 review, then five rows with claim, evidence and what each shows. Costs proof: the manifest and grade scale sit lower or not at all.

**Ship A.** The round-5 null result sits inside the lead card, so the instrument does not read as a boast. The brief asks for proof of a frontier position, and A puts an openable artifact in the first two screens. B reads better and is the right pattern for the investigation pages.

Numbers: 5 investigations, 7 arena rounds (28 Aug 2026), 29 systems (17 Jul 2026), 104 topic maps, 73 products, 30 channels, 48 source records (2 Oct 2026), 4 phases, grades A to D. Files: `featured-investigations.ts`, `arena-receipts/*.json`, `agentic-life-market.json`, `topic-maps.public.ts`, `economy-atlas.json`, `the-light-within/page.tsx`.

No `[?]` renders. Two unknowns were avoided instead of faked: the prose investigations publish no review date, so the table shows grade or source range; the brief's 99 held-back maps and the registry's 104 entries disagree, and the page uses 104.

Verification: `browser-qa` preflight returned HOLD (5.9 GB against an 8 GB floor), `interactive` returned ALLOW. I ran single-shot headless Chromium captures at 1440 and 375 for both comps, plus the table view and both mobile figures. No click-through or Tab walk; focus styling checked in CSS only. Focus, 44px targets, heading order, contrast and reduced motion were self-checked.

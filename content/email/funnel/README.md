---
funnel: build-first-ai-agent
sequence: six-primitives-primer
trigger: subscription to courses-waitlist with stream=six-primitives-primer
---

# Six Primitives Primer — 10-day email course

A daily-cadence drip course for free Primer subscribers. Each email teaches one
primitive with a code sample, a concrete exercise, and one short case study.

## Sequence overview

| Day | Subject | Primitive | Soft CTA |
|---|---|---|---|
| 0 | Welcome — your handout is in the next email | — | Confirm download |
| 1 | What separates an agent from a chatbot | (foundation) | Reply with your stack |
| 2 | Primitive 1: Model | model | — |
| 3 | Primitive 2: Tool | tool | — |
| 4 | Primitive 3: Memory (and why it's three primitives in disguise) | memory | — |
| 5 | Primitive 4: The Loop | loop | First mention of €7 Pack |
| 6 | Primitive 5: The Spec — your Agent Card | spec | — |
| 7 | Primitive 6: Deploy | deploy | — |
| 8 | Real example: shipping a research assistant in 90 minutes | (synthesis) | Workshop reminder |
| 9 | The transfer matrix — what changes between stacks | (mastery preview) | €7 Pack offer (gentle) |

## Voice rules

- Each email opens with a one-sentence hook.
- One concrete code sample per email (TypeScript).
- One named exercise the reader can do in 10 minutes.
- One short case study (real or composite — labeled honestly).
- Soft CTA only on Day 5 and Day 9. Day 5 = first mention. Day 9 = explicit but understated.
- Sign-off: "— Frank" — not Frank Riemer / FrankX / your AI assistant.
- 600-900 words per email. Reading time stated.

## What never appears

- Manufactured urgency ("only 24 hours")
- Personal-attack hooks ("are you still struggling with...?")
- Caps-lock subject lines
- More than two CTAs in one email
- "Unsubscribe" treated as anything other than friendly

## Files in this folder

- `00-welcome.md` — sent immediately after signup
- `01-foundation.md` ... `09-transfer-matrix.md` — daily emails

These are MARKDOWN SOURCE files. Frank converts to whichever email service
(ConvertKit / Resend / Postmark) is selected. Subject line, preheader, and
body are clearly separated.

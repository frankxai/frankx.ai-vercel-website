# Evidence — /tools rebuild (PR #596)

Receipt for the `/tools` information-architecture rebuild and the review fixes
requested on PR #596. Captures and audits below were produced against the PR
head on a local dev server (`pnpm dev`, dark scheme, deviceScaleFactor 1) on
2026-08-30 (`2026-08-30T15:49Z`), after merging `main` (through #617) and
promoting the AI System Builder to the live instruments per #616 — the
captures show four live instrument rows.

## Captures

| File | State | Width |
|---|---|---|
| `tools-before-1440.png` | Before the rebuild (commit `11e912d` era page) | 1440 |
| `tools-after-375.jpg` | After rebuild + review fixes | 375 |
| `tools-after-768.jpg` | After rebuild + review fixes | 768 |
| `tools-after-1440.jpg` | After rebuild + review fixes | 1440 |

The red "2 issues" badge visible in captures is the Next.js dev overlay
(unconfigured auth env in the capture environment), not page content.

## Automated audit results (Playwright against the same build)

Sentence-case contract — computed `text-transform: uppercase` elements inside
`<main>` on /tools:

| Width | Uppercase elements | Horizontal overflow |
|---|---|---|
| 375 | 0 | none (scrollWidth 375) |
| 768 | 0 | none (scrollWidth 768) |
| 1440 | 0 | none (scrollWidth 1440) |

Keyboard walk at 1440 (60 Tab presses, recording every stop inside `<main>`):
19 of 19 main-content stops showed a visible focus indicator (computed
`outline-style` solid with non-zero width, from the `focus-visible:outline`
classes). No main-content stop lacked one.

## Stack link-verification attempt (why /stack copy stays undated)

An automated reachability check of all 32 outbound stack URLs was attempted
from the working environment on 2026-08-30. The environment's egress policy
blocked it: 27 URLs returned no connection (proxy-blocked) and 5 returned
bot-403s. Zero links were verifiably checked, so no "reviewed" date is
claimed on /stack; the page states its curation date (April 2026) instead.
A real re-review can replace that with a dated receipt later.

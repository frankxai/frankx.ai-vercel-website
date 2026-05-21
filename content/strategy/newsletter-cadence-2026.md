# Newsletter Cadence — 2026

**Last reviewed:** 2026-05-20
**Owner:** Frank Riemer
**Substrate:** `lib/newsletter.ts` (streams) + `content/newsletters/issues/` (single weekly issue)
**Runtime:** `/newsletter-week` command + `@integrity-guard` gate + Resend MCP

---

## The model

One newsletter issue ships every Friday at 11:00 CET. Issue 1 is the first issue of the new era (2026-05-22). The prior 6-stream architecture in `content/newsletters/{daily,inspiration,themes}/` remains live as a separate substrate; the weekly issue lives at `content/newsletters/issues/`.

## The structure

Every issue has three sections in fixed proportion:

| Section | Share | What goes here |
|---|---|---|
| **Spotlight** | 60% | One story — a shipped surface, a research brief, a strategic frame. Connects to an active forcing function. |
| **Receipts** | 25% | 2-3 short specific wins, case studies, or artifacts from the week. |
| **Toolkit** | 15% | One actionable thing the reader can do this week. |

## The week

```
MON   /newsletter-week pick     → theme + angle locked
TUE   /newsletter-week draft    → 800-1200w
WED   /newsletter-week gate     → @integrity-guard + /seo-check
THU   Frank review              → final edit pass
FRI   /newsletter-week schedule + send
      Resend triggers 11:00 CET
      /newsletter-week archive  → /newsletter/archive/issue-{n}
```

## The voice

Inherits canonical brand voice from `lib/voice/frankx-voice.ts`. Newsletter-specific overlays:

1. **Greeting** — none. No "Hey friend" / "Dear reader". Open with the spotlight directly.
2. **Tense** — past tense for receipts (what happened), present for strategic frames (what's true), future for forcing functions (what's coming).
3. **Sign-off** — "—Frank" on its own line. No best, no exclamation, no talk-soon.
4. **P.S.** — Allowed when the postscript adds a specific receipt, CTA, or invitation. Disallowed as a generic close.
5. **Links** — Prefer markdown link `[anchor text](url)` over bare URLs. Anchor text describes destination ("Inner Circle waitlist") not "click here".

## The CTA

One primary CTA per issue. Optional secondary if it's complementary (e.g. primary = Inner Circle, secondary = newsletter-related OSS). Never more than two. CTAs route to one of:

- `/inner-circle` (June 1 launch — primary gravity)
- `/newsletter` (subscription growth)
- `/waitlist?ref={issue}` (catch-all)
- One of the hubs (`/library`, `/studio`, `/research`, `/workshops`)
- An OSS repo

## The cross-post discipline

Each issue's frontmatter declares `crossPost: true|false`. When true:
- The Spotlight section becomes a standalone `/blog/` post 7 days after send.
- Frontmatter `connectsTo:` field becomes internal links in the blog post.
- This is `/traffic-week` lever 5 ("newsletter cross-post") executed automatically.

When false (default for first 4 issues), the issue lives only at `/newsletter/archive/issue-{n}`. Decide cross-post on issue-by-issue basis.

## The metrics that matter

Reviewed every Sunday `/palace`:

1. **Open rate** — target >40% (Resend dashboard). 30% triggers review.
2. **CTA click rate** — target >5% on primary CTA. <2% triggers CTA rewrite.
3. **Unsubscribe rate** — target <0.5% per issue. >1% triggers voice + frequency audit.
4. **Reply rate** — target >1% (any reply is a high-signal event for solo creator). Each reply gets a personal answer within 48h.

## What doesn't go in the newsletter

- AI news roundups (Substacks do this already, and better)
- Generic productivity advice
- Tutorials (those live on `/blog/`)
- Cross-posts of social content (that's `/content-ops`'s job)
- Anything that wasn't gated by `@integrity-guard`

## The cancellation discipline

If two consecutive issues miss the Friday send, the cadence is broken. Recovery sequence:

1. **Issue N+1** — explicit acknowledgment in spotlight ("I missed the last two Fridays — here's why and what changed")
2. **Pause the cadence** for 1-2 weeks while the underlying loop issue is fixed
3. **Restart** with renumbered issue tagged "restart" in frontmatter — never silent retroactive renumbering

The cadence is the product. Missing it is signal, not noise.

---

*Friday is a forcing function, not a hope. Issue 1 ships on time. Issue 52 ships on time. The cadence is the product.*

# Backlog — sonnet5-content-swarm, 2026-07-01

Full leak-scan findings: `docs/plans/2026-07-01-leak-scan-findings.md` (892 files scanned, 298 jargon hits across 87 files, 34 unverified-claim hits — see that file for the complete ranked table).

## Fixed tonight (Tier 1)

- `app/research/model-arena/page.tsx`, `data.ts` — internal jargon removed, Sonnet 5 added, real eval round run
- `components/research/ThreeArenaScene.tsx`, `TaskRoutingPlayground.tsx` — jargon removed, Sonnet 5 added as default
- `lib/research/domains.ts` — jargon removed from research-hub data layer
- `content/blog/claude-fable-5-analysis-2026.mdx`
- `content/blog/claude-fable-5-prompting-guide.mdx`
- `content/blog/llm-evals-claude-code-guide.mdx`

## Needs Frank's decision (not a copyediting call — strategic/brand)

**"SIP" (Starlight Intelligence Protocol) branding — 102 hits across 35 files**, including a dedicated landing page (`app/starlight-intelligence-system/page.tsx`), a badge component (`components/sis/SIPBadge.tsx`), a sister page (`app/ana-intelligence-system/page.tsx`), and a downloadable "SIP Starter" kit (`app/downloads/DownloadsClient.tsx`). Unlike the Model Arena leak, this isn't obviously accidental — it reads like a deliberate open-protocol product positioning. Rewriting or removing it unilaterally would touch a working page with its own URL, possible backlinks/SEO equity, and a real download product — exactly the kind of "never rename working URLs, never consolidate by deletion without approval" call this repo's own CLAUDE.md reserves for Frank. Options as I see them, not a recommendation:
1. Keep as-is — it's an intentional protocol/brand play, not a leak.
2. Keep the substance, add a one-sentence plain-English gloss the first time "SIP" appears on each page (cheap, safe, doesn't touch the product).
3. Simplify/consolidate — bigger job, needs a real content/brand decision first.

## Tier 2 — remaining jargon hits, ranked (from full scan, not yet touched)

- `app/starlight-intelligence-system/page.tsx` (9 hits) — blocked on the SIP decision above
- `app/ana-intelligence-system/page.tsx` (5 hits) — same
- `app/chronicle/page.tsx` (4 hits) — same
- `app/downloads/preview/agentic-creator-os/page.tsx` (6 hits), `app/downloads/DownloadsClient.tsx` (4 hits) — same
- `components/research/ThreeArenaScene.tsx` receipt-viewer copy — already fixed tonight; double-check no other components render the old `RECEIPT_LOGS` governance-trap text elsewhere on the site (single-source in page.tsx, should be fine)
- `.claude/commands/grok.md`, `.claude/skills/swarm-orchestration/SKILL.md` — internal-only, not public-facing, no action needed unless linked from a public page (spot-check `content/download-kits/ahmad-founder-creator-kit/`, `app/friends/ahmad/page.tsx` — both reference "SIS/SIP" and "ACOS, Codex, Claude, OpenClaw" — low-stakes personal friend-page context, low priority)

## Tier 3 — full blog audit not yet done (~198 of 201 posts)

Tonight covered the 3 posts the leak-scan flagged as worst offenders, plus every cornerstone research/model surface. The other ~198 posts were leak-scanned (mechanical, full coverage) but not given a deep SEO/AEO/voice rewrite pass — that was explicitly out of scope for one night per the tiered-priority decision. Two came back with real (sourced) claims correctly passing the unverified-claims check; one (`content/blog/08-golden-age-of-intelligence.mdx`) has an unsourced "Fortune 500 financial institution" case-study reference flagged as **possibly invented** — worth a direct look, since it reads as a hypothetical example presented as a real client story.

Also found: a newer Model Arena round (`2026-06-12-grok-composer25-model-lane.json`) already exists in the Starlight-Intelligence-System substrate repo's `tools/arena/runs/` but isn't reflected in this site's `ROUNDS` array yet — a fast-follow, not tonight's scope (that repo has its own live agent mid-work; didn't touch it).

## Suggested next session

1. Frank decides the SIP question above.
2. Full deep-rewrite pass on remaining blog posts, prioritized by traffic/backlinks if that data is available (didn't have it tonight).
3. Reconcile the missing Grok Composer 2.5 round into the website's Model Arena.
4. Spot-check `content/blog/08-golden-age-of-intelligence.mdx`'s Fortune 500 case study claim.

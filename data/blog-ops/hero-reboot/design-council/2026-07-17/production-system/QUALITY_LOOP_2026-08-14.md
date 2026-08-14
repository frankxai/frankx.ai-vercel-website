# Quality Loop — Decision Instrument v3
**Date:** 2026-08-14  
**Scope:** FrankX article hero for `production-agentic-ai-systems`  
**PR:** https://github.com/frankxai/frankx.ai-vercel-website/pull/473 (draft)  
**Checker posture:** maker ≠ sole judge; independent subagent also dispatched (`deleg_a73370bd`)

## Creative vision (locked for this article)

> Show the reader, before the scroll, that production agentic AI is a **maturity choice**, not a race to multi-agent platforms — and that **most teams should stay at Tier 1–2**.

That vision is **meaningful** and matches the article’s TL;DR, maturity section, and famous line: *Don’t hire a symphony when you just need a DJ.*

## What we are doing (and not doing)

| Doing | Not doing |
|---|---|
| Replace generic fake “ops center / AI dashboard” hero (v2) | Another generated robot / cyan void / hardware catalog |
| Lead with article argument as poster-grade editorial graphic | Decorative scene with no decision |
| Exact deterministic type (local fonts, Edge render) | Image-model text |
| Draft PR + quality gate before merge | Silent production ship |

## Evidence checked

1. Article front matter + body argument (music/producer metaphor throughout).
2. Scene brief / provenance package.
3. Final assets: hero, OG, portrait, story + 320px thumbs.
4. Comparison to **v2** hero: sci-fi multi-monitor agent control room (generic AI atmosphere; **does not** state the maturity recommendation).
5. In-page production build preview: `http://127.0.0.1:4398/blog/production-agentic-ai-systems`
6. CI on PR 473: CI / Contract Guard / Media Guard / Merge Gate green.

## Meaning assessment

**Does it make sense?** **Yes.**

- 1-second read on hero: stop overbuilding; start simple (**DJ not symphony**).
- 2-second read: **most teams = 01–02**, four-tier ladder visible.
- That is exactly the article’s critical insight (“Most of you should be rocking Tier 1 or 2”).

**Medium choice:** Correct for this piece. A photograph or robot scene cannot carry a four-tier decision as cleanly. Deterministic editorial is the right medium.

## Craft assessment

| Check | Result |
|---|---|
| Exact type / no AI text garbage | PASS |
| Hierarchy (thesis → 01–02 → tiers) | PASS |
| Thumb 320px retains thesis + 01–02 | PASS |
| OG carries title + thesis + tiers | PASS |
| Better than v2 for meaning | Strong PASS |
| Anti-slop (no fake UI / robots) | PASS |
| Brand resonance (FrankX vs consulting deck) | WEAK / MIXED |
| In-page first screen density | WEAK |
| Redundancy with in-body maturity SVG | NOTED |

## In-page composition (real route)

Order today:

1. Long H1: *Enterprise Agentic Architecture: Decision Framework for Production*
2. Deck description
3. Author row
4. Hero poster (thesis + 01–02 + tiers)
5. Reading goal

**Issue:** First screen is information-heavy. H1 already says “Decision Framework”; hero then sells the same framework as a slide. Not broken — but not yet elite calm editorial pacing. The hero *does* add what H1 lacks: the **01–02 stop rule** and the ladder.

**Body already contains** a Decision Framework diagram and a Four-Tier Maturity Model diagram. Hero is a **compressed poster of the maturity insight**, not a unique third diagram system. That is acceptable if the hero is the *hook* and body diagrams are the *teach* — but it must feel like FrankX voice, not a McKinsey cover slide repeated three times.

## Brand / taste

- Visual system (void black, emerald signal, clean type) is competent and on-site.
- Risk: reads as **premium product marketing / consulting maturity model**, while the *writing* is producer/studio/music.
- The only music in the hero is the metaphor line. No producer craft in the visual grammar itself.
- Label **DEFAULT EDGE** is insider; may read as jargon to executives.

## Independent subagent

Dispatched for KEEP/ITERATE/KILL. This file is the chair synthesis from direct inspection + in-page preview. If subagent diverges hard, amend before merge.

## Scores (chair)

| Dimension | Score | Note |
|---|---:|---|
| Meaning | **8/10** | Argument is right |
| Craft | **7.5/10** | Clean, reproducible; not yet distinctive |
| Brand resonance | **5.5/10** | Correct system, thin FrankX soul |
| In-page integration | **6/10** | Works; dense; slightly redundant |
| Ship readiness | **6/10** | Draft OK; not founder-final |

## VERDICT: **ITERATE** (do not merge as final; do not kill direction)

### Why not KEEP
Direction is right, finish is not yet founder-grade or brand-grade.

### Why not KILL
v2 is worse for meaning. Medium is correct. Core claim is true to the article. Technical package is real (CI green, preview works).

### Top 3 iterate moves (ranked)

1. **Make the first read feel like FrankX, not a deck.**  
   Keep the decision instrument structure, but inject one unmistakable producer/editorial move (e.g. quieter composition, less “framework poster chrome,” less badge noise, stronger single thesis emphasis, optional subtle studio metaphor that is *not* a fake UI).

2. **Resolve first-screen redundancy.**  
   Options (pick one, don’t do all): shorten H1 on this article; make hero purely the thesis + 01–02 (drop tier chrome from website crop, keep tiers on OG); or demote body maturity SVG if hero becomes the canonical ladder.

3. **Kill jargon, tighten labels.**  
   Replace or explain **DEFAULT EDGE**; ensure 01–02 clearly maps to Tier 01–02 without double numbering confusion.

## Founder decision needed

Reply with one:

- **A — Iterate path:** keep Decision Instrument direction; apply top 3 before ready-for-review  
- **B — Keep as-is:** you accept consulting-poster tone; mark PR ready after tiny jargon fix only  
- **C — Kill direction:** abandon instrument; new concept board (still no robot catalog)

## Explicit holds

- No merge / production deploy from this quality loop  
- Local preview server was for QA only  
- Your taste overrides CI green

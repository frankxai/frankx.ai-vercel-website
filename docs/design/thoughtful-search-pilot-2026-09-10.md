# Thoughtful Design pilot: music search destinations

Status: implemented on a local branch; not deployed or browser-verified after the change.

## Context and evidence

- Task: distinguish listening, music research/tooling, release operations, a production agent pack, and browser instrument practice from site-search results.
- Source baseline: `e8b8240b073dc359bc3e2546020e21e5fd5f96b8`.
- Applied the new `thoughtful-design` and `experience-audit` skills from `frankxai/starlight-design-intelligence` in separate source-review and verification passes. This is self-review, not independent verification.
- A previous live-browser observation supplied the problem. This pilot inspected source and executed search logic; it did not independently repeat that browser journey. Source knowledge would contaminate a subsequent claim of uninformed visitor discovery.
- Search renders descriptions from `data/route-index.json`, generated from `lib/route-enumeration.mjs`. Missing descriptions fall back to a route label followed by “on FrankX.ai”.

## Decision: clarify, preserve

| Destination | Source-baseline search description | Candidate description |
|---|---|---|
| `/music` | Music on FrankX.ai | Listen to FrankX tracks and browse playlists and releases. |
| `/music-intelligence` | Music Intelligence on FrankX.ai | Explore music research, AI agents, tools, and free Suno templates. |
| `/music-os` | Music Os on FrankX.ai | Review track readiness and release workflows in the Music OS cockpit. |
| `/agents/packs/music` | Music on FrankX.ai | Preview the music production agent pack and join its launch waitlist. |
| `/music-lab` | AI music production | Play music on browser instruments, with guided notes and rhythm games. |

Product truth comes from the destination implementation: the music page contains tracks, playlists, releases and playback links; Music Intelligence contains research and tooling links; Music OS presents a release cockpit with selected-track readiness and work still to wire; the agent pack is waitlist-only; Music Lab exposes browser instruments and guided practice. No automatic distribution, immediate pack installation, or therapeutic effect is promised.

Preserve all destination URLs, titles, route types, existing tags, visual composition, controls, keyboard behavior and ranking algorithm. The pages serve distinct purposes; merging them would erase useful depth. Adding more visual chrome to the results would not resolve their ambiguous descriptions.

The canonical route entries and committed index both change. Updating only the generated JSON would lose the correction on the next index build. No new routes are introduced.

## Verification and limits

- Existing site-search relevance/presentation suite: 8 tests passed. Covers empty and unmatched queries, exact/multiword routing, result limits, relevance order, and keyboard activation order in the presentation model.
- Executed the actual search module against baseline and candidate catalogs. The first seven results for `music` retain the same URLs and order.
- Current source results include an editorial Music Intelligence article between Music OS and Music Pack. This differs from the abbreviated prior live observation; no deployment/source equivalence is claimed.
- Checked all five descriptions agree between canonical source and committed index, each target URL occurs once, and the diff has no whitespace errors.
- Expanded checkout to all route/content source and all public assets. `pnpm run routes:build` regenerated 1,006 routes, 58 aliases, and 712 blog hero entries; both generated files exactly match the committed candidate, byte for byte.
- No preview browser, viewport, accessibility-tree, analytics, customer, or post-deployment evidence was produced by this pilot. Better comprehension is the design hypothesis, not a measured user outcome.
- Installed dependencies using the authoritative frozen lockfile; the lockfile stayed unchanged. The runtime supplied Node 24.19.0 and pnpm 11.19.0, while repository CI specifies Node 22 and pnpm 10.28.0. The pnpm override guard passed all 26 overrides.
- Repository-required `type-check` passed; `lint` passed with zero errors and seven existing warnings outside the pilot; `ai-slop:audit:strict` passed over 2,558 files with zero hits. Search tests passed again after index regeneration.
- Plain `pnpm run build` passed guards and content checks, then stopped at `sync-ais` because its optional sibling repository was absent. Retried with `CI=true`, using the explicitly supported automated-build path in `scripts/sync-ais.mjs`; this skips optional AIS emission without modifying a gate. The first CI attempt reached prerendering and exposed a CSV omitted by sparse checkout. After checking out all public assets, `CI=true NEXT_TELEMETRY_DISABLED=1 pnpm run build` passed: compilation, build-time TypeScript, all 1,428 static pages, two build-artifact integrity tests, and one rendered vault-metadata test. Build-generated timestamp churn in the vault and YouTube indexes was restored; those files are outside the pilot scope. This branch is not marked ready or deployed.

## Reusable learning

1. Indexed copy is ranking input. The first candidate removed the word “music” from Music Lab's description and lowered that result. Restoring the naturally relevant term retained the original broad-query order. Check representative queries when changing search-facing copy; visual review alone misses retrieval regressions.
2. Inspect actual availability and CTA state before making copy promises. The Music Pack metadata says “Install”, while the rendered implementation is pre-launch/waitlist. The search result should explain the current action.
3. Follow generated content to its authoring source. A thoughtful correction must survive the next build.
4. Richness can be preserved by clarifying destinations instead of collapsing them. This five-result intervention is a bounded copy/data pilot, not evidence that the full site has been audited.

Rollback: revert this pilot commit. No migration or external data change is involved.

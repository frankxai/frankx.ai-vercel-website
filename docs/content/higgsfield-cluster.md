# Higgsfield editorial cluster

Owner request: #953. Preserve all existing URLs. This release adds teaching content within the existing article/guide/learn layouts, rather than redesigning site navigation or branding.

## Canonical referral management

`data/affiliate/programs.json` is the destination authority. The CSV is a human-readable mirror; do not put independent live links in MDX. The issued URL is exactly `https://higgsfield.ai?fpr=frank-255866`. Use `ArticleRecommendation affiliateId="higgsfield"` for an explicit product recommendation with a disclosure before its CTA. Use `/go/higgsfield` for contextual referral links with an adjacent disclosure. Ordinary source-documentation links stay clean.

`getAffiliateDestination`, `AffiliateLink`, `editorialLinkRel` and `/go/[slug]` consume the shared record. Do not append tracking parameters to the issued URL. `/go/` must not prefetch. Consent-aware analytics must not interrupt navigation. The 45-day freshness guard is retained; recheck by **2026-11-24** or the resolver intentionally falls back to the clean vendor destination. Rate, cookie window and current prices are unverified. Do not infer them from an issued referral URL. The historic generic visual-asset policy is separate from editorial referral authorization.

## Reader jobs and keyword intent

These are editorial intent hypotheses, not measured search-volume or ranking claims.

| Reader job | Target query | Primary route |
|---|---|---|
| Make a first sequence | Higgsfield AI tutorial / Cinema Studio tutorial | /guides/higgsfield-ai-video-guide |
| Control a camera move | Higgsfield camera movement prompts | /guides/higgsfield-camera-movement-prompts |
| Reuse a presenter | Higgsfield Soul ID consistent characters | /guides/higgsfield-soul-id-character-consistency |
| Demonstrate a product | Higgsfield UGC product video workflow | /guides/higgsfield-ugc-product-video-workflow |
| Cut to original music | Higgsfield AI music video workflow | /guides/higgsfield-music-video-workflow |
| Decide whether to pay | Higgsfield credits pricing cost per video | /guides/higgsfield-credits-pricing-guide |
| Connect an agent | Higgsfield MCP Claude setup | /blog/ultimate-higgsfield-workflow-2026 |
| Narrate a faceless episode | ElevenLabs Higgsfield faceless YouTube workflow | /blog/using-elevenlabs-for-faceless-youtube-channels-and-higgsfield-for-b-roll |

The production guide and learning portal form the hub. Supporting comparisons and research articles link into the focused workshops. Each workshop should deliver a usable brief, prompt, matrix or budget calculation; avoid duplicating the same generic tutorial across domains.

## Media and claims

`higgsfield-media-provenance.json` records local image sources and hashes. `data/editorial-visuals.json` controls screenshot captions and attribution. Label the older interface screenshots explicitly; do not represent them as Cinema Studio 4.0. `data/editorial-videos.json` controls official supporting video. Native media is paused, uses controls and preload none; YouTube stays reader-initiated. Supporting embeds do not emit misleading watch-page schema. Check remote media availability during editorial review; the source-page link remains visible as a fallback.

Product documentation was checked October 10, 2026. Recheck specifications, pricing, integration instructions and external embeds before refreshing dates. Proposed exercises are not firsthand benchmarks. Do not restore numeric retention guarantees, model rankings, a guessed fal endpoint, or expired free MCP offers. Use real accounts and bounded paid-generation budgets for any future firsthand review.

## Release verification

Required: type-check, lint, strict prose audit, content guards, affiliate contracts, build and candidate route checks. Review the rendered hub, focused workshop, portal, mobile overflow, keyboard links, disclosures, media fallback and downloads on the exact deploy candidate. Check `/go/higgsfield` without following the redirect and with DNT to avoid creating an analytics event. Record CI/deployment identifiers in the PR, and never call the work production-verified until the canonical production domain serves the merged commit. Rollback is the platform rollback or a revert of the cluster commit through a new PR; keep URLs stable.

# Partnerships dark design candidate

Date: 17 November 2026. Implementation owner: Codex (OpenAI).
Quality ownership: [#706](https://github.com/frankxai/frankx.ai-vercel-website/issues/706).
Base: `a19bdb8e250c9b3749e789e96a585a40a9d239fc`.
Branch: `agent/codex/partnerships-dark-crew`.

## Intended outcome

A visitor can understand the collaboration offer, inspect current programme and affiliate relationships, and choose a conversation or a relevant work page. Restore the dark FrankX identity, improve official logo presentation, and reuse the original Mini Frank, Nilo, Brio and Riff sheet without changing character identity.

The selected direction is dark founder editorial. Cinematic crew treatment was reserved for smaller accents; the technical working-desk direction remains suitable for detail pages. The design stays within the existing Next.js app and adds no client component, package, paid service or deployment infrastructure. Public URLs, the calendar destination and the separate UvA proposal are preserved.

## Relationship representation

- Cloudflare for Startups: verified programme participation by Starlight Intelligence, with programme credits supporting development. No strategic alliance or joint delivery claim.
- ElevenLabs: existing active affiliate registry entry and issued link preserved.
- Apify and Riverside: active affiliate entries and exact issued links added from provider welcome/onboarding records checked on 17 November. No private email body, account identifier or billing data is included.
- Affiliate disclosure precedes referrals. The existing `/go/` resolver applies verification freshness and falls back to official destinations after expiry.
- Existing platform proposal routes remain clearly identified as proposals or exploratory conversations.

## Source and implementation

Official wordmark sources and crew-resolution limits are recorded in `public/images/partnerships/logos/README.md`. Cloudflare is identified in text. Native HTML disclosures, visible focus outlines, mobile breakpoints and reduced-motion overrides are included. Breadcrumb and collection structured data are retained.

## Validation and release boundary

The PR description records the final check results and exact candidate revision. The full production build passed with `NODE_OPTIONS=--max-old-space-size=2048 CI=1 pnpm run build`, generating 1,511 pages and passing post-build contract/privacy checks. Earlier attempts hit exit 137 (default heap) and JavaScript heap exhaustion (1 GB). Standalone type-check, lint (12 pre-existing warnings, no errors), strict copy audit and all 29 affiliate tests passed. Source review found an invisible Arrow wordmark; it now has a light-backed, correctly proportioned tile. Breadcrumb JSON-LD was also restored. A second OpenAI reviewer checked routing, claims and source accessibility; this is diagnostic review, not cross-provider release independence.

Rendered desktop/mobile verification must pass before release. The local cloud-browser attempt encountered connection failure and then a browser URL-policy denial. No visual pass is claimed. Do not substitute source inspection for rendered verification.

Next action: inspect the draft preview at desktop and mobile widths, obtain substantive review of the final head from a different model provider. No production merge or deployment is part of this candidate.

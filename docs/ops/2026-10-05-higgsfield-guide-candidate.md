# Higgsfield guide candidate

Owner: issue #900. Base: 0ff16a8dce94131601718f01e19ca1102c4d4b3d.
Routes: /guides/higgsfield-ai-video-guide and /learn/higgsfield-mastery.

## Reader and decision

A creator or marketer has chosen to explore Higgsfield and needs to select a workflow and prepare inputs before spending credits. The existing guide displayed a broken hero and made unsupported precise scores, settings and endpoint claims. Its learning path paired one claimed Higgsfield title with a Claude-course video ID.

The candidate gives the reader six outcome choices, a generated production brief, and three watch-and-apply lessons. It preserves both canonical routes. No public generation results or benchmark scores are claimed. No paid generation or third-party media download was performed.

## Three directions considered

1. Production workbench: choose an outcome, prepare inputs, copy a brief, consult a tutorial. Selected for the reader's immediate decision.
2. Video library first: tutorial player and playlist. Rejected as the lead because it delays the production decision.
3. Reading manual first: table of contents and inline tutorials. Retained as supporting content; less useful as the first interaction.

Dark background, emerald actions, existing type families, readable borders and restrained layout follow design.md/taste.md. No decorative animation was added. Native radios, inputs, select, details and buttons provide keyboard semantics. The guide and Higgsfield learning path share opt-in players that connect to YouTube only after a load action. Other learning paths retain their existing player.

## Sources and media provenance

Public checks on 2026-10-05:

- https://higgsfield.ai/academy — official learning surface.
- https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-cinema-studio — current version-specific controls and Elements.
- https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-marketing-studio-to-create-video-ads — template-first product workflow, cost display, and web-only template limitation.
- https://higgsfield.ai/mcp — official endpoint and client setup.
- https://higgsfield.ai/ads-studio — static-ad workspace reference; no exact live pricing promise.
- https://higgsfield.ai/pricing — live account verification destination; no current plan table copied.

Video titles and channels were verified using YouTube's official oEmbed response and original watch pages. Auto-generated transcripts were exported from the original watch pages to ground brief paraphrases. No transcript is republished. All videos use native YouTube embeds plus creator attribution and watch fallback links:

| ID | Creator | Learning anchor |
| --- | --- | --- |
| -vqocuhO1YE | Youri van Hofwegen | 2:47 character references; 7:22 asset preparation |
| R7GZjRMsrzM | Joshua Mayo | 3:44 image / camera / generation; 7:41 action-focused prompt |
| 2OwMjg5As2g | Higgsfield AI | 3:42 approve storyboard layout before video |

Exercises are original FrankX suggestions. The official motion-design video and the current Marketing Studio help page describe different agent-channel capabilities. The candidate directs readers to current documentation and tool discovery instead of promising template automation.

The exact user-issued referral URL is https://higgsfield.ai?fpr=frank-255866. It has a visible affiliate disclosure and sponsored relation. Analytics use the existing privacy-safe site client and send workflow/video IDs only; custom objective and brief content stay in page state. This guide uses the explicitly supplied destination; it does not alter the legacy affiliate registry or its verification rules.

## Verification and release boundary

Focused tests cover brief variation, custom objectives, exact referral preservation, portal mapping, workflow anchors, removal of duplicate h1/broken hero, and video identities. They are included in test:learning-routes.

Independent source review: verify_higgsfield, separate from maker. Review found missing focus transfer after replacing the video-load button, misleading workspace-opening copy, source-date visibility, and small-text contrast. Those findings were corrected. This is a source review; it is not a rendered accessibility or device verdict.

A current production desktop screenshot was inspected before implementation. Mobile source capture was not available through the enabled browser API. Full desktop/mobile, performance, analytics-delivery, and release-manifest evidence remain gates for public release. No scores, mobile captures, or performance numbers are invented. The local first build exceeded memory with default worker concurrency. A bounded FRANKX_BUILD_WORKERS override (1–8) leaves default deployment behavior unchanged and permits a two-worker local build without skipping type checks.

Keep the PR draft until those gates are actually met. This document is a candidate record, not a production release receipt.

## Next content tranche

Ship focused Ads Studio and pricing/credits guides only after firsthand captures and account costs are available. Link them from this guide, keeping one canonical page per intent. Add a comparison page only with a controlled, reproducible test and usable-output cost log. The existing guide and learning path are the initial hub; do not create empty indexable placeholders for the keyword backlog.

## Local check results

Type check passed. Lint passed with eight existing warnings and no errors; focused lint on changed components/routes passed. Strict copy audit scanned 2,606 files with zero hits. Learning-route suite: 19 passing tests. Affiliate suite: 17 passing tests. Full build passed with CI=1 FRANKX_BUILD_WORKERS=2 NODE_OPTIONS=--max-old-space-size=3072, with type checking enabled and 1,450 static pages generated. Build-integrated Vault rendered-metadata test passed. HTML inspection found one h1 and zero initial iframes on both Higgsfield routes; guide has six radios and the exact sponsored referral URL. Optional Redis credentials were absent locally; those warnings did not fail the build.

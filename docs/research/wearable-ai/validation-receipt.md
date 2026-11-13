# Wearable AI publication candidate: validation receipt

Date: 2026-11-13. Implementation owner/provider: Codex / OpenAI. Base: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`. Owning issue: [#1233](https://github.com/frankxai/frankx.ai-vercel-website/issues/1233). Scope: review-only editorial package and a standalone educational mock, not a production wearable runtime.

## What exists

- Article: `content/blog/samsung-google-meta-wearable-ai-founder-guide.mdx`, 3,148 body words and exactly 150 opening words at source verification.
- Appendix: `docs/research/wearable-ai/technical-appendix.md`.
- Matrix: `docs/research/wearable-ai/device-api-capability-matrix.csv`, seven distinct surfaces with verification date, sources and confidence.
- Evidence: `docs/research/wearable-ai/evidence-ledger.json`, 34 primary-source records and 29 typed material claims. Original assumptions/validation sources also appear in the portable article packet.
- Commercial/SEO/social package and implementation roadmap in the same directory.
- Starter: `examples/wearable-ai-founder-starter/`; public educational ZIP: `public/downloads/wearable-ai-founder-starter-kit.zip`.
- Original landscape/mobile art, 1200×630 OG, two deterministic diagrams; immutable identity/checksums in `media-manifest.json`; existing ArticleFigure registry reused.

## Passed

| Check | Observed result | Scope |
| --- | --- | --- |
| Starter `npm test` | 17/17 pass, Node24.22.1 | Policy, consent, malformed input, replay/expiry, mock golden path, provider request/response contract and actual loopback transport |
| Independent starter review | Two input defects identified and corrected with tests | Bounded single-user demo; no production approval service claim |
| Standalone site `npm run type-check` | Exit0 | Existing full site TypeScript program before new media registry data; no application TS modified |
| Site `npm run lint` | Exit0; 12 existing warnings, 0 errors | Existing application/components/lib lint surface; no app code changed |
| Strict language audit | 2,685 scanned, 0 hits | Whole configured source corpus at run |
| MDX build-safety | 342 files, pass | No unsafe JSX-like prose |
| Content integrity | 342 files, pass | Metadata syntax, existing-image and hero-byte contracts; existing large-image warnings retained |
| New MDX compilation | Pass with actual installed MDX/GFM compiler | Article body syntax, not a browser render |
| New article metadata | Title60, description153 characters | Within declared frontmatter maxima |
| Internal article links | Three source files exist | Live rendered link checks remain pending |
| Portable article + visual packets | Both validators pass in DRAFT state | Schema validity with explicit blockers; not release approval |
| Media preflight | SVG parse/render inspection; separate original-image review85/100 | Conceptual art and diagram candidate inspection; final rendered approval pending |

## Build and environment attempts

1. `pnpm install --frozen-lockfile` resolved the committed dependency graph but returned an ignored-builds error for esbuild/unrs-resolver. Their scripts were not enabled. No dependency manifest/lockfile change is part of this PR. Installed packages were sufficient for direct `npm run` checks.
2. Plain `npm run build` passed relevant research/content guards and stopped at optional sibling `Agent-Intelligence-System` emission. The script explicitly supports skipping that optional emission in CI.
3. `CI=1 npm run build` compiled successfully, then its TypeScript worker was killed by the environment.
4. `CI=1 NODE_OPTIONS=--max-old-space-size=1536 npm run build` compiled successfully again, then TypeScript reached its explicit heap ceiling. No type error was reported; the full build still did not complete. No build/type gate was disabled.
5. Local Next development initially hit `uv_interface_addresses`; specifying the hostname allowed startup. Browser verification remained unavailable: the browser could not connect to the original URL, and a later browser error-page binding was denied by browser policy. No policy bypass or alternative browser-control surface was used.

Build-generated unrelated vault/video/index changes were excluded. The route index retains only the new article, and the hero manifest retains only this candidate’s new hero. Existing homepage, navigation, production config, environment values, dependencies and unrelated work are unchanged by intent.

## Independent preflight and limits

The research/reviewer lane checked the full article, all ten opportunity-score calculations and both unit-economics cases. Two precision fixes were applied: Meta dev-placeholder attribution and exact Android audio-only cold-boot instructions. A separate code lane found malformed profile/confirm inputs; these were fixed and covered by the 17-test suite. A separate visual lane inspected the root-produced raster artwork. These are independent task lanes on the same provider, not the repository-required different-provider final-head review before merge.

Do not claim native app compilation, emulator execution, physical glasses capture, live paid inference, external CRM/MCP execution, durable billing, shared tenant isolation, deployed Starlight wearable memory or standalone starter cloud validation. The demonstrated action is a process-local note receipt. The same trusted bearer can programmatically propose and confirm; typed CLI approval is illustrative, not proof of human presence.

## Outstanding before publication

- Exact-head Vercel preview, desktop/mobile rendering, canonical/robots/Article+FAQ JSON-LD, downloadable ZIP and video playback/fallback.
- Final native/device compatibility checks when making any tested-hardware claim. Current article explicitly scopes these as source-checked tutorials.
- Meta account-specific terms, review and paid-pilot eligibility before a glasses-dependent commercial offer.
- Samsung commercial photograph permissions, should official images be embedded. Current candidate links to their original source instead.
- The generated hero is1672×941; mobile art1122×1402. They are not 2K/4K masters. Portrait is staged for social; source switching in the on-page hero was not added.
- Final art/architecture/rights approval, different-provider final-head review, and Frank’s explicit production approval. Neither merge nor social sending is authorized by this commission.

Next commercial decision: test a phone-first service-documentation offer with three service managers; keep paid developer-kit checkout closed until two promised adapters and the support/license contract are deliverable.

## Remote review state

Draft PR: https://github.com/frankxai/frankx.ai-vercel-website/pull/1234. Initial remote candidate `a8c628e14380bd67773184ba28228e11ac34082b` has Git tree `d9203189218221d4219d2f4b50c93d9f17decab3`, exactly matching the locally prepared code/content/media tree. The shell Git client lacked push credentials; the authorized GitHub connection created the identical tree and review branch. No main ref was changed.

Initial Vercel Git preview `dpl_2gSP6QVuZtAJdvErBHWeLYb2Gb1A` was canceled by `scripts/should-deploy.sh` because the PR is a draft. Its logs explicitly document `[preview]` in the commit subject as the opt-in. The next metadata-only commit uses that supported review path; it does not remove or weaken a gate. The PR remains draft.

Code-review followup independently verified both malformed-input fixes; no findings remain within the bounded mock scope. A separate architecture lane reviewed both SVGs as conceptual proposals. The raster art layer scored85/100 independently; production visual and responsive verification remain pending.

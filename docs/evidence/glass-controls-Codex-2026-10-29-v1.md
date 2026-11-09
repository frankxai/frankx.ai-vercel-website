# Glass control repair candidate
Lead author: Codex | Created: 2026-10-29 | Revision: v1 | Review: candidate source checks only; visual and independent acceptance pending

## Scope and state

Prepared an **unapplied patch** for the existing GlassInput. Neither GlassInput nor LiquidButton was edited in this checkout. The component remains unchanged in production. Base: `ffc4128b83ca0d021eec3f3156a6eebb164f8400`. Branch: `agent/codex/glass-controls-20261029`. Owning quality issue: [706](https://github.com/frankxai/frankx.ai-vercel-website/issues/706).

The staged patch links the visible label and active validation message, preserves external descriptions, event handlers and caller style, and removes the internal focus state that callers could override. Native CSS focus indication replaces the infinite decorative shimmer. It includes a minimum touch height, reduced-motion transition fallback and forced-color focus fallback. Existing material colors, border radius and backdrop treatment remain in the candidate.

| Before | Candidate after | Why |
| --- | --- | --- |
| Visible label without htmlFor | Stable generated ID or supplied ID linked to label | Gives the input an associated visible label |
| Error/helper prose without a field reference | Active message ID combined with external descriptions and aria-invalid | Exposes validation context without dropping caller descriptions |
| Focus state handlers replaced by spread props | Native focus styling; direct caller handlers | Avoids competing handler ownership |
| Infinite rotating focus decoration | Static outline and interruptible color transitions | Keeps focus immediate without perpetual movement |
| No reduced-motion or forced-colors fallback | Explicit preference handling | Provides a candidate path for those settings |

LiquidButton also has missing reduced-motion handling and focus styling; its repair is not included in this patch and remains open. No new design, brand identity or logo is approved. Existing LogoMark and brand/logo-full-v2.png and brand/logo-mark-v2.png are present in the source inventory; they have not been visually reviewed in this task.

## Verification

- `node --test scripts/tests/glass-control-accessibility.test.mjs`: six candidate-only source-contract checks pass.
- `git apply --check docs/evidence/glass-controls-Codex-2026-10-29-v1.patch`: passes against the exact local baseline.
- TypeScript TSX syntax parsing of the reconstructed candidate: passes. This is not semantic typechecking or a production build.
- Tests apply the unified diff in memory and leave the component file unchanged. They inspect source contracts; they do not render React, simulate real focus or prove screen-reader behavior.

Patch SHA256: `f6708f269fad56e68099597d396bcfe2a7b7443a7e71dd456b22b59abd72e932`.
Test SHA256: `c10e520c5a47694b107c4e6e6aeeb74714399e5bb41a026ff4d42cb8ff5c8f41`.

## Admission and visual gate

Parallel-agent admission returned HOLD, and browser fleet routing refused a local browser. No Terra subagent, reviewer, local server, browser, image generation or paid browser session was started. The requested installed storage probe was missing at its documented path; a direct system-volume reading was above the storage floor. One sparse worktree was created for this bounded text-only candidate; no packages were installed.

The selected and read web-release-gate skill requires desktop/mobile baseline capture before UI edits: “If capture is impossible ... say so and stop.” That capture was unavailable, so the patch was prepared as a reviewable text artifact and not applied. Emil design guidance was selected/read and applied to candidate focus/motion choices. Actual reduced-motion rendering, keyboard focus, touch, interrupted transitions, contrast and mobile presentation are **not verified**. No visual quality score or production-readiness claim follows from source checks.

## Merge inspection

PR [1117](https://github.com/frankxai/frankx.ai-vercel-website/pull/1117), head `cff5022bcf5be525f2c1a4bd5f9e77d954c2084d`, and PR [1118](https://github.com/frankxai/frankx.ai-vercel-website/pull/1118), head `9aedb2821b791806acbe2bd4129c3e72580d5894`, were both draft and BEHIND at inspection. Core CI and merge checks were skipped. Existing successful preview/review statuses do not establish completed core checks or rendered acceptance. Neither PR was changed or merged by this task. No rules, check definitions or approval requirements were weakened.

## Pickup

When admitted, capture the existing desktop/mobile demo, apply this exact patch in the owned branch, run semantic typecheck/lint/strict editorial/build and actual rendered keyboard/touch/reduced-motion/interruption checks, then obtain independent exact-revision review. Verify the material against the existing brand assets. Keep any later logo options separate from approved brand identity, and record generated-image sidecars and both ledgers before delivery. Review LiquidButton as a separate bounded follow-up. Do not merge this candidate on the strength of the six source checks.

Instructions read explicitly: repo AGENTS.md, CLAUDE.md, design.md, taste.md, installed emil-design-eng, imagegen, web-release-gate and machine/product policies. Root AGENTS.md SHA256: `583c7df2a00769defbe4052abffca456c348a5170b59304421c75781190ccb64`. Native repository startup discovery was not reloaded. Highest evidenced environment: local source/patch validation. This record is not a runtime enforcement hook.

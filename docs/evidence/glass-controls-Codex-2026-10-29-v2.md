# Applied glass input repair
Lead author: Codex | Created: 2026-10-29 | Revision: v2 | Review: applied; hosted verification and independent acceptance pending

Frank explicitly requested applying the staged repair and taking it to production. The v1 patch is now applied to GlassInput on `agent/codex/glass-controls-20261029`. V1 remains preserved as the historical staged candidate. LiquidButton and brand logos remain outside this repair.

The input now associates its label and message with the supplied or React-generated ID, combines caller descriptions, exposes invalid state, and preserves handlers/style. It replaces the looping focus shimmer with a native outline, retains existing glass material and includes a 44 px minimum height, reduced-motion color-transition fallback and forced-color outline.

Five applied-source checks and TSX syntax parsing pass locally. Full local build is admission-blocked. Existing hosted CI now runs the source checks and a Puppeteer journey against the actual production build, with screenshot/manifest artifacts. The journey exercises native label focus, controlled typing, keyboard Tab, validation descriptions, desktop/mobile-emulated touch sizing, reduced-motion preferences, forced-color focus and rapid focus changes. This is not physical-device or screen-reader testing. A main-push step is intended to exercise the public production route after rollout; it does not independently establish the Vercel deployment's source revision.

No local browser or server was started. The native connected-browser inventory failed with a missing-kernel-assets error, so it supplied no screenshots. Hosted CI reuses the repository's existing installed Puppeteer browser and security controls; it adds no vendor, dependency, credential, scheduled job or deployment mechanism. Local build admission reported HOLD. The explicit apply/release instruction supersedes the earlier decision to leave the UI patch unapplied; release checks remain required.

Sources: React accessibility-ID guidance at https://react.dev/reference/react/useId and Puppeteer page API at https://pptr.dev/api/puppeteer.page. Source contracts, rendered behavior, visual inspection, independent review, merge, deployment readiness and public source binding retain separate evidence states. None of the planned checks is reported as passed before execution.

Owning issue: https://github.com/frankxai/frankx.ai-vercel-website/issues/706. Selected/read: Emil design engineering and the repository web-release gate. Applied: native focus, preference fallbacks and interruption-safe color transitions. Verified so far: source contracts and syntax only. Production and rendered acceptance remain pending.

## First hosted browser result

Run 40884760712 passes typecheck, lint, strict language, build, existing reader/search journeys and the five applied-source checks. The new desktop no-preference input case passes and produces a capture. Its reduced-motion case fails because app/globals.css sets universal `transition-duration: 0.01ms !important`, overriding the component's normal-priority `transition: none`. The component fallback is strengthened to `transition-duration: 0s !important`; the rendered zero-duration assertion remains unchanged. Earlier failed evidence is retained in the run artifact. Full rerun and final acceptance remain pending.

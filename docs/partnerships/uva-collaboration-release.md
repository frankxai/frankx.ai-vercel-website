# UvA collaboration experience: review handoff

17 November 2026. Implementation owner: OpenAI Codex, ChatGPT Work Mode. Draft only; production release is not authorized.

## Destination and scope

Canonical app: `frankxai/frankx.ai-vercel-website`, production baseline `a2ecff4adbc548904d1c07821a34e8e2d4095b64`. Branch: `agent/codex/uva-collaboration`. Route: `/partnerships/proposal/uva-rec-impact`.

This static child lives inside the existing proposal URL family. The existing data-driven renderer is designed for commercial proposals, not six interactive chapters. A dedicated renderer preserves other proposals, their schemas, and the public partnership registry. The evidence audit suggested `uva-founderspace`; this implementation follows the user's preferred slug instead. No competing route is created.

The exact new URL is a public-safe, unlisted exception to the existing proposal sign-in gate. Sibling and descendant routes retain their authentication. Noindex/nofollow/noarchive/nosnippet metadata and the canonical discovery exclusion keep this URL out of search, sitemap and 404 suggestions. Unlisted is not confidential. The inherited Vercel preview protection remains unchanged.

## Evidence ownership

Canonical technical evidence belongs to [the operations audit, PR 633](https://github.com/frankxai/agentic-ops/pull/633), inspected at `f3914cf6c816f9080d6cebdaf327e60be9e4d647`. Its five-file report remains the evidence owner; this document is a release receipt, not a duplicate ledger. No private correspondence or provider credentials are embedded in the app.

The page includes pinned public SIS and ACOS source/license links, a labeled recorded mission, a public read-only department catalog, and three actual FrankX Markdown agent profiles. Their exact bytes are bundled from the pinned production revision because the deployment deliberately excludes `.claude`; a regression test checks snapshot fidelity. Their aspirational language is disclosed. The crew provide visual guidance; they are not asserted to be operating agents. No audience, adoption, income, research validation, sponsorship or institutional partnership is claimed. External system tests were not rerun by this implementation session.

## Visual decision

Three directions considered:

| Direction | Strength | Decision |
| --- | --- | --- |
| Quiet editorial conversation | Legible narrative, original crew accents, source inspection without losing the thread | Selected: deep green, warm paper character panels, Poppins/Inter with restrained serif emphasis |
| Research desk | Dense source ledger and experimental apparatus | Too much inventory before the shared question; used only for source/contract inspection |
| Cinematic slide sequence | Strong guided pacing | Used as optional fullscreen mode, not the default reading experience |

The existing partnerships page was inspected at desktop and narrow responsive widths before composition. No generic stock art, invented institutional marks, new fonts, generated character redesigns, autoplay, or decorative particle layers.

## Original asset provenance

`public/images/partnerships/uva-rec-impact/original-crew.jpg` is the original 640 × 427 JPEG provided by Frank in this task, unchanged. SHA-256: `64275bdeb3229a3bc05252054b6155514a4a38728642f79566566f56eb0a23ed`. User-supplied source: https://chatgpt.com/space/file/libfile_fde3_f-9f3dd7773fa081919b2ec5505d74597e_cf4f9a13688081918a6c78a7b4a22631 . CSS selects cells from the sheet without redrawing: Mini Frank, Nilo, Brio and Riff. This receipt does not assert wider trademark or commercial licensing rights.

## Behavior and recovery

Six readable chapters remain available without opening presentation mode. A native modal dialog provides focus containment and progressive browser fullscreen; unsupported fullscreen leaves a window-filling presentation. Arrow/Page keys move between chapters; Home/End jump; Escape/Exit return focus to the launcher. Interactive controls retain native keyboard behavior. Reduced motion removes transitions. No new network execution, telemetry, forms, persistence, paid services or backend was added. External links inspect public source; nothing runs an agent. Print offers a dedicated one-page summary. Closing/reloading loses only local view selections.

## Validation and blockers

- Type checking and full lint passed; unrelated existing lint warnings remain.
- Strict AI-language audit and targeted editorial audit passed.
- Route compiled and served HTTP 200 in Next development. Existing Anthropic proposal remained HTTP 307 to sign-in.
- Route enumeration recognizes the URL but excludes it from public discovery.
- The initial default build stopped at the missing optional sibling checkout. `CI=1 npm run build` passed prebuild gates but the local runtime killed the full Turbopack compilation. A successful full production build is still required.
- Browser interactions, print pagination and responsive preview acceptance remain to be recorded against the final candidate.
- Different-provider review, exact-head CI and explicit production approval remain release blockers. No independent review is claimed.

Next action: inspect the draft preview at the exact head, rehearse all six chapters and print, then attach the observations to the PR. Do not merge or promote to production.

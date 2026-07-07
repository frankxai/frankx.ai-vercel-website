# FrankX Image And Infographic Loop

## Verdict
MANUAL-FIRST.

The loop has observable outputs and quality gates, but the work is subjective and brand-sensitive. Run 2-3 maker/checker cycles manually before scheduling or leaving it fully unattended.

## Objective
Produce better FrankX.ai social media and website visuals by repeatedly:

- reading the content strategy and visual ledgers,
- selecting a concrete surface or post,
- writing a brand-specific prompt,
- generating an image,
- saving the output into the repo,
- logging the prompt, provenance, review, score, and next refinement.

## Non-Goals
- Do not publish or deploy automatically.
- Do not post to social accounts.
- Do not overwrite existing accepted assets.
- Do not create raster-only logos or identity marks.
- Do not use generic AI assistant, cute bot, fake dashboard, or decorative filler imagery as a premium asset.

## Allowed Scope
- New loop docs under `.loop/frankx-image-infographic-loop/`.
- New evidence and prompt logs under `docs/visual-loop/`.
- New generated image outputs under `public/images/social/frankx-loop-20260702/`.
- Optional updates to visual ledgers after a human or verifier accepts the assets.

## Forbidden Scope
- Existing production pages, MDX frontmatter, routes, and navigation unless a later pass explicitly wires an accepted image.
- Existing accepted image files.
- Legal, private, `.env`, credential, Oracle-confidential, or family/memorial paths.
- Production deployment or social publishing.

## Actor Model
- Worker: Codex using the built-in `image_gen` tool and repo-local FrankX visual standards.
- Verifier: Codex checker pass using `GATE.md`, the 30 point premium score, and actual export inspection.
- Human gate: Frank accepts final assets before wiring into website/social schedule.

## Cadence
Goal-mode manual loop for this session. Each cycle should create one image or one tightly related set of variants, then review before the next prompt.

## State
- Queue: `STATE.md`.
- Run ledger: `RUNS.md` and `runs.jsonl`.
- Prompt and asset evidence: `docs/visual-loop/frankx-image-loop-2026-07-02.md`.
- Quality manifest: `docs/visual-loop/design-loop-evidence.frankx-image-loop-2026-07-02.json`.

## Verification
Primary gate:

- Actual exported image exists in the repo.
- Prompt and source path are logged.
- Asset tier is A, B, or appropriate C.
- No baked text/logos/watermarks unless explicitly required and inspected.
- 30 point score is 26 or higher to approve; 22-25 requires one targeted iteration; below 22 restarts.

Fallback/manual gate:

- If tool output cannot be programmatically inspected, manually inspect via `view_image` and record notes.

## Budgets
- Max iterations in one sleeping run: 12 image cycles.
- Max no-progress threshold: 2 rejected generations for the same concept.
- Stop if image generation fails repeatedly or context no longer contains enough state to inspect outputs.
- Cost posture: built-in image generation only unless Frank explicitly authorizes a paid external path.

## Escalation
Stop and ask Frank when:

- A concept needs exact data, exact text, or charts better created as code/design frames.
- The output implies unsupported claims.
- A strong asset would require using a person likeness, third-party brand, or unclear-rights reference.
- A production deployment, social post, or paid API path is needed.

## Cancel/Resume
Cancel: stop generating, leave `STATE.md` with the last accepted/rejected asset and next action.

Resume: read `STATE.md`, `RUNS.md`, and the visual evidence doc, then continue with the next unchecked queue item.

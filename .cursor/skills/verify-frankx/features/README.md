# frankx.ai verification map

This directory is the maintained source for verifying the user-facing behavior of the frankx.ai public website. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- For `--target local`, launch a production `next start` at `http://127.0.0.1:<port>` (default `3107`) from a clean build of this checkout. Run `python scripts/verify/run-journey.py --doctor --target local` and require the ready probe, port ownership, and `.next/BUILD_ID` ↔ git SHA mapping described in the skill.
- For `--target prod`, use `https://www.frankx.ai` read-only. Doctor is the same ready probe over HTTPS. There is no public build-SHA endpoint; do not add one.
- Never mint a Vercel OIDC token or otherwise bypass preview Deployment Protection.
- Never drive a local instance that was not started by this verification run, unless doctor confirms the existing PID file on this port matches this SHA.
- Do not put secrets in the environment to make a journey pass. If a journey needs live data that is missing, report a failure and the unmet precondition.

## Driving conventions

- Start every recipe from the baseline unless its preconditions say otherwise.
- Drive with Python Playwright and system Chrome via `scripts/verify/run-journey.py`.
- Prefer `id`, ARIA names, and route paths already in the source. Two `#toc-panel` nodes exist in the chapter DOM; always use the visible one.
- Capture screenshots and JSON measurements at 1280, 1024, and 375. Proof artifacts go to `.verify-evidence/<date>-<sha>/` (or `VERIFY_EVIDENCE_DIR`) and must survive cleanup.
- Restore nothing on production; it is read-only. On local, do not complete checkouts or submit newsletter forms.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- Record the feature ID, target, SHA, and entry point with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.
- Never weaken a journey to make it pass.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with Python Playwright`, and `Gotchas`.

## Features

- [Golden-age chapter and TOC](./golden-age.md) covers chapter reading, the desktop TOC panel, the mobile toggle, and the current numeral heading rule.
- [Prompt library cards](./prompt-library.md) covers the public prompt library grid, sanitized render, and copy when that control is present.
- [Architecture blueprints](./blueprints.md) covers `/blueprints` offers and the checkout entry point without completing a payment.
- [Legal prose typography](./legal-prose.md) covers typography on the legal policy pages.
- [Homepage](./homepage.md) covers the hero heading, the primary CTA, and no horizontal overflow at 375.

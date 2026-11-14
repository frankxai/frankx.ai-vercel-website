# Homepage

A visitor landing on `/` sees the hero heading, can take the primary call to action, and can use the page at 375 without horizontal overflow.

## Sub-features

- `hero-heading` shows the hero `h1` whose accessible name is `Build intelligence that compounds.`
- `primary-cta` shows the primary hero action `Inspect the Blueprints`, linking to `/ai-architecture`.
- `no-overflow-375` keeps the page from forcing horizontal scrolling at 375.

## How to get to it (user POV)

- Open `/`.
- Choose `Inspect the Blueprints` to go to `/ai-architecture`, or `Map the Ecosystem` to go to `/ecosystem`.

## Driving it with Python Playwright

Preconditions:

- Local or production doctor is clean, as in the skill.

- **Open home.** Go to `/`. Wait for `h1[aria-label="Build intelligence that compounds."]`.
- **Primary CTA.** The link named `Inspect the Blueprints` is visible and has `href` ending in `/ai-architecture`. Do not require a navigation; proving the control is visible and correctly targeted is enough. The secondary link `Map the Ecosystem` points at `/ecosystem`.
- **Widths.** Capture the hero at 1280, 1024, and 375.
- **Overflow at 375.** With the viewport at 375×812, `document.documentElement.scrollWidth` is not greater than `document.documentElement.clientWidth` (allow 1px for subpixel rounding). The primary CTA remains fully in view horizontally. This is a first-class layout constraint in the hero markup.
- **Proof.** Screenshots plus `measurements.json` (heading accessible name, CTA href, scrollWidth vs clientWidth at each width).
- **Command.** `python scripts/verify/run-journey.py --journey homepage --target local` or `--target prod`.

## Gotchas

- The visible H1 text rotates (`SplitFlipLine`). Assert the stable `aria-label`, not a single verb/tail combination.
- The headline pause button is only interactive while the verb is rotating and may be `invisible` otherwise. It is not the primary CTA.
- Overflow must be measured on `document.documentElement` (and the body if it is wider), not guessed from a screenshot.
- #1228 did not change the hero `h1` accessible name (`Build intelligence that compounds.`) or the primary CTA (`Inspect the Blueprints` → `/ai-architecture`). Those handles stay as written.

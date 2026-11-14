# Prompt library cards

A visitor can browse the public prompt library, read pattern cards without unsafe HTML executing, and copy a prompt when a copy control is present.

## Sub-features

- `library-open` shows the prompt library heading and a grid or an explicit empty/unavailable state.
- `card-link` lets the visitor open a pattern at `/prompt-library/<id>`.
- `sanitized-render` shows titles and bodies as text. Raw script tags from a pattern must not execute or appear as live markup.
- `copy-prompt` copies the prompt text when a `Copy Prompt` button is present (the control lives on `PromptCard`).

## How to get to it (user POV)

- Open `/prompt-library`.
- Filter by lane or category, or search with the field labeled `Search` (`#prompt-search`).
- Choose a card to open `/prompt-library/<id>`.
- The hub explanation lives at `/prompts` (heading `Prompt Library`).

## Driving it with Python Playwright

Preconditions:

- Local or production doctor is clean, as in the skill.
- No secret or GitHub token is required to start the site. If the live corpus cannot be fetched, the journey fails with that reason rather than being skipped.

- **Open the library.** Go to `/prompt-library`. Wait for the `h1` `The Prompt Library`.
- **Live corpus.** If the banner `Live data unavailable` is visible and no pattern cards are shown, fail and record that the GitHub-backed corpus was not available (unauthenticated rate limit or a failed fetch). Do not treat an empty degraded grid as a pass.
- **Cards.** When patterns are present, at least one link whose `href` starts with `/prompt-library/` (and is not exactly `/prompt-library`) is visible. Capture the grid at 1280, 1024, and 375.
- **Sanitized render.** Card titles and descriptions are text nodes. The card grid does not contain an injected `script` element, and visible text does not include raw `<script>` markup from a pattern body.
- **Copy, if present.** If a button named `Copy Prompt` is visible on the listing or after opening the first pattern, click it. The button is the copy action from `components/prompt-library/PromptCard.tsx`. When the control exists, the click is the action and a succeeding UI change (for example the label swapping toward a checked state) or a clipboard write is the resulting state. If the control is absent on both the listing and the opened pattern, record that absence in measurements; it is not a failure.
- **Proof.** Screenshots plus `measurements.json` (card count, live flag, copy-control present, sanitize checks) at the three widths.
- **Command.** `python scripts/verify/run-journey.py --journey prompt-library --target local` or `--target prod`.

## Gotchas

- `/prompt-library` reads a live GitHub corpus and is cached. Without a token, GitHub may rate-limit the region (the page itself mentions 60 req/hr unauthenticated). An unavailable live snapshot is a failed journey, not a pass.
- `/prompts` is a different page (`Prompt Library` without "The") and must not be used as a substitute when `/prompt-library` is empty.
- Do not paste secrets into the environment to fetch the corpus during verification.
- Production is read-only: copy-to-clipboard is allowed; do not submit other writes.

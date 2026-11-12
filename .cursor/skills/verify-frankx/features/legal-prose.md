# Legal prose typography

A visitor can read the legal policy pages as typeset documents: a clear page title, sized section headings, and readable body text on a dark background.

## Sub-features

- `privacy-open` shows the Privacy Policy document.
- `prose-class` keeps the policy article on the typography `prose` path (`prose prose-invert prose-zinc max-w-none`).
- `typography-present` shows a heading size above body size, with readable contrast on the dark page. Terms, imprint, and refund use the same article treatment.

## How to get to it (user POV)

- Open `/legal` and choose Privacy Policy, Terms of Service, Imprint, or Refund Policy.
- Open `/legal/privacy`, `/legal/terms`, `/legal/imprint`, or `/legal/refund` directly.

## Driving it with Python Playwright

Preconditions:

- Local or production doctor is clean, as in the skill. The local ready probe already uses `/legal/privacy`.

- **Open privacy.** Go to `/legal/privacy`. Wait for `h1` `Privacy Policy`. The document mentions `Frank Riemer`.
- **Prose hook.** The policy is an `article` with the `prose`, `prose-invert`, and `prose-zinc` classes.
- **Typography present.** At 1280, 1024, and 375, the computed font size of the `h1` is larger than the computed font size of a body paragraph, and the heading is visible. Capture a screenshot of the article at each width, plus those computed styles in `measurements.json`.
- **Sibling pages.** `/legal/terms`, `/legal/imprint`, and `/legal/refund` each expose an `article.prose` and a visible `h1`. A typography sample of privacy plus a class-and-heading check on the siblings is enough; screenshot privacy at all three widths.
- **Command.** `python scripts/verify/run-journey.py --journey legal-prose --target local` or `--target prod`.

## Gotchas

- The article hook is still `prose prose-invert prose-zinc max-w-none` on privacy, terms, imprint, and refund. #1228 registered `@tailwindcss/typography` in the Tailwind v3 plugins array, so those classes now apply plugin typography on top of the explicit heading and body color/size classes. Keep asserting `article.prose` and a heading size above body size; do not reduce the check to "the page loaded".
- #1228 also disables the plugin's blockquote quote marks globally in `tailwind.config.js` (`blockquote.quotes: none` and `blockquote p:first-of-type::before/::after` `content: none`). These legal pages do not render a `<blockquote>`, so that config is not visible here; do not invent a blockquote assertion on this journey.
- The ready probe uses this same privacy document. A doctor failure and a typography failure are different: doctor is HTTP 200 plus two strings; this journey is computed typography plus screenshots.

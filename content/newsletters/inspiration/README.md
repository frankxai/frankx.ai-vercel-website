# Newsletter Inspiration Library

Use this folder as a swipe system for design and copy inspiration.
The goal is to learn patterns, not copy text.

## Structure

- `entries/` - One markdown file per reference newsletter
- `assets/` - Screenshots (desktop + mobile) per entry
- `TEMPLATE.md` - Standard capture template
- `BEST_OF.md` - Curated winning patterns we actively reuse

## Workflow

1. Save screenshots

- Capture desktop and mobile versions of any inspiring newsletter.
- Store in `assets/<entry-slug>/desktop.png` and `assets/<entry-slug>/mobile.png`.

2. Create an entry

- Copy `TEMPLATE.md` into `entries/YYYY-MM-DD-<entry-slug>.md`.
- Fill in what worked, what did not, and why.

3. Score with discipline

- Score each dimension 1-5: Hook, Clarity, Flow, Design, CTA, Trust.
- Add one concrete takeaway you can apply this week.

4. Update `BEST_OF.md`

- Add only reusable patterns that appeared in 2+ entries.
- Keep it short and actionable.

## Prompting Rule For Claude/Codex

When generating a newsletter:

- Read `BEST_OF.md` first.
- Then read the 3 most recent files in `entries/`.
- Extract patterns only (structure, rhythm, CTA mechanics).
- Never copy source wording verbatim.

## Quality Guardrails

- Prioritize readability on mobile.
- Keep one clear primary CTA.
- Use simple language and strong transitions.
- Use specific claims only when source-backed.

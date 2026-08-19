---
description: Strict pipeline for Flagship-category blog posts. Composes research → counter-argument → draft → integrity-guard → seo-check → polish-content. Fail-closed on the excellence gate.
thinking: true
---

# /flagship — Flagship Blog Pipeline

**Use this instead of /publish-content for any post tagged `category: "Flagship"`.**

The standard `/publish-content` pipeline is good enough for Intelligence Dispatches and tutorials. Flagship pieces — the ones that define the brand on a topic and stay relevant for 12+ months — need stricter inputs.

## When to invoke

- User says "flagship blog", "manifesto", "definitive piece on X", "long-form on Y"
- Frontmatter will have `category: "Flagship"` or `flagship: true`
- Target length ≥ 2,500 words

## Pre-flight checklist (must answer YES before drafting)

1. **Is there a primary source?** Quote with attribution beats paraphrase from training data. Use WebSearch / WebFetch to land on the original.
2. **What is the single argument?** One sentence. If you can't say it, the piece isn't ready.
3. **What is the steelmanned counter-argument?** Required for Flagship. The piece must engage one honest objection in ≥150 words.
4. **What does the reader do this week?** Three concrete moves, numbered. Not "consider", "reflect", "explore" — verbs that ship.
5. **Who is this for that isn't us?** Name a real persona. If only Frank's existing audience would read it, it's not flagship — it's a footnote.

## Pipeline

### 1. Research (use Explore + WebSearch, parallel)

- Surface prior FrankX writing on the topic (so the new piece sounds continuous, not orphaned).
- Verify every direct quote against a primary source. No paraphrase-as-quote.
- Find the brand-voice and SEO conventions from sibling Flagship posts in `content/blog/*.mdx` with `category: "Flagship"`.

### 2. Draft (≥ 2,500 words, target 3,000)

**Required structure:**

- Personal hook (200–300 words). Concrete detail. No "I was thinking about…".
- TL;DR `<Callout type="insight">` in the first 100 words. AEO-extractable.
- 1-line **author's note** under the byline if AI was in the loop. Disclose now, link to a transparency section near the end.
- Body sections with **≥ 3 question-format H2s** (e.g. "What did Olah actually say?").
- **Counter-argument section** — explicit. Don't bury the objection in a parenthetical.
- "What to do this week" section — 3 numbered, verb-led invitations.
- "How this post was made" — transparency note if AI assisted.
- `## FAQ` — exactly 5 `### Question?` Q&As. Each answer ≤ 60 words for AI-engine extraction.
- Brand close: `The studio lights are on.`

**Required frontmatter:**

```yaml
title: "..."                # ≤ 60 chars
description: "..."          # ≤ 155 chars
date: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"  # required for Flagship
author: "Frank"
category: "Flagship"
flagship: true
tags: [...]
keywords: [...]
image: "/images/blog/<slug>-hero.png"
coverAlt: "..."             # accessibility + AI image-caption fallback
tldr: "50-word AI-engine summary, distinct from the body Callout"
readingGoal: "..."
featured: true
schema: ["Article", "FAQPage"]
```

### 3. Gate: `@integrity-guard <file>`

Run the existing integrity-guard agent. Must return PASS on:
- Brand voice (no banned phrases; "AI Architect" precision)
- AI-slop detection
- Claim audit (every numeric claim has a source)
- Schema + meta (JSON-LD types valid, OG image ≥ 1200×630)
- Arcanea-mythology leak (Luminor stays in mythology context, not in technical prose)

### 4. Gate: `/seo-check` slice

Quick audit on the new post only:
- Title and description render correctly in `<head>`
- Canonical URL set
- OG image present and ≥ 1200×630
- Internal links to ≥ 3 existing routes

### 5. Gate: `/polish-content`

Final pass for voice consistency and line-edit cleanups.

### 6. Commit

The PreToolUse hook (`.claude/hooks/blog-commit-gate.sh`) will **block the commit** if any gate fails. Do not bypass with `--no-verify` unless this is a true emergency and the user has explicitly authorized it.

```bash
git add content/blog/<slug>.mdx public/images/blog/<slug>-hero.png
git commit -m "feat(blog): <title>"
git push -u origin <branch>
```

### 7. Open draft PR

```bash
gh pr create --draft --title "feat(blog): <title>" --body "<...>"
```

## Failure-mode handbook

| Gate failed             | Fix                                                        |
| ----------------------- | ---------------------------------------------------------- |
| Title > 60              | Tighten. The brand name doesn't need to be in the title.   |
| Description > 155       | Treat as a snippet, not a summary. One sentence, no comma. |
| < 3 question H2s        | Reframe statement H2s as questions where natural.          |
| < 5 FAQ entries         | Add the 5 questions Perplexity / ChatGPT actually ask.     |
| Voice-audit hits        | Read `scripts/voice-audit.sh` for the ban list.            |
| No counter-argument     | Add one. ≥ 150 words. Steelman the strongest objection.    |
| Missing tldr            | Add a 50-word, AEO-extractable summary.                    |
| Missing lastModified    | Set to today's date. Update on every meaningful revision.  |

## Non-goals

- This command does **not** generate images. Use the existing visualSystem pipeline (see `scripts/visuals/`) or the FrankX visual-* agents.
- This command does **not** ship the post to production. It lands on a branch + draft PR. Promotion to main is a separate, human-driven step.

# Contemplative Rails

The four-hub contemplative research rails on frankx.ai.

| URL | Question | Spectrum |
|-----|----------|----------|
| `/on-god/` | What is God? | Soul (amber) |
| `/on-reality/` | What is real? | Bridge (violet) |
| `/on-consciousness/` | What is consciousness? | Tech (emerald) |
| `/on-faith/` | What does it mean to walk the question? | Soul (amber) |

Shared canonical-thinker library at `/canon/[slug]`.

## URL convention

The "On X" prefix signals essay register over destination. "Notes on God" not "the God section." Reduces accidental fanatic traffic — readers who are looking for a sermon do not land here. Readers who are walking the deepest open questions of the species find a serious entry point.

## Discoverability posture

These rails are **noindex/nofollow until Frank lifts manually** in `launch-gate.md`. They are not linked from the global navigation, the homepage, or `/network`. Direct URL only. The intent is for the rails to compound topical authority slowly across years rather than chase traffic.

## What this is not

- Not apologetics for any tradition
- Not New Age "all is one" soup
- Not personal-development packaging in mystical language
- Not academic religious studies
- Not theology with claimed doctrinal authority

## What this is

A first-person research walk through the deepest open questions, conducted with intellectual honesty across traditions and disciplines, written for the next reader walking the same questions.

## Architecture

```
content/
  rails/{hub}/{slug}.md       # entry source (markdown + YAML frontmatter)
  canon/{slug}.md             # canonical thinker source

lib/rails/                    # PORTABLE — RIS extraction surface
  types.ts                    # core types
  load-entries.ts             # markdown loader
  load-canon.ts
  schema.ts                   # JSON-LD composers
  rss.ts
  render-helpers.tsx          # shared HubPage / EntryPage components

data/rails/                   # CONFIG — also portable
  hubs.ts                     # 4 hub configs with manifestos + keyword spines
  traditions.ts               # 17-tradition vocabulary
  cross-tag-rules.ts

components/rails/             # UI shell
  ContemplativeReader.tsx     # editorial-dark typography frame
  RailHubHeader.tsx
  RailHubManifesto.tsx
  RailEntryHeader.tsx
  RailEntryFooter.tsx         # AI-involvement + cite + cross-tag + license
  RailEntryCard.tsx
  RailEntryBody.tsx
  CiteEntry.tsx               # APA/MLA/Chicago citation widget

scripts/rails/                # build-time discipline gates
  validate-frontmatter.mjs
  validate-no-arcanea.mjs
  validate-no-emojis.mjs
  validate-cross-links.mjs

app/(rails)/                  # route group, all surfaces noindex'd
  layout.tsx
  on-{god|reality|consciousness|faith}/
    page.tsx                  # hub index
    [slug]/page.tsx           # entry detail
    feed.xml/route.ts         # per-hub RSS
  canon/
    page.tsx                  # tradition-grouped canon index
    [slug]/page.tsx           # canon detail with cited-in back-refs
  rails/feed.xml/route.ts     # combined cross-hub RSS

docs/rails/                   # editorial standards + ops
  README.md                   # this file
  voice-rules.md              # the standard every entry passes
  anti-patterns.md            # the "reject on sight" list
  research-substrate.md       # the canon to lean on
  launch-gate.md              # 5 forcing-questions Frank answers before public link
  incident-response.md        # what to do if a hostile reader shows up
  ris-extraction-roadmap.md   # what extracts to OSS RIS repo, and when
```

## Adding an entry

```bash
# 1. Write content/rails/{hub}/{slug}.md with required frontmatter
# 2. Add /canon/[slug].md for any new canon cited
# 3. Validate
npm run validate:rails
# 4. Build
npm run type-check && npm run build
```

The four validators run in sequence and any failure blocks commit:
- frontmatter complete + hub matches directory + ≥3 internal links + thesis ≤80 words
- no Arcanea mythology terms
- no emojis
- every canonCited has a /canon/ page AND is linked from body

## License

- **Code substrate** (`lib/rails/`, `components/rails/`, `scripts/rails/`): MIT (with the rest of FrankX where applicable). Extracted to RIS repo at Phase 2.
- **Prose** (entries + canon bodies): CC BY-NC-ND 4.0. Attribution required, no commercial use, no derivatives. Keeps book-deal optionality intact.

## Source-of-truth plan

`docs/superpowers/plans/2026-05-03-contemplative-rails-and-reality-intelligence-system.md`

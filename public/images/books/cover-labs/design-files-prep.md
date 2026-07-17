# Design files prep — after image lab (Claude Design / Figma / print)

## Per book (when promoting from lab)

```
design/<slug>/
  type-lock.json          # exact title, subtitle, author, imprint
  master-front.jpg        # chosen flat 1600×2560
  master-front@2x.jpg
  thumb.jpg
  og-1200x630.jpg
  pattern-token.json      # L1 pattern id
  object-token.json       # L2 object id
  figma-or-claude.fig     # later
  wrap/
    kdp-calculator.json   # when page count known
    wrap.pdf              # later
  interior/
    theme.css / typst     # later
```

## type-lock.json schema

```json
{
  "slug": "fable",
  "title": "Fable",
  "subtitle": "New Fables for the Age of Intelligence",
  "author": "Frank Riemer",
  "imprint": "fable",
  "chosenVariant": "v07-generative",
  "altDesire": "v10-liquid-inlay",
  "altAuthority": "v01-clothbound"
}
```

## Claude Design handoff prompt (later)

```
Using the approved flat cover plate at <path> as BACKGROUND ONLY,
overlay exact type:
TITLE / SUBTITLE / AUTHOR from type-lock.json.
Keep pattern and object visible. No new metaphors.
Export 1600×2560 sRGB master + 400×640 thumb.
```

## Batch status

| Book | LAB.md | Images 0/10 | Type lock | Promoted |
|------|--------|-------------|-----------|----------|
| (fill as runs complete) | | | | |

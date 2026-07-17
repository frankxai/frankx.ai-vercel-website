# FrankX Full Catalog Cover Lab
**Date:** 2026-07-16  
**Path:** `public/images/books/cover-labs/`  
**Goal:** 10 carefully crafted flat cover variants per book — craftsman pattern language × designer schools  
**Primary image path now:** Gemini/NB via `scripts/generate-catalog-cover-lab.mjs`  
**Grok Imagine path:** `scripts/grok-imagine-cover-prompts.md` + optional `grok --single` (save absolute path)  
**Later:** Claude Design / Figma type-lock + print wrap files  

---

## Hard laws

1. **Flat master only** (2:3, ~1600×2560) — not 3D book-on-table as master  
2. **Exact type lock** in every prompt: Title / Subtitle / Author = Frank Riemer (or Frank for poetry line if intentional)  
3. **Do not name designers as authors** in the image (cite school only in art direction)  
4. **One field pattern + one object mark** per variant  
5. **Visual QA type accuracy** before promote to `*-cover.jpg`  

---

## 10 craft channels (every book)

| # | ID | Craftsman pattern (L1) | Designer school | Energy |
|---|-----|------------------------|-----------------|--------|
| 01 | clothbound | fine cloth weave | Bickford-Smith | trust luxury |
| 02 | symbol | quiet void + one mark | Mendelsund | concept authority |
| 03 | conceptual | scale/surprise hierarchy | Chip Kidd | smart attention |
| 04 | atmospheric | soft weather/light field | Rodrigo Corral | literary gravitas |
| 05 | poster | limited palette icon | Olly Moss | collectible |
| 06 | lettering | type-as-art | Jessica Hische | craft gift |
| 07 | generative | parametric curve/grid | Pak / Art Blocks refined | collector minimal |
| 08 | quiet-white | paper tooth ivory | Kenya Hara | intellectual calm |
| 09 | rebel | crop marks / stamp | Experimental modern | founder energy |
| 10 | liquid-inlay | material lacquer object | Couture digital | desire flagship |

---

## Books in lab (20)

See `catalog.json`. Frontlist priority for full 10-gen first:

1. golden-age-of-intelligence  
2. the-wordless-laws  
3. the-wordless-laws-book-two  
4. fable  
5. great-transition  
6. the-book-of-secrets  
7. self-development  
8. love-and-poetry  
9. spartan-mindset  
10. fire-horse-poems  
11–20. remaining (hope, hoffnung, imagination, manifestation, golden-age, arcanea×5)

Golden Age already has `../golden-age-lab/` — mirrored/linked.

---

## Folder layout

```
cover-labs/
  README.md                 (this file)
  catalog.json              (all books + object/pattern DNA)
  _channels.json            (10 channels)
  SCORECARD-TEMPLATE.md
  design-files-prep.md      (Claude Design / Figma / print later)
  grok-imagine-playbook.md
  <slug>/
    LAB.md                  (10 prompts + DNA)
    v01-clothbound.jpg
    ...
    v10-liquid-inlay.jpg
    results.json
```

---

## Commands

```bash
# Generate all 10 for one book (NB/Gemini)
node scripts/generate-catalog-cover-lab.mjs --slug the-wordless-laws

# Frontlist batch
node scripts/generate-catalog-cover-lab.mjs --frontlist

# Specific variants
node scripts/generate-catalog-cover-lab.mjs --slug fable --only 1,7,10

# Dry-run prompts
node scripts/generate-catalog-cover-lab.mjs --slug fable --dry-run
```

Grok Imagine: open `grok-imagine-playbook.md` and paste per-variant prompts with absolute save paths.

---

## Promote to live cover

```bash
cp public/images/books/cover-labs/<slug>/v0N-*.jpg \
   public/images/books/<slug>-cover.jpg
# update books-registry.ts coverImage extension
```

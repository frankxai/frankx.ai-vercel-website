# Book Cover Spec — The Wordless Laws (Book One) · REBUILD
**Generated:** 2026-07-16 (v2 after critique)  
**Status:** render priority  
**Why v1 failed:** It was a *product photo of a book* (meta mockup), not a flat commercial cover. Thumbnail weak; metaphor busy; not KDP-native.

## Cover law (FrankX)

**The downloadable/ebook cover is FLAT GRAPHIC DESIGN at 1600×2560.**  
Never a photo of a physical book sitting on a table for the *actual* cover file. Physical mockups are a *secondary* marketing asset only.

---

## KDP / Kindle requirements (ebook front)

| Spec | Value |
|------|--------|
| Ideal size | **1600 × 2560 px** (width × height) |
| Ratio | ≥ **1.6:1** height:width |
| Format | JPEG or TIFF; RGB; < 50MB |
| Type | Legible at **~100px wide** Amazon thumbnail |
| Forbidden | Borders that look like frames; tiny unreadable type; low-contrast gold-on-navy at thumb |

Print wrap (later): back + spine + front + **0.125" bleed** all outer edges. Spine width = f(page count, paper). Use KDP Cover Calculator.

---

## What bestselling covers actually do

| Archetype | Examples | When to use |
|-----------|----------|-------------|
| **Big type + pure field** | Atomic Habits, many business bestsellers | Clarity, category signal, thumb power |
| **One object, full-bleed dark** | The Creative Act, prestige craft | Literary / contemplative |
| **Single symbol + void** | Meditations redesigns, stoic/wisdom | Philosophy |
| **Series system** | Penguin Clothbound, Knopf | Multi-book brand |
| **Avoid for master file** | Overhead product photos of hardcovers | Use only as *lifestyle mock* ads |

Industry truth: Amazon sells at **thumbnail**. Big type + one unforgettable mark beats clever 3D marble props.

---

## Concept v2: "THE UNNAMED KEY"

Deep indigo void. Massive gold Didone title. One thin vertical gold filament (the unread law). No marble slab prop. No book-on-table. Optional micro subtitle. Quiet, severe, iconic.

**Series grammar:** Book One = cool indigo + unbroken filament. Book Two = warm charcoal + filament broken into twelve practice ticks (already closer).

---

## NB2 PROMPT — Variant 1 (Big Type Flat · PRIMARY)

```
FLAT book cover graphic design for ebook and print front only — not a photograph of a physical book, not a 3D mockup, not a product shot on a table. Full-bleed vertical poster 2:3 (1600x2560). Deep indigo-black solid field #08080f with subtle fine cloth grain texture across the entire surface (printed texture, not a photographed object). Centered massive gold serif title in three stacked lines: "THE" / "WORDLESS" / "LAWS" — high-contrast Didone / Bodoni Modern, elegant hairline thins and thick verticals, gold foil color #C9A84C, perfect letterspacing, museum prestige. A single razor-thin vertical gold filament runs from just below the title block through the lower third of the cover like an unspoken law — unbroken, centered, glowing faintly at its midpoint with a warm amber pinpoint #E8B85C. Below the filament in small refined italic gold serif: "Twelve Forces That Shape Every Life". At bottom edge in small mixed-case sans: "Frank Riemer". Extreme negative space. No marble tablet, no open book object, no compass, no people, no robots, no purple neon gradients, no floating orbs, no stock spirituality symbols, no fake 3D hardcover edges. This must look like a Knopf / Penguin prestige paperback front cover, flat and printable.

COMPOSITION: Title upper 40%. Filament center axis. Subtitle mid-lower. Author bottom 8%. Safe margin 8% from all edges for print crop.

LIGHTING: Flat print design lighting — even field, slight vignette only at extreme edges. Filament has soft local glow.

MOOD: Authority, silence, discovery. A cover you trust before you read a word.

TECHNICAL: 1600x2560, 2:3, sharp vector-like type, print-ready graphic design, not photography of books.
```

---

## NB2 PROMPT — Variant 2 (Symbol Dominant)

```
FLAT ebook cover design 2:3, not a 3D book photo. Near-black indigo field. Upper third: gold Didone title "THE WORDLESS LAWS" in two lines, large. Center: twelve hairline vertical gold ticks arranged in a perfect quiet row like unmarked commandments (no numbers, no words on the ticks). One tick slightly brighter amber. Small subtitle and author in gold. Radical minimalism. Penguin Classics restraint. No props, no marble, no mockup photography.
```

---

## NB2 PROMPT — Variant 3 (Almost Pure Type)

```
FLAT cover. Solid #0a0a12. 70% of the visual weight is typography. "THE WORDLESS LAWS" in oversized gold foil Didone filling the top half. Tiny tracking-wide line "BOOK ONE". Thin gold rule. Subtitle italic. Author bottom. No illustration except a 1px gold vertical rule offset left like a margin mark in a sacred text. Bestseller thumbnail test: readable at 80px wide.
```

---

## After generative render

1. If type is mushy → keep background, **overlay exact type in Figma/Canva/Satori**  
2. Export: `the-wordless-laws-cover.jpg` 1600×2560 sRGB  
3. Also export: `_thumb.jpg` 400×640, `_og.jpg` 1200×630 crop, `_print-front.pdf` CMYK conversion later  
4. Physical mock (optional ad): separate shot of printed book — never replace master cover file

---

## Score gate

Ship only if: (1) title readable at 100px width, (2) no 3D book-in-scene, (3) series pair with Book Two obvious, (4) ≥26/30 premium gate.

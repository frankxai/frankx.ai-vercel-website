# /papa/erbe/ principles — ten standards as letterpress poster

**Filename:** `papa-ten-standards.png`
**Aspect:** 2:3 (poster proportion)
**Size:** 2K
**Model:** nb2
**Use:** Hero asset for `/papa/erbe/#prinzipien`, also exportable as a print poster + social share image.

**Generate with:**
```bash
node scripts/nb-generate.mjs \
  --spec public/images/papa/papa-ten-standards.spec.md \
  --out public/images/papa/papa-ten-standards.png \
  --aspect 2:3 --size 2K --model nb2
```

## Variant 1 — primary

A stylized letterpress poster, 2:3 portrait orientation. Black void `#0a0a0b` background. The poster has the visual restraint of a Swiss minimalist design or an old printer's broadside.

Top: small amber serif eyebrow, "ZEHN PRINZIPIEN" / "TEN PRINCIPLES"
Middle: a 2×5 grid of ten cards, each containing only a large numeric `01` through `10` in soul-amber, with abstract geometric symbols below each numeral. The symbols are NOT illustrations — they are pure shapes (a circle, a square, a triangle, an arrow, etc.), each unique, like a typographer's dingbats. Soul-amber `#f59e0b` ink on void.

Bottom: a small italic Source Serif 4 line at the foot, "Witali Riemer · 1969-2018"

The poster MUST leave most of its content as overlay-able placeholders — the actual ten principles will be rendered as React text on top. So the image is essentially a frame + 10 numbered slots, not the principles themselves.

Color palette: void `#0a0a0b`, soul-amber `#f59e0b`, soul-amber-dark `#d97706`, pale linework `#E8DDD0`. No other colors.

Refusals: no actual principle text in the image, no Christian iconography, no flags, no human figures, no decorative motifs beyond the geometric symbols.

## Variant 2 — single column

If the 2×5 grid feels too dense, render as a single column of 10 numbered rows, each with its abstract symbol.

## Variant 3 — minimal nine + one

A 3×3 grid of nine + one large central tenth. The tenth principle ("Werde so stabil dass andere sich anlehnen können") is given the place of weight.

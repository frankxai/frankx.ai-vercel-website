# /papa/leben/ — Pavlovka → Seesen migration arc

**Filename:** `papa-migration-map.png` (or `.jpg` per mimeType)
**Aspect:** 16:9
**Size:** 2K
**Model:** nb2
**Use:** Inline visual on `/papa/leben/` and `/papa/en/life/` between sections "Pavlovka, 1969" and "Der Weg zurück".

**Generate with:**
```bash
node scripts/nb-generate.mjs \
  --spec public/images/papa/papa-migration-map.spec.md \
  --out public/images/papa/papa-migration-map.png \
  --aspect 16:9 --size 2K --model nb2
```

## Variant 1 — primary

A stylized cartographic illustration of Eurasia rendered in dark void-black `#0a0a0b` foundation with soul-amber `#f59e0b` accents. The map is not photographic — it is hand-drawn aesthetic, sparse linework, deliberately unfinished feeling, like an old etching or a navigator's working chart.

Three cities are marked with small amber dots and labeled in elegant uppercase serif:
- **PAVLOVKA, KZ** — northern Kazakhstan (Pavlodar oblast, approx 53°N 77°E)
- **SAARATOV / WOLGA** — the Volga River region in Russia (mid-1700s ancestral home, mark with a small ghost-grey dot, secondary)
- **SEESEN, DE** — Lower Saxony, Germany (51.9°N 10.18°E)

A faint arcing line connects them in chronological order: Saratov (1763 emigration to Russia, in muted grey) → Pavlovka (1941 deportation by Stalin, slightly brighter amber) → Seesen (1970s-90s Spätaussiedler return, full amber with a small target ring).

Year markers in JetBrains Mono monospace at small size near each dot:
- `1763` near Saratov (the original Volga German invitation by Catherine the Great)
- `1941` near Pavlovka (deportation)
- `1969` near Pavlovka (Witali born — small additional star)
- `2018` near Seesen (Witali died — small additional star)

The Volga River, the Caspian Sea, the Aral Sea, the Black Sea, and the Baltic are very faintly drawn as ink-line silhouettes. Country borders are not drawn — geography is felt, not declared.

Bottom-right margin: small caption in italic Source Serif 4: *"Vier Generationen. Drei Länder. Eine Linie."*

Color palette: void `#0a0a0b`, soul-amber primary `#f59e0b`, faded amber secondary `#d97706`, pale linework white `#E8DDD0` at low alpha. No blues, no greens, no decorative gradients.

Refusals: no flag iconography, no political borders, no tourist-map iconography, no labels for countries, no human silhouettes, no text in Cyrillic (the page is bilingual in DE/EN; Cyrillic appears only on `/papa/ru/`).

## Variant 2 — close-up arc

Just the Pavlovka → Seesen segment, larger scale, with the deportation arc (Saratov → Pavlovka) shown only as a faint margin annotation. Use if Variant 1 feels too geographically vast.

## Variant 3 — vertical timeline instead

If the map approach feels wrong, render as a vertical timeline (16:9 aspect rotated mentally to a tall poster format) with the four cities as horizontal bands and arcs connecting them. Same palette.

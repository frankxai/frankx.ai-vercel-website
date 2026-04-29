# Book Cover Spec — The Golden Age of Intelligence
**Generated:** 2026-04-29  
**Agent:** visual-book-cover  
**Status:** ready — NB2 render pending  
**Brand gate:** pass  
**Anchor:** cold-start (genre defaults, philosophy)  
**Memory ID:** 1

---

## Book Brief

| Field | Value |
|---|---|
| Title | The Golden Age of Intelligence |
| Author | Frank Riemer |
| Genre | philosophy (visionary manifesto) |
| Thesis | The brain is the better device — 20 watts out-thinks 17,000 megawatts of data center — and AI's real gift is finally giving humans a mirror in which to see the intelligence they were always carrying |
| Slug | golden-age-of-intelligence |
| Aspect | ebook (1600×2560) |

---

## Concept: "The 20-Watt Filament"

Penguin Clothbound Classics meets visionary manifesto. A premium hardcover book photographed flat on a black surface from directly above. Deep matte black cloth cover, almost invisible at the edges. A single warm incandescent filament runs perfectly horizontal across the center — photographically real, the sole visual element. It is simultaneously the lightbulb (20W reference), the brain's spark, and the thread connecting ancient wisdom / neuroscience / AI.

---

## NB2 PROMPT — Variant 1 (Core Concept, Photorealist)

**Paste directly into NB2 MCP with `imageSize: '2K'`**

```
Photograph of a real premium hardcover book lying flat on a pure matte black surface, shot from directly above with a macro studio lens. The book has a deep charcoal-black cloth cover with a fine woven texture just barely visible at close range — like aged bookbinding linen. Across the exact horizontal center of the cover runs a single incandescent tungsten filament — a coiled wire thread of glowing amber-gold light, razor-thin, perfectly horizontal, photographically real, physically present as if the wire is embedded in the cloth. The filament glows warm and alive: color #E8B85C at its core brightening to near-white at the hottest coil points, radiating a soft elliptical halo of warm amber light onto the black cloth around it — no other light source exists. The title text "THE GOLDEN AGE OF INTELLIGENCE" appears above the filament in three lines, set in high-contrast Didone serif capitals (Bodoni Modern), rendered as gold foil letterpress stamping — the letters catch the single warm reflection of the filament below, so the foil shimmers subtly. Below the filament, a single line of smaller italic serif text reads "Awakening the Two Most Powerful Devices Ever Created" in gold foil, elegant and restrained. At the very bottom of the cover, in small confident mixed-case sans-serif, the author name "Frank Riemer" appears in gold foil. The composition is minimal: three typographic elements and one glowing wire. Nothing else. No symbols, no ornaments, no borders, no decorative elements whatsoever. The cloth texture gives the cover physical weight and material luxury.

SCENE: A single coiled tungsten wire — an incandescent filament from an Edison-era bulb — lies horizontally across the center of a deep matte black cloth-bound hardcover book. The wire glows warm amber-gold, self-illuminated, photographically real. The cloth shows a subtle woven texture, like aged bookbinding linen. Nothing else occupies the visual field except the glowing wire and the cloth. No background beyond the book's edges.

COMPOSITION: The filament runs horizontally at the exact vertical midpoint of the 2:3 portrait cover. Title occupies the upper 40% of the cover (three lines, centered, generous leading). Subtitle centered 80px below the filament. Author name bottom 8% of cover. Focal point: the filament's brightest coil, positioned on the left-center rule-of-thirds intersection. Depth layers: cloth surface (foreground), filament glow halo (mid), deep shadow at edges (background).

LIGHTING: Single warm point source — the filament itself is the only light in the scene. The rest of the cover is ambient near-darkness with only the filament's elliptical halo catching on the cloth weave texture. Museum photography quality. No overhead flash, no rim light, no fill. Deep vignette shadows at all four edges of the book.

PALETTE: #0A0A0B (book cloth, near-black hero), #E8B85C (filament core glow, warm tungsten gold), #C9A84C (foil type, warm metallic gold), #1A1A1F (cloth mid-tone in ambient shadow), #F5F0E8 (filament hotspot, near-white at peak heat coils).

TYPOGRAPHY: Title "THE GOLDEN AGE OF INTELLIGENCE" — Didone serif capitals (Bodoni Modern or Filosofia), gold foil letterpress, 3 lines, large and dominant, centered in upper 40% of cover. Subtitle "Awakening the Two Most Powerful Devices Ever Created" — italic serif, smaller, gold foil, centered, 80px below filament. Author "Frank Riemer" — mixed-case (not all caps) small sans-serif, gold foil, bottom 8% of cover. Leave clear space at top (40% of cover height) for title block — avoid details in this zone. Leave clear space at bottom 10% for author name.

STYLE REFERENCES: Penguin Clothbound Classics by Coralie Bickford-Smith, Knopf prestige hardcovers (The Hours, Normal People), Taschen art book overhead product photography. Material luxury, radical restraint, typographic confidence over illustration.

MOOD: The quiet authority of a book that does not need to announce itself. The filament says everything: small, precise, world-changing.

TECHNICAL: 4K resolution, portrait ratio 2:3 (1600x2560), book cover composition, photographed product shot from directly overhead, macro lens sharpness on cloth texture, no digital effects, no wireframes, no particles, no holographic overlays, no neon, no DNA helixes, no circuit board patterns, no neural network nodes, no glitch effects. Photographic realism only. The book should look credible on a shelf at Daunt Books London or in a Taschen catalog.
```

**MCP call:**
```js
mcp__nanobanana__generate_image({
  prompt: "<above>",
  imageSize: "2K"
})
// Save to: public/images/books/golden-age-of-intelligence-cover.<ext from inlineData.mimeType>
// NEVER hardcode .png — derive extension from mimeType
```

---

## NB2 PROMPT — Variant 2 (Minimal / Pure Typography Treatment)

More typographic. The filament moves to the background — barely visible, as if the glow is the book's inner warmth. Title dominates even more. Closer to Peter Mendelsund's abstract approach.

```
Photograph of a real premium hardcover book lying flat on a matte black surface, shot from directly above. The book has a deep black cloth cover — near-invisible at the edges, the cloth weave a whisper of texture. The cover is dominated by the typographic treatment: the title "THE GOLDEN AGE OF INTELLIGENCE" is gold foil-stamped in three lines of tall Didone serif capitals, occupying the top half of the cover. Each letter is precisely formed, the vertical strokes hairline-thin, the horizontal strokes bold — true Bodoni contrast. The gold foil catches a single warm light source from below the title. In the center of the cover, between title and author, a single horizontal rule — not a line but a tungsten filament — glows very faintly, barely-there, just enough warmth to read as light. The glow is restrained: amber hazing into the cloth, not theatrical. Below the filament: the subtitle in small italic serif gold foil. At the bottom: "Frank Riemer" in mixed-case small sans-serif gold foil.

SCENE: A cloth-bound book photographed overhead. The cover is 85% black cloth, 15% warm gold typography and a ghost of filament glow. The typography IS the cover. The filament is a breath of warmth.

COMPOSITION: Typography-dominant. Title fills top 50% of cover. Filament thin as a rule at exact center. Subtitle below. Author at bottom. Focal point: the contrast between the hairline serifs of the title and the deep black ground.

LIGHTING: Warm, directional, low. As if the book sits under a single reading lamp angled from above-right. The gold foil catches the light; the cloth absorbs it.

PALETTE: #0A0A0B (cloth, 85% of cover), #C9A84C (foil type, primary), #E8B85C (filament glow, faint), #8C6B2F (foil shadow side, deep gold), #1A1A1F (cloth texture tones).

TYPOGRAPHY: Title "THE GOLDEN AGE OF INTELLIGENCE" — tall Didone Bodoni serif capitals, maximum contrast thin/thick strokes, gold foil, 3 lines, centered, top half of cover. Subtitle italic serif, small, below center. Author "Frank Riemer" mixed-case small sans-serif, bottom.

STYLE REFERENCES: Peter Mendelsund typographic covers (Kafka, Stieg Larsson), Penguin Modern Classics black series, Faber & Faber minimal black cloth editions.

MOOD: A book that trusts its words more than its images. The gold on black is argument enough.

TECHNICAL: 4K resolution, portrait ratio 2:3 (1600x2560), overhead product photography, no digital effects, no neon, no particles, no decorative illustration. Pure typographic restraint.
```

**MCP call:** same as variant 1, save as `golden-age-of-intelligence-cover-v2.<ext>`

---

## NB2 PROMPT — Variant 3 (3D Product Mockup — Marketing Use)

**For:** `public/images/books/golden-age-of-intelligence-3d.<ext>`  
**Aspect:** 3:2 landscape (marketing hero, not cover)

```
Professional book product photography. A premium hardcover book photographed at a 35-degree angle from above and slightly to the right, showing the front cover and top edge with slight foreshortening. The book is closed, resting on a matte black slate surface. The cover is deep black cloth with visible woven texture. Across the center of the visible cover runs a single glowing tungsten filament — warm amber-gold, coiled, photographically real, the sole decorative element. The title "THE GOLDEN AGE OF INTELLIGENCE" is gold foil-stamped in tall Bodoni Didone serif capitals across the upper cover. The author "Frank Riemer" in small mixed-case sans-serif gold foil at the bottom. The book spine is visible on the left edge, showing the same title in vertical gold foil type. The surface the book rests on has a single soft warm reflection of the filament glow. Background is near-black, slightly out of focus. Lighting: single soft-box from upper left casting a directional shadow to the lower right.

SCENE: A physical premium hardcover book in three-quarter product photography angle. Front cover and left spine both visible. Deep black cloth, gold foil typography, glowing filament. Professional commercial product photography.

COMPOSITION: Book occupies center-right of frame. Slight 35-degree angle. Top edge and spine visible. Rule-of-thirds focal point on filament at cover center. 3:2 landscape ratio (1600x1067).

LIGHTING: Single soft-box upper-left. Filament provides warm secondary fill on cover surface. Clean directional shadow. Commercial product quality — could appear in a publisher's catalog or Amazon listings.

PALETTE: Same as cover: #0A0A0B, #E8B85C, #C9A84C.

STYLE REFERENCES: Taschen product photography, Phaidon publisher catalog shots, Penguin Clothbound Classics marketing imagery.

MOOD: A beautiful object. The cover makes you want to hold it.

TECHNICAL: 4K resolution, landscape ratio 3:2 (1600x1067), commercial product photography, 35-degree angle, depth of field with book sharp and background softly defocused, no digital effects, photographic realism only.
```

**MCP call:** same tool, `imageSize: '2K'`, save as `golden-age-of-intelligence-3d.<ext>`

---

## Typography Overlay Spec

For use in Library OS `app/library/[slug]/page.tsx` hero component:

```json
{
  "titleFont": "Playfair Display",
  "titleFontFallback": "Georgia, serif",
  "titleSize": 96,
  "titleColor": "#C9A84C",
  "titleColorFallback": "#fbbf24",
  "titlePlacement": "top",
  "titleWeight": "bold",
  "titleLetterSpacing": "0.12em",
  "titleLineHeight": 1.05,
  "subtitleFont": "Playfair Display",
  "subtitleStyle": "italic",
  "subtitleSize": 28,
  "subtitleColor": "#C9A84C",
  "subtitlePlacement": "center-below-filament",
  "authorFont": "Inter",
  "authorSize": 32,
  "authorWeight": "400",
  "authorColor": "#C9A84C",
  "authorPlacement": "bottom-60",
  "palette": ["#0A0A0B", "#E8B85C", "#C9A84C", "#1A1A1F", "#F5F0E8"],
  "heroColor": "#E8B85C",
  "backgroundDark": "#0A0A0B"
}
```

---

## Brand Gate Record

| Check | Result |
|---|---|
| Palette — all hexes from approved FrankX soul/amber spectrum | pass |
| Fonts — Playfair Display + Inter (both in tailwind.config.js fontFamily) | pass |
| No Arcanean mythology | pass |
| No spiritual-guru language | pass |
| No neon / glitch / wireframe / particles | pass |
| Author name mixed-case "Frank Riemer" (not all-caps) | pass |
| Voice: Humble Excellence, results over claims | pass |

**Overall verdict: pass**

---

## Quality Gate (Pre-Render Checklist)

Apply after NB2 renders each variant:

- [ ] Photographic framing (real physical book, not graphic design render)
- [ ] Single hero element (the filament — nothing else)
- [ ] Premium material quality (cloth weave visible + foil type)
- [ ] Title readable at 100px thumbnail width
- [ ] Author name "Frank Riemer" mixed case, small, bottom
- [ ] Zero neon / wireframe / AI-slop visuals
- [ ] No DNA helix, no circuit board, no neural-network nodes, no holographic overlays
- [ ] Would look credible on a Barnes & Noble shelf

---

## Save Paths

| Artifact | Path |
|---|---|
| Cover V1 (core) | `public/images/books/golden-age-of-intelligence-cover.<ext>` |
| Cover V2 (typographic) | `public/images/books/golden-age-of-intelligence-cover-v2.<ext>` |
| 3D mockup | `public/images/books/golden-age-of-intelligence-3d.<ext>` |

**Critical:** derive `<ext>` from `inlineData.mimeType` in NB2 response. Never hardcode `.png` from slug.

---

## Next Actions

1. Open Claude Desktop with NB2 MCP active
2. Paste each prompt above into `mcp__nanobanana__generate_image` with `imageSize: '2K'`
3. Derive extension from `inlineData.mimeType` (likely `image/jpeg` → `.jpg` or `image/png` → `.png`)
4. Save files to paths above
5. Run quality gate checklist on each render
6. Select best variant
7. Update `data/book-reviews.ts` cover path for slug `golden-age-of-intelligence`
8. Rename old `golden-age-cover.png` → `golden-age-cover.LEGACY.png` before overwriting
9. Run `@visual-brand-guidelines` final visual check on rendered file
10. Sync `public/images/books/` to production repo via standard dual-repo deploy

---

## Memory

Persisted to ReasoningBank ID: 1  
Intent: `book cover for philosophy`  
Future covers in philosophy/visionary genre will anchor to this spec.

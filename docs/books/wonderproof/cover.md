# Wonderproof — Cover Direction Spec

*Book 1 of the Wonderproof Series*

---

## Concept

A single question mark composed of fractal dots — thousands of small points that form the curve of the mark, suggesting both particle physics and assembled data. Embedded into the curve of the question mark, a small lab flask or beaker: the union of curiosity and experiment. The flask sits at the inflection point of the curve, where the arc turns.

The question mark is not stylized or decorative. It is precise, measured, scientific in its proportions — the same weight you would find in a technical instrument manual.

The background: void black. No gradients, no texture, no haze. Pure #000000 or close to it.

---

## Typography

**Title:** WONDERPROOF
- Typeface: Clean geometric sans-serif (Geist, Inter, or equivalent)
- Weight: Bold or ExtraBold
- Letter-spacing: +0.05em to +0.1em (slightly open, not tight)
- Case: All caps
- Position: Centered, below the question mark
- Color: White (#FFFFFF) or the accent color

**Tagline:** Run the experiment. Then decide.
- Typeface: Monospace (Geist Mono, IBM Plex Mono, or equivalent)
- Weight: Regular
- Size: Approximately 40% of title size
- Position: Directly below title, same horizontal center
- Color: Muted (#94a3b8 or similar cool gray)

**Series indicator:** Book 1 of the Wonderproof Series
- Typeface: Same monospace, lighter weight
- Size: Small (approximately 60% of tagline size)
- Position: Top of cover or bottom margin
- Color: Muted gray

**Author:** Frank Riemer
- Position: Bottom of cover
- Weight: Regular, same geometric sans

---

## Palette

**Primary:** Void black background (#000000 or #0a0a0b)

**Accent choice — pick one:**

**Option A: Pure white**
Question mark dots and typography in pure white (#FFFFFF). Clean, scientific, no-noise. The flask rendered as a fine white line drawing.

**Option B: Emergent gold**
Question mark dots in amber-gold (#fbbf24 or #f59e0b). The effect: a single glowing point of light in darkness, as if the question itself is the light source. Typography in white. The flask as a thin gold outline.

Do not mix both options. Pick one and commit to it.

---

## Flask Integration

The flask is not a prominent element — it is discovered on second look. It sits inside the loop at the bottom of the question mark curve, roughly where the dot of the question mark would be. The dot becomes the flask.

The flask should read as a laboratory Erlenmeyer flask or beaker, rendered as a thin outline (not filled). The same color as the question mark dots.

Size: The flask should be readable but not dominant — roughly 8-12% of the total image height.

---

## What to Avoid

- No mystical swirls, aurora gradients, or nebula effects
- No crystal, gemstone, or prism imagery
- No human silhouettes or faces
- No color gradients across the background
- No serif typography (this is a lab manual, not a philosophy book)
- No more than two colors plus black
- No stock-photo textures

---

## Reference Points

**Aesthetic direction:**
- Scientific instrument manuals from the 1960s-1970s: precision, clarity, function
- Particle physics visualizations: dots-as-structure, void backgrounds
- Technical reference typography: monospace, open tracking, high contrast

**Anti-references (do not resemble):**
- *The Secret* — no golden light beams or cosmic imagery
- Generic "mindset" books — no sunrise/mountain silhouettes
- New Age covers — no sacred geometry overlays

---

## Deliverables

- `public/images/books/wonderproof/cover.jpg` — 2000x3000px, 300dpi, JPEG quality 90+
- `public/images/books/wonderproof/cover-thumbnail.jpg` — 400x600px, for library index cards
- `public/images/books/wonderproof/cover-og.jpg` — 1200x630px, for Open Graph social preview

---

## Notes for Generation

If generating via NB2 (Gemini image) or Higgsfield:

```
Minimalist book cover. Void black background (#000000). Single large question mark composed of hundreds of tiny white dots/particles, scientific and precise proportions. Small laboratory Erlenmeyer flask integrated as the dot of the question mark, rendered as thin white outline. Clean geometric sans-serif title text: WONDERPROOF. Monospace tagline below: Run the experiment. Then decide. No gradients, no mystical effects, no aurora, no human figures. Scientific instrument aesthetic. High contrast. Pure design.
```

For the gold variant, replace "white" with "amber-gold (#fbbf24)" throughout.

# Deep Design Thinking Skill v1.0

## Purpose

Enforce a design-first workflow that prevents prompt-spamming and ensures premium visual output. This skill activates before ANY image generation to force proper thinking, research, and conceptual work.

## Activation

Auto-activates on: `cover`, `book cover`, `design`, `visual design`, `brand visual`, `image generation`, `album cover`, `thumbnail`, `hero image`, `/design-gods`, `/deep-design`

## The 80/20 Rule (MANDATORY)

**80% thinking, 20% generating.** Before ANY image generation call:

### Phase 1: Research (30% of time)

1. **Study references.** Find 5-10 real-world examples of what you're designing. Download or describe in detail.
2. **Analyze what works.** For each reference: What's the dominant element? What creates the emotion? What's the typography doing? What's the color palette? What creates depth?
3. **Identify the insight.** What single design principle makes the best references work? Name it explicitly.

### Phase 2: Concepting (30% of time)

4. **Write 3 distinct concepts.** Each concept must have:
   - A one-sentence thesis ("This cover is about X")
   - Material palette (what textures, surfaces, finishes)
   - Color strategy (2-3 colors max, with hex codes)
   - Typography approach (weight, style, placement)
   - The ONE visual element (or zero — typography alone is valid)
5. **Kill the weakest concept.** Explain why it's weakest. Proceed with 2.

### Phase 3: Art Direction (20% of time)

6. **Write the prompt as a creative brief**, not a description. Include:
   - The emotion/feeling the output must create
   - Material/texture references (e.g., "like brushed titanium" not "metallic")
   - What to AVOID (specific, not generic)
   - Photography vs illustration vs design decision
   - Lighting direction and quality
7. **Select the right approach for the model:**
   - Photographic product shot → describe as photograph of real object
   - Flat graphic design → describe as printed cover artwork
   - Reference-conditioned → use input_image_path for style anchoring

### Phase 4: Generation (15% of time)

8. Generate 3 variants of the 2 surviving concepts (6 total)
9. Present all 6 with analysis of strengths/weaknesses

### Phase 5: Refinement (5% of time)

10. Take the winner and generate 2-3 refinements with small adjustments

## Key Insights (Learned from Frank's Feedback)

### The Photorealism Insight

The model produces BETTER results when prompted as "photograph of a real physical object" rather than "design a cover." Why: the model has been trained on millions of product photographs but far fewer graphic design compositions. **Default to photographic framing.**

### The Material Insight

Premium = material quality, not visual complexity. Describe surfaces: leather grain, brushed metal, carbon fiber weave, matte paper stock, foil stamping, debossed type. The texture IS the design.

### The Iteration Insight

NEVER start from scratch after a strong result. Instead: take the winner, identify its 2 weaknesses, adjust only those, regenerate. Compound improvement, not random exploration.

### The Typography Insight

Author name: "Frank Riemer" — always mixed case, never ALL CAPS. Consistent typeface across all books. Small, confident, bottom placement. Title: bold, dominant, filling 30-40% of cover space.

### The Anti-Patterns

- ❌ Wireframe humans, neural networks, glowing particles
- ❌ Flat solid color with text overlay
- ❌ "Make it look like AI generated it"
- ❌ Multiple fonts, busy compositions
- ❌ Generating without conceptual work first
- ❌ Starting from scratch after a strong result

## Output Channels (Generate for ALL)

| Channel                   | Format            | Specs                       |
| ------------------------- | ----------------- | --------------------------- |
| Amazon KDP / Marketplaces | Flat front cover  | 2:3, 1600×2560px ideal      |
| Website /books page       | Flat front cover  | 2:3, 848×1264px             |
| Social / Marketing        | 3D product mockup | 4:3 or 3:2, angled          |
| Print POD                 | Flat, high-res    | 2:3, 2550×3825px at 300 DPI |

## Integration with Other Skills

- **book-publishing**: Cover generation is step 7 of the publishing pipeline
- **visual-creation**: This skill overrides generic visual-creation for book/album covers
- **brand-rules**: All covers must pass brand-rules color and typography checks
- **vis**: Register generated covers in visual-registry.json after creation

## Quality Gate

Before presenting ANY generated image to Frank:

- [ ] Was the 80/20 process followed? (Research → Concept → Art Direction → Generate)
- [ ] Is the typography readable at 100px thumbnail size?
- [ ] Does the cover feel like a premium physical object?
- [ ] Would this look credible on a Barnes & Noble shelf?
- [ ] Is "Frank Riemer" in mixed case, bottom, small and elegant?
- [ ] Does it avoid ALL anti-patterns listed above?

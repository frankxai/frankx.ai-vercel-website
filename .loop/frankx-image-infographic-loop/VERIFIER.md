# Verifier Contract

## Verdict Schema
```json
{
  "asset": "filename",
  "surface": "social-square|social-portrait|social-wide|website-hero|blog-hero|infographic-frame",
  "verdict": "PASS|ITERATE|RESTART|BLOCKED",
  "score": 0,
  "strength": "",
  "weakness": "",
  "next_prompt_delta": "",
  "evidence": ""
}
```

## Review Steps
1. Open the copied export with `view_image`.
2. Check first read, composition, brand fit, crop, and artifacts.
3. Score with the 30 point gate:
   - 5 first read and hierarchy.
   - 5 brand fit and distinctiveness.
   - 5 craft quality, typography, spacing, composition.
   - 5 accessibility, contrast, responsiveness, reduced motion if relevant.
   - 5 factual accuracy, provenance, no artifacts.
   - 5 usefulness on intended surface.
4. Decide:
   - PASS at 26-30.
   - ITERATE at 22-25 with one targeted prompt change.
   - RESTART below 22.
   - BLOCKED when a human or different production method is required.

## Independence Rule
Do not approve an image only because the prompt was strong. Judge the actual export.

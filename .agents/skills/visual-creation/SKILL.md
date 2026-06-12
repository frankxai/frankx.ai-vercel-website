---
name: "Visual Creation"
description: "Quality-gated image generation workflow. Enforces 6-step pipeline with council review, organic-first principle, and human approval gate before batch generation. Use for ALL image generation tasks."
---

# Visual Creation Skill

## Purpose

Structurally enforced quality pipeline for image generation. Every step blocks the next — you cannot skip council review, you cannot batch without human approval, you cannot generate without studying the style DNA first.

**This skill supersedes direct calls to Nano Banana MCP for any brand-visible image.**

---

## The 6-Step Pipeline

### Step 1: STUDY (Required — Cannot Skip)

Before drafting any prompt, read and internalize:

1. **Read** `docs/strategy/IMAGE_STYLE_DNA.md` — the canonical style reference
2. **Identify** which of the 3 approved styles fits:
   - Dark Premium Glass (70% — architecture, ecosystem, products)
   - Da Vinci Codex (15% — research, complete guides)
   - Light Workshop (15% — tutorials, workshops)
3. **Select sub-variant** if Dark Premium Glass:
   - C1 Cyberpunk Neon (comparisons, roadmaps)
   - C2 Da Vinci Dark (ecosystem, flagship)
   - C3 Cinematic Studio (music, creative)
   - C4 Holographic Command (AI orchestration)
4. **Choose organizing metaphor**: A physical object or scene that structures the composition (armillary sphere, inventor's workbench, neural forest canopy, crystal cave laboratory). NOT "a futuristic visualization."
5. **Name 4+ components**: Each gets a CAPS LABEL (THE SKILL ENGINE, THE MEMORY VAULT). No "a gear" or "some icons."

**Self-check before proceeding**: Can you name the style, sub-variant, metaphor, and 4+ components? If not, you haven't studied enough.

---

### Step 2: DRAFT (Structured Template Required)

Load the appropriate template from `data/visual-prompt-templates.json` and fill ALL fields. Every field is mandatory — empty fields block progression.

**Template anatomy** (all fields required):

```
SUBJECT: [What this image depicts — specific, not generic]
ORGANIZING METAPHOR: [Physical object/scene structuring the composition]
STYLE: [Approved style name + sub-variant]
VIEWPOINT: [Camera angle — isometric, bird's eye, dramatic low angle, etc.]

COMPONENTS (minimum 4):
1. NAME: [CAPS LABEL]  |  POSITION: [where in frame]  |  COLOR: [hex]  |  MATERIAL: [tactile description]
2. NAME: [CAPS LABEL]  |  POSITION: [where in frame]  |  COLOR: [hex]  |  MATERIAL: [tactile description]
3. NAME: [CAPS LABEL]  |  POSITION: [where in frame]  |  COLOR: [hex]  |  MATERIAL: [tactile description]
4. NAME: [CAPS LABEL]  |  POSITION: [where in frame]  |  COLOR: [hex]  |  MATERIAL: [tactile description]

ORGANIC ANCHOR: [Living/organic element — creature, plant, texture, growth pattern]
FOREGROUND: [What's closest to viewer]
MIDGROUND: [Central subject area]
BACKGROUND: [Atmospheric depth]
ATMOSPHERE: [Lighting, mood, particles, fog, glow]
EMOTIONAL TONE: [What viewer should feel]
NEGATIVE: [What to explicitly exclude — always include standard anti-patterns]
```

**Organic Anchor rule**: Every prompt MUST include an organic anchor. This is the single most critical field. Reference: `mascot-v05-techno-beast-standing.png` — fur before circuits, character in eyes, glow from within.

---

### Step 3: COUNCIL (Blocking Agent Call)

Submit the drafted prompt to the `visual-creation-council` agent for review.

**This step is BLOCKING. You cannot proceed without an APPROVED verdict.**

```
Invoke: visual-creation-council agent
Input: The completed template from Step 2
Expected output: Score + verdict (APPROVED / NEEDS-REVISION / REJECTED)
```

**If NEEDS-REVISION**: Address ALL feedback points, resubmit. Maximum 3 revision cycles.
**If REJECTED**: Fundamentally rework the prompt. Do not iterate on a rejected concept.
**If APPROVED**: Proceed to Step 4.

---

### Step 3.5: OPTIMIZE PROMPT (Two-Model Pattern)

Before sending to the image model, **optimize the prompt using a text model**:

1. Take the approved template from Step 3
2. Use Codex/Gemini Flash to expand it with:
   - Missing visual details (lighting direction, camera lens, time of day)
   - Material textures (brushed metal, leather grain, frosted glass)
   - Composition guidance (rule of thirds, leading lines, depth layers)
   - Negative prompt enhancement (add common failure patterns to avoid)
3. The text model's job: fill gaps the human didn't think of, NOT change the creative direction

**Why this works**: Image models produce dramatically better results when prompts include specific physical details (lighting, texture, camera) rather than abstract concepts. A text model bridges the gap between "what you mean" and "what the image model needs to hear." Research shows prompt scores go from ~49/100 to 95/100 with this optimization step.

**Skip for**: Simple test generations or when the prompt is already highly detailed.

---

### Step 4: TEST (Human Gate — Blocking)

Generate exactly **1 image** using the approved prompt.

```javascript
mcp__nanobanana__generate_image({
  prompt: "{approved_prompt}",
  aspect_ratio: "16:9",
  model_tier: "pro",
  enable_grounding: true,
  thinking_level: "high",
  resolution: "high",
});
```

**Show the test image to the user. Wait for explicit feedback.**

This is the core fix for the "24 chrome robots at once" problem. One image. Human eyes. Then decide.

**Do NOT proceed to Step 5 or 6 until the user responds.**

Acceptable user responses:

- "Looks good" / "Approved" → Proceed to Step 6 (or skip if only 1 image needed)
- "Change X" → Proceed to Step 5 (ITERATE)
- "Start over" → Return to Step 2

---

### Step 5: ITERATE (If Needed)

Apply user feedback to the prompt. If changes are significant (new metaphor, different style, major composition shift), re-submit to council (Step 3). If changes are minor (color tweak, label adjustment), proceed directly.

Maximum 2 iteration cycles in this step. If still not satisfactory, return to Step 2 with fresh approach.

---

### Step 6: EXECUTE (Controlled Batch)

Generate a batch of **3-5 images maximum** (not 24).

For each generated image, apply the 7-gate quality filter:

| Gate                   | Check                                   |
| ---------------------- | --------------------------------------- |
| 1. Brand Alignment     | Matches approved style?                 |
| 2. Color Balance       | 3+ accent colors visible?               |
| 3. Information Density | Every area purposeful?                  |
| 4. Depth Layers        | Foreground/mid/background identifiable? |
| 5. Text Legibility     | Labels readable at 680px?               |
| 6. Icon Quality        | Rich 3D, not flat clipart?              |
| 7. Scroll-Stop         | Would you pause scrolling?              |

**Plus the organic warmth test**: Does this image have living presence, or is it sterile chrome?

**Score each image 1-10. Flag any scoring < 6 for regeneration.**

Log results to `data/image-generation-log.json`.

---

## Quick Reference: What Makes Prompts Fail

| Failure Pattern                            | Why It Fails                    | Fix                                                                        |
| ------------------------------------------ | ------------------------------- | -------------------------------------------------------------------------- |
| "A visualization of AI systems"            | No specificity, no metaphor     | Name a physical metaphor: "An inventor's clockwork observatory"            |
| Components listed as "gears, icons, nodes" | Generic, unnamed, no color      | "THE MEMORY VAULT — bottom-left — chrome and obsidian — #43BFE3 glow"      |
| No organic element                         | Produces sterile chrome renders | Add creature, root network, crystal growth, bioluminescent moss            |
| Single color palette                       | Monotone, boring                | Always specify 3+ hex codes from brand palette                             |
| "Futuristic" as sole style direction       | Means nothing to image model    | Specify exact surfaces: "glass panels with chrome bezels, navy background" |

---

## Integration

- **Council agent**: `.Codex/agents/visual-creation-council.md`
- **Style reference**: `docs/strategy/IMAGE_STYLE_DNA.md`
- **Templates**: `data/visual-prompt-templates.json`
- **Generation log**: `data/image-generation-log.json`
- **Regeneration queue**: `data/image-regeneration-queue.json`
- **MCP**: Nano Banana (Gemini 2.5 Flash Image)
- **Skill rules**: `.Codex/skills/skill-rules.json` (triggers on image generation keywords)

---

## When NOT To Use This Skill

- Quick throwaway test generations (not for production/brand use)
- Screenshots or screen captures
- User provides their own complete prompt and explicitly opts out of council review

For all brand-visible images — blog heroes, social posts, product visuals, mascot scenes — this skill is mandatory.

---

_Visual Creation Skill v1.0 — Feb 21, 2026_
_Quality over quantity. One excellent image beats twenty mediocre ones._

---
name: infogenius
version: "3.0.0"
description: "Master Visual Knowledge & Infographic Generation Engine for FrankX and Arcanea. Transforms complex research, architectures, and algorithms into publication-grade infographics across 5 distinct visual traditions: Leonardo da Vinci Technical Manuscripts, Photorealistic Macro Photography, 3D Isometric Architecture, Focused Futuristic HUDs, and Business Professional TCO Matrices."
user-invocable: true
allowed-tools:
  - generate_image
  - WebSearch
  - view_file
  - write_to_file
---

# InfoGenius Visual Engine v3.0

> *"Ground in Research, Render with Mathematical Precision, Manifest with Impeccable Taste."*

## 1. Visual Creation Council & Taste Standard

Every generation passes through the **3-Lens Visual Creation Council**:
1. **Brand Guardian (35%)**: Enforces dark obsidian palette (`#0A0A0B`, `#111113`), laser telemetry accents (Emerald `#10B981`, Electric Cyan `#06B6D4`, Amber Gold `#F59E0B`, Indigo `#6366F1`), Inter/Poppins typography, and strict anti-slop rules (blocks claymorphic blobs, generic brains, clipping).
2. **Art Director (40%)**: Enforces named physical organizing metaphors (Leonardo da Vinci cutaways, 3D floating glass platforms, wafer-scale silicon dies, fluid manifolds) with 3 explicit depth layers (foreground, midground, background).
3. **Storyteller (25%)**: Ensures emotional resonance, architectural truth, and editorial narrative depth.

---

## 2. The 5 Canonical Visual Styles

| Style ID | Visual Tradition | Key Aesthetics | Ideal Content Domain |
|---|---|---|---|
| `da-vinci-technical` | Leonardo da Vinci Manuscript | Warm aged vellum, sepia & walnut ink, cross-hatching, golden ratio geometry ($\Phi = \frac{1+\sqrt{5}}{2}$), Italian Renaissance annotations | Cognitive architectures, FSM state machines, algorithms, fluid thermodynamics |
| `photorealistic` | Macro Industrial Studio | 85mm macro lens, Hasselblad depth-of-field, dark titanium, gold bond wires, luminescent cyan `#06B6D4` microfluidic channels | Silicon dies, wafer-scale engines, cold plates, datacenter hardware |
| `3d-isometric` | Modern Clean Architecture | Floating obsidian glass slabs, soft ambient occlusion, glowing emerald `#10B981` & cyan `#06B6D4` conduits | Multi-tier hierarchies, distributed protocol meshes, memory vaults |
| `focused-futuristic` | High-Tech Telemetry | Dark slate floor, laser-etched circuits, restrained HUD telemetry | Cloud routing meshes, model routing Pareto frontiers |
| `business-professional` | Executive Unit Economics | Executive dark luxury, marble conference matrix, ascending outcome receipts vs. dissipative token loops | Cost-Per-Verified-Outcome (CPVO), TCO matrices, ROI models |

---

## 3. The 3-Step Execution Pipeline

### Step 1: Research Grounding
Extract 3–5 verified facts, formulas, or hardware specifications before constructing the visual prompt.

### Step 2: Prompt Formula
```
Masterpiece {aspect_ratio} visual infographic in the style of {style_id}.
TOPIC: {topic}
CORE METAPHOR: {physical_organizing_metaphor}
KEY ELEMENTS:
- {fact_1_visualized}
- {fact_2_visualized}
- {fact_3_visualized}
PALETTE: Dark obsidian #0A0A0B base, titanium #1E1E24 chassis, {primary_accent} and {secondary_accent} conduits.
LIGHTING & DEPTH: Chiaroscuro studio lighting, 3 distinct depth layers (foreground, midground, background).
QUALITY DIRECTIVES: 8k octane render, clean, zero text-slop or gibberish characters, museum-grade aesthetic.
```

### Step 3: Image Generation & Integration
Execute via `generate_image` or Nano Banana CLI (`scripts/nb-generate.mjs`), place in `public/images/blog/generated/`, and embed with descriptive Markdown figure captions and ASCII architectural companions.

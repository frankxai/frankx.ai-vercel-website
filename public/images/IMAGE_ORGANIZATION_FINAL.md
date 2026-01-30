# FrankX Image Organization - Final

**Date:** 2026-01-27

---

## Product Lines & Image Mapping

### 1. AI Architect Track (Enterprise/Technical)

**Audience:** Technical professionals, enterprise clients
**Style:** Dark HUD, cyan/orange, clean diagrams

| Image | New Name | Use |
|-------|----------|-----|
| `six-plane-enterprise-ai-architecture.jpeg` | *(keep)* | Enterprise AI articles |
| `acos-v25-technical-architecture.jpeg` | *(keep)* | ACOS documentation |
| `ai-toolchain-motherboard.jpeg` | *(keep)* | AI tools comparison |
| `orchestrator-core-agents.jpeg` | *(keep)* | Multi-agent content |
| `acos-agent-orchestration-diagram.jpeg` | *(keep)* | ACOS overview |
| `infographic-1769307586902.png` | `acos-workflow-architecture.png` | Technical docs |
| `infographic-1769307741003.png` | `acos-synthesis-pipeline.png` | Skills docs |
| `infographic-1769306428802.png` | `acos-3-phase-workflow.png` | Quickstart |
| `infographic-1769307870140.png` | `acos-council-agents.png` | Agent architecture |

**Move to:** `/public/images/blog/` or `/public/images/acos/`

---

### 2. Consciousness & Personal Growth Track

**Audience:** Personal development seekers, spiritual explorers
**Style:** Neural imagery, quantum concepts, transformation visuals

| Image | New Name | Use |
|-------|----------|-----|
| `infographic-1769306324429.png` | `quantum-neuroplasticity-guide.png` | Consciousness articles |
| `infographic-1769306735184.png` | `quantum-bridge-framework.png` | Manifestation content |
| `infographic-1769307427098.png` | `quantum-mechanics-chapter.png` | Book/course content |
| `infographic-1769307730697.png` | `quantum-jumping-schematic.png` | Deep-dive content |
| `infographic-1769306405035.png` | `neuro-technical-blueprint.png` | Technical consciousness |
| `infographic-1769307233700.png` | `alpha-wave-multiverse.png` | Brainwave content |

**Move to:** `/public/images/consciousness/` (new folder)

---

### 3. Vibe OS Track (Music/Frequency)

**Audience:** Music creators, frequency enthusiasts
**Style:** Sonic visualizations, brainwave patterns, meditation imagery

| Image | New Name | Use |
|-------|----------|-----|
| `infographic-1769306406851.png` | `vibe-os-sonic-intelligence.png` | Vibe OS landing |
| `infographic-1769307362570.png` | `vibe-os-neural-sync.png` | Neural sync feature |
| `infographic-1769306492744.png` | `vibe-os-brainwave-interface.png` | Brainwave content |

**Move to:** `/public/images/vibe-os/` (new folder)

---

### 4. Arcanea Track (Gamified Education)

**Audience:** Learners who enjoy gamified experiences
**Style:** Fantasy academy, character cards, world-building

| Image | New Name | Use |
|-------|----------|-----|
| `infographic-1769306306764.png` | `arcanea-grand-academy.png` | Academy overview |
| `infographic-1769306511078.png` | `arcanea-hall-of-luminor.png` | Course content |
| `infographic-1769307440068.png` | `arcanea-campus-map.png` | Navigation/landing |
| `infographic-1769307711673.png` | `arcanea-cognitive-bridge.png` | Learning concepts |
| `infographic-1769307779543.png` | `arcanea-latent-space.png` | AI concepts |
| `infographic-1769307251948.png` | `arcanea-neuro-synthesis.png` | Advanced content |

**Move to:** `/public/images/arcanea/` (new folder)

---

### 5. Soulbook Track (Already Organized)

**Location:** `/public/images/soulbook/`
**Status:** ✅ Complete - 8 pillar images + heroes

---

### 6. Golden Age Book (Already Organized)

**Location:** `/public/images/golden-age/`
**Status:** ✅ Complete - 4 chapter images

---

### 7. General/Multi-Use

| Image | New Name | Use |
|-------|----------|-----|
| `infographic-1769307312391.png` | `friendly-ai-robot.png` | Intro/explainer content |
| `infographic-1769307531501.png` | `consciousness-triptych.png` | General hero |
| `crystalline-brain-runes.png` | *(keep)* | AI art gallery |

---

## Folder Structure (Proposed)

```
/public/images/
├── blog/                    # Article heroes (existing)
├── acos/                    # NEW - ACOS technical diagrams
├── consciousness/           # NEW - Quantum/neural/growth
├── vibe-os/                 # NEW - Music/frequency
├── arcanea/                 # NEW - Gamified education
├── soulbook/                # Existing - Seven pillars
├── golden-age/              # Existing - Book chapters
├── ai-art/                  # Existing - Artistic pieces
└── general/                 # Multi-use images
```

---

## Rename & Move Script

```bash
#!/bin/bash
cd /mnt/c/Users/Frank/FrankX/public/images

# Create new folders
mkdir -p acos consciousness vibe-os arcanea general

# ACOS Technical
mv infographic-1769307586902.png acos/acos-workflow-architecture.png
mv infographic-1769307741003.png acos/acos-synthesis-pipeline.png
mv infographic-1769306428802.png acos/acos-3-phase-workflow.png
mv infographic-1769307870140.png acos/acos-council-agents.png

# Consciousness
mv infographic-1769306324429.png consciousness/quantum-neuroplasticity-guide.png
mv infographic-1769306735184.png consciousness/quantum-bridge-framework.png
mv infographic-1769307427098.png consciousness/quantum-mechanics-chapter.png
mv infographic-1769307730697.png consciousness/quantum-jumping-schematic.png
mv infographic-1769306405035.png consciousness/neuro-technical-blueprint.png
mv infographic-1769307233700.png consciousness/alpha-wave-multiverse.png

# Vibe OS
mv infographic-1769306406851.png vibe-os/vibe-os-sonic-intelligence.png
mv infographic-1769307362570.png vibe-os/vibe-os-neural-sync.png
mv infographic-1769306492744.png vibe-os/vibe-os-brainwave-interface.png

# Arcanea
mv infographic-1769306306764.png arcanea/arcanea-grand-academy.png
mv infographic-1769306511078.png arcanea/arcanea-hall-of-luminor.png
mv infographic-1769307440068.png arcanea/arcanea-campus-map.png
mv infographic-1769307711673.png arcanea/arcanea-cognitive-bridge.png
mv infographic-1769307779543.png arcanea/arcanea-latent-space.png
mv infographic-1769307251948.png arcanea/arcanea-neuro-synthesis.png

# General
mv infographic-1769307312391.png general/friendly-ai-robot.png
mv infographic-1769307531501.png general/consciousness-triptych.png

echo "✓ All images organized by product line"
```

---

## Summary

| Track | Images | Status |
|-------|--------|--------|
| AI Architect | 9 | Ready to organize |
| Consciousness | 6 | Ready to organize |
| Vibe OS | 3 | Ready to organize |
| Arcanea | 6 | Ready to organize |
| Soulbook | 8 | ✅ Done |
| Golden Age | 4 | ✅ Done |
| General | 3 | Ready to organize |

**Total: 39 images across 7 product lines**

---

*All images KEPT - organized by audience/product*

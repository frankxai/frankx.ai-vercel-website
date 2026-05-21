#!/usr/bin/env node
/**
 * scripts/visuals/architecture-of-intelligence-batch.mjs
 *
 * Batch hero-image generation for the Architecture of Intelligence research
 * spine shipped 2026-05-03. 13 assets across Tier 1 (nbpro, hero pieces) and
 * Tier 2 (nb2, body pieces).
 *
 * Idempotent — skips any output file that already exists (with any extension
 * the model returned). Re-run safely.
 *
 * Usage:
 *   node scripts/visuals/architecture-of-intelligence-batch.mjs            # all 13
 *   node scripts/visuals/architecture-of-intelligence-batch.mjs --tier 1   # just Tier 1
 *   node scripts/visuals/architecture-of-intelligence-batch.mjs --tier 2   # just Tier 2
 *   node scripts/visuals/architecture-of-intelligence-batch.mjs --asset series-hero
 *   node scripts/visuals/architecture-of-intelligence-batch.mjs --force    # regenerate even if exists
 *
 * Plan: docs/superpowers/specs/2026-05-03-research-hub-buildout.md
 */

import { existsSync } from 'node:fs';
import { resolve, dirname, basename, extname } from 'node:path';
import { generateImage } from '../lib/nb-image.mjs';

// ─── Shared design-thinking blocks ────────────────────────────────────────

const NEGATIVES = `## NEGATIVES (avoid all)
glowing particles, neural network imagery, wireframe humans, brain scans,
holograms, futuristic UI, flat color blocks with text overlay, AI-generated
aesthetic, busy compositions, multiple competing elements, generic stock-photo
look, beveled edges, lens flare, clip-art, infographic chart styling,
multiple fonts, gradient overlays, decorative borders, watermarks.`;

const STYLE_REGISTER = `## STYLE REFERENCES
Editorial register of The New Yorker, MIT Technology Review, The Atlantic.
Anthropic-style restraint. Edward Tufte ink-on-cream. Stripe documentation
calm. Honest still-life photography of physical paper artifacts. Single
confident element, 60-70% negative space. Material conviction beats visual
complexity.`;

// ─── Asset catalog ────────────────────────────────────────────────────────

const ASSETS = [
  // ───── Tier 1 — Concept A (architectural drawings, nbpro premium) ─────
  {
    id: 'series-hero',
    tier: 1,
    out: 'public/images/research/architecture-of-intelligence-hero.jpg',
    model: 'nbpro',
    aspect: '16:9',
    size: '2K',
    prompt: `## CONCEPT
The hero image for a research series called The Architecture of Intelligence.
A folded architectural blueprint photographed on a desk surface — abstract
nested concentric forms suggesting layered systems, not any specific building.

## SCENE
Editorial photograph of a folded architectural blueprint sitting on a clean
desk surface. The blueprint shows abstract nested concentric forms — circles
within circles within circles — suggesting layered systems. No labels, no
recognizable building. The fold creases give the paper subtle dimension.

## ART DIRECTION
Honest still-life photography. Camera angle 25 degrees overhead. The composition
emphasizes restraint — 70% of the frame is paper texture, desk surface, and
quiet shadow. The blueprint occupies the lower-right third. No people, no hands.

## LIGHTING
Soft daylight entering from the upper left. Raking shadow on the right side
of each fold and the right edge of the blueprint. No artificial light, no
specular highlights, no studio strobes.

## PALETTE
Cream paper stock (warm off-white, ~#F4EDE0). Fine black ink lines on the
blueprint (~#1A1A1A). One small bright vermillion red registration mark in
the lower-right of the blueprint (~#C8322A). Desk surface in cool neutral
gray (~#A8A29E). No other colors.

## TYPOGRAPHY
None. No text on the artifact, no overlay text in the image.

## MATERIAL
Cream blueprint paper with subtle fiber visible at close inspection. Fine
ink lines, sharp but not mechanical. Subtle fold creases. Soft natural shadow
from the paper edge against the desk.

${STYLE_REGISTER}

${NEGATIVES}`,
  },
  {
    id: 'no-bad-parts-flagship',
    tier: 1,
    out: 'public/images/blog/no-bad-parts-sovereign-ai-hero.jpg',
    model: 'nbpro',
    aspect: '16:9',
    size: '2K',
    prompt: `## CONCEPT
Hero image for the flagship blog post No Bad Parts: What Richard Schwartz
Teaches Us About Building Sovereign AI. A small architectural model pinned
to a wall with annotated paper notes — the model is layered abstract paper
forms suggesting nested protective enclosures around a central core.

## SCENE
Editorial photograph of a small architectural model pinned to a cream studio
wall with brass map-pins. Three to five small paper note cards are pinned
near the model with handwritten ink annotations. The model itself is layered
cream paper forms — a central core surrounded by progressively larger
enclosures, suggesting protection without being literal architecture.

## ART DIRECTION
Honest still-life photography. The model occupies the left third of the
frame. The annotated notes are scattered to the right. Long soft shadow
extending right from the model. 60% of the frame is the cream wall and shadow.
No hands, no people.

## LIGHTING
Soft raking afternoon daylight from the upper left. The model casts a
defined but soft shadow extending toward the right side of the frame. The
note cards have their own subtle shadows. No artificial light.

## PALETTE
Cream wall (~#F4EDE0) and matching cream paper stock for the model and notes.
Black handwritten ink on the notes (~#1A1A1A). Brass map-pins (warm metallic
gold, ~#B08D57). One single bright vermillion red pin marks the central core
of the model (~#C8322A). No other colors.

## TYPOGRAPHY
The note annotations should look like genuine handwritten ink — not
typeset. They are illegible in the photograph (this is the whole point —
texture, not content). No overlay text.

## MATERIAL
Cream paper with visible fiber. Brass pins with realistic patina. The model
paper has clean folds and fine cut edges. Subtle paper translucency where
layers overlap.

${STYLE_REGISTER}

${NEGATIVES}`,
  },
  {
    id: 'predictive-mind-flagship',
    tier: 1,
    out: 'public/images/blog/predictive-mind-reality-models-hero.jpg',
    model: 'nbpro',
    aspect: '16:9',
    size: '2K',
    prompt: `## CONCEPT
Hero image for the flagship blog post The Predictive Mind: Why You Don't
See Reality, You See Your Model. Two cream paper sheets layered slightly
offset, each printed with delicate topographic contour lines in deep indigo
ink — the contours suggest fields of probability or layered prediction, not
literal terrain.

## SCENE
Editorial photograph of two cream paper sheets layered slightly offset on a
clean desk surface. Each sheet has fine topographic-style contour lines
printed in deep indigo ink. Where the sheets overlap, contour lines from the
lower sheet are subtly visible through the upper sheet's translucency. One
small punctuation mark in vermillion sits at a contour intersection on the
upper sheet.

## ART DIRECTION
Honest still-life photography. Camera angle 30 degrees overhead. The two
sheets occupy the central two-thirds of the frame at a slight diagonal. 60%
of the frame is the desk surface and quiet shadow around the paper edges.
No hands, no people, no labels.

## LIGHTING
Soft daylight from the upper left producing raking shadow on the right side
of each sheet. The translucency of the upper sheet only reads where the
light catches the ink underneath. No artificial light.

## PALETTE
Cream paper stock (~#F4EDE0). Deep indigo ink for the contour lines (~#2C2A6E).
Single vermillion punctuation mark (~#C8322A). Cool neutral gray desk surface
(~#A8A29E). No other colors.

## TYPOGRAPHY
None. No text on the sheets, no overlay text.

## MATERIAL
Cream paper with visible fiber and subtle translucency. Fine printed ink
lines, sharp at close inspection. Soft natural shadows where one sheet sits
slightly above the other.

${STYLE_REGISTER}

${NEGATIVES}`,
  },

  // ───── Tier 2 — Concept B (topographic / layered paper, nb2) ─────
  {
    id: 'ai-agents-inner-family',
    tier: 2,
    out: 'public/images/blog/ai-agents-inner-family-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a single cream paper diagram of nested concentric circles, four to six circles ranging from small to large, drawn with confident clean lines',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'no-bad-parts-ai-debugging',
    tier: 2,
    out: 'public/images/blog/no-bad-parts-ai-debugging-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a cream paper page with a single confident line drawing of interconnected abstract forms — no labels, no recognizable objects, just shapes connected by thin lines',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'inner-hr-ai-agent',
    tier: 2,
    out: 'public/images/blog/inner-hr-ai-agent-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a folded cream paper organization chart showing rectangular nodes connected by simple lines — the nodes are small and unlabeled, suggesting hierarchy without specifying it',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'meaning-as-operating-system',
    tier: 2,
    out: 'public/images/blog/meaning-as-operating-system-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a cream paper cascade diagram showing four stacked horizontal bands of decreasing width, like a filter cascade, drawn with simple ruled lines',
      accentName: 'amber',
      accentHex: '#B45309',
    }),
  },
  {
    id: 'embodied-creator-os',
    tier: 2,
    out: 'public/images/blog/embodied-creator-os-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'an open hardcover notebook lying flat showing a two-page spread with simple anatomical-register line sketches — abstract forms suggesting movement and balance, not detailed anatomy',
      accentName: 'lime green',
      accentHex: '#65A30D',
    }),
  },
  {
    id: 'memory-as-exile-ai',
    tier: 2,
    out: 'public/images/blog/memory-as-exile-ai-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a stack of three to five cream paper folders lying flat, with one tab pulled slightly out from the stack revealing a simple unreadable handwritten label',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'agent-family-architecture',
    tier: 2,
    out: 'public/images/blog/agent-family-architecture-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a cream paper org-chart with branching nodes — one node at the top connected by simple lines to four to six nodes below, all unlabeled, drawn with confident lines',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'guide-ifs-personal-development',
    tier: 2,
    out: 'public/images/guides/ifs-personal-development-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'an open journal-style notebook lying flat on a desk, two-page spread with handwritten ink notes (illegible — texture not content)',
      accentName: 'rose',
      accentHex: '#BE185D',
    }),
  },
  {
    id: 'guide-ifs-ai-architecture',
    tier: 2,
    out: 'public/images/guides/ifs-ai-architecture-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a cream paper architectural diagram with role placeholder boxes connected by lines — the boxes are small and unlabeled, the diagram suggests hierarchical roles without specifying',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
  {
    id: 'guide-inner-hr-ai',
    tier: 2,
    out: 'public/images/guides/inner-hr-ai-hero.jpg',
    model: 'nb2',
    aspect: '16:9',
    size: '2K',
    prompt: tier2Prompt({
      artifact: 'a cream paper conversation-prep template with grid lines and a few short handwritten ink notes (illegible texture, not readable text)',
      accentName: 'cyan',
      accentHex: '#0891B2',
    }),
  },
];

// ─── Tier 2 prompt template ──────────────────────────────────────────────

function tier2Prompt({ artifact, accentName, accentHex }) {
  return `## CONCEPT
A topographic / layered-paper hero image for the Architecture of Intelligence
research series body content. Single confident artifact, photographed honestly,
restrained editorial register.

## SCENE
Editorial photograph of ${artifact}, photographed on a clean cream-colored desk
surface. The artifact occupies the central or lower portion of the frame.

## ART DIRECTION
Honest still-life photography. Camera angle 25-30 degrees overhead. 60% of
the frame is paper texture, desk surface, and quiet shadow. No hands, no
people, no labels in the image, no overlay text.

## LIGHTING
Soft daylight from the upper left producing raking shadow on the right side
of the artifact. No artificial light, no specular highlights, no studio
strobes. The shadow is the secondary subject after the artifact itself.

## PALETTE
Cream paper stock (~#F4EDE0). Fine ${accentName} ink markings on the artifact
only (${accentHex}). No other colors except neutral cream and accent.
Cool neutral gray for the desk surface where it shows.

## TYPOGRAPHY
None. Any markings on the artifact should look like ink lines or unreadable
handwriting — texture, not content. No overlay text.

## MATERIAL
Cream paper with visible fiber at close inspection. Sharp clean ink lines
where the artifact is drawn / printed. Soft natural shadows.

${STYLE_REGISTER}

${NEGATIVES}`;
}

// ─── Driver ──────────────────────────────────────────────────────────────

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
function flag(name) { return process.argv.includes(name); }

function existsAnyExt(targetPath) {
  const dir = dirname(targetPath);
  const stem = basename(targetPath, extname(targetPath));
  if (!existsSync(dir)) return false;
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    if (existsSync(`${dir}/${stem}${ext}`)) return `${dir}/${stem}${ext}`;
  }
  return false;
}

async function main() {
  const tierFilter = arg('--tier');
  const idFilter = arg('--asset');
  const force = flag('--force');

  const todo = ASSETS.filter((a) => {
    if (tierFilter && String(a.tier) !== tierFilter) return false;
    if (idFilter && a.id !== idFilter) return false;
    return true;
  });

  console.error(`\n=== Architecture of Intelligence visual batch ===`);
  console.error(`assets queued: ${todo.length} of ${ASSETS.length} total\n`);

  const results = [];
  for (const a of todo) {
    const outAbs = resolve(a.out);
    const existing = existsAnyExt(outAbs);
    if (existing && !force) {
      console.error(`[skip] ${a.id} → already exists at ${existing}`);
      results.push({ id: a.id, status: 'skip', path: existing });
      continue;
    }
    console.error(`\n[${a.tier === 1 ? 'TIER 1' : 'tier 2'}] ${a.id}`);
    console.error(`  → ${a.out} (${a.model}, ${a.aspect}, ${a.size})`);
    try {
      const r = await generateImage({
        prompt: a.prompt,
        outputPath: outAbs,
        model: a.model,
        aspectRatio: a.aspect,
        imageSize: a.size,
        enforceDesignThinking: true,
        fallback: true,
        backupExisting: true,
        verbose: true,
      });
      results.push({ id: a.id, status: 'ok', path: r.path, model: r.model, bytes: r.bytes });
    } catch (e) {
      console.error(`  ✗ ${e.message}`);
      results.push({ id: a.id, status: 'error', error: e.message });
    }
  }

  console.error(`\n=== summary ===`);
  for (const r of results) {
    const tag = r.status === 'ok' ? '✓' : r.status === 'skip' ? '·' : '✗';
    console.error(`  ${tag} ${r.id} ${r.status === 'ok' ? `(${r.path}, ${r.bytes} bytes)` : r.status === 'skip' ? `(${r.path})` : `[${r.error}]`}`);
  }
  console.error('');
}

main().catch((e) => { console.error(e); process.exit(1); });

#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { generateImage, loadRoutingConfig } from './lib.mjs'
import { getPreset, buildPromptFromPreset } from './preset-loader.mjs'

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'priority-2026-04-25')
const REPORT_PATH = path.join(OUT_DIR, 'BATCH_REPORT.md')

const BRIEFS = [
  {
    id: '01-build-hero',
    target: '/build (Build Your First AI Agent funnel)',
    preset: 'frankx/premium-gradient',
    thesis: 'Five tiers, one ascent — premium SaaS funnel hero',
    topic: 'the Build Your First AI Agent five-tier ascent — Primer to Founder\'s Circle',
    creativeDirection: 'Photograph of five sculptural glass-and-brushed-metal platforms ascending against a deep navy void, each platform faintly larger and higher than the last, the topmost catching warm gold light from above. Subtle cyan rim light on platform edges. The ascent reads as deliberate craftsmanship, not a stairway. Generous negative space above for headline overlay. Studio product photography, soft shadows, no clutter. Material: brushed titanium, matched glass, no plastic.',
    avoid: 'pyramids, staircases, mountain metaphors, motivational poster vibes, glowing neural networks, AI cliché',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'high',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '02-coe-hub-framework',
    target: '/coe-hub (Personal AI Center of Excellence framework)',
    preset: 'frankx/coe-blueprint',
    thesis: 'Six pillars, one operating model',
    topic: 'the six-pillar Personal AI Center of Excellence framework: Strategy, Governance, Talent, Technology, Data, Ethics',
    creativeDirection: 'Premium consulting-grade framework poster. Six rectangular pillar cards arranged in a clean 3-column 2-row grid. Each card has a gold (#F59E0B) header with the pillar name in crisp legible sans-serif, a small geometric icon, and 2-3 line description. Dark navy (#0F172A) background with subtle texture. Cyan (#43BFE3) connecting lines between adjacent pillars showing relationships. Title at top in white: "Personal AI Center of Excellence". Reads at-a-glance like a McKinsey deck slide rendered in product-grade typography. Text labels MUST be sharp, accurately spelled, and crisply rendered.',
    avoid: 'neural network spaghetti, glowing brain, generic AI imagery, cartoon icons, sci-fi font',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'high',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '03-os-unified-hero',
    target: '/os (FrankX OS unification page)',
    preset: 'frankx/3d-isometric',
    thesis: 'Five systems, one operating system',
    topic: 'the FrankX OS — five connected modules: Watch, Workshop, ACO, ACOS, CoE Hub',
    creativeDirection: 'Photographed isometric arrangement of five glossy navy-and-cyan polymer module-blocks floating on a soft gradient surface, connected by thin glowing cyan lines that show data flow between modules. Each block has a subtle illuminated facet showing its system name. Soft studio key light from upper left, gentle shadow underneath. Looks like an Apple keynote product visualization. Premium materials — glossy plastic over satin metal. The composition feels like a still life of a working machine, not a diagram.',
    avoid: 'flat icons, ugly node graphs, motherboard imagery, glowing wireframe',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'medium',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '04-sis-substrate-hero',
    target: '/starlight-intelligence-system (SIS standalone hub)',
    preset: 'frankx/focused-futuristic',
    thesis: 'Nine layers, one substrate',
    topic: 'the Starlight Intelligence System foundational substrate — nine IS layers anchored by SIP',
    creativeDirection: 'Photograph looking down at nine translucent stacked planes of dark glass, each plane edge-lit with cyan (#43BFE3) light, slightly offset so all nine layers are visible. Each plane has subtle text engraved at the edge. Deep navy (#0F172A) background, gentle gold (#F59E0B) accent on the topmost plane only. Reads as foundational, architectural, considered — like a museum display of a system\'s strata. Material quality: dark Gorilla glass, brushed steel base.',
    avoid: 'Christopher Nolan tesseract, hexagons, Marvel UI, glowing letters mid-air',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'medium',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '05-library-approach-manifesto',
    target: '/library/approach (Library OS manifesto)',
    preset: 'frankx/da-vinci-technical',
    thesis: 'Persistent intelligence — knowledge as architecture',
    topic: 'the Library OS as persistent digital library — a personal architecture for accumulated wisdom',
    creativeDirection: 'Photograph of an open Leonardo da Vinci notebook resting on a wooden desk in warm directional light. The visible spread shows hand-drawn ink sketches of bookshelves rendered as architectural columns supporting a small cathedral-like structure of ideas. Marginalia in brown ink, with one element rendered in thin cyan (#43BFE3) ink as a temporal bridge to the digital. Aged parchment, period-appropriate ink texture. Photographed naturalistically — visible page grain, subtle sepia. The notebook IS the message.',
    avoid: 'AI-generated manuscript clichés, neural cathedral, glowing books, Hogwarts library',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'medium',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '06-founders-circle-hero',
    target: '/founders-circle (€2,997 inner circle tier)',
    preset: 'frankx/business-professional',
    thesis: 'Inner circle, no spectacle',
    topic: 'the Founders Circle — exclusive inner cohort, restrained luxury',
    creativeDirection: 'Photograph of a single thin gold (#F59E0B) ring resting on dark navy (#0F172A) brushed-leather surface, lit by soft directional light from upper right. The ring is unadorned, perfectly machined, with subtle wear suggesting use. No engravings, no jewels, no logo. Negative space dominates the composition — the ring sits in the lower-third. Hermès / Patek Philippe product photography aesthetic. Quiet confidence, restraint, IYKYK. Material quality: 18k gold over navy chromium leather.',
    avoid: 'crowns, cigars, mahogany boardrooms, "exclusive members" stock photo, gold credit cards',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'medium',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '07-start-here-threshold',
    target: '/start-here (entry point)',
    preset: 'frankx/premium-gradient',
    thesis: 'The threshold',
    topic: 'the entry point to FrankX systems — a deliberate beginning',
    creativeDirection: 'Photograph of a tall single rectangular doorway cut into a wall of polished navy stone, with warm cyan-purple light spilling outward through the opening. The interior beyond the door dissolves into soft gradient (navy → royal purple #AB47C7 → cyan glow). The threshold is centered with deep negative space above for "Start Here" headline overlay. No figure in the frame — the viewer is the protagonist. Architectural photography sensibility — Tadao Ando meets Apple Park. Material: honed dark stone, bronze door frame.',
    avoid: 'literal welcome mat, arrow icons, "begin journey" cliché, glowing portals',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'medium',
    size: '1536x1024',
    quality: 'high',
  },
  {
    id: '08-agent-frameworks-triptych',
    target: '/research/agent-frameworks (Starlight Agent Lab brief)',
    preset: 'community/blueprint-technical',
    thesis: 'Three frameworks, one comparison',
    topic: 'comparison of three agent frameworks: Vercel AI SDK (web), Claude Agent SDK (reasoning), Google ADK (enterprise)',
    creativeDirection: 'Da Vinci notebook style triptych on warm sepia-toned parchment. Three vertical panels side-by-side, each labeled in crisp legible serif at the top: "VERCEL AI SDK", "CLAUDE AGENT SDK", "GOOGLE ADK". Below each label, a hand-drawn brown-ink architectural schematic showing the framework\'s primitives — boxes, arrows, components. Marginalia annotations in elegant handwritten style. Subtle FrankX cyan (#43BFE3) accent on a single connecting element bridging the three. Reads as a Renaissance polymath\'s comparative study, but the labels MUST be crisply rendered and accurately spelled.',
    avoid: 'cluttered code, terminal screenshots, version numbers, kawaii icons',
    aspect: '16:9',
    provider: 'nano-banana',
    model: 'gemini-3-pro-image-preview',
    resolution: '2K',
    thinking: 'high',
    size: '1536x1024',
    quality: 'high',
  },
]

function buildPrompt(brief, preset) {
  return [
    `Create a ${brief.aspect} photograph for ${brief.target}.`,
    '',
    `THESIS: ${brief.thesis}`,
    '',
    `TOPIC: ${brief.topic}`,
    '',
    `VISUAL STYLE: ${preset.promptFragment}`,
    '',
    `CREATIVE DIRECTION: ${brief.creativeDirection}`,
    '',
    preset.palette?.length ? `BRAND PALETTE (must honor): ${preset.palette.join(', ')}` : '',
    preset.composition ? `COMPOSITION: ${preset.composition}` : '',
    '',
    `AVOID: ${brief.avoid}`,
    '',
    'Premium product photography quality. Sharp, intentional, considered. Text labels (if any) must be crisply rendered and correctly spelled.',
  ].filter(Boolean).join('\n')
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const config = await loadRoutingConfig()

  const startedAt = new Date()
  const results = []
  let totalEstimatedCost = 0

  console.log(`\n=== Priority Batch Render — ${BRIEFS.length} images ===`)
  console.log(`Output: ${OUT_DIR}\n`)

  for (let i = 0; i < BRIEFS.length; i += 1) {
    const brief = BRIEFS[i]
    console.log(`[${i + 1}/${BRIEFS.length}] ${brief.id} → ${brief.target}`)
    console.log(`    Preset: ${brief.preset} | Model: ${brief.model} | Thinking: ${brief.thinking}`)

    let preset
    try {
      preset = await getPreset(brief.preset)
    } catch (error) {
      console.error(`    Preset lookup failed: ${error.message}`)
      results.push({ ...brief, status: 'preset-error', error: error.message })
      continue
    }

    const prompt = buildPrompt(brief, preset)
    const outPath = path.join(OUT_DIR, `${brief.id}.png`)
    const startedRender = Date.now()

    const provider = brief.provider || 'openai'
    try {
      const result = await generateImage(config, {
        provider,
        prompt,
        model: brief.model,
        size: brief.size,
        quality: brief.quality,
        thinking: brief.thinking,
        aspect: brief.aspect,
        resolution: brief.resolution,
        output: outPath,
      })

      const duration = ((Date.now() - startedRender) / 1000).toFixed(1)
      const estimatedCost = brief.thinking === 'high' ? 0.30 : 0.17
      totalEstimatedCost += estimatedCost

      console.log(`    OK in ${duration}s — ${result.files.join(', ')} (~$${estimatedCost.toFixed(2)})\n`)
      results.push({
        ...brief,
        status: 'ok',
        files: result.files,
        durationSec: Number(duration),
        estimatedCost,
        prompt,
      })
    } catch (error) {
      console.error(`    FAIL: ${error.message}\n`)
      results.push({ ...brief, status: 'error', error: error.message, prompt })
    }
  }

  const finishedAt = new Date()
  const lines = [
    `# Priority Batch Render — 2026-04-25`,
    ``,
    `**Started:** ${startedAt.toISOString()}`,
    `**Finished:** ${finishedAt.toISOString()}`,
    `**Duration:** ${((finishedAt - startedAt) / 1000).toFixed(1)}s`,
    `**Total estimated cost:** $${totalEstimatedCost.toFixed(2)}`,
    `**Successes:** ${results.filter((r) => r.status === 'ok').length} / ${BRIEFS.length}`,
    ``,
    `## Results`,
    ``,
    `| # | ID | Target | Preset | Status | Cost | File |`,
    `|---|---|---|---|---|---|---|`,
    ...results.map((r, i) => {
      const file = r.files?.[0] ? path.relative(process.cwd(), r.files[0]).replace(/\\/g, '/') : '—'
      const cost = r.estimatedCost ? `$${r.estimatedCost.toFixed(2)}` : '—'
      return `| ${i + 1} | \`${r.id}\` | ${r.target} | \`${r.preset}\` | ${r.status} | ${cost} | \`${file}\` |`
    }),
    ``,
    `## Briefs (for traceability)`,
    ``,
    ...results.map((r) => [
      `### ${r.id} — ${r.target}`,
      ``,
      `**Thesis:** ${r.thesis}`,
      `**Preset:** \`${r.preset}\` · **Model:** \`${r.model}\` · **Thinking:** \`${r.thinking}\``,
      ``,
      r.status === 'ok' ? `Generated: \`${path.relative(process.cwd(), r.files[0]).replace(/\\/g, '/')}\` in ${r.durationSec}s` : `**Status:** ${r.status} — ${r.error || 'unknown'}`,
      ``,
      `<details><summary>Full prompt</summary>`,
      ``,
      '```',
      r.prompt || '(prompt not generated)',
      '```',
      ``,
      `</details>`,
      ``,
    ].join('\n')),
  ].join('\n')

  await writeFile(REPORT_PATH, lines, 'utf8')

  console.log(`\n=== DONE ===`)
  console.log(`Report: ${REPORT_PATH}`)
  console.log(`Total est. cost: $${totalEstimatedCost.toFixed(2)} (~€${(totalEstimatedCost * 0.93).toFixed(2)})`)
  console.log(`Successes: ${results.filter((r) => r.status === 'ok').length} / ${BRIEFS.length}`)
}

main().catch((error) => {
  console.error(`[render-priority-batch] ${error.message}`)
  process.exit(1)
})

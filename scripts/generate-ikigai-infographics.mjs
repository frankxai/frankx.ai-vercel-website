#!/usr/bin/env node
/**
 * Generate Ikigai & Branding infographics. Compares two Gemini image models
 * side-by-side so we can pick the winner per infographic.
 *
 *   gemini-2.5-flash-image         = "Nano Banana"  (cheaper, faster)
 *   gemini-3-pro-image-preview     = "Nano Banana Pro / Nano Banana 2"  (4K, best text)
 *
 * Run: GEMINI_API_KEY=... node scripts/generate-ikigai-infographics.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const KEY = process.env.GEMINI_API_KEY
if (!KEY) {
  console.error('GEMINI_API_KEY not set')
  process.exit(1)
}

const MODELS = [
  { id: 'gemini-2.5-flash-image', tag: 'nb1' },
  { id: 'gemini-3-pro-image-preview', tag: 'nb2' },
]

const OUT_DIR = path.join(process.cwd(), 'public/images/workshops/ikigai-branding')

/**
 * Tightened prompts: short on-image copy only. All longer text lives in the page.
 * Explicit spelling reinforcement + aspect ratio.
 */
const briefs = [
  {
    slug: 'ikigai-venn',
    prompt: `Editorial infographic on pure black background (#0a0a0b): the classic Ikigai four-circle Venn diagram, Bauhaus minimalism, isometric orthographic feel.

Four equally sized translucent circles with soft inner glow and fine 1px outline, arranged in a square so all four overlap in a shared center. Each circle in ONE of these colors only:
- top-left circle: violet #8B5CF6
- top-right circle: amber #F59E0B
- bottom-left circle: emerald #10B981
- bottom-right circle: cyan #06B6D4

Labels — render EXACTLY these words, correctly spelled, in clean sans-serif small caps in warm white (#FAFAFA):
- inside top-left circle: WHAT YOU LOVE
- inside top-right circle: WHAT YOU ARE GOOD AT
- inside bottom-left circle: WHAT THE WORLD NEEDS
- inside bottom-right circle: WHAT PAYS

Inside the four pairwise lens-shaped overlaps, render these exact labels in smaller italic serif:
- top lens (love + good at): PASSION
- left lens (love + world needs): MISSION
- right lens (good at + pays): PROFESSION
- bottom lens (world needs + pays): VOCATION

Center four-way intersection: the single word IKIGAI in elegant serif uppercase, warm white, slightly larger than all other labels.

CRITICAL: every label must be perfectly spelled. No other text anywhere. No stray characters, no watermarks, no numbers. No icons or decorations.

Aspect ratio 2:1 wide (landscape, much wider than tall). Premium dark-glass aesthetic, Dieter Rams restraint, Stripe infographic clarity.`,
  },
  {
    slug: 'purpose-to-brand-flow',
    prompt: `Editorial horizontal flowchart infographic on pure black background (#0a0a0b) with very subtle radial violet-to-amber ambient glow.

Four glassmorphism cards arranged in a single horizontal row, evenly spaced, connected by three slim gradient arrows flowing left-to-right (violet #8B5CF6 fading into amber #F59E0B). Each card is a translucent rounded rectangle with faint inner glow, 1px light border.

Inside each card, render ONLY a number (1 through 4) in small caps at top, then the title in clean sans-serif uppercase — nothing else:
Card 1 title: IKIGAI STATEMENT
Card 2 title: POSITIONING
Card 3 title: AUDIENCE OF ONE
Card 4 title: CONTENT PILLARS

Each card has a single minimalist line icon above the title: card 1 = compass, card 2 = target, card 3 = single person silhouette, card 4 = three stacked bars.

CRITICAL: titles must be perfectly spelled. No subtext, no body copy, no extra labels, no watermarks. Clean, sparse, editorial. Apple keynote premium.

Aspect ratio 16:9 (very wide landscape). Premium dark-glass aesthetic.`,
  },
  {
    slug: 'three-cs-triad',
    prompt: `Premium 3D claymorphism render on pure black background (#0a0a0b) with soft warm rim lighting.

Three tactile matte-clay shapes interlocking in a triangular formation, fused at a glowing warm-white central core:
- Top: a violet (#8B5CF6) rounded sphere
- Bottom-left: an amber (#F59E0B) rounded cube
- Bottom-right: an emerald (#10B981) rounded triangular prism

Each shape has a single word debossed on its front-facing surface in clean sans-serif uppercase, perfectly spelled:
- the violet sphere: COLLABORATION
- the amber cube: COMMUNICATION
- the emerald prism: CREATION

CRITICAL: "COMMUNICATION" must be spelled C-O-M-M-U-N-I-C-A-T-I-O-N. No other text anywhere. No floor grid, no caption, no additional elements.

Soft studio key light from upper-left. Nintendo-meets-Pixar render quality. Matte finish, subtle hand-shaped clay imperfections, gentle ambient occlusion where shapes meet.

Aspect ratio 1:1 (perfect square). Apple keynote product-shot quality.`,
  },
]

async function generateOne(model, brief) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${KEY}`
  const body = {
    contents: [{ parts: [{ text: brief.prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${model.tag}/${brief.slug}: HTTP ${res.status}: ${text.slice(0, 400)}`)
  }
  const data = await res.json()
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find((p) => p.inlineData?.data)
  if (!imgPart) {
    throw new Error(
      `${model.tag}/${brief.slug}: no image in response: ${JSON.stringify(data).slice(0, 400)}`
    )
  }
  const buf = Buffer.from(imgPart.inlineData.data, 'base64')
  const ext = imgPart.inlineData.mimeType?.includes('jpeg') ? 'jpg' : 'png'
  const outPath = path.join(OUT_DIR, `${brief.slug}.${model.tag}.${ext}`)
  await fs.writeFile(outPath, buf)
  console.log(`[${model.tag}/${brief.slug}] ${(buf.length / 1024).toFixed(0)} KB → ${path.basename(outPath)}`)
  return { model: model.id, slug: brief.slug, path: outPath, bytes: buf.length }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const jobs = []
  for (const model of MODELS) for (const brief of briefs) jobs.push({ model, brief })
  console.log(`Dispatching ${jobs.length} generations in parallel…\n`)
  const results = await Promise.allSettled(jobs.map((j) => generateOne(j.model, j.brief)))
  const log = results.map((r, i) => ({
    model: jobs[i].model.id,
    tag: jobs[i].model.tag,
    slug: jobs[i].brief.slug,
    status: r.status,
    ...(r.status === 'fulfilled' ? r.value : { error: r.reason?.message }),
  }))
  const logPath = path.join(OUT_DIR, 'generation-log.json')
  await fs.writeFile(
    logPath,
    JSON.stringify({ timestamp: new Date().toISOString(), results: log }, null, 2)
  )
  const ok = log.filter((l) => l.status === 'fulfilled').length
  console.log(`\n${ok}/${jobs.length} succeeded. Log: ${logPath}`)
  if (ok < jobs.length) {
    console.log('Failed:')
    log.filter((l) => l.status === 'rejected').forEach((l) => console.log(`  ${l.tag}/${l.slug}: ${l.error}`))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

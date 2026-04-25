#!/usr/bin/env node
/**
 * Generate atmospheric brand imagery for /starlight-intelligence-system.
 *
 * Pattern: design-thinking discipline (3 concepts, killed weakest, art-directed both surviving).
 * Model: gemini-3-pro-image-preview (Nano Banana Pro, 4K). Pulls API key from ~/.claude/mcp.json.
 *
 * Usage: node scripts/generate-sis-imagery.mjs
 */
import { GoogleGenAI } from '../../Arcanea/arcanea-infogenius/mcp-server/node_modules/@google/genai/dist/node/index.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.join(REPO_ROOT, 'public', 'images', 'sis')

// Pull GEMINI_API_KEY from env, falling back to ~/.claude/mcp.json
function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY
  const mcpPath = path.join(os.homedir(), '.claude', 'mcp.json')
  if (fs.existsSync(mcpPath)) {
    const cfg = JSON.parse(fs.readFileSync(mcpPath, 'utf8'))
    const stack = [cfg]
    while (stack.length) {
      const node = stack.pop()
      if (node && typeof node === 'object') {
        if (node.GEMINI_API_KEY) return node.GEMINI_API_KEY
        for (const v of Object.values(node)) stack.push(v)
      }
    }
  }
  return null
}

const API_KEY = loadApiKey()
if (!API_KEY) {
  console.error('GEMINI_API_KEY not found in env or ~/.claude/mcp.json')
  process.exit(1)
}

const ai = new GoogleGenAI({ apiKey: API_KEY })

// Two concepts that survived the design-thinking kill cycle.
// (Killed: "Sovereignty Stack" — overlapped with the SVG LayerStack which does it better with precise labels.)
const concepts = [
  {
    slug: 'sis-hero-architecture-emerges',
    aspect: '16:9',
    description: 'Hero — the moment chaos finds its form',
    prompt: `A cinematic wide editorial photograph, low angle, ultra-wide 24mm lens with shallow depth of field.

FOREGROUND (left third): scattered creative fragments caught in golden-hour rim light — translucent paper notes, dim glowing screens, half-open notebooks, post-its with handwritten frameworks, all slightly out of focus. They drift weightlessly in dark space, suggesting fifteen years of work scattered across drives and apps.

MIDGROUND (center): a single luminous threshold — a glowing emerald-and-cyan vertical seam where chaos resolves into order. Faint particles flow from left to right through this seam. The seam carries a subtle glyph stamp reading "SIP".

BACKGROUND (right two-thirds): a sovereign architected structure — like a Zaha Hadid building made of nine layered translucent intelligence-strata stacked from foundation to crown. The bottom layer glows the brightest, an emerald-cyan luminance that suggests "this is where you start." Each upper layer is more translucent, indicating compounding. The architecture rises into a deep midnight-blue sky with a hint of aurora.

MATERIALS: frosted glass strata, brushed obsidian frames, thin gold structural lines between layers, fiber-optic edges where light bleeds through.

PALETTE: deep midnight #020617, sovereign emerald #10b981, cool cyan #22d3ee, warm amber rim light #f59e0b on the foreground fragments. No purple or pink tones.

MOOD: editorial premium, sovereign, calm but powerful — the moment chaos finds its form. Reminiscent of architecture monographs and Apple keynote product reveals. Confident, understated.

NO TEXT, NO LOGOS, NO HUMAN FIGURES, NO TYPOGRAPHY, NO UI ELEMENTS, NO CARTOON STYLING. Photographic realism with cinematic post-production. Sharp detail throughout, no AI artifacts, no glowing particles cliché overdose.`,
  },
  {
    slug: 'sis-cartographers-desk',
    aspect: '3:2',
    description: 'Secondary — discovering the map already exists in your work',
    prompt: `A 3/4 angle editorial photograph of a craftsman's desk, shot from slightly above, 50mm lens, warm tungsten lamp light from upper-left.

ON THE DESK: a chaotic but beautiful spread of authentic creative practice — a leather notebook with handwritten coaching frameworks, three or four loose printed Canva slide exports stacked at angles, a closed laptop with screenshots peeking out, a brass compass, a fountain pen, a half-cup of cold coffee, post-it notes with arrows and circles. The materials feel real, lived-in, fifteen years of craft.

OVERLAID ON TOP: a translucent architectural blueprint paper unfurled across the center of the desk, glowing softly with a cyan-emerald inner light. The blueprint shows nine horizontal layered bands stacked from bottom to top, the bottom band glowing the brightest. The blueprint is being weighted down by the brass compass and the leather notebook — as if the architecture is emerging from the materials beneath it, not imposed on top.

NO PEOPLE VISIBLE, but the lamp light suggests a presence just out of frame.

MATERIALS: aged paper, worn leather, brass with patina, dark walnut wood desk surface, glowing blueprint paper with cyan-emerald inner illumination, soft warm tungsten ambient light from a desk lamp.

PALETTE: deep walnut brown, off-white paper, warm amber lamp light, cool cyan-emerald blueprint glow as the only cool note. No saturated colors, no purple, no pink.

MOOD: editorial photography for an architecture or craft monograph. Quiet, intentional, sovereign. The emotional beat is recognition — "the map already exists in my work, I just need to see it." Reminiscent of Cabinet magazine, Kinfolk, Apprentice Magazine. Confident, premium, no nostalgia kitsch.

NO TEXT, NO LOGOS, NO TYPOGRAPHY, NO UI MOCKUPS. Photographic realism with editorial post-production.`,
  },
]

async function generateOne(concept) {
  console.log(`\n[${concept.slug}] ${concept.description}`)
  console.log(`  → calling gemini-3-pro-image-preview (aspect ${concept.aspect})...`)
  const start = Date.now()

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: concept.prompt,
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: { aspectRatio: concept.aspect },
    },
  })

  const parts = response.candidates?.[0]?.content?.parts
  if (!parts) throw new Error('No candidates in response')

  for (const part of parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64')
      const outPath = path.join(OUTPUT_DIR, `${concept.slug}.png`)
      fs.writeFileSync(outPath, buffer)
      const elapsed = ((Date.now() - start) / 1000).toFixed(1)
      console.log(`  ✓ wrote ${outPath} (${(buffer.length / 1024).toFixed(0)} KB, ${elapsed}s)`)
      return outPath
    }
    if (part.text) {
      console.log(`  [model commentary] ${part.text.slice(0, 200)}...`)
    }
  }
  throw new Error(`No image in response for ${concept.slug}`)
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log(`Output dir: ${OUTPUT_DIR}`)
  console.log(`Generating ${concepts.length} brand images via Nano Banana Pro...`)

  const results = []
  for (const concept of concepts) {
    try {
      const out = await generateOne(concept)
      results.push({ slug: concept.slug, path: out, ok: true })
    } catch (e) {
      console.error(`  ✗ ${concept.slug} FAILED: ${e.message}`)
      results.push({ slug: concept.slug, ok: false, error: e.message })
    }
  }

  console.log(`\n--- Summary ---`)
  for (const r of results) {
    console.log(r.ok ? `✓ ${r.slug}` : `✗ ${r.slug} — ${r.error}`)
  }
  const failures = results.filter((r) => !r.ok).length
  process.exit(failures > 0 ? 1 : 0)
}

main()

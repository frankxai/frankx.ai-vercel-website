#!/usr/bin/env node
/**
 * Generative Hero Art — premium, textless, on-brand blog hero images.
 *
 * Why textless: article pages already render the title/description as HTML over
 * the hero, so the best visuals are cinematic abstract art (FrankX visual guide:
 * "no text, no logos"). This produces layered, deterministic generative art per
 * slug — aurora gradients, intelligence threads, orbital rings, constellations —
 * rendered to PNG via sharp (no external API).
 *
 * Usage:
 *   node scripts/visuals/generate-hero-art.mjs <slug> [--theme tech|soul|arcanea|intelligence|flagship] [--out path.png]
 *   node scripts/visuals/generate-hero-art.mjs --svg-only <slug>   (print SVG to stdout)
 */
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

const W = 1600
const H = 900

// ---- deterministic PRNG seeded from slug --------------------------------
function hashStr(s) {
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---- brand palettes ------------------------------------------------------
const PALETTES = {
  tech: { a: '#10b981', b: '#22d3ee', c: '#34d399', accent: '#5eead4' },
  intelligence: { a: '#38bdf8', b: '#22d3ee', c: '#818cf8', accent: '#7dd3fc' },
  soul: { a: '#f59e0b', b: '#e8a951', c: '#d4a574', accent: '#fcd34d' },
  arcanea: { a: '#ab47c7', b: '#7c3aed', c: '#38bdf8', accent: '#c084fc' },
  // Magnifica / benevolent-future: violet aurora warmed by gold — the hinge.
  flagship: { a: '#7c3aed', b: '#a855f7', c: '#f59e0b', accent: '#c4b5fd' },
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}
function rand(rng, min, max) {
  return min + rng() * (max - min)
}

function buildSvg(slug, theme) {
  const pal = PALETTES[theme] || PALETTES.tech
  const rng = mulberry32(hashStr(slug + theme))

  // Focal point — where the light gathers. Keep it off-center, mostly to a side.
  const focal = pick(rng, [
    { x: 0.26, y: 0.42 },
    { x: 0.72, y: 0.40 },
    { x: 0.30, y: 0.62 },
    { x: 0.68, y: 0.60 },
  ])
  const fx = focal.x * W
  const fy = focal.y * H

  // ---- aurora blobs ------------------------------------------------------
  const blobs = []
  const blobColors = [pal.a, pal.b, pal.c]
  for (let i = 0; i < 3; i++) {
    const cx = rand(rng, 0.1, 0.9) * W
    const cy = rand(rng, 0.1, 0.9) * H
    const r = rand(rng, 320, 540)
    const col = blobColors[i % blobColors.length]
    const op = rand(rng, 0.12, 0.24).toFixed(3)
    blobs.push(
      `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${col}" opacity="${op}" filter="url(#soft)"/>`
    )
  }
  // counter-glow opposite the focal — warmth/contrast (the "hinge" for flagship)
  const cgx = (1 - focal.x) * W
  const cgy = (1 - focal.y) * H
  blobs.push(
    `<circle cx="${cgx.toFixed(0)}" cy="${cgy.toFixed(0)}" r="430" fill="${pal.c}" opacity="0.16" filter="url(#soft)"/>`
  )

  // ---- fine intelligence grid (subtle architectural texture) -------------
  const gridLines = []
  const gstep = 64
  for (let x = 0; x <= W; x += gstep) gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" />`)
  for (let y = 0; y <= H; y += gstep) gridLines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" />`)
  const grid = `<g stroke="${pal.accent}" stroke-width="0.5" opacity="0.05">${gridLines.join('')}</g>`

  // ---- orbital rings centered on focal ----------------------------------
  const rings = []
  const ringCount = 7
  const ringBase = rand(rng, 78, 104)
  for (let i = 1; i <= ringCount; i++) {
    const rr = i * ringBase
    const op = (0.34 - i * 0.035).toFixed(3)
    rings.push(
      `<circle cx="${fx.toFixed(0)}" cy="${fy.toFixed(0)}" r="${rr.toFixed(0)}" fill="none" stroke="url(#ringGrad)" stroke-width="1.2" opacity="${Math.max(0.04, op)}"/>`
    )
  }

  // ---- intelligence threads (flowing bezier curves) ---------------------
  const threads = []
  const threadCount = Math.floor(rand(rng, 5, 8))
  for (let i = 0; i < threadCount; i++) {
    const y0 = rand(rng, -0.1, 1.1) * H
    const y1 = rand(rng, -0.1, 1.1) * H
    const cy1 = rand(rng, 0, 1) * H
    const cy2 = rand(rng, 0, 1) * H
    const x1 = W * 0.33,
      x2 = W * 0.66
    const d = `M ${-40} ${y0.toFixed(0)} C ${x1.toFixed(0)} ${cy1.toFixed(0)}, ${x2.toFixed(0)} ${cy2.toFixed(0)}, ${W + 40} ${y1.toFixed(0)}`
    const col = pick(rng, [pal.a, pal.b, pal.accent])
    const sw = rand(rng, 0.8, 2.2).toFixed(2)
    const op = rand(rng, 0.18, 0.5).toFixed(2)
    // glow copy + crisp line
    threads.push(`<path d="${d}" fill="none" stroke="${col}" stroke-width="${(sw * 3).toFixed(2)}" opacity="${(op * 0.4).toFixed(2)}" filter="url(#soft)"/>`)
    threads.push(`<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" opacity="${op}"/>`)
  }

  // ---- constellation particles ------------------------------------------
  const pts = []
  const nodes = []
  const pCount = Math.floor(rand(rng, 70, 110))
  for (let i = 0; i < pCount; i++) {
    const x = rng() * W
    const y = rng() * H
    const dist = Math.hypot(x - fx, y - fy)
    const norm = Math.min(1, dist / (W * 0.6))
    const op = (0.85 * (1 - norm) + 0.08).toFixed(2)
    const r = rand(rng, 0.5, 2.4).toFixed(2)
    const col = rng() > 0.5 ? pal.accent : '#ffffff'
    pts.push({ x, y })
    nodes.push(`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}" fill="${col}" opacity="${op}"/>`)
  }
  // connect a few near pairs to focal-ish region
  const links = []
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x
      const dy = pts[i].y - pts[j].y
      const dd = Math.hypot(dx, dy)
      if (dd < 92 && rng() > 0.82) {
        links.push(
          `<line x1="${pts[i].x.toFixed(0)}" y1="${pts[i].y.toFixed(0)}" x2="${pts[j].x.toFixed(0)}" y2="${pts[j].y.toFixed(0)}" stroke="${pal.accent}" stroke-width="0.6" opacity="0.16"/>`
        )
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bgGlow" cx="${(focal.x * 100).toFixed(0)}%" cy="${(focal.y * 100).toFixed(0)}%" r="85%">
      <stop offset="0%" stop-color="${pal.a}" stop-opacity="0.28"/>
      <stop offset="38%" stop-color="${pal.b}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#06060a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.accent}"/>
      <stop offset="100%" stop-color="${pal.b}"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="${pal.accent}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.62"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="42"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="#060608"/>
  ${grid}
  <g>${blobs.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
  <g>${rings.join('')}</g>
  <g>${threads.join('')}</g>
  <g>${links.join('')}</g>
  <g>${nodes.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#sweep)"/>
  <circle cx="${fx.toFixed(0)}" cy="${fy.toFixed(0)}" r="120" fill="${pal.accent}" opacity="0.22" filter="url(#soft)"/>
  <circle cx="${fx.toFixed(0)}" cy="${fy.toFixed(0)}" r="18" fill="${pal.accent}" opacity="0.55" filter="url(#soft)"/>
  <circle cx="${fx.toFixed(0)}" cy="${fy.toFixed(0)}" r="3" fill="#ffffff" opacity="0.95"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.045"/>
</svg>`
}

export { buildSvg }

// ---- CLI (only when run directly) ----------------------------------------
const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isDirect) {
  const argv = process.argv.slice(2)
  if (argv.includes('--help') || argv.length === 0) {
    console.log('Usage: generate-hero-art.mjs <slug> [--theme tech|soul|arcanea|intelligence|flagship] [--out path]')
    process.exit(0)
  }

  const getFlag = (name, def) => {
    const i = argv.indexOf(name)
    return i >= 0 && argv[i + 1] ? argv[i + 1] : def
  }

  const slug = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--theme' && argv[argv.indexOf(a) - 1] !== '--out')
  if (!slug) {
    console.error('Error: <slug> is required.')
    console.log('Usage: generate-hero-art.mjs <slug> [--theme tech|soul|arcanea|intelligence|flagship] [--out path]')
    process.exit(1)
  }
  const theme = getFlag('--theme', 'tech')
  const out = getFlag('--out', join(ROOT, 'public', 'images', 'blog', `${slug}-hero.png`))
  const svg = buildSvg(slug, theme)

  if (argv.includes('--svg-only')) {
    process.stdout.write(svg)
    process.exit(0)
  }

  mkdirSync(dirname(out), { recursive: true })
  await sharp(Buffer.from(svg), { density: 144 }).png({ quality: 92, compressionLevel: 9 }).toFile(out)
  console.log(`hero → ${out} (theme=${theme})`)
}

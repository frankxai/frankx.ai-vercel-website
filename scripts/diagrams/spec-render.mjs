#!/usr/bin/env node
/**
 * spec-render.mjs
 *
 * Renders data/diagrams/specs/*.diagram.json into branded SVGs (dark + light)
 * under public/images/diagrams/system/, lints them, and writes
 * data/diagrams/registry.json.
 *
 * Complements scripts/diagrams/render.mjs (Mermaid/D2 for blog posts). That
 * script is untouched. This one covers flagship architecture diagrams where
 * brand layout and real text (selectable, translatable, themeable) matter.
 *
 * No dependencies. Output is deterministic: same spec in, same bytes out.
 *
 *   node scripts/diagrams/spec-render.mjs            render + write registry
 *   node scripts/diagrams/spec-render.mjs --check    fail if output is stale or lint fails
 *   node scripts/diagrams/spec-render.mjs --only ai-gateway
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const ROOT = process.cwd()
const SPEC_DIR = path.join(ROOT, 'data/diagrams/specs')
const OUT_DIR = path.join(ROOT, 'public/images/diagrams/system')
const REGISTRY_PATH = path.join(ROOT, 'data/diagrams/registry.json')
const GALLERY_PATH = path.join(ROOT, 'docs/diagrams/gallery.html')
const PUBLIC_PREFIX = '/images/diagrams/system/'

const args = process.argv.slice(2)
const CHECK = args.includes('--check')
const onlyIdx = args.indexOf('--only')
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null

// ---------------------------------------------------------------- tokens ---

// Brand accents from data/brand-visual-dna.json. `dark` and `light` are the
// text-safe variants for each theme; `base` is for fills and strokes only.
const ACCENTS = {
  emerald: { base: '#10B981', dark: '#34d399', light: '#047857' },
  violet: { base: '#7C3AED', dark: '#a78bfa', light: '#6d28d9' },
  cyan: { base: '#06B6D4', dark: '#22d3ee', light: '#0e7490' },
  amber: { base: '#F59E0B', dark: '#fbbf24', light: '#92400e' },
  orange: { base: '#F97316', dark: '#fb923c', light: '#c2410c' },
  blue: { base: '#3B82F6', dark: '#60a5fa', light: '#1d4ed8' },
  fuchsia: { base: '#D946EF', dark: '#e879f9', light: '#a21caf' },
  red: { base: '#C74634', dark: '#f87171', light: '#b3382a' },
}

const THEMES = {
  dark: {
    bg0: '#0a0a0b', bg1: '#0c1318', panel: '#121417', card: '#191c20',
    border: '#262a2e', cardBorder: '#2a2f34', text: '#ffffff', text2: '#b8c0c2',
    text3: '#8a9598', dot: '#ffffff', dotOpacity: 0.05, line: '#5b6a6e', glow: 0.16,
  },
  light: {
    bg0: '#f6f7f8', bg1: '#eef1f3', panel: '#ffffff', card: '#f1f3f4',
    border: '#d5dbde', cardBorder: '#d9dfe2', text: '#0a0a0b', text2: '#3f4a4e',
    text3: '#566267', dot: '#0a0a0b', dotOpacity: 0.07, line: '#8a979b', glow: 0.1,
  },
}

const SANS = "Inter, 'Segoe UI', system-ui, -apple-system, Arial, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace"

// ------------------------------------------------------------ primitives ---

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const r1 = (n) => Math.round(n * 10) / 10

const CHAR_W = { sans: 0.54, sansBold: 0.6, mono: 0.62 }
function measure(s, size, kind = 'sans') {
  return s.length * size * CHAR_W[kind]
}

/** Greedy word wrap using estimated glyph width. Reports unbreakable overflow. */
function wrap(str, size, maxW, kind = 'sans', warn) {
  const words = String(str).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (measure(next, size, kind) <= maxW || !line) {
      line = next
    } else {
      lines.push(line)
      line = w
    }
  }
  if (line) lines.push(line)
  if (warn) for (const l of lines) if (measure(l, size, kind) > maxW * 1.04) warn(`"${l}" is wider than ${Math.round(maxW)}px at ${size}px`)
  return lines
}

function text(x, y, str, o = {}) {
  const { size = 16, weight = 400, fill, anchor = 'start', kind = 'sans', ls, opacity } = o
  const family = kind === 'mono' ? MONO : SANS
  return `<text x="${r1(x)}" y="${r1(y)}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}"` +
    `${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}${ls ? ` letter-spacing="${ls}"` : ''}${opacity ? ` opacity="${opacity}"` : ''}>${esc(str)}</text>`
}

function lines(x, y, arr, lh, o) {
  return arr.map((l, i) => text(x, y + i * lh, l, o)).join('')
}

// ------------------------------------------------------------- contrast ---

function lum(hex) {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
function contrast(a, b) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function lintContrast(spec, themeName) {
  const T = THEMES[themeName]
  const problems = []
  const pairs = [
    ['text', T.text, T.panel], ['text', T.text, T.card], ['text2', T.text2, T.panel], ['text2', T.text2, T.card],
    ['text3', T.text3, T.card], ['text3', T.text3, T.bg0], ['text3', T.text3, T.bg1], ['text2', T.text2, T.bg0],
  ]
  const used = new Set()
  for (const l of spec.layers || []) used.add(l.accent)
  for (const n of spec.nodes || []) used.add(n.accent)
  for (const s of spec.stages || []) used.add(s.accent)
  for (const t of spec.tiers || []) used.add(t.accent)
  for (const c of spec.inputs || []) if (c.accent) used.add(c.accent)
  for (const c of spec.cores || []) if (c.accent) used.add(c.accent)
  for (const c of spec.substrates || []) if (c.accent) used.add(c.accent)
  for (const d of spec.dock || []) if (d.accent) used.add(d.accent)
  if (spec.core) used.add(spec.core.accent)
  if (spec.loop) used.add(spec.loop.accent)
  for (const name of used) {
    const a = ACCENTS[name]
    if (!a) { problems.push(`unknown accent "${name}"`); continue }
    for (const [label, bg] of [['panel', T.panel], ['card', T.card], ['bg', T.bg0]]) pairs.push([`accent:${name}`, a[themeName], bg, label])
  }
  for (const [name, fg, bg, label] of pairs) {
    const ratio = contrast(fg, bg)
    if (ratio < 4.5) problems.push(`${themeName}: ${name} on ${label || 'surface'} is ${ratio.toFixed(2)}:1 (needs 4.5)`)
  }
  return problems
}

// -------------------------------------------------------------- layouts ---

const W = 1600
const X0 = 80
const CW = W - X0 * 2

function accentOf(name, themeName) {
  const a = ACCENTS[name]
  return { base: a.base, text: a[themeName] }
}

function header(spec, T, themeName, warn) {
  const acc = accentOf(spec.accent || 'emerald', themeName)
  let out = text(X0, 80, spec.eyebrow.toUpperCase(), { size: 13, weight: 600, fill: acc.text, kind: 'mono', ls: 2.4 })
  const tl = wrap(spec.title, 46, 1300, 'sansBold', warn)
  out += lines(X0, 134, tl, 54, { size: 46, weight: 750, fill: T.text })
  const sy = 134 + (tl.length - 1) * 54 + 42
  const sl = wrap(spec.subtitle, 20, 1180, 'sans', warn)
  out += lines(X0, sy, sl, 28, { size: 20, fill: T.text2 })
  return { svg: out, bottom: sy + (sl.length - 1) * 28 + 44 }
}

function footer(spec, T, H, warn) {
  const y = H - 62
  let out = `<path d="M${X0} ${y}H${W - X0}" stroke="${T.border}" stroke-width="1"/>`
  const src = wrap(spec.source || '', 13, 1120, 'sans', warn)
  out += lines(X0, y + 28, src.slice(0, 2), 18, { size: 13, fill: T.text3 })
  out += text(W - X0, y + 28, 'frankx.ai', { size: 13, weight: 600, fill: T.text3, anchor: 'end', kind: 'mono', ls: 1 })
  return out
}

function defs(id, T, themeName, accentNames) {
  let d = `<linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.bg0}"/><stop offset="1" stop-color="${T.bg1}"/></linearGradient>`
  d += `<pattern id="${id}-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="${T.dot}" fill-opacity="${T.dotOpacity}"/></pattern>`
  d += `<marker id="${id}-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="${T.line}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>`
  for (const name of accentNames) {
    const a = ACCENTS[name]
    d += `<radialGradient id="${id}-glow-${name}" cx="0" cy="0" r="1" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0.5) scale(1 1.6)"><stop offset="0" stop-color="${a.base}" stop-opacity="${T.glow}"/><stop offset="1" stop-color="${a.base}" stop-opacity="0"/></radialGradient>`
    d += `<linearGradient id="${id}-line-${name}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${a.base}" stop-opacity="0.15"/><stop offset="1" stop-color="${a.base}" stop-opacity="0.9"/></linearGradient>`
  }
  return `<defs>${d}</defs>`
}

function renderLayers(spec, T, themeName, id, top, warn) {
  let out = ''
  let y = top
  spec.layers.forEach((L, li) => {
    const acc = accentOf(L.accent, themeName)
    const leftW = 380
    const areaX = X0 + leftW + 40
    const areaW = CW - leftW - 40 - 32
    const n = L.items.length
    const cols = L.cols || (n <= 4 ? n : n <= 6 ? 3 : 4)
    const gap = 16
    const cw = (areaW - gap * (cols - 1)) / cols
    const laid = L.items.map((it) => ({
      lab: wrap(it.label, 19, cw - 32, 'sansBold', warn),
      det: it.detail ? wrap(it.detail, 15, cw - 32, 'sans', warn) : [],
    }))
    const ch = Math.max(...laid.map((l) => 20 + l.lab.length * 24 + (l.det.length ? 6 + l.det.length * 20 : 0) + 18))
    const rows = Math.ceil(n / cols)
    const cardsH = rows * ch + (rows - 1) * gap

    const titleX = X0 + 32 + (L.badge ? 48 : 0)
    const subLines = wrap(L.subtitle, 17, leftW - (titleX - X0) - 20 + (L.badge ? 0 : 0), 'sans', warn)
    const tagLines = L.tag ? wrap(L.tag, 13, leftW - 64, 'mono', warn) : []
    const leftH = 36 + 34 + 14 + subLines.length * 23 + (tagLines.length ? 14 + tagLines.length * 19 : 0) + 30
    const H = Math.max(cardsH + 56, leftH)

    out += `<g>`
    out += `<rect x="${X0}" y="${r1(y)}" width="${CW}" height="${r1(H)}" rx="24" fill="${T.panel}" stroke="${T.border}"/>`
    out += `<rect x="${X0}" y="${r1(y)}" width="${leftW + 40}" height="${r1(H)}" rx="24" fill="url(#${id}-glow-${L.accent})"/>`
    out += `<rect x="${X0}" y="${r1(y + 26)}" width="4" height="${r1(H - 52)}" rx="2" fill="${acc.base}"/>`
    const ty = y + 36 + 28
    if (L.badge) {
      out += `<circle cx="${X0 + 32 + 18}" cy="${r1(ty - 10)}" r="18" fill="none" stroke="${acc.base}" stroke-width="2"/>`
      out += text(X0 + 32 + 18, ty - 3.5, L.badge, { size: 17, weight: 700, fill: acc.text, anchor: 'middle', kind: 'mono' })
    }
    out += text(titleX, ty, L.title, { size: 30, weight: 700, fill: T.text })
    out += lines(titleX, ty + 34, subLines, 23, { size: 17, fill: T.text2 })
    if (tagLines.length) out += lines(titleX, ty + 34 + subLines.length * 23 + 12, tagLines, 19, { size: 13, fill: acc.text, kind: 'mono' })
    out += `<path d="M${X0 + leftW + 10} ${r1(y + 26)}V${r1(y + H - 26)}" stroke="${T.border}"/>`

    const cy0 = y + (H - cardsH) / 2
    L.items.forEach((it, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const cx = areaX + col * (cw + gap)
      const cyy = cy0 + row * (ch + gap)
      out += `<rect x="${r1(cx)}" y="${r1(cyy)}" width="${r1(cw)}" height="${r1(ch)}" rx="14" fill="${T.card}" stroke="${T.cardBorder}"/>`
      out += `<rect x="${r1(cx + 16)}" y="${r1(cyy)}" width="28" height="3" rx="1.5" fill="${acc.base}"/>`
      let ly = cyy + 20 + 19
      out += lines(cx + 16, ly - 2, laid[i].lab, 24, { size: 19, weight: 700, fill: T.text })
      ly += (laid[i].lab.length - 1) * 24
      if (laid[i].det.length) out += lines(cx + 16, ly + 24, laid[i].det, 20, { size: 15, fill: T.text2 })
    })
    out += `</g>`
    y += H

    if (li < spec.layers.length - 1) {
      const label = spec.links ? spec.links[li] : null
      const gapH = label ? 62 : 24
      if (label) {
        out += `<path d="M800 ${r1(y + 2)}V${r1(y + gapH - 3)}" stroke="${T.line}" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round" marker-end="url(#${id}-arrow)"/>`
        const lw = measure(label, 14, 'sans') + 32
        out += `<rect x="${r1(824)}" y="${r1(y + gapH / 2 - 14)}" width="${r1(lw)}" height="28" rx="14" fill="${T.panel}" stroke="${T.border}"/>`
        out += text(824 + 16, y + gapH / 2 + 5, label, { size: 14, fill: T.text2 })
      }
      y += gapH
    }
  })
  return { svg: out, bottom: y }
}

function renderRadial(spec, T, themeName, id, top, warn) {
  const acc = accentOf(spec.core.accent, themeName)
  const n = spec.nodes.length
  const nodeW = 304
  const detLines = spec.nodes.map((nd) => wrap(nd.detail, 15, nodeW - 36, 'sans', warn))
  const nodeH = 20 + 16 + 30 + 6 + Math.max(...detLines.map((d) => d.length)) * 20 + 18
  const rx = 540
  const ry = 268
  const cx = W / 2
  // Top nodes sit at -sin(60deg) * ry above centre; leave a 16px gap under the header.
  const cy = top + Math.round(ry * 0.866) + nodeH / 2 + 16
  let out = ''
  // rings
  out += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${T.border}" stroke-dasharray="3 9" stroke-linecap="round"/>`
  out += `<ellipse cx="${cx}" cy="${cy}" rx="${r1(rx * 0.55)}" ry="${r1(ry * 0.55)}" fill="none" stroke="${T.border}" stroke-dasharray="3 9" stroke-linecap="round"/>`
  const pos = spec.nodes.map((nd, i) => {
    const ang = (-90 + (360 / n) * (i + 0.5)) * (Math.PI / 180)
    return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang), nd, i }
  })
  // spokes
  for (const p of pos) {
    const a = ACCENTS[p.nd.accent]
    const dx = p.x - cx
    const dy = p.y - cy
    out += `<path d="M${cx} ${cy}Q${r1(cx + dx * 0.35)} ${r1(cy + dy * 0.7)} ${r1(p.x)} ${r1(p.y)}" fill="none" stroke="${a.base}" stroke-opacity="0.55" stroke-width="2"/>`
  }
  // core
  out += `<circle cx="${cx}" cy="${cy}" r="124" fill="${T.panel}" stroke="${acc.base}" stroke-width="2.5"/>`
  out += `<circle cx="${cx}" cy="${cy}" r="124" fill="url(#${id}-glow-${spec.core.accent})"/>`
  const ct = wrap(spec.core.title, 34, 190, 'sansBold', warn)
  const cs = wrap(spec.core.subtitle, 15, 170, 'sans', warn)
  const blockH = ct.length * 38 + cs.length * 20 + 8
  let ty = cy - blockH / 2 + 30
  out += lines(cx, ty, ct, 38, { size: 34, weight: 750, fill: T.text, anchor: 'middle' })
  ty += (ct.length - 1) * 38 + 30
  out += lines(cx, ty, cs, 20, { size: 15, fill: T.text2, anchor: 'middle' })
  // nodes
  for (const p of pos) {
    const a = accentOf(p.nd.accent, themeName)
    const x = p.x - nodeW / 2
    const y = p.y - nodeH / 2
    out += `<rect x="${r1(x)}" y="${r1(y)}" width="${nodeW}" height="${r1(nodeH)}" rx="16" fill="${T.panel}" stroke="${a.base}" stroke-opacity="0.6"/>`
    out += `<rect x="${r1(x)}" y="${r1(y)}" width="${nodeW}" height="${r1(nodeH)}" rx="16" fill="url(#${id}-glow-${p.nd.accent})"/>`
    out += text(x + 18, y + 32, String(p.i + 1).padStart(2, '0'), { size: 13, weight: 600, fill: a.text, kind: 'mono', ls: 1.5 })
    out += text(x + 18, y + 62, p.nd.label, { size: 24, weight: 700, fill: T.text })
    out += lines(x + 18, y + 90, detLines[p.i], 20, { size: 15, fill: T.text2 })
  }
  return { svg: out, bottom: cy + Math.round(ry * 0.866) + nodeH / 2 + 20 }
}

function renderFlow(spec, T, themeName, id, top, warn) {
  const n = spec.stages.length
  const gap = 44
  const cw = (CW - gap * (n - 1)) / n
  const laid = spec.stages.map((s) => ({
    title: wrap(s.title, 24, cw - 40, 'sansBold', warn),
    items: s.items.map((it) => wrap(it, 16, cw - 40 - 18, 'sans', warn)),
  }))
  const ch = Math.max(...laid.map((l) => 30 + 20 + l.title.length * 30 + 14 + l.items.reduce((s, it) => s + it.length * 22 + 14, 0) + 18))
  let out = ''
  spec.stages.forEach((s, i) => {
    const a = accentOf(s.accent, themeName)
    const x = X0 + i * (cw + gap)
    const y = top + 10
    out += `<rect x="${r1(x)}" y="${y}" width="${r1(cw)}" height="${r1(ch)}" rx="20" fill="${T.panel}" stroke="${T.border}"/>`
    out += `<rect x="${r1(x)}" y="${y}" width="${r1(cw)}" height="${r1(ch)}" rx="20" fill="url(#${id}-glow-${s.accent})" opacity="0.8"/>`
    out += `<rect x="${r1(x + 20)}" y="${y}" width="44" height="4" rx="2" fill="${a.base}"/>`
    out += text(x + 20, y + 40, String(i + 1).padStart(2, '0'), { size: 13, weight: 600, fill: a.text, kind: 'mono', ls: 1.5 })
    let ty = y + 40 + 34
    out += lines(x + 20, ty, laid[i].title, 30, { size: 24, weight: 700, fill: T.text })
    ty += (laid[i].title.length - 1) * 30 + 22
    laid[i].items.forEach((it) => {
      out += `<circle cx="${r1(x + 24)}" cy="${r1(ty + 16 - 5)}" r="3" fill="${a.base}"/>`
      out += lines(x + 38, ty + 16, it, 22, { size: 16, fill: T.text2 })
      ty += it.length * 22 + 14
    })
    if (i < n - 1) {
      const gx = x + cw + gap / 2
      const gy = y + 40
      out += `<path d="M${r1(gx - 5)} ${gy - 8}L${r1(gx + 4)} ${gy}L${r1(gx - 5)} ${gy + 8}" fill="none" stroke="${T.line}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    }
  })
  const yb = top + 10 + ch
  let bottom = yb
  if (spec.loop) {
    const xl = X0 + (n - 1) * (cw + gap) + cw / 2
    const xf = X0 + cw / 2
    const ly = yb + 64
    out += `<path d="M${r1(xl)} ${yb + 4}V${ly - 18}Q${r1(xl)} ${ly} ${r1(xl - 18)} ${ly}H${r1(xf + 18)}Q${r1(xf)} ${ly} ${r1(xf)} ${ly - 18}V${yb + 10}" fill="none" stroke="url(#${id}-line-${spec.loop.accent})" stroke-width="2.5" stroke-linecap="round" marker-end="url(#${id}-arrow)"/>`
    const a = accentOf(spec.loop.accent, themeName)
    const lw = measure(spec.loop.label, 17, 'sans') + 48
    out += `<rect x="${r1(W / 2 - lw / 2)}" y="${ly - 20}" width="${r1(lw)}" height="40" rx="20" fill="${T.panel}" stroke="${a.base}" stroke-opacity="0.7"/>`
    out += text(W / 2, ly + 6, spec.loop.label, { size: 17, weight: 600, fill: T.text, anchor: 'middle' })
    bottom = ly + 24
  }
  return { svg: out, bottom }
}

function iconGlyph(kind, cx, cy, r, stroke) {
  const s = r / 14
  const g = (p) => `<g transform="translate(${r1(cx - 14 * s)} ${r1(cy - 14 * s)}) scale(${r1(s)})" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</g>`
  switch (kind) {
    case 'terminal':
      return g('<rect x="2" y="3" width="24" height="22" rx="5"/><path d="M8 10l5 4-5 4M15 18h5"/>')
    case 'cloud':
      return g('<path d="M7.5 21h12a5.5 5.5 0 0 0 .8-10.9A7.5 7.5 0 0 0 6 11.5a5 5 0 0 0 1.5 9.5Z"/><path d="M12 14l2-2 2 2"/>')
    case 'mesh':
      return g('<polygon points="14,2 24,8 24,20 14,26 4,20 4,8"/><circle cx="14" cy="14" r="3"/><path d="M14 2v9M24 8l-7.4 4.5M24 20l-7.4-4.5M14 26v-9M4 20l7.4-4.5M4 8l7.4 4.5"/>')
    case 'shield':
      return g('<path d="M14 3l9 4v6.5c0 5.6-3.8 9.8-9 11.5-5.2-1.7-9-5.9-9-11.5V7l9-4Z"/><path d="M10 14l2.8 2.8L18.5 11"/>')
    case 'chart':
      return g('<path d="M5 23V15M11 23V10M17 23V13M23 23V6"/>')
    case 'gauge':
      return g('<path d="M5 19a9 9 0 1 1 18 0"/><path d="M14 15l4-5"/><circle cx="14" cy="16" r="1.5"/>')
    case 'database':
      return g('<ellipse cx="14" cy="7" rx="8" ry="3.5"/><path d="M6 7v14c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V7"/><path d="M6 14c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5"/>')
    case 'refresh':
      return g('<path d="M21 10A8 8 0 0 0 7.5 8.5L5 11M5 6v5h5"/><path d="M7 18a8 8 0 0 0 13.5 1.5L23 17M23 22v-5h-5"/>')
    case 'eye':
      return g('<path d="M2.5 14S7 7 14 7s11.5 7 11.5 7-4.5 7-11.5 7S2.5 14 2.5 14Z"/><circle cx="14" cy="14" r="3"/>')
    case 'layers':
      return g('<polygon points="14,4 24,9.5 14,15 4,9.5"/><path d="M4 14.5L14 20l10-5.5M4 19.5L14 25l10-5.5"/>')
    case 'wrench':
      return g('<path d="M17.5 6.5a5 5 0 0 0-6.6 6.6L5 19l4 4 5.9-5.9a5 5 0 0 0 6.6-6.6l-3 3-2-2 3-3Z"/>')
    case 'bot':
      return g('<rect x="5" y="8" width="18" height="14" rx="4"/><path d="M14 4v4M10 14h.01M18 14h.01M10 18h8"/>')
    case 'star':
      return g('<polygon points="14,3 17,10.5 25,11.2 19,16.5 20.8,24.5 14,20.2 7.2,24.5 9,16.5 3,11.2 11,10.5"/>')
    default:
      return g('<rect x="4" y="6" width="20" height="16" rx="3"/><path d="M8 12h6M8 16h10"/>')
  }
}

function renderStackTiers(spec, T, themeName, id, top, warn) {
  let out = ''
  let y = top + 6
  const cardW = 1160
  const x0 = (W - cardW) / 2
  spec.tiers.forEach((tier, ti) => {
    const acc = accentOf(tier.accent, themeName)
    const caps = tier.capabilities || []
    const hasCaps = caps.length > 0
    const hasPill = Boolean(tier.pill)
    const cardH = hasCaps ? 214 : hasPill ? 168 : 140

    out += `<g>`
    out += `<rect x="${r1(x0)}" y="${r1(y)}" width="${cardW}" height="${cardH}" rx="24" fill="${T.panel}" stroke="${acc.base}" stroke-opacity="0.55" stroke-width="1.6"/>`
    out += `<rect x="${r1(x0)}" y="${r1(y)}" width="520" height="${cardH}" rx="24" fill="url(#${id}-glow-${tier.accent})"/>`

    // Icon badge
    const bx = x0 + 44
    const by = y + 28
    out += `<rect x="${r1(bx)}" y="${r1(by)}" width="68" height="68" rx="18" fill="${T.card}" stroke="${acc.base}" stroke-opacity="0.7" stroke-width="1.5"/>`
    out += iconGlyph(tier.icon || 'terminal', bx + 34, by + 34, 17, acc.text)

    // Title & subtitle
    const tx = bx + 92
    out += text(tx, by + 30, tier.title, { size: 30, weight: 750, fill: T.text })
    const sub = wrap(tier.subtitle, 18, cardW - 200, 'sans', warn)
    out += lines(tx, by + 58, sub.slice(0, 1), 24, { size: 18, fill: T.text2 })

    if (hasPill) {
      const pw = measure(tier.pill, 15, 'mono') + 44
      const py = by + 76
      out += `<rect x="${r1(tx)}" y="${r1(py)}" width="${r1(pw)}" height="32" rx="16" fill="${T.card}" stroke="${acc.base}" stroke-opacity="0.55"/>`
      out += text(tx + 22, py + 21, tier.pill, { size: 15, weight: 600, fill: acc.text, kind: 'mono' })
    }

    if (hasCaps) {
      const cy = y + 116
      out += `<path d="M${r1(x0 + 44)} ${r1(cy)}H${r1(x0 + cardW - 44)}" stroke="${T.border}"/>`
      const innerW = cardW - 88
      const colW = innerW / caps.length
      caps.forEach((cap, ci) => {
        const cx = x0 + 44 + ci * colW + colW / 2
        if (ci > 0) {
          out += `<path d="M${r1(x0 + 44 + ci * colW)} ${r1(cy + 16)}V${r1(cy + 78)}" stroke="${T.border}"/>`
        }
        out += iconGlyph(cap.icon || 'card', cx, cy + 34, 12, acc.text)
        const cl = wrap(cap.label, 15, colW - 16, 'sans', warn)
        out += lines(cx, cy + 68, cl.slice(0, 2), 18, { size: 15, weight: 600, fill: T.text2, anchor: 'middle' })
      })
    }
    out += `</g>`
    y += cardH

    if (ti < spec.tiers.length - 1) {
      const connH = 48
      const midX = W / 2
      out += `<circle cx="${midX}" cy="${r1(y)}" r="5" fill="${acc.base}"/>`
      out += `<path d="M${midX} ${r1(y + 6)}V${r1(y + connH - 6)}" stroke="${T.line}" stroke-width="2.2" marker-end="url(#${id}-arrow)"/>`
      if (spec.tierLinks && spec.tierLinks[ti]) {
        const lbl = spec.tierLinks[ti]
        const lw = measure(lbl, 13, 'mono') + 28
        out += `<rect x="${r1(midX + 18)}" y="${r1(y + connH / 2 - 13)}" width="${r1(lw)}" height="26" rx="13" fill="${T.panel}" stroke="${T.border}"/>`
        out += text(midX + 32, y + connH / 2 + 4.5, lbl, { size: 13, fill: T.text2, kind: 'mono' })
      }
      y += connH
    }
  })
  return { svg: out, bottom: y + 8 }
}

function renderHudArchitecture(spec, T, themeName, id, top, warn) {
  let out = ''
  const colGap = 64
  const leftW = 340
  const midW = 410
  const rightW = CW - leftW - midW - colGap * 2
  const leftX = X0
  const midX = leftX + leftW + colGap
  const rightX = midX + midW + colGap

  const inH = 68
  const inGap = 16
  const inputsTotalH = spec.inputs.length * inH + (spec.inputs.length - 1) * inGap

  const subH = 78
  const subGap = 14
  const subsTotalH = spec.substrates.length * subH + (spec.substrates.length - 1) * subGap

  const bodyH = Math.max(inputsTotalH, subsTotalH, 420)
  const inStartY = top + 12 + (bodyH - inputsTotalH) / 2
  const subStartY = top + 12 + (bodyH - subsTotalH) / 2

  const coreH = 156
  const coreGap = 44
  const coresTotalH = spec.cores.length * coreH + (spec.cores.length - 1) * coreGap
  const coreStartY = top + 12 + (bodyH - coresTotalH) / 2

  // Inputs (left) & connectors to cores
  spec.inputs.forEach((inp, i) => {
    const acc = accentOf(inp.accent || 'cyan', themeName)
    const iy = inStartY + i * (inH + inGap)
    out += `<rect x="${leftX}" y="${r1(iy)}" width="${leftW}" height="${inH}" rx="16" fill="${T.panel}" stroke="${T.border}"/>`
    out += iconGlyph(inp.icon || 'card', leftX + 32, iy + inH / 2, 11, acc.text)
    out += text(leftX + 58, iy + 30, inp.label, { size: 18, weight: 700, fill: T.text })
    if (inp.detail) out += text(leftX + 58, iy + 51, inp.detail, { size: 14, fill: T.text2 })

    const targetCoreIdx = i < Math.ceil(spec.inputs.length / 2) ? 0 : Math.min(1, spec.cores.length - 1)
    const ty = coreStartY + targetCoreIdx * (coreH + coreGap) + coreH / 2
    const sx = leftX + leftW
    const sy = iy + inH / 2
    out += `<path d="M${sx} ${r1(sy)}C${r1(sx + colGap * 0.55)} ${r1(sy)} ${r1(midX - colGap * 0.55)} ${r1(ty)} ${midX - 4} ${r1(ty)}" fill="none" stroke="${T.line}" stroke-width="1.8" marker-end="url(#${id}-arrow)"/>`
  })

  // Cores (center)
  spec.cores.forEach((core, ci) => {
    const acc = accentOf(core.accent || 'violet', themeName)
    const cy = coreStartY + ci * (coreH + coreGap)
    out += `<rect x="${midX}" y="${r1(cy)}" width="${midW}" height="${coreH}" rx="22" fill="${T.panel}" stroke="${acc.base}" stroke-width="2"/>`
    out += `<rect x="${midX}" y="${r1(cy)}" width="${midW}" height="${coreH}" rx="22" fill="url(#${id}-glow-${core.accent || 'violet'})"/>`
    out += iconGlyph(core.icon || 'star', midX + midW / 2, cy + 40, 14, acc.text)
    out += text(midX + midW / 2, cy + 84, core.title, { size: 24, weight: 750, fill: T.text, anchor: 'middle' })
    const csub = wrap(core.subtitle, 15, midW - 48, 'sans', warn)
    out += lines(midX + midW / 2, cy + 112, csub.slice(0, 2), 20, { size: 15, fill: T.text2, anchor: 'middle' })

    if (ci < spec.cores.length - 1) {
      const cxMid = midX + midW / 2
      out += `<path d="M${r1(cxMid)} ${r1(cy + coreH + 4)}V${r1(cy + coreH + coreGap - 4)}" stroke="${acc.base}" stroke-width="2.2" marker-start="url(#${id}-arrow)" marker-end="url(#${id}-arrow)"/>`
    }
  })

  // Substrates (right) & connectors from cores
  spec.substrates.forEach((sub, si) => {
    const acc = accentOf(sub.accent || 'emerald', themeName)
    const sy = subStartY + si * (subH + subGap)
    out += `<rect x="${rightX}" y="${r1(sy)}" width="${rightW}" height="${subH}" rx="16" fill="${T.panel}" stroke="${acc.base}" stroke-opacity="0.55"/>`
    out += `<rect x="${rightX}" y="${r1(sy)}" width="220" height="${subH}" rx="16" fill="url(#${id}-glow-${sub.accent || 'emerald'})"/>`
    out += iconGlyph(sub.icon || 'database', rightX + 34, sy + subH / 2, 12, acc.text)
    out += text(rightX + 62, sy + 33, sub.title, { size: 19, weight: 700, fill: T.text })
    const sd = wrap(sub.detail, 14, rightW - 80, 'sans', warn)
    out += lines(rightX + 62, sy + 55, sd.slice(0, 1), 18, { size: 14, fill: T.text2 })

    const fromCoreIdx = si < 2 ? 0 : Math.min(1, spec.cores.length - 1)
    const fy = coreStartY + fromCoreIdx * (coreH + coreGap) + coreH / 2
    const fx = midX + midW
    const ty = sy + subH / 2
    out += `<path d="M${fx} ${r1(fy)}C${r1(fx + colGap * 0.55)} ${r1(fy)} ${r1(rightX - colGap * 0.55)} ${r1(ty)} ${rightX - 4} ${r1(ty)}" fill="none" stroke="${T.line}" stroke-width="1.8" marker-end="url(#${id}-arrow)"/>`
  })

  let bottom = top + 12 + bodyH
  if (spec.dock && spec.dock.length) {
    const dockY = bottom + 36
    const dockH = 68
    out += `<rect x="${X0}" y="${r1(dockY)}" width="${CW}" height="${dockH}" rx="20" fill="${T.panel}" stroke="${T.border}"/>`
    const stepW = CW / spec.dock.length
    spec.dock.forEach((d, di) => {
      const acc = accentOf(d.accent || 'violet', themeName)
      const dx = X0 + di * stepW + stepW / 2
      if (di > 0) {
        out += `<path d="M${r1(X0 + di * stepW - 8)} ${r1(dockY + dockH / 2)}h16" stroke="${T.line}" stroke-width="1.8" marker-end="url(#${id}-arrow)"/>`
      }
      out += text(dx, dockY + 28, String(di + 1).padStart(2, '0'), { size: 12, weight: 600, fill: acc.text, anchor: 'middle', kind: 'mono', ls: 1.5 })
      out += text(dx, dockY + 50, d.label, { size: 17, weight: 700, fill: T.text, anchor: 'middle' })
    })
    bottom = dockY + dockH
  }
  return { svg: out, bottom: bottom + 8 }
}

const RENDERERS = {
  layers: renderLayers,
  radial: renderRadial,
  flow: renderFlow,
  'stack-tiers': renderStackTiers,
  'hud-architecture': renderHudArchitecture,
}

function collectAccents(spec) {
  const s = new Set([spec.accent || 'emerald'])
  for (const l of spec.layers || []) s.add(l.accent)
  for (const n of spec.nodes || []) s.add(n.accent)
  for (const st of spec.stages || []) s.add(st.accent)
  for (const t of spec.tiers || []) s.add(t.accent)
  for (const c of spec.inputs || []) if (c.accent) s.add(c.accent)
  for (const c of spec.cores || []) if (c.accent) s.add(c.accent)
  for (const c of spec.substrates || []) if (c.accent) s.add(c.accent)
  for (const d of spec.dock || []) if (d.accent) s.add(d.accent)
  if (spec.core) s.add(spec.core.accent)
  if (spec.loop) s.add(spec.loop.accent)
  return [...s]
}

function renderSpec(spec, themeName) {
  const T = THEMES[themeName]
  const id = `${spec.id}-${themeName}`
  const warnings = []
  const warn = (m) => warnings.push(`${themeName}: ${m}`)
  const head = header(spec, T, themeName, warn)
  const body = RENDERERS[spec.type](spec, T, themeName, id, head.bottom, warn)
  const H = Math.ceil(body.bottom + 62 + 56)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="${id}-t ${id}-d">` +
    `<title id="${id}-t">${esc(spec.title)}</title><desc id="${id}-d">${esc(spec.alt)}</desc>` +
    defs(id, T, themeName, collectAccents(spec)) +
    `<rect width="${W}" height="${H}" rx="32" fill="url(#${id}-bg)"/><rect width="${W}" height="${H}" rx="32" fill="url(#${id}-dots)"/>` +
    head.svg + body.svg + footer(spec, T, H, warn) +
    `</svg>\n`
  return { svg, width: W, height: H, warnings }
}

// ---------------------------------------------------------------- driver ---

function validate(spec, file) {
  const errs = []
  for (const k of ['id', 'rev', 'type', 'eyebrow', 'title', 'subtitle', 'alt']) if (spec[k] === undefined) errs.push(`${file}: missing "${k}"`)
  if (!RENDERERS[spec.type]) errs.push(`${file}: unknown type "${spec.type}"`)
  if (spec.id && !/^[a-z0-9-]+$/.test(spec.id)) errs.push(`${file}: id must be kebab-case`)
  if (spec.id && !file.startsWith(spec.id + '.')) errs.push(`${file}: filename must start with the id "${spec.id}"`)
  return errs
}

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex')

function main() {
  const files = fs.readdirSync(SPEC_DIR).filter((f) => f.endsWith('.diagram.json')).sort()
  const problems = []
  const entries = []
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const file of files) {
    const spec = JSON.parse(fs.readFileSync(path.join(SPEC_DIR, file), 'utf8'))
    const errs = validate(spec, file)
    if (errs.length) { problems.push(...errs); continue }
    if (ONLY && spec.id !== ONLY) continue

    const outputs = []
    for (const themeName of Object.keys(THEMES)) {
      const r = renderSpec(spec, themeName)
      const name = themeName === 'dark' ? `${spec.id}.svg` : `${spec.id}.light.svg`
      const full = path.join(OUT_DIR, name)
      for (const w of r.warnings) problems.push(`${spec.id} ${w}`)
      for (const c of lintContrast(spec, themeName)) problems.push(`${spec.id} ${c}`)
      if (CHECK) {
        const disk = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null
        if (disk !== r.svg) problems.push(`${spec.id}: ${name} is stale, run node scripts/diagrams/spec-render.mjs`)
      } else {
        fs.writeFileSync(full, r.svg, 'utf8')
      }
      outputs.push({ theme: themeName, path: PUBLIC_PREFIX + name, width: r.width, height: r.height, bytes: Buffer.byteLength(r.svg), sha256: sha(r.svg) })
    }
    entries.push({
      id: spec.id,
      title: spec.title,
      type: spec.type,
      rev: spec.rev,
      spec: `data/diagrams/specs/${file}`,
      reviewed: spec.reviewed || null,
      source: spec.source || null,
      alt: spec.alt,
      outputs,
      replaces: spec.replaces || null,
      adoptedBy: findAdopters(spec.id),
    })
  }

  if (ONLY || problems.length && CHECK) {
    report(problems, entries)
    return
  }

  const registry = {
    $comment: 'Generated by scripts/diagrams/spec-render.mjs. Do not edit by hand.',
    schema: 'frankx.diagram-registry.v1',
    generator: 'scripts/diagrams/spec-render.mjs',
    servePath: PUBLIC_PREFIX,
    diagrams: entries,
  }
  const regText = JSON.stringify(registry, null, 2) + '\n'
  const gallery = buildGallery(entries)
  if (CHECK) {
    if (!fs.existsSync(REGISTRY_PATH) || fs.readFileSync(REGISTRY_PATH, 'utf8') !== regText) problems.push('registry.json is stale')
    if (!fs.existsSync(GALLERY_PATH) || fs.readFileSync(GALLERY_PATH, 'utf8') !== gallery) problems.push('docs/diagrams/gallery.html is stale')
  } else {
    fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true })
    fs.writeFileSync(REGISTRY_PATH, regText, 'utf8')
    fs.mkdirSync(path.dirname(GALLERY_PATH), { recursive: true })
    fs.writeFileSync(GALLERY_PATH, gallery, 'utf8')
  }
  report(problems, entries)
}

/** Which source files already reference the new diagram. Empty until pages adopt it. */
function findAdopters(id) {
  const needles = [`diagrams/system/${id}`, `diagramId="${id}"`, `diagramId='${id}'`, `diagramId: '${id}'`, `diagramId: "${id}"`]
  const hits = []
  const roots = ['app', 'components', 'content', 'data/acos']
  const walk = (dir) => {
    let ents
    try { ents = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const e of ents) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(tsx?|mdx?|json)$/.test(e.name)) {
        try {
          const txt = fs.readFileSync(p, 'utf8')
          if (needles.some((n) => txt.includes(n))) hits.push(path.relative(ROOT, p).replace(/\\/g, '/'))
        } catch { /* unreadable */ }
      }
    }
  }
  roots.forEach((r) => walk(path.join(ROOT, r)))
  return hits.sort()
}

function buildGallery(entries) {
  const cards = entries.map((e) => {
    const dark = e.outputs.find((o) => o.theme === 'dark')
    const light = e.outputs.find((o) => o.theme === 'light')
    const rel = (o) => '../../public' + o.path
    const rep = e.replaces
      ? `<p class="rep"><b>Replaces</b> <code>${esc(e.replaces.src)}</code> on ${e.replaces.pages.map((p) => `<code>${esc(p)}</code>`).join(', ')}.<br><b>Legacy file actually shows:</b> ${esc(e.replaces.legacySubject)}.</p>`
      : '<p class="rep">New diagram. No legacy file replaced.</p>'
    return `<section><h2>${esc(e.title)}</h2><p class="meta">${esc(e.id)} · ${e.type} · rev ${e.rev} · ${dark.width}×${dark.height} · ${Math.round(dark.bytes / 1024)} KB dark, ${Math.round(light.bytes / 1024)} KB light</p>${rep}` +
      `<div class="pair"><figure><img src="${rel(dark)}" alt="${esc(e.alt)}"><figcaption>Dark</figcaption></figure><figure class="l"><img src="${rel(light)}" alt="${esc(e.alt)}"><figcaption>Light</figcaption></figure></div></section>`
  }).join('\n')
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FrankX diagram gallery</title>` +
    `<style>body{margin:0;background:#0a0a0b;color:#fff;font:16px/1.5 Inter,system-ui,sans-serif;padding:48px 32px}main{max-width:1400px;margin:0 auto}h1{font-size:32px;margin:0 0 8px}h2{font-size:22px;margin:56px 0 4px}.meta{color:#8a9598;margin:0 0 8px;font:13px ui-monospace,Consolas,monospace}.rep{color:#b8c0c2;margin:0 0 20px}code{background:#191c20;padding:1px 6px;border-radius:6px;font-size:13px}.pair{display:grid;grid-template-columns:1fr;gap:24px}@media(min-width:1100px){.pair{grid-template-columns:1fr 1fr}}figure{margin:0}img{width:100%;height:auto;display:block;border-radius:16px}figcaption{color:#8a9598;font-size:13px;margin-top:6px}.l img{outline:1px solid #d5dbde}</style></head><body><main>` +
    `<h1>Diagram gallery</h1><p class="rep">Generated by scripts/diagrams/spec-render.mjs from data/diagrams/specs. Open this file directly; images load from public/.</p>${cards}</main></body></html>\n`
}

function report(problems, entries) {
  for (const e of entries) console.log(`${CHECK ? 'checked' : 'rendered'} ${e.id}  ${e.outputs.map((o) => `${o.theme}:${Math.round(o.bytes / 1024)}KB ${o.width}x${o.height}`).join('  ')}`)
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`)
    for (const p of problems) console.error(` - ${p}`)
    process.exit(1)
  }
  console.log(`\n${entries.length} diagram(s) ok. Contrast >= 4.5:1 and text fit passed on both themes.`)
}

main()

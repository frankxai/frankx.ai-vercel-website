import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const productsPath = path.join(repoRoot, 'data/products.json')
const outDir = path.join(repoRoot, 'public/images/products/plates')

const THEMES = {
  systems: {
    accent: '#38BDF8',
    accentSoft: 'rgba(56, 189, 248, 0.14)',
    accentBorder: 'rgba(56, 189, 248, 0.34)',
    secondary: '#22D3EE',
    laneLabel: 'SYSTEMS & AGENTS',
  },
  creative: {
    accent: '#10B981',
    accentSoft: 'rgba(16, 185, 129, 0.14)',
    accentBorder: 'rgba(16, 185, 129, 0.34)',
    secondary: '#34D399',
    laneLabel: 'CREATIVE STUDIO',
  },
  wealth: {
    accent: '#F59E0B',
    accentSoft: 'rgba(245, 158, 11, 0.14)',
    accentBorder: 'rgba(245, 158, 11, 0.34)',
    secondary: '#FBBF24',
    laneLabel: 'CATALOG & LEDGER OPS',
  },
  books: {
    accent: '#E2E8F0',
    accentSoft: 'rgba(226, 232, 240, 0.12)',
    accentBorder: 'rgba(226, 232, 240, 0.30)',
    secondary: '#94A3B8',
    laneLabel: 'EDITORIAL FOLIO',
  },
}

function classifyLane(p) {
  const id = (p.id ?? '').toLowerCase()
  const cat = (p.category ?? '').toLowerCase()
  if (id.includes('book') || cat === 'books' || cat === 'book' || id === 'creators-soulbook') {
    return 'books'
  }
  if (
    id.includes('dpi') ||
    id.includes('income') ||
    id.includes('stream') ||
    id.includes('capability') ||
    id.includes('founders-circle')
  ) {
    return 'wealth'
  }
  if (
    id.includes('vibe') ||
    id.includes('suno') ||
    id.includes('visual') ||
    id.includes('aurora') ||
    id.includes('creative') ||
    id.includes('chronicles') ||
    id.includes('generative') ||
    id.includes('media-machine') ||
    id.includes('anti-slop') ||
    id.includes('mythic')
  ) {
    return 'creative'
  }
  return 'systems'
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function trunc(str, max) {
  const s = String(str ?? '').trim()
  if (s.length <= max) return s
  return s.slice(0, max - 1).trimEnd() + '…'
}

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function renderMotif(lane, modules, seed, theme) {
  const m0 = trunc(modules[0]?.title ?? 'Core Spec', 24)
  const m1 = trunc(modules[1]?.title ?? 'Workflow Templates', 24)
  const m2 = trunc(modules[2]?.title ?? 'Verification Gate', 24)

  if (lane === 'systems') {
    return `
      <!-- Directed Agent & Protocol Mesh -->
      <g transform="translate(36, 98)">
        <rect x="0" y="0" width="568" height="190" rx="14" fill="#0D1017" stroke="rgba(255,255,255,0.08)" />
        <line x1="184" y1="54" x2="256" y2="54" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="4 3" />
        <line x1="184" y1="136" x2="256" y2="95" stroke="${theme.accent}" stroke-width="1.2" opacity="0.65" />
        <line x1="392" y1="74" x2="432" y2="74" stroke="${theme.secondary}" stroke-width="1.5" />
        <line x1="392" y1="120" x2="432" y2="120" stroke="${theme.secondary}" stroke-width="1.2" opacity="0.65" />

        <rect x="20" y="28" width="164" height="52" rx="10" fill="#121722" stroke="${theme.accentBorder}" />
        <circle cx="38" cy="54" r="4.5" fill="${theme.accent}" />
        <text x="52" y="50" fill="#F8FAFC" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="11" font-weight="600">${esc(m0)}</text>
        <text x="52" y="66" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">INPUT CONTRACT · MD/JSON</text>

        <rect x="20" y="108" width="164" height="52" rx="10" fill="#121722" stroke="rgba(255,255,255,0.12)" />
        <circle cx="38" cy="134" r="4.5" fill="${theme.secondary}" />
        <text x="52" y="130" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="11" font-weight="600">${esc(m1)}</text>
        <text x="52" y="146" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">EXECUTION HARNESS</text>

        <rect x="256" y="34" width="136" height="122" rx="12" fill="${theme.accentSoft}" stroke="${theme.accentBorder}" />
        <text x="324" y="64" text-anchor="middle" fill="${theme.accent}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10" letter-spacing="1.4">ROUTER BUS</text>
        <line x1="274" y1="78" x2="374" y2="78" stroke="${theme.accentBorder}" />
        <text x="324" y="100" text-anchor="middle" fill="#F8FAFC" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="600">Scoped Lane</text>
        <text x="324" y="118" text-anchor="middle" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">ISOLATED WORKTREE</text>
        <text x="324" y="138" text-anchor="middle" fill="${theme.secondary}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">RECEIPT VERIFIED</text>

        <rect x="432" y="46" width="116" height="98" rx="10" fill="#121722" stroke="rgba(255,255,255,0.14)" />
        <text x="490" y="74" text-anchor="middle" fill="#F8FAFC" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600">${esc(trunc(m2, 15))}</text>
        <rect x="450" y="88" width="80" height="20" rx="5" fill="rgba(56,189,248,0.12)" stroke="${theme.accentBorder}" />
        <text x="490" y="102" text-anchor="middle" fill="${theme.accent}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">GATE PASS</text>
        <text x="490" y="128" text-anchor="middle" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9">SHA-256</text>
      </g>
    `
  }

  if (lane === 'creative') {
    const bars = Array.from({ length: 24 }, (_, idx) => {
      const h = 24 + ((seed + idx * 37) % 78)
      const y = 122 - h / 2
      const x = 26 + idx * 14
      const active = idx % 3 === 0
      return `<rect x="${x}" y="${y.toFixed(1)}" width="8" height="${h}" rx="3" fill="${active ? theme.accent : 'rgba(255,255,255,0.16)'}" opacity="${active ? '0.92' : '0.55'}" />`
    }).join('')

    return `
      <!-- Studio Signal & Stem Architecture -->
      <g transform="translate(36, 98)">
        <rect x="0" y="0" width="568" height="190" rx="14" fill="#0D1017" stroke="rgba(255,255,255,0.08)" />
        <text x="26" y="30" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5" letter-spacing="1.2">SIGNAL SPECTRUM · REFERENCE LOCKED</text>
        ${bars}
        <rect x="382" y="22" width="166" height="44" rx="9" fill="#121820" stroke="${theme.accentBorder}" />
        <text x="396" y="41" fill="#F8FAFC" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600">01 · ${esc(trunc(m0, 18))}</text>
        <text x="396" y="56" fill="${theme.accent}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9">TOKEN SPEC</text>

        <rect x="382" y="74" width="166" height="44" rx="9" fill="#121820" stroke="rgba(255,255,255,0.12)" />
        <text x="396" y="93" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600">02 · ${esc(trunc(m1, 18))}</text>
        <text x="396" y="108" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9">WORKFLOW LOOP</text>

        <rect x="382" y="126" width="166" height="44" rx="9" fill="#121820" stroke="rgba(255,255,255,0.12)" />
        <text x="396" y="145" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600">03 · ${esc(trunc(m2, 18))}</text>
        <text x="396" y="160" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9">QA RUBRIC</text>
      </g>
    `
  }

  if (lane === 'wealth') {
    const gates = ['G1 SCOPE', 'G2 SPEC', 'G3 AUDIT', 'G4 STAGE', 'G5 LIVE']
    const gateBoxes = gates
      .map((g, i) => {
        const x = 22 + i * 108
        const highlight = i === 2 || i === 4
        return `
          <rect x="${x}" y="24" width="96" height="46" rx="8" fill="${highlight ? theme.accentSoft : '#12161F'}" stroke="${highlight ? theme.accentBorder : 'rgba(255,255,255,0.10)'}" />
          <text x="${x + 48}" y="44" text-anchor="middle" fill="${highlight ? theme.accent : '#E2E8F0'}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10" font-weight="600">${g}</text>
          <text x="${x + 48}" y="59" text-anchor="middle" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="8.5">GATE ${i + 1}</text>
        `
      })
      .join('')

    return `
      <!-- Ledger & Gate Readiness Matrix -->
      <g transform="translate(36, 98)">
        <rect x="0" y="0" width="568" height="190" rx="14" fill="#0D1017" stroke="rgba(255,255,255,0.08)" />
        ${gateBoxes}
        <rect x="22" y="86" width="524" height="84" rx="10" fill="#11151E" stroke="rgba(255,255,255,0.09)" />
        <text x="38" y="110" fill="${theme.accent}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10" font-weight="600">LEDGER_ROW_01</text>
        <text x="156" y="110" fill="#F8FAFC" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5">${esc(m0)}</text>
        <text x="528" y="110" text-anchor="end" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">AUDITED</text>
        <line x1="38" y1="122" x2="528" y2="122" stroke="rgba(255,255,255,0.06)" />
        <text x="38" y="142" fill="${theme.secondary}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10" font-weight="600">LEDGER_ROW_02</text>
        <text x="156" y="142" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5">${esc(m1)}</text>
        <text x="528" y="142" text-anchor="end" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5">LOCAL SQLITE</text>
      </g>
    `
  }

  // books folio
  return `
    <!-- Editorial Book Folio Grid -->
    <g transform="translate(36, 98)">
      <rect x="0" y="0" width="568" height="190" rx="14" fill="#0D1017" stroke="rgba(255,255,255,0.08)" />
      <rect x="26" y="20" width="160" height="150" rx="10" fill="#141821" stroke="${theme.accentBorder}" />
      <line x1="46" y1="46" x2="146" y2="46" stroke="${theme.accent}" stroke-width="1.5" />
      <line x1="46" y1="64" x2="128" y2="64" stroke="rgba(255,255,255,0.28)" stroke-width="1.2" />
      <rect x="46" y="86" width="120" height="52" rx="6" fill="rgba(226,232,240,0.06)" stroke="rgba(255,255,255,0.10)" />
      <text x="106" y="116" text-anchor="middle" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5" letter-spacing="1.2">OPEN EDITION</text>

      <text x="214" y="44" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="9.5" letter-spacing="1.4">CHAPTER ARCHITECTURE</text>
      <text x="214" y="74" fill="#F8FAFC" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600">I. ${esc(trunc(m0, 34))}</text>
      <line x1="214" y1="88" x2="536" y2="88" stroke="rgba(255,255,255,0.07)" />
      <text x="214" y="112" fill="#E2E8F0" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600">II. ${esc(trunc(m1, 34))}</text>
      <line x1="214" y1="126" x2="536" y2="126" stroke="rgba(255,255,255,0.07)" />
      <text x="214" y="150" fill="#CBD5E1" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600">III. ${esc(trunc(m2, 34))}</text>
    </g>
  `
}

function renderPlateSvg(p) {
  const lane = classifyLane(p)
  const theme = THEMES[lane]
  const name = p.name ?? p.title ?? p.slug
  const badge = p.badge ?? 'Specification'
  const modules = Array.isArray(p.modules) ? p.modules : []
  const seed = hashSeed(p.id ?? p.slug)
  const sku = String(p.slug ?? p.id).toUpperCase().slice(0, 22)

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" role="img" aria-labelledby="title-${esc(p.slug)} desc-${esc(p.slug)}">
  <title id="title-${esc(p.slug)}">${esc(name)} schematic plate</title>
  <desc id="desc-${esc(p.slug)}">Technical deliverable diagram for ${esc(name)} (${esc(theme.laneLabel)}).</desc>
  <defs>
    <linearGradient id="bg-${esc(p.slug)}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0B0F" />
      <stop offset="100%" stop-color="#10141D" />
    </linearGradient>
    <radialGradient id="glow-${esc(p.slug)}" cx="82%" cy="18%" r="60%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid-${esc(p.slug)}" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.028)" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="640" height="360" rx="20" fill="url(#bg-${esc(p.slug)})" />
  <rect width="640" height="360" rx="20" fill="url(#grid-${esc(p.slug)})" />
  <rect width="640" height="360" rx="20" fill="url(#glow-${esc(p.slug)})" />
  <rect x="0.75" y="0.75" width="638.5" height="358.5" rx="19.25" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.5" />

  <!-- Top Telemetry Header -->
  <text x="36" y="42" fill="${theme.accent}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600" letter-spacing="1.6">${esc(theme.laneLabel)}</text>
  <text x="36" y="68" fill="#F8FAFC" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.4">${esc(trunc(name, 38))}</text>

  <rect x="476" y="26" width="128" height="28" rx="14" fill="${theme.accentSoft}" stroke="${theme.accentBorder}" />
  <text x="540" y="44" text-anchor="middle" fill="#F8FAFC" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10.5" font-weight="600">${esc(trunc(badge, 16))}</text>

  ${renderMotif(lane, modules, seed, theme)}

  <!-- Bottom Inspectable Footer -->
  <text x="36" y="324" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10" letter-spacing="1.1">SKU // ${esc(sku)}</text>
  <text x="604" y="324" text-anchor="end" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="10">INSPECTABLE MANIFEST · 16:9</text>
</svg>
`
}

fs.mkdirSync(outDir, { recursive: true })
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
for (const p of products) {
  const svg = renderPlateSvg(p)
  fs.writeFileSync(path.join(outDir, `${p.slug}.svg`), svg, 'utf8')
}
console.log(`Generated ${products.length} SVG schematic plates in public/images/products/plates`)

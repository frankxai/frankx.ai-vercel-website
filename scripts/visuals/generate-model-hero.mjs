#!/usr/bin/env node
/**
 * Model Hero SVG generator — on-brand "Intelligence Dispatch" card heroes for
 * frontier-model deep-dive articles.
 *
 * House style mirrors public/images/blog/microsoft-mai-models-2026-hero.svg:
 * a dark layered-gradient panel, an org badge pill, the model name, a subtitle,
 * a row of stat tiles (spec/benchmark), a per-vendor accent color, and a FrankX
 * dispatch footer. Deterministic, textful, no external API — safe and reproducible.
 *
 * Usage:
 *   node scripts/visuals/generate-model-hero.mjs            # write all CONFIGS
 *   node scripts/visuals/generate-model-hero.mjs <slug>     # write one
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'blog')

const W = 1600
const H = 900

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#8217;')
}

/**
 * @param {{
 *   slug: string, org: string, name: string, subtitle: string,
 *   accentFrom: string, accentTo: string, glowHex: string,
 *   tiles: {label:string, value:string}[],   // 3 or 4
 *   footer: string
 * }} c
 */
function buildHeroSVG(c) {
  const tiles = c.tiles.slice(0, 4)
  const n = tiles.length
  const gap = 24
  const left = 190
  const right = 1410
  const span = right - left
  const tileW = (span - gap * (n - 1)) / n
  const tileY = 470
  const tileH = 250

  const tileMarkup = tiles
    .map((t, i) => {
      const x = left + i * (tileW + gap)
      return `
    <rect x="${x.toFixed(0)}" y="${tileY}" width="${tileW.toFixed(0)}" height="${tileH}" rx="24" fill="url(#tile)" stroke="${i === 0 ? c.accentTo : '#1E2E51'}" stroke-opacity="${i === 0 ? 0.7 : 0.6}" />
    <rect x="${(x + 28).toFixed(0)}" y="${tileY + 30}" width="46" height="6" rx="3" fill="url(#accent)" />
    <text x="${(x + 28).toFixed(0)}" y="${tileY + 138}" font-size="52" font-weight="800" fill="#FFFFFF">${esc(t.value)}</text>
    <text x="${(x + 28).toFixed(0)}" y="${tileY + 188}" font-size="19" font-weight="500" fill="#8FA6C4">${esc(t.label)}</text>`
    })
    .join('')

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1400" y2="980" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#05070F" />
      <stop offset="0.5" stop-color="#0B1530" />
      <stop offset="1" stop-color="#070B18" />
    </linearGradient>
    <linearGradient id="glimmer" x1="320" y1="120" x2="1320" y2="780" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${c.accentTo}" stop-opacity="0.28" />
      <stop offset="0.5" stop-color="${c.accentFrom}" stop-opacity="0.14" />
      <stop offset="1" stop-color="#8B5CF6" stop-opacity="0.20" />
    </linearGradient>
    <radialGradient id="pulse" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 430) rotate(90) scale(640 540)">
      <stop offset="0" stop-color="${c.glowHex}" stop-opacity="0.42" />
      <stop offset="1" stop-color="${c.glowHex}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16233F" />
      <stop offset="1" stop-color="#0C1428" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.accentFrom}" /><stop offset="1" stop-color="${c.accentTo}" />
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)" />
  <rect width="${W}" height="${H}" fill="url(#pulse)" />
  <rect x="120" y="90" width="1360" height="720" rx="56" fill="#0A1224" fill-opacity="0.72" stroke="#1E2C4C" stroke-opacity="0.55" />
  <rect x="120" y="90" width="1360" height="720" rx="56" fill="url(#glimmer)" fill-opacity="0.5" />

  <g font-family="Segoe UI, Helvetica, Arial, sans-serif">
    <rect x="190" y="160" width="${Math.max(150, c.org.length * 12 + 48)}" height="36" rx="18" fill="${c.accentTo}" fill-opacity="0.18" stroke="${c.accentTo}" stroke-opacity="0.5" />
    <text x="${190 + Math.max(150, c.org.length * 12 + 48) / 2}" y="184" font-size="17" font-weight="600" letter-spacing="2" fill="${c.accentFrom}" text-anchor="middle">${esc(c.org.toUpperCase())}</text>
    <text x="190" y="300" font-size="92" font-weight="800" fill="#FFFFFF">${esc(c.name)}</text>
    <text x="190" y="362" font-size="29" font-weight="400" fill="#9FB3D1">${esc(c.subtitle)}</text>
${tileMarkup}
    <text x="190" y="772" font-size="16" fill="#5C6F8E">${esc(c.footer)}</text>
  </g>
</svg>
`
}

// ---- per-vendor palettes -------------------------------------------------
const PALETTE = {
  anthropic: { accentFrom: '#C4B5FD', accentTo: '#7C3AED', glowHex: '#7C3AED' },
  openai: { accentFrom: '#6EE7B7', accentTo: '#059669', glowHex: '#10B981' },
  google: { accentFrom: '#93C5FD', accentTo: '#2563EB', glowHex: '#3B82F6' },
  xai: { accentFrom: '#FCA5A5', accentTo: '#DC2626', glowHex: '#EF4444' },
  deepseek: { accentFrom: '#67E8F9', accentTo: '#0891B2', glowHex: '#06B6D4' },
  alibaba: { accentFrom: '#FDBA74', accentTo: '#EA580C', glowHex: '#F97316' },
  moonshot: { accentFrom: '#A5B4FC', accentTo: '#4F46E5', glowHex: '#6366F1' },
  meta: { accentFrom: '#93C5FD', accentTo: '#1D4ED8', glowHex: '#3B82F6' },
  mistral: { accentFrom: '#FDA4AF', accentTo: '#E11D48', glowHex: '#F43F5E' },
  mistralai: { accentFrom: '#FDA4AF', accentTo: '#E11D48', glowHex: '#F43F5E' },
  microsoft: { accentFrom: '#7FD3FF', accentTo: '#0078D4', glowHex: '#0078D4' },
  roundup: { accentFrom: '#5EEAD4', accentTo: '#0D9488', glowHex: '#14B8A6' },
}

// ---- CONFIGS: filled with VERIFIED values from research ------------------
// Stat tile values are populated after the per-model research returns so the
// hero matches the article's cited numbers.
// Complete source of truth for model-hero regeneration. Output is deterministic,
// so re-running reproduces every committed hero byte-for-byte.
const CONFIGS = [
  // Phase 3 — open & local models:
  {
    slug: 'gemma-3-analysis-2026',
    orgKey: 'google',
    org: 'Google DeepMind',
    name: 'Gemma 4',
    subtitle: 'Open-weight, Apache 2.0 — a 31B dense model that runs on one GPU and tops the open arena',
    tiles: [
      { value: '1452', label: 'LMArena Elo (31B)' },
      { value: '~18GB', label: 'VRAM (31B Q4)' },
      { value: '256K', label: 'Context window' },
      { value: '$0', label: 'Open weights' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Google DeepMind, HuggingFace, LMArena',
  },
  {
    slug: 'gpt-oss-analysis-2026',
    orgKey: 'openai',
    org: 'OpenAI',
    name: 'gpt-oss',
    subtitle: 'Open-weight, Apache 2.0 — 120b runs on one 80GB GPU, 20b runs on a 16GB laptop',
    tiles: [
      { value: '80.1%', label: 'GPQA Diamond (120b)' },
      { value: '~16GB', label: 'VRAM (20b)' },
      { value: '128K', label: 'Context window' },
      { value: '$0', label: 'Open weights' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via OpenAI model card, GitHub, MLCommons',
  },
  {
    slug: 'llama-4-analysis-2026',
    orgKey: 'meta',
    org: 'Meta',
    name: 'Llama 4 Maverick',
    subtitle: 'Open multimodal MoE — still Meta’s flagship, but a data-center model (Scout self-hosts)',
    tiles: [
      { value: '400B/17B', label: 'MoE params' },
      { value: '8×H100', label: 'VRAM (Maverick FP8)' },
      { value: '1M', label: 'Context (10M Scout)' },
      { value: '$0', label: 'Open weights' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Meta AI, HuggingFace, vLLM',
  },
  {
    slug: 'mistral-large-3-analysis-2026',
    orgKey: 'mistralai',
    org: 'Mistral AI',
    name: 'Mistral Large 3',
    subtitle: 'Europe’s 675B open-weight frontier — Apache 2.0, EU-sovereign, one node',
    tiles: [
      { value: '1418', label: 'LMArena Elo' },
      { value: '675B/41B', label: 'MoE params' },
      { value: '256K', label: 'Context window' },
      { value: '$0 / $0.50', label: 'Self-host / API in' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Mistral, HuggingFace, vLLM',
  },
  {
    slug: 'phi-analysis-2026',
    orgKey: 'microsoft',
    org: 'Microsoft',
    name: 'Microsoft Phi-4',
    subtitle: 'MIT-licensed small models that run on a laptop and beat their weight class',
    tiles: [
      { value: '3.8–15B', label: 'Param tiers' },
      { value: '~8GB', label: 'VRAM (14B Q4)' },
      { value: 'MIT', label: 'License' },
      { value: '$0', label: 'Open weights' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Microsoft Research, HuggingFace, arXiv',
  },
  {
    slug: 'best-open-local-llms-2026',
    orgKey: 'roundup',
    org: 'FrankX Intelligence',
    name: 'Open & Local LLMs',
    subtitle: 'June 2026 field guide — Gemma 4, gpt-oss, Phi-4, Mistral, Llama, DeepSeek, Kimi',
    tiles: [
      { value: '7+', label: 'Models compared' },
      { value: 'Apache/MIT', label: 'Open licenses' },
      { value: '2GB–640GB', label: 'VRAM range' },
      { value: '$0', label: 'Per-token cost' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Self-host field guide · all figures cited',
  },
  // Phase 1 — Western flagships:
  {
    slug: 'claude-opus-4-8-analysis-2026',
    orgKey: 'anthropic',
    org: 'Anthropic',
    name: 'Claude Opus 4.8',
    subtitle: 'Flagship reasoning + coding — tops the intelligence index at unchanged $5/$25',
    tiles: [
      { value: '69.2%', label: 'SWE-Bench Pro' },
      { value: '1890', label: 'GDPval-AA Elo' },
      { value: '1M', label: 'Context window' },
      { value: '$5/$25', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Anthropic, Artificial Analysis, llm-stats',
  },
  {
    slug: 'gpt-5-5-analysis-2026',
    orgKey: 'openai',
    org: 'OpenAI',
    name: 'GPT-5.5',
    subtitle: 'Agentic flagship "Spud" — best published computer-use scores, at double the price',
    tiles: [
      { value: '84.9%', label: 'GDPval' },
      { value: '78.7%', label: 'OSWorld' },
      { value: '98%', label: 'Tau2 Telecom' },
      { value: '$5/$30', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via OpenAI, Artificial Analysis, Vellum',
  },
  {
    slug: 'gemini-3-5-pro-analysis-2026',
    orgKey: 'google',
    org: 'Google DeepMind',
    name: 'Gemini 3.5 Pro',
    subtitle: 'Google’s top reasoning tier — announced at I/O, GA targeted June 2026',
    tiles: [
      { value: 'Preview', label: 'Vertex limited' },
      { value: '2M', label: 'Context (target)' },
      { value: 'Deep Think', label: 'Reasoning mode' },
      { value: 'TBD', label: 'Benchmarks at GA' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Pre-GA brief — no measured benchmarks yet',
  },
  {
    slug: 'grok-4-3-analysis-2026',
    orgKey: 'xai',
    org: 'xAI',
    name: 'Grok 4.3',
    subtitle: 'Budget frontier — fourth-best intelligence at the cheapest frontier price',
    tiles: [
      { value: '53', label: 'AA Intelligence' },
      { value: '1500', label: 'GDPval-AA Elo' },
      { value: '181 t/s', label: 'Output speed' },
      { value: '$1.25/$2.50', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Artificial Analysis, xAI docs',
  },
  // Phase 2 — open-frontier labs:
  {
    slug: 'deepseek-v4-analysis-2026',
    orgKey: 'deepseek',
    org: 'DeepSeek',
    name: 'DeepSeek V4',
    subtitle: 'Open-weight frontier-class coding at one-sixth the price — MIT-licensed, 1M context',
    tiles: [
      { value: '80.6%', label: 'SWE-bench Verified' },
      { value: '52', label: 'AA Intelligence' },
      { value: '1M', label: 'Context window' },
      { value: '$1.74/$3.48', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Artificial Analysis, NIST/CAISI, HuggingFace',
  },
  {
    slug: 'qwen3-max-analysis-2026',
    orgKey: 'alibaba',
    org: 'Alibaba · Qwen',
    name: 'Qwen3.7-Max',
    subtitle: 'Closed-weight agent flagship — top-5 intelligence, 1M context, 35-hour autonomy',
    tiles: [
      { value: '56.6', label: 'AA Intelligence' },
      { value: '60.6%', label: 'SWE-Bench Pro' },
      { value: '1M', label: 'Context window' },
      { value: '$2.50/$7.50', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · Verified via Artificial Analysis, Qwen, VentureBeat',
  },
  {
    slug: 'kimi-k2-analysis-2026',
    orgKey: 'moonshot',
    org: 'Moonshot AI',
    name: 'Kimi K2.6',
    subtitle: 'Top open-weights intelligence — GPT-5.5-class coding at one-eighth the price',
    tiles: [
      { value: '54', label: 'AA Intelligence' },
      { value: '1T / 32B', label: 'MoE params' },
      { value: '256K', label: 'Context window' },
      { value: '$0.60/$2.50', label: 'per 1M tokens' },
    ],
    footer: 'FrankX · Intelligence Dispatch · AA index verified; Moonshot evals labeled vendor-claimed',
  },
]

function write(c) {
  const pal = PALETTE[c.orgKey] || PALETTE.anthropic
  const svg = buildHeroSVG({ ...c, ...pal })
  mkdirSync(OUT_DIR, { recursive: true })
  const out = join(OUT_DIR, `${c.slug}-hero.svg`)
  writeFileSync(out, svg)
  console.log('wrote', out)
}

const only = process.argv[2]
const list = only ? CONFIGS.filter((c) => c.slug === only) : CONFIGS
if (!list.length) {
  console.error(only ? `no config for slug "${only}"` : 'no CONFIGS defined')
  process.exit(1)
}
list.forEach(write)

export { buildHeroSVG, PALETTE }

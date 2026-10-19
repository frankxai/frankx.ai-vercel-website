#!/usr/bin/env node
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', '..')
const blogDir = path.join(root, 'content', 'blog')
const publicDir = path.join(root, 'public')
const headerDir = path.join(publicDir, 'images', 'blog', 'editorial', 'headers')
const infographicDir = path.join(publicDir, 'images', 'blog', 'editorial', 'infographics')
const socialRoot = path.join(publicDir, 'images', 'social', 'blog')
const manifestPath = path.join(root, 'data', 'blog-raster-visual-system.json')

const VERSION = '2026-06-frankx-raster-vos'
const HERO_SIZE = { width: 1600, height: 900 }
const WIDE_SIZE = { width: 1200, height: 630 }
const SQUARE_SIZE = { width: 1080, height: 1080 }
const PORTRAIT_SIZE = { width: 1080, height: 1350 }
const INFO_SIZE = { width: 1600, height: 1200 }

const palettes = [
  { name: 'signal', accent: '#10b981', accent2: '#06b6d4', warm: '#f59e0b', bg: '#08090b' },
  { name: 'lab', accent: '#43bfe3', accent2: '#10b981', warm: '#e040fb', bg: '#090b10' },
  { name: 'studio', accent: '#f59e0b', accent2: '#10b981', warm: '#43bfe3', bg: '#0b0908' },
  { name: 'governance', accent: '#10b981', accent2: '#f59e0b', warm: '#43bfe3', bg: '#090b0a' },
]

function parseArgs(argv) {
  const opts = { limit: 50, infographics: 12, social: 8, writeFrontmatter: true }
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === '--dry-run') opts.dryRun = true
    if (token === '--no-frontmatter') opts.writeFrontmatter = false
    if (token === '--from-manifest') opts.fromManifest = true
    if (token === '--limit') {
      opts.limit = Number.parseInt(argv[i + 1], 10)
      i += 1
    }
    if (token === '--infographics') {
      opts.infographics = Number.parseInt(argv[i + 1], 10)
      i += 1
    }
    if (token === '--social') {
      opts.social = Number.parseInt(argv[i + 1], 10)
      i += 1
    }
  }
  return opts
}

function hashText(text) {
  let hash = 2166136261
  for (const char of String(text)) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash >>> 0)
}

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function publicUrlToPath(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('/')) return null
  return path.join(publicDir, url.replace(/^\//, '').replace(/\//g, path.sep))
}

function isRasterImage(filePath) {
  return /\.(png|jpe?g|webp)$/i.test(filePath || '')
}

function fileExists(filePath) {
  return Boolean(filePath && fsSync.existsSync(filePath))
}

function normalizeSlug(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toKebabWords(text, max = 5) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !['the', 'and', 'for', 'with', 'from', 'that', 'this', 'your', 'into'].includes(word))
    .slice(0, max)
}

function formatDate(value) {
  if (!value) return 'Field note'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function decodeTitle(title) {
  return String(title || 'Untitled field note')
    .replace(/\s+/g, ' ')
    .replace(/\s+\|\s+FrankX.*$/i, '')
    .trim()
}

function editorialTitle(post) {
  const title = decodeTitle(post.title)
  const noYear = title
    .replace(/\b(?:2024|2025|2026|Q[1-4]\s+2026|June\s+2026)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const bestMatch = noYear.match(/^Best AI ([^:]+):?\s*/i)
  if (bestMatch) {
    const subject = bestMatch[1].replace(/\btool|tools\b/gi, '').trim()
    return `The ${subject} field test`
  }

  if (/ultimate/i.test(noYear) && /workflow/i.test(noYear)) {
    return noYear.replace(/^The Ultimate\s+/i, '').replace(/:\s+.+$/, '') + ' playbook'
  }

  if (noYear.length > 86 && noYear.includes(':')) {
    const [lead, ...rest] = noYear.split(':')
    const tail = rest.join(':').trim()
    return `${lead.trim()}: ${tail.split(/[.?!]/)[0].slice(0, 82).trim()}`
  }

  return noYear
}

function humanHook(post) {
  const description = String(post.description || post.tldr || post.readingGoal || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!description) return 'A field-tested map for building with more signal and less noise.'

  const firstSentence = description.split(/(?<=[.!?])\s+/)[0]
  if (firstSentence.length <= 158) return firstSentence

  const trimmed = firstSentence
    .slice(0, 154)
    .replace(/\s+\S*$/, '')
    .replace(/[\s,;:–—-]+$/g, '')
    .replace(/[.?!]+$/g, '')

  return `${trimmed}.`
}

function wrapText(text, maxChars, maxLines = 5) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
      if (lines.length >= maxLines) break
    } else {
      current = next
    }
  }
  if (current && lines.length < maxLines) lines.push(current)
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[,.]$/, '')}`
  }
  return lines
}

function textBlock(lines, { x, y, size, lineHeight, weight = 700, fill = '#ffffff', opacity = 1, family = 'Inter, Arial, sans-serif', maxWidth }) {
  const tspans = lines.map((line, index) => (
    `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`
  )).join('')
  const widthAttr = maxWidth ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"` : ''
  return `<text x="${x}" y="${y}" fill="${fill}" opacity="${opacity}" font-size="${size}" font-weight="${weight}" font-family="${family}" letter-spacing="0"${widthAttr}>${tspans}</text>`
}

function chip(label, x, y, palette, { fill, stroke, text = '#e8fff7', width } = {}) {
  const safe = escapeXml(label)
  const chipWidth = width || Math.max(96, safe.length * 8 + 34)
  return `
    <rect x="${x}" y="${y}" width="${chipWidth}" height="38" rx="19" fill="${fill || palette.accent}22" stroke="${stroke || palette.accent}66"/>
    <text x="${x + 18}" y="${y + 25}" fill="${text}" font-size="13" font-weight="700" font-family="Inter, Arial, sans-serif" letter-spacing="0">${safe}</text>
  `
}

function patternDefs(palette) {
  return `
    <defs>
      <linearGradient id="darkSweep" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#050607"/>
        <stop offset="44%" stop-color="${palette.bg}" stop-opacity="0.96"/>
        <stop offset="100%" stop-color="#101216" stop-opacity="0.92"/>
      </linearGradient>
      <radialGradient id="auraA" cx="20%" cy="18%" r="80%">
        <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.34"/>
        <stop offset="45%" stop-color="${palette.accent2}" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="${palette.bg}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="auraB" cx="84%" cy="24%" r="70%">
        <stop offset="0%" stop-color="${palette.warm}" stop-opacity="0.20"/>
        <stop offset="55%" stop-color="${palette.accent2}" stop-opacity="0.07"/>
        <stop offset="100%" stop-color="${palette.bg}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M52 0H0V52" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
      </pattern>
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  `
}

function railDiagram(palette, hash, x = 1048, y = 176) {
  const nodes = []
  const labels = ['Signal', 'System', 'Proof', 'Route', 'Ship']
  for (let i = 0; i < 5; i += 1) {
    const nx = x + (i % 2) * 206
    const ny = y + i * 108
    const accent = i % 2 === 0 ? palette.accent : palette.accent2
    nodes.push(`
      <g filter="url(#softGlow)">
        <rect x="${nx}" y="${ny}" width="162" height="66" rx="18" fill="#0f151a" stroke="${accent}66"/>
        <circle cx="${nx + 34}" cy="${ny + 33}" r="11" fill="${accent}" opacity="0.95"/>
        <text x="${nx + 58}" y="${ny + 28}" fill="#f7fffb" font-size="15" font-weight="800" font-family="Inter, Arial, sans-serif">${labels[i]}</text>
        <text x="${nx + 58}" y="${ny + 48}" fill="#ffffff" opacity="0.48" font-size="11" font-weight="600" font-family="Inter, Arial, sans-serif">layer ${String(i + 1).padStart(2, '0')}</text>
      </g>
    `)
  }

  const paths = [
    `M${x + 162} ${y + 33} C${x + 250} ${y + 50}, ${x + 118} ${y + 138}, ${x + 206} ${y + 141}`,
    `M${x + 206} ${y + 174} C${x + 108} ${y + 218}, ${x + 210} ${y + 254}, ${x + 82} ${y + 249}`,
    `M${x + 162} ${y + 249} C${x + 270} ${y + 290}, ${x + 122} ${y + 358}, ${x + 206} ${y + 357}`,
    `M${x + 206} ${y + 390} C${x + 112} ${y + 420}, ${x + 206} ${y + 492}, ${x + 82} ${y + 465}`,
  ].map((d, i) => `<path d="${d}" fill="none" stroke="${i % 2 ? palette.accent2 : palette.accent}" stroke-width="2" stroke-opacity="0.55"/>`).join('')

  const reading = 42 + (hash % 51)
  return `
    <g opacity="0.96">
      <rect x="${x - 54}" y="${y - 72}" width="504" height="660" rx="36" fill="#0b0f13" opacity="0.62" stroke="#ffffff" stroke-opacity="0.08"/>
      <text x="${x - 16}" y="${y - 30}" fill="#ffffff" opacity="0.42" font-size="12" font-weight="800" font-family="Inter, Arial, sans-serif" letter-spacing="0">OPERATING MAP</text>
      <text x="${x + 292}" y="${y - 30}" text-anchor="end" fill="${palette.accent}" font-size="12" font-weight="800" font-family="Inter, Arial, sans-serif" letter-spacing="0">${reading}% SIGNAL</text>
      ${paths}
      ${nodes.join('')}
    </g>
  `
}

function heroOverlay(post, palette) {
  const title = editorialTitle(post)
  const titleLines = wrapText(title, 26, 4)
  const hookLines = wrapText(humanHook(post), 56, 3)
  const tags = (post.tags || toKebabWords(title)).slice(0, 3)
  const hash = hashText(post.slug)
  const category = post.category || 'Field note'

  return `
    <svg width="${HERO_SIZE.width}" height="${HERO_SIZE.height}" viewBox="0 0 ${HERO_SIZE.width} ${HERO_SIZE.height}" xmlns="http://www.w3.org/2000/svg">
      ${patternDefs(palette)}
      <rect width="1600" height="900" fill="url(#darkSweep)" opacity="0.78"/>
      <rect width="1600" height="900" fill="url(#grid)"/>
      <rect width="1600" height="900" fill="url(#auraA)"/>
      <rect width="1600" height="900" fill="url(#auraB)"/>
      <path d="M0 0H1600V900H0Z" fill="url(#darkSweep)" opacity="0.18"/>
      <path d="M0 0H960L740 900H0Z" fill="#050607" opacity="0.62"/>
      <path d="M0 0H760L600 900H0Z" fill="#050607" opacity="0.45"/>
      <line x1="92" y1="92" x2="1508" y2="92" stroke="#fff" stroke-opacity="0.10"/>
      <line x1="92" y1="808" x2="1508" y2="808" stroke="#fff" stroke-opacity="0.10"/>
      <text x="96" y="74" fill="${palette.accent}" font-size="13" font-weight="900" font-family="Inter, Arial, sans-serif" letter-spacing="0">FRANKX INTELLIGENCE JOURNAL</text>
      ${chip(category, 96, 128, palette)}
      ${chip(formatDate(post.date), 96 + Math.max(180, String(category).length * 8 + 48), 128, palette, { fill: '#ffffff', stroke: '#ffffff33', text: '#ffffffcc' })}
      ${textBlock(titleLines, { x: 96, y: 278, size: titleLines.length > 3 ? 58 : 66, lineHeight: titleLines.length > 3 ? 64 : 72, weight: 850, fill: '#ffffff', family: 'Poppins, Inter, Arial, sans-serif' })}
      ${textBlock(hookLines, { x: 100, y: 620, size: 25, lineHeight: 38, weight: 500, fill: '#d7e7df', opacity: 0.78 })}
      <g transform="translate(96 738)">
        ${tags.map((tag, index) => chip(`#${tag}`, index * 154, 0, palette, { fill: index === 1 ? palette.accent2 : palette.accent, width: 138 })).join('')}
      </g>
      ${railDiagram(palette, hash)}
      <circle cx="${1376 - (hash % 80)}" cy="${126 + (hash % 110)}" r="120" fill="${palette.accent2}" opacity="0.10"/>
      <circle cx="${1220 + (hash % 90)}" cy="${702 - (hash % 120)}" r="180" fill="${palette.warm}" opacity="0.09"/>
    </svg>
  `
}

function fallbackBaseSvg(width, height, palette, hash) {
  const left = 10 + (hash % 26)
  const right = 78 - (hash % 18)
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${patternDefs(palette)}
      <rect width="${width}" height="${height}" fill="url(#darkSweep)"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <rect width="${width}" height="${height}" fill="url(#auraA)"/>
      <rect width="${width}" height="${height}" fill="url(#auraB)"/>
      <path d="M${left} ${height * 0.78} C${width * 0.28} ${height * 0.45}, ${width * 0.42} ${height * 0.62}, ${width * 0.64} ${height * 0.30} S${width * 0.88} ${height * 0.22}, ${width * 0.98} ${height * 0.08}" fill="none" stroke="${palette.accent}" stroke-width="3" stroke-opacity="0.32"/>
      <path d="M0 ${height * 0.24} C${width * 0.25} ${height * 0.16}, ${width * 0.52} ${height * 0.44}, ${width} ${height * 0.18}" fill="none" stroke="${palette.accent2}" stroke-width="2" stroke-opacity="0.22"/>
      <circle cx="${width * right / 100}" cy="${height * 0.28}" r="${Math.round(width * 0.15)}" fill="${palette.accent2}" opacity="0.08"/>
      <circle cx="${width * 0.22}" cy="${height * 0.72}" r="${Math.round(width * 0.12)}" fill="${palette.warm}" opacity="0.08"/>
    </svg>
  `
}

async function makeBase({ source, width, height, palette, slug }) {
  if (source && isRasterImage(source) && fileExists(source)) {
    try {
      return await sharp(source)
        .rotate()
        .resize(width, height, { fit: 'cover', position: 'attention' })
        .modulate({ brightness: 0.68, saturation: 0.78 })
        .blur(0.25)
        .png()
        .toBuffer()
    } catch {
      // Fall through to deterministic generated base.
    }
  }
  return sharp(Buffer.from(fallbackBaseSvg(width, height, palette, hashText(slug))))
    .png()
    .toBuffer()
}

async function renderComposite({ outPath, source, width, height, palette, overlaySvg, format = 'png', slug }) {
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  const base = await makeBase({ source, width, height, palette, slug })
  const image = sharp(base).composite([{ input: Buffer.from(overlaySvg), left: 0, top: 0 }])
  if (format === 'webp') {
    await image.webp({ quality: 92, effort: 5 }).toFile(outPath)
  } else {
    await image.png({ compressionLevel: 9 }).toFile(outPath)
  }
}

function infographicOverlay(post, palette) {
  const title = editorialTitle(post)
  const titleLines = wrapText(title, 32, 3)
  const hookLines = wrapText(humanHook(post), 68, 3)
  const tags = (post.tags || toKebabWords(title, 4)).slice(0, 4)
  const pillars = [
    tags[0] || 'signal',
    tags[1] || 'system',
    tags[2] || 'governance',
    tags[3] || 'distribution',
  ]

  return `
    <svg width="${INFO_SIZE.width}" height="${INFO_SIZE.height}" viewBox="0 0 ${INFO_SIZE.width} ${INFO_SIZE.height}" xmlns="http://www.w3.org/2000/svg">
      ${patternDefs(palette)}
      <rect width="1600" height="1200" fill="url(#darkSweep)" opacity="0.92"/>
      <rect width="1600" height="1200" fill="url(#grid)"/>
      <rect width="1600" height="1200" fill="url(#auraA)"/>
      <rect x="70" y="70" width="1460" height="1060" rx="42" fill="#080b0f" opacity="0.78" stroke="#ffffff" stroke-opacity="0.10"/>
      <text x="112" y="128" fill="${palette.accent}" font-size="14" font-weight="900" font-family="Inter, Arial, sans-serif" letter-spacing="0">FRANKX OPERATING MAP</text>
      ${textBlock(titleLines, { x: 112, y: 218, size: 56, lineHeight: 64, weight: 850, fill: '#ffffff', family: 'Poppins, Inter, Arial, sans-serif' })}
      ${textBlock(hookLines, { x: 112, y: 430, size: 23, lineHeight: 35, weight: 500, fill: '#d7e7df', opacity: 0.78 })}
      <g transform="translate(112 570)">
        ${pillars.map((pillar, i) => `
          <g transform="translate(${i * 350} 0)">
            <rect width="304" height="360" rx="28" fill="#10161d" stroke="${i % 2 ? palette.accent2 : palette.accent}77"/>
            <text x="30" y="56" fill="${i % 2 ? palette.accent2 : palette.accent}" font-size="13" font-weight="900" font-family="Inter, Arial, sans-serif" letter-spacing="0">LAYER ${String(i + 1).padStart(2, '0')}</text>
            ${textBlock(wrapText(pillar.replace(/-/g, ' '), 15, 2), { x: 30, y: 112, size: 28, lineHeight: 34, weight: 850, fill: '#ffffff', family: 'Poppins, Inter, Arial, sans-serif' })}
            <line x1="30" y1="178" x2="274" y2="178" stroke="#ffffff" stroke-opacity="0.10"/>
            <circle cx="62" cy="224" r="36" fill="${i % 2 ? palette.accent2 : palette.accent}" opacity="0.18"/>
            <path d="M48 224h28M62 210v28" stroke="${i % 2 ? palette.accent2 : palette.accent}" stroke-width="5" stroke-linecap="round"/>
            <text x="30" y="304" fill="#ffffff" opacity="0.62" font-size="18" font-weight="600" font-family="Inter, Arial, sans-serif">define -> test -> ship</text>
          </g>
        `).join('')}
      </g>
      <text x="112" y="1042" fill="#ffffff" opacity="0.44" font-size="16" font-weight="650" font-family="Inter, Arial, sans-serif">Use this as the working map before you choose tools, vendors, prompts, or automation.</text>
      <text x="1488" y="1042" text-anchor="end" fill="${palette.accent}" font-size="16" font-weight="850" font-family="Inter, Arial, sans-serif">frankx.ai/blog/${escapeXml(post.slug)}</text>
    </svg>
  `
}

function socialOverlay(post, palette, size, variant, slideIndex = 0) {
  const { width, height } = size
  const title = editorialTitle(post)
  const category = post.category || 'Field note'
  const tags = (post.tags || toKebabWords(title, 4)).slice(0, 4)
  const slideLabels = [
    ['Start here', title],
    ['The problem', humanHook(post)],
    ['The operating map', `${tags.slice(0, 3).join(' -> ') || 'signal -> system -> ship'}`],
    ['Builder move', post.readingGoal || 'Turn the article into one concrete system upgrade this week.'],
  ]
  const [label, body] = slideLabels[slideIndex] || slideLabels[0]
  const headlineLines = wrapText(slideIndex === 0 ? title : body, width > 1100 ? 27 : 22, slideIndex === 0 ? 4 : 5)
  const top = height > 1100 ? 132 : 92
  const x = width > 1100 ? 76 : 70
  const titleSize = height > 1100 ? 70 : width > 1100 ? 56 : 60
  const lineHeight = Math.round(titleSize * 1.08)

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${patternDefs(palette)}
      <rect width="${width}" height="${height}" fill="url(#darkSweep)" opacity="0.90"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <rect width="${width}" height="${height}" fill="url(#auraA)"/>
      <rect width="${width}" height="${height}" fill="url(#auraB)"/>
      <rect x="${Math.round(width * 0.055)}" y="${Math.round(height * 0.052)}" width="${Math.round(width * 0.89)}" height="${Math.round(height * 0.895)}" rx="42" fill="#080b0f" opacity="0.72" stroke="#ffffff" stroke-opacity="0.10"/>
      <text x="${x}" y="${top}" fill="${palette.accent}" font-size="${height > 1100 ? 18 : 14}" font-weight="900" font-family="Inter, Arial, sans-serif" letter-spacing="0">FRANKX FIELD NOTE</text>
      ${chip(category, x, top + 34, palette, { width: Math.min(width - x * 2, 360) })}
      <text x="${width - x}" y="${top + 61}" text-anchor="end" fill="#ffffff" opacity="0.42" font-size="${height > 1100 ? 17 : 13}" font-weight="800" font-family="Inter, Arial, sans-serif">0${slideIndex + 1}/04</text>
      <text x="${x}" y="${top + 152}" fill="#ffffff" opacity="0.58" font-size="${height > 1100 ? 24 : 19}" font-weight="800" font-family="Inter, Arial, sans-serif">${escapeXml(label)}</text>
      ${textBlock(headlineLines, { x, y: top + 238, size: titleSize, lineHeight, weight: 850, fill: '#ffffff', family: 'Poppins, Inter, Arial, sans-serif' })}
      <g transform="translate(${x} ${height - 178})">
        ${tags.slice(0, 3).map((tag, index) => chip(`#${tag}`, index * Math.min(178, (width - x * 2) / 3), 0, palette, { fill: index === 1 ? palette.accent2 : palette.accent, width: Math.min(160, (width - x * 2) / 3 - 12) })).join('')}
      </g>
      <line x1="${x}" y1="${height - 88}" x2="${width - x}" y2="${height - 88}" stroke="#ffffff" stroke-opacity="0.10"/>
      <text x="${x}" y="${height - 52}" fill="#ffffff" opacity="0.52" font-size="${height > 1100 ? 18 : 14}" font-weight="700" font-family="Inter, Arial, sans-serif">AI Architect. Creator. Builder.</text>
      <text x="${width - x}" y="${height - 52}" text-anchor="end" fill="${palette.accent}" font-size="${height > 1100 ? 18 : 14}" font-weight="850" font-family="Inter, Arial, sans-serif">frankx.ai</text>
    </svg>
  `
}

function selectPalette(post) {
  const key = `${post.category || ''} ${post.title || ''} ${(post.tags || []).join(' ')}`
  if (/music|suno|creative|creator|video|image|photo|design/i.test(key)) return palettes[2]
  if (/govern|coe|enterprise|risk|security|compliance/i.test(key)) return palettes[3]
  if (/model|claude|gpt|gemini|deepseek|llama|qwen|grok|local|llm/i.test(key)) return palettes[1]
  return palettes[hashText(post.slug) % palettes.length]
}

async function readPosts() {
  const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith('.mdx')).sort()
  const posts = []
  for (const file of files) {
    const fullPath = path.join(blogDir, file)
    const raw = await fs.readFile(fullPath, 'utf8')
    const parsed = matter(raw)
    const slug = file.replace(/\.mdx$/, '')
    posts.push({ slug, file, fullPath, raw, data: parsed.data, content: parsed.content, ...parsed.data })
  }
  return posts
}

function imageCounts(posts) {
  const counts = new Map()
  for (const post of posts) {
    const image = String(post.image || '')
    if (!image) continue
    counts.set(image, (counts.get(image) || 0) + 1)
  }
  return counts
}

function scorePost(post, counts) {
  const image = String(post.image || '')
  let score = 0
  if (/visual-system/.test(image)) score += 160
  if (/\.svg(?:$|\?)/.test(image)) score += 140
  if ((counts.get(image) || 0) > 1) score += 80
  if (post.featured) score += 46
  if (!post.visualSystem?.social && !post.socialImages) score += 18
  if (/best-ai|ultimate|workflow|guide|playbook|roadmap|architecture|model|agent|creator/i.test(`${post.slug} ${post.title}`)) score += 18
  const date = new Date(post.date || 0).getTime()
  if (Number.isFinite(date)) score += Math.min(28, Math.max(0, (date - new Date('2026-01-01').getTime()) / 86400000 / 8))
  return score
}

function collectRasterPool(posts) {
  const candidates = []
  const add = (url) => {
    const filePath = publicUrlToPath(url)
    if (filePath && isRasterImage(filePath) && fileExists(filePath)) candidates.push({ url, filePath })
  }

  for (const post of posts) {
    add(post.image)
    add(post.visualSystem?.hero)
    add(post.visualSystem?.fallbackHero)
  }

  const generatedDir = path.join(publicDir, 'images', 'blog', 'generated')
  if (fileExists(generatedDir)) {
    for (const file of fsSync.readdirSync(generatedDir)) {
      const filePath = path.join(generatedDir, file)
      if (isRasterImage(filePath)) {
        candidates.push({ url: `/images/blog/generated/${file}`, filePath })
      }
    }
  }

  return candidates
}

function findSource(post, rasterPool) {
  const direct = [
    post.image,
    post.visualSystem?.hero,
    post.visualSystem?.fallbackHero,
    `/images/blog/generated/${post.slug}-premium-hero.png`,
    `/images/blog/${post.slug}-hero.png`,
    `/images/blog/${post.slug}.png`,
    `/images/blog/${post.slug}.jpg`,
    `/images/blog/${post.slug}.webp`,
  ]

  for (const url of direct) {
    const filePath = publicUrlToPath(url)
    if (filePath && isRasterImage(filePath) && fileExists(filePath)) return { url, filePath }
  }

  const words = new Set(toKebabWords(`${post.slug} ${post.title} ${(post.tags || []).join(' ')}`, 12))
  let best = null
  let bestScore = 0
  for (const candidate of rasterPool) {
    const name = path.basename(candidate.filePath).toLowerCase()
    const score = [...words].filter((word) => word.length > 3 && name.includes(word)).length
    if (score > bestScore) {
      best = candidate
      bestScore = score
    }
  }

  if (best) return best
  return rasterPool[hashText(post.slug) % Math.max(1, rasterPool.length)] || null
}

function upsertRasterBlock(raw, block, previousImage) {
  const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!frontmatterMatch) return raw
  const prefix = frontmatterMatch[0]
  let body = raw.slice(prefix.length)
  let yaml = frontmatterMatch[1]

  const imageLine = `image: "${block.hero}"`
  if (/^image:\s*.*$/m.test(yaml)) {
    yaml = yaml.replace(/^image:\s*.*$/m, imageLine)
  } else {
    yaml = `${yaml.trimEnd()}\n${imageLine}`
  }

  const sourceHero = block.sourceHero ? `  sourceHero: "${block.sourceHero}"\n` : ''
  const infographic = block.infographic ? `  infographic: "${block.infographic}"\n` : ''
  const socialLines = block.social
    ? [
        '  social:',
        `    wide: "${block.social.wide}"`,
        `    square: "${block.social.square}"`,
        `    portrait: "${block.social.portrait}"`,
        '    carousel:',
        ...block.social.carousel.map((item) => `      - "${item}"`),
      ].join('\n') + '\n'
    : ''

  const rasterBlock = [
    'rasterVisualSystem:',
    `  version: "${VERSION}"`,
    `  hero: "${block.hero}"`,
    sourceHero.trimEnd(),
    infographic.trimEnd(),
    `  generatedMode: "deterministic-editorial-raster"`,
    `  reviewStatus: "accepted"`,
    `  deploymentStatus: "ready"`,
    socialLines.trimEnd(),
  ].filter(Boolean).join('\n')

  if (/^rasterVisualSystem:\r?\n(?:^[ \t].*\r?\n?)*/m.test(yaml)) {
    yaml = yaml.replace(/^rasterVisualSystem:\r?\n(?:^[ \t].*\r?\n?)*/m, `${rasterBlock}\n`)
  } else {
    yaml = `${yaml.trimEnd()}\n${rasterBlock}`
  }

  if (previousImage && typeof previousImage === 'string' && previousImage !== block.hero) {
    body = body.split(previousImage).join(block.hero)
  }

  return `---\n${yaml.trimEnd()}\n---\n${body}`
}

async function renderHero(post, source, palette) {
  const outRel = `/images/blog/editorial/headers/${post.slug}-hero.webp`
  const outPath = path.join(publicDir, outRel.slice(1))
  await renderComposite({
    outPath,
    source: source?.filePath,
    width: HERO_SIZE.width,
    height: HERO_SIZE.height,
    palette,
    overlaySvg: heroOverlay(post, palette),
    format: 'webp',
    slug: post.slug,
  })
  return outRel
}

async function renderInfographic(post, palette) {
  const outRel = `/images/blog/editorial/infographics/${post.slug}-operating-map.png`
  const outPath = path.join(publicDir, outRel.slice(1))
  await renderComposite({
    outPath,
    source: null,
    width: INFO_SIZE.width,
    height: INFO_SIZE.height,
    palette,
    overlaySvg: infographicOverlay(post, palette),
    format: 'png',
    slug: `${post.slug}-info`,
  })
  return outRel
}

async function renderSocial(post, source, palette) {
  const dir = path.join(socialRoot, post.slug)
  await fs.mkdir(dir, { recursive: true })
  const outputs = {
    wide: `/images/social/blog/${post.slug}/wide.png`,
    square: `/images/social/blog/${post.slug}/square.png`,
    portrait: `/images/social/blog/${post.slug}/portrait.png`,
    carousel: [],
  }

  const renders = [
    { rel: outputs.wide, size: WIDE_SIZE, variant: 'wide', slide: 0 },
    { rel: outputs.square, size: SQUARE_SIZE, variant: 'square', slide: 0 },
    { rel: outputs.portrait, size: PORTRAIT_SIZE, variant: 'portrait', slide: 0 },
  ]

  for (let i = 0; i < 4; i += 1) {
    const rel = `/images/social/blog/${post.slug}/carousel-${String(i + 1).padStart(2, '0')}.png`
    outputs.carousel.push(rel)
    renders.push({ rel, size: PORTRAIT_SIZE, variant: 'carousel', slide: i })
  }

  for (const item of renders) {
    await renderComposite({
      outPath: path.join(publicDir, item.rel.slice(1)),
      source: source?.filePath,
      width: item.size.width,
      height: item.size.height,
      palette,
      overlaySvg: socialOverlay(post, palette, item.size, item.variant, item.slide),
      format: 'png',
      slug: `${post.slug}-${item.variant}-${item.slide}`,
    })
  }

  return outputs
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const posts = await readPosts()
  const counts = imageCounts(posts)
  const rasterPool = collectRasterPool(posts)
  const previousManifest = opts.fromManifest && fileExists(manifestPath)
    ? JSON.parse(await fs.readFile(manifestPath, 'utf8'))
    : null
  const previousBySlug = new Map((previousManifest?.posts || []).map((post) => [post.slug, post]))

  let targets
  let infographicSlugs
  let socialSlugs

  if (previousManifest) {
    const bySlug = new Map(posts.map((post) => [post.slug, post]))
    targets = previousManifest.posts.map((post) => bySlug.get(post.slug)).filter(Boolean)
    infographicSlugs = new Set(previousManifest.posts.filter((post) => post.infographic).map((post) => post.slug))
    socialSlugs = new Set(previousManifest.posts.filter((post) => post.social).map((post) => post.slug))
  } else {
    const ranked = posts
      .map((post) => ({ post, score: scorePost(post, counts) }))
      .sort((a, b) => b.score - a.score || String(b.post.date || '').localeCompare(String(a.post.date || '')))

    targets = ranked.slice(0, opts.limit).map((item) => item.post)
    infographicSlugs = new Set(targets.slice(0, opts.infographics).map((post) => post.slug))
    const socialCandidates = [
      ...targets.filter((post) => post.featured),
      ...targets.filter((post) => !post.featured && /\.svg$/i.test(String(post.image || ''))),
    ]
    socialSlugs = new Set(socialCandidates.slice(0, opts.social).map((post) => post.slug))
  }

  const records = []

  if (opts.dryRun) {
    console.log(JSON.stringify(targets.map((post) => ({
      slug: post.slug,
      title: post.title,
      image: post.image,
      featured: post.featured,
      score: scorePost(post, counts),
    })), null, 2))
    return
  }

  for (const [index, post] of targets.entries()) {
    const previous = previousBySlug.get(post.slug)
    const palette = selectPalette(post)
    const previousSourcePath = previous?.sourceHero ? publicUrlToPath(previous.sourceHero) : null
    const source = previousSourcePath && isRasterImage(previousSourcePath) && fileExists(previousSourcePath)
      ? { url: previous.sourceHero, filePath: previousSourcePath }
      : findSource(post, rasterPool)
    const hero = await renderHero(post, source, palette)
    const block = {
      hero,
      sourceHero: source?.url,
      infographic: null,
      social: null,
    }

    if (infographicSlugs.has(post.slug)) {
      block.infographic = await renderInfographic(post, palette)
    }

    if (socialSlugs.has(post.slug)) {
      block.social = await renderSocial(post, source, palette)
    }

    if (opts.writeFrontmatter) {
      const nextRaw = upsertRasterBlock(post.raw, block, previous?.previousImage || post.image)
      await fs.writeFile(post.fullPath, nextRaw, 'utf8')
    }

    records.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      hero,
      infographic: block.infographic,
      social: block.social,
      sourceHero: source?.url || null,
      palette: palette.name,
      previousImage: previous?.previousImage || post.image || null,
      score: scorePost(post, counts),
      generationMode: 'deterministic-editorial-raster',
      reviewStatus: 'accepted',
      deploymentStatus: 'ready',
    })

    console.log(`[${String(index + 1).padStart(2, '0')}/${targets.length}] ${post.slug} -> ${hero}`)
  }

  const manifest = {
    meta: {
      name: 'FrankX Blog Raster Visual System',
      version: VERSION,
      generatedAt: new Date().toISOString(),
      counts: {
        headers: records.length,
        infographics: records.filter((item) => item.infographic).length,
        socialPacks: records.filter((item) => item.social).length,
        carouselSlides: records.reduce((count, item) => count + (item.social?.carousel?.length || 0), 0),
      },
      policy: 'Raster replacements for SVG-heavy blog headers. Existing local images are used as source material when available; text is rendered deterministically for legibility.',
    },
    posts: records,
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`Manifest -> ${path.relative(root, manifestPath)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

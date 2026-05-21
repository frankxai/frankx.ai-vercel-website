#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { optimize } from 'svgo'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const onlySlugsArgIndex = args.indexOf('--slugs')
const onlySlugs = onlySlugsArgIndex >= 0 && args[onlySlugsArgIndex + 1]
  ? new Set(args[onlySlugsArgIndex + 1].split(',').map((entry) => entry.trim()).filter(Boolean))
  : null

const root = process.cwd()
const blogDir = path.join(root, 'content/blog')
const publicDiagramsRoot = path.join(root, 'public/images/diagrams/blog')
const boxCharRegex = /[\u2500-\u257F]/
const codeFenceRegex = /```([^\n`]*)\n([\s\S]*?)```/g

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function escapeXml(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function escapeJsxAttr(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function cleanTitleLine(input) {
  const noBoxes = input.replace(/[\u2500-\u257F]/g, ' ')
  const noArrows = noBoxes.replace(/[▶►◀◄→←↑↓]+/g, ' ')
  const noBorders = noArrows.replace(/[|_=~\-]{2,}/g, ' ')
  const normalized = noBorders.replace(/\s+/g, ' ').trim()
  return normalized
}

function inferBlockTitle(lines) {
  for (const line of lines) {
    const candidate = cleanTitleLine(line)
    if (!candidate) {
      continue
    }
    const alphaNumCount = (candidate.match(/[A-Za-z0-9]/g) || []).length
    if (alphaNumCount < 3) {
      continue
    }
    return candidate.slice(0, 96)
  }

  return null
}

function extractPreviousHeading(content, startIndex) {
  const before = content.slice(0, startIndex)
  const headingRegex = /^#{1,4}\s+(.+)$/gm

  let match
  let heading = null
  while ((match = headingRegex.exec(before)) !== null) {
    heading = match[1]
  }

  if (!heading) {
    return null
  }

  return heading
    .replace(/[`*_[\]#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function chooseFontSize(maxLineLength, lineCount) {
  let fontSize = 14
  if (maxLineLength > 140) {
    fontSize = 11
  } else if (maxLineLength > 120) {
    fontSize = 12
  } else if (maxLineLength > 100) {
    fontSize = 13
  }

  if (lineCount > 70) {
    fontSize = Math.max(10, fontSize - 1)
  }

  return fontSize
}

function buildSvg({ title, lines }) {
  const normalizedLines = lines.map((line) => line.replace(/\t/g, '  '))
  const maxLineLength = Math.max(1, ...normalizedLines.map((line) => line.length))
  const lineCount = Math.max(1, normalizedLines.length)

  const fontSize = chooseFontSize(maxLineLength, lineCount)
  const charWidth = fontSize * 0.62
  const lineHeight = Math.round(fontSize * 1.5)

  const paddingX = 32
  const paddingTop = 84
  const paddingBottom = 34

  const contentWidth = Math.ceil(maxLineLength * charWidth + (paddingX * 2))
  const width = Math.max(680, contentWidth)
  const height = Math.max(220, Math.ceil((lineCount * lineHeight) + paddingTop + paddingBottom))

  const topRuleY = 56
  const textLines = normalizedLines.map((line, index) => {
    const y = paddingTop + (index * lineHeight)
    const value = line.length === 0 ? ' ' : escapeXml(line)
    return `<text x="${paddingX}" y="${y}" xml:space="preserve">${value}</text>`
  }).join('')

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050a14" />
      <stop offset="100%" stop-color="#0b1220" />
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0" />
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0" />
    </linearGradient>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="#334155" stroke-opacity="0.22" stroke-width="1"/>
    </pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#020617" flood-opacity="0.5" />
    </filter>
  </defs>

  <rect x="6" y="6" width="${width - 12}" height="${height - 12}" rx="20" fill="url(#bg)" stroke="#1f2937" stroke-width="2" filter="url(#shadow)" />
  <rect x="6" y="6" width="${width - 12}" height="${height - 12}" rx="20" fill="url(#grid)" />
  <rect x="34" y="${topRuleY}" width="${width - 68}" height="2" fill="url(#rule)" />

  <text x="34" y="40" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="18" font-weight="700" fill="#e2e8f0">${escapeXml(title)}</text>

  <g font-family="JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace" font-size="${fontSize}" fill="#cbd5e1">
    ${textLines}
  </g>
</svg>
`.trim()

  const optimized = optimize(svg, {
    multipass: true,
    floatPrecision: 2,
    plugins: [
      { name: 'preset-default' },
      { name: 'removeDimensions' },
      { name: 'sortAttrs' },
    ],
  })

  return 'data' in optimized ? optimized.data : svg
}

function removeStaleLegacySvgs(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return
  }

  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    if (/^legacy-diagram-\d+\.svg$/i.test(file)) {
      fs.unlinkSync(path.join(dirPath, file))
    }
  }
}

function migrateFile(filePath) {
  const slug = path.basename(filePath, '.mdx')
  if (onlySlugs && !onlySlugs.has(slug)) {
    return { migratedBlocks: 0, changed: false, filePath }
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const matches = []
  let match

  while ((match = codeFenceRegex.exec(content)) !== null) {
    const body = match[2] || ''
    if (!boxCharRegex.test(body)) {
      continue
    }

    matches.push({
      start: match.index,
      end: codeFenceRegex.lastIndex,
      body,
    })
  }

  if (matches.length === 0) {
    return { migratedBlocks: 0, changed: false, filePath }
  }

  const diagramDir = path.join(publicDiagramsRoot, slug)
  if (!dryRun) {
    ensureDir(diagramDir)
    removeStaleLegacySvgs(diagramDir)
  }

  let cursor = 0
  let nextContent = ''
  let blockNumber = 0

  for (const block of matches) {
    blockNumber += 1
    const lines = block.body
      .replace(/\r\n/g, '\n')
      .replace(/\n$/, '')
      .split('\n')

    const heading = extractPreviousHeading(content, block.start)
    const inferredTitle = inferBlockTitle(lines)
    const title = heading || inferredTitle || `Diagram ${blockNumber}`
    const alt = heading
      ? `${heading} diagram ${blockNumber}`
      : `${slug.replace(/-/g, ' ')} diagram ${blockNumber}`

    const fileName = `legacy-diagram-${String(blockNumber).padStart(2, '0')}.svg`
    const relSrc = `/images/diagrams/blog/${slug}/${fileName}`
    const absSvgPath = path.join(diagramDir, fileName)

    if (!dryRun) {
      const svg = buildSvg({ title, lines })
      fs.writeFileSync(absSvgPath, svg, 'utf8')
    }

    const diagramComponent = [
      '<Diagram',
      `  src="${relSrc}"`,
      `  alt="${escapeJsxAttr(alt)}"`,
      `  caption="${escapeJsxAttr(title)}"`,
      '/>',
      '',
    ].join('\n')

    nextContent += content.slice(cursor, block.start)
    nextContent += diagramComponent
    cursor = block.end
  }

  nextContent += content.slice(cursor)

  if (!dryRun) {
    fs.writeFileSync(filePath, nextContent, 'utf8')
  }

  return {
    migratedBlocks: matches.length,
    changed: true,
    filePath,
  }
}

function run() {
  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found: ${blogDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx'))
    .sort()
    .map((file) => path.join(blogDir, file))

  let changedFiles = 0
  let migratedBlocks = 0

  for (const filePath of files) {
    const result = migrateFile(filePath)
    if (result.changed) {
      changedFiles += 1
      migratedBlocks += result.migratedBlocks
      console.log(`Migrated ${result.migratedBlocks} legacy block(s): ${path.relative(root, filePath)}`)
    }
  }

  if (dryRun) {
    console.log(`[dry-run] Would migrate ${migratedBlocks} block(s) across ${changedFiles} file(s).`)
  } else {
    console.log(`Migrated ${migratedBlocks} block(s) across ${changedFiles} file(s).`)
  }
}

run()

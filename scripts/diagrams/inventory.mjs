#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const shouldWrite = args.includes('--write')
const outputArgIndex = args.indexOf('--output')
const outputPath = outputArgIndex >= 0 && args[outputArgIndex + 1]
  ? path.resolve(process.cwd(), args[outputArgIndex + 1])
  : path.join(process.cwd(), 'reports', 'diagram-inventory.json')

const blogDir = path.join(process.cwd(), 'content/blog')
const boxCharRegex = /[\u2500-\u257F]/
const codeFenceRegex = /```([^\n`]*)\n([\s\S]*?)```/g
const mermaidFenceLangRegex = /^\s*mermaid\s*$/i

function countLines(text, endIndex) {
  return text.slice(0, endIndex).split(/\r?\n/).length
}

function collectFileInventory(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(process.cwd(), filePath)
  const legacyBlocks = []
  const mermaidBlocks = []

  let match
  while ((match = codeFenceRegex.exec(content)) !== null) {
    const lang = (match[1] || '').trim()
    const body = match[2] || ''
    const line = countLines(content, match.index)

    if (mermaidFenceLangRegex.test(lang)) {
      mermaidBlocks.push({ line, lang: lang || 'mermaid' })
      continue
    }

    if (!boxCharRegex.test(body)) {
      continue
    }

    const lines = body.split(/\r?\n/)
    const boxLineCount = lines.filter((entry) => boxCharRegex.test(entry)).length
    const preview = lines
      .filter((entry) => entry.trim().length > 0)
      .slice(0, 3)
      .map((entry) => entry.trim())

    legacyBlocks.push({
      line,
      lang: lang || 'plain',
      boxLineCount,
      preview,
    })
  }

  return {
    path: relativePath,
    legacyBlockCount: legacyBlocks.length,
    mermaidBlockCount: mermaidBlocks.length,
    legacyLineCount: legacyBlocks.reduce((sum, entry) => sum + entry.boxLineCount, 0),
    legacyBlocks,
    mermaidBlocks,
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

  const scanned = files.map(collectFileInventory)
  const filesWithLegacy = scanned.filter((entry) => entry.legacyBlockCount > 0)
  const filesWithMermaid = scanned.filter((entry) => entry.mermaidBlockCount > 0)

  const summary = {
    scannedFiles: scanned.length,
    filesWithLegacyDiagrams: filesWithLegacy.length,
    filesWithMermaidFences: filesWithMermaid.length,
    totalLegacyBlocks: filesWithLegacy.reduce((sum, entry) => sum + entry.legacyBlockCount, 0),
    totalLegacyLines: filesWithLegacy.reduce((sum, entry) => sum + entry.legacyLineCount, 0),
  }

  const recommendedPilot = [...filesWithLegacy]
    .sort((a, b) => (
      a.legacyBlockCount - b.legacyBlockCount ||
      a.legacyLineCount - b.legacyLineCount ||
      a.path.localeCompare(b.path)
    ))
    .slice(0, 5)
    .map((entry) => ({
      path: entry.path,
      legacyBlockCount: entry.legacyBlockCount,
      legacyLineCount: entry.legacyLineCount,
    }))

  const report = {
    generatedAt: new Date().toISOString(),
    summary,
    recommendedPilot,
    files: scanned,
  }

  console.log(JSON.stringify(report, null, 2))

  if (shouldWrite) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n', 'utf8')
    console.error(`Wrote diagram inventory: ${path.relative(process.cwd(), outputPath)}`)
  }
}

run()

#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const updateBaseline = args.includes('--update-baseline')
const strict = args.includes('--strict')

const blogDir = path.join(process.cwd(), 'content/blog')
const publicDir = path.join(process.cwd(), 'public')
const baselinePath = path.join(process.cwd(), 'scripts/diagrams/guard-baseline.json')
const boxCharRegex = /[\u2500-\u257F]/
const codeFenceRegex = /```([^\n`]*)\n([\s\S]*?)```/g
const diagramComponentRegex = /<Diagram\s+[^>]*src=["']([^"']+)["'][^>]*>/g

function scanLegacyCounts() {
  const files = fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx'))
    .sort()

  const counts = {}
  for (const file of files) {
    const full = path.join(blogDir, file)
    const content = fs.readFileSync(full, 'utf8')
    let match
    let blocks = 0
    while ((match = codeFenceRegex.exec(content)) !== null) {
      if (boxCharRegex.test(match[2] || '')) {
        blocks += 1
      }
    }
    if (blocks > 0) {
      counts[path.relative(process.cwd(), full)] = blocks
    }

    let compMatch
    while ((compMatch = diagramComponentRegex.exec(content)) !== null) {
      const src = compMatch[1]
      const normalized = src.startsWith('/') ? src.slice(1) : src
      const targetPath = path.join(publicDir, normalized)
      if (!fs.existsSync(targetPath)) {
        throw new Error(`Missing diagram asset for component in ${file}: ${src}`)
      }
    }
  }

  return counts
}

function writeBaseline(currentCounts) {
  const data = {
    generatedAt: new Date().toISOString(),
    files: currentCounts,
  }
  fs.writeFileSync(baselinePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`Updated baseline: ${path.relative(process.cwd(), baselinePath)}`)
}

function loadBaseline() {
  if (!fs.existsSync(baselinePath)) {
    return { generatedAt: null, files: {} }
  }
  return JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
}

function run() {
  const currentCounts = scanLegacyCounts()

  if (updateBaseline) {
    writeBaseline(currentCounts)
    return
  }

  const baseline = loadBaseline()
  const errors = []

  if (strict) {
    if (Object.keys(currentCounts).length > 0) {
      errors.push('Strict mode enabled: legacy box-diagram blocks still exist.')
    }
  } else {
    for (const [file, count] of Object.entries(currentCounts)) {
      const baselineCount = baseline.files[file] ?? 0
      if (count > baselineCount) {
        errors.push(`${file}: legacy blocks increased ${baselineCount} -> ${count}`)
      }
      if (!(file in baseline.files)) {
        errors.push(`${file}: new legacy block file detected (count: ${count})`)
      }
    }
  }

  if (errors.length > 0) {
    console.error('Diagram guard failed:')
    for (const err of errors) {
      console.error(`- ${err}`)
    }
    process.exit(1)
  }

  const remaining = Object.values(currentCounts).reduce((sum, value) => sum + value, 0)
  console.log(`Diagram guard passed. Remaining legacy blocks: ${remaining}`)
}

run()

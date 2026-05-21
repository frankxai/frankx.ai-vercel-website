#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { glob } from 'glob'
import { optimize } from 'svgo'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const onlySlugsArgIndex = args.indexOf('--slugs')
const onlySlugs = onlySlugsArgIndex >= 0 && args[onlySlugsArgIndex + 1]
  ? new Set(args[onlySlugsArgIndex + 1].split(',').map((entry) => entry.trim()).filter(Boolean))
  : null

const sourceRoot = path.join(process.cwd(), 'content/blog/diagrams')
const outputRoot = path.join(process.cwd(), 'public/images/diagrams/blog')
const configFile = path.join(process.cwd(), 'scripts/diagrams/mermaid.config.json')
const puppeteerConfigFile = path.join(process.cwd(), 'scripts/diagrams/puppeteer.config.json')
const mmdcBin = path.join(
  process.cwd(),
  'node_modules/.bin',
  process.platform === 'win32' ? 'mmdc.cmd' : 'mmdc'
)
const d2LocalBin = path.join(
  process.cwd(),
  'node_modules/.bin',
  process.platform === 'win32' ? 'd2.cmd' : 'd2'
)
const d2Bin = fs.existsSync(d2LocalBin) ? d2LocalBin : 'd2'

if (!fs.existsSync(sourceRoot)) {
  console.error(`Source directory not found: ${sourceRoot}`)
  process.exit(1)
}

function toOutputPath(sourcePath) {
  const rel = path.relative(sourceRoot, sourcePath)
  const noExt = rel.replace(/\.(mmd|d2)$/i, '')
  return path.join(outputRoot, `${noExt}.svg`)
}

function optimizeSvg(svgPath) {
  const raw = fs.readFileSync(svgPath, 'utf8')
  const result = optimize(raw, {
    path: svgPath,
    multipass: true,
    floatPrecision: 2,
    plugins: [
      { name: 'preset-default' },
      { name: 'removeDimensions' },
      { name: 'sortAttrs' },
    ],
  })

  if ('data' in result) {
    fs.writeFileSync(svgPath, result.data, 'utf8')
  }
}

function renderMermaid(inputPath, outputPath) {
  if (!fs.existsSync(mmdcBin)) {
    throw new Error('Mermaid CLI is not installed. Run `npm install` first.')
  }

  const cmdArgs = [
    '-i', inputPath,
    '-o', outputPath,
    '-b', 'transparent',
    '--configFile', configFile,
    '--puppeteerConfigFile', puppeteerConfigFile,
  ]

  const result = spawnSync(mmdcBin, cmdArgs, {
    encoding: 'utf8',
    stdio: 'pipe',
  })

  if (result.status !== 0) {
    const stderr = result.stderr?.trim() || '(no stderr)'
    throw new Error(`mmdc failed for ${inputPath}\n${stderr}`)
  }
}

function renderD2(inputPath, outputPath) {
  const cmdArgs = [
    '--theme', '201',
    '--layout', 'elk',
    '--pad', '48',
    '--scale', '1',
    '--bundle',
    '--center',
    '--target=',
    inputPath,
    outputPath,
  ]

  const result = spawnSync(d2Bin, cmdArgs, {
    encoding: 'utf8',
    stdio: 'pipe',
  })

  if (result.error && result.error.code === 'ENOENT') {
    throw new Error(
      'D2 CLI is not installed. Install it globally or add @terrastruct/d2 as a dev dependency.'
    )
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.trim() || '(no stderr)'
    throw new Error(`d2 failed for ${inputPath}\n${stderr}`)
  }
}

async function run() {
  const files = (await glob('**/*.{mmd,d2}', { cwd: sourceRoot, nodir: true }))
    .sort()
    .map((rel) => path.join(sourceRoot, rel))

  // Prefer .d2 over .mmd when both exist for the same logical diagram.
  const preferred = new Map()
  for (const fullPath of files) {
    const rel = path.relative(sourceRoot, fullPath)
    const key = rel.replace(/\.(mmd|d2)$/i, '')
    const existing = preferred.get(key)
    if (!existing) {
      preferred.set(key, fullPath)
      continue
    }
    const existingExt = path.extname(existing).toLowerCase()
    const currentExt = path.extname(fullPath).toLowerCase()
    if (existingExt === '.mmd' && currentExt === '.d2') {
      preferred.set(key, fullPath)
    }
  }
  const selectedFiles = [...preferred.values()].sort()

  const filtered = onlySlugs
    ? selectedFiles.filter((fullPath) => {
      const rel = path.relative(sourceRoot, fullPath)
      const slug = rel.split(path.sep)[0]
      return onlySlugs.has(slug)
    })
    : selectedFiles

  if (filtered.length === 0) {
    console.log('No Mermaid source files found for render.')
    return
  }

  let rendered = 0
  for (const sourcePath of filtered) {
    const outputPath = toOutputPath(sourcePath)
    const relSource = path.relative(process.cwd(), sourcePath)
    const relOutput = path.relative(process.cwd(), outputPath)

    if (dryRun) {
      console.log(`[dry-run] ${relSource} -> ${relOutput}`)
      continue
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    const ext = path.extname(sourcePath).toLowerCase()
    if (ext === '.d2') {
      renderD2(sourcePath, outputPath)
    } else if (ext === '.mmd') {
      renderMermaid(sourcePath, outputPath)
    } else {
      throw new Error(`Unsupported diagram source format: ${sourcePath}`)
    }
    optimizeSvg(outputPath)
    rendered += 1
    console.log(`Rendered ${relSource} -> ${relOutput}`)
  }

  if (!dryRun) {
    console.log(`Rendered ${rendered} diagram(s).`)
  }
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

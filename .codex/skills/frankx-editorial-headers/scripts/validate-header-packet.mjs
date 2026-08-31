#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const packetArg = process.argv[2]
const projectRoot = path.resolve(process.argv[3] || process.cwd())

if (!packetArg) {
  console.error('Usage: node validate-header-packet.mjs <packet.json> [project-root]')
  process.exit(2)
}

const packetPath = path.resolve(projectRoot, packetArg)
const errors = []

function requireValue(condition, message) {
  if (!condition) errors.push(message)
}

function publicAssetExists(asset) {
  if (typeof asset !== 'string' || !asset.startsWith('/')) return false
  return fs.existsSync(path.join(projectRoot, 'public', asset.slice(1)))
}

let packet
try {
  packet = JSON.parse(fs.readFileSync(packetPath, 'utf8'))
} catch (error) {
  console.error(`Cannot read header packet: ${error.message}`)
  process.exit(2)
}

requireValue(packet.schema === 'frankx.editorial-header/v1', 'schema must be frankx.editorial-header/v1')
requireValue(['ESSENTIAL', 'EXPLAINER', 'FLAGSHIP'].includes(packet.tier), 'tier must be ESSENTIAL, EXPLAINER, or FLAGSHIP')
requireValue(typeof packet.brand === 'string' && packet.brand.length > 0, 'brand is required')
requireValue(typeof packet.title === 'string' && packet.title.length > 0, 'title is required')
requireValue(packet.layers?.titleMode === 'live-html', 'on-page titleMode must be live-html')
requireValue(packet.layers?.identityMode === 'exact', 'identityMode must be exact')
requireValue(publicAssetExists(packet.layers?.art), `art asset is missing: ${packet.layers?.art || '(unset)'}`)

const og = packet.renditions?.og
requireValue(og?.width === 1200 && og?.height === 630, 'OG rendition must be 1200x630')
requireValue(publicAssetExists(og?.asset), `OG asset is missing: ${og?.asset || '(unset)'}`)
requireValue(Boolean(packet.renditions?.desktop), 'desktop rendition is required')
requireValue(Boolean(packet.renditions?.mobile), 'mobile rendition is required')

for (const [index, logo] of (packet.logos || []).entries()) {
  requireValue(publicAssetExists(logo.asset), `logo ${index + 1} asset is missing: ${logo.asset || '(unset)'}`)
  requireValue(typeof logo.source === 'string' && logo.source.length > 0, `logo ${index + 1} source is required`)
  requireValue(typeof logo.relationship === 'string' && logo.relationship.length > 0, `logo ${index + 1} relationship is required`)
}

if (packet.tier === 'FLAGSHIP') {
  const benchmarks = packet.research?.benchmarks || []
  const directions = packet.research?.directions || []
  requireValue(benchmarks.length >= 4 && benchmarks.length <= 6, 'FLAGSHIP requires 4–6 benchmarks')
  requireValue(directions.length === 3, 'FLAGSHIP requires exactly three directions')
  requireValue(directions.includes(packet.research?.selectedDirection), 'selectedDirection must match one of the three directions')
}

for (const [check, passed] of Object.entries(packet.checks || {})) {
  requireValue(passed === true, `quality check failed or unset: ${check}`)
}

if (errors.length) {
  console.error(`Header packet failed (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Header packet valid: ${path.relative(projectRoot, packetPath)}`)

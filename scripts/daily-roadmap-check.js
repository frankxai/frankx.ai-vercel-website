#!/usr/bin/env node

const { join } = require('path')
const { readFileSync } = require('fs')

const root = process.cwd()
const dataPath = join(root, 'data', 'specs-roadmap.json')

let roadmap
try {
  const raw = readFileSync(dataPath, 'utf8')
  roadmap = JSON.parse(raw)
} catch (error) {
  console.error('\n❌  Unable to load specs/roadmap data. Did you move data/specs-roadmap.json?')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

const divider = () => console.log('\n' + '─'.repeat(72))

console.log('\n⚡ FrankX Specs & Roadmap Daily Check\n')
console.log('Vision: ' + roadmap.vision)
divider()
console.log('Pillars')
roadmap.pillars.forEach((pillar, index) => {
  console.log(' ' + (index + 1) + '. ' + pillar.title)
  console.log('    • ' + pillar.description)
  console.log('    • Source: ' + pillar.source)
})
divider()
console.log('Milestones (current focus on top)')
roadmap.milestones.forEach((milestone) => {
  console.log(' ' + milestone.quarter + ' — ' + milestone.focus)
  milestone.deliverables.forEach((deliverable) => console.log('    ◦ ' + deliverable))
})
divider()
console.log('Delivery rituals')
roadmap.rituals.forEach((ritual) => {
  console.log(' ' + ritual.name + ' (' + ritual.cadence + ')')
  console.log('    Owner: ' + ritual.owner)
  console.log('    ' + ritual.description)
})
divider()
console.log('Outcome signals')
roadmap.signals.forEach((signal) => {
  console.log(' ' + signal.name)
  console.log('    Metric: ' + signal.metric)
  console.log('    Target: ' + signal.target)
  console.log('    Source: ' + signal.source)
})
divider()
console.log('Next actions')
roadmap.nextActions.forEach((action) => {
  console.log(' ' + action.title + ' — ' + action.status.toUpperCase())
  console.log('    ' + action.note)
})
divider()
console.log('\n✅  Ready to log updates in docs/DAILY_INTELLIGENCE_OPERATIONS.md\n')

#!/usr/bin/env node
// List CRM entries. Usage:
//   node scripts/crm/list.mjs people
//   node scripts/crm/list.mjs orgs
//   node scripts/crm/list.mjs workshops
//   node scripts/crm/list.mjs engagements [--person p_xxx] [--workshop w_xxx]
//   node scripts/crm/list.mjs linkedin [--target nldigital]

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'data', 'crm')
const ENTITIES = {
  people: 'people.json',
  orgs: 'orgs.json',
  workshops: 'workshops.json',
  engagements: 'engagements.json',
  linkedin: 'linkedin-profiles.json',
}

const entity = process.argv[2]
if (!entity || !ENTITIES[entity]) {
  console.error(`Usage: node scripts/crm/list.mjs <entity>`)
  console.error(`  entity: ${Object.keys(ENTITIES).join(' | ')}`)
  process.exit(1)
}

const data = JSON.parse(readFileSync(join(ROOT, ENTITIES[entity]), 'utf8'))

// Parse flag filters
const args = process.argv.slice(3)
const filters = {}
for (let i = 0; i < args.length; i += 2) {
  if (args[i].startsWith('--')) {
    filters[args[i].slice(2)] = args[i + 1]
  }
}

let filtered = data
if (entity === 'engagements') {
  if (filters.person) filtered = filtered.filter(e => e.person_id === filters.person)
  if (filters.workshop) filtered = filtered.filter(e => e.workshop_id === filters.workshop)
}
if (entity === 'linkedin') {
  if (filters.target) filtered = filtered.filter(p => p.target_list === filters.target)
}

console.log(`${filtered.length} ${entity} record(s):\n`)
for (const item of filtered) {
  if (entity === 'people') {
    console.log(`  ${item.id}  ${item.name.padEnd(30)} ${item.role || ''} @ ${(item.org_ids || []).join(',')}`)
  } else if (entity === 'orgs') {
    console.log(`  ${item.id}  ${item.name.padEnd(30)} ${item.category} ${item.city || ''} ${item.country || ''}`)
  } else if (entity === 'workshops') {
    console.log(`  ${item.id}  ${item.date}  ${item.status.padEnd(10)} ${item.title}`)
  } else if (entity === 'engagements') {
    console.log(`  ${item.id}  ${item.date}  ${item.type.padEnd(20)} person=${item.person_id}`)
  } else if (entity === 'linkedin') {
    console.log(`  [${item.target_list}] p${item.priority}  ${item.name || '(unnamed)'} — ${item.org_name}`)
  }
}

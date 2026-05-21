#!/usr/bin/env node
// Generate a CRM ID. Usage: node scripts/crm/new-id.mjs p
// Prints a new ID like "p_r3k9x2m7" to stdout.

const VALID = ['p', 'o', 'w', 'e', 'c']
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'

function nanoid(len = 8) {
  let id = ''
  for (let i = 0; i < len; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return id
}

const prefix = process.argv[2]
if (!prefix || !VALID.includes(prefix)) {
  console.error(`Usage: node scripts/crm/new-id.mjs <prefix>`)
  console.error(`  prefix: one of ${VALID.join(', ')}`)
  console.error(`    p = person, o = org, w = workshop, e = engagement, c = content`)
  process.exit(1)
}

console.log(`${prefix}_${nanoid()}`)

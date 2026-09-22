#!/usr/bin/env node
/**
 * Verify arena receipts are correctly loaded and match SIS canon.
 */

import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RECEIPTS_DIR = join(__dirname, '..', 'public', 'research', 'arena-receipts')

const EXPECTED_RECEIPTS = [
  '2026-06-09-fable5-vs-opus48.json',
  '2026-06-09-r2-stress-fable5-vs-opus48.json',
  '2026-06-09-r3-true-challenge.json',
  '2026-06-10-r3-lineup-4way.json',
  '2026-06-10-r4-work-samples.json',
  '2026-06-12-grok-composer25-model-lane.json',
  '2026-08-28-r5-deep-reasoning.json',
]

function main() {
  console.log('Verifying arena receipts...\n')
  
  const files = readdirSync(RECEIPTS_DIR).filter(f => f.endsWith('.json')).sort()
  
  console.log(`Found ${files.length} receipt files:`)
  files.forEach(f => console.log(`  - ${f}`))
  console.log()
  
  // Check count
  if (files.length !== EXPECTED_RECEIPTS.length) {
    console.error(`❌ Expected ${EXPECTED_RECEIPTS.length} receipts, found ${files.length}`)
    process.exit(1)
  }
  
  // Check filenames match
  const missing = EXPECTED_RECEIPTS.filter(f => !files.includes(f))
  const extra = files.filter(f => !EXPECTED_RECEIPTS.includes(f))
  
  if (missing.length > 0) {
    console.error(`❌ Missing expected receipts:`)
    missing.forEach(f => console.error(`  - ${f}`))
    process.exit(1)
  }
  
  if (extra.length > 0) {
    console.error(`❌ Found unexpected receipts:`)
    extra.forEach(f => console.error(`  - ${f}`))
    process.exit(1)
  }
  
  // Validate schema
  let valid = 0
  let invalid = 0
  
  for (const file of files) {
    const filePath = join(RECEIPTS_DIR, file)
    const content = readFileSync(filePath, 'utf8')
    const receipt = JSON.parse(content)
    
    // Check required fields
    const required = ['round_id', 'date', 'title', 'contestants', 'methodology', 'tasks']
    const missingFields = required.filter(field => !receipt[field])
    
    if (missingFields.length > 0) {
      console.error(`❌ ${file}: missing fields ${missingFields.join(', ')}`)
      invalid++
    } else if (!Array.isArray(receipt.contestants)) {
      console.error(`❌ ${file}: contestants must be an array`)
      invalid++
    } else if (!Array.isArray(receipt.tasks)) {
      console.error(`❌ ${file}: tasks must be an array`)
      invalid++
    } else {
      console.log(`✓ ${file}: valid (${receipt.contestants.length} contestants, ${receipt.tasks.length} tasks)`)
      valid++
    }
  }
  
  console.log()
  if (invalid > 0) {
    console.error(`❌ ${invalid} invalid receipt(s), ${valid} valid`)
    process.exit(1)
  }
  
  console.log(`✅ All ${valid} receipts are valid and match SIS canon!`)
}

main()

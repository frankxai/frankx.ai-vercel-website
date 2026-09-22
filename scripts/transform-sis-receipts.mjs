#!/usr/bin/env node
/**
 * Transform SIS arena receipts to FrankX schema.
 * 
 * SIS schema uses: runId, card, contestants (object), method
 * FrankX schema expects: round_id, title, contestants (array), methodology
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RECEIPTS_DIR = join(__dirname, '..', 'public', 'research', 'arena-receipts')

function transformReceipt(sisReceipt) {
  const transformed = { ...sisReceipt }
  
  // Transform runId to round_id
  if (sisReceipt.runId) {
    transformed.round_id = sisReceipt.runId
    delete transformed.runId
  }
  
  // Transform card to title (or generate from runId)
  if (sisReceipt.card) {
    transformed.title = sisReceipt.card
    delete transformed.card
  } else if (!transformed.title && transformed.round_id) {
    // Generate a readable title from round_id
    const idPart = transformed.round_id.replace('arena-', '')
    // Convert "2026-06-09-fable5-vs-opus48" to "Fable 5 vs Opus 4.8 (2026-06-09)"
    const parts = idPart.split('-')
    const date = parts.slice(0, 3).join('-')
    const rest = parts.slice(3).join(' ')
      .replace(/r(\d+)/, 'Round $1')
      .replace(/fable(\d+)/, 'Fable $1')
      .replace(/opus(\d)(\d+)/, 'Opus $1.$2')
      .replace(/sonnet(\d+)/, 'Sonnet $1')
      .replace(/haiku(\d+)/, 'Haiku $1')
      .replace(/vs/g, 'vs')
    transformed.title = rest ? `${rest.charAt(0).toUpperCase() + rest.slice(1)} (${date})` : idPart
  }
  
  // Transform contestants object to array
  if (sisReceipt.contestants && typeof sisReceipt.contestants === 'object' && !Array.isArray(sisReceipt.contestants)) {
    transformed.contestants = Object.values(sisReceipt.contestants)
  }
  
  // Transform method to methodology
  if (sisReceipt.method) {
    transformed.methodology = sisReceipt.method
    delete transformed.method
  }
  
  return transformed
}

function main() {
  const files = readdirSync(RECEIPTS_DIR).filter(f => f.endsWith('.json'))
  
  console.log(`Found ${files.length} receipt files`)
  
  for (const file of files) {
    const filePath = join(RECEIPTS_DIR, file)
    const content = readFileSync(filePath, 'utf8')
    const sisReceipt = JSON.parse(content)
    
    // Check if transformation is needed
    const needsTransform = sisReceipt.runId || sisReceipt.card || sisReceipt.method || 
                          (sisReceipt.contestants && typeof sisReceipt.contestants === 'object' && !Array.isArray(sisReceipt.contestants))
    
    if (needsTransform) {
      console.log(`Transforming ${file}...`)
      const transformed = transformReceipt(sisReceipt)
      writeFileSync(filePath, JSON.stringify(transformed, null, 2) + '\n', 'utf8')
      console.log(`  ✓ Transformed`)
    } else {
      console.log(`Skipping ${file} (already in FrankX schema)`)
    }
  }
  
  console.log('\nDone!')
}

main()

#!/usr/bin/env node
/**
 * Blog Heroes Scanner
 * Reads data/blog-heroes.json and reports coverage.
 * Does NOT call external APIs — hero images are managed separately
 * via scripts/generate-nano-banana-heroes.mjs.
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const heroesPath = join(root, 'data', 'blog-heroes.json')

if (!existsSync(heroesPath)) {
  console.log('Blog heroes manifest not found — skipping scan')
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(heroesPath, 'utf-8'))
const { meta, heroes } = manifest

const withImage = heroes.filter((h) => h.image && h.exists !== false).length
const total = heroes.length

console.log(`Blog Heroes: ${withImage}/${total} have images (${meta.totalHeroes ?? total} tracked)`)
console.log(`  Styles: ${(meta.styles ?? []).join(', ')}`)

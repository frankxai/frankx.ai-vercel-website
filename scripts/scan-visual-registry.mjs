#!/usr/bin/env node
/**
 * Visual Intelligence System — Registry Scanner
 *
 * Scans all image directories and rebuilds data/visual-registry.json
 * with auto-detected tags, mood, theme, and placement suitability.
 *
 * Usage:
 *   node scripts/scan-visual-registry.mjs          # Full rebuild
 *   node scripts/scan-visual-registry.mjs --diff    # Only new/changed images
 *   node scripts/scan-visual-registry.mjs --report  # Print health report
 */

import fs from 'fs'
import path from 'path'

const IMAGES_DIR = path.resolve('public/images')
const REGISTRY_PATH = path.resolve('data/visual-registry.json')
const BRAND_DNA_PATH = path.resolve('data/brand-visual-dna.json')
const SKIP_SUFFIXES = ['_thumb.jpeg', '_thumb.jpg', '_thumb.png']
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp']

// Auto-tag rules based on filename and directory patterns
const TAG_RULES = [
  { pattern: /music|suno|audio|song|track|melody|rhythm/i, tag: 'music' },
  { pattern: /ai|agent|agentic|llm|claude|gpt/i, tag: 'ai' },
  { pattern: /hero/i, tag: 'hero' },
  { pattern: /mascot|axi|frank-omega/i, tag: 'mascot' },
  { pattern: /arcanea|eldrian|godbeast|guardian/i, tag: 'arcanea' },
  { pattern: /nature|forest|garden|bloom|crystal|tree/i, tag: 'nature' },
  { pattern: /brand|logo|mark/i, tag: 'brand' },
  { pattern: /diagram|architecture|flowchart|topology/i, tag: 'technical' },
  { pattern: /portrait|headshot|avatar/i, tag: 'portrait' },
  { pattern: /infographic|poster|flywheel/i, tag: 'infographic' },
  { pattern: /screenshot/i, tag: 'screenshot' },
  { pattern: /book|chapter|cover/i, tag: 'book' },
  { pattern: /ecosystem|overview|map/i, tag: 'ecosystem' },
  { pattern: /vibe|consciousness|soul/i, tag: 'consciousness' },
  { pattern: /team|codex|echo|draconia|nero|arion|shinkami|nova|stella|lumina/i, tag: 'team' },
  { pattern: /game|play|fun/i, tag: 'game' },
  { pattern: /course|learn|student|education/i, tag: 'education' },
  { pattern: /newsletter|email/i, tag: 'newsletter' },
  { pattern: /golden-age|golden/i, tag: 'golden-age' },
  { pattern: /design-lab|design/i, tag: 'design' },
  { pattern: /gencreator|creator/i, tag: 'creator' },
  { pattern: /soulbook/i, tag: 'soulbook' },
  { pattern: /valentine/i, tag: 'seasonal' },
  { pattern: /fire-horse/i, tag: 'fire-horse' },
]

// Mood detection based on directory and filename
function detectMood(filepath, category) {
  const name = path.basename(filepath).toLowerCase()
  if (name.includes('infographic') || name.includes('diagram') || name.includes('flowchart')) return 'informational'
  if (name.includes('poster') || name.includes('flywheel') || name.includes('workflow')) return 'branded'
  if (category === 'arcanea' || name.includes('eldrian') || name.includes('conclave')) return 'cinematic'
  if (category === 'design-lab' || category === 'ai-art') return 'artistic'
  if (category === 'mascot' || category === 'team') return 'branded'
  if (category === 'screenshots') return 'informational'
  if (name.includes('hero') || name.includes('v3-pro') || name.includes('v2')) return 'atmospheric'
  if (category === 'blog') return 'atmospheric'
  return 'atmospheric'
}

// Theme detection
function detectTheme(category, filename) {
  const name = filename.toLowerCase()
  if (name.includes('light') || name.includes('white')) return 'light'
  if (category === 'consciousness' || category === 'golden-age') return 'dark'
  if (name.includes('aurora') || name.includes('gradient')) return 'gradient'
  // Most FrankX assets are dark-themed
  return 'dark'
}

// Suitability detection
function detectSuitability(tags, mood, sizeKB) {
  const suitable = []
  if (tags.includes('hero') && sizeKB > 100) suitable.push('blog-hero')
  if (mood === 'atmospheric' && sizeKB > 200) suitable.push('homepage-showcase')
  if (sizeKB > 50 && sizeKB < 500) suitable.push('card-thumbnail')
  if (mood === 'branded') suitable.push('og-image')
  if (tags.includes('mascot') || tags.includes('portrait')) suitable.push('avatar')
  if (mood === 'cinematic') suitable.push('banner')
  if (tags.includes('infographic')) suitable.push('documentation')
  if (tags.includes('team')) suitable.push('team-card')
  if (tags.includes('book')) suitable.push('book-cover')
  if (mood === 'artistic') suitable.push('gallery')
  return [...new Set(suitable)]
}

function scanImages() {
  const entries = []

  function walkDir(dir, category = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        if (item.name === '_originals' || item.name === '_archive') continue
        const cat = category || item.name
        walkDir(fullPath, cat)
        continue
      }

      const ext = path.extname(item.name).toLowerCase()
      if (!IMAGE_EXTENSIONS.includes(ext)) continue
      if (SKIP_SUFFIXES.some(s => item.name.endsWith(s))) continue

      const stats = fs.statSync(fullPath)
      const sizeKB = Math.round(stats.size / 1024)
      const relativePath = '/' + path.relative('public', fullPath).replace(/\\/g, '/')
      const directory = path.basename(path.dirname(fullPath))

      // Auto-detect tags
      const searchStr = `${item.name} ${directory} ${category}`
      const tags = TAG_RULES
        .filter(rule => rule.pattern.test(searchStr))
        .map(rule => rule.tag)

      const mood = detectMood(relativePath, category)
      const theme = detectTheme(category, item.name)
      const suitableFor = detectSuitability(tags, mood, sizeKB)

      entries.push({
        path: relativePath,
        directory,
        category: category || directory,
        filename: item.name,
        sizeKB,
        tags: [...new Set(tags)],
        mood,
        theme,
        suitableFor,
      })
    }
  }

  walkDir(IMAGES_DIR)
  entries.sort((a, b) => a.category.localeCompare(b.category) || a.filename.localeCompare(b.filename))
  return entries
}

function generateReport(entries) {
  const totalSize = entries.reduce((sum, e) => sum + e.sizeKB, 0)
  const categories = {}
  const moods = {}
  const oversized = entries.filter(e => e.sizeKB > 2000)
  const tiny = entries.filter(e => e.sizeKB < 5)

  for (const e of entries) {
    categories[e.category] = (categories[e.category] || 0) + 1
    moods[e.mood] = (moods[e.mood] || 0) + 1
  }

  console.log('\n=== VISUAL INTELLIGENCE HEALTH REPORT ===\n')
  console.log(`Total images: ${entries.length}`)
  console.log(`Total size: ${(totalSize / 1024).toFixed(1)} MB`)
  console.log(`Oversized (>2MB): ${oversized.length}`)
  console.log(`Tiny (<5KB): ${tiny.length}`)
  console.log('\nBy category:')
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`))
  console.log('\nBy mood:')
  Object.entries(moods)
    .sort((a, b) => b[1] - a[1])
    .forEach(([mood, count]) => console.log(`  ${mood}: ${count}`))

  if (oversized.length > 0) {
    console.log('\nOversized images (>2MB):')
    oversized.forEach(e => console.log(`  ${e.path} (${(e.sizeKB / 1024).toFixed(1)} MB)`))
  }
}

// Main
const args = process.argv.slice(2)
const mode = args[0] || '--full'

if (mode === '--report') {
  const existing = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
  generateReport(existing)
} else if (mode === '--diff') {
  const existing = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
  const existingPaths = new Set(existing.map(e => e.path))
  const current = scanImages()
  const newImages = current.filter(e => !existingPaths.has(e.path))
  if (newImages.length === 0) {
    console.log('No new images found.')
  } else {
    console.log(`Found ${newImages.length} new images:`)
    newImages.forEach(e => console.log(`  + ${e.path} (${e.sizeKB} KB)`))
    // Merge and save
    const merged = [...existing, ...newImages]
    merged.sort((a, b) => a.category.localeCompare(b.category) || a.filename.localeCompare(b.filename))
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(merged, null, 2))
    console.log(`Registry updated: ${merged.length} total images`)
  }
} else {
  console.log('Scanning all images...')
  const entries = scanImages()
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(entries, null, 2))
  console.log(`Registry rebuilt: ${entries.length} images`)
  generateReport(entries)
}

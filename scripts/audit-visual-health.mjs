#!/usr/bin/env node
/**
 * Visual Intelligence System — Health Auditor
 *
 * Runs automated quality checks against the visual registry and codebase:
 * - Placeholder detection (blog-hero-aurora.svg usage)
 * - Duplicate image references in blog posts
 * - Orphaned images (in registry but not referenced)
 * - Oversized images needing optimization
 *
 * Usage:
 *   node scripts/audit-visual-health.mjs             # Full audit
 *   node scripts/audit-visual-health.mjs --json       # JSON output for n8n/Slack
 */

import fs from 'fs'
import path from 'path'

const REGISTRY_PATH = path.resolve('data/visual-registry.json')
const CONTENT_DIR = path.resolve('content/blog')
const PLACEHOLDER_IMAGES = ['blog-hero-aurora.svg', 'placeholder.png', 'default-hero.png']
const SKIP_FILES = ['CONTENT_SCHEMA', 'visual-registry', 'content-index.json', 'vault-manifest.json', 'sitemap-image-map.json']

function loadRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))
}

// Cross-platform recursive file search (replaces grep -rn)
function walkFiles(dir, extensions) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '_originals') continue
      results.push(...walkFiles(full, extensions))
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(full)
    }
  }
  return results
}

function findPlaceholderUsage() {
  const issues = []
  const files = [
    ...walkFiles('content', ['.mdx']),
    ...walkFiles('app', ['.tsx']),
    ...walkFiles('data', ['.json']),
  ]

  for (const filePath of files) {
    if (SKIP_FILES.some(s => filePath.includes(s))) continue
    const content = fs.readFileSync(filePath, 'utf-8')
    for (const placeholder of PLACEHOLDER_IMAGES) {
      if (content.includes(placeholder)) {
        issues.push({
          type: 'placeholder',
          severity: 'high',
          file: filePath,
          image: placeholder,
          message: `Uses generic placeholder "${placeholder}" — needs unique image`,
        })
      }
    }
  }
  return issues
}

function findBlogDuplicateHeroes() {
  const issues = []
  if (!fs.existsSync(CONTENT_DIR)) return issues

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))

  for (const file of files) {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) continue

    const imageMatch = frontmatterMatch[1].match(/image:\s*['"]?([^\s'"]+)/)
    if (!imageMatch) continue

    const heroImage = imageMatch[1]
    const bodyContent = content.slice(frontmatterMatch[0].length)

    if (bodyContent.includes(heroImage)) {
      const lines = content.split('\n')
      const frontmatterEnd = lines.indexOf('---', 1)
      const lineNum = lines.findIndex((l, i) => i > frontmatterEnd && l.includes(heroImage)) + 1
      issues.push({
        type: 'duplicate-hero',
        severity: 'medium',
        file: `content/blog/${file}`,
        image: heroImage,
        line: lineNum,
        message: `Hero image repeated in body content — remove the body reference`,
      })
    }
  }
  return issues
}

function findOversizedImages() {
  const registry = loadRegistry()
  return registry
    .filter(img => img.sizeKB > 2000)
    .map(img => ({
      type: 'oversized',
      severity: 'low',
      file: `public${img.path}`,
      image: img.path,
      sizeKB: img.sizeKB,
      message: `Image is ${(img.sizeKB / 1024).toFixed(1)}MB — consider optimizing to <2MB`,
    }))
}

function findOrphanedImages() {
  const registry = loadRegistry()
  const issues = []

  // Cross-platform image reference scanner (replaces grep -roh)
  const referencedPaths = new Set()
  const imagePattern = /\/images\/[^"'\)\s\]]+/g
  const codeFiles = [
    ...walkFiles('app', ['.tsx', '.ts']),
    ...walkFiles('components', ['.tsx', '.ts']),
    ...walkFiles('content', ['.mdx', '.md']),
    ...walkFiles('data', ['.json']),
    ...walkFiles('lib', ['.ts', '.tsx']),
  ]

  for (const filePath of codeFiles) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const matches = content.match(imagePattern)
    if (matches) matches.forEach(m => referencedPaths.add(m))
  }

  for (const img of registry) {
    if (!referencedPaths.has(img.path)) {
      const thumbPath = img.path.replace(/\.png$/, '_thumb.jpeg')
      if (!referencedPaths.has(thumbPath)) {
        issues.push({
          type: 'orphaned',
          severity: 'info',
          file: `public${img.path}`,
          image: img.path,
          sizeKB: img.sizeKB,
          message: `Image not referenced in any code/content file`,
        })
      }
    }
  }
  return issues
}

// Main
const args = process.argv.slice(2)
const jsonMode = args.includes('--json')

const placeholders = findPlaceholderUsage()
const duplicates = findBlogDuplicateHeroes()
const oversized = findOversizedImages()
const orphaned = findOrphanedImages()

const allIssues = [...placeholders, ...duplicates, ...oversized, ...orphaned]
const highCount = allIssues.filter(i => i.severity === 'high').length
const mediumCount = allIssues.filter(i => i.severity === 'medium').length
const lowCount = allIssues.filter(i => i.severity === 'low').length
const infoCount = allIssues.filter(i => i.severity === 'info').length

if (jsonMode) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: { total: allIssues.length, high: highCount, medium: mediumCount, low: lowCount, info: infoCount },
    issues: allIssues,
  }, null, 2))
} else {
  console.log('\n=== VISUAL HEALTH AUDIT ===\n')
  console.log(`Found ${allIssues.length} issues:`)
  console.log(`  HIGH:   ${highCount} (placeholders, broken references)`)
  console.log(`  MEDIUM: ${mediumCount} (duplicates, missing heroes)`)
  console.log(`  LOW:    ${lowCount} (oversized images)`)
  console.log(`  INFO:   ${infoCount} (orphaned images)`)

  if (highCount > 0) {
    console.log('\n--- HIGH PRIORITY ---')
    placeholders.forEach(i => console.log(`  [PLACEHOLDER] ${i.file}: ${i.message}`))
  }

  if (mediumCount > 0) {
    console.log('\n--- MEDIUM PRIORITY ---')
    duplicates.forEach(i => console.log(`  [DUPLICATE] ${i.file}:${i.line}: ${i.message}`))
  }

  if (lowCount > 0) {
    console.log('\n--- LOW PRIORITY ---')
    oversized.slice(0, 10).forEach(i => console.log(`  [SIZE] ${i.file}: ${i.message}`))
    if (oversized.length > 10) console.log(`  ... and ${oversized.length - 10} more`)
  }

  if (infoCount > 0) {
    console.log(`\n--- ORPHANED IMAGES (${infoCount}) ---`)
    orphaned.slice(0, 10).forEach(i => console.log(`  [ORPHAN] ${i.image} (${i.sizeKB}KB)`))
    if (infoCount > 10) console.log(`  ... and ${infoCount - 10} more`)
  }

  const score = Math.max(0, 100 - (highCount * 15) - (mediumCount * 5) - (lowCount * 2))
  console.log(`\n=== VISUAL HEALTH SCORE: ${score}/100 ===`)
  if (score >= 90) console.log('Status: EXCELLENT')
  else if (score >= 70) console.log('Status: GOOD — minor issues to address')
  else if (score >= 50) console.log('Status: NEEDS ATTENTION — several issues')
  else console.log('Status: CRITICAL — immediate action required')
}

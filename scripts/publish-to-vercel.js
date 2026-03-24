#!/usr/bin/env node
/**
 * Publish to Vercel Site
 *
 * Syncs approved blog content from main FrankX folder to production Vercel site.
 *
 * Usage:
 *   node scripts/publish-to-vercel.js                    # List files ready to publish
 *   node scripts/publish-to-vercel.js --sync             # Sync all approved files
 *   node scripts/publish-to-vercel.js --file article.mdx # Sync specific file
 */

const fs = require('fs')
const path = require('path')

const SOURCE = path.join(process.cwd(), 'content/blog')
const DEST = path.join(process.cwd(), 'FrankX.AI - Vercel Website/content/blog')

// Valid categories (must match CONTENT_SCHEMA.md)
const VALID_CATEGORIES = [
  'Creator Systems',
  'Vibe Sessions',
  'Intelligence Dispatches',
  'Consciousness',
  'Flagship'
]

function parseFrontmatter(content) {
  content = content.replace(/\r\n/g, '\n')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yaml = match[1]
  const result = {}

  const lines = yaml.split('\n')
  for (const line of lines) {
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      let value = kvMatch[2].trim().replace(/^["']|["']$/g, '')
      result[kvMatch[1]] = value
    }
  }
  return result
}

function validateForPublish(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const fm = parseFrontmatter(content)

  if (!fm) return { valid: false, reason: 'No frontmatter' }
  if (!fm.title) return { valid: false, reason: 'Missing title' }
  if (!fm.description) return { valid: false, reason: 'Missing description' }
  if (!fm.date) return { valid: false, reason: 'Missing date' }
  if (!fm.category) return { valid: false, reason: 'Missing category' }
  if (!VALID_CATEGORIES.includes(fm.category)) {
    return { valid: false, reason: `Invalid category: ${fm.category}` }
  }

  return { valid: true, frontmatter: fm }
}

function listFiles() {
  if (!fs.existsSync(SOURCE)) {
    console.log('Source folder not found:', SOURCE)
    return []
  }

  const files = fs.readdirSync(SOURCE).filter(f => f.endsWith('.mdx'))
  const results = []

  for (const file of files) {
    const sourcePath = path.join(SOURCE, file)
    const destPath = path.join(DEST, file)
    const validation = validateForPublish(sourcePath)

    const existsInDest = fs.existsSync(destPath)
    let status = 'new'
    if (existsInDest) {
      const sourceStat = fs.statSync(sourcePath)
      const destStat = fs.statSync(destPath)
      status = sourceStat.mtime > destStat.mtime ? 'updated' : 'synced'
    }

    results.push({
      file,
      valid: validation.valid,
      reason: validation.reason,
      status,
      category: validation.frontmatter?.category
    })
  }

  return results
}

function syncFile(fileName) {
  const sourcePath = path.join(SOURCE, fileName)
  const destPath = path.join(DEST, fileName)

  if (!fs.existsSync(sourcePath)) {
    console.log(`File not found: ${fileName}`)
    return false
  }

  const validation = validateForPublish(sourcePath)
  if (!validation.valid) {
    console.log(`Cannot publish ${fileName}: ${validation.reason}`)
    return false
  }

  fs.copyFileSync(sourcePath, destPath)
  console.log(`Published: ${fileName} -> Vercel site`)
  return true
}

function syncAll() {
  const files = listFiles()
  let published = 0

  for (const { file, valid, status } of files) {
    if (valid && (status === 'new' || status === 'updated')) {
      if (syncFile(file)) published++
    }
  }

  console.log(`\nPublished ${published} files to Vercel site.`)
}

// CLI
const args = process.argv.slice(2)

if (args.includes('--sync')) {
  syncAll()
} else if (args.includes('--file')) {
  const fileIndex = args.indexOf('--file') + 1
  if (args[fileIndex]) {
    syncFile(args[fileIndex])
  } else {
    console.log('Specify file: --file article.mdx')
  }
} else {
  console.log('\n=== Publish to Vercel Site ===\n')
  console.log('Source:', SOURCE)
  console.log('Dest:', DEST)
  console.log('')

  const files = listFiles()

  const ready = files.filter(f => f.valid && (f.status === 'new' || f.status === 'updated'))
  const invalid = files.filter(f => !f.valid)
  const synced = files.filter(f => f.valid && f.status === 'synced')

  if (ready.length > 0) {
    console.log('Ready to publish:')
    for (const f of ready) {
      console.log(`  [${f.status.toUpperCase()}] ${f.file} (${f.category})`)
    }
  }

  if (invalid.length > 0) {
    console.log('\nNot ready (fix these):')
    for (const f of invalid) {
      console.log(`  ${f.file}: ${f.reason}`)
    }
  }

  console.log(`\nSummary: ${ready.length} ready, ${synced.length} synced, ${invalid.length} invalid`)
  console.log('\nRun with --sync to publish all ready files.')
}

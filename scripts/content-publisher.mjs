#!/usr/bin/env node
/**
 * Content Publisher Validation
 *
 * Pre-publish validation gate for AI-first content.
 * Checks frontmatter, AI-first fields, FAQ presence, and links.
 *
 * Usage: npm run content:validate [optional-file-path]
 */

import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'

// Validation requirements
const REQUIRED_FIELDS = ['title', 'description', 'date', 'author']
const AI_FIRST_FIELDS = ['tldr', 'faq', 'keywords']
const MIN_FAQ_COUNT = 5
const MIN_INTERNAL_LINKS = 3
const MAX_DESCRIPTION_LENGTH = 155
const TLDR_WORD_RANGE = { min: 40, max: 60 }

// Parse YAML frontmatter from MDX content
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yaml = match[1]
  const frontmatter = {}

  // Simple YAML parser for common fields
  const lines = yaml.split('\n')
  let currentKey = null
  let currentArray = null

  for (const line of lines) {
    // Handle array items
    if (line.trim().startsWith('- ') && currentKey) {
      const value = line.trim().slice(2)
      if (!frontmatter[currentKey]) frontmatter[currentKey] = []

      // Handle FAQ array items with q: and a: properties
      if (value.startsWith('q:')) {
        currentArray = { q: value.slice(2).trim().replace(/^["']|["']$/g, '') }
        frontmatter[currentKey].push(currentArray)
      } else if (value.startsWith('a:') && currentArray) {
        currentArray.a = value.slice(2).trim().replace(/^["']|["']$/g, '')
      } else {
        frontmatter[currentKey].push(value.replace(/^["']|["']$/g, ''))
      }
      continue
    }

    // Handle key: value pairs
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()

      if (value === '' || value === '|') {
        currentKey = key
        frontmatter[key] = []
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        frontmatter[key] = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        currentKey = null
      } else {
        frontmatter[key] = value.replace(/^["']|["']$/g, '')
        currentKey = key
        currentArray = null
      }
    }
  }

  return frontmatter
}

// Count internal links in content
function countInternalLinks(content) {
  const body = content.replace(/^---[\s\S]*?---/, '')
  const linkPattern = /\[([^\]]+)\]\(\/[^)]+\)/g
  const matches = body.match(linkPattern) || []
  return matches.length
}

// Check for FAQ section in body
function hasFAQSection(content) {
  const body = content.replace(/^---[\s\S]*?---/, '')
  return /##\s*FAQ/i.test(body)
}

// Count FAQ questions in body
function countFAQInBody(content) {
  const body = content.replace(/^---[\s\S]*?---/, '')
  const faqMatch = body.match(/##\s*FAQ[\s\S]*?(?=##[^#]|$)/i)
  if (!faqMatch) return 0

  const h3Pattern = /###\s+.+/g
  const matches = faqMatch[0].match(h3Pattern) || []
  return matches.length
}

// Validate a single file
async function validateFile(filepath) {
  const content = await fs.readFile(filepath, 'utf-8')
  const frontmatter = parseFrontmatter(content)

  const results = {
    file: path.basename(filepath),
    path: filepath,
    valid: true,
    errors: [],
    warnings: [],
    stats: {},
  }

  if (!frontmatter) {
    results.valid = false
    results.errors.push('Missing or invalid frontmatter')
    return results
  }

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      results.valid = false
      results.errors.push(`Missing required field: ${field}`)
    }
  }

  // Check AI-first fields
  for (const field of AI_FIRST_FIELDS) {
    if (!frontmatter[field]) {
      results.warnings.push(`Missing AI-first field: ${field}`)
    }
  }

  // Validate description length
  if (frontmatter.description && frontmatter.description.length > MAX_DESCRIPTION_LENGTH) {
    results.warnings.push(
      `Description too long: ${frontmatter.description.length} chars (max ${MAX_DESCRIPTION_LENGTH})`
    )
  }

  // Validate TL;DR word count
  if (frontmatter.tldr) {
    const wordCount = frontmatter.tldr.split(/\s+/).length
    results.stats.tldrWordCount = wordCount
    if (wordCount < TLDR_WORD_RANGE.min || wordCount > TLDR_WORD_RANGE.max) {
      results.warnings.push(
        `TL;DR word count ${wordCount} outside range (${TLDR_WORD_RANGE.min}-${TLDR_WORD_RANGE.max})`
      )
    }
  }

  // Check FAQ count in frontmatter
  const faqCount = Array.isArray(frontmatter.faq) ? frontmatter.faq.length : 0
  results.stats.faqCountFrontmatter = faqCount
  if (faqCount < MIN_FAQ_COUNT) {
    results.warnings.push(`FAQ count in frontmatter: ${faqCount} (minimum ${MIN_FAQ_COUNT})`)
  }

  // Check FAQ section in body
  if (!hasFAQSection(content)) {
    results.warnings.push('No FAQ section found in body')
  } else {
    results.stats.faqCountBody = countFAQInBody(content)
  }

  // Check internal links
  const linkCount = countInternalLinks(content)
  results.stats.internalLinks = linkCount
  if (linkCount < MIN_INTERNAL_LINKS) {
    results.warnings.push(`Internal links: ${linkCount} (minimum ${MIN_INTERNAL_LINKS})`)
  }

  // Check schema field
  if (!frontmatter.schema) {
    results.warnings.push('No schema specified - defaulting to Article only')
  }

  // Check keywords
  if (frontmatter.keywords && Array.isArray(frontmatter.keywords)) {
    results.stats.keywordCount = frontmatter.keywords.length
  }

  // Update validity based on errors only (warnings don't fail)
  results.valid = results.errors.length === 0

  return results
}

// Validate all MDX files in content/blog
async function validateAll() {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = await glob(`${blogDir}/**/*.mdx`)

  console.log(`\nValidating ${files.length} MDX files...\n`)

  const allResults = []
  let passCount = 0
  let warnCount = 0
  let failCount = 0

  for (const file of files) {
    const result = await validateFile(file)
    allResults.push(result)

    if (!result.valid) {
      failCount++
    } else if (result.warnings.length > 0) {
      warnCount++
    } else {
      passCount++
    }
  }

  return { results: allResults, passCount, warnCount, failCount }
}

// Print validation report
function printReport(validation) {
  console.log('════════════════════════════════════════════════════════')
  console.log('  CONTENT VALIDATION REPORT')
  console.log('════════════════════════════════════════════════════════\n')

  console.log(`  PASS: ${validation.passCount}`)
  console.log(`  WARN: ${validation.warnCount}`)
  console.log(`  FAIL: ${validation.failCount}`)
  console.log('')

  // Show details for failed and warned files
  for (const result of validation.results) {
    if (!result.valid || result.warnings.length > 0) {
      const status = result.valid ? '⚠️ WARN' : '❌ FAIL'
      console.log(`${status}: ${result.file}`)

      for (const error of result.errors) {
        console.log(`    ✗ ${error}`)
      }
      for (const warning of result.warnings) {
        console.log(`    ⚡ ${warning}`)
      }
      console.log('')
    }
  }

  // Summary stats
  console.log('────────────────────────────────────────────────────────')
  console.log('  CONTENT STATS SUMMARY')
  console.log('────────────────────────────────────────────────────────')

  const withTldr = validation.results.filter((r) => r.stats.tldrWordCount).length
  const avgLinks =
    validation.results.reduce((sum, r) => sum + (r.stats.internalLinks || 0), 0) /
    validation.results.length

  console.log(`  Articles with TL;DR: ${withTldr}/${validation.results.length}`)
  console.log(`  Average internal links: ${avgLinks.toFixed(1)}`)
  console.log('')

  console.log('════════════════════════════════════════════════════════\n')
}

// Main execution
async function main() {
  const specificFile = process.argv[2]

  try {
    if (specificFile) {
      // Validate single file
      const result = await validateFile(specificFile)
      console.log(JSON.stringify(result, null, 2))
      process.exit(result.valid ? 0 : 1)
    } else {
      // Validate all files
      const validation = await validateAll()
      printReport(validation)
      process.exit(validation.failCount > 0 ? 1 : 0)
    }
  } catch (error) {
    console.error('Error running content validation:', error)
    process.exit(1)
  }
}

main()

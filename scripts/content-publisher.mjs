#!/usr/bin/env node
/**
 * Content Publisher Validation
 *
 * Pre-publish validation gate for AI-first content.
 * Checks frontmatter, AI-first fields, FAQ presence, and links.
 *
 * Usage:
 *   npm run content:validate
 *   npm run content:validate -- --strict
 *   npm run content:validate -- content/blog/some-post.mdx
 */

import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'

const REQUIRED_FIELDS = ['title', 'description', 'date', 'author']
const AI_FIRST_FIELDS = ['tldr', 'faq', 'keywords']
const MIN_FAQ_COUNT = 5
const MIN_INTERNAL_LINKS = 3
const MAX_DESCRIPTION_LENGTH = 155
const TLDR_WORD_RANGE = { min: 40, max: 60 }

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return []
    }

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }

    return trimmed
      .split(',')
      .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return []
}

function normalizeFrontmatter(data) {
  const seo = data.seo && typeof data.seo === 'object' ? data.seo : {}

  return {
    ...data,
    title: data.title || '',
    description: data.description || data.excerpt || data.summary || '',
    date: data.date || data.publishedAt || data.published_at || '',
    author: data.author || (Array.isArray(data.authors) ? data.authors[0] : data.authors) || '',
    tldr: data.tldr || data.tlDr || data['tl;dr'] || '',
    faq: Array.isArray(data.faq) ? data.faq : Array.isArray(seo.faq) ? seo.faq : [],
    keywords: toArray(data.keywords || seo.keywords),
    schema: data.schema || seo.schema || '',
  }
}

function parseFrontmatter(content) {
  try {
    const parsed = matter(content)
    const rawMatter = parsed.matter || ''

    if (!rawMatter.trim()) {
      return null
    }

    return {
      frontmatter: normalizeFrontmatter(parsed.data || {}),
      body: parsed.content || '',
    }
  } catch {
    return null
  }
}

function countInternalLinks(body) {
  const linkPattern = /\[[^\]]+\]\(\/[^)]+\)/g
  const matches = body.match(linkPattern) || []
  return matches.length
}

function hasFAQSection(body) {
  return /##\s*(faq|frequently asked questions?)/i.test(body)
}

function countFAQInBody(body) {
  const faqMatch = body.match(/##\s*(faq|frequently asked questions?)[\s\S]*?(?=\n##\s+|$)/i)
  if (!faqMatch) {
    return 0
  }

  const h3Pattern = /###\s+.+/g
  const matches = faqMatch[0].match(h3Pattern) || []
  return matches.length
}

async function validateFile(filepath) {
  const content = await fs.readFile(filepath, 'utf-8')
  const parsed = parseFrontmatter(content)

  const results = {
    file: path.basename(filepath),
    path: filepath,
    valid: true,
    errors: [],
    warnings: [],
    stats: {},
  }

  if (!parsed) {
    results.valid = false
    results.errors.push('Missing or invalid frontmatter')
    return results
  }

  const { frontmatter, body } = parsed

  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      results.valid = false
      results.errors.push(`Missing required field: ${field}`)
    }
  }

  for (const field of AI_FIRST_FIELDS) {
    if (!frontmatter[field] || (Array.isArray(frontmatter[field]) && frontmatter[field].length === 0)) {
      results.warnings.push(`Missing AI-first field: ${field}`)
    }
  }

  if (frontmatter.description && frontmatter.description.length > MAX_DESCRIPTION_LENGTH) {
    results.warnings.push(
      `Description too long: ${frontmatter.description.length} chars (max ${MAX_DESCRIPTION_LENGTH})`
    )
  }

  if (frontmatter.tldr) {
    const wordCount = String(frontmatter.tldr)
      .trim()
      .split(/\s+/)
      .filter(Boolean).length
    results.stats.tldrWordCount = wordCount

    if (wordCount < TLDR_WORD_RANGE.min || wordCount > TLDR_WORD_RANGE.max) {
      results.warnings.push(
        `TL;DR word count ${wordCount} outside range (${TLDR_WORD_RANGE.min}-${TLDR_WORD_RANGE.max})`
      )
    }
  }

  const faqCount = Array.isArray(frontmatter.faq) ? frontmatter.faq.length : 0
  results.stats.faqCountFrontmatter = faqCount
  if (faqCount < MIN_FAQ_COUNT) {
    results.warnings.push(`FAQ count in frontmatter: ${faqCount} (minimum ${MIN_FAQ_COUNT})`)
  }

  if (!hasFAQSection(body)) {
    results.warnings.push('No FAQ section found in body')
  } else {
    results.stats.faqCountBody = countFAQInBody(body)
  }

  const linkCount = countInternalLinks(body)
  results.stats.internalLinks = linkCount
  if (linkCount < MIN_INTERNAL_LINKS) {
    results.warnings.push(`Internal links: ${linkCount} (minimum ${MIN_INTERNAL_LINKS})`)
  }

  if (!frontmatter.schema) {
    results.warnings.push('No schema specified - defaulting to Article only')
  }

  results.stats.keywordCount = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.length : 0
  results.valid = results.errors.length === 0

  return results
}

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
      failCount += 1
    } else if (result.warnings.length > 0) {
      warnCount += 1
    } else {
      passCount += 1
    }
  }

  return { results: allResults, passCount, warnCount, failCount }
}

function printReport(validation) {
  console.log('════════════════════════════════════════════════════════')
  console.log('  CONTENT VALIDATION REPORT')
  console.log('════════════════════════════════════════════════════════\n')

  console.log(`  PASS: ${validation.passCount}`)
  console.log(`  WARN: ${validation.warnCount}`)
  console.log(`  FAIL: ${validation.failCount}`)
  console.log('')

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

  console.log('────────────────────────────────────────────────────────')
  console.log('  CONTENT STATS SUMMARY')
  console.log('────────────────────────────────────────────────────────')

  const withTldr = validation.results.filter((r) => r.stats.tldrWordCount).length
  const avgLinks =
    validation.results.reduce((sum, r) => sum + (r.stats.internalLinks || 0), 0) /
    Math.max(validation.results.length, 1)

  console.log(`  Articles with TL;DR: ${withTldr}/${validation.results.length}`)
  console.log(`  Average internal links: ${avgLinks.toFixed(1)}`)
  console.log('')

  console.log('════════════════════════════════════════════════════════\n')
}

function resolveFileArg(fileArg) {
  if (!fileArg) {
    return null
  }

  const directPath = path.resolve(process.cwd(), fileArg)
  return directPath
}

async function main() {
  const args = process.argv.slice(2)
  const strict = args.includes('--strict')
  const fileArg = args.find((arg) => !arg.startsWith('--'))

  try {
    if (fileArg) {
      const filePath = resolveFileArg(fileArg)
      const result = await validateFile(filePath)
      console.log(JSON.stringify(result, null, 2))
      const hasWarnings = result.warnings.length > 0
      process.exit(result.valid && (!strict || !hasWarnings) ? 0 : 1)
      return
    }

    const validation = await validateAll()
    printReport(validation)

    const shouldFail = validation.failCount > 0 || (strict && validation.warnCount > 0)
    process.exit(shouldFail ? 1 : 0)
  } catch (error) {
    console.error('Error running content validation:', error)
    process.exit(1)
  }
}

main()

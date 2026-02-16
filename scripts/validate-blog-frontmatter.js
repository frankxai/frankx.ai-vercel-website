#!/usr/bin/env node
/**
 * FrankX Blog Frontmatter Validator
 *
 * Validates all blog posts against the content schema.
 * Run: node scripts/validate-blog-frontmatter.js
 *
 * No external dependencies required.
 */

const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// Approved categories (from CONTENT_SCHEMA.md)
const VALID_CATEGORIES = [
  'Creator Systems',
  'Vibe Sessions',
  'Intelligence Dispatches',
  'Consciousness',
  'Flagship'
]

// Required fields
const REQUIRED_FIELDS = ['title', 'description', 'date', 'category']

// Field validation rules
const FIELD_RULES = {
  title: { maxLength: 80 },
  description: { maxLength: 200 },
  date: { pattern: /^\d{4}-\d{2}-\d{2}$/ },
  category: { enum: VALID_CATEGORIES }
}

/**
 * Parse YAML frontmatter from MDX content (simple parser)
 */
function parseFrontmatter(content) {
  // Normalize line endings (Windows CRLF -> LF)
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yaml = match[1]
  const result = {}

  // Parse YAML line by line
  const lines = yaml.split('\n')
  let currentKey = null
  let isArray = false

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue

    // Check for array item
    if (line.match(/^\s+-\s/)) {
      if (currentKey && isArray) {
        const value = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '').trim()
        if (value) {
          if (!result[currentKey]) result[currentKey] = []
          result[currentKey].push(value)
        }
      }
      continue
    }

    // Check for key: value
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      currentKey = kvMatch[1]
      let value = kvMatch[2].trim()

      // Check if value is an inline array
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          result[currentKey] = JSON.parse(value.replace(/'/g, '"'))
        } catch {
          result[currentKey] = value
        }
        isArray = false
      } else if (value === '' || value === '>') {
        // Empty value might indicate an array follows
        isArray = true
      } else {
        // Clean quotes from value
        value = value.replace(/^["']|["']$/g, '')

        // Convert booleans
        if (value === 'true') value = true
        else if (value === 'false') value = false

        result[currentKey] = value
        isArray = false
      }
    }
  }

  return result
}

function validatePost(filePath) {
  const errors = []
  const warnings = []
  const fileName = path.basename(filePath)

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const frontmatter = parseFrontmatter(content)

    if (!frontmatter) {
      errors.push('No frontmatter found')
      return { fileName, errors, warnings }
    }

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!frontmatter[field]) {
        errors.push(`Missing required field: ${field}`)
      }
    }

    // Validate each field
    for (const [field, value] of Object.entries(frontmatter)) {
      const rules = FIELD_RULES[field]
      if (!rules) continue

      // Max length check
      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        warnings.push(`${field} exceeds ${rules.maxLength} chars (${value.length})`)
      }

      // Pattern check
      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push(`${field} doesn't match expected format (YYYY-MM-DD)`)
      }

      // Enum check
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${field} "${value}" is not valid. Use: ${rules.enum.join(', ')}`)
      }
    }

    // Additional checks
    if (!frontmatter.image) {
      warnings.push('No hero image specified')
    }

    if (!frontmatter.readingGoal) {
      warnings.push('No readingGoal specified (recommended for UX)')
    }

    if (frontmatter.tags && Array.isArray(frontmatter.tags) && frontmatter.tags.length > 7) {
      warnings.push(`Too many tags (${frontmatter.tags.length}, max 7)`)
    }

  } catch (error) {
    errors.push(`Parse error: ${error.message}`)
  }

  return { fileName, errors, warnings }
}

function main() {
  console.log('\n=== FrankX Blog Frontmatter Validator ===\n')
  console.log('Categories: ' + VALID_CATEGORIES.join(' | ') + '\n')

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(BLOG_DIR, f))

  let totalErrors = 0
  let totalWarnings = 0
  const results = []

  for (const file of files) {
    const result = validatePost(file)
    results.push(result)
    totalErrors += result.errors.length
    totalWarnings += result.warnings.length
  }

  // Print results
  for (const { fileName, errors, warnings } of results) {
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`${fileName}`)
      for (const error of errors) {
        console.log(`  \x1b[31m[ERROR]\x1b[0m ${error}`)
      }
      for (const warning of warnings) {
        console.log(`  \x1b[33m[WARN]\x1b[0m ${warning}`)
      }
      console.log('')
    }
  }

  // Summary
  console.log('--- Summary ---')
  console.log(`Files checked: ${files.length}`)
  console.log(`Errors: ${totalErrors}`)
  console.log(`Warnings: ${totalWarnings}`)

  if (totalErrors === 0) {
    console.log('\n\x1b[32m All posts pass validation!\x1b[0m\n')
  } else {
    console.log('\n\x1b[31m Fix errors above before publishing.\x1b[0m\n')
    process.exit(1)
  }
}

main()

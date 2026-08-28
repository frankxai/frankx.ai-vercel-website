#!/usr/bin/env node
/**
 * Schema Generator
 *
 * Extracts FAQ from MDX content and generates JSON-LD schema files.
 * Output: data/schemas/[slug]-schema.json
 *
 * Usage: npm run schema:generate [optional-file-path]
 */

import fs from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'

const SITE_URL = 'https://frankx.ai'
const SITE_NAME = 'FrankX.AI'
const SITE_LOGO = 'https://frankx.ai/logo.png'
const AUTHOR_NAME = 'Frank Villanueva'
const AUTHOR_URL = 'https://frankx.ai/about'

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const yaml = match[1]
  const frontmatter = {}
  const lines = yaml.split('\n')

  const unquote = (value) => value.trim().replace(/^["']|["']$/g, '')

  for (let index = 0; index < lines.length; index += 1) {
    const topLevel = lines[index].match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!topLevel) continue

    const [, key, rawValue] = topLevel
    const value = rawValue.trim()

    if (key === 'faq' && value === '') {
      const faqs = []
      let currentFAQ = null

      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1
        const question = lines[index].match(/^\s{2}- q:\s*(.+)$/)
        const answer = lines[index].match(/^\s{4}a:\s*(.+)$/)

        if (question) {
          currentFAQ = { q: unquote(question[1]) }
          faqs.push(currentFAQ)
        } else if (answer && currentFAQ) {
          currentFAQ.a = unquote(answer[1])
        }
      }

      frontmatter.faq = faqs
    } else if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value.slice(1, -1).split(',').map((entry) => unquote(entry))
    } else if (value && value !== '|') {
      frontmatter[key] = unquote(value)
    }
  }

  return frontmatter
}

export function normalizeFAQText(value) {
  return String(value || '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`+([^`]+)`+/g, '$1')
    .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/(^|\s)[*-]\s+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractFAQFromBody(content) {
  const body = content.replace(/^---[\s\S]*?---/, '')
  const faqMatch = body.match(/(?:^|\n)## (?:FAQ|Frequently Asked[^\n]*)\n([\s\S]*?)(?=\n## [^#]|\n---\n|$)/i)
  if (!faqMatch) return []

  const faqs = []
  const faqSection = faqMatch[1]
  const pattern = /### (.+?)\n\n([\s\S]*?)(?=\n### |\n## |$)/g
  let match

  while ((match = pattern.exec(faqSection)) !== null) {
    const question = normalizeFAQText(match[1])
    const answer = normalizeFAQText(match[2].trim().split('\n').filter((line) => line.trim() && !line.startsWith('#')).join(' '))
    if (question && answer) faqs.push({ question, answer })
  }

  return faqs
}

function buildArticleSchema(frontmatter, slug) {
  const schema = {
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    url: SITE_URL + '/blog/' + slug,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastUpdated || frontmatter.date,
    author: { '@type': 'Person', name: frontmatter.author || AUTHOR_NAME, url: AUTHOR_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: SITE_LOGO } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + '/blog/' + slug },
  }

  if (frontmatter.image) {
    schema.image = { '@type': 'ImageObject', url: frontmatter.image.startsWith('http') ? frontmatter.image : SITE_URL + frontmatter.image }
  }
  if (frontmatter.keywords) {
    schema.keywords = Array.isArray(frontmatter.keywords) ? frontmatter.keywords.join(', ') : frontmatter.keywords
  }
  if (frontmatter.tldr) schema.abstract = frontmatter.tldr

  return schema
}

function buildFAQSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer || faq.a },
    })),
  }
}

function buildSchemaGraph(frontmatter, faqs, slug) {
  const schemas = [buildArticleSchema(frontmatter, slug)]
  if (faqs.length > 0) schemas.push(buildFAQSchema(faqs))
  return { '@context': 'https://schema.org', '@graph': schemas }
}

export async function generateSchemaForFile(filepath) {
  const content = await fs.readFile(filepath, 'utf-8')
  const frontmatter = parseFrontmatter(content)
  if (!frontmatter) return null

  const slug = path.basename(filepath, '.mdx')
  const bodyFaqs = extractFAQFromBody(content)
  const frontmatterFaqs = (Array.isArray(frontmatter.faq) ? frontmatter.faq : [])
    .map((faq) => ({
      question: normalizeFAQText(faq.question || faq.q),
      answer: normalizeFAQText(faq.answer || faq.a),
    }))
    .filter((faq) => faq.question && faq.answer)

  // Visible body FAQs are canonical whenever present. This keeps generated
  // JSON-LD identical to the live blog route and prevents two drifting copies
  // from being merged into duplicate questions. Frontmatter remains a fallback
  // for legacy documents that do not render an FAQ section.
  const sourceFaqs = bodyFaqs.length > 0 ? bodyFaqs : frontmatterFaqs
  const seen = new Set()
  const allFaqs = []
  for (const faq of sourceFaqs) {
    const key = faq.question.toLocaleLowerCase('en-US')
    if (seen.has(key)) {
      throw new Error(`${filepath}: duplicate FAQ question after normalization: ${faq.question}`)
    }
    seen.add(key)
    allFaqs.push(faq)
  }

  return { slug, schema: buildSchemaGraph(frontmatter, allFaqs, slug), stats: { faqCount: allFaqs.length, hasImage: !!frontmatter.image, hasTldr: !!frontmatter.tldr } }
}

async function saveSchema(slug, schema) {
  const schemaDir = path.join(process.cwd(), 'data', 'schemas')
  await fs.mkdir(schemaDir, { recursive: true })
  const filepath = path.join(schemaDir, slug + '-schema.json')
  await fs.writeFile(filepath, JSON.stringify(schema, null, 2))
  return filepath
}

async function generateAll() {
  const { glob } = await import('glob')
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = await glob(blogDir + '/**/*.mdx')
  console.log('\nGenerating schemas for ' + files.length + ' MDX files...\n')

  let successCount = 0, skipCount = 0
  const stats = { totalFaqs: 0, withTldr: 0, withImage: 0 }

  for (const file of files) {
    const result = await generateSchemaForFile(file)
    if (result) {
      await saveSchema(result.slug, result.schema)
      console.log('  + ' + result.slug + ' (' + result.stats.faqCount + ' FAQs)')
      successCount++
      stats.totalFaqs += result.stats.faqCount
      if (result.stats.hasTldr) stats.withTldr++
      if (result.stats.hasImage) stats.withImage++
    } else {
      skipCount++
    }
  }

  return { successCount, skipCount, stats }
}

function printSummary(results) {
  console.log('\n========================================================')
  console.log('  SCHEMA GENERATION COMPLETE')
  console.log('========================================================\n')
  console.log('  Generated: ' + results.successCount)
  console.log('  Skipped: ' + results.skipCount)
  console.log('  Total FAQs: ' + results.stats.totalFaqs)
  console.log('  With TL;DR: ' + results.stats.withTldr)
  console.log('  With image: ' + results.stats.withImage)
  console.log('\n========================================================\n')
}

async function main() {
  const specificFile = process.argv[2]
  try {
    if (specificFile) {
      const result = await generateSchemaForFile(specificFile)
      if (result) {
        const filepath = await saveSchema(result.slug, result.schema)
        console.log('Schema saved to: ' + filepath)
      }
    } else {
      const results = await generateAll()
      printSummary(results)
    }
  } catch (error) {
    console.error('Error generating schemas:', error)
    process.exit(1)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}

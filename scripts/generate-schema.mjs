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
import { glob } from 'glob'

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
  let currentKey = null
  let currentArray = null

  for (const line of lines) {
    if (line.trim().startsWith('- ') && currentKey) {
      const value = line.trim().slice(2)
      if (!frontmatter[currentKey]) frontmatter[currentKey] = []

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

    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()

      if (value === '' || value === '|') {
        currentKey = key
        frontmatter[key] = []
      } else if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key] = value.slice(1, -1).split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''))
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

function extractFAQFromBody(content) {
  const body = content.replace(/^---[\s\S]*?---/, '')
  const faqMatch = body.match(/##\s*FAQ[\s\S]*?(?=##[^#]|$)/i)
  if (!faqMatch) return []

  const faqs = []
  const faqSection = faqMatch[0]
  const pattern = /###\s*(.+?)\n+([\s\S]*?)(?=###|$)/g
  let match

  while ((match = pattern.exec(faqSection)) !== null) {
    const question = match[1].trim()
    const answer = match[2].trim().split('\n').filter((line) => line.trim() && !line.startsWith('#')).join(' ').trim()
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

async function generateSchemaForFile(filepath) {
  const content = await fs.readFile(filepath, 'utf-8')
  const frontmatter = parseFrontmatter(content)
  if (!frontmatter) return null

  const slug = path.basename(filepath, '.mdx')
  const frontmatterFaqs = Array.isArray(frontmatter.faq) ? frontmatter.faq : []
  const bodyFaqs = extractFAQFromBody(content)

  const allFaqs = [...frontmatterFaqs]
  for (const bodyFaq of bodyFaqs) {
    const exists = allFaqs.some((f) => (f.question || f.q).toLowerCase().trim() === bodyFaq.question.toLowerCase().trim())
    if (!exists) allFaqs.push({ question: bodyFaq.question, answer: bodyFaq.answer })
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

main()

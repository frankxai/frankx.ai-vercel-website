/**
 * Content Index Generator
 * Scans all content sources and builds a unified content registry.
 * Run: node scripts/generate-content-index.mjs
 * Auto-runs in prebuild alongside vault-manifest scanner.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, basename } from 'path'

const ROOT = process.cwd()
const BLOG_DIR = join(ROOT, 'content/blog')
const DATA_DIR = join(ROOT, 'data')
const OUTPUT = join(DATA_DIR, 'content-index.json')

// Stream assignment rules — matches tags/categories to newsletter streams
const STREAM_RULES = {
  'ai-architect': (entry) =>
    entry.category?.toLowerCase() === 'ai-architecture' ||
    entry.category?.toLowerCase() === 'development' ||
    entry.tags?.some((t) =>
      ['claude-code', 'acos', 'agents', 'oracle', 'llm', 'ai-architecture', 'agentic'].includes(
        t.toLowerCase()
      )
    ),

  'music-lab': (entry) =>
    entry.type === 'music' ||
    entry.category?.toLowerCase() === 'music' ||
    entry.tags?.some((t) =>
      ['suno', 'music-production', 'ai-music', 'music', 'audio'].includes(t.toLowerCase())
    ),

  arcanea: (entry) =>
    (entry.type === 'book-chapter' && entry.book?.startsWith('arcanea')) ||
    entry.tags?.some((t) =>
      ['arcanea', 'gates', 'worldbuilding', 'mythology'].includes(t.toLowerCase())
    ),

  investor: (entry) =>
    entry.category?.toLowerCase() === 'investing' ||
    entry.tags?.some((t) =>
      ['investing', 'crypto', 'portfolio', 'finance', 'market-analysis'].includes(t.toLowerCase())
    ),

  'creation-chronicles': () => true, // Everything goes to main stream
}

/**
 * Parse YAML-like frontmatter from MDX files
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const fm = {}
  const lines = match[1].split('\n')
  let currentKey = null
  let inArray = false
  let arrayItems = []

  for (const line of lines) {
    // Array item
    if (inArray && /^\s+-\s+/.test(line) || inArray && /^\s+"/.test(line)) {
      const val = line.replace(/^\s+-\s+/, '').replace(/^[\s"]+|["',\s]+$/g, '')
      if (val) arrayItems.push(val)
      continue
    }

    // Close array if we hit a new key
    if (inArray && /^\w/.test(line)) {
      fm[currentKey] = arrayItems
      inArray = false
      arrayItems = []
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/)
    if (kvMatch) {
      const key = kvMatch[1]
      const val = kvMatch[2].trim()

      if (val === '' || val === '[') {
        // Multiline array or empty
        currentKey = key
        inArray = true
        arrayItems = []
        continue
      }

      // Inline array: ["tag1", "tag2"]
      if (val.startsWith('[') && val.endsWith(']')) {
        fm[key] = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean)
        continue
      }

      // Boolean
      if (val === 'true') { fm[key] = true; continue }
      if (val === 'false') { fm[key] = false; continue }

      // String (strip quotes)
      fm[key] = val.replace(/^["']|["']$/g, '')
      currentKey = key
    }
  }

  // Close final array
  if (inArray && currentKey) {
    fm[currentKey] = arrayItems
  }

  return fm
}

/**
 * Scan blog MDX files
 */
function scanBlog() {
  if (!existsSync(BLOG_DIR)) return []

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  const entries = []

  for (const file of files) {
    const content = readFileSync(join(BLOG_DIR, file), 'utf-8')
    const fm = parseFrontmatter(content)
    if (!fm || !fm.title) continue

    const slug = basename(file, '.mdx')
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 250)

    entries.push({
      id: `blog-${slug}`,
      type: 'blog',
      title: fm.title,
      slug,
      href: `/blog/${slug}`,
      publishedAt: fm.date || fm.datePublished || null,
      category: fm.category || null,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      featured: fm.featured === true,
      image: fm.image || null,
      description: fm.description || null,
      streams: [],
      metrics: { wordCount, readTime },
    })
  }

  return entries
}

/**
 * Scan product data files
 */
function scanProducts() {
  const entries = []

  // Templates
  const templatesFile = join(DATA_DIR, 'templates.json')
  if (existsSync(templatesFile)) {
    try {
      const data = JSON.parse(readFileSync(templatesFile, 'utf-8'))
      const products = data.products || data
      if (Array.isArray(products)) {
        for (const p of products) {
          entries.push({
            id: `product-${p.id || p.slug}`,
            type: 'product',
            title: p.name || p.title,
            slug: p.slug || p.id,
            href: p.href || `/shop/templates/${p.slug || p.id}`,
            publishedAt: p.createdAt || null,
            category: 'templates',
            tags: p.tags || [],
            streams: ['creation-chronicles'],
            metrics: {},
          })
        }
      }
    } catch { /* skip malformed */ }
  }

  // Investor products
  const investorFile = join(DATA_DIR, 'investor-products.json')
  if (existsSync(investorFile)) {
    try {
      const data = JSON.parse(readFileSync(investorFile, 'utf-8'))
      const products = data.products || data
      if (Array.isArray(products)) {
        for (const p of products) {
          entries.push({
            id: `investor-${p.id || p.slug}`,
            type: 'product',
            title: p.name || p.title,
            slug: p.slug || p.id,
            href: p.href || `/investor/${p.category}`,
            publishedAt: p.createdAt || null,
            category: 'investor',
            tags: ['investing', ...(p.tags || [])],
            streams: ['investor', 'creation-chronicles'],
            metrics: {},
          })
        }
      }
    } catch { /* skip */ }
  }

  return entries
}

/**
 * Assign streams to entries based on tag rules
 */
function assignStreams(entries) {
  for (const entry of entries) {
    if (entry.streams && entry.streams.length > 0) continue // Already assigned

    const streams = []
    for (const [streamId, rule] of Object.entries(STREAM_RULES)) {
      if (rule(entry)) {
        streams.push(streamId)
      }
    }
    entry.streams = streams
  }
  return entries
}

/**
 * Cross-link related entries by shared tags
 */
function crossLink(entries) {
  for (const entry of entries) {
    entry.crossLinks = []
    if (!entry.tags || entry.tags.length === 0) continue

    for (const other of entries) {
      if (other.id === entry.id) continue
      if (!other.tags || other.tags.length === 0) continue

      const shared = entry.tags.filter((t) => other.tags.includes(t))
      if (shared.length >= 2) {
        entry.crossLinks.push(other.id)
      }
    }

    // Limit to top 5 related
    entry.crossLinks = entry.crossLinks.slice(0, 5)
  }
  return entries
}

// Main
const blogEntries = scanBlog()
const productEntries = scanProducts()
let allEntries = [...blogEntries, ...productEntries]

allEntries = assignStreams(allEntries)
allEntries = crossLink(allEntries)

// Sort by date (newest first)
allEntries.sort((a, b) => {
  if (!a.publishedAt) return 1
  if (!b.publishedAt) return -1
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
})

// Stream statistics
const streamStats = {}
for (const [streamId] of Object.entries(STREAM_RULES)) {
  streamStats[streamId] = allEntries.filter((e) => e.streams.includes(streamId)).length
}

const index = {
  version: '1.0',
  generatedAt: new Date().toISOString(),
  stats: {
    total: allEntries.length,
    blog: blogEntries.length,
    products: productEntries.length,
    byStream: streamStats,
  },
  entries: allEntries,
}

writeFileSync(OUTPUT, JSON.stringify(index, null, 2))
console.log(`Content index generated: ${allEntries.length} entries`)
console.log(`  Blog: ${blogEntries.length} | Products: ${productEntries.length}`)
console.log(`  Streams: ${JSON.stringify(streamStats)}`)

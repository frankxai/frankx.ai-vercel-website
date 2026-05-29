#!/usr/bin/env node
/**
 * build-rag-index.mjs — populate the Upstash Vector index for Studio Crew RAG.
 *
 * Chunks the full body of every blog post + every catalog entry
 * (products, workshops, guides, routes) and upserts them to Upstash Vector,
 * which embeds the text server-side with its built-in model.
 *
 * Usage:
 *   UPSTASH_VECTOR_REST_URL=... UPSTASH_VECTOR_REST_TOKEN=... node scripts/ai/build-rag-index.mjs
 *   npm run rag:index
 *
 * Re-runnable: each chunk has a stable id (href#n) so re-running upserts
 * (overwrites) rather than duplicates. Run after publishing new content.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { Index } from '@upstash/vector'
import matter from 'gray-matter'

const ROOT = process.cwd()
const BLOG_DIR = join(ROOT, 'content', 'blog')
const CONTENT_INDEX = join(ROOT, 'data', 'content-index.json')
const ROUTE_INDEX = join(ROOT, 'data', 'route-index.json')

const CHUNK_CHARS = 1600
const CHUNK_OVERLAP = 200
const BATCH = 50

const url = process.env.UPSTASH_VECTOR_REST_URL
const token = process.env.UPSTASH_VECTOR_REST_TOKEN
if (!url || !token) {
  console.error(
    '✗ UPSTASH_VECTOR_REST_URL / UPSTASH_VECTOR_REST_TOKEN not set.\n' +
      '  Create an Upstash Vector index with a built-in embedding model\n' +
      '  (e.g. bge-base-en-v1.5 or text-embedding-3-small), then set the env vars.'
  )
  process.exit(1)
}

const index = new Index({ url, token })

/** Split a long string into overlapping chunks at sentence-ish boundaries. */
function chunkText(text) {
  const clean = text.replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim()
  if (clean.length <= CHUNK_CHARS) return clean ? [clean] : []
  const chunks = []
  let start = 0
  while (start < clean.length) {
    let end = Math.min(start + CHUNK_CHARS, clean.length)
    if (end < clean.length) {
      // Prefer to break at a paragraph or sentence boundary near the end.
      const slice = clean.slice(start, end)
      const para = slice.lastIndexOf('\n\n')
      const stop = slice.lastIndexOf('. ')
      const cut = para > CHUNK_CHARS * 0.5 ? para : stop > CHUNK_CHARS * 0.5 ? stop + 1 : -1
      if (cut > 0) end = start + cut
    }
    chunks.push(clean.slice(start, end).trim())
    if (end >= clean.length) break
    start = end - CHUNK_OVERLAP
  }
  return chunks.filter(Boolean)
}

/** Strip MDX frontmatter + the noisiest markup so embeddings see prose. */
function mdxToProse(raw) {
  const { content } = matter(raw)
  return content
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/<[^>]+>/g, ' ') // JSX/HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/[#>*_`]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
}

function loadBlogRecords() {
  if (!existsSync(BLOG_DIR)) return []
  const out = []
  for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))) {
    try {
      const raw = readFileSync(join(BLOG_DIR, file), 'utf-8')
      const { data } = matter(raw)
      if (!data.title) continue
      const slug = file.replace(/\.mdx$/, '')
      out.push({
        href: `/blog/${slug}`,
        title: String(data.title),
        type: 'blog',
        prose: mdxToProse(raw),
        description: data.description ? String(data.description) : '',
      })
    } catch {
      /* skip unparseable */
    }
  }
  return out
}

function loadCatalogRecords() {
  const out = []
  const seen = new Set()
  const push = (e, fallbackType) => {
    if (!e?.href || !e?.title || seen.has(e.href)) return
    seen.add(e.href)
    out.push({
      href: String(e.href),
      title: String(e.title),
      type: String(e.type || fallbackType),
      prose: [e.title, e.description, (e.tags || []).join(' ')].filter(Boolean).join('. '),
      description: e.description ? String(e.description) : '',
    })
  }
  try {
    const ci = JSON.parse(readFileSync(CONTENT_INDEX, 'utf-8'))
    for (const e of ci.entries || []) push(e, 'blog')
  } catch {
    /* optional */
  }
  try {
    const ri = JSON.parse(readFileSync(ROUTE_INDEX, 'utf-8'))
    for (const r of ri.routes || []) push(r, 'section')
  } catch {
    /* optional */
  }
  return out
}

async function main() {
  const blog = loadBlogRecords()
  const catalog = loadCatalogRecords()
  // Blog hrefs already in catalog → blog full-body wins (richer).
  const blogHrefs = new Set(blog.map((b) => b.href))
  const catalogOnly = catalog.filter((c) => !blogHrefs.has(c.href))

  const vectors = []
  for (const rec of blog) {
    const chunks = chunkText(rec.prose)
    chunks.forEach((text, i) => {
      vectors.push({
        id: `${rec.href}#${i}`,
        data: `${rec.title}\n\n${text}`,
        metadata: { title: rec.title, href: rec.href, type: rec.type, text: text.slice(0, 500) },
      })
    })
  }
  for (const rec of catalogOnly) {
    vectors.push({
      id: `${rec.href}#0`,
      data: `${rec.title}\n\n${rec.prose}`,
      metadata: {
        title: rec.title,
        href: rec.href,
        type: rec.type,
        text: (rec.description || rec.prose).slice(0, 500),
      },
    })
  }

  console.log(
    `Indexing ${vectors.length} chunks (${blog.length} blog posts + ${catalogOnly.length} catalog entries)…`
  )

  let done = 0
  for (let i = 0; i < vectors.length; i += BATCH) {
    const batch = vectors.slice(i, i + BATCH)
    await index.upsert(batch)
    done += batch.length
    process.stdout.write(`\r  upserted ${done}/${vectors.length}`)
  }
  process.stdout.write('\n')
  console.log('✓ RAG index built.')
}

main().catch((err) => {
  console.error('✗ build-rag-index failed:', err)
  process.exit(1)
})

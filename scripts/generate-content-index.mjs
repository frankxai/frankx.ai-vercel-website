#!/usr/bin/env node
// Source inventory, not a publication or Google indexing receipt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { isCanonicalBlogSlug } from '../lib/blog-redirects.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function buildContentIndex(root, generatedAt = new Date().toISOString()) {
  const previous = JSON.parse(fs.readFileSync(path.join(root, 'data/content-index.json'), 'utf8'))
  const oldBlogs = new Map(previous.entries.filter(x => x.type === 'blog').map(x => [x.slug, x]))
  const retained = previous.entries.filter(x => x.type !== 'blog')
  const directory = path.join(root, 'content/blog')
  const blogs = fs.readdirSync(directory, { withFileTypes: true })
    .filter(x => x.isFile() && x.name.endsWith('.mdx'))
    .map(x => x.name.slice(0, -4)).filter(isCanonicalBlogSlug).sort()
    .map(slug => {
      const { data, content } = matter(fs.readFileSync(path.join(directory, `${slug}.mdx`), 'utf8'))
      const description = data.description || data.excerpt
      const editorialDate = data.date || data.publishedAt
      if (typeof data.title !== 'string' || typeof description !== 'string' || !editorialDate) throw new Error(`Missing source metadata: ${slug}`)
      const prior = oldBlogs.get(slug)
      const timing = readingTime(content)
      return {
        id: prior?.id || `blog-${slug}`,
        ...(data.content_id ? { contentId: data.content_id } : {}),
        type: 'blog', title: data.title, slug, href: `/blog/${slug}`,
        // Historical field name; the author date is not a deployment receipt.
        publishedAt: editorialDate instanceof Date ? editorialDate.toISOString().slice(0, 10) : String(editorialDate),
        category: data.category || '', tags: Array.isArray(data.tags) ? data.tags : [],
        featured: data.featured === true,
        ...(typeof data.image === 'string' ? { image: data.image } : {}),
        description, streams: prior?.streams || ['creation-chronicles'],
        metrics: { wordCount: timing.words, readTime: Math.ceil(timing.minutes) },
        crossLinks: prior?.crossLinks || [], sourcePath: `content/blog/${slug}.mdx`,
      }
    })
  const entries = [...blogs, ...retained]
  const byStream = {}
  for (const entry of entries) for (const stream of entry.streams || []) byStream[stream] = (byStream[stream] || 0) + 1
  return {
    ...previous, generatedAt,
    provenance: { kind: 'source_inventory', blogOwner: 'content/blog/*.mdx', publicationVerified: false, indexingVerified: false, retainedNonBlogRecords: retained.length },
    stats: { ...previous.stats, total: entries.length, blog: blogs.length, products: retained.filter(x => x.type === 'product').length, byStream }, entries,
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = buildContentIndex(ROOT)
  fs.writeFileSync(path.join(ROOT, 'data/content-index.json'), `${JSON.stringify(index, null, 2)}\n`)
  console.log(`Content source index: ${index.stats.blog} blog records; ${index.provenance.retainedNonBlogRecords} other records preserved. Publication/indexing unverified.`)
}

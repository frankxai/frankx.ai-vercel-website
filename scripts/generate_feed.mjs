import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const GUIDES_DIR = path.join(ROOT, 'content', 'guides')
const PUBLIC_DIR = path.join(ROOT, 'public')

function readMdxDir(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/i.test(f))
    .map((f) => {
      const full = path.join(dir, f)
      const slug = f.replace(/\.(md|mdx)$/i, '')
      const raw = fs.readFileSync(full, 'utf8')
      const { data, content } = matter(raw)
      const title = data.title || slug
      const date = (data.date ? new Date(data.date) : new Date())
      const description = data.description || content.slice(0, 200).replace(/\s+/g, ' ') + '…'
      return { slug, title, date, description, content }
    })
    .sort((a, b) => b.date - a.date)
}

function dedupeByCanonicalSlug(items) {
  const map = new Map()
  items.forEach((item) => {
    const canonical = item.slug.replace(/^\d+-/, '')
    const existing = map.get(canonical)
    if (!existing || item.slug === canonical) {
      map.set(canonical, item)
    }
  })
  return Array.from(map.values())
}

function escapeXml(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}

function buildRss({ site, items }) {
  const entries = items
    .map((it) => `\n  <item>\n    <title>${escapeXml(it.title)}</title>\n    <link>${site}/${it.path}</link>\n    <guid>${site}/${it.path}</guid>\n    <pubDate>${it.date.toUTCString()}</pubDate>\n    <description>${escapeXml(it.description)}</description>\n  </item>`)
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>FrankX Feed</title>\n  <link>${site}</link>\n  <description>Latest posts and guides</description>${entries}\n</channel>\n</rss>\n`
}

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://frankx.ai'
const blogItems = dedupeByCanonicalSlug(readMdxDir(BLOG_DIR)).map((x) => ({ ...x, path: `blog/${x.slug}` }))
const guideItems = dedupeByCanonicalSlug(readMdxDir(GUIDES_DIR)).map((x) => ({ ...x, path: `guides/${x.slug}` }))
const items = [...blogItems, ...guideItems].slice(0, 50)

fs.mkdirSync(PUBLIC_DIR, { recursive: true })
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), buildRss({ site, items }), 'utf8')
console.log('RSS feed written to public/rss.xml with', items.length, 'items')


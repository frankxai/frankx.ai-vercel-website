import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')

// Import blog posts using the new blog system
// We'll use a simple approach since this is a build script
const BLOG_DIR = process.env.BLOG_CONTENT_PATH || path.join(ROOT, 'content', 'blog')

function scanBlogDirectory(dir, category) {
  const posts = []

  if (!fs.existsSync(dir)) return posts

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const subCategory = category || entry.name
      posts.push(...scanBlogDirectory(fullPath, subCategory))
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      try {
        const slug = entry.name.replace(/\.(md|mdx)$/i, '')
        const raw = fs.readFileSync(fullPath, 'utf8')

        // Simple frontmatter extraction (avoid gray-matter import issues)
        const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
        let title = slug
        let date = new Date()
        let description = ''

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1]
          const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?$/m)
          const dateMatch = frontmatter.match(/^(?:date|publishDate):\s*["']?(.+?)["']?$/m)
          const descMatch = frontmatter.match(/^(?:description|summary|excerpt):\s*["']?(.+?)["']?$/m)

          if (titleMatch) title = titleMatch[1]
          if (dateMatch) date = new Date(dateMatch[1])
          if (descMatch) description = descMatch[1]
        }

        if (!description) {
          const content = raw.replace(/^---[\s\S]*?---\n/, '')
          description = content.slice(0, 200).replace(/\s+/g, ' ').trim() + '…'
        }

        posts.push({ slug, title, date, description, category })
      } catch (err) {
        console.warn(`Failed to read ${fullPath}:`, err.message)
      }
    }
  }

  return posts
}

function readMdxDir() {
  const posts = scanBlogDirectory(BLOG_DIR)
  return posts.sort((a, b) => b.date - a.date)
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

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const blogItems = readMdxDir().map((x) => ({ ...x, path: `blog/${x.slug}` }))
const items = [...blogItems].slice(0, 50)

fs.mkdirSync(PUBLIC_DIR, { recursive: true })
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), buildRss({ site, items }), 'utf8')
console.log('RSS feed written to public/rss.xml with', items.length, 'items')


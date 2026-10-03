import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

export const HERO_WARN_BYTES = 2 * 1024 * 1024

const EXTERNAL = /^https?:\/\//

export function loadHeroAllowlist(root) {
  const file = join(root, 'scripts', 'hero-byte-allowlist.json')
  if (!existsSync(file)) return new Set()
  const parsed = JSON.parse(readFileSync(file, 'utf8'))
  if (!Array.isArray(parsed) || parsed.some((slug) => typeof slug !== 'string' || slug.length === 0)) {
    throw new Error('scripts/hero-byte-allowlist.json must be an array of slug strings')
  }
  return new Set(parsed)
}

function walkMdx(dir, out) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) walkMdx(abs, out)
    else if (entry.endsWith('.mdx')) out.push(abs)
  }
}

export function readFrontmatterImage(text) {
  const lines = text.split('\n')
  if (lines[0]?.trim() !== '---') return null
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') break
    const match = lines[i].match(/^image:\s*(.+)$/)
    if (!match) continue
    return { image: match[1].trim().replace(/^['"]|['"]$/g, ''), line: i + 1 }
  }
  return null
}

export function resolveHeroFile(root, image) {
  if (!image || EXTERNAL.test(image)) return null
  const rel = image.replace(/^\/+/, '')
  if (!rel || rel.includes('\0')) return null
  const pub = resolve(root, 'public')
  const abs = resolve(pub, rel)
  if (abs !== pub && !abs.startsWith(pub + sep)) return null
  return abs
}

export function findSharedHeroes(root, allowlist) {
  const violations = []
  const warnings = []
  const blog = join(root, 'content', 'blog')
  if (!existsSync(blog)) return { violations, warnings }

  const files = []
  walkMdx(blog, files)
  const hashByPath = new Map()
  const postsByHash = new Map()

  for (const file of files) {
    const found = readFrontmatterImage(readFileSync(file, 'utf8'))
    if (!found) continue
    const abs = resolveHeroFile(root, found.image)
    if (!abs || !existsSync(abs)) continue

    let hashed = hashByPath.get(abs)
    if (!hashed) {
      const buf = readFileSync(abs)
      hashed = {
        hash: createHash('sha256').update(buf).digest('hex'),
        bytes: buf.length,
      }
      hashByPath.set(abs, hashed)
    }

    const slug = relative(blog, file).replace(/\\/g, '/').replace(/\.mdx$/, '')
    const post = {
      file: relative(root, file).replace(/\\/g, '/'),
      line: found.line,
      slug,
      text: found.image,
    }
    if (hashed.bytes > HERO_WARN_BYTES) {
      warnings.push({
        file: post.file,
        line: post.line,
        kind: 'hero-over-2mb',
        detail: `hero is ${hashed.bytes} bytes, over 2 MB`,
        text: post.text,
      })
    }
    if (!postsByHash.has(hashed.hash)) postsByHash.set(hashed.hash, [])
    postsByHash.get(hashed.hash).push(post)
  }

  for (const [hash, posts] of postsByHash) {
    if (posts.length < 2) continue
    if (posts.every((post) => allowlist.has(post.slug))) continue
    violations.push({
      file: posts[0].file,
      line: posts[0].line,
      kind: 'shared-hero-bytes',
      detail: `sha256 ${hash} is shared by ${posts.map((post) => post.file).join(', ')}`,
      text: posts.map((post) => post.slug).join(', '),
    })
  }

  return { violations, warnings }
}

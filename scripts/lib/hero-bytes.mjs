import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import matter from 'gray-matter'
import { isCanonicalBlogSlug } from '../../lib/blog-redirects.mjs'

export const HERO_WARN_BYTES = 2 * 1024 * 1024
export const BLOG_IMAGE_FALLBACK = '/images/blog/editorial/headers/best-ai-tools-for-creators-2026-hero.webp'

// Same category order as resolveBlogImage in lib/blog.ts. A missing or pending
// /images/blog file is served from one of these, so the byte check has to hash
// that served file or two broken posts can share a hero without failing.
const FALLBACK_RULES = [
  [/video|short|youtube|image|photo|camera|canva|capcut|descript|heygen|higgsfield|opus|presentation|gamma/, '/images/blog/generated/ai-image-video-generation-playbook-2026-premium-hero.png'],
  [/claude|chatgpt|gemini|gpt|grok|llm|model|frontier|local/, '/images/blog/editorial/headers/ai-model-routing-guide-hero.webp'],
  [/agent|workflow|automation|n8n|builder|production/, '/images/blog/generated/production-agentic-ai-systems-premium-hero.png'],
  [/code|coding|cursor|windsurf/, '/images/blog/generated/ultimate-guide-ai-coding-agents-2026-premium-hero.png'],
  [/skill|coe|note|knowledge/, '/images/blog/editorial/headers/skill-libraries-ai-coe-governance-hero.webp'],
]

const EXTERNAL = /^https?:\/\//

export function fallbackHeroForSlug(slug) {
  for (const [pattern, image] of FALLBACK_RULES) {
    if (pattern.test(slug)) return image
  }
  return BLOG_IMAGE_FALLBACK
}

export function loadPendingHeroPaths(root) {
  const file = join(root, 'data', 'tools', 'image-needs.json')
  if (!existsSync(file)) return new Set()
  const parsed = JSON.parse(readFileSync(file, 'utf8'))
  const needs = Array.isArray(parsed?.needs) ? parsed.needs : []
  return new Set(
    needs
      .filter((need) => typeof need?.heroPath === 'string' && typeof need?.status === 'string' && need.status.startsWith('pending'))
      .map((need) => need.heroPath),
  )
}

export function loadHeroAllowlist(root) {
  const file = join(root, 'scripts', 'hero-byte-allowlist.json')
  if (!existsSync(file)) return []
  const parsed = JSON.parse(readFileSync(file, 'utf8'))
  if (!Array.isArray(parsed)) {
    throw new Error('scripts/hero-byte-allowlist.json must be an array of slug groups')
  }
  const seen = new Set()
  const groups = []
  for (const group of parsed) {
    if (!Array.isArray(group) || group.length < 2 || group.some((slug) => typeof slug !== 'string' || slug.length === 0)) {
      throw new Error('scripts/hero-byte-allowlist.json groups must be arrays of at least two slugs')
    }
    const unique = new Set(group)
    if (unique.size !== group.length) {
      throw new Error('scripts/hero-byte-allowlist.json group repeats a slug')
    }
    for (const slug of group) {
      if (seen.has(slug)) throw new Error(`scripts/hero-byte-allowlist.json repeats ${slug}`)
      seen.add(slug)
    }
    groups.push(unique)
  }
  return groups
}

function imageLine(text) {
  const lines = text.split('\n')
  if (lines[0]?.trim() !== '---') return 1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') break
    if (/^image:/.test(lines[i])) return i + 1
  }
  return 1
}

export function readFrontmatterImage(text) {
  let data
  try {
    data = matter(text).data
  } catch {
    return null
  }
  if (typeof data?.image !== 'string') return null
  const image = data.image.trim()
  if (!image) return null
  return { image, line: imageLine(text) }
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

export function servedHeroPath(root, image, slug, pending) {
  if (!image || EXTERNAL.test(image) || !image.startsWith('/')) return null
  const pendingSet = pending ?? loadPendingHeroPaths(root)
  const blogScoped = image.startsWith('/images/blog/')
  const declared = resolveHeroFile(root, image)
  const declaredOnDisk = Boolean(declared && existsSync(declared))
  if (!pendingSet.has(image) && (!blogScoped || declaredOnDisk)) {
    return declaredOnDisk ? declared : null
  }
  const fallback = resolveHeroFile(root, fallbackHeroForSlug(slug))
  return fallback && existsSync(fallback) ? fallback : null
}

function coveredByOneGroup(posts, groups) {
  return groups.some((group) => posts.every((post) => group.has(post.slug)))
}

export function findSharedHeroes(root, allowlist = loadHeroAllowlist(root)) {
  const violations = []
  const warnings = []
  const blog = join(root, 'content', 'blog')
  if (!existsSync(blog)) return { violations, warnings }

  const pending = loadPendingHeroPaths(root)
  const hashByPath = new Map()
  const postsByHash = new Map()
  const names = readdirSync(blog).filter((name) => name.endsWith('.mdx'))

  for (const name of names) {
    const file = join(blog, name)
    if (!statSync(file).isFile()) continue
    const slug = name.replace(/\.mdx$/, '')
    if (!isCanonicalBlogSlug(slug)) continue
    const text = readFileSync(file, 'utf8')
    const found = readFrontmatterImage(text)
    if (!found) continue
    const abs = servedHeroPath(root, found.image, slug, pending)
    if (!abs) continue

    let hashed = hashByPath.get(abs)
    if (!hashed) {
      const buf = readFileSync(abs)
      hashed = {
        hash: createHash('sha256').update(buf).digest('hex'),
        bytes: buf.length,
      }
      hashByPath.set(abs, hashed)
    }

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
    if (coveredByOneGroup(posts, allowlist)) continue
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

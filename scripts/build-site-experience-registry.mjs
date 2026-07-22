#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'data', 'site-experience')
const ROUTE_INDEX_PATH = path.join(ROOT, 'data', 'route-index.json')
const PAGE_OVERRIDES_PATH = path.join(DATA_DIR, 'page-experience-overrides.json')
const GUIDE_OVERRIDES_PATH = path.join(DATA_DIR, 'guide-record-overrides.json')
const PAGE_OUTPUT_PATH = path.join(DATA_DIR, 'page-experience-registry.json')
const GUIDE_OUTPUT_PATH = path.join(DATA_DIR, 'guide-registry.json')
const ASSET_OUTPUT_PATH = path.join(DATA_DIR, 'asset-registry.json')

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'))
const writeJson = (filePath, value) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

const routeIndex = readJson(ROUTE_INDEX_PATH)
const pageOverrides = readJson(PAGE_OVERRIDES_PATH)
const guideOverrides = readJson(GUIDE_OVERRIDES_PATH)

const pageRoleFor = (route) => {
  if (route.type === 'guide') return 'guide'
  if (route.type === 'research') return 'research'
  if (route.type === 'blog' || route.type === 'newsletter') return 'story'
  if (route.type === 'product') return 'offer'
  if (route.type === 'partnership') return 'partner'
  if (route.type === 'legacy') return 'archive'
  if (route.type === 'workshop' || route.type === 'tool') return 'experiment'
  if (route.type === 'core' || route.href.split('/').filter(Boolean).length <= 1) return 'hub'
  return 'reference'
}

const hubFor = (href) => {
  if (href === '/') return 'home'
  const segment = href.split('/').filter(Boolean)[0] ?? 'home'
  const aliases = {
    'ai-architecture': 'build',
    developers: 'build',
    courses: 'learn',
    guides: 'learn',
    students: 'learn',
    watch: 'learn',
    books: 'books',
    library: 'library',
    research: 'research',
    music: 'music',
    'music-lab': 'music',
    'music-school': 'music',
    gencreator: 'gencreator',
    'prompt-library': 'gencreator',
    partnerships: 'partnerships',
  }
  return aliases[segment] ?? segment
}

const primaryAudienceFor = (href, role) => {
  if (href.match(/^\/(research|intelligence-atlas|partnerships|media-kit|licensing)/)) return 'researcher_partner'
  if (href.match(/^\/(build|ai-architecture|developers|ai-world|investor|agents)/)) return 'technical_founder'
  if (href.match(/^\/(gencreator|music|music-lab|music-school|studio|design-lab|creation-chronicles)/)) return 'ai_native_creator'
  if (href.match(/^\/(books|library|vibe)/)) return 'personal_development_reader'
  if (href.match(/^\/(learn|guides|courses|students|watch|games)/) || role === 'guide') return 'learner'
  if (role === 'offer') return 'mariah_founder'
  return 'general_explorer'
}

const secondaryAudiencesFor = (primary) => {
  const related = {
    mariah_founder: ['technical_founder', 'ai_native_creator'],
    technical_founder: ['ai_lead', 'mariah_founder'],
    ai_lead: ['technical_founder', 'researcher_partner'],
    ai_native_creator: ['mariah_founder', 'learner'],
    learner: ['mariah_founder', 'ai_native_creator'],
    researcher_partner: ['ai_lead', 'technical_founder'],
    personal_development_reader: ['ai_native_creator', 'general_explorer'],
    general_explorer: ['mariah_founder', 'learner'],
  }
  return related[primary] ?? []
}

const pageRecords = routeIndex.routes
  .map((route) => {
    const pageRole = pageRoleFor(route)
    const primaryAudience = primaryAudienceFor(route.href, pageRole)
    const base = {
      site: 'frankx.ai',
      route: route.href,
      hub: hubFor(route.href),
      pageRole,
      primaryAudience,
      secondaryAudiences: secondaryAudiencesFor(primaryAudience),
      lifecycle: route.type === 'legacy' ? 'archived' : 'published',
      freshness: route.type === 'legacy' ? 'historical' : 'review_required',
      evidence: route.type === 'blog' || route.type === 'newsletter' ? 'editorial' : 'unreviewed',
      copyScore: null,
      assetStatus: 'review_required',
      ctaStatus: pageRole === 'story' || pageRole === 'reference' ? 'not_applicable' : 'review_required',
      owner: 'FrankX editorial',
      lastReview: null,
    }
    return { ...base, ...(pageOverrides[route.href] ?? {}) }
  })
  .sort((a, b) => a.route.localeCompare(b.route))

const indexedRoutes = new Set(pageRecords.map((record) => record.route))
for (const route of Object.keys(pageOverrides)) {
  if (!indexedRoutes.has(route)) {
    throw new Error(`Page experience override has no matching route-index entry: ${route}`)
  }
}

writeJson(PAGE_OUTPUT_PATH, {
  version: '1.0',
  site: 'frankx.ai',
  routeCount: pageRecords.length,
  records: pageRecords,
})

const parseFrontmatterValue = (source, key) => {
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const value = frontmatter.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1]
  return value?.replace(/["']$/, '') ?? null
}

const addDays = (dateString, days) => {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null
  const date = new Date(`${dateString}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

const guideRecords = routeIndex.routes
  .filter((route) => route.type === 'guide')
  .map((route) => {
    const slug = route.href.split('/').filter(Boolean).at(-1)
    const candidatePaths = [
      path.join(ROOT, 'content', 'guides', `${slug}.mdx`),
      path.join(ROOT, 'content', 'guides', `${slug}.md`),
    ]
    const sourcePath = candidatePaths.find((candidate) => fs.existsSync(candidate))
    const source = sourcePath ? fs.readFileSync(sourcePath, 'utf8') : ''
    const reviewedDate = parseFrontmatterValue(source, 'updated') ?? parseFrontmatterValue(source, 'date')
    const primaryAudience = primaryAudienceFor(route.href, 'guide')
    const base = {
      site: 'frankx.ai',
      route: route.href,
      title: parseFrontmatterValue(source, 'title') ?? route.title,
      reviewedDate,
      nextReview: addDays(reviewedDate, 90),
      primarySources: [],
      evidenceLevel: 'review_required',
      supportedAudience: [primaryAudience, ...secondaryAudiencesFor(primaryAudience)],
      relatedGuides: [],
      maintenanceOwner: 'FrankX editorial',
    }
    return { ...base, ...(guideOverrides[route.href] ?? {}) }
  })
  .sort((a, b) => a.route.localeCompare(b.route))

for (const route of Object.keys(guideOverrides)) {
  if (!guideRecords.some((record) => record.route === route)) {
    throw new Error(`Guide override has no matching guide route: ${route}`)
  }
}

writeJson(GUIDE_OUTPUT_PATH, guideRecords)

const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'])
const sourceRoots = ['app', 'components', 'content']
const referencedAssets = new Map()

const walk = (directory) => {
  if (!fs.existsSync(directory)) return
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(entryPath)
      continue
    }
    if (!sourceExtensions.has(path.extname(entry.name).toLowerCase())) continue
    const source = fs.readFileSync(entryPath, 'utf8')
    const relativeConsumer = path.relative(ROOT, entryPath).replaceAll('\\', '/')
    const pattern = /(?<![A-Za-z0-9_-])\/images\/[A-Za-z0-9_./@+-]+\.(?:avif|gif|jpe?g|png|svg|webp)/gi
    for (const match of source.matchAll(pattern)) {
      const assetPath = match[0]
      const consumers = referencedAssets.get(assetPath) ?? new Set()
      consumers.add(relativeConsumer)
      referencedAssets.set(assetPath, consumers)
    }
  }
}

for (const sourceRoot of sourceRoots) walk(path.join(ROOT, sourceRoot))

const imageDimensions = (buffer, extension) => {
  if (extension === '.png' && buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }

  if (extension === '.jpg' || extension === '.jpeg') {
    let offset = 2
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break
      const marker = buffer[offset + 1]
      const length = buffer.readUInt16BE(offset + 2)
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) }
      }
      offset += 2 + length
    }
  }

  if (extension === '.webp' && buffer.length >= 30 && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buffer.toString('ascii', 12, 16)
    if (chunk === 'VP8X') {
      const width = 1 + buffer.readUIntLE(24, 3)
      const height = 1 + buffer.readUIntLE(27, 3)
      return { width, height }
    }
  }

  if (extension === '.svg') {
    const source = buffer.toString('utf8')
    const width = Number(source.match(/\bwidth=["']([\d.]+)/)?.[1])
    const height = Number(source.match(/\bheight=["']([\d.]+)/)?.[1])
    if (width > 0 && height > 0) return { width, height }
    const viewBox = source.match(/\bviewBox=["'][\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/)
    if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) }
  }

  return null
}

const fallbackPath = '/images/brand/default-social.png'
const fallbackExists = fs.existsSync(path.join(ROOT, 'public', fallbackPath.slice(1)))
const assetRecords = [...referencedAssets.entries()]
  .map(([assetPath, consumers]) => {
    const localPath = path.join(ROOT, 'public', assetPath.slice(1))
    const exists = fs.existsSync(localPath)
    const buffer = exists ? fs.readFileSync(localPath) : null
    const consumerList = [...consumers].sort()
    const hasRuntimeBlogFallback =
      !exists && consumerList.every((consumer) => consumer.startsWith('content/blog/'))
    return {
      canonicalSource: assetPath,
      storage: { type: 'local', location: assetPath },
      contentHash: buffer ? `sha256:${crypto.createHash('sha256').update(buffer).digest('hex')}` : null,
      provenance: 'repository_reference',
      rights: 'review_required',
      dimensions: buffer ? imageDimensions(buffer, path.extname(localPath).toLowerCase()) : null,
      fallback: exists
        ? null
        : hasRuntimeBlogFallback
          ? '/images/blog/editorial/headers/best-ai-tools-for-creators-2026-hero.webp'
          : fallbackExists
            ? fallbackPath
            : null,
      renderStatus: exists ? 'verified' : hasRuntimeBlogFallback ? 'fallback' : 'missing',
      consumers: consumerList,
    }
  })
  .sort((a, b) => a.canonicalSource.localeCompare(b.canonicalSource))

writeJson(ASSET_OUTPUT_PATH, assetRecords)

const missingAssets = assetRecords.filter((asset) => asset.renderStatus === 'missing').length
console.log(`[site-experience] ${pageRecords.length} page records`)
console.log(`[site-experience] ${guideRecords.length} guide records`)
console.log(`[site-experience] ${assetRecords.length} referenced assets (${missingAssets} missing)`)

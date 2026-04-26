import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { colorForCategory, categoryLabel } from './category-colors'
import type { SitemapGraph, SitemapLink, SitemapMood, SitemapNode } from './types'

interface VisualRegistryEntry {
  path: string
  directory: string
  category: string
  filename: string
  sizeKB: number
  tags: string[]
  mood: string
  theme: string
  suitableFor: string[]
}

interface SitemapImageMapEntry {
  route: string
  file: string
  images: Array<{ path: string; context?: string }>
  imageCount: number
  hasHero: boolean
  hasOgImage: boolean
  status: 'has-hero' | 'has-og' | 'needs-images' | 'placeholder' | 'ok' | string
}

const ROOT = process.cwd()
const REGISTRY_PATH = path.join(ROOT, 'data', 'visual-registry.json')
const IMAGE_MAP_PATH = path.join(ROOT, 'data', 'sitemap-image-map.json')

let cached: SitemapGraph | null = null

/** Polar cluster layout — categories arranged around the origin, nodes orbit their category. */
function layoutPositions(
  routes: SitemapImageMapEntry[],
  images: VisualRegistryEntry[],
  categories: string[],
): {
  routePos: Map<string, { x: number; y: number }>
  imagePos: Map<string, { x: number; y: number }>
  categoryPos: Map<string, { x: number; y: number }>
} {
  const routePos = new Map<string, { x: number; y: number }>()
  const imagePos = new Map<string, { x: number; y: number }>()
  const categoryPos = new Map<string, { x: number; y: number }>()

  const clusterRadius = 1800 // distance from origin to category center
  const intraRouteRadius = 380 // route distance from category center
  const imageRingRadius = 80 // image distance from its parent route

  categories.forEach((cat, i) => {
    const angle = (2 * Math.PI * i) / categories.length
    const cx = Math.cos(angle) * clusterRadius
    const cy = Math.sin(angle) * clusterRadius
    categoryPos.set(cat, { x: cx, y: cy })
  })

  // Group routes by category (derived from route path)
  const routesByCategory = new Map<string, SitemapImageMapEntry[]>()
  for (const r of routes) {
    const cat = inferCategoryFromRoute(r.route, categories)
    if (!routesByCategory.has(cat)) routesByCategory.set(cat, [])
    routesByCategory.get(cat)!.push(r)
  }

  // Place routes in concentric arcs around their category center
  for (const [cat, catRoutes] of routesByCategory) {
    const center = categoryPos.get(cat) || { x: 0, y: 0 }
    catRoutes.forEach((r, i) => {
      // Spiral arrangement to avoid overlaps for big categories
      const t = i / Math.max(catRoutes.length - 1, 1)
      const ringAngle = t * Math.PI * 2 + i * 0.3
      const ringR = intraRouteRadius * (0.5 + Math.sqrt(i / catRoutes.length))
      routePos.set(r.route, {
        x: center.x + Math.cos(ringAngle) * ringR,
        y: center.y + Math.sin(ringAngle) * ringR,
      })
    })
  }

  // Place images orbiting their first parent route, fall back to category center
  const routeForImage = new Map<string, string>()
  for (const r of routes) {
    for (const img of r.images) {
      const normalized = normalizeImagePath(img.path)
      if (!routeForImage.has(normalized)) routeForImage.set(normalized, r.route)
    }
  }

  images.forEach((img, idx) => {
    const parentRoute = routeForImage.get(img.path)
    const ringAngle = (idx * 137.5 * Math.PI) / 180 // golden-angle distribution
    if (parentRoute && routePos.has(parentRoute)) {
      const p = routePos.get(parentRoute)!
      imagePos.set(img.path, {
        x: p.x + Math.cos(ringAngle) * imageRingRadius,
        y: p.y + Math.sin(ringAngle) * imageRingRadius,
      })
    } else {
      const center = categoryPos.get(img.category) || { x: 0, y: 0 }
      const r = intraRouteRadius * 0.6 + (idx % 6) * 30
      imagePos.set(img.path, {
        x: center.x + Math.cos(ringAngle) * r,
        y: center.y + Math.sin(ringAngle) * r,
      })
    }
  })

  return { routePos, imagePos, categoryPos }
}

function normalizeImagePath(p: string): string {
  if (!p) return ''
  if (p.startsWith('http')) {
    try {
      const u = new URL(p)
      return u.pathname
    } catch {
      return p
    }
  }
  return p
}

function inferCategoryFromRoute(route: string, knownCategories: string[]): string {
  // Try to match route prefix to a known category — e.g. /acos/foo → "acos"
  const segments = route.split('/').filter(Boolean)
  if (segments.length === 0) return 'general'
  const first = segments[0]
  if (knownCategories.includes(first)) return first
  // Try second-level
  if (segments.length > 1 && knownCategories.includes(segments[1])) return segments[1]
  return first || 'general'
}

function moodOf(value: string | undefined): SitemapMood {
  const moods: SitemapMood[] = ['atmospheric', 'branded', 'technical', 'artistic', 'cinematic']
  return (moods.includes(value as SitemapMood) ? (value as SitemapMood) : 'unknown')
}

export async function buildSitemapGraph(): Promise<SitemapGraph> {
  if (cached) return cached

  const [registryRaw, imageMapRaw] = await Promise.all([
    readFile(REGISTRY_PATH, 'utf8'),
    readFile(IMAGE_MAP_PATH, 'utf8'),
  ])
  const registry = JSON.parse(registryRaw) as VisualRegistryEntry[]
  // sitemap-image-map.json may be either a bare array (legacy) or an object
  // with `_summary` + `pages` (current schema produced by `npm run image:scan`).
  const imageMapRoot = JSON.parse(imageMapRaw) as
    | SitemapImageMapEntry[]
    | { _summary?: unknown; pages?: SitemapImageMapEntry[] }
  const imageMap: SitemapImageMapEntry[] = Array.isArray(imageMapRoot)
    ? imageMapRoot
    : imageMapRoot.pages ?? []

  // Categories sorted by combined route + image count
  const categoryStats = new Map<string, { routeCount: number; imageCount: number }>()
  const knownCategoriesFromImages = new Set<string>(registry.map((r) => r.category))

  for (const r of imageMap) {
    const cat = inferCategoryFromRoute(r.route, Array.from(knownCategoriesFromImages))
    if (!categoryStats.has(cat)) categoryStats.set(cat, { routeCount: 0, imageCount: 0 })
    categoryStats.get(cat)!.routeCount += 1
  }
  for (const img of registry) {
    if (!categoryStats.has(img.category)) categoryStats.set(img.category, { routeCount: 0, imageCount: 0 })
    categoryStats.get(img.category)!.imageCount += 1
  }

  const categories = Array.from(categoryStats.entries())
    .sort((a, b) => b[1].routeCount + b[1].imageCount - (a[1].routeCount + a[1].imageCount))
    .map(([key, stats]) => ({
      key,
      label: categoryLabel(key),
      color: colorForCategory(key),
      routeCount: stats.routeCount,
      imageCount: stats.imageCount,
    }))

  const categoryKeys = categories.map((c) => c.key)
  const { routePos, imagePos } = layoutPositions(imageMap, registry, categoryKeys)

  // Image usage count: how many routes reference each image
  const imageUsageCount = new Map<string, number>()
  for (const r of imageMap) {
    for (const img of r.images) {
      const n = normalizeImagePath(img.path)
      imageUsageCount.set(n, (imageUsageCount.get(n) || 0) + 1)
    }
  }

  const nodes: SitemapNode[] = []

  // Route nodes
  for (const r of imageMap) {
    const cat = inferCategoryFromRoute(r.route, categoryKeys)
    const pos = routePos.get(r.route) || { x: 0, y: 0 }
    nodes.push({
      id: `route:${r.route}`,
      kind: 'route',
      label: r.route === '/' ? 'Home' : r.route,
      category: cat,
      color: colorForCategory(cat),
      size: Math.max(20, Math.min(60, 20 + r.imageCount * 2)),
      position: pos,
      route: r.route,
      status: r.status as SitemapNode['status'],
      imageCount: r.imageCount,
    })
  }

  // Image nodes
  for (const img of registry) {
    const pos = imagePos.get(img.path) || { x: 0, y: 0 }
    const usage = imageUsageCount.get(normalizeImagePath(img.path)) || 0
    nodes.push({
      id: `image:${img.path}`,
      kind: 'image',
      label: img.filename,
      category: img.category,
      color: colorForCategory(img.category),
      mood: moodOf(img.mood),
      size: Math.max(8, Math.min(28, 8 + usage * 3)),
      position: pos,
      imagePath: img.path,
      sizeKB: img.sizeKB,
      usageCount: usage,
    })
  }

  const links: SitemapLink[] = []
  // route → image links (uses)
  for (const r of imageMap) {
    for (const img of r.images) {
      const target = `image:${normalizeImagePath(img.path)}`
      // Only link if the image actually exists in the registry; otherwise skip
      // (keeps the graph clean — broken/external image refs don't pollute)
      if (nodes.some((n) => n.id === target)) {
        links.push({
          id: `${r.route}→${img.path}`,
          source: `route:${r.route}`,
          target,
          kind: 'uses',
          weight: 1,
        })
      }
    }
  }

  // route ↔ route shares-image links — when 2+ routes use the same image
  const imageToRoutes = new Map<string, Set<string>>()
  for (const r of imageMap) {
    for (const img of r.images) {
      const n = normalizeImagePath(img.path)
      if (!imageToRoutes.has(n)) imageToRoutes.set(n, new Set())
      imageToRoutes.get(n)!.add(r.route)
    }
  }
  const sharedImagePairs = new Set<string>()
  for (const [, routesUsing] of imageToRoutes) {
    if (routesUsing.size < 2) continue
    const arr = Array.from(routesUsing)
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = i + 1; j < arr.length; j += 1) {
        const key = [arr[i], arr[j]].sort().join('|')
        if (sharedImagePairs.has(key)) continue
        sharedImagePairs.add(key)
        links.push({
          id: `share:${key}`,
          source: `route:${arr[i]}`,
          target: `route:${arr[j]}`,
          kind: 'shares-image',
          weight: 0.4,
        })
      }
    }
  }

  // Stats
  const moodCounts: Record<string, number> = {}
  for (const img of registry) {
    moodCounts[img.mood] = (moodCounts[img.mood] || 0) + 1
  }
  const categoryCounts: Record<string, number> = {}
  for (const c of categories) {
    categoryCounts[c.key] = c.routeCount + c.imageCount
  }

  const graph: SitemapGraph = {
    nodes,
    links,
    stats: {
      totalRoutes: imageMap.length,
      totalImages: registry.length,
      totalCategories: categories.length,
      routesWithHero: imageMap.filter((r) => r.hasHero).length,
      routesNeedingImages: imageMap.filter((r) => r.status === 'needs-images').length,
      placeholders: imageMap.filter((r) => r.status === 'placeholder').length,
      categoryCounts,
      moodCounts,
    },
    categories,
  }

  cached = graph
  return graph
}

// Sitemap visualization types — derived from data/visual-registry.json + data/sitemap-image-map.json

export type SitemapNodeKind = 'route' | 'image' | 'category'

export type SitemapMood = 'atmospheric' | 'branded' | 'technical' | 'artistic' | 'cinematic' | 'unknown'

export interface SitemapNode {
  id: string
  kind: SitemapNodeKind
  label: string
  category: string
  /** Hex color for the node — derived from brand-visual-dna accents per category */
  color: string
  /** Mood tag (image nodes only — drives subtle styling) */
  mood?: SitemapMood
  /** Size hint for rendering (px diameter for graph, weight for force layout) */
  size: number
  /** Initial deterministic position from server-side cluster layout */
  position: { x: number; y: number }
  /** For route nodes: the URL path */
  route?: string
  /** For image nodes: the public path */
  imagePath?: string
  /** For image nodes: file size in KB */
  sizeKB?: number
  /** Status hint: route has hero, route is missing imagery, etc. */
  status?: 'has-hero' | 'has-og' | 'needs-images' | 'placeholder' | 'ok'
  /** How many images this route uses (route nodes only) */
  imageCount?: number
  /** How many routes use this image (image nodes only) */
  usageCount?: number
}

export interface SitemapLink {
  id: string
  source: string
  target: string
  /** "uses" = route → image (image is used on route)
   *  "shares-image" = route ↔ route (both use the same image)
   *  "category" = node → category-cluster anchor */
  kind: 'uses' | 'shares-image' | 'category'
  /** Optional weight for force layout / opacity */
  weight?: number
}

export interface SitemapGraph {
  nodes: SitemapNode[]
  links: SitemapLink[]
  /** Aggregate stats for the header */
  stats: {
    totalRoutes: number
    totalImages: number
    totalCategories: number
    routesWithHero: number
    routesNeedingImages: number
    placeholders: number
    /** Map category → count for filter chips */
    categoryCounts: Record<string, number>
    /** Map mood → count */
    moodCounts: Record<string, number>
  }
  /** Categories ordered by count (desc) — drives filter chip ordering and color mapping */
  categories: Array<{
    key: string
    label: string
    color: string
    routeCount: number
    imageCount: number
  }>
}

export type SitemapView = 'list' | 'graph' | 'network' | '3d' | 'sunburst'

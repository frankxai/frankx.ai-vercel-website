import prototypesData from '@/data/ai-architecture/prototypes.json'

export type FrankxBlueprintSummary = {
  slug: string
  title: string
  subtitle: string
  category: string
  difficulty: string
  overview: string
  componentCount: number
  url: string
}

type RawBlueprint = {
  slug: string
  title: string
  subtitle: string
  category: string
  status: string
  difficulty: string
  overview: string
  architecture?: {
    components?: unknown[]
  }
}

const SITE = 'https://frankx.ai'
const publishedBlueprints = (prototypesData as RawBlueprint[]).filter((item) => item.status === 'published')

export function listFrankxBlueprints(options: {
  category?: string
  difficulty?: string
  query?: string
  limit?: number
} = {}): { blueprints: FrankxBlueprintSummary[]; total: number } {
  const { category, difficulty, query, limit = 12 } = options
  const q = query?.trim().toLowerCase() ?? ''

  const filtered = publishedBlueprints.filter((item) => {
    if (category && item.category !== category) return false
    if (difficulty && item.difficulty !== difficulty) return false
    if (!q) return true
    return (
      item.slug.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.overview.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  return {
    blueprints: filtered.slice(0, Math.max(1, Math.min(25, limit))).map((item) => ({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle,
      category: item.category,
      difficulty: item.difficulty,
      overview: item.overview,
      componentCount: Array.isArray(item.architecture?.components) ? item.architecture.components.length : 0,
      url: `${SITE}/ai-architecture/${item.slug}`,
    })),
    total: filtered.length,
  }
}

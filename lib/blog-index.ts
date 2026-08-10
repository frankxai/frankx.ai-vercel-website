export interface IndexableBlogPost {
  slug: string
  category?: string
  featured?: boolean
  image?: string
}

export const PREMIUM_VISUAL_SLUGS = [
  'agent-family-architecture',
  'multi-agent-orchestration-patterns-2026',
  'acos-enterprise-deployment-guide',
  'aeo-playbook-get-cited-by-ai-2026',
  'agentic-ai-roadmap-2026',
  'prompt-engineering-mastery-workshop',
  'gemma-3-analysis-2026',
  'llama-4-analysis-2026',
  'mistral-large-3-analysis-2026',
] as const

export interface BlogIndex<T extends IndexableBlogPost> {
  latestPost: T | null
  carouselPosts: T[]
  featuredPosts: T[]
  gridPosts: T[]
  visiblePosts: T[]
}

export function buildBlogIndex<T extends IndexableBlogPost>(
  posts: T[],
  selectedCategory: string | null,
  carouselSlugs: readonly string[] = [],
): BlogIndex<T> {
  const visiblePosts = selectedCategory
    ? posts.filter(
        (post) => post.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : posts.filter((post) => post.category?.toLowerCase() !== 'curated')

  const latestPost = selectedCategory ? null : (visiblePosts[0] ?? null)
  const remainingPosts = latestPost
    ? visiblePosts.filter((post) => post !== latestPost)
    : visiblePosts

  if (selectedCategory) {
    return {
      latestPost,
      carouselPosts: [],
      featuredPosts: [],
      gridPosts: remainingPosts,
      visiblePosts,
    }
  }

  const postsBySlug = new Map(remainingPosts.map((post) => [post.slug, post]))
  const carouselPosts = [...new Set(carouselSlugs)]
    .map((slug) => postsBySlug.get(slug))
    .filter((post): post is T => Boolean(post?.image))
  const carouselSet = new Set(carouselPosts)
  const unplacedPosts = remainingPosts.filter((post) => !carouselSet.has(post))
  const featuredPosts = unplacedPosts.filter((post) => post.featured).slice(0, 2)
  const featuredSet = new Set(featuredPosts)

  return {
    latestPost,
    carouselPosts,
    featuredPosts,
    gridPosts: unplacedPosts.filter((post) => !featuredSet.has(post)),
    visiblePosts,
  }
}

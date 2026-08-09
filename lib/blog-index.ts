export interface IndexableBlogPost {
  category?: string
  featured?: boolean
}

export interface BlogIndex<T extends IndexableBlogPost> {
  latestPost: T | null
  featuredPosts: T[]
  gridPosts: T[]
  visiblePosts: T[]
}

export function buildBlogIndex<T extends IndexableBlogPost>(
  posts: T[],
  selectedCategory: string | null,
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
      featuredPosts: [],
      gridPosts: remainingPosts,
      visiblePosts,
    }
  }

  const featuredPosts = remainingPosts.filter((post) => post.featured).slice(0, 2)
  const featuredSet = new Set(featuredPosts)

  return {
    latestPost,
    featuredPosts,
    gridPosts: remainingPosts.filter((post) => !featuredSet.has(post)),
    visiblePosts,
  }
}

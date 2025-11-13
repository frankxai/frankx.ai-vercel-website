/**
 * Content Graph - Internal Linking System for Topic Clusters
 * Automatically suggests related content based on tags, categories, and manual relationships
 */

import type { BlogPost } from './types/blog'
import type { ResearchPage } from './types/research'

export type ContentType = 'blog' | 'research' | 'resource'

export interface ContentNode {
  id: string
  type: ContentType
  title: string
  url: string
  tags: string[]
  category: string
  description?: string
}

export interface RelatedContent {
  content: ContentNode
  score: number // 0-100 relevance score
  reason: 'same-category' | 'shared-tags' | 'manual' | 'topic-cluster'
}

/**
 * Manual topic cluster relationships
 * Define pillar content and cluster content for SEO
 */
export const TOPIC_CLUSTERS: Record<string, {
  pillar: string // Blog post slug
  cluster: string[] // Related blog post slugs
}> = {
  'agentic-ai': {
    pillar: 'what-is-agentic-ai', // Create this as pillar post
    cluster: [
      'langgraph-production-guide',
      'mcp-architecture-overview',
      'multi-agent-systems'
    ]
  },
  'suno-music': {
    pillar: 'suno-ai-complete-guide', // Create this as pillar post
    cluster: [
      'suno-prompt-engineering',
      'advanced-suno-techniques',
      'music-production-workflow'
    ]
  },
  'generative-ai': {
    pillar: 'generative-ai-roadmap-2025', // Create this as pillar post
    cluster: [
      'llm-fine-tuning-guide',
      'prompt-engineering-patterns',
      'ai-creative-workflows'
    ]
  }
}

/**
 * Calculate relevance score between two content pieces
 */
function calculateRelevance(
  source: ContentNode,
  target: ContentNode
): { score: number; reason: RelatedContent['reason'] } {
  let score = 0
  let reason: RelatedContent['reason'] = 'shared-tags'

  // Same category: +30 points
  if (source.category === target.category) {
    score += 30
    reason = 'same-category'
  }

  // Shared tags: +15 points per tag
  const sharedTags = source.tags.filter(tag => target.tags.includes(tag))
  score += sharedTags.length * 15

  // Check manual topic clusters
  for (const [clusterId, cluster] of Object.entries(TOPIC_CLUSTERS)) {
    const sourceInCluster = cluster.pillar === source.id || cluster.cluster.includes(source.id)
    const targetInCluster = cluster.pillar === target.id || cluster.cluster.includes(target.id)

    if (sourceInCluster && targetInCluster) {
      score += 40
      reason = 'topic-cluster'
      break
    }
  }

  return { score: Math.min(score, 100), reason }
}

/**
 * Get related content for a given content piece
 */
export function getRelatedContent(
  currentContent: ContentNode,
  allContent: ContentNode[],
  limit: number = 6
): RelatedContent[] {
  const related = allContent
    .filter(content => content.id !== currentContent.id)
    .map(content => {
      const { score, reason } = calculateRelevance(currentContent, content)
      return { content, score, reason }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return related
}

/**
 * Convert blog post to content node
 */
export function blogPostToNode(post: BlogPost): ContentNode {
  return {
    id: post.slug,
    type: 'blog',
    title: post.title,
    url: `/blog/${post.slug}`,
    tags: post.tags,
    category: post.category,
    description: post.description
  }
}

/**
 * Convert research page to content node
 */
export function researchPageToNode(page: ResearchPage): ContentNode {
  return {
    id: page.id,
    type: 'research',
    title: page.title,
    url: page.type === 'internal' ? page.url : `/library/research#${page.id}`,
    tags: page.tags,
    category: page.category,
    description: page.description
  }
}

/**
 * Get all content nodes from blog posts and research pages
 */
export function buildContentGraph(
  blogPosts: BlogPost[],
  researchPages: ResearchPage[]
): ContentNode[] {
  return [
    ...blogPosts.map(blogPostToNode),
    ...researchPages.map(researchPageToNode)
  ]
}

/**
 * Get topic cluster information for a content piece
 */
export function getTopicCluster(contentId: string): {
  clusterId: string
  isPillar: boolean
  pillarUrl: string
  relatedContent: string[]
} | null {
  for (const [clusterId, cluster] of Object.entries(TOPIC_CLUSTERS)) {
    if (cluster.pillar === contentId) {
      return {
        clusterId,
        isPillar: true,
        pillarUrl: `/blog/${cluster.pillar}`,
        relatedContent: cluster.cluster
      }
    }
    if (cluster.cluster.includes(contentId)) {
      return {
        clusterId,
        isPillar: false,
        pillarUrl: `/blog/${cluster.pillar}`,
        relatedContent: [cluster.pillar, ...cluster.cluster.filter(id => id !== contentId)]
      }
    }
  }
  return null
}

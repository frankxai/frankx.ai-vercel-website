/**
 * Vercel AI SDK v6 tool definitions for the Studio Crew chat.
 *
 * Each tool is server-executed during streamText() multi-step orchestration.
 * Tools never invent URLs — they return real entries from the catalog,
 * Frank's curated CTAs, or a small slice of an MDX article body.
 */

import { tool } from 'ai'
import { z } from 'zod'
import { searchKnowledge, listEntriesByType, type EntryType } from '@/lib/ai/knowledge'
import { semanticSearch } from '@/lib/ai/rag'
import { getContentBySlug } from '@/lib/content-hub'
import { MEET_AND_GROW_URL, PARTNERSHIP_EMAIL } from '@/lib/cta-links'

const SITE_BASE = 'https://frankx.ai'

function absoluteUrl(href: string): string {
  if (/^https?:/i.test(href)) return href
  return `${SITE_BASE}${href.startsWith('/') ? href : `/${href}`}`
}

/**
 * Hybrid retrieval: semantic search over full content bodies (Upstash Vector)
 * when available, falling back to the Lunr lexical index over titles/tags.
 * Returns a normalized result list either way.
 */
async function retrieve(
  query: string,
  limit: number,
  types?: EntryType[]
): Promise<{ title: string; url: string; description?: string; type: string; snippet?: string }[]> {
  const semantic = await semanticSearch(query, { topK: limit, types: types as string[] | undefined })
  if (semantic && semantic.length > 0) {
    return semantic.map((h) => ({
      title: h.title,
      url: absoluteUrl(h.href),
      description: h.snippet,
      type: h.type,
      snippet: h.snippet,
    }))
  }
  // Fallback: lexical search over the catalog (titles, tags, descriptions).
  return searchKnowledge(query, { limit, types }).map((r) => ({
    title: r.title,
    url: absoluteUrl(r.href),
    description: r.description,
    type: r.type,
  }))
}

export const studioTools = {
  searchSite: tool({
    description:
      "Search Frank's site (blog posts, products, workshops, routes, guides). Use this whenever the visitor asks anything specific about Frank's work, methodology, or where to find something. Returns 1-5 ranked results with title, href, description, and type.",
    inputSchema: z.object({
      query: z.string().min(1).describe('Search keywords. Plain English works best.'),
      types: z
        .array(
          z.enum([
            'blog',
            'product',
            'workshop',
            'guide',
            'newsletter',
            'video',
            'partnership',
            'core',
            'section',
            'os',
            'library',
            'tool',
            'research',
          ])
        )
        .optional()
        .describe('Optional: restrict results to specific entry types.'),
      limit: z.number().int().min(1).max(5).optional().default(5),
    }),
    execute: async ({ query, types, limit }) => {
      const results = await retrieve(query, limit ?? 5, types as EntryType[] | undefined)
      if (results.length === 0) {
        return {
          query,
          count: 0,
          results: [],
          note: 'No matching entries in the catalog. Tell the visitor honestly and offer an adjacent suggestion or the newsletter.',
        }
      }
      return {
        query,
        count: results.length,
        results,
      }
    },
  }),

  getBlogPost: tool({
    description:
      "Fetch a slice of a blog post's body when the visitor asks for depth on a specific article. Pass the slug (last path segment after /blog/). Returns the first ~4000 chars.",
    inputSchema: z.object({
      slug: z.string().min(1).describe("The blog post slug, e.g. 'agentic-creator-os-v6'"),
    }),
    execute: async ({ slug }) => {
      const found = getContentBySlug(slug)
      if (!found) {
        return { slug, found: false, note: 'No blog post with that slug.' }
      }
      const { article } = found
      const body = await readArticleBody(article.filePath)
      return {
        slug,
        found: true,
        title: article.title,
        url: `${SITE_BASE}/blog/${slug}`,
        description: article.description,
        category: article.category,
        tags: article.tags,
        publishedAt: article.date,
        excerpt: body.slice(0, 4000),
      }
    },
  }),

  recommendProduct: tool({
    description:
      "Recommend Frank's products to a visitor based on their intent (e.g. 'learn agentic basics', 'launch templates', 'enterprise architecture support'). Returns up to 3 products with title, URL, and one-line positioning.",
    inputSchema: z.object({
      intent: z.string().min(1).describe("The visitor's stated need or goal."),
      limit: z.number().int().min(1).max(3).optional().default(3),
    }),
    execute: async ({ intent, limit }) => {
      const results = searchKnowledge(intent, {
        limit: limit ?? 3,
        types: ['product'],
      })
      const fallback = results.length === 0 ? listEntriesByType('product', limit ?? 3) : results
      return {
        intent,
        count: fallback.length,
        products: fallback.map((p) => ({
          title: p.title,
          url: absoluteUrl(p.href),
          description: p.description,
          tags: p.tags,
        })),
      }
    },
  }),

  recommendWorkshop: tool({
    description:
      "Recommend Frank's workshops based on the visitor's learning goal (e.g. 'find my Ikigai', 'build an agent', 'launch a course'). Returns up to 3 workshops.",
    inputSchema: z.object({
      topic: z.string().min(1).describe("The skill or outcome the visitor wants."),
      limit: z.number().int().min(1).max(3).optional().default(3),
    }),
    execute: async ({ topic, limit }) => {
      const results = searchKnowledge(topic, {
        limit: limit ?? 3,
        types: ['workshop'],
      })
      const fallback = results.length === 0 ? listEntriesByType('workshop', limit ?? 3) : results
      return {
        topic,
        count: fallback.length,
        workshops: fallback.map((w) => ({
          title: w.title,
          url: absoluteUrl(w.href),
          description: w.description,
        })),
      }
    },
  }),

  bookDiscoveryCall: tool({
    description:
      "Return Frank's discovery-call booking link. Call this when the visitor has a real engagement opportunity (enterprise pilot, hands-on consulting, advisory). Include budget/timeline context in the conversation, not in this tool call.",
    inputSchema: z.object({
      reason: z
        .string()
        .optional()
        .describe('One-line context for analytics, e.g. "enterprise multi-agent pilot".'),
    }),
    execute: async ({ reason }) => ({
      bookingUrl: MEET_AND_GROW_URL,
      fallbackEmail: PARTNERSHIP_EMAIL,
      reason: reason || 'discovery-call',
      note: 'Tell the visitor what to expect in the call — 30 min, decision criteria, no obligation.',
    }),
  }),

  subscribeNewsletter: tool({
    description:
      "Return Frank's newsletter subscription page URL when the visitor wants to keep in touch. Do NOT collect their email in chat — point them at the page so they fill the real form.",
    inputSchema: z.object({
      source: z
        .string()
        .optional()
        .describe('Where in the chat this CTA came from, for analytics.'),
    }),
    execute: async ({ source }) => ({
      subscribeUrl: `${SITE_BASE}/newsletter`,
      source: source || 'studio-chat',
      note: 'Frame it as one weekly note from Frank, not a "subscribe to my list" pitch.',
    }),
  }),
} as const

export type StudioToolName = keyof typeof studioTools

/**
 * Read just the body of an MDX article (stripping frontmatter). Server-only.
 */
async function readArticleBody(relPath: string): Promise<string> {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const fullPath = join(process.cwd(), relPath)
  try {
    const raw = await readFile(fullPath, 'utf-8')
    // Strip simple --- frontmatter --- block at top.
    const match = raw.match(/^---[\s\S]*?---\s*/)
    return (match ? raw.slice(match[0].length) : raw).trim()
  } catch {
    return ''
  }
}

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getBlogPost } from '@/lib/blog'
import { blogPostToMarkdown } from '@/lib/blog-markdown'
import { listFrankxBlueprints } from '@/lib/mcp/blueprints-catalog'
import { frankxMcpServerInfo } from './server-identity.ts'
import { listFrankxSkills } from '@/lib/mcp/skills-catalog'
import { recommendFrankxStack } from '@/lib/mcp/stack-recommendations'
import { products } from '@/lib/products'
import { searchSiteItems } from '@/lib/site-search'

const SITE = 'https://frankx.ai'
const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const

/** structuredContent plus the same JSON as text, for clients that predate structured output. */
function structuredResult<T extends Record<string, unknown>>(value: T) {
  return { structuredContent: value, content: [{ type: 'text' as const, text: JSON.stringify(value) }] }
}

/**
 * One page of `markdown` starting at `offset`, at most `maxChars` long. It ends on the last paragraph break in the
 * window unless that would drop more than a quarter of the budget, and never splits a surrogate pair. Pages are
 * contiguous, so concatenating every page from offset 0 via nextOffset rebuilds the article exactly.
 */
export function pageMarkdown(markdown: string, offset: number, maxChars: number) {
  let start = Math.min(offset, markdown.length)
  // A caller-supplied offset can land on the low half of an emoji; start at the whole character instead.
  if (start > 0 && /[\uDC00-\uDFFF]/.test(markdown[start]) && /[\uD800-\uDBFF]/.test(markdown[start - 1])) start -= 1
  if (markdown.length - start <= maxChars) {
    return { markdown: markdown.slice(start), offset: start, nextOffset: null, truncated: false }
  }
  let end = start + maxChars
  const paragraphEnd = markdown.lastIndexOf('\n\n', end - 2)
  if (paragraphEnd - start >= maxChars * 0.75) end = paragraphEnd
  else if (/[\uD800-\uDBFF]/.test(markdown[end - 1])) end -= 1
  return { markdown: markdown.slice(start, end), offset: start, nextOffset: end, truncated: true }
}

function errorResult(message: string) {
  return { content: [{ type: 'text' as const, text: message }], isError: true }
}

/**
 * Read-only MCP surface over content the site already publishes.
 * It makes no model calls and stores nothing. Products expose only name, headline and link;
 * commercial terms stay on the reviewed pages, and partner stack links carry explicit disclosure.
 */
export function createFrankxMcpServer(): McpServer {
  const server = new McpServer({
    name: frankxMcpServerInfo.name,
    version: frankxMcpServerInfo.version,
  })

  server.registerTool(
    'frankx_search_site',
    {
      title: 'Search frankx.ai',
      description:
        'Search frankx.ai by keywords across articles, guides, tools and product pages. Use it first to find pages on a topic, ' +
        'then frankx_get_article to read a /blog/ result in full. Returns up to `limit` hits (default 8, max 25), each with ' +
        'title, one-line description, absolute URL and page type; a full response is a few KB.',
      inputSchema: {
        query: z.string().min(1).max(200).describe('Keywords, e.g. "agentic architecture" or "suno prompts"'),
        limit: z.number().int().min(1).max(25).default(8).describe('Maximum number of hits to return (1-25, default 8)'),
      },
      outputSchema: {
        results: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            url: z.string().describe('Absolute URL of the page'),
            type: z.string().describe('Page type, e.g. "blog", "guide", "tool", "product" or "external"'),
          }),
        ),
      },
      annotations: READ_ONLY,
    },
    async ({ query, limit }) =>
      structuredResult({
        results: searchSiteItems(query, limit).map((item) => ({
          title: item.title,
          description: item.description,
          url: item.external ? item.href : `${SITE}${item.href}`,
          type: item.type,
        })),
      }),
  )

  server.registerTool(
    'frankx_get_article',
    {
      title: 'Read a frankx.ai article',
      description:
        'Return one frankx.ai blog article as markdown with its title, author, date and body. Use it after ' +
        'frankx_search_site, passing the slug from a https://frankx.ai/blog/<slug> URL. Most articles are 5-20 KB of ' +
        'markdown and come back whole. Longer ones come back one page of at most maxChars (default 40000) at a time, ' +
        'and each page prefers to end on a paragraph break; truncated is true and nextOffset is set while more follows. Call again with ' +
        'offset=nextOffset until nextOffset is null to read to the end. totalChars gives the full length. ' +
        'Unknown slugs return an error; an offset past the end returns an empty page.',
      inputSchema: {
        slug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,200}$/).describe('Article slug, e.g. "agentic-ai-roadmap-2026"'),
        maxChars: z.number().int().min(1000).max(100000).default(40000)
          .describe('Maximum characters of markdown per page (1000-100000, default 40000)'),
        offset: z.number().int().min(0).max(10_000_000).default(0)
          .describe('Character offset to start the page at (default 0); pass the previous nextOffset to continue'),
      },
      outputSchema: {
        slug: z.string(),
        title: z.string(),
        url: z.string().describe('Canonical article URL, to cite as the source'),
        markdown: z.string().describe('This page of the article markdown; the first page starts with its # title'),
        offset: z.number().int().describe('Character offset this page starts at'),
        nextOffset: z.number().int().nullable().describe('Offset of the next page, or null when this page reaches the end'),
        truncated: z.boolean().describe('True when more of the article follows this page'),
        totalChars: z.number().int().describe('Length of the full article markdown in characters'),
      },
      annotations: READ_ONLY,
    },
    async ({ slug, maxChars, offset }) => {
      const post = getBlogPost(slug)
      if (!post) return errorResult(`No article with slug "${slug}". Use frankx_search_site to find the right slug.`)
      const full = blogPostToMarkdown(post)
      return structuredResult({
        slug,
        title: post.title,
        url: `${SITE}/blog/${slug}`,
        ...pageMarkdown(full, offset, maxChars),
        totalChars: full.length,
      })
    },
  )

  server.registerTool(
    'frankx_list_skills',
    {
      title: 'List verified FrankX agent skills',
      description:
        'List installable SKILL.md modules curated by FrankX across engineering, architecture, content, media, and quality gates. ' +
        'Filter by category or keyword query, returning up to `limit` items (default 12, max 25) with install commands, example triggers, ' +
        'and canonical implementation guide URLs; responses stay under 6 KB.',
      inputSchema: {
        category: z
          .enum(['engineering', 'architecture', 'content', 'media', 'quality'])
          .optional()
          .describe('Optional category filter: engineering, architecture, content, media, or quality'),
        query: z
          .string()
          .min(1)
          .max(120)
          .optional()
          .describe('Optional keyword filter, e.g. "mcp", "voice", or "vercel"'),
        limit: z
          .number()
          .int()
          .min(1)
          .max(25)
          .default(12)
          .describe('Maximum number of skills to return (1-25, default 12)'),
      },
      outputSchema: {
        skills: z.array(
          z.object({
            slug: z.string(),
            name: z.string(),
            category: z.string(),
            summary: z.string(),
            installCommand: z.string(),
            triggerExample: z.string(),
            guideUrl: z.string(),
            repoUrl: z.string(),
          }),
        ),
        total: z.number().int().describe('Total matching curated skills across the catalog'),
      },
      annotations: READ_ONLY,
    },
    async ({ category, query, limit }) => structuredResult(listFrankxSkills({ category, query, limit })),
  )

  server.registerTool(
    'frankx_list_blueprints',
    {
      title: 'List FrankX AI architecture blueprints',
      description:
        'List published FrankX reference architectures and system prototypes with category, difficulty, component count, ' +
        'and canonical blueprint URLs. Filter by category, difficulty, or keyword query and limit responses to `limit` items ' +
        '(default 12, max 25); each response is compact JSON under 8 KB.',
      inputSchema: {
        category: z
          .enum([
            'rag-production',
            'multi-agent-orchestration',
            'llm-ops',
            'security-governance',
            'vector-databases',
            'mcp-servers',
            'ai-coe',
          ])
          .optional()
          .describe('Optional architecture domain filter, e.g. "rag-production" or "mcp-servers"'),
        difficulty: z
          .enum(['beginner', 'intermediate', 'advanced', 'expert'])
          .optional()
          .describe('Optional complexity tier filter: beginner, intermediate, advanced, or expert'),
        query: z
          .string()
          .min(1)
          .max(120)
          .optional()
          .describe('Optional keyword filter matching title, overview, or category'),
        limit: z
          .number()
          .int()
          .min(1)
          .max(25)
          .default(12)
          .describe('Maximum number of blueprints to return (1-25, default 12)'),
      },
      outputSchema: {
        blueprints: z.array(
          z.object({
            slug: z.string(),
            title: z.string(),
            subtitle: z.string(),
            category: z.string(),
            difficulty: z.string(),
            overview: z.string(),
            componentCount: z.number().int(),
            url: z.string(),
          }),
        ),
        total: z.number().int().describe('Total published blueprints matching the filter'),
      },
      annotations: READ_ONLY,
    },
    async ({ category, difficulty, query, limit }) =>
      structuredResult(listFrankxBlueprints({ category, difficulty, query, limit })),
  )

  server.registerTool(
    'frankx_recommend_stack',
    {
      title: 'Recommend a disclosed FrankX tool stack',
      description:
        'Return a vetted build stack for a workflow goal (coding-agents, voice-audio, video-motion, creator-publishing, ' +
        'ai-architecture, or research-seo). Active verified partner tools return https://frankx.ai/go/<slug> redirect URLs ' +
        'marked sponsored with rel="sponsored noopener" and plain-English commission disclosure; editorial tools link directly ' +
        'to official vendor URLs. Returns up to `limit` items (default 6, max 12).',
      inputSchema: {
        goal: z
          .enum([
            'coding-agents',
            'voice-audio',
            'video-motion',
            'creator-publishing',
            'ai-architecture',
            'research-seo',
          ])
          .describe('Target build goal to assemble tools for'),
        query: z
          .string()
          .min(1)
          .max(160)
          .optional()
          .describe('Optional keyword filter within the chosen goal, e.g. "voice" or "video"'),
        limit: z
          .number()
          .int()
          .min(1)
          .max(12)
          .default(6)
          .describe('Maximum number of stack tools to return (1-12, default 6)'),
      },
      outputSchema: {
        goal: z.string(),
        tools: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            role: z.string(),
            summary: z.string(),
            url: z.string(),
            guideUrl: z.string().optional(),
            relationship: z.enum(['sponsored', 'editorial']),
            sponsored: z.boolean(),
            rel: z.enum(['sponsored noopener', 'noopener']),
            disclosure: z.string(),
          }),
        ),
        total: z.number().int().describe('Total tools matching the requested goal and query'),
        disclosureNote: z.string(),
      },
      annotations: READ_ONLY,
    },
    async ({ goal, query, limit }) => structuredResult(recommendFrankxStack({ goal, query, limit })),
  )

  server.registerTool(
    'frankx_list_products',
    {
      title: 'List frankx.ai products',
      description:
        'List the products and programs shown on frankx.ai, each with its name, a one-line headline and the product page URL. ' +
        'Use it to see what is on offer; open the page for commercial details and availability, which this tool does not return. ' +
        'Returns up to `limit` products (default 50, max 100) plus the total count; the full list is a few KB.',
      inputSchema: {
        limit: z.number().int().min(1).max(100).default(50).describe('Maximum number of products to return (1-100, default 50)'),
      },
      outputSchema: {
        products: z.array(z.object({ name: z.string(), headline: z.string(), url: z.string() })),
        total: z.number().int().describe('Number of products on the site; more than returned when limit cut the list'),
      },
      annotations: READ_ONLY,
    },
    async ({ limit }) =>
      structuredResult({
        products: products.slice(0, limit).map((product) => {
          // A few registry entries (e.g. golden-age) still use the older title/description schema.
          const legacy = product as { title?: string; description?: string }
          return {
            name: product.name ?? legacy.title,
            headline: product.headline ?? legacy.description,
            url: `${SITE}/products/${product.slug}`,
          }
        }),
        total: products.length,
      }),
  )

  return server
}

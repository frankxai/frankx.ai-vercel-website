import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getBlogPost } from '@/lib/blog'
import { blogPostToMarkdown } from '@/lib/blog-markdown'
import { products } from '@/lib/products'
import { searchSiteItems } from '@/lib/site-search'

const SITE = 'https://frankx.ai'

function textResult(value: unknown, isError = false) {
  return {
    content: [{ type: 'text' as const, text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }],
    ...(isError && { isError: true }),
  }
}

/**
 * Read-only MCP surface over content the site already publishes.
 * It makes no model calls and stores nothing. Products expose only name, headline and link:
 * prices and testimonials stay on the pages, where they pass the site's own claim review.
 */
export function createFrankxMcpServer(): McpServer {
  const server = new McpServer({ name: 'frankx', version: '1.0.0' })

  server.registerTool(
    'search_site',
    {
      title: 'Search frankx.ai',
      description:
        'Search frankx.ai articles, guides, tools and product pages by keywords. Returns titles, one-line descriptions and absolute URLs.',
      inputSchema: {
        query: z.string().min(1).max(200).describe('Keywords, e.g. "agentic architecture" or "suno prompts"'),
        limit: z.number().int().min(1).max(25).default(8),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, limit }) =>
      textResult(
        searchSiteItems(query, limit).map((item) => ({
          title: item.title,
          description: item.description,
          url: item.external ? item.href : `${SITE}${item.href}`,
          type: item.type,
        })),
      ),
  )

  server.registerTool(
    'get_article',
    {
      title: 'Read a frankx.ai article',
      description:
        'Return one frankx.ai blog article as markdown (title, author, date, body). Use the slug from a /blog/<slug> URL found with search_site.',
      inputSchema: {
        slug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,200}$/).describe('Article slug, e.g. "agentic-ai-roadmap-2026"'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug }) => {
      const post = getBlogPost(slug)
      if (!post) return textResult({ error: `No article with slug "${slug}". Use search_site to find one.` }, true)
      return textResult(`${blogPostToMarkdown(post)}\n\nSource: ${SITE}/blog/${slug}`)
    },
  )

  server.registerTool(
    'list_products',
    {
      title: 'List frankx.ai products',
      description:
        'List the products and programs shown on frankx.ai with a one-line headline and the page URL. Open the page for pricing and availability.',
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () =>
      textResult(
        products.map((product) => {
          // A few registry entries (e.g. golden-age) still use the older title/description schema.
          const legacy = product as { title?: string; description?: string }
          return {
            name: product.name ?? legacy.title,
            headline: product.headline ?? legacy.description,
            url: `${SITE}/products/${product.slug}`,
          }
        }),
      ),
  )

  return server
}

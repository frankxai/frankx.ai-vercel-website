import routeIndex from '@/data/route-index.json'
import { agentNotFoundResponse } from '@/lib/agent-not-found'
import { getBlogPost } from '@/lib/blog'
import { blogPostToMarkdown } from '@/lib/blog-markdown'
import type { RouteIndex } from '@/lib/fuzzy-route-match'

const typedIndex = routeIndex as RouteIndex

function routeExists(pathname: string): boolean {
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  return (
    clean === '/' ||
    typedIndex.routes.some((r) => r.href === clean) ||
    Boolean(typedIndex.aliases[clean])
  )
}

async function handle(request: Request) {
  const url = new URL(request.url)
  const contentPath = url.searchParams.get('path')

  if (!contentPath) {
    return new Response('Missing path parameter', { status: 400 })
  }

  const blogMatch = contentPath.match(/^\/blog\/(.+)$/)

  if (blogMatch) {
    const slug = blogMatch[1]
    const post = getBlogPost(slug)

    if (!post) {
      return agentNotFoundResponse(request.method, contentPath)
    }

    const body = request.method === 'HEAD' ? null : blogPostToMarkdown(post)
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  if (routeExists(contentPath)) {
    const body =
      request.method === 'HEAD' ? null : 'Content type not supported for markdown export'
    return new Response(body, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  return agentNotFoundResponse(request.method, contentPath)
}

export const GET = handle
export const HEAD = handle

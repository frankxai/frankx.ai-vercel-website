import { NextRequest, NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/blog'
import { blogPostToMarkdown } from '@/lib/blog-markdown'

export async function GET(request: NextRequest) {
  const contentPath = request.nextUrl.searchParams.get('path')

  if (!contentPath) {
    return new NextResponse('Missing path parameter', { status: 400 })
  }

  const blogMatch = contentPath.match(/^\/blog\/(.+)$/)

  if (blogMatch) {
    const slug = blogMatch[1]
    const post = getBlogPost(slug)

    if (!post) {
      return new NextResponse('Not found', { status: 404 })
    }

    return new NextResponse(blogPostToMarkdown(post), {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  return new NextResponse('Content type not supported for markdown export', {
    status: 404,
  })
}

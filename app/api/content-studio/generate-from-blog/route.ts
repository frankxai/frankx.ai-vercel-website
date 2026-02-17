import { NextRequest, NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/blog'
import { getAllAccounts } from '@/lib/content-studio/posts'
import { createPostsFromBlog } from '@/lib/content-studio/agents'
import { createPost } from '@/lib/content-studio/posts'

export async function POST(request: NextRequest) {
  try {
    const { blogSlug } = await request.json()

    if (!blogSlug) {
      return NextResponse.json(
        { error: 'Missing blogSlug parameter' },
        { status: 400 }
      )
    }

    const blogPost = getBlogPost(blogSlug)
    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const accounts = getAllAccounts()

    const generatedPosts = await createPostsFromBlog(
      {
        slug: blogPost.slug,
        title: blogPost.title,
        description: blogPost.description,
        content: blogPost.content,
        tags: blogPost.tags,
        category: blogPost.category
      },
      accounts
    )

    const savedPosts = generatedPosts.map(postData => createPost(postData as Parameters<typeof createPost>[0]))

    return NextResponse.json({
      success: true,
      posts: savedPosts,
      count: savedPosts.length
    })
  } catch (error) {
    console.error('[Generate From Blog] Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate social posts from blog' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost, getPostsByAccount, getPostsByStatus, getScheduledPosts } from '@/lib/content-studio/posts'
import type { Post } from '@/types/content-studio'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId')
    const status = searchParams.get('status')
    const scheduled = searchParams.get('scheduled')

    let posts: Post[]

    if (accountId) {
      posts = getPostsByAccount(accountId)
    } else if (status) {
      posts = getPostsByStatus(status as any)
    } else if (scheduled === 'true') {
      posts = getScheduledPosts()
    } else {
      posts = getAllPosts()
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('[Content Studio API] GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.accountId || !body.platform || !body.contentType || !body.body) {
      return NextResponse.json(
        { error: 'Missing required fields: accountId, platform, contentType, body' },
        { status: 400 }
      )
    }

    const newPost = createPost({
      accountId: body.accountId,
      platform: body.platform,
      contentType: body.contentType,
      status: body.status || 'draft',
      body: body.body,
      bodyWithHashtags: body.bodyWithHashtags,
      hashtags: body.hashtags || [],
      media: body.media,
      thread: body.thread,
      schedule: body.schedule,
      source: body.source,
      generation: body.generation
    })

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    console.error('[Content Studio API] POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

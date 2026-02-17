import type { Post, Account } from '@/types/content-studio'

interface BlogPostData {
  slug: string
  title: string
  description: string
  content: string
  tags?: string[]
  category?: string
}

interface GeneratedContent {
  linkedin: {
    body: string
    hashtags: string[]
  }
  twitter: {
    thread: { body: string }[]
    hashtags: string[]
  }
}

/**
 * Generate platform-optimized social media content from a blog post
 */
export async function generateSocialContent(blogPost: BlogPostData): Promise<GeneratedContent> {
  // Extract key points from blog content (first 1000 chars as summary)
  const summary = blogPost.content.slice(0, 1000)
  
  // Generate LinkedIn post (professional, detailed)
  const linkedinBody = generateLinkedInPost(blogPost, summary)
  
  // Generate Twitter thread (concise, engaging)
  const twitterThread = generateTwitterThread(blogPost, summary)
  
  // Extract hashtags from tags and category
  const hashtags = [
    ...(blogPost.tags || []).slice(0, 3),
    blogPost.category || ''
  ].filter(Boolean)

  return {
    linkedin: {
      body: linkedinBody,
      hashtags
    },
    twitter: {
      thread: twitterThread,
      hashtags
    }
  }
}

function generateLinkedInPost(blogPost: BlogPostData, summary: string): string {
  // LinkedIn format: Hook + Value + CTA
  const hook = `${blogPost.title}\n\n`
  const value = `${blogPost.description}\n\n`
  const readMore = `Read the full article: https://frankx.ai/blog/${blogPost.slug}`
  
  return hook + value + readMore
}

function generateTwitterThread(blogPost: BlogPostData, summary: string): { body: string }[] {
  // Twitter thread: 1 tweet per key point (max 280 chars each)
  const thread = []
  
  // Tweet 1: Hook
  thread.push({
    body: `${blogPost.title}\n\nA thread 🧵`
  })
  
  // Tweet 2: TL;DR
  const tldr = blogPost.description.slice(0, 250)
  thread.push({
    body: tldr
  })
  
  // Tweet 3: CTA
  thread.push({
    body: `Read the full breakdown:\nhttps://frankx.ai/blog/${blogPost.slug}`
  })
  
  return thread
}

/**
 * Create social media posts from blog post data
 */
export async function createPostsFromBlog(
  blogPost: BlogPostData,
  accounts: Account[]
): Promise<Partial<Post>[]> {
  const content = await generateSocialContent(blogPost)
  const posts: Partial<Post>[] = []

  // LinkedIn post
  const linkedinAccount = accounts.find(a => a.platform === 'linkedin' && a.active)
  if (linkedinAccount) {
    posts.push({
      accountId: linkedinAccount.id,
      platform: 'linkedin',
      contentType: 'text',
      status: 'draft',
      body: content.linkedin.body,
      hashtags: content.linkedin.hashtags,
      source: {
        type: 'blog',
        id: blogPost.slug,
        title: blogPost.title
      }
    })
  }

  // Twitter thread
  const twitterAccount = accounts.find(a => a.platform === 'twitter' && a.active)
  if (twitterAccount) {
    posts.push({
      accountId: twitterAccount.id,
      platform: 'twitter',
      contentType: 'thread',
      status: 'draft',
      body: content.twitter.thread[0].body,
      thread: content.twitter.thread.map((t, i) => ({ order: i + 1, ...t })),
      hashtags: content.twitter.hashtags,
      source: {
        type: 'blog',
        id: blogPost.slug,
        title: blogPost.title
      }
    })
  }

  return posts
}

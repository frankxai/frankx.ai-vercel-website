import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { ContentStudioData, Post, PostStatus, Account } from '@/types/content-studio'

const DATA_FILE = join(process.cwd(), 'data', 'content-studio.json')

function readData(): ContentStudioData {
  try {
    const fileContent = readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('[Content Studio] Failed to read data file:', error)
    return {
      accounts: [],
      posts: [],
      workflows: [],
      lastUpdated: new Date().toISOString()
    }
  }
}

function writeData(data: ContentStudioData): void {
  try {
    data.lastUpdated = new Date().toISOString()
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('[Content Studio] Failed to write data file:', error)
    throw error
  }
}

// Posts

export function getAllPosts(): Post[] {
  const data = readData()
  return data.posts.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getPostById(postId: string): Post | null {
  const data = readData()
  return data.posts.find(p => p.id === postId) || null
}

export function getPostsByAccount(accountId: string): Post[] {
  const data = readData()
  return data.posts
    .filter(p => p.accountId === accountId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getPostsByStatus(status: PostStatus): Post[] {
  const data = readData()
  return data.posts
    .filter(p => p.status === status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getScheduledPosts(): Post[] {
  const data = readData()
  const now = new Date()
  return data.posts
    .filter(p => p.status === 'scheduled' && p.schedule)
    .filter(p => new Date(p.schedule!.publishAt) > now)
    .sort((a, b) =>
      new Date(a.schedule!.publishAt).getTime() - new Date(b.schedule!.publishAt).getTime()
    )
}

export function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
  const data = readData()

  const newPost: Post = {
    ...post,
    id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  data.posts.push(newPost)
  writeData(data)

  return newPost
}

export function updatePost(postId: string, updates: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | null {
  const data = readData()
  const postIndex = data.posts.findIndex(p => p.id === postId)

  if (postIndex === -1) {
    return null
  }

  data.posts[postIndex] = {
    ...data.posts[postIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  writeData(data)
  return data.posts[postIndex]
}

export function deletePost(postId: string): boolean {
  const data = readData()
  const initialLength = data.posts.length
  data.posts = data.posts.filter(p => p.id !== postId)

  if (data.posts.length < initialLength) {
    writeData(data)
    return true
  }

  return false
}

// Accounts

export function getAllAccounts(): Account[] {
  const data = readData()
  return data.accounts
}

export function getAccountById(accountId: string): Account | null {
  const data = readData()
  return data.accounts.find(a => a.id === accountId) || null
}

export function getActiveAccounts(): Account[] {
  const data = readData()
  return data.accounts.filter(a => a.active)
}

export function getAccountsByPlatform(platform: string): Account[] {
  const data = readData()
  return data.accounts.filter(a => a.platform === platform)
}

// Analytics helpers

export function getPostStats(accountId?: string) {
  const posts = accountId ? getPostsByAccount(accountId) : getAllPosts()

  return {
    total: posts.length,
    draft: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
    published: posts.filter(p => p.status === 'published').length,
    failed: posts.filter(p => p.status === 'failed').length
  }
}

export function getRecentActivity(limit: number = 10): Post[] {
  const data = readData()
  return data.posts
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

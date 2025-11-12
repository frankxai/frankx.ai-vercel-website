import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'
import type { BlogPost } from './types/blog'
import { CATEGORY_DISPLAY_NAMES, CATEGORY_HEADER_IMAGES } from './types/blog'

// This file uses Node.js fs module and should only be imported in Server Components
// Types and constants have been extracted to lib/types/blog.ts for safe client-side imports
const blogDirectory = process.env.BLOG_CONTENT_PATH || path.join(process.cwd(), 'content/blog')

// Re-export types and constants for backward compatibility
export type { BlogPost } from './types/blog'
export { CATEGORY_DISPLAY_NAMES, CATEGORY_HEADER_IMAGES } from './types/blog'

// Helper: Recursively scan subdirectories for MDX files
function scanBlogDirectory(dir: string, category?: string): BlogPost[] {
  const posts: BlogPost[] = []

  try {
    if (!fs.existsSync(dir)) {
      console.warn(`Blog directory not found: ${dir}`)
      return posts
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recurse into category subdirectories
        const subCategory = category || entry.name
        posts.push(...scanBlogDirectory(fullPath, subCategory))
      } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
        const slug = entry.name.replace(/\.(mdx|md)$/, '')
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const readTime = readingTime(content)

        // Normalize frontmatter variations
        const postCategory = data.category || category || 'general'
        const post: BlogPost = {
          slug,
          title: data.title || slug,
          description: data.description || data.summary || data.excerpt || '',
          date: data.date || data.publishDate || new Date().toISOString(),
          author: data.author || 'Frank',
          category: postCategory,
          tags: Array.isArray(data.tags) ? data.tags : [],
          // Use custom image if provided, otherwise use category header image
          image: data.image || CATEGORY_HEADER_IMAGES[category || postCategory] || CATEGORY_HEADER_IMAGES['general'],
          readingTime: data.readingTime || data.readTime || readTime.text,
          keywords: data.keywords,
          readingGoal: data.readingGoal,
          content,
          featured: data.featured || false,
          sourceCategory: category  // Track which subdirectory
        }

        posts.push(post)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error)
  }

  return posts
}

export const getAllBlogPosts = cache((): BlogPost[] => {
  if (!fs.existsSync(blogDirectory)) {
    console.warn(`Blog directory not found: ${blogDirectory}`)
    return []
  }

  const allPosts = scanBlogDirectory(blogDirectory)
  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
})

export const getBlogPost = cache((slug: string): BlogPost | null => {
  const allPosts = getAllBlogPosts()
  return allPosts.find(post => post.slug === slug) || null
})

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured).slice(0, 3)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post =>
    post.category.toLowerCase() === category.toLowerCase() ||
    post.sourceCategory?.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts()
  const categories = Array.from(new Set(posts.map(p => p.sourceCategory || p.category))).filter(Boolean)
  return categories.sort()
}

export function getCategoryDisplayName(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category] || category
}

export function getCategoryHeaderImage(category: string): string {
  return CATEGORY_HEADER_IMAGES[category] || CATEGORY_HEADER_IMAGES['general']
}

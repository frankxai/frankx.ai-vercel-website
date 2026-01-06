import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const blogDirectory = path.join(process.cwd(), 'content/blog')

// FAQ item for AI-extractable structured content
export interface FAQItem {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  keywords?: string[]
  readingGoal?: string
  content: string
  featured?: boolean

  // AI-First Content Fields
  tldr?: string // 50-word summary for AI extraction
  faq?: FAQItem[] // Question-answer pairs for FAQPage schema
  schema?: string[] // Schema types to generate (Article, FAQPage, HowTo)
  lastUpdated?: string // Freshness signal for search engines
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(blogDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)

      return {
        slug,
        content,
        readingTime: readTime.text,
        ...data,
      } as BlogPost
    })

  return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
}


export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readTime = readingTime(content)

    return {
      slug,
      content,
      readingTime: readTime.text,
      ...data,
    } as BlogPost
  } catch {
    return null
  }
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured).slice(0, 3)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}


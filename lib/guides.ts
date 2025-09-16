import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const guidesDirectory = path.join(process.cwd(), 'content/guides')

export interface GuideDoc {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category?: string
  tags?: string[]
  readingTime: string
  content: string
}

export function getAllGuides(): GuideDoc[] {
  if (!fs.existsSync(guidesDirectory)) return []
  const fileNames = fs.readdirSync(guidesDirectory)
  return fileNames
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/i, '')
      const fullPath = path.join(guidesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)
      return {
        slug,
        content,
        readingTime: readTime.text,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().slice(0,10),
        author: data.author || 'Frank',
        category: data.category || 'Guide',
        tags: data.tags || [],
      } as GuideDoc
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
}

export function getGuide(slug: string): GuideDoc | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readTime = readingTime(content)
    return {
      slug,
      content,
      readingTime: readTime.text,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString().slice(0,10),
      author: data.author || 'Frank',
      category: data.category || 'Guide',
      tags: data.tags || [],
    } as GuideDoc
  } catch {
    return null
  }
}


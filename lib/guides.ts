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
  keywords?: string[]
  image?: string
  updated?: string
  faqs?: Array<{ question: string; answer: string }>
  video?: GuideVideo
  decisions?: GuideDecision[]
  readingTime: string
  content: string
}

export interface GuideVideo {
  title: string
  url: string
}

export interface GuideDecision {
  audience: string
  call: 'adopt' | 'wait' | 'skip'
  because: string
  source: string
}

type GuideFrontmatter = Record<string, unknown>

function textValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

const DECISION_CALLS = new Set(['adopt', 'wait', 'skip'])

function guideVideo(value: unknown): GuideVideo | undefined {
  if (!value || typeof value !== 'object') return undefined
  const row = value as Record<string, unknown>
  const title = textValue(row.title)
  const url = textValue(row.url)
  if (!title || !url.startsWith('https://')) return undefined
  return { title, url }
}

function guideDecisions(value: unknown): GuideDecision[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Record<string, unknown>
    const call = textValue(row.call)
    const audience = textValue(row.audience)
    const because = textValue(row.because)
    const source = textValue(row.source)
    if (!DECISION_CALLS.has(call) || !audience || !because || !source.startsWith('https://')) return []
    return [{ audience, call: call as GuideDecision['call'], because, source }]
  })
}

function guideFromFrontmatter(slug: string, data: GuideFrontmatter, content: string): GuideDoc {
  const date = textValue(data.date, new Date().toISOString().slice(0, 10))
  const faqs = Array.isArray(data.faqs)
    ? data.faqs.filter(
        (faq): faq is { question: string; answer: string } =>
          typeof faq === 'object' &&
          faq !== null &&
          typeof (faq as Record<string, unknown>).question === 'string' &&
          typeof (faq as Record<string, unknown>).answer === 'string'
      )
    : []

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    title: textValue(data.title, slug),
    description: textValue(data.description),
    date,
    author: textValue(data.author, 'Frank'),
    category: textValue(data.category, 'Guide'),
    tags: stringArray(data.tags),
    keywords: stringArray(data.keywords),
    image: textValue(data.image),
    updated: textValue(data.updated, date),
    faqs,
    video: guideVideo(data.video),
    decisions: guideDecisions(data.decisions),
  }
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
      return guideFromFrontmatter(slug, data, content)
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
}

export function getGuide(slug: string): GuideDoc | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return guideFromFrontmatter(slug, data, content)
  } catch {
    return null
  }
}

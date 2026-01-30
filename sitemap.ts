import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://frankx.ai'

// Extract slug from MDX filename
function getSlugFromFilename(filename: string): string {
  // Remove number prefix and .mdx extension
  return filename.replace(/^\d+-/, '').replace(/\.mdx$/, '')
}

// Get all blog slugs from content/blog directory
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  try {
    const files = fs.readdirSync(blogDir)
    const slugs = new Set(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(file => getSlugFromFilename(file))
    )
    return Array.from(slugs)
  } catch {
    return []
  }
}

// Get all guide slugs from content/guides directory
function getGuideSlugs(): string[] {
  const guidesDir = path.join(process.cwd(), 'content/guides')
  try {
    const files = fs.readdirSync(guidesDir)
    const slugs = new Set(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(file => getSlugFromFilename(file))
    )
    return Array.from(slugs)
  } catch {
    return []
  }
}

// Get product slugs from data/products.json
function getProductSlugs(): string[] {
  const productsPath = path.join(process.cwd(), 'data/products.json')
  try {
    const fileContent = fs.readFileSync(productsPath, 'utf8')
    const products = JSON.parse(fileContent)
    return products.map((p: any) => p.slug)
  } catch {
    return []
  }
}

// Prompt library categories
const PROMPT_CATEGORIES = [
  'writing',
  'music-creation',
  'image-generation',
  'creative',
  'coding',
  'ai-architecture',
  'agent-development',
  'business',
  'social-media',
  'marketing',
  'productivity',
  'personal-development',
  'spiritual',
  'learning',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Core pages (highest priority)
  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/prompt-library', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/resources', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/creators', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/students', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/music-lab', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Tool pages
  const toolPages = [
    '/tools',
    '/tools/roi-calculator',
    '/tools/strategy-canvas',
    '/tools/builder',
  ]

  // Assessment pages
  const assessmentPages = [
    '/assessment',
    '/assessment/creative',
    '/assessment/advanced',
    '/ai-assessment',
    '/soul-frequency-assessment',
    '/soul-frequency-quiz',
  ]

  // Community and engagement pages
  const communityPages = [
    '/community',
    '/coaching',
    '/inner-circle',
    '/vault',
    '/labs',
    '/drops',
    '/skills',
    '/skills/builder',
    '/testimonials',
    '/affiliates',
    '/newsletter',
  ]

  // Learning and courses
  const learningPages = [
    '/courses',
    '/courses/conscious-ai-foundations',
    '/students/ikigai',
  ]

  // Content and creation pages
  const contentPages = [
    '/content-studio',
    '/creation-chronicles',
    '/intelligence-atlas',
    '/golden-age',
    '/golden-age/chapter-01-when-creation-calls',
  ]

  // AI and agent pages
  const aiPages = [
    '/agents',
    '/agent-team',
    '/agentic-ai-center',
    '/developers',
  ]

  // Utility pages
  const utilityPages = [
    '/start',
    '/search',
    '/contact',
    '/roadmap',
    '/achievements',
    '/goals',
    '/templates',
    '/resources/templates',
  ]

  // Legal pages
  const legalPages = [
    '/privacy',
    '/terms',
    '/legal',
  ]

  // Legacy pages (lower priority, may redirect)
  const legacyPages = [
    '/founder-playbook',
    '/insights',
    '/thank-you',
    '/enterprise',
    '/onboarding',
    '/dashboard',
  ]

  // Get dynamic content
  const blogSlugs = getBlogSlugs()
  const guideSlugs = getGuideSlugs()
  const productSlugs = getProductSlugs()

  // Build sitemap entries
  const entries: MetadataRoute.Sitemap = []

  // Core pages
  corePages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Product pages (dynamic)
  productSlugs.forEach(slug => {
    entries.push({
      url: `${BASE_URL}/products/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Tool pages
  toolPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Assessment pages
  assessmentPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Community pages
  communityPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Learning pages
  learningPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Content pages
  contentPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // AI pages
  aiPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Utility pages
  utilityPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  })

  // Legal pages
  legalPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  })

  // Legacy pages
  legacyPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    })
  })

  // Blog posts (high priority - fresh content)
  blogSlugs.forEach(slug => {
    entries.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Guide posts
  guideSlugs.forEach(slug => {
    entries.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Prompt library categories
  PROMPT_CATEGORIES.forEach(category => {
    entries.push({
      url: `${BASE_URL}/prompt-library/${category}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  return entries
}

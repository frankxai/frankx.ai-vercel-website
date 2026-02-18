import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { researchDomains } from '@/lib/research/domains'

const BASE_URL = 'https://frankx.ai'

// Extract slug from MDX filename
function getSlugFromFilename(filename: string): string {
  // Remove number prefix and .mdx extension
  return filename.replace(/^\d+-/, '').replace(/\.mdx$/, '')
}

// Get all blog slugs with dates from content/blog directory
function getBlogEntries(): { slug: string; date: string }[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  try {
    const files = fs.readdirSync(blogDir)
    const seen = new Set<string>()
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = getSlugFromFilename(file)
        if (seen.has(slug)) return null
        seen.add(slug)
        try {
          const content = fs.readFileSync(path.join(blogDir, file), 'utf8')
          const { data } = matter(content)
          return { slug, date: data.lastUpdated || data.date || '' }
        } catch {
          return { slug, date: '' }
        }
      })
      .filter((entry): entry is { slug: string; date: string } => entry !== null)
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
    '/workshops',
    '/team',
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
    '/feed',
    '/realm',
    '/ai-art',
  ]

  // AI and agent pages
  const aiPages = [
    '/agents',
    '/agent-team',
    '/agentic-ai-center',
    '/developers',
  ]

  // Audience landing pages
  const audiencePages = [
    { url: '/for/creators', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/for/architects', priority: 0.9, changeFrequency: 'monthly' as const },
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
    '/updates',
    '/free-playbook',
  ]

  // Legal pages
  const legalPages = [
    '/privacy',
    '/terms',
    '/legal',
  ]

  // Section pages (important navigation destinations)
  const sectionPages = [
    { url: '/soulbook', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/ai-world', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/see-through-the-noise', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ai-ops', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ai-architect-academy', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/links', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/learn', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/showcase', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/downloads', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/changelog', priority: 0.5, changeFrequency: 'weekly' as const },
    { url: '/design-system', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/ai-architect', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-architecture', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-architectures', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/music', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/prototypes', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  // Sub-route pages (nested under parent sections)
  const subRoutePages = [
    // AI Ops sub-routes
    { url: '/ai-ops/architecture', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-ops/patterns', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-ops/models-2026', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/ai-ops/maturity', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-ops/accelerator-packs', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-ops/agi-ready', priority: 0.7, changeFrequency: 'monthly' as const },
    // AI Architect sub-routes
    { url: '/ai-architect/ai-coe-hub', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ai-architect/multi-cloud-comparison', priority: 0.7, changeFrequency: 'monthly' as const },
    // Soulbook sub-routes
    { url: '/soulbook/7-pillars', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/soulbook/assessment', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/soulbook/golden-path', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/soulbook/life-symphony', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/soulbook/vault', priority: 0.7, changeFrequency: 'monthly' as const },
    // Design Lab
    { url: '/design-lab', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/design-lab/nature', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/design-lab/nature/variants', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/design-lab/v0', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/design-lab/acos', priority: 0.5, changeFrequency: 'monthly' as const },
    // ACOS
    { url: '/acos', priority: 0.7, changeFrequency: 'weekly' as const },
    // Plan
    { url: '/plan', priority: 0.6, changeFrequency: 'weekly' as const },
    // Inspiration
    { url: '/inspiration', priority: 0.6, changeFrequency: 'monthly' as const },
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

  // Research hub pages
  const researchPages = [
    { url: '/research', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/research/visionaries', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/research/entrepreneurs', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/builders', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/content-creators', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/inventors', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/researcher', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/professors', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/doctors', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/investors', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/designers', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/producers', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/research/sources', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/research/methodology', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  // Get dynamic content
  const blogEntries = getBlogEntries()
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

  // Research hub pages
  researchPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Research domain pages (dynamic from registry)
  researchDomains.forEach(domain => {
    entries.push({
      url: `${BASE_URL}/research/${domain.slug}`,
      lastModified: domain.lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
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

  // Section pages
  sectionPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Audience landing pages
  audiencePages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
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

  // Sub-route pages
  subRoutePages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Blog posts (high priority - use actual post dates)
  blogEntries.forEach(entry => {
    entries.push({
      url: `${BASE_URL}/blog/${entry.slug}`,
      lastModified: entry.date ? new Date(entry.date).toISOString() : currentDate,
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

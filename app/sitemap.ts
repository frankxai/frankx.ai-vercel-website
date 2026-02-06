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

  // AI Architecture cluster (major content hub)
  const aiArchitecturePages = [
    '/ai-architect',
    '/ai-architect-academy',
    '/ai-architect/ai-coe-hub',
    '/ai-architect/multi-cloud-comparison',
    '/ai-architecture',
    '/ai-architecture/blueprints',
    '/ai-architecture/prototypes',
    '/ai-architecture/templates',
    '/ai-architecture/tools',
    '/ai-architecture/multi-cloud-comparison',
    '/ai-architectures',
  ]

  // AI Ops research pages
  const aiOpsPages = [
    '/ai-ops/accelerator-packs',
    '/ai-ops/agi-ready',
    '/ai-ops/architecture',
    '/ai-ops/maturity',
    '/ai-ops/models-2026',
    '/ai-ops/patterns',
  ]

  // Research hub
  const researchPages = [
    '/research',
    '/research/applications',
    '/research/claims',
    '/ai-world',
  ]

  // Product deep pages
  const productDeepPages = [
    '/products/agentic-creator-os',
    '/products/creation-chronicles',
    '/products/creative-ai-toolkit',
    '/products/generative-creator-os',
    '/products/suno-prompt-library',
    '/products/vibe-os',
  ]

  // Soulbook pages (lead magnet product)
  const soulbookPages = [
    '/soulbook',
    '/soulbook/7-pillars',
    '/soulbook/golden-path',
    '/soulbook/life-symphony',
    '/soulbook/vault',
    '/soulbook/assessment',
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

  // Ritual pages (daily practice hub)
  const ritualPages = [
    '/rituals',
    '/rituals/morning',
    '/rituals/flow',
    '/rituals/music',
    '/rituals/focus',
    '/rituals/transition',
    '/rituals/evening',
  ]

  // Learning pages
  const learningPages = [
    '/courses',
    '/courses/conscious-ai-foundations',
    '/students/ikigai',
    '/learn',
  ]

  // Content and creation pages
  const contentPages = [
    '/content-studio',
    '/creation-chronicles',
    '/intelligence-atlas',
    '/golden-age',
    '/feed',
    '/music',
    '/showcase',
    '/downloads',
    '/changelog',
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
    '/links',
    '/prototypes',
  ]

  // Legal pages
  const legalPages = [
    '/privacy',
    '/terms',
    '/legal',
    '/legal/accessibility',
    '/legal/affiliate-disclosure',
    '/legal/dmca',
  ]

  // Legacy pages (lower priority, may redirect)
  const legacyPages = [
    '/founder-playbook',
    '/insights',
    '/thank-you',
    '/onboarding',
    '/dashboard',
    '/realm',
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

  // AI Architecture pages (high-value content cluster)
  aiArchitecturePages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // AI Ops pages (research content)
  aiOpsPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Research hub pages
  researchPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Product deep pages
  productDeepPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Soulbook pages (lead magnet)
  soulbookPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Product pages (from products.json)
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

  // Ritual pages (daily practice hub - high engagement)
  ritualPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
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

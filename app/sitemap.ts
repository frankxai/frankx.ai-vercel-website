import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { researchDomains } from '@/lib/research/domains'
import { listPartners } from '@/content/partnerships'
import { getAllModels } from '@/lib/llm-hub/registry'
import { COMPARISONS } from '@/lib/llm-hub/comparisons'
// Pre-baked at build time by scripts/build-route-index.mjs (which uses
// lib/route-enumeration.mjs). Importing the JSON keeps the sitemap lambda
// small — calling enumerateRoutes() at request time forces Turbopack to
// bundle every file under content/, data/, lib/research/ etc. into the
// function (42k+ files → blows past Vercel's 250MB lambda limit and the
// deploy ERRORs after build).
import routeIndex from '@/data/route-index.json'

const BASE_URL = 'https://frankx.ai'

// Extract slug from MDX filename
function getSlugFromFilename(filename: string): string {
  // Preserve exact filename slug used by the /blog/[slug] route.
  return filename.replace(/\.mdx$/, '')
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

// Get all newsletter issue slugs (published only — drafts excluded from sitemap)
function getNewsletterIssues(): { slug: string; date: string; status: string }[] {
  const issuesDir = path.join(process.cwd(), 'content/newsletters/issues')
  try {
    const files = fs.readdirSync(issuesDir)
    return files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => {
        try {
          const content = fs.readFileSync(path.join(issuesDir, file), 'utf8')
          const { data } = matter(content)
          if (!data.slug) return null
          return {
            slug: data.slug as string,
            date: (data.date as string) || '',
            status: (data.status as string) || 'draft',
          }
        } catch {
          return null
        }
      })
      .filter((e): e is { slug: string; date: string; status: string } => e !== null)
      // Only published issues hit the sitemap; drafts are noindex'd at the page level
      .filter((e) => e.status === 'sent' || e.status === 'archived')
  } catch {
    return []
  }
}

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
    '/newsletter/archive',
    '/workshops',
    '/team',
  ]

  // Learning and courses
  const learningPages = [
    '/courses',
    '/courses/conscious-ai-foundations',
    '/courses/agent-architecture-systems',
    '/courses/creator-business-systems',
    '/workshops/ikigai-branding',
    '/workshops/ai-2026-graduates',
    '/workshops/build-first-ai-agent',
    '/workshops/ai-music-masterclass',
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
    '/ai-architect',
    '/developers',
  ]

  // Papa hub — public-indexed pages only.
  // Personal archive (/papa/erinnerungen/, /papa/mitmachen/) is deliberately omitted
  // from the sitemap — those pages set robots: noindex on the page itself.
  // Slimmed 2026-05-05: removed /papa/ru (was performative without Russian audience).
  const papaPages = [
    '/papa',
    '/papa/leben',
    '/papa/en',
    '/papa/en/life',
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
    '/gallery',
    '/watch',
  ]

  // Legal pages
  const legalPages = [
    '/privacy',
    '/terms',
    '/legal',
  ]

  // Strategy and framework pages
  const strategyPages = [
    { url: '/youtube', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/opus-pro', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // Video and Ritual pages
  const videoPages = [
    { url: '/watch', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/watch/shorts', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/rituals', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  // Individual Short detail pages — SEO gold per Short
  let shortDetailPages: { url: string; priority: number; changeFrequency: 'weekly' }[] = []
  try {
    const vault = require('@/data/video-vault-100.json') as Array<{
      id: string
      format?: string
    }>
    shortDetailPages = vault
      .filter((v) => v.format === 'short')
      .map((v) => ({
        url: `/watch/shorts/${v.id}`,
        priority: 0.75,
        changeFrequency: 'weekly' as const,
      }))
  } catch {
    /* vault may not exist */
  }

  // Section pages (important navigation destinations)
  const sectionPages = [
    { url: '/vision', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/soulbook', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/ai-world', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/see-through-the-noise', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ai-ops', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/ai-architect-academy', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/links', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/learn', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/learn/claude-mastery', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/learn/gemini-mastery', priority: 0.85, changeFrequency: 'weekly' as const },
    // LLM Hub — the model intelligence surface (high-priority SEO)
    { url: '/llm-hub', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/llm-hub/compare', priority: 0.8, changeFrequency: 'weekly' as const },
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
    { url: '/acos/agents', priority: 0.8, changeFrequency: 'weekly' as const },
    // Starlight Intelligence System
    { url: '/starlight-intelligence-system', priority: 0.9, changeFrequency: 'weekly' as const },
    // Investment Intelligence System (IIS) — public hub
    { url: '/intelligence-system', priority: 0.9, changeFrequency: 'weekly' as const },
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
    '/onboarding',
    '/dashboard',
  ]

  // Research hub pages
  const researchPages = [
    { url: '/research', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/research/sources', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/research/methodology', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  // Library OS hub + manifesto/build/quotes funnels
  const libraryPages = [
    { url: '/library', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/library/approach', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/library/build', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/library/quotes', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  // Library OS — individual book deep-dives (dynamic from book-reviews registry)
  let libraryDetailPages: { url: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = []
  try {
    const reviews = require('@/data/book-reviews').bookReviews as Array<{
      slug: string
      reviewDate?: string
    }>
    libraryDetailPages = reviews.map((r) => ({
      url: `/library/${r.slug}`,
      priority: 0.75,
      changeFrequency: 'monthly' as const,
    }))
  } catch {
    /* book-reviews may not exist in test envs */
  }

  // FrankX OS — meta-spine + per-module deep-dives (dynamic from os-modules registry)
  const osHubPages = [
    { url: '/os', priority: 0.9, changeFrequency: 'weekly' as const },
  ]
  let osDetailPages: { url: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = []
  try {
    const mods = require('@/data/os-modules').osModules as Array<{ slug: string }>
    osDetailPages = mods.map((m) => ({
      url: `/os/${m.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    }))
  } catch {
    /* os-modules may not exist */
  }

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
  
      // Strategy pages
      strategyPages.forEach(page => {
        entries.push({
          url: `${BASE_URL}${page.url}`,
          lastModified: currentDate,
          changeFrequency: page.changeFrequency,
          priority: page.priority,
        })
      })
    
      // Video pages
      videoPages.forEach(page => {
        entries.push({
          url: `${BASE_URL}${page.url}`,
          lastModified: currentDate,
          changeFrequency: page.changeFrequency,
          priority: page.priority,
        })
      })

      // Individual Short detail pages
      shortDetailPages.forEach(page => {
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

  // Papa hub (man-as-fact pages only — see papaPages comment above)
  papaPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
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

  // LLM Hub — per-model pages (dynamic, keyed by registry slug)
  getAllModels().forEach((m) => {
    entries.push({
      url: `${BASE_URL}/llm-hub/${m.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    })
  })

  // LLM Hub — head-to-head comparison pages (dynamic)
  COMPARISONS.forEach((c) => {
    entries.push({
      url: `${BASE_URL}/llm-hub/compare/${c.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Library OS — hub + manifesto + build + quotes
  libraryPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Library OS — individual book deep-dives
  libraryDetailPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // FrankX OS — meta-spine hub
  osHubPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // FrankX OS — per-module deep-dives
  osDetailPages.forEach(page => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Partnerships — strategic-partner hub + per-partner deep pages
  entries.push({
    url: `${BASE_URL}/partnerships`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  })
  listPartners().forEach(partner => {
    entries.push({
      url: `${BASE_URL}/partnerships/${partner.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: partner.status === 'active' ? 0.8 : 0.5,
    })
  })

  // Newsletter issues — published only (drafts noindex'd at page level)
  getNewsletterIssues().forEach((issue) => {
    entries.push({
      url: `${BASE_URL}/newsletter/archive/${issue.slug}`,
      lastModified: issue.date ? new Date(issue.date).toISOString() : currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  })

  // Routes that must NEVER appear in the sitemap because they're noindex'd
  // at the page level (robots: index: false) or are private surfaces.
  // Keep in sync with app/robots.ts disallow list + per-page robots metadata.
  const noindexRoutes = new Set<string>([
    '/tribe',
    '/unsubscribe',
    '/onboarding',
    '/dashboard',
    '/command-center',
    '/papa/erinnerungen',
    '/papa/mitmachen',
  ])
  const noindexPrefixes = ['/tribe/', '/preview/', '/prototype/', '/admin/', '/api/', '/auth/']

  function isNoindex(pathname: string): boolean {
    if (noindexRoutes.has(pathname)) return true
    return noindexPrefixes.some((prefix) => pathname.startsWith(prefix))
  }

  // Auto-discovery safety net — pull every route from the pre-baked
  // data/route-index.json (built from lib/route-enumeration.mjs at prebuild)
  // and add any that the hand-curated arrays above missed. The existing
  // entry wins on collision, so manual priority/changeFrequency settings
  // are preserved.
  const seenUrls = new Set(entries.map((e) => e.url))
  // Prune any noindex'd routes that the hand-curated arrays accidentally
  // included (defensive — newer waves may add /tribe etc. to the legacy
  // arrays without realizing they're noindex'd).
  for (let i = entries.length - 1; i >= 0; i--) {
    const pathname = entries[i].url.replace(BASE_URL, '')
    if (isNoindex(pathname)) {
      seenUrls.delete(entries[i].url)
      entries.splice(i, 1)
    }
  }
  try {
    const discovered = (routeIndex as { routes: Array<{ href: string; type: string }> }).routes
    // Heuristic priority + frequency by route type — only used for routes that
    // weren't already in the hand-curated arrays above.
    const defaults: Record<string, { priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = {
      core: { priority: 0.8, changeFrequency: 'weekly' },
      blog: { priority: 0.7, changeFrequency: 'monthly' },
      workshop: { priority: 0.8, changeFrequency: 'monthly' },
      product: { priority: 0.8, changeFrequency: 'weekly' },
      guide: { priority: 0.7, changeFrequency: 'monthly' },
      library: { priority: 0.7, changeFrequency: 'monthly' },
      os: { priority: 0.7, changeFrequency: 'monthly' },
      research: { priority: 0.7, changeFrequency: 'weekly' },
      newsletter: { priority: 0.75, changeFrequency: 'monthly' },
      partnership: { priority: 0.6, changeFrequency: 'monthly' },
      tool: { priority: 0.6, changeFrequency: 'monthly' },
      community: { priority: 0.6, changeFrequency: 'monthly' },
      section: { priority: 0.5, changeFrequency: 'monthly' },
      video: { priority: 0.7, changeFrequency: 'weekly' },
      static: { priority: 0.4, changeFrequency: 'yearly' },
      legacy: { priority: 0.3, changeFrequency: 'yearly' },
    }
    for (const route of discovered) {
      if (isNoindex(route.href)) continue
      const url = `${BASE_URL}${route.href}`
      if (seenUrls.has(url)) continue
      seenUrls.add(url)
      const def = defaults[route.type] ?? defaults.section
      entries.push({
        url,
        lastModified: currentDate,
        changeFrequency: def.changeFrequency,
        priority: def.priority,
      })
    }
  } catch (err) {
    // Don't fail sitemap generation if the pre-baked index is missing or
    // malformed — the hand-curated arrays above still produce a valid sitemap.
    console.warn('[sitemap] route-index auto-discovery failed:', (err as Error).message)
  }

  return entries
}

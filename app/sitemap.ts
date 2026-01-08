import { MetadataRoute } from 'next'
import { getAllBlogPosts, BlogPost } from '@/lib/blog'

const baseUrl = 'https://frankx.ai'

// Static pages with their priority and change frequency
const staticPages: { url: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }[] = [
  // Core Pages (Highest Priority)
  { url: '', priority: 1.0, changeFrequency: 'daily' },
  { url: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/start', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },

  // Products (High Priority - Revenue Pages)
  { url: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/products/creative-ai-toolkit', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/products/vibe-os', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/products/agentic-creator-os', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/products/creation-chronicles', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/products/generative-creator-os', priority: 0.8, changeFrequency: 'weekly' },

  // Soulbook (High Priority - Lead Magnet)
  { url: '/soulbook', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/soulbook/vault', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/soulbook/7-pillars', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/soulbook/assessment', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/soulbook/golden-path', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/soulbook/life-symphony', priority: 0.8, changeFrequency: 'monthly' },

  // Content Hubs (High Priority)
  { url: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { url: '/courses', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/courses/conscious-ai-foundations', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/resources', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/resources/skills', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/resources/templates', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/templates', priority: 0.7, changeFrequency: 'weekly' },

  // Interactive Tools (Medium-High Priority)
  { url: '/intelligence-atlas', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/agentic-ai-center', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/agents', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/agent-team', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/prompt-library', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/music-lab', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/content-studio', priority: 0.7, changeFrequency: 'weekly' },

  // Assessments (Medium Priority)
  { url: '/assessment', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/assessment/advanced', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/assessment/creative', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/ai-assessment', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/soul-frequency-assessment', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/soul-frequency-quiz', priority: 0.7, changeFrequency: 'monthly' },

  // Community & Engagement (Medium Priority)
  { url: '/realm', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/creation-chronicles', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/community', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/testimonials', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/showcase', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/team', priority: 0.6, changeFrequency: 'monthly' },

  // Tools (Medium Priority)
  { url: '/tools', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/tools/builder', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/tools/roi-calculator', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/tools/strategy-canvas', priority: 0.6, changeFrequency: 'monthly' },

  // Founder & Business (Medium Priority)
  { url: '/founder-playbook', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/coaching', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/affiliates', priority: 0.5, changeFrequency: 'monthly' },

  // Student Portal (Medium Priority)
  { url: '/students', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/students/coe-builder', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/students/prompts', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/students/roles', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/students/workshop', priority: 0.5, changeFrequency: 'monthly' },

  // Utility Pages (Low Priority)
  { url: '/search', priority: 0.5, changeFrequency: 'weekly' },
  { url: '/insights', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/roadmap', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/goals', priority: 0.4, changeFrequency: 'monthly' },
  { url: '/achievements', priority: 0.4, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Get current date for lastModified
  const now = new Date()

  // Build static page entries
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Get all blog posts dynamically
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = getAllBlogPosts()
    blogEntries = posts.map((post: BlogPost) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: post.featured ? 0.9 : 0.7,
    }))
  } catch (error) {
    // If blog posts can't be loaded, continue with static pages only
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Combine all entries
  return [...staticEntries, ...blogEntries]
}

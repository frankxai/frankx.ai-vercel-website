import { getAllBlogPosts } from '@/lib/blog'
import { getPublishedBooks } from '@/app/books/lib/books-registry'

// ── Shared types for all homepage variations ──

export interface LatestPost {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
  date: string
  image?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FeaturedTrackData {
  id: string
  title: string
  sunoId: string
  audioUrl: string
  genre: string[]
  plays: number
  duration: string
}

export interface BookData {
  slug: string
  title: string
  subtitle: string
  coverImage: string
}

export interface ProductItem {
  title: string
  description: string
  href: string
  color: 'emerald' | 'violet' | 'cyan' | 'blue' | 'orange' | 'magenta'
}

export interface LearningCard {
  title: string
  description: string
  href: string
  image: string
  color: 'emerald' | 'violet' | 'cyan' | 'amber'
}

export interface DesignLabImage {
  src: string
  alt: string
}

export interface HomepageData {
  latestPosts: LatestPost[]
  faqs: FAQItem[]
  featuredTrack: FeaturedTrackData
  books: BookData[]
  products: ProductItem[]
  learningCards: LearningCard[]
  designLabImages: DesignLabImage[]
  credentials: string[]
}

// ── Static data ──

const homepageFAQs: FAQItem[] = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the personal hub of Frank Riemer — an AI Systems Architect and creator of 12,000+ AI-generated songs with Suno. The site features technical tutorials, AI architecture guides, music production workflows, and open-source creator tools.',
  },
  {
    question: 'What kind of content does FrankX publish?',
    answer:
      'FrankX publishes in-depth technical tutorials on AI coding agents (Claude Code, Cline, OpenCode), enterprise AI architecture patterns, Suno AI music production guides, prompt engineering frameworks, and multi-agent orchestration patterns.',
  },
  {
    question: 'How can I learn AI music production with Suno?',
    answer:
      'Start with the Suno Prompt Engineering Complete Guide on the blog, which covers the 5-Layer Prompt Architecture, genre-specific techniques, and frequency science. FrankX has produced 12,000+ tracks and shares production workflows and prompt templates.',
  },
  {
    question: 'What is the Agentic Creator OS (ACOS)?',
    answer:
      'ACOS is an open-source operating system for Claude Code with 75+ skills, 38 specialized agents, and 35+ commands. It turns Claude Code into a full creative production environment. Free on GitHub, with premium Creator Kit ($47) and Pro System ($197) tiers.',
  },
  {
    question: 'Does FrankX offer courses or coaching?',
    answer:
      'FrankX offers free guides and tutorials on the blog, with premium coaching programs in development. Join the waitlist at frankx.ai/coaching for early access to AI architecture and creator workflow training.',
  },
]

const vibeOsTrack: FeaturedTrackData = {
  id: 'vibe-os-homepage',
  title: 'Vibe O S',
  sunoId: '9cbad174-9276-427f-9aed-1ba00c7db3db',
  audioUrl:
    'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/music/9cbad174-9276-427f-9aed-1ba00c7db3db/9cbad174-9276-427f-9aed-1ba00c7db3db.mp3',
  genre: ['Female Hip Hop'],
  plays: 128,
  duration: '4:00',
}

const products: ProductItem[] = [
  {
    title: 'Agentic Creator OS',
    description: '75+ skills, 38 agents, 35+ commands. The open-source operating system for Claude Code.',
    href: '/acos',
    color: 'emerald',
  },
  {
    title: 'Prompt Library',
    description: 'Battle-tested prompts for writing, music, coding, and image generation. Free to use.',
    href: '/prompt-library',
    color: 'violet',
  },
  {
    title: 'Creator Kit',
    description: 'Premium templates, video guides, and direct support for ACOS. From $47.',
    href: '/products',
    color: 'cyan',
  },
  {
    title: 'AI Architecture Hub',
    description: 'Enterprise AI patterns, agent orchestration, system design. Built at Oracle.',
    href: '/ai-architecture',
    color: 'blue',
  },
  {
    title: 'Music Lab',
    description: '12,000+ AI songs. Production workflows. Genre mastery guides.',
    href: '/music-lab',
    color: 'orange',
  },
  {
    title: 'Design Lab',
    description: 'Generative art, visual experiments, nature-tech aesthetics.',
    href: '/design-lab',
    color: 'magenta',
  },
]

const learningCards: LearningCard[] = [
  {
    title: 'Students & Creators',
    description: 'AI guides for students, families, and aspiring creators.',
    href: '/students',
    image: '/images/blog/agi-2026-opportunities-students-creators-hero.png',
    color: 'cyan',
  },
  {
    title: 'Guides & Tutorials',
    description: 'Step-by-step guides from beginner to advanced.',
    href: '/guides',
    image: '/images/blog/ultimate-guide-ai-coding-agents-2026-hero-v2.png',
    color: 'emerald',
  },
  {
    title: 'Watch',
    description: 'Video tutorials and workshop recordings.',
    href: '/watch',
    image: '/images/blog/creators-ai-toolkit-workshop-hero.png',
    color: 'violet',
  },
  {
    title: 'Tools & Resources',
    description: 'Curated tools, templates, and resource libraries.',
    href: '/tools',
    image: '/images/blog/golden-age-field-guide-hero.png',
    color: 'amber',
  },
]

const designLabImages: DesignLabImage[] = [
  { src: '/images/design-lab/nature-01-digital-garden-hero.png', alt: 'Digital Garden' },
  { src: '/images/design-lab/nature-02-neural-roots.png', alt: 'Neural Roots' },
  { src: '/images/design-lab/nature-03-code-vines.png', alt: 'Code Vines' },
  { src: '/images/design-lab/nature-04-data-streams.png', alt: 'Data Streams' },
  { src: '/images/design-lab/nature-05-forest-architecture.png', alt: 'Forest Architecture' },
  { src: '/images/design-lab/nature-07-intelligence-bloom.png', alt: 'Intelligence Bloom' },
]

const credentials = [
  'AI Architect at Oracle',
  '12,000+ AI Songs Created',
  '75+ Open Source Skills',
  'Everything Documented',
]

// ── Data fetcher used by all homepage variations ──

export function getHomepageData(): HomepageData {
  const latestPosts = getAllBlogPosts()
    .slice(0, 6)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      readingTime: p.readingTime,
      date: p.date,
      image: p.image,
    }))

  const books = getPublishedBooks().map((b) => ({
    slug: b.slug,
    title: b.title,
    subtitle: b.subtitle,
    coverImage: b.coverImage,
  }))

  return {
    latestPosts,
    faqs: homepageFAQs,
    featuredTrack: vibeOsTrack,
    books,
    products,
    learningCards,
    designLabImages,
    credentials,
  }
}

import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'

export const metadata = createMetadata({
  title: 'FrankX - AI Architect & Creator Systems',
  description:
    'Former AI architect at Oracle. Creator of 12,000+ songs with Suno. Practical AI systems, music experiments, and evidence-led performance notes for creators who ship with clarity.',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'ai architect',
    'personal AI operating system',
    'AI creator systems',
    'attention and recovery systems',
    'ai music creation',
    'suno ai',
    'ai architecture',
    'ai workflow automation',
    'creator tools',
    'agentic workflows',
    'enterprise ai',
    'claude code',
    'multi-agent systems',
    'ai coding agents',
    'prompt engineering',
  ],
  path: '/',
})

const siteUrl = siteConfig.url

const websiteSchema = {
  '@id': `${siteUrl}/#website`,
  name: 'FrankX',
  alternateName: ['FrankX.AI', 'Frank Riemer'],
  url: siteUrl,
  description:
    'FrankX is Frank Riemer\'s home for AI creator systems, agentic workflows, music experiments, and evidence-led performance notes.',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  about: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  '@id': `${siteUrl}/#frank-riemer`,
  name: 'Frank Riemer',
  jobTitle: 'AI Architect and Creator',
  url: `${siteUrl}/frank-riemer`,
  image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
  mainEntityOfPage: {
    '@id': `${siteUrl}/frank-riemer`,
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Oracle',
  },
  brand: {
    '@id': `${siteUrl}/#organization`,
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
    socialLinks.twitter,
  ],
  knowsAbout: [
    'AI Architecture',
    'Personal AI Operating Systems',
    'AI Creator Systems',
    'AI Music Creation',
    'Suno AI',
    'Attention and Recovery Systems',
    'Enterprise AI Strategy',
    'Cloud Infrastructure',
    'Agentic Workflows',
  ],
}

const organizationSchema = {
  '@id': `${siteUrl}/#organization`,
  name: 'FrankX',
  alternateName: 'FrankX.AI',
  url: siteUrl,
  logo: `${siteUrl}/images/brand/logo-full.png`,
  founder: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
  ],
  description:
    'FrankX publishes AI creator systems, agentic workflow labs, music experiments, and practical performance notes from Frank Riemer.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the independent personal hub of Frank Riemer, a former AI architect at Oracle and creator of 12,000+ AI-generated songs with Suno. The site features technical tutorials, AI architecture guides, music production workflows, and open-source creator tools. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.',
  },
  {
    question: 'What kind of content does FrankX publish?',
    answer:
      'FrankX publishes technical tutorials on AI coding agents, enterprise AI architecture patterns, Suno AI music production guides, prompt engineering frameworks, multi-agent orchestration, and the Signal Loop field notes.',
  },
  {
    question: 'How can I learn AI music production with Suno?',
    answer:
      'Start with the Suno Prompt Engineering Complete Guide on the blog, which covers the 5-Layer Prompt Architecture, genre-specific techniques, and tuning and texture choices. FrankX has produced 12,000+ tracks and shares production workflows and prompt templates.',
  },
  {
    question: 'What is the Agentic Creator OS (ACOS)?',
    answer:
      'ACOS is an open-source operating system for Claude Code with 75+ skills, 38 specialized agents, and 35+ commands. It turns Claude Code into a full creative production environment. Free on GitHub, with premium Creator Kit ($47) and Pro System ($197) tiers.',
  },
  {
    question: 'Where does peak performance fit?',
    answer:
      'FrankX treats performance as an evidence-led creator system: attention, energy, recovery, and emotional steadiness. It is not medical advice or miracle biohacking.',
  },
  {
    question: 'Does FrankX offer courses or coaching?',
    answer:
      'FrankX offers free guides and tutorials on the blog, with premium coaching programs in development. Join the waitlist at frankx.ai/coaching for early access to AI architecture and creator workflow training.',
  },
]

const featuredTrack = {
  id: 'vibe-os-track',
  title: 'Vibe O S',
  sunoId: '9cbad174-9276-427f-9aed-1ba00c7db3db',
  audioUrl:
    'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/music/9cbad174-9276-427f-9aed-1ba00c7db3db/9cbad174-9276-427f-9aed-1ba00c7db3db.mp3',
  genre: ['female hip hop', 'bass-heavy', 'lyrical'],
  plays: 128,
  duration: '4:00',
}

export default function Page() {
  const latestPosts = getAllBlogPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      readingTime: p.readingTime,
      date: p.date,
    }))

  const libraryBooks = bookReviews
    .filter((r) => (r.quotes?.length ?? 0) > 0 && (r.chapters?.length ?? 0) > 0)
    .sort((a, b) => (b.quotes?.length ?? 0) - (a.quotes?.length ?? 0))
    .slice(0, 5)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      author: r.author,
      coverImage: r.coverImage,
      quoteCount: r.quotes?.length ?? 0,
      chapterCount: r.chapters?.length ?? 0,
    }))

  return (
    <>
      <HomePageElite
        latestPosts={latestPosts}
        faqs={homepageFAQs}
        libraryBooks={libraryBooks}
        featuredTrack={featuredTrack}
      />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}

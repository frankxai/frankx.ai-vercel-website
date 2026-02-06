import { notFound } from 'next/navigation'
import { getAllGuides, getGuide } from '@/lib/guides'
import { MDXContent } from '@/components/blog/MDXContent'
import Link from 'next/link'
import HeroImage from '@/components/ui/HeroImage'
import { generateGuideSchema } from '@/lib/schema'

// Static generation - content is read at build time
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide Not Found' }
  const ogImage = guide.image
    ? guide.image
    : `/api/og?title=${encodeURIComponent(guide.title)}&subtitle=${encodeURIComponent(guide.description)}`
  return {
    title: `${guide.title} | FrankX Guides`,
    description: guide.description,
    keywords: guide.tags,
    alternates: {
      canonical: `https://frankx.ai/guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.date,
      authors: [guide.author],
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

function SchemaScript({ schema }: { schema: object }) {
  // Schema data is generated server-side from trusted guide content (not user input)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return notFound()

  const schemas = generateGuideSchema({
    title: guide.title,
    description: guide.description,
    slug,
    datePublished: guide.date,
    image: guide.image || undefined,
    category: guide.category,
  })

  return (
    <div className="min-h-screen bg-[#030712]">
      {schemas.map((schema, i) => (
        <SchemaScript key={i} schema={schema} />
      ))}
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/guides" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium">
            ← All Guides
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">{guide.title}</h1>
          <div className="text-sm text-slate-400 mb-8 flex items-center gap-3">
            <span>{guide.readingTime}</span>
            <span className="text-slate-600">•</span>
            <span>{new Date(guide.date).toLocaleDateString()}</span>
            <span className="text-slate-600">•</span>
            <span>{guide.author}</span>
          </div>
          <HeroImage
            src={guide.image || undefined}
            title={guide.title}
            subtitle={guide.description}
            alt={guide.title}
            className="mb-10"
          />
          <div className="space-y-6 text-base leading-relaxed text-white/75">
            <MDXContent source={guide.content} />
          </div>
        </div>
      </main>
    </div>
  )
}

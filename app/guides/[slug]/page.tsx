import { notFound } from 'next/navigation'
import { getAllGuides, getGuide } from '@/lib/guides'
import { MDXContent } from '@/components/blog/MDXContent'
import Link from 'next/link'
import HeroImage from '@/components/ui/HeroImage'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

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
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [ogImage],
    }
  }
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return notFound()
  return (
    <div className="min-h-screen bg-[#030712]">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Guides', href: '/guides' },
              { label: guide.title, href: `/guides/${guide.slug}` },
            ]}
          />
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

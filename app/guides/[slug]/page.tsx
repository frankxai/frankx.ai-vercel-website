import { notFound } from 'next/navigation'
import { getAllGuides, getGuide } from '@/lib/guides'
import { MDXContent } from '@/components/blog/MDXContent'
import Link from 'next/link'
import HeroImage from '@/components/ui/HeroImage'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import LearnHubSection from '@/components/learn/LearnHubSection'
import { portalsForGuide } from '@/lib/learn/related-portals'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import AgenticObsidianHero from '@/components/guides/AgenticObsidianHero'

// Static generation - content is read at build time
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide Not Found' }
  const ogImage = guide.image
    ? guide.image
    : `/api/og?title=${encodeURIComponent(guide.title)}&subtitle=${encodeURIComponent(guide.description)}`
  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    image: ogImage,
    type: 'article',
    publishedTime: guide.date,
    updatedTime: guide.updated || guide.date,
    authors: [guide.author],
  })
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return notFound()
  const canonicalUrl = `https://frankx.ai/guides/${guide.slug}`
  const schemaImage = guide.image ? new URL(guide.image, canonicalUrl).toString() : undefined
  const articleSchema = {
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated || guide.date,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: { '@type': 'Person', name: guide.author },
    publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
    ...(schemaImage ? { image: schemaImage } : {}),
  }
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd type="Article" data={articleSchema} id={`guide-article-${guide.slug}`} />
      {guide.faqs && guide.faqs.length > 0 ? (
        <FAQPageJsonLd faqs={guide.faqs} id={`guide-faq-${guide.slug}`} />
      ) : null}
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
          {guide.slug === 'agentic-obsidian-second-brain' ? (
            <AgenticObsidianHero />
          ) : (
            <HeroImage
              src={guide.image || undefined}
              title={guide.title}
              subtitle={guide.description}
              alt={guide.title}
              className="mb-10"
            />
          )}
          <div className="space-y-6 text-base leading-relaxed text-white/75">
            <MDXContent source={guide.content} />
          </div>
          {guide.faqs && guide.faqs.length > 0 ? (
            <section className="mt-16 border-t border-white/10 pt-12" aria-labelledby="guide-faq-heading">
              <h2 id="guide-faq-heading" className="text-3xl font-bold tracking-tight text-white">
                Frequently asked questions
              </h2>
              <div className="mt-8 space-y-8">
                {guide.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                    <p className="mt-3 text-[17px] leading-8 text-white/75">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <LearnHubSection
          relatedPortals={portalsForGuide(guide.slug)}
          variant="compact"
          eyebrow="Keep learning"
          blurb="Curated videos, official docs, and expert channels for the platforms this guide touches."
        />
      </main>
    </div>
  )
}

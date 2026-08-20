import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FlaskConical } from 'lucide-react'
import { notFound } from 'next/navigation'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import JsonLd from '@/components/seo/JsonLd'
import QualityEvidence from '@/components/qualities/QualityEvidence'
import QualityFrame from '@/components/qualities/QualityFrame'
import {
  coreQualitiesEvidenceEvent,
  coreQualitiesNavigationEvent,
} from '@/lib/core-qualities-analytics'
import { createMetadata, siteConfig } from '@/lib/seo'
import { getQuality, qualities, qualitySlugs } from '@/lib/qualities'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return qualitySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const quality = getQuality(slug)
  if (!quality) return {}

  return createMetadata({
    title: `${quality.name}: ${quality.axiom}`,
    description: quality.thesis,
    path: `/qualities/${quality.slug}`,
    image: quality.image,
    type: 'article',
    keywords: [
      `${quality.name.toLowerCase()} as a core quality`,
      `${quality.name.toLowerCase()} and AI`,
      'Frank Riemer',
      'personal decision framework',
      'human values in technology',
    ],
    authors: ['Frank Riemer'],
    updatedTime: '2026-08-12',
  })
}

export default async function QualityPage({ params }: PageProps) {
  const { slug } = await params
  const quality = getQuality(slug)
  if (!quality) notFound()

  const index = qualities.findIndex((item) => item.slug === quality.slug)
  const previous = qualities[(index - 1 + qualities.length) % qualities.length]
  const next = qualities[(index + 1) % qualities.length]

  const articleSchema = {
    headline: `${quality.name}: ${quality.axiom}`,
    description: quality.thesis,
    image: `${siteConfig.url}${quality.image}`,
    datePublished: '2026-08-12',
    dateModified: '2026-08-12',
    mainEntityOfPage: `${siteConfig.url}/qualities/${quality.slug}`,
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: `${siteConfig.url}/about`,
      jobTitle: 'AI Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrankX',
      url: siteConfig.url,
    },
    about: quality.name,
  }

  const breadcrumbSchema = {
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Qualities', item: `${siteConfig.url}/qualities` },
      {
        '@type': 'ListItem',
        position: 3,
        name: quality.name,
        item: `${siteConfig.url}/qualities/${quality.slug}`,
      },
    ],
  }

  return (
    <main id="main" className="min-h-screen overflow-hidden bg-void text-white">
      <JsonLd type="Article" data={articleSchema} id={`quality-${quality.slug}-article`} />
      <JsonLd type="BreadcrumbList" data={breadcrumbSchema} id={`quality-${quality.slug}-breadcrumb`} />

      <section className="relative border-b border-white/[0.07] pt-24 sm:pt-28">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb" className="py-6">
            <TrackedLink
              href="/qualities"
              {...coreQualitiesNavigationEvent({
                source: 'detail',
                placement: 'breadcrumb',
                destination: 'overview',
                quality_slug: quality.slug,
              })}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
            >
              <ArrowLeft className="h-4 w-4" />
              The four qualities
            </TrackedLink>
          </nav>

          <div className="grid items-stretch border-x border-t border-white/[0.08] lg:min-h-[42rem] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/75">
                {quality.number} · {quality.role}
              </p>
              <h1 className="mt-5 font-display text-[clamp(3.3rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
                {quality.name}
              </h1>
              <p className="mt-7 max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-white/90 sm:text-4xl">
                {quality.axiom}
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">{quality.thesis}</p>
              <TrackedLink
                href="#practice"
                {...coreQualitiesNavigationEvent({
                  source: 'detail',
                  placement: 'hero_cta',
                  destination: 'practice',
                  quality_slug: quality.slug,
                })}
                className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/[0.12] px-5 text-sm font-medium text-white/70 transition-colors hover:border-emerald-300/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                See it in practice
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden border-t border-white/[0.08] lg:border-l lg:border-t-0">
              <Image
                src={quality.image}
                alt={quality.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">What I mean</p>
            <div className="mt-8 hidden lg:block">
              <QualityFrame active={quality.slug} />
            </div>
          </div>
          <div>
            <p className="text-xl leading-9 text-white/[0.78] sm:text-2xl sm:leading-10">{quality.definition}</p>
            <div className="mt-10 border-l border-amber-200/35 pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/60">Where it came from</p>
              <p className="mt-4 text-base leading-8 text-white/[0.58]">{quality.origin}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="practice" className="scroll-mt-24 border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">In practice</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                A principle is only real when it changes the build.
              </h2>
              <div className="mt-9 space-y-5">
                {quality.practice.map((practice) => (
                  <div key={practice} className="flex gap-4 text-sm leading-7 text-white/[0.62]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300/70" />
                    <p>{practice}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-1 rounded-[1.5rem] border border-white/10 p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Decision filter</p>
              <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {quality.decisionQuestions.map((question, questionIndex) => (
                  <li key={question} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                    <span className="font-mono text-[10px] text-emerald-300/60">
                      {String(questionIndex + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-7 text-white/75">{question}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-l border-amber-200/35 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/60">The shadow</p>
                <p className="mt-3 text-sm leading-7 text-white/[0.58]">{quality.shadow}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">Evidence trail</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Where {quality.name.toLowerCase()} enters the work.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/[0.58]">
              These are not random recommendations. Each artifact records a different part of the argument:
              source-led inquiry, lived practice, or the longer construction of a book.
            </p>
          </div>
          <QualityEvidence items={quality.evidence} source="detail" qualitySlug={quality.slug} />
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70">Open research question</p>
            <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
              {quality.researchQuestion}
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/55">
              The Research Hub holds claims to a different standard than this personal page: sources,
              limitations, uncertainty, and revision dates stay visible.
            </p>
            <TrackedLink
              href="/research/core-qualities-and-human-drives"
              {...coreQualitiesEvidenceEvent({
                source: 'detail',
                placement: 'research_question',
                destination: '/research/core-qualities-and-human-drives',
                evidence_kind: 'research',
                quality_slug: quality.slug,
              })}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
            >
              Inspect the research program
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">The ambition</p>
          <p className="mx-auto mt-6 max-w-4xl font-serif-italic text-2xl leading-[1.55] text-white/85 sm:text-4xl">
            “{quality.ambition}”
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            A direction, not a finished identity
          </p>
        </div>
      </section>

      <nav aria-label="Other qualities" className="grid border-t border-white/[0.07] sm:grid-cols-2">
        <TrackedLink
          href={`/qualities/${previous.slug}`}
          {...coreQualitiesNavigationEvent({
            source: 'detail',
            placement: 'pagination',
            destination: 'quality_detail',
            quality_slug: previous.slug,
            direction: 'previous',
          })}
          className="group border-b border-white/[0.07] px-5 py-10 transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:border-b-0 sm:border-r sm:px-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Previous quality</span>
          <span className="mt-3 flex items-center gap-3 font-display text-2xl font-semibold text-white">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            {previous.name}
          </span>
        </TrackedLink>
        <TrackedLink
          href={`/qualities/${next.slug}`}
          {...coreQualitiesNavigationEvent({
            source: 'detail',
            placement: 'pagination',
            destination: 'quality_detail',
            quality_slug: next.slug,
            direction: 'next',
          })}
          className="group px-5 py-10 text-right transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 sm:px-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Next quality</span>
          <span className="mt-3 flex items-center justify-end gap-3 font-display text-2xl font-semibold text-white">
            {next.name}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </TrackedLink>
      </nav>
    </main>
  )
}

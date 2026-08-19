import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import JsonLd from '@/components/seo/JsonLd'
import QualitiesMap from '@/components/qualities/QualitiesMap'
import QualityEvidence from '@/components/qualities/QualityEvidence'
import QualityReflection from '@/components/qualities/QualityReflection'
import {
  coreQualitiesEvidenceEvent,
  coreQualitiesNavigationEvent,
} from '@/lib/core-qualities-analytics'
import { createMetadata, siteConfig } from '@/lib/seo'
import { qualities, qualitySystem } from '@/lib/qualities'

export const metadata: Metadata = createMetadata({
  title: 'The Four Qualities That Govern What I Build',
  description:
    'Freedom, Mastery, Meaning, and Connection are the governing constraints behind FrankX research, books, AI systems, businesses, and communities.',
  path: '/qualities',
  image: '/images/qualities/freedom.webp',
  keywords: [
    'Frank Riemer core qualities',
    'freedom mastery meaning connection',
    'personal values for AI builders',
    'creator decision framework',
    'meaningful AI systems',
  ],
})

const collectionSchema = {
  name: 'The Four Qualities That Govern What I Build',
  description:
    'Frank Riemer\'s public constitution for building systems, books, businesses, and communities.',
  url: `${siteConfig.url}/qualities`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: qualities.length,
    itemListElement: qualities.map((quality, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: quality.name,
      url: `${siteConfig.url}/qualities/${quality.slug}`,
      description: quality.thesis,
    })),
  },
}

const breadcrumbSchema = {
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Qualities', item: `${siteConfig.url}/qualities` },
  ],
}

export default function QualitiesPage() {
  return (
    <main id="main" className="min-h-screen overflow-hidden bg-void text-white">
      <JsonLd type="CollectionPage" data={collectionSchema} id="qualities-collection-schema" />
      <JsonLd type="BreadcrumbList" data={breadcrumbSchema} id="qualities-breadcrumb-schema" />

      <section className="relative min-h-[88svh] border-b border-white/[0.07] pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(16,185,129,0.08),transparent_38%)]" />
        <div className="relative mx-auto grid min-h-[calc(88svh-7rem)] max-w-[90rem] items-stretch px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="flex flex-col justify-center py-14 lg:py-20 lg:pr-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300/75 sm:text-[11px]">
              FrankX · The governing qualities
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.8rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              Four qualities govern what I build.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-xl sm:leading-9">
              I keep returning to four questions. Does this create freedom? Does it deepen mastery?
              Is the work meaningful? Does it strengthen connection? They govern the systems I build,
              the books I write, and the life I am still choosing.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <TrackedLink
                href="#map-your-qualities"
                {...coreQualitiesNavigationEvent({
                  source: 'overview',
                  placement: 'hero_primary',
                  destination: 'reflection',
                })}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 text-sm font-semibold text-void transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                Map your own qualities
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="#evidence"
                {...coreQualitiesNavigationEvent({
                  source: 'overview',
                  placement: 'hero_secondary',
                  destination: 'evidence',
                })}
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                Follow the evidence
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>

          <div className="relative min-h-[30rem] overflow-hidden border-x border-t border-white/[0.08] lg:border-t-0">
            <Image
              src="/images/portraits/frank-presenting-oracle-2025.jpg"
              alt="Frank Riemer presenting an AI systems architecture"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover object-[55%_center] grayscale-[18%] contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/5 to-transparent lg:bg-gradient-to-r lg:from-void lg:via-transparent lg:to-transparent" />
            <div className="absolute inset-x-5 bottom-6 border-l border-emerald-300/40 pl-4 sm:inset-x-8 sm:bottom-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">Current material</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                AI systems, software, words, music, and rooms full of people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">Origin · The standard</p>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              I learned to judge work by whether it would stand.
            </h2>
          </div>
          <div className="lg:pt-12">
            <p className="font-serif-italic text-2xl leading-[1.55] text-white/85 sm:text-3xl">
              “Measure carefully. Make it sturdy. Leave it better.”
            </p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/[0.62] sm:text-lg">
              I grew up beside my father on construction sites. He was a master craftsman. Across hours,
              weeks, months, and years, the work made its own demands. My materials are different now —
              AI systems, software, writing, music, workshops, communities, brands, and businesses. The
              standard did not change.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
            >
              Read the longer story
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <QualitiesMap />
        </div>
      </section>

      <section className="border-y border-white/[0.07]" id="evidence">
        {qualities.map((quality, index) => (
          <article key={quality.slug} className="border-b border-white/[0.07] last:border-b-0">
            <div className="mx-auto grid max-w-[90rem] lg:min-h-[44rem] lg:grid-cols-2">
              <div className={`relative min-h-[26rem] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={quality.image}
                  alt={quality.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  {quality.number} · {quality.shortRole}
                </p>
              </div>

              <div className={`flex flex-col justify-center px-5 py-14 sm:px-10 lg:px-16 lg:py-20 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/70">
                  {quality.name} · {quality.role}
                </p>
                <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  {quality.axiom}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/[0.62]">{quality.definition}</p>
                <p className="mt-7 border-l border-amber-200/35 pl-5 text-sm leading-7 text-white/[0.52]">
                  <span className="font-medium text-white/80">The tension:</span> {quality.shadow}
                </p>
                <TrackedLink
                  href={`/qualities/${quality.slug}`}
                  {...coreQualitiesNavigationEvent({
                    source: 'overview',
                    placement: 'quality_chapter',
                    destination: 'quality_detail',
                    quality_slug: quality.slug,
                  })}
                  className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/[0.12] px-5 text-sm font-medium text-white/75 transition-colors hover:border-emerald-300/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
                >
                  Explore {quality.name}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">Evidence, not decoration</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                The writing is where the qualities get tested.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/[0.58]">
                Each link below earns its place by showing a concrete relationship. The Research Hub
                separates general claims from personal conviction. Essays make the argument. Books hold
                the longer arc. Builds reveal whether the principle survives contact with reality.
              </p>
            </div>
            <div>
              <QualityEvidence
                items={qualities.flatMap((quality) => quality.evidence.slice(0, 1))}
                source="overview"
              />
              <TrackedLink
                href="/research/core-qualities-and-human-drives"
                {...coreQualitiesEvidenceEvent({
                  source: 'overview',
                  placement: 'evidence_footer',
                  destination: '/research/core-qualities-and-human-drives',
                  evidence_kind: 'research',
                })}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                Open the cross-quality research program
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">How the constitution works</p>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {qualitySystem.map((item, index) => (
              <div key={item.name} className="grid gap-3 py-6 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline">
                <span className="font-mono text-[10px] text-white/50">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-display text-xl font-semibold text-white">{item.name}</span>
                <p className="text-sm leading-6 text-white/55">
                  <span className="text-white/80">{item.role}</span> — {item.detail}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="map-your-qualities" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">Your turn</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              A value matters when it changes a decision.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/[0.58]">
              Use the four prompts to name the architecture beneath your own work. The answers stay on your device.
            </p>
          </div>
          <QualityReflection />
        </div>
      </section>

      <section className="border-t border-white/[0.07] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">Ambition · Version 1.0</p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            This constitution is still under construction.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
            I will keep testing it in public — through research, books, businesses, music, workshops,
            communities, and the daily decisions that reveal whether a principle is real. This page will
            change as the evidence changes.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/research"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 text-sm font-semibold text-void transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              Enter the Research Hub
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/books"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] px-6 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
            >
              Explore the books
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

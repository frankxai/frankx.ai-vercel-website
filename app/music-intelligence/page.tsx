import Link from 'next/link'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import ecosystem from '@/data/music-intelligence-ecosystem.json'

const PAGE_URL = 'https://frankx.ai/music-intelligence'

export const metadata = createMetadata({
  title: 'Music Intelligence System — Research, Agents & Tools for AI-Era Music | FrankX',
  description:
    'An open, interconnected system for AI-era music creation: state-change research, portable agent exports, curated tooling, and free education. Built in public across GitHub.',
  path: '/music-intelligence',
  keywords: [
    'music intelligence system',
    'ai music creation',
    'suno ai',
    'music agents',
    'mcp servers for music',
    'music psychology research',
    'vibe os',
  ],
})

type SystemLink = {
  label: string
  href: string
  external: boolean
}

type SystemEntry = {
  id: string
  name: string
  scope: string
  href: string
  external: boolean
  linkLabel: string
  description: string
  tags: string[]
  secondaryLinks: SystemLink[]
}

type AudienceEntry = {
  id: string
  name: string
  description: string
  entry: SystemLink
}

const systems = ecosystem.systems as SystemEntry[]
const audiences = ecosystem.audiences as AudienceEntry[]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Music Intelligence System',
      description:
        'An open, interconnected system for AI-era music creation — research, agents, tools, and education.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      author: {
        '@type': 'Person',
        name: 'Frank Riemer',
        url: 'https://frankx.ai',
        jobTitle: 'AI Architect',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#systems`,
      name: 'Music Intelligence System components',
      itemListElement: systems.map((system, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: system.name,
        url: system.external ? system.href : `https://frankx.ai${system.href}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Music Intelligence', item: PAGE_URL },
      ],
    },
  ],
}

function SystemCard({ system }: { system: SystemEntry }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04] hover:border-white/[0.15]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-tight text-white">{system.name}</h3>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-white/40">
          {system.scope === 'github' && <Github className="h-3 w-3" aria-hidden="true" />}
          {system.scope}
        </span>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-white/60">{system.description}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {system.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 border-t border-white/[0.06] pt-4 text-sm">
        {system.external ? (
          <a
            href={system.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"
          >
            {system.linkLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <Link
            href={system.href}
            className="inline-flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"
          >
            {system.linkLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
        {system.secondaryLinks.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
            >
              {link.label}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          )
        )}
      </div>
    </div>
  )
}

function AudienceCard({ audience }: { audience: AudienceEntry }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
      <h3 className="mb-2 text-base font-semibold text-white">{audience.name}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/60">{audience.description}</p>
      {audience.entry.external ? (
        <a
          href={audience.entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-300 transition-colors hover:text-emerald-200"
        >
          {audience.entry.label}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : (
        <Link
          href={audience.entry.href}
          className="inline-flex items-center gap-1.5 text-sm text-emerald-300 transition-colors hover:text-emerald-200"
        >
          {audience.entry.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export default function MusicIntelligencePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pb-24">
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] via-cyan-500/[0.02] to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.05] blur-[140px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            Open Music Systems
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Music Intelligence System
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl">
            An open, interconnected system for AI-era music creation. State-change research that
            maps musical parameters to outcomes, agents and MCP servers that put it to work,
            curated tooling, and free education — built in public across GitHub, with the live
            surfaces here on frankx.ai.
          </p>
          <Link
            href="/music/templates"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-400"
          >
            Get the free Suno templates
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* What's in the system */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            The Components
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            What&apos;s in the system?
          </h2>
          <p className="mb-10 max-w-xl text-base text-white/60">
            Six interlocking pieces. Each works on its own; together they cover the full path from
            research to released track.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            The Audiences
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Who is it for?
          </h2>
          <p className="mb-10 max-w-xl text-base text-white/60">
            The same substrate serves very different rooms. Pick the entry point that matches
            yours.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <AudienceCard key={audience.id} audience={audience} />
            ))}
          </div>
        </div>
      </section>

      {/* The research */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            The Research
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
            What does the research actually say?
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-white/60">
            <p>
              The system rests on music psychology: tempo is the strongest lever on arousal, mode
              (major or minor) shapes valence, timbre colors how a piece reads, and lyrics carry
              measurable emotional weight of their own. Those four parameters are what every Vibe
              OS state definition is built from.
            </p>
            <p>
              On brainwave entrainment we stay precise: rhythmic entrainment to tempo is well
              supported, while stronger claims around binaural beats have weaker and more mixed
              evidence. We treat those as open questions rather than selling points — tracked in
              public, with sources.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-2 text-sm">
            <a
              href="https://github.com/frankxai/vibe-os/blob/main/docs/whitepaper-the-science-of-state-change.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"
            >
              The Science of State Change — whitepaper
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/frankxai/vibe-os/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Vibe OS research docs
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/frankxai/music-intelligence-systems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Open questions registry — Music Intelligence Hub
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
              <h2 className="mb-2 text-xl font-semibold text-white">Start free</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                Nine copy-paste Suno templates from the state library, and browser instruments you
                can play right now.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/music/templates"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-emerald-400"
                >
                  Free Suno templates
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/music-lab"
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Open the Music Lab
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
              <h2 className="mb-2 text-xl font-semibold text-white">Go deeper</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                The hub repo holds the registry, schemas, agent exports, and the research notes
                behind everything on this page.
              </p>
              <a
                href="https://github.com/frankxai/music-intelligence-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Music Intelligence Hub on GitHub
              </a>
            </div>
          </div>
          <p className="mt-10 text-sm text-white/40">
            Related:{' '}
            <Link href="/music" className="text-white/60 transition-colors hover:text-white">
              the music catalog
            </Link>
            ,{' '}
            <Link href="/vibe" className="text-white/60 transition-colors hover:text-white">
              Vibe OS overview
            </Link>
            , and{' '}
            <Link
              href="/products/vibe-os"
              className="text-white/60 transition-colors hover:text-white"
            >
              the Vibe OS product
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

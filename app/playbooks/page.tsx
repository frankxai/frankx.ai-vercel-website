import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata, siteConfig } from '@/lib/seo'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { openSourcePlaybooks, playbookFaqs, playbookTracks } from '@/data/playbooks'

const PAGE_PATH = '/playbooks'

export const metadata = createMetadata({
  title: 'AI Agent Playbooks: Stack, Build, Operate, Architect',
  description:
    'Free AI agent playbooks from Frank Riemer: choose the AI computer and models, build agents and SKILL.md skills, run them as a crew, and architect them for production.',
  path: PAGE_PATH,
  keywords: [
    'ai agent playbook',
    'ai agent playbooks',
    'how to build ai agents',
    'claude code skills',
    'SKILL.md',
    'multi-agent architecture',
    'ai infrastructure for founders',
    'ai computer for agents',
    'agentic workflows',
  ],
})

export default function PlaybooksPage() {
  const allItems = playbookTracks.flatMap((track) => track.items)
  const pageUrl = `${siteConfig.url}${PAGE_PATH}`

  const collectionSchema = {
    '@id': `${pageUrl}#collection`,
    name: 'FrankX AI Agent Playbooks',
    url: pageUrl,
    description:
      'A curated build order for AI agents: stack and hardware, first agents and skills, operating agent crews, and production architecture.',
    author: { '@id': `${siteConfig.url}/#frank-riemer` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allItems.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: item.external ? item.href : `${siteConfig.url}${item.href}`,
        description: item.description,
      })),
    },
  }

  return (
    <>
      <JsonLd type="CollectionPage" data={collectionSchema} />
      <JsonLd
        type="BreadcrumbList"
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Playbooks', url: PAGE_PATH },
        ])}
      />
      <FAQPageJsonLd faqs={playbookFaqs} />

      <main className="min-h-screen bg-[#0a0a0b] text-white">
        {/* Hero */}
        <section className="border-b border-white/5 px-6 pb-20 pt-32 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-medium tracking-[0.08em] text-emerald-300/70">AI agent playbooks</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              From a chat window to agents that ship real work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Five steps, in the order I would take them again: pick the machine and the stack, build one agent
              that works, package it as skills, run a crew with quality gates, and architect it for production.
              Every link is a working guide, tool, or open repository.
            </p>
            <nav aria-label="Playbook steps" className="mt-10 flex flex-wrap gap-2">
              {playbookTracks.map((track) => (
                <a
                  key={track.id}
                  href={`#${track.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-emerald-400/40 hover:text-white"
                >
                  <span className="mr-2 font-mono text-xs text-emerald-300/70">{track.step}</span>
                  {track.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Tracks */}
        {playbookTracks.map((track) => (
          <section
            key={track.id}
            id={track.id}
            aria-labelledby={`${track.id}-title`}
            className="scroll-mt-24 border-b border-white/5 px-6 py-20 lg:py-24"
          >
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <p className="font-mono text-sm text-emerald-300/70">Step {track.step}</p>
                <h2 id={`${track.id}-title`} className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  {track.title}
                </h2>
                <p className="mt-4 text-base font-medium text-white/80">{track.question}</p>
                <p className="mt-3 text-base leading-relaxed text-white/55">{track.summary}</p>
              </div>
              <ol className="divide-y divide-white/5 rounded-[2rem] border border-white/10 bg-white/[0.02]">
                {track.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-start justify-between gap-6 px-6 py-5 transition hover:bg-white/[0.03]"
                    >
                      <span>
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-base font-semibold text-white">{item.title}</span>
                          <span className="text-xs text-white/40">{item.format}</span>
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-white/55">{item.description}</span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-emerald-300"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}

        {/* Open source */}
        <section aria-labelledby="open-source-title" className="border-b border-white/5 px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-medium tracking-[0.08em] text-white/50">Open source</p>
            <h2 id="open-source-title" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Clone the parts that already work
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {openSourcePlaybooks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 transition hover:border-emerald-400/30"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-base font-semibold">{item.title}</span>
                    <ArrowUpRight aria-hidden className="h-4 w-4 text-white/30 group-hover:text-emerald-300" />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/55">{item.description}</span>
                  <span className="mt-4 block font-mono text-xs text-white/35">{item.href.replace('https://', '')}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — visible copy mirrors the FAQPage schema */}
        <section aria-labelledby="faq-title" className="border-b border-white/5 px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-title" className="font-display text-2xl font-semibold sm:text-3xl">
              Questions people ask first
            </h2>
            <dl className="mt-8 space-y-8">
              {playbookFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-white/60">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* One CTA */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Start with one agent this week.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              The 90-minute workshop path gets a working agent on your screen. Everything else on this page builds on it.
            </p>
            <Link
              href="/workshops/build-first-ai-agent"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition hover:bg-emerald-400"
            >
              Build your first agent
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <p className="mt-6 text-sm text-white/45">
              Want the long reads instead?{' '}
              <Link href="/magazine" className="text-white/70 underline-offset-4 hover:text-white hover:underline">
                Open the magazine
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

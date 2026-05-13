import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import {
  listActivePartners,
  listOpenConversations,
} from '@/content/partnerships'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'
import type { Partner } from '@/content/partnerships/types'

export const metadata = createMetadata({
  title: 'Partnerships — How I build with partners | FrankX',
  description:
    'Working partnerships, deepening conversations, and the platforms behind the practice. Long-form collaboration with distributors, model providers, and clouds.',
  path: '/partnerships',
})

const SITE_URL = 'https://frankx.ai'

const TIER_LABEL: Record<Partner['tier'], string> = {
  distribution: 'Distribution',
  cloud: 'Cloud',
  'model-provider': 'Model + infra',
  silicon: 'Silicon',
  tooling: 'Tooling',
}

export default function PartnershipsHubPage() {
  const active = listActivePartners()
  const conversations = listOpenConversations()
  const all = [...active, ...conversations]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Partnerships',
        item: `${SITE_URL}/partnerships`,
      },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX partnerships',
    description:
      'How Frank Riemer builds with strategic partners across distribution, cloud, model providers, silicon, and platforms.',
    url: `${SITE_URL}/partnerships`,
    hasPart: all.map((p) => ({
      '@type': 'WebPage',
      name: p.name,
      url: `${SITE_URL}/partnerships/${p.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] via-transparent to-transparent"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Partnerships
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl"
            style={{ fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif' }}
          >
            How I build with partners.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Working partnerships, deepening conversations, and the platforms
            behind the practice. Long-form collaboration with distributors,
            model providers, and clouds — peer-architect work, not
            retainer-for-hire.
          </p>
        </div>
      </section>

      {/* Working partnerships (active) */}
      {active.length > 0 && (
        <section
          aria-labelledby="active-heading"
          className="border-t border-white/5 py-20 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Active
              </p>
              <h2
                id="active-heading"
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
              >
                Working partnerships.
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Where a proposal page is online and a real conversation is in
                motion.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {active.map((p) => (
                <PartnerCard key={p.slug} partner={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deepening conversations (placeholders) */}
      {conversations.length > 0 && (
        <section
          aria-labelledby="conversations-heading"
          className="border-t border-white/5 py-20 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Deepening
              </p>
              <h2
                id="conversations-heading"
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
              >
                Conversations in motion.
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Open relationships where the proposal page comes online when
                both sides are ready.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {conversations.map((p) => (
                <PartnerCard key={p.slug} partner={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Working with — verifiable peer-architect history */}
      <section
        aria-labelledby="working-with-heading"
        className="border-t border-white/5 py-20 lg:py-24"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
              Working with
            </p>
            <h2
              id="working-with-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3"
            >
              The infrastructure behind the practice.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Model providers, platforms, and clouds I ship on — today and in
              the Oracle EMEA AI CoE work that led here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Daily build
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <li>Anthropic Claude Code &mdash; every project</li>
                <li>Cursor &mdash; paired sessions</li>
                <li>Vercel &mdash; deploy target for frankx.ai and siblings</li>
                <li>GitHub &mdash; source of truth for open work</li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Models in delivery
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <li>Claude (Anthropic) &mdash; primary reasoning + agent work</li>
                <li>Gemini (Google) &mdash; multi-modal + ADK</li>
                <li>Codex / GPT (OpenAI) &mdash; comparison + workshop track</li>
                <li>Llama (Meta), Cohere, Grok (xAI), Mistral &mdash; from CoE work</li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Cloud
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <li>Oracle Cloud Infrastructure &mdash; EMEA AI CoE delivery</li>
                <li>OCI Generative AI &mdash; production patterns</li>
                <li>Oracle Database 23ai &mdash; vector + agent integration</li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Silicon
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                <li>NVIDIA &mdash; Munich EBC contacts, NIM hands-on</li>
                <li>Co-architect of the Oracle &times; NVIDIA partner event 2025</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Cross-reference to /partners (affiliate transparency) */}
      <section className="border-t border-white/5 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">
            Looking for the workshop affiliate transparency policy?
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
          >
            Tools and affiliate policy
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-white/5 py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent border border-emerald-500/15 p-8 sm:p-12 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-4">
              Conversation
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3 leading-snug">
              Open a partnership conversation.
            </h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              30 minutes. Peer-level. The shape of the conversation depends on
              where your team is going.
            </p>
            <Link
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
            >
              Book Meet &amp; Grow
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const statusLabel =
    partner.status === 'active'
      ? 'View partnership conversation'
      : 'In conversation'
  const isActive = partner.status === 'active'

  return (
    <Link
      href={`/partnerships/${partner.slug}`}
      className="group block rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.04] hover:border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
          {TIER_LABEL[partner.tier]}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 transition-colors"
          aria-hidden
        />
      </div>
      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
        {partner.name}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
        {partner.tagline}
      </p>
      <span
        className={
          isActive
            ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
            : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-white/60 border border-white/10'
        }
      >
        {statusLabel}
      </span>
    </Link>
  )
}

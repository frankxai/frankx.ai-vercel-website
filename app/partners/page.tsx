import Link from 'next/link'
import { ExternalLink, Shield, Heart, AlertCircle } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Partners & Affiliate Policy',
  description:
    'The tools and platforms FrankX partners with, the nature of each partnership, and our value-first, affiliate-second policy.',
  path: '/partners',
})

type Partner = {
  name: string
  url: string
  kind: 'affiliate' | 'partner' | 'strategic' | 'referral' | 'none'
  description: string
  usedIn: string[]
}

const partners: Partner[] = [
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    kind: 'partner',
    description:
      'Vercel is the platform every FrankX project ships on. We are applying to the Vercel Partner Program for co-marketing and referral commission. Central to the Build Your First AI Agent workshop.',
    usedIn: [
      '/workshops/build-first-ai-agent',
      'Every deployed Next.js site on frankx.ai',
      'AI agent deployment in workshops + guides',
    ],
  },
  {
    name: 'n8n',
    url: 'https://n8n.io',
    kind: 'affiliate',
    description:
      'n8n is our recommended self-hostable no-code automation platform. Direct affiliate program (30% first-year commission). Featured in the no-code branch of the First AI Agent workshop.',
    usedIn: [
      '/workshops/build-first-ai-agent (no-code branch)',
      'Automation workflows in /guides',
      'FrankX internal ops',
    ],
  },
  {
    name: 'Cursor',
    url: 'https://cursor.sh',
    kind: 'referral',
    description:
      'Cursor is a recommended AI-assisted IDE. Used heavily in the AI-builds-AI branch of the First AI Agent workshop. Student discount referrals available.',
    usedIn: [
      '/workshops/build-first-ai-agent (AI-builds-AI branch)',
      'Frank\'s daily workflow',
    ],
  },
  {
    name: 'Anthropic (Claude)',
    url: 'https://anthropic.com',
    kind: 'strategic',
    description:
      'Claude is Frank\'s recommended model for reasoning, coding, and agent workloads. Claude Code is part of the FrankX daily workflow. We are pursuing Claude for Work Partner Program status — no direct consumer affiliate today.',
    usedIn: [
      '/workshops/build-first-ai-agent (Claude branch)',
      '/acos and FrankX agent workflows',
      'Every content generation pipeline on frankx.ai',
    ],
  },
  {
    name: 'OpenAI',
    url: 'https://openai.com',
    kind: 'none',
    description:
      'OpenAI models (GPT-5, AgentKit) are taught in the OpenAI branch of the First AI Agent workshop. No direct affiliate program for consumer plans. We include OpenAI because it\'s the largest agent install base — teaching without partnership preserves editorial integrity.',
    usedIn: [
      '/workshops/build-first-ai-agent (OpenAI branch)',
      'Provider comparisons in /blog',
    ],
  },
  {
    name: 'Google Cloud (Gemini + ADK)',
    url: 'https://cloud.google.com',
    kind: 'strategic',
    description:
      'Gemini + Google ADK + A2A protocol are taught in the Google branch of the First AI Agent workshop. We pursue Google Cloud Partner Advantage for workshop attendee credits (more valuable than commission).',
    usedIn: [
      '/workshops/build-first-ai-agent (Google ADK branch)',
      '/guides/agent-card-a2a-spec',
    ],
  },
  {
    name: 'Oracle',
    url: 'https://oracle.com',
    kind: 'strategic',
    description:
      'Oracle is Frank\'s employer. Oracle Agent Development Kit and Open Agent Specification are taught in the enterprise branch of the First AI Agent workshop. Not a revshare relationship — this is strategic positioning that flows through Frank\'s AI Architect role.',
    usedIn: [
      '/workshops/build-first-ai-agent (enterprise branch)',
      '/ai-architecture',
    ],
  },
  {
    name: 'Dify',
    url: 'https://dify.ai',
    kind: 'none',
    description:
      'Open-source LLM app builder with strong RAG. Featured in the no-code branch alongside n8n. No affiliate program — included because it\'s the right tool for self-hosted RAG-heavy agents.',
    usedIn: [
      '/workshops/build-first-ai-agent (no-code branch)',
    ],
  },
  {
    name: 'Notion',
    url: 'https://notion.so',
    kind: 'referral',
    description:
      'Notion AI is the no-code option for Notion-native teams. Modest referral program. Featured where it\'s genuinely the right fit.',
    usedIn: [
      '/workshops/build-first-ai-agent (no-code branch)',
      'FrankX internal knowledge base',
    ],
  },
]

const KIND_STYLES: Record<Partner['kind'], { label: string; bg: string; fg: string; border: string }> = {
  affiliate: {
    label: 'Affiliate — commission on referrals',
    bg: 'bg-emerald-500/10',
    fg: 'text-emerald-400',
    border: 'border-emerald-500/25',
  },
  partner: {
    label: 'Partner — co-marketing + commission (in progress)',
    bg: 'bg-cyan-500/10',
    fg: 'text-cyan-400',
    border: 'border-cyan-500/25',
  },
  referral: {
    label: 'Referral — small commission',
    bg: 'bg-violet-500/10',
    fg: 'text-violet-400',
    border: 'border-violet-500/25',
  },
  strategic: {
    label: 'Strategic — credits or positioning, no revshare',
    bg: 'bg-amber-500/10',
    fg: 'text-amber-400',
    border: 'border-amber-500/25',
  },
  none: {
    label: 'No partnership — included for completeness',
    bg: 'bg-zinc-500/10',
    fg: 'text-zinc-400',
    border: 'border-zinc-500/25',
  },
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-400 mb-4">
            <Shield className="w-3.5 h-3.5" />
            Transparent affiliate policy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Partners &amp; Affiliate Policy
          </h1>
          <p className="text-lg text-zinc-400">
            The tools we partner with, the nature of each relationship, and the
            policy that keeps recommendations honest.
          </p>
        </div>
      </section>

      {/* Top band — strategic-partner cross-link */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent border border-emerald-500/20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-1.5">
                Looking for strategic partnerships?
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                This page covers tool affiliates and workshop transparency. Distributor, model-provider, cloud, and silicon conversations live on a separate hub.
              </p>
            </div>
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b] flex-shrink-0"
            >
              See partnerships hub
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Policy — the principles */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              Our four rules
            </h2>
            <ol className="space-y-3 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold flex-shrink-0">1.</span>
                <span>
                  <strong className="text-zinc-200 font-medium">Value over revenue.</strong>{' '}
                  If a platform is the right tool but has poor affiliate economics, we
                  still recommend it — without a referral link. The reader\'s outcome wins.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold flex-shrink-0">2.</span>
                <span>
                  <strong className="text-zinc-200 font-medium">Transparent disclosure.</strong>{' '}
                  Every page with an affiliate or referral link shows an{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-xs">
                    AffiliateDisclosure
                  </code>{' '}
                  component. You see which providers and why. No hidden links.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold flex-shrink-0">3.</span>
                <span>
                  <strong className="text-zinc-200 font-medium">Free-tier first.</strong>{' '}
                  Every platform we recommend must be usable on a free tier for our
                  workshop content. We never tier-gate learning behind a paid plan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold flex-shrink-0">4.</span>
                <span>
                  <strong className="text-zinc-200 font-medium">No exclusives that compromise teaching.</strong>{' '}
                  Our First AI Agent workshop recommends Vercel AI SDK because it\'s the
                  right central path, not because of any commercial arrangement. Editorial
                  integrity is not negotiable.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Partners list */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Current partnerships</h2>
          <div className="space-y-4">
            {partners.map((p) => {
              const style = KIND_STYLES[p.kind]
              return (
                <div
                  key={p.name}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        <Link
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan-300 inline-flex items-center gap-1.5"
                        >
                          {p.name}
                          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.fg} border ${style.border}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
                      Where you\'ll see it
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {p.usedIn.map((u, i) => (
                        <li
                          key={i}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs text-zinc-400 bg-white/[0.03] border border-white/[0.06]"
                        >
                          {u.startsWith('/') ? (
                            <Link href={u} className="hover:text-cyan-400">
                              {u}
                            </Link>
                          ) : (
                            u
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner programs in flight */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6 sm:p-8">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-3">
              In motion
            </p>
            <h2 className="text-xl font-semibold text-white mb-4">
              Partner programs in flight
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              Formal programs Frank is applying to or actively pursuing — each
              one anchors a strategic-alignment page on the partnerships hub.
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <span className="font-medium text-white sm:w-44 flex-shrink-0">Vercel Partner Program</span>
                <span className="text-zinc-400 leading-relaxed">Application in flight. Every frankx.ai surface ships on Vercel; Build First AI Agent workshop centres the Vercel AI SDK.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <span className="font-medium text-white sm:w-44 flex-shrink-0">Anthropic Claude for Work</span>
                <span className="text-zinc-400 leading-relaxed">Pursuing partner pathway. Claude Code is the daily build harness across the entire open-source body of work.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <span className="font-medium text-white sm:w-44 flex-shrink-0">Google Cloud Partner Advantage</span>
                <span className="text-zinc-400 leading-relaxed">Pursuit underway. Gemini in daily delivery; Google ADK + A2A protocol in the workshop enterprise lane.</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <span className="font-medium text-white sm:w-44 flex-shrink-0">NVIDIA Inception</span>
                <span className="text-zinc-400 leading-relaxed">Nominee pathway. Munich EBC contacts and Oracle &times; NVIDIA partner event 2025 co-architect history anchor the conversation.</span>
              </li>
            </ul>
            <p className="text-xs text-zinc-500 leading-relaxed mt-5">
              See the per-partner conversation shape at{' '}
              <Link href="/partnerships" className="text-emerald-300 hover:text-emerald-200 underline">
                /partnerships
              </Link>
              . Pursuit status is updated within 48 hours of any change.
            </p>
          </div>
        </div>
      </section>

      {/* How commission is used */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3">
              What we do with affiliate revenue
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              Affiliate revenue pays for: hosting workshop starter repos, maintaining the
              evaluation harness and sample Agent Cards, creating CC-BY-SA teaching
              materials for educators, and keeping core workshop content free.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              If you have a question about any partnership — or you want to discuss a
              new one —{' '}
              <a
                href="mailto:hello@frankx.ai?subject=Partnership%20inquiry"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                hello@frankx.ai
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* See also: strategic partnerships */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              See also
            </p>
            <h2 className="text-xl font-semibold text-white mb-3">
              Strategic partnerships
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              This page documents the affiliate-tier relationships behind the
              workshops and tools recommended on frankx.ai. The deeper
              strategic-partner conversations &mdash; with distributors, model
              providers, clouds, and silicon &mdash; live on a separate hub.
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
            >
              How I build with partners
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Caveat */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Partnership status evolves. If a partnership ends or changes kind, this
              page is updated within 48 hours. Last updated: 2026-05-08.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

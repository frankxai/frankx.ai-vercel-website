import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PILLARS } from '@/data/acos/agents'
import { catalogL99 } from '@/lib/acos/l99-score'
import { EmailSignup } from '@/components/email-signup'
import { ArrowLeft, Terminal, Download, CheckCircle2, Hammer, CircleDashed, Github, Sparkles } from 'lucide-react'

interface PageProps {
  params: Promise<{ pillar: string }>
}

const ACCENT_GRADIENTS: Record<string, string> = {
  emerald: 'from-emerald-500/20 via-transparent to-transparent',
  cyan: 'from-cyan-500/20 via-transparent to-transparent',
  violet: 'from-violet-500/20 via-transparent to-transparent',
  amber: 'from-amber-500/20 via-transparent to-transparent',
  rose: 'from-rose-500/20 via-transparent to-transparent',
  sky: 'from-sky-500/20 via-transparent to-transparent',
  teal: 'from-teal-500/20 via-transparent to-transparent',
  fuchsia: 'from-fuchsia-500/20 via-transparent to-transparent',
  indigo: 'from-indigo-500/20 via-transparent to-transparent',
  lime: 'from-lime-500/20 via-transparent to-transparent',
  orange: 'from-orange-500/20 via-transparent to-transparent',
}

const ACCENT_RINGS: Record<string, string> = {
  emerald: 'ring-emerald-400/20',
  cyan: 'ring-cyan-400/20',
  violet: 'ring-violet-400/20',
  amber: 'ring-amber-400/20',
  rose: 'ring-rose-400/20',
  sky: 'ring-sky-400/20',
  teal: 'ring-teal-400/20',
  fuchsia: 'ring-fuchsia-400/20',
  indigo: 'ring-indigo-400/20',
  lime: 'ring-lime-400/20',
  orange: 'ring-orange-400/20',
}

// Pricing is intentionally withheld while premium packs are pre-launch — paid
// packs collect a waitlist (#waitlist) instead of showing a euro amount or a
// dead "Buy" path. The free Foundation pack keeps its install flow.
const PACK_PRICING: Record<string, { tier: 'free' | 'premium'; cta: string; note?: string }> = {
  content: { tier: 'premium', cta: '#waitlist' },
  music: { tier: 'premium', cta: '#waitlist' },
  visuals: { tier: 'premium', cta: '#waitlist' },
  books: { tier: 'premium', cta: '#waitlist' },
  workshops: { tier: 'premium', cta: '#waitlist' },
  research: { tier: 'premium', cta: '#waitlist' },
  products: { tier: 'premium', cta: '#waitlist' },
  business: { tier: 'premium', cta: '#waitlist', note: 'Substrate-only — financial data stays on your machine, never published' },
  personal: { tier: 'premium', cta: '#waitlist' },
  community: { tier: 'premium', cta: '#waitlist' },
  meta: { tier: 'free', cta: '/agents/packs/meta', note: 'Required by every other pack — start here' },
}

export async function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pillar } = await params
  const p = PILLARS.find((x) => x.id === pillar)
  if (!p) return { title: 'Pack not found' }
  return {
    title: `${p.title} Pack · 9 agents for ${p.tagline.toLowerCase()} | FrankX`,
    description: `Install the ${p.title} pack into your Claude Code, Cursor, or Antigravity CLI. ${p.tagline}`,
    alternates: { canonical: `https://frankx.ai/agents/packs/${p.id}` },
    openGraph: {
      title: `${p.title} Pack · FrankX ACOS`,
      description: p.tagline,
      url: `https://frankx.ai/agents/packs/${p.id}`,
      siteName: 'FrankX',
      type: 'website',
    },
  }
}

const STATUS_STYLE: Record<string, { label: string; className: string; Icon: typeof CheckCircle2 }> = {
  shipped: {
    label: 'Shipped',
    className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
    Icon: CheckCircle2,
  },
  'in-progress': {
    label: 'In progress',
    className: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
    Icon: Hammer,
  },
  gap: {
    label: 'Gap',
    className: 'border-slate-400/20 bg-slate-500/10 text-slate-300',
    Icon: CircleDashed,
  },
}

const KIND_LABEL: Record<string, string> = {
  agent: 'Agent',
  skill: 'Skill',
  command: 'Command',
  mcp: 'MCP',
}

export default async function PackPage({ params }: PageProps) {
  const { pillar } = await params
  const p = PILLARS.find((x) => x.id === pillar)
  if (!p) notFound()

  const pricing = PACK_PRICING[p.id]
  const l99 = catalogL99()
  const pillarLevel = l99.pillars.find((pl) => pl.id === p.id)?.level ?? 0
  const shipped = p.specialists.filter((s) => s.status === 'shipped').length
  const inProgress = p.specialists.filter((s) => s.status === 'in-progress').length
  const gap = p.specialists.filter((s) => s.status === 'gap').length

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `https://frankx.ai/agents/packs/${p.id}#product`,
        name: `${p.title} Pack`,
        description: `9-agent pack: ${p.tagline}`,
        url: `https://frankx.ai/agents/packs/${p.id}`,
        category: 'Software / AI Agents',
        offers: {
          '@type': 'Offer',
          // Premium packs are pre-launch — omit price AND priceCurrency entirely so
          // the Offer stays valid (priceCurrency without price is a schema.org error)
          // while the offer is waitlist-only.
          ...(pricing.tier === 'free' ? { price: '0', priceCurrency: 'EUR' } : {}),
          availability: pricing.tier === 'free' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FrankX', item: 'https://frankx.ai' },
          { '@type': 'ListItem', position: 2, name: 'Agents', item: 'https://frankx.ai/agents' },
          { '@type': 'ListItem', position: 3, name: `${p.title} Pack`, item: `https://frankx.ai/agents/packs/${p.id}` },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <Script id={`pack-${p.id}-schema`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero */}
      <section className={`relative overflow-hidden pt-24 pb-12`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]}`} />
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/agents"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All packs
          </Link>

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Pillar {String(p.number).padStart(2, '0')} · ACOS
              </div>
              <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{p.title} Pack</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">{p.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 font-semibold text-purple-200">
                  <Sparkles className="h-3 w-3" /> L{pillarLevel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-white">
                  9 specialists
                </span>
                {shipped > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-300">
                    {shipped} shipped
                  </span>
                )}
                {inProgress > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 font-semibold text-amber-300">
                    {inProgress} in-progress
                  </span>
                )}
                {gap > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-400/20 bg-slate-500/10 px-3 py-1 font-semibold text-slate-300">
                    {gap} gap
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:w-72">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {pricing.tier === 'free' ? 'Price' : 'Access'}
              </div>
              <div className="mt-1 text-3xl font-bold text-white">
                {pricing.tier === 'free' ? 'Free' : 'Premium'}
              </div>
              {pricing.tier === 'premium' && (
                <div className="mt-2 text-xs text-slate-400">Pre-launch — join the waitlist for first install access.</div>
              )}
              {pricing.note && <div className="mt-2 text-xs text-slate-400">{pricing.note}</div>}
              <Link
                href={pricing.cta}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                  pricing.tier === 'free'
                    ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                {pricing.tier === 'free' ? <><Download className="h-4 w-4" /> Install free</> : 'Join the waitlist'}
              </Link>
            </div>
          </div>

          {/* Install snippet */}
          {pricing.tier === 'premium' && (
            <div className="mt-10 rounded-xl border border-amber-400/20 bg-amber-500/[0.06] px-4 py-3 text-xs text-amber-100">
              This pack is in active development. The command below is how you&rsquo;ll install it —
              <Link href="#waitlist" className="ml-1 font-semibold underline underline-offset-2 hover:text-white">join the waitlist</Link> to get access the day it ships.
            </div>
          )}
          <div className={`${pricing.tier === 'premium' ? 'mt-4' : 'mt-10'} rounded-2xl border border-white/10 bg-black/40 shadow-2xl`}>
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2 text-xs text-slate-400">
              <Terminal className="h-3.5 w-3.5" />
              <span className="font-mono">~/your-project</span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-sm text-emerald-200">
{`# Install the ${p.title} pack into .claude/agents/ + .claude/skills/
npx @frankx/acos install ${p.id}

# Or via the manual fallback (git + cp)
git clone https://github.com/frankxai/agentic-creator-os.git tmp-acos
cp -r tmp-acos/packs/${p.id}/agents/*  .claude/agents/
cp -r tmp-acos/packs/${p.id}/skills/*  .claude/skills/
rm -rf tmp-acos`}
            </pre>
          </div>
        </div>
      </section>

      {/* Specialists list */}
      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-white">9 specialists in this pack</h2>
          <p className="mt-2 text-sm text-slate-400">
            Status badges reflect what&rsquo;s shipped in the current catalog. In-progress slots ship as Frank writes them.
            Buyers get all updates as the pack evolves.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.specialists.map((s) => {
              const sty = STATUS_STYLE[s.status]
              const Icon = sty.Icon
              return (
                <div
                  key={s.name}
                  className={`rounded-xl border border-white/10 bg-white/[0.02] p-5 ring-1 ${ACCENT_RINGS[p.accent]} transition hover:bg-white/[0.04]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{s.name}</span>
                        <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                          {KIND_LABEL[s.kind] ?? s.kind}
                        </span>
                      </div>
                      {s.ref && (
                        <div className="mt-1 truncate font-mono text-[11px] text-slate-500" title={s.ref}>
                          {s.ref}
                        </div>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${sty.className}`}
                    >
                      <Icon className="h-3 w-3" />
                      {sty.label}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">{s.one_liner}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-white/5 bg-[#06060a] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-white">What you install</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Agent definitions', count: p.specialists.filter((s) => s.kind === 'agent').length, suffix: 'agents' },
              { label: 'Skills + commands', count: p.specialists.filter((s) => s.kind === 'skill' || s.kind === 'command').length, suffix: 'substrate items' },
              { label: 'Smoke fixtures', count: p.specialists.filter((s) => s.status === 'shipped').length, suffix: 'tests included' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-3xl font-bold text-white">{item.count}</div>
                <div className="mt-1 text-sm font-semibold text-slate-200">{item.label}</div>
                <div className="text-xs text-slate-500">{item.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible runtimes */}
      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-white">Compatible runtimes</h2>
          <p className="mt-2 text-sm text-slate-400">
            Plain text artifacts. Drop the files in, your CLI does the rest.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Claude Code', detail: '.claude/agents/ + .claude/skills/' },
              { name: 'Antigravity (agy)', detail: '~/.gemini/config/plugins/' },
              { name: 'Cursor', detail: '.cursor/agents/ (compatible format)' },
              { name: 'Claude Agent SDK', detail: 'Direct import — same frontmatter' },
            ].map((r) => (
              <div key={r.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="mt-1 font-mono text-[11px] text-slate-500">{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA / waitlist */}
      <section id="waitlist" className="scroll-mt-24 border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {pricing.tier === 'free' ? 'Install in 60 seconds' : `Join the ${p.title} waitlist`}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            {pricing.tier === 'free'
              ? 'No card, no waitlist. The Foundation pack is free because every other pack composes it.'
              : `The ${p.title} pack is in active development — ${shipped} of 9 specialists already shipped. Join the waitlist and you'll be first to install it the day it lands, with the build notes along the way.`}
          </p>

          {pricing.tier === 'free' ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/agents/packs/meta"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <Download className="h-4 w-4" /> Get the Foundation pack
              </Link>
              <a
                href="https://github.com/frankxai/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> View on GitHub
              </a>
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-5">
              <EmailSignup
                listType="premium-packs"
                showName
                placeholder="you@example.com"
                buttonText={`Join the ${p.title} waitlist`}
                className="mx-auto"
              />
              <a
                href="https://github.com/frankxai/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded text-sm font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> Preview the spec on GitHub
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

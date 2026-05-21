import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
  ArrowRight,
  Brain,
  Check,
  Compass,
  Download,
  FileCode,
  Github,
  Heart,
  Layers,
  Network,
  Shield,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import { getLatestRelease } from '@/lib/github-latest-release'

// ─── Constants ──────────────────────────────────────────────────────────────

const REPO = 'https://github.com/frankxai/Ana-Intelligence-System'
const REPO_SLUG = 'frankxai/Ana-Intelligence-System'
const PROTOCOL = 'https://starlightintelligence.org/protocol'

// ─── Static structure (voice-independent) ───────────────────────────────────

// Phase shape parallels SIS. Bodies left empty — populated from Ana extract in Phase 5.
// Structure exists so the layout is renderable and reviewable now.
const phases = [
  {
    num: '1',
    title: 'Welcome — meet the people in your work',
    time: '10 minutes',
    icon: Compass,
    body: '/* TBD: Ana extract — Phase 1 framing in her voice. The intake conversation that surfaces who is already in your orbit before you build anything. */',
  },
  {
    num: '2',
    title: 'People Intelligence',
    time: '~90 minutes',
    icon: Users,
    body: '/* TBD: Ana extract — what People Intelligence actually does. The relational layer she added underneath the architecture. */',
  },
  {
    num: '3',
    title: 'Event Intelligence',
    time: '3-hour session',
    icon: Workflow,
    body: '/* TBD: Ana extract — how Event Intelligence captures the rhythms and turning points an SIS layer alone cannot see. */',
  },
  {
    num: '4',
    title: 'Neuroscience as ground',
    time: 'You decide',
    icon: Brain,
    body: '/* TBD: Ana extract — why neuroscience belongs in the substrate, not as content. The papers, frames, and thinkers she points toward. */',
  },
  {
    num: '5',
    title: 'IFS as foundation',
    time: 'Ongoing',
    icon: Heart,
    body: '/* TBD: Ana extract — her framing of why Internal Family Systems sits underneath the 9-layer architecture, not parallel to it. */',
  },
]

// SIS's existing 9 layers + 3 Ana additions. Position of new layers TBD in extract.
const layers = [
  { n: '0', name: 'IFS / Self-Energy IS', purpose: '/* TBD: Ana extract — foundation layer below Genius, in her framing */', status: 'Pending Ana extract', anaContrib: true },
  { n: '1', name: 'Genius IS',           purpose: 'What only you uniquely see',          status: 'Alpha (v7.4)' },
  { n: '2', name: 'Second Brain IS',     purpose: 'Knowledge architecture',              status: 'Alpha' },
  { n: '3', name: 'Vision / Brand IS',   purpose: 'Why + how + design',                  status: 'Month 2' },
  { n: '4', name: 'Business IS',         purpose: 'Accounting, taxes, entity, revenue',  status: 'Month 2–3' },
  { n: '5', name: 'Creator IS',          purpose: 'Content pipeline, multi-modal',       status: 'Alpha' },
  { n: '6', name: 'People IS',           purpose: '/* TBD: Ana extract — the relational architecture */', status: 'Pending Ana extract', anaContrib: true },
  { n: '7', name: 'Event IS',            purpose: '/* TBD: Ana extract — turning-point capture */',       status: 'Pending Ana extract', anaContrib: true },
  { n: '8', name: 'Wealth / Freedom IS', purpose: 'Compounding capital + time',          status: 'Month 3' },
  { n: '9', name: 'Health IS',           purpose: 'Body is the substrate',               status: 'Month 2' },
  { n: '10', name: 'Relational IS',      purpose: 'Network + alliance architecture',     status: 'Month 3' },
  { n: '11', name: 'Spiritual IS',       purpose: 'Meaning layer (optional)',            status: 'Always optional' },
]

// Voice-independent stats. Counts only.
const stats = [
  { label: 'Layers', value: '12', icon: Layers, sub: '9 SIS + 3 Ana' },
  { label: 'Foundation', value: 'IFS', icon: Heart, sub: 'Internal Family Systems' },
  { label: 'License', value: 'MIT', icon: Shield, sub: 'Vendor lock-in: 0' },
  { label: 'Sister to', value: 'SIS', icon: Network, sub: 'Composes with Starlight' },
]

// What's different from SIS — voice-independent framing of the structural difference,
// substantive content from Ana extract.
const differences = [
  {
    title: 'People before tools',
    icon: Users,
    body: '/* TBD: Ana extract — why naming the people in your work changes what the system can do for you. Her framing. */',
  },
  {
    title: 'Events as data',
    icon: Workflow,
    body: '/* TBD: Ana extract — what Event Intelligence captures that note-taking and CRMs miss. */',
  },
  {
    title: 'Neuroscience-grounded',
    icon: Brain,
    body: '/* TBD: Ana extract — the papers and frames that anchor the architecture in how brains actually work. */',
  },
  {
    title: 'IFS as substrate',
    icon: Heart,
    body: '/* TBD: Ana extract — Self-energy as the layer beneath all the others. Why this matters for builders. */',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AnaIntelligenceSystemPage() {
  // Defensive — repo may not exist yet. Falls back cleanly if API fails.
  const release = await getLatestRelease(REPO_SLUG, { fallbackTag: 'v0.1.0' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://frankx.ai/ana-intelligence-system/',
        name: 'Ana Intelligence System',
        description:
          'Sister system to Starlight Intelligence System — adds People Intelligence, Event Intelligence, neuroscience grounding, and IFS as foundation. MIT, markdown-first.',
        url: 'https://frankx.ai/ana-intelligence-system/',
        isPartOf: { '@id': 'https://frankx.ai/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Ana Intelligence System',
              item: 'https://frankx.ai/ana-intelligence-system/',
            },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Ana Intelligence System',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform (markdown + MCP)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: REPO,
        description:
          'AIS — sister substrate to SIS. Adds People IS, Event IS, neuroscience domain, and IFS-as-foundation. Composes with the existing 9-layer SIP architecture.',
      },
    ],
  }

  return (
    <>
      <Script
        id="ais-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-ana-amber/[0.05] via-transparent to-transparent" aria-hidden />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-ana-amber/30 bg-ana-amber/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-ana-amber mb-6">
            <Sparkles className="h-3 w-3" />
            Sister system · Free · MIT
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
                The architecture is more honest{' '}
                <span className="bg-gradient-to-r from-ana-gold via-ana-amber to-ana-cream bg-clip-text text-transparent">
                  when the people are named.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4 max-w-3xl">
                Starlight Intelligence System gives you nine layers for organizing your scattered work. Ana Intelligence System adds the three the original was missing: <strong className="text-ana-gold">People Intelligence</strong>, <strong className="text-ana-gold">Event Intelligence</strong>, and <strong className="text-ana-gold">Internal Family Systems as foundation</strong>.
              </p>
              <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-3xl">
                Sister system, not a rebuild. AIS composes onto SIS. You can start with one, both, or neither. The substrate stays free, sovereign, markdown-first — Ana&rsquo;s contribution is the part that names what the original architecture had to abstract away.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={release.zipUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ana-gold to-ana-amber px-6 py-3 text-sm font-semibold text-ana-obsidian transition-all hover:from-ana-amber hover:to-ana-gold hover:shadow-lg hover:shadow-ana-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
                >
                  <Download className="h-4 w-4" />
                  Download .zip{' '}
                  <span className="text-ana-obsidian/70 font-normal text-xs">{release.tag}</span>
                </Link>
                <Link
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-amber/70"
                >
                  <Github className="h-4 w-4" />
                  Clone the Repo
                </Link>
              </div>

              {!release.live && (
                <p className="mt-3 text-xs text-slate-500">
                  Repo bootstrapping — fallback link to {release.tag}. Live release feed activates once the upstream repo is published.
                </p>
              )}
            </div>

            {/* Hero portrait — Ana-Ω with jaguar */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-ana-amber/10">
              <Image
                src="/images/mascot/ana-omega-hero-v1.jpg"
                alt="Ana-Ω — humanoid digital-twin counterpart to FRANK-Ω, with her Venezuelan jaguar spirit-companion at her side, at the threshold of an observatory at dusk. Warm gold hood, tortoiseshell glasses with two visible nose pads, amber eyes. The jaguar's coat is jet black with deep emerald rosettes."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Icon className="h-4 w-4 text-ana-amber mb-2" />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
                  <div className="text-[10px] text-slate-600 mt-1">{s.sub}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* The Phases — TBD bodies until Ana extract */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">How it works</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Five phases. Same shape as SIS, different lens.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            People-first, event-aware, neuroscience-grounded, IFS-anchored.
          </p>

          <ol className="space-y-4">
            {phases.map((p) => {
              const Icon = p.icon
              return (
                <li
                  key={p.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ana-gold/20 to-ana-amber/20 border border-ana-amber/40 text-ana-gold font-bold text-sm">
                        {p.num}
                      </div>
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                          {p.time}
                        </span>
                      </div>
                      {/* Voice-pending — replace with Ana's framing in Phase 5 */}
                      <p className="text-sm text-slate-500 leading-relaxed font-mono italic">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Twelve-layer architecture */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">The architecture</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Twelve layers. Three are Ana&rsquo;s.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            Nine SIS layers (compose unchanged) plus three Ana adds: <strong className="text-ana-gold">IFS / Self-Energy IS</strong> as foundation, <strong className="text-ana-gold">People IS</strong>, and <strong className="text-ana-gold">Event IS</strong>.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">#</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">Layer</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold hidden sm:table-cell">Purpose</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {layers.map((l) => (
                  <tr
                    key={l.n}
                    className={`border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors ${l.anaContrib ? 'bg-ana-amber/[0.03]' : ''}`}
                  >
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{l.n}</td>
                    <td className="px-4 py-3 text-white font-semibold">
                      {l.name}
                      {l.anaContrib && (
                        <span className="ml-2 inline-block rounded-full bg-ana-amber/15 border border-ana-amber/40 px-2 py-0.5 text-[9px] uppercase tracking-wider text-ana-amber font-mono">
                          Ana
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 hidden sm:table-cell ${l.anaContrib ? 'text-slate-500 italic font-mono text-[12px]' : 'text-slate-400'}`}>
                      {l.purpose}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-slate-400 font-mono">{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Layer 0 (IFS / Self-Energy) is the new foundation. Layers 6–7 (People + Event) slot between Creator and Wealth. Spiritual IS remains optional.
          </p>
        </div>
      </section>

      {/* What's different from SIS */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">What Ana added</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Four differences from SIS alone.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            Substantive contributions, not stylistic ones.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {differences.map((d) => {
              const Icon = d.icon
              return (
                <div
                  key={d.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <Icon className="h-5 w-5 text-ana-amber mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{d.title}</h3>
                  {/* Voice-pending */}
                  <p className="text-sm text-slate-500 leading-relaxed font-mono italic">{d.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* IFS Foundation — voice-pending */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">The foundation</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Why IFS belongs underneath the architecture.
          </h2>
          <p className="text-base text-slate-400 mb-8 max-w-2xl">
            Internal Family Systems isn&rsquo;t content for one of the layers. It&rsquo;s the substrate the layers sit on.
          </p>
          <div className="rounded-2xl border border-ana-amber/20 bg-gradient-to-br from-ana-amber/[0.04] to-transparent p-8">
            <p className="text-base text-slate-300 leading-relaxed font-mono italic">
              {/* TBD: Ana extract — her IFS framing in her voice. */}
            </p>
          </div>
        </div>
      </section>

      {/* Open source */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">Open source</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            MIT. Markdown. Yours to fork.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            Same license, same shape, same exit-always-available principle as SIS. The substrate is free; reciprocity (attribution + back-link) is the only ask.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ana-amber/[0.04] to-transparent p-6">
              <FileCode className="h-5 w-5 text-ana-amber mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">The repo</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Markdown-first. The 12 layers as folders. The 5 phases as commands. People + Event + Neuroscience subfolders mirror Ana&rsquo;s contribution structure. No build step required to read it.
              </p>
              <Link
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Github className="h-3.5 w-3.5" />
                View on GitHub
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ana-emerald/[0.04] to-transparent p-6">
              <Network className="h-5 w-5 text-ana-emerald mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Composes with SIS</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                AIS isn&rsquo;t a fork — it&rsquo;s a sister. Layers 0 + 6 + 7 install into your existing SIS vault without touching the rest. Or run AIS standalone. Either way, your SIP attestation chain stays intact.
              </p>
              <Link
                href="/starlight-intelligence-system/"
                className="inline-flex items-center gap-2 rounded-full border border-ana-emerald/30 bg-ana-emerald/10 px-4 py-2 text-sm font-semibold text-ana-cream transition-all hover:bg-ana-emerald/20"
              >
                See SIS
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Ana — minimal, voice-pending */}
      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">About</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
            Ana sees what the architecture had to abstract away.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed mb-8">
            {/* TBD: Ana extract — short bio in her words, with consent. Public-safe scope only. */}
            <span className="font-mono italic text-slate-500">
              {/* TBD: Ana extract — short public-safe bio. Consent-gated. */}
            </span>
          </p>
          <Link
            href="/ana"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ana-amber hover:text-ana-gold transition-colors"
          >
            A page just for Ana <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  )
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Ana Intelligence System — sister to SIS, with People + Event + IFS',
  description:
    'Sister to Starlight Intelligence System. Adds People Intelligence, Event Intelligence, neuroscience grounding, and Internal Family Systems as the foundation layer. MIT, markdown-first, sovereign.',
  // noindex until Ana reviews the page and consents to public attribution.
  // Page is reachable via direct link for collaborator review; flipping `index: true`
  // is the explicit go-public step once consent + Ana extract are in (Phase 5).
  robots: { index: false, follow: true, nocache: true },
  alternates: { canonical: 'https://frankx.ai/ana-intelligence-system/' },
  openGraph: {
    title: 'Ana Intelligence System',
    description:
      'AIS composes onto SIS. Adds People IS, Event IS, neuroscience grounding, IFS as foundation.',
    url: 'https://frankx.ai/ana-intelligence-system/',
    images: [
      {
        url: 'https://frankx.ai/images/mascot/ana-omega-hero-v1.jpg',
        width: 2048,
        height: 2048,
        alt: 'Ana-Ω with Venezuelan jaguar spirit-companion at observatory threshold',
      },
    ],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

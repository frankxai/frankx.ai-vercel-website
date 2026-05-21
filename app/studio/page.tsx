import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Layers,
  Mic,
  Video,
  Music,
  FileText,
  MonitorPlay,
  Utensils,
  Plane,
  Workflow,
} from 'lucide-react'
import { producers } from '@/lib/intake/producers'
import { platformPersonas } from '@/lib/intake/personas'
import { captureTypes } from '@/lib/intake/capture-types'
import { INTAKE_VERSION, INTAKE_SHIPPED } from '@/lib/intake'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Studio — The Content Operations System | FrankX',
  description:
    'Single capture → many ships. Eight L4 producer specialists serving three operator archetypes (Creator, Influencer, Solution Engineer) from one Android-native inbox. Phone-to-publish in under 2 hours.',
  alternates: { canonical: 'https://frankx.ai/studio' },
  openGraph: {
    title: 'Studio — The Content Operations System',
    description:
      'Eight producer specialists. Fourteen platform personas. Three operator archetypes. One inbox.',
    url: 'https://frankx.ai/studio',
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio — The Content Operations System',
    description: 'Eight producer specialists. Fourteen platform personas. One inbox.',
  },
}

const ICON_MAP: Record<string, typeof Layers> = {
  'vis-producer': Layers,
  'video-producer': Video,
  'audio-producer': Mic,
  'music-producer': Music,
  'prose-producer': FileText,
  'screen-producer': MonitorPlay,
  'food-producer': Utensils,
  'travel-producer': Plane,
}

const STATUS_BADGE = {
  shipped: { label: 'Live', class: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30' },
  partial: { label: 'Live (existing)', class: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/30' },
  'planned-w20': { label: 'W20', class: 'bg-amber-500/10 text-amber-300 ring-amber-500/30' },
  'planned-w21': { label: 'W21', class: 'bg-violet-500/10 text-violet-300 ring-violet-500/30' },
} as const

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'FrankX Studio — The Content Operations System',
  description:
    'A single capture → many ships pipeline. Eight L4 producer specialists serving Creator, Influencer, and Solution Engineer archetypes from one Android-native inbox.',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  datePublished: INTAKE_SHIPPED,
  dateModified: INTAKE_SHIPPED,
  mainEntityOfPage: 'https://frankx.ai/studio',
  inLanguage: 'en',
  keywords:
    'content operations, multi-agent content production, Android Syncthing, content classifier, multimodal orchestration, creator economy, AI content pipeline',
}

const archetypes = [
  {
    id: 'creator',
    label: 'Creator',
    description: 'Music + watch + workshops. Spotify drops, IG, YouTube long-form + Shorts, TikTok, Stories.',
    color: 'text-amber-400',
    chip: 'bg-amber-500/10 text-amber-300 ring-amber-500/30',
  },
  {
    id: 'influencer',
    label: 'Influencer',
    description: 'The AI Architect personal brand. LinkedIn, X, Threads, Newsletter, Bluesky, Podcast.',
    color: 'text-emerald-400',
    chip: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
  },
  {
    id: 'solution-engineer',
    label: 'Solution Engineer',
    description: 'The Oracle EMEA bridge story. GitHub, Newsletter, Podcast, LinkedIn, YouTube long-form.',
    color: 'text-cyan-400',
    chip: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/30',
  },
]

export default function StudioIndexPage() {
  const creatorPersonas = platformPersonas.filter((p) => p.archetype === 'creator')
  const influencerPersonas = platformPersonas.filter((p) => p.archetype === 'influencer')
  const sePersonas = platformPersonas.filter((p) => p.archetype === 'solution-engineer')

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO ------------------------------------------------------------ */}
      <section className="relative px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
            Studio · v{INTAKE_VERSION} · {INTAKE_SHIPPED}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            One capture.
            <br />
            <span className="text-emerald-400">Many ships.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10">
            The Studio is the operating system behind frankx.ai content. Eight L4 producer
            specialists. Fourteen platform personas. Three operator archetypes. One Android-native
            inbox. Phone-to-publish in under two hours.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#producers"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              See the producers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#flow"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              See the flow
            </Link>
            {/* Gravity-surface CTA — added 2026-05-21 per /hub-audit studio P0 */}
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Subscribe for producer launches
              <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* THE FLOW -------------------------------------------------------- */}
      <section id="flow" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            The single-capture pipeline
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Seven layers. One direction. No swivel-chair.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-12">
            Capture lands on the phone. Syncthing replicates to the machine. The classifier reads
            multimodally. The orchestrator dispatches producers in parallel. Operator approves
            once, ships everywhere.
          </p>

          <div className="rounded-xl bg-[#111113] border border-white/5 p-6 lg:p-8 mb-6">
            <pre className="font-mono text-[12px] md:text-[13px] leading-relaxed text-white/80 overflow-x-auto">
{`L0  CAPTURE      OnePlus 15R + Android phones — voice, video, photo, screen
L1  SYNC         Syncthing-Android → ~/_inbox/ (LAN <2s)
L2  CLASSIFY     content-intake-classifier — multimodal pass per file
L3  ORCHESTRATE  multimodal-orchestrator — parallel L4 dispatch
L4  PRODUCE      8 specialists (vis, video, audio, music, prose, screen, food, travel)
L5  OPERATE      /studio (public) · /admin/inbox (private, W22)
L6  DISTRIBUTE   Native per-platform publishing (manual until volume>200/mo)
L7  LEARN        hook-learn (live) · post-time-learn · thumbnail-learn (W22)`}
            </pre>
          </div>

          <p className="text-sm text-white/50 leading-relaxed">
            Full architecture in <code className="font-mono text-emerald-400/80">docs/superpowers/specs/2026-05-13-content-ops-architecture.md</code>.
            Setup guide for the L0/L1 Android side: <code className="font-mono text-emerald-400/80">docs/ops/ANDROID-INTAKE-SETUP.md</code>.
          </p>
        </div>
      </section>

      {/* THE 8 PRODUCERS ------------------------------------------------- */}
      <section id="producers" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            The L4 specialists
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Eight producers. Same substrate. Different specialties.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-12">
            Each specialist reads from the same persona matrix and capture-type registry. Adding a
            new producer follows the VIS shipping pattern — typed substrate, skill, command,
            agent, public page. About a day of work per specialist.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {producers.map((p) => {
              const Icon = ICON_MAP[p.id] ?? Layers
              const badge = STATUS_BADGE[p.status]
              return (
                <Link
                  key={p.id}
                  href={p.studioRoute}
                  className="group rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 hover:bg-[#1a1a1f] transition-colors flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30">
                        <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">{p.label}</h3>
                    </div>
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full ring-1 ${badge.class}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed flex-1 mb-4">
                    {p.publicStatusBlurb}
                  </p>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-[12px] text-emerald-400/80">{p.command}</code>
                    <ArrowRight
                      className="h-4 w-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all"
                      aria-hidden
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE 3 ARCHETYPES ------------------------------------------------ */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            Three operator archetypes
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            One operator. Three faces. One inbox.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-12">
            Almost nobody operates all three archetypes credibly. Most creators are creator-only;
            most influencers shed technical depth as they grow; most solution engineers don't ship
            public content. The combo is the moat.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {archetypes.map((a) => {
              const count =
                a.id === 'creator'
                  ? creatorPersonas.length
                  : a.id === 'influencer'
                    ? influencerPersonas.length
                    : sePersonas.length
              const list =
                a.id === 'creator'
                  ? creatorPersonas
                  : a.id === 'influencer'
                    ? influencerPersonas
                    : sePersonas
              return (
                <article
                  key={a.id}
                  className="rounded-xl bg-[#111113] border border-white/5 p-6"
                >
                  <p className={`text-[11px] tracking-[0.25em] uppercase font-medium mb-3 ${a.color}`}>
                    {a.label} · {count} platforms
                  </p>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {a.label}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">{a.description}</p>
                  <ul className="space-y-1.5">
                    {list.map((p) => (
                      <li key={p.platform} className="text-xs text-white/55 flex items-baseline gap-2">
                        <span className="text-white/30">·</span>
                        <span className="text-white/75">{p.label}</span>
                        <span className="text-white/40 italic">{p.persona.split('—')[0]?.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* THE INBOX ------------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            13 capture types
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Anything dropped on the phone walks the same pipeline.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-12">
            Voice memo on a walk. Restaurant photo. Talking-head from the studio. Screen-record of
            a system running. Architecture sketch from Excalidraw. The classifier reads all of
            them.
          </p>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {captureTypes
              .filter((c) => c.id !== 'unknown')
              .map((c) => (
                <article
                  key={c.id}
                  className="rounded-lg bg-[#111113] border border-white/5 p-5"
                >
                  <p className="font-mono text-[12px] text-emerald-400/80 mb-2">{c.id}</p>
                  <p className="text-sm text-white font-medium mb-1">{c.label}</p>
                  <p className="text-xs text-white/55 leading-relaxed">{c.description}</p>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* THE RUNTIME ----------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            The runtime
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Two agents. Two commands. One daemon.
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-12">
            Production-shipped today. L4 producer specialists ship W20–W21 on the same pattern.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <RuntimeCard
              kind="Command"
              name="/intake-classify"
              body="Classifies pending captures. Walks the 5-phase run protocol. Writes per-batch manifest + operator summary."
            />
            <RuntimeCard
              kind="Command"
              name="/intake-watch"
              body="Start, stop, or check the watcher daemon. The L1→L2 boundary that mime-sorts Syncthing drops."
            />
            <RuntimeCard
              kind="Agent"
              name="content-intake-classifier"
              body="Reads every new file multimodally. Tags type, spectrum, brand-fit, conversion-potential. Suggests producer dispatches."
            />
            <RuntimeCard
              kind="Agent"
              name="multimodal-orchestrator"
              body="Fans out classified batches to L4 producers in parallel. Collates outputs for operator review."
            />
            <RuntimeCard
              kind="Daemon"
              name="scripts/intake-watcher.mjs"
              body="Node fs.watch process. Watches ~/_inbox/dropped/, mime-sorts to typed subfolders, updates pending queue."
            />
            <RuntimeCard
              kind="Init"
              name="scripts/init-inbox.mjs"
              body="One-time setup. Creates ~/_inbox/ and ~/_archive/ filesystem per the canonical schema. Idempotent."
            />
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            See the architecture.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            Substrate, runtime, public face. Spec at <code className="font-mono text-emerald-400/80 text-base">docs/superpowers/specs/2026-05-13-content-ops-architecture.md</code>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/studio/visual"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              vis-producer (live)
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/os"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              FrankX OS
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function RuntimeCard({ kind, name, body }: { kind: string; name: string; body: string }) {
  return (
    <article className="rounded-xl bg-[#111113] border border-white/5 p-6">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium mb-3">{kind}</p>
      <p className="font-mono text-sm text-emerald-400 mb-3 break-all">{name}</p>
      <p className="text-sm text-white/60 leading-relaxed">{body}</p>
    </article>
  )
}

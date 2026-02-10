import Link from 'next/link'
import { ArrowRight, Box, Flame, Layers, Music2, Sparkles } from 'lucide-react'

const dropTypes = [
  {
    title: 'Prompt Packs',
    description: 'Agentic prompt sequences and workflows used in FrankX builds.',
    icon: Sparkles,
  },
  {
    title: 'Templates + Systems',
    description: 'Reusable templates for launches, content, and automation pipelines.',
    icon: Layers,
  },
  {
    title: 'Music & Sound',
    description: 'Weekly sonic drops, playlists, and frequency ritual tracks.',
    icon: Music2,
  },
  {
    title: 'Strategy Briefs',
    description: 'Research snapshots, market moves, and tactical insights.',
    icon: Box,
  },
]

const sampleDrops = [
  {
    title: 'Momentum Sprint Ritual',
    tag: 'Workflow',
    description: 'A 90-minute weekly routine to ship one asset + one distribution loop.',
  },
  {
    title: 'Claude Agent Desk Pack',
    tag: 'Prompt Pack',
    description: 'Live-tested prompt chains for writing, research, and systems planning.',
  },
  {
    title: 'Suno Session 14',
    tag: 'Music Drop',
    description: 'Ambient-to-cinematic prompt stack with vocal layering notes.',
  },
]

export default function DropsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-amber-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-200/80">
            <Flame className="h-4 w-4" />
            Weekly Drops
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Weekly drops keep the system alive.
              </h1>
              <p className="mt-4 text-lg text-white/60">
                Fresh prompts, templates, music, and strategy snapshots delivered every week—organized so you can pick what you need and ship fast.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/inner-circle"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Join Inner Circle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/vault"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80"
                >
                  Enter the Vault
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Latest Drop Preview</p>
              <p className="mt-2 text-xs text-white/50">Full archive available to members</p>
              <div className="mt-6 space-y-4">
                {sampleDrops.map((drop) => (
                  <div key={drop.title} className="rounded-2xl border border-white/10 bg-[#050a12] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/70">{drop.tag}</p>
                    <h3 className="mt-2 text-sm font-semibold text-white">{drop.title}</h3>
                    <p className="mt-1 text-xs text-white/60">{drop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-200/60">Drop Types</p>
            <h2 className="mt-3 text-3xl font-semibold">Pick your signal</h2>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-violet-100"
          >
            Build a custom skill
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {dropTypes.map((drop) => {
            const Icon = drop.icon
            return (
              <div key={drop.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <Icon className="h-6 w-6 text-white/80" />
                <h3 className="mt-4 text-xl font-semibold">{drop.title}</h3>
                <p className="mt-3 text-sm text-white/60">{drop.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060c]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-amber-500/10 p-10 text-center">
            <h2 className="text-3xl font-semibold">Want the full archive?</h2>
            <p className="mt-4 text-white/60">
              Members get the entire drop history, searchable by topic, asset type, and mission.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vault"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Access the Vault
              </Link>
              <Link
                href="/inner-circle"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80"
              >
                Join Inner Circle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

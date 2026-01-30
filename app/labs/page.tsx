import Link from 'next/link'
import { ArrowRight, CalendarClock, CirclePlay, Sparkles, Users, Waves } from 'lucide-react'

const labFormats = [
  {
    title: 'Live Build Labs',
    description: 'Co-working sessions where we design systems, ship assets, and solve blockers together.',
    icon: Users,
  },
  {
    title: 'Ritual Labs',
    description: 'Monthly momentum ritual to reset focus, build your next drop, and align the week.',
    icon: Waves,
  },
  {
    title: 'Agent Deep Dives',
    description: 'Focused builds on Claude/Codex/Gemini workflows with templates and live testing.',
    icon: Sparkles,
  },
]

const labFlow = [
  {
    label: 'Before',
    title: 'Pre-lab brief',
    description: 'You get the agenda, assets, and prep prompts 48 hours before we meet.',
  },
  {
    label: 'During',
    title: 'Live build',
    description: 'We work in real time, ship something real, and capture the workflow.',
  },
  {
    label: 'After',
    title: 'Replay + checklist',
    description: 'Every lab drops into the Vault with a recap and implementation checklist.',
  },
]

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            <CalendarClock className="h-4 w-4" />
            Live Labs
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Live labs are where the Vault becomes real.
              </h1>
              <p className="mt-4 text-lg text-white/60">
                Join guided build sessions, watch replays, and get the exact workflows used to turn ideas into published work.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/inner-circle"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Join Inner Circle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/vault"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80"
                >
                  Visit the Vault
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <CirclePlay className="h-5 w-5 text-violet-300" />
                <div>
                  <p className="text-sm font-semibold">Next Lab</p>
                  <p className="text-xs text-white/50">Schedule published inside the Vault</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {labFlow.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-[#050a12] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
                      {step.label}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-xs text-white/60">{step.description}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Lab Formats</p>
            <h2 className="mt-3 text-3xl font-semibold">Choose your build style</h2>
          </div>
          <Link
            href="/drops"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
          >
            Browse weekly drops
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {labFormats.map((format) => {
            const Icon = format.icon
            return (
              <div key={format.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <Icon className="h-6 w-6 text-white/80" />
                <h3 className="mt-4 text-xl font-semibold">{format.title}</h3>
                <p className="mt-3 text-sm text-white/60">{format.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060c]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 p-10 text-center">
            <h2 className="text-3xl font-semibold">Need the full replay library?</h2>
            <p className="mt-4 text-white/60">
              Every lab becomes a replay drop inside the Vault with templates, assets, and step-by-step notes.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vault"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Enter the Vault
              </Link>
              <Link
                href="/inner-circle"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

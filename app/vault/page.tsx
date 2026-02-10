import Link from 'next/link'
import { ArrowRight, Calendar, FolderLock, Layers, Music2, Sparkles, Zap } from 'lucide-react'

const vaultTracks = [
  {
    title: 'Systems Vault',
    description: 'Playbooks, templates, and launch rituals pulled directly from FrankX operations.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    icon: Layers,
  },
  {
    title: 'Prompt Packs',
    description: 'Weekly agentic prompts, content pipelines, and orchestration sequences.',
    accent: 'from-cyan-500/20 to-cyan-500/5',
    icon: Sparkles,
  },
  {
    title: 'Sonic Drops',
    description: 'Music sessions, sound design stacks, and frequency ritual playlists.',
    accent: 'from-violet-500/20 to-violet-500/5',
    icon: Music2,
  },
]

const vaultWorkflows = [
  {
    title: 'Build → Ship Workflow',
    description: 'From idea capture to published release with clear handoffs and checkpoints.',
  },
  {
    title: 'Signal Intelligence Review',
    description: 'Weekly synthesis ritual that keeps you ahead of AI, music, and creator trends.',
  },
  {
    title: 'Agent Deployment Sprint',
    description: 'Spin up Claude/Codex/Gemini playbooks, docs, and automation in a single lab.',
  },
]

const quickstartSteps = [
  {
    label: 'Step 1',
    title: 'Join the Inner Circle',
    description: 'Unlock member access and get your welcome kit.',
    href: '/inner-circle',
  },
  {
    label: 'Step 2',
    title: 'Enter the Vault',
    description: 'Open the systems, templates, and workflows hub.',
    href: '/vault',
  },
  {
    label: 'Step 3',
    title: 'Join the Labs',
    description: 'Live sessions + replays to implement fast.',
    href: '/labs',
  },
  {
    label: 'Step 4',
    title: 'Weekly Drops',
    description: 'New assets every week to keep momentum compounding.',
    href: '/drops',
  },
]

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
            <FolderLock className="h-4 w-4" />
            Member Vault
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                The Vault is your paid access hub for workflows, drops, and lab replays.
              </h1>
              <p className="mt-4 text-lg text-white/60">
                Everything FrankX ships—systems, prompts, music, and strategy—organized into a single member space so you can build faster without guessing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/inner-circle"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Join Inner Circle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/drops"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white"
                >
                  View Weekly Drops
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
                <Zap className="h-4 w-4 text-emerald-300" />
                Paid members get full access. Previews stay public so you can see the quality before you join.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-sm font-semibold">Member cadence</p>
                  <p className="text-xs text-white/50">Weekly drops • Monthly labs • Quarterly intensives</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {quickstartSteps.map((step) => (
                  <Link
                    key={step.title}
                    href={step.href}
                    className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-[#050a12] p-4 transition hover:border-white/20"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/70">
                      {step.label}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="text-xs text-white/60">{step.description}</p>
                    </div>
                    <ArrowRight className="ml-auto mt-1 h-4 w-4 text-white/40 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">Vault Tracks</p>
            <h2 className="mt-3 text-3xl font-semibold">What lives inside</h2>
          </div>
          <Link
            href="/inner-circle"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
          >
            Unlock full access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {vaultTracks.map((track) => {
            const Icon = track.icon
            return (
              <div key={track.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${track.accent} opacity-70`} />
                <div className="relative">
                  <Icon className="h-6 w-6 text-white/80" />
                  <h3 className="mt-4 text-xl font-semibold">{track.title}</h3>
                  <p className="mt-3 text-sm text-white/60">{track.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060c]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Workflow Systems</p>
              <h2 className="mt-3 text-3xl font-semibold">Ship with repeatable rituals</h2>
              <p className="mt-4 text-white/60">
                Every vault drop comes with a workflow: intake, build, publish, and review. You get the exact sequences we run inside FrankX.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap">
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white/80"
                >
                  See Live Labs
                </Link>
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80"
                >
                  Build Skills
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {vaultWorkflows.map((workflow) => (
                <div key={workflow.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">{workflow.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{workflow.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 p-10 text-center">
          <h2 className="text-3xl font-semibold">Ready to step inside?</h2>
          <p className="mt-4 text-white/60">
            The Vault is the member destination. If you already have access, start with the latest drops. If not, join the Inner Circle.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inner-circle"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Join Inner Circle
            </Link>
            <Link
              href="/drops"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80"
            >
              Browse Weekly Drops
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

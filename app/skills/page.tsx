import Link from 'next/link'
import { ArrowRight, ClipboardList, Sparkles, Wand2 } from 'lucide-react'

const triggerPhrases = [
  'Activate Technical Translator',
  'Channel Frequency Alchemist',
  'Engage Creation Engine',
  'Consult Soul Strategist',
]

const workflowSteps = [
  {
    title: 'Design your skill',
    description: 'Use the Skill Builder to capture the mission, triggers, and outputs you want.',
  },
  {
    title: 'Install in your agents',
    description: 'Drop the generated SKILL.md into your .claude-skills folder or agent repo.',
  },
  {
    title: 'Trigger it on demand',
    description: 'Call the skill by name or use activation phrases inside Claude/Codex/Gemini.',
  },
]

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
            <Sparkles className="h-4 w-4" />
            Skills Hub
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Build custom skills for every agent in your stack.
              </h1>
              <p className="mt-4 text-lg text-white/60">
                Skills turn your workflows into reusable, triggerable instructions for Claude, Codex, Gemini, and your internal agents.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/skills/builder"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  Open Skill Builder
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/resources/skills"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80"
                >
                  Browse Skill Library
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold">Trigger phrases</p>
                  <p className="text-xs text-white/50">Use these to activate your agents fast</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {triggerPhrases.map((phrase) => (
                  <div key={phrase} className="rounded-2xl border border-white/10 bg-[#050a12] px-4 py-3 text-sm text-white/70">
                    {phrase}
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
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">Skill Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold">How it works</h2>
          </div>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
          >
            Go to Vault
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflowSteps.map((step) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Wand2 className="h-6 w-6 text-white/80" />
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060c]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10 p-10 text-center">
            <h2 className="text-3xl font-semibold">Need a skill crafted for your workflow?</h2>
            <p className="mt-4 text-white/60">
              Use the Skill Builder to generate a ready-to-install SKILL.md, plus a prompt you can paste into any agent.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/skills/builder"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Build a Skill
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

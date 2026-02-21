import { createMetadata } from '@/lib/seo'
import { Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = createMetadata({
  title: 'Goals | FrankX',
  description: 'Current objectives and roadmap for FrankX.ai — from shipping products to scaling the creator platform.',
  path: '/goals',
})

const goalSections = [
  {
    title: 'Product & Revenue',
    goals: [
      { text: 'Launch template marketplace with 15+ premium products', done: true },
      { text: 'Establish affiliate revenue streams (Railway, n8n, Vercel)', done: false },
      { text: 'First $1K MRR from digital products', done: false },
      { text: 'Ship investor intelligence toolkit (14 products)', done: false },
    ],
  },
  {
    title: 'Content & Audience',
    goals: [
      { text: 'Publish 100 high-quality blog articles', done: false },
      { text: 'Launch 6 newsletter streams with dedicated audiences', done: true },
      { text: 'Build YouTube presence with AI architecture content', done: false },
      { text: 'Reach 1,000 newsletter subscribers', done: false },
    ],
  },
  {
    title: 'AI Systems',
    goals: [
      { text: 'ACOS v10 — full agentic creator operating system', done: true },
      { text: 'Starlight Intelligence System v4 — universal context standard', done: true },
      { text: 'Product Team orchestration — 6-agent parallel builds', done: false },
      { text: 'Autonomous design quality system with audit pipeline', done: false },
    ],
  },
  {
    title: 'Music & Creative',
    goals: [
      { text: 'Create 12,000+ AI songs across 20+ genres', done: true },
      { text: 'Release curated albums with premium production', done: false },
      { text: 'Build interactive music lab with Suno integration', done: true },
      { text: 'License tracks for commercial use', done: false },
    ],
  },
]

export default function GoalsPage() {
  const totalGoals = goalSections.reduce((sum, s) => sum + s.goals.length, 0)
  const completedGoals = goalSections.reduce(
    (sum, s) => sum + s.goals.filter((g) => g.done).length,
    0
  )
  const progressPercent = Math.round((completedGoals / totalGoals) * 100)

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
            <Target className="w-4 h-4" />
            Current objectives
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            What I&apos;m building toward.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Transparent roadmap of what&apos;s shipped and what&apos;s next. Updated as things get done.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">
              Overall progress
            </span>
            <span className="text-sm font-mono text-[#43BFE3]">
              {completedGoals}/{totalGoals} ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Goal Sections */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {goalSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.goals.map((goal) => (
                  <li key={goal.text} className="flex items-start gap-3">
                    {goal.done ? (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-white/20 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={goal.done ? 'text-white/60 line-through' : 'text-white/80'}>
                      {goal.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Follow the progress</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Get updates on what ships, what works, and what doesn&apos;t — straight to your inbox.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Subscribe to Updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}

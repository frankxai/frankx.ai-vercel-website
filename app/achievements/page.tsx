import { createMetadata } from '@/lib/seo'
import { Trophy, Code2, Music, BookOpen, Cpu, Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = createMetadata({
  title: 'Achievements | FrankX',
  description: 'Real milestones from building AI systems, creating 12,000+ AI songs, and shipping products. No fabricated stats — just documented results.',
  path: '/achievements',
})

const milestones = [
  {
    year: '2026',
    items: [
      {
        title: 'ACOS v10 — Agentic Creator Operating System',
        description: 'Built a 75+ skill, 35+ command, 38-agent operating system for autonomous creative production. Powers this entire website.',
        category: 'AI Systems',
        icon: Cpu,
      },
      {
        title: '80+ Published Articles',
        description: 'Wrote and shipped 80+ long-form blog articles covering AI architecture, music production, and creative systems.',
        category: 'Content',
        icon: BookOpen,
      },
      {
        title: 'Starlight Intelligence System v4',
        description: 'Universal context standard with memory management, agent routing, and orchestration. Works across Claude Code, Cursor, and Windsurf.',
        category: 'AI Systems',
        icon: Layers,
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        title: '12,000+ AI-Generated Songs',
        description: 'Created over 12,000 tracks on Suno covering tech house, orchestral, ambient, hip-hop, and experimental genres. 456 followers, 13K hooks.',
        category: 'Music',
        icon: Music,
      },
      {
        title: 'FrankX.ai — Full-Stack Creator Platform',
        description: 'Designed and built a 240+ page Next.js platform with glassmorphic design system, MDX blog engine, and AI-powered content pipeline.',
        category: 'Development',
        icon: Code2,
      },
      {
        title: 'Enterprise AI Architecture Practice',
        description: 'Multi-cloud AI systems design with Oracle Cloud expertise. Agent orchestration, RAG pipelines, and production ML deployments.',
        category: 'AI Architecture',
        icon: Cpu,
      },
    ],
  },
]

const stats = [
  { label: 'AI Songs Created', value: '12,000+' },
  { label: 'Blog Articles', value: '80+' },
  { label: 'ACOS Skills', value: '75+' },
  { label: 'Site Pages', value: '240+' },
]

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
            <Trophy className="w-4 h-4" />
            Real results, documented
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Built, shipped, measured.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Every number on this page is real. No fabricated certifications, no invented organizations — just work that speaks for itself.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/[0.08] bg-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        {milestones.map((group) => (
          <div key={group.year} className="mb-16 last:mb-0">
            <h2 className="text-2xl font-bold text-white/40 mb-8 tracking-wider">
              {group.year}
            </h2>
            <div className="space-y-6">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#AB47C7]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#AB47C7]" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#43BFE3] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-1">
                          {item.title}
                        </h3>
                        <p className="text-white/60 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">See how it&apos;s built</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Every system behind these results is documented. Explore the architecture, read the blog, or check the products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Read the Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold hover:bg-white/5 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Library,
  Mail,
  Music,
  Network,
  Package,
  Play,
  Rocket,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Zap,
  Presentation,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { getNodesByRing } from '@/lib/students/data'
import type { EcosystemNode } from '@/lib/students/types'

// Icon map for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Target, Compass, Users, Sparkles, Layers, Presentation,
  Terminal, Music, Rocket, Zap, Package,
  BookOpen, Brain, Library, Play, GraduationCap,
  Flame, Mail, Network,
}

const ringMeta: Record<EcosystemNode['ring'], { label: string; title: string; color: string; glowColor: GlowColor }> = {
  tools: { label: 'Student Tools', title: 'Your starting point. Interactive tools built for learning.', color: 'text-emerald-400', glowColor: 'emerald' },
  platform: { label: 'Platform', title: 'Creative systems built by Frank. Open source and free.', color: 'text-violet-400', glowColor: 'violet' },
  content: { label: 'Content', title: '90+ articles, 17+ research domains, 6 books, video vault.', color: 'text-cyan-400', glowColor: 'cyan' },
  growth: { label: 'Growth', title: 'Level up with coaching, community, and advanced systems.', color: 'text-amber-400', glowColor: 'amber' },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function EcosystemPage() {
  const rings: EcosystemNode['ring'][] = ['tools', 'platform', 'content', 'growth']

  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-600/[0.06] blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/[0.04] blur-[100px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-5 pb-20 pt-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb */}
        <motion.div variants={fadeUp} className="mb-8">
          <Link href="/students" className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors">
            <GraduationCap className="h-3 w-3" />
            Learning Paths
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.section variants={fadeUp} className="mb-14 text-center">
          <div className="mb-5 flex justify-center">
            <FrankOmega variant="pixar-blue" size="md" glow />
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The FrankX{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-white/40 leading-relaxed">
            Every tool, every resource, every learning path — in one map.
            Built by an AI architect who ships. All free to explore.
          </p>
        </motion.section>

        {/* Rings */}
        {rings.map((ring) => {
          const meta = ringMeta[ring]
          const nodes = getNodesByRing(ring)

          return (
            <motion.section key={ring} variants={fadeUp} className="mb-10">
              <div className="mb-4">
                <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${meta.color}`}>
                  {meta.label}
                </span>
                <p className="mt-0.5 text-xs text-white/30">{meta.title}</p>
              </div>

              <div className={`grid gap-2 ${
                nodes.length <= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' :
                nodes.length <= 5 ? 'sm:grid-cols-2 lg:grid-cols-5' :
                'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {nodes.map((node) => {
                  const Icon = iconMap[node.icon] || Sparkles
                  return (
                    <GlowCard key={node.name + node.ring} color={meta.glowColor} href={node.href} className="!rounded-2xl">
                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Icon className="h-4 w-4 text-white/40" />
                          {node.badge && (
                            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium text-white/40">
                              {node.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-white/90">{node.name}</h3>
                        <p className="mt-0.5 text-[11px] text-white/30 leading-relaxed">{node.description}</p>
                      </div>
                    </GlowCard>
                  )
                })}
              </div>
            </motion.section>
          )
        })}

        {/* Stats */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { val: '90+', label: 'Articles' },
              { val: '75+', label: 'AI Skills' },
              { val: '12K+', label: 'AI Songs' },
              { val: '17+', label: 'Research Domains' },
              { val: '6', label: 'Books' },
              { val: '21', label: 'Ecosystem Tools' },
            ].map((s) => (
              <div key={s.label} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
                <span className="text-xs font-semibold text-white/60">{s.val}</span>
                <span className="ml-1 text-[10px] text-white/25">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center">
          <Link
            href="/students/assess"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Find your starting point
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeUp} className="mt-14 text-center">
          <p className="text-[11px] font-mono text-white/15">
            frankx.ai/students/ecosystem · Built by Frank X. Riemer
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

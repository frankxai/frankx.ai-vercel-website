'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Music2, Briefcase, GraduationCap, ArrowRight } from 'lucide-react'

const audiences = [
  {
    icon: Code2,
    title: 'Developers & Engineers',
    description: 'AI coding agents, agentic workflows, ACOS, multi-agent orchestration.',
    href: '/developers',
    accentClass: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    icon: Music2,
    title: 'Music Creators',
    description: 'Suno AI mastery, prompt engineering, AI music production workflows.',
    href: '/music-lab',
    accentClass: 'bg-cyan-500/10 text-cyan-400',
  },
  {
    icon: Briefcase,
    title: 'Enterprise Architects',
    description: 'Production AI systems, RAG architectures, cloud infrastructure patterns.',
    href: '/ai-architecture',
    accentClass: 'bg-violet-500/10 text-violet-400',
  },
  {
    icon: GraduationCap,
    title: 'Students & Learners',
    description: 'Free courses from top universities, learning paths, certifications.',
    href: '/students',
    accentClass: 'bg-amber-500/10 text-amber-400',
  },
]

export function ICPRouting() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Built for builders.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/40">
            Find your path.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={audience.href}
                className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all h-full"
              >
                <div className={`shrink-0 p-2.5 rounded-xl ${audience.accentClass.split(' ')[0]}`}>
                  <audience.icon className={`w-5 h-5 ${audience.accentClass.split(' ')[1]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
                <ArrowRight className="shrink-0 w-4 h-4 text-white/15 group-hover:text-white/40 mt-1 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tier {
  price: string
  name: string
  tagline: string
  href: string
  cta: string
  color: string
  glowColor: string
  borderColor: string
  badge?: string
  features: string[]
  featured?: boolean
}

const tiers: Tier[] = [
  {
    price: 'Free',
    name: 'Signal Loop',
    tagline: 'The weekly intelligence dispatch',
    href: '/newsletter',
    cta: 'Subscribe free',
    color: 'text-white/70',
    glowColor: 'bg-white/5',
    borderColor: 'border-white/10',
    features: [
      'Weekly build-in-public dispatch',
      'Latest AI model breakdowns',
      'Featured track + context',
      'Early access to new releases',
    ],
  },
  {
    price: '€0',
    name: 'Free Playbooks',
    tagline: 'Starter guides & prompt packs',
    href: '/free-playbook',
    cta: 'Download free',
    color: 'text-cyan-400',
    glowColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/20',
    features: [
      'ACOS quick-start guide',
      'Prompt engineering primer',
      'AI music production basics',
      'Creator OS overview PDF',
    ],
  },
  {
    price: '€47',
    name: 'Creator Kit',
    tagline: 'Premium templates + video guides',
    href: '/products',
    cta: 'Get Creator Kit',
    color: 'text-emerald-400',
    glowColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    badge: 'Most popular',
    featured: true,
    features: [
      'Full ACOS prompt library',
      '30+ premium templates',
      'Video walkthroughs',
      'Claude Code skill packs',
      'Priority Discord access',
    ],
  },
  {
    price: '€197',
    name: 'Pro System',
    tagline: 'The complete Agentic Creator OS',
    href: '/acos',
    cta: 'Get Pro System',
    color: 'text-violet-400',
    glowColor: 'bg-violet-500/5',
    borderColor: 'border-violet-500/20',
    features: [
      'Everything in Creator Kit',
      'Full ACOS codebase access',
      '75+ skills, 38 agents',
      'Monthly live workshops',
      'Monthly Q&A calls',
    ],
  },
  {
    price: '€2,997',
    name: "Founder's Circle",
    tagline: 'Application only · cohort-based',
    href: '/founders-circle',
    cta: 'Apply now',
    color: 'text-amber-400',
    glowColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20',
    badge: 'By application',
    features: [
      'Everything in Pro System',
      'Direct access to Frank',
      'Build your own Founder OS',
      'Co-build sessions',
      'Lifetime community access',
    ],
  },
]

export default function ProductLadderSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/50 font-medium mb-4">
            How to work with FrankX
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Pick your level of depth
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            From free dispatch to full co-build — every tier is a step deeper into the system.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={cn(
                'relative flex flex-col rounded-2xl border p-5 transition-all',
                tier.glowColor,
                tier.borderColor,
                tier.featured
                  ? 'ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'hover:border-white/20'
              )}
            >
              {tier.badge && (
                <div className={cn(
                  'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wide whitespace-nowrap',
                  tier.featured
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                )}>
                  {tier.badge}
                </div>
              )}

              <div className="mb-4">
                <p className={cn('text-2xl font-bold mb-0.5', tier.color)}>{tier.price}</p>
                <h3 className="text-sm font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-white/40 leading-snug">{tier.tagline}</p>
              </div>

              <ul className="space-y-1.5 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                    <Check className={cn('w-3.5 h-3.5 mt-0.5 flex-shrink-0', tier.color)} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 w-full rounded-xl py-2.5 text-xs font-semibold transition-all',
                  tier.featured
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white'
                )}
              >
                {tier.cta}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-xs text-white/25"
        >
          All paid tiers include lifetime access to that version. No subscriptions below Founder&apos;s Circle.
        </motion.p>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { LucideIcon, Music2, Code2, Users, Sparkles, BookOpen, Award } from 'lucide-react'
import { LogoStrip } from '@/components/ui/LogoStrip'
import { brandLogos } from '@/data/brand-logos'

// ============================================================================
// TYPES
// ============================================================================

interface Stat {
  value: string
  label: string
  icon?: LucideIcon
  color?: 'emerald' | 'cyan' | 'violet' | 'amber'
}

interface SocialProofStatsProps {
  stats?: Stat[]
  variant?: 'horizontal' | 'vertical' | 'compact'
  showIcons?: boolean
}

// ============================================================================
// DEFAULT STATS
// ============================================================================

const defaultStats: Stat[] = [
  { value: '10K+', label: 'Songs created with Suno', icon: Music2, color: 'cyan' },
  { value: '5+', label: 'Years building AI systems', icon: Code2, color: 'emerald' },
  { value: '50+', label: 'Curated learning resources', icon: BookOpen, color: 'violet' },
  { value: 'Open', label: 'Everything documented', icon: Sparkles, color: 'amber' },
]

// ============================================================================
// COLOR MAP
// ============================================================================

const colorMap = {
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-400',
  violet: 'text-violet-400',
  amber: 'text-amber-400',
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SocialProofStats({
  stats = defaultStats,
  variant = 'horizontal',
  showIcons = false,
}: SocialProofStatsProps) {
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className={`text-2xl md:text-3xl font-bold ${stat.color ? colorMap[stat.color] : 'text-white'}`}>
              {stat.value}
            </div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            {showIcons && stat.icon && (
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color ? colorMap[stat.color] : 'text-white'}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default horizontal layout
  return (
    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 md:gap-x-24">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center"
        >
          {showIcons && stat.icon && (
            <div className={`mx-auto mb-3 p-3 rounded-xl bg-white/5 w-fit ${stat.color ? colorMap[stat.color] : 'text-white'}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          )}
          <div className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tighter">
            {stat.value}
          </div>
          <div className="text-sm text-white/40 max-w-[160px]">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// LOGO CLOUD COMPONENT
// ============================================================================

export function LogoCloud() {
  return (
    <div className="py-8">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/30 text-center mb-6">
        Featured resources from
      </p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <LogoStrip logos={brandLogos.slice(0, 6)} variant="grid" size="sm" linkMode="brand" />
      </motion.div>
    </div>
  )
}

// ============================================================================
// TRUST BADGES
// ============================================================================

export function TrustBadges() {
  const badges = [
    { icon: Award, label: 'Oracle Certified', color: 'cyan' },
    { icon: Users, label: 'Community of 1000+', color: 'emerald' },
    { icon: Sparkles, label: 'AI-First Approach', color: 'violet' },
    { icon: Music2, label: '10K+ Songs Created', color: 'amber' },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <badge.icon className={`w-4 h-4 ${colorMap[badge.color as keyof typeof colorMap]}`} />
          <span className="text-xs text-white/60">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

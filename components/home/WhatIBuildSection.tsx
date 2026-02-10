'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Music2, Server, Package, ArrowRight } from 'lucide-react'
import { homepageContent } from '@/data/homepage'

const iconMap = {
  music: Music2,
  server: Server,
  package: Package,
}

const colorMap = {
  cyan: {
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    icon: 'text-cyan-400',
    border: 'border-cyan-500/20',
    hover: 'group-hover:border-cyan-400/30'
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    icon: 'text-emerald-400',
    border: 'border-emerald-500/20',
    hover: 'group-hover:border-emerald-400/30'
  },
  violet: {
    gradient: 'from-violet-500/20 to-violet-500/5',
    icon: 'text-violet-400',
    border: 'border-violet-500/20',
    hover: 'group-hover:border-violet-400/30'
  }
}

export function WhatIBuildSection() {
  const { whatIBuild } = homepageContent

  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/[0.03] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/60 mb-3">
            Focus Areas
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              {whatIBuild.sectionTitle}
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl lg:max-w-md">
              {whatIBuild.sectionSubtitle}
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {whatIBuild.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const colors = colorMap[item.color as keyof typeof colorMap]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`group relative block h-full p-6 md:p-8 rounded-2xl bg-white/[0.02] border ${colors.border} ${colors.hover} hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950`}
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] transition-all duration-300 mb-6`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>

                    {/* Content */}
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-2">
                      {item.subtitle}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-base text-white/50 leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {item.stats.map((stat, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-semibold text-white/70">{stat.value}</span>
                          <span className="text-white/40 ml-1">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-emerald-400 transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

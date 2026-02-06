'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  Code,
  Cpu,
  Database,
  FileText,
  Heart,
  Layers,
  Network,
  Plug,
  Radar,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import type { ResearchDomain } from '@/lib/research/domains'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Building2, Code, Cpu, Database, FileText, Heart, Layers,
  Network, Plug, Radar, Search, Shield, ShieldCheck, TrendingUp, BarChart3,
}

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5' },
  indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', gradient: 'from-indigo-500/20 to-indigo-500/5' },
  lime: { border: 'border-lime-500/30', text: 'text-lime-400', bg: 'bg-lime-500/10', gradient: 'from-lime-500/20 to-lime-500/5' },
  fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', gradient: 'from-fuchsia-500/20 to-fuchsia-500/5' },
  sky: { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/10', gradient: 'from-sky-500/20 to-sky-500/5' },
}

interface Props {
  domain: ResearchDomain
  relatedDomains: ResearchDomain[]
}

export default function ResearchDomainPage({ domain, relatedDomains }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = iconMap[domain.icon] || Layers
  const colors = colorConfig[domain.color] || colorConfig.emerald

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 right-1/4 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative pt-28 pb-20 md:pt-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/research" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Research Hub
              </Link>
              <span>/</span>
              <span className="text-white/70">{domain.title}</span>
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.05 }}
            className="mb-10"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3.5 ${colors.bg} rounded-2xl ${colors.border} border`}>
                <Icon className={`w-7 h-7 ${colors.text}`} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {domain.title}
                </h1>
                <p className="text-white/40 mt-1">{domain.subtitle}</p>
              </div>
            </div>

            {/* TL;DR */}
            <div className={`rounded-2xl ${colors.border} border bg-gradient-to-br ${colors.gradient} p-6`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className={`h-4 w-4 ${colors.text}`} />
                <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
                  TL;DR
                </span>
              </div>
              <p className="text-white/90 leading-relaxed">{domain.tldr}</p>
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    Updated {domain.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    {domain.sourceCount} sources validated
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
          >
            {domain.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <p className="text-2xl font-bold text-white mb-0.5">{h.stat}</p>
                <p className={`text-xs font-medium ${colors.text} mb-1`}>{h.label}</p>
                {h.source && (
                  <p className="text-[10px] text-white/25">{h.source}</p>
                )}
              </div>
            ))}
          </motion.div>

          {/* Sections */}
          <div className="space-y-10 mb-12">
            {domain.sections.map((section, sIndex) => (
              <motion.div
                key={sIndex}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 + sIndex * 0.05 }}
              >
                <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                <p className="text-white/50 leading-relaxed mb-4">{section.content}</p>

                {section.items && (
                  <div className={`grid gap-3 ${section.items.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {section.items.map((item, iIndex) => (
                      <div
                        key={iIndex}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                          {item.badge && (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} whitespace-nowrap`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Key Findings */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className={`h-5 w-5 ${colors.text}`} />
              Key Findings
            </h2>
            <div className="space-y-3">
              {domain.keyFindings.map((finding, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${colors.bg} ${colors.text} text-xs font-bold flex-shrink-0 mt-0.5`}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Domains */}
          {relatedDomains.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-lg font-bold text-white mb-4">Related Research</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedDomains.map((rd) => {
                  const RdIcon = iconMap[rd.icon] || Layers
                  const rdColors = colorConfig[rd.color] || colorConfig.emerald

                  return (
                    <Link
                      key={rd.slug}
                      href={`/research/${rd.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                    >
                      <div className={`p-2 ${rdColors.bg} rounded-lg flex-shrink-0`}>
                        <RdIcon className={`w-4 h-4 ${rdColors.text}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white group-hover:text-white/90 transition-colors">
                          {rd.title}
                        </h3>
                        <p className="text-xs text-white/30 mt-0.5 line-clamp-1">{rd.subtitle}</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0 mt-0.5" />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Related Blog Posts */}
          {domain.relatedBlogPosts.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.45 }}
              className="mb-12"
            >
              <h2 className="text-lg font-bold text-white mb-4">Published Articles</h2>
              <div className="flex flex-wrap gap-3">
                {domain.relatedBlogPosts.map((post, i) => (
                  <Link
                    key={i}
                    href={post}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-sm text-white/60 hover:bg-white/[0.05] hover:text-white transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-white/30 group-hover:text-white/50" />
                    Read Article
                    <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-70 transition-opacity" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to Hub */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
            className="pt-8 border-t border-white/[0.04]"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research Hub
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

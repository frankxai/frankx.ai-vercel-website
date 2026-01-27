'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  TrendingUp,
  Network,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Link2,
  Calendar,
  BarChart3,
} from 'lucide-react'
import {
  researchBriefs,
  getBriefBySlug,
  getFreshnessStatus,
  getFreshnessLabel,
  getConfidencePercentage,
  type FreshnessStatus,
  type ConfidenceLevel,
} from '@/lib/research/validated-claims'

// Freshness indicator component
function FreshnessBadge({ status }: { status: FreshnessStatus }) {
  const config = {
    current: {
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      icon: ShieldCheck,
      label: 'Current',
    },
    aging: {
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      icon: AlertTriangle,
      label: 'Aging',
    },
    stale: {
      color: 'bg-red-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      icon: AlertCircle,
      label: 'Needs Review',
    },
  }

  const { color, textColor, bgColor, icon: Icon, label } = config[status]

  return (
    <div className={`inline-flex items-center gap-2 rounded-full ${bgColor} px-3 py-1`}>
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <Icon className={`h-3.5 w-3.5 ${textColor}`} />
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  )
}

// Confidence bar component
function ConfidenceBar({ confidence }: { confidence: ConfidenceLevel }) {
  const percentage = getConfidencePercentage(confidence)
  const color = confidence === 'high' ? 'bg-emerald-500' :
                confidence === 'medium-high' ? 'bg-cyan-500' :
                confidence === 'medium' ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-slate-500">{percentage}%</span>
    </div>
  )
}

export default function ResearchBriefPage() {
  const params = useParams()
  const slug = params?.slug as string
  const brief = getBriefBySlug(slug)

  if (!brief) {
    return (
      <main className="min-h-screen bg-[#030712] pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Brief Not Found</h1>
          <p className="text-slate-400 mb-8">The research brief you&apos;re looking for doesn&apos;t exist yet.</p>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </Link>
        </div>
      </main>
    )
  }

  const freshnessStatus = getFreshnessStatus(brief.lastValidated)

  // Calculate key stats from claims
  const keyStats = brief.claims.slice(0, 4).map(claim => ({
    label: claim.claim.split(' ').slice(0, 4).join(' ') + '...',
    value: claim.value,
    trend: claim.confidence === 'high' ? 'Verified' : 'Estimated'
  }))

  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#030712]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research Hub
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                {brief.category}
              </span>
              <FreshnessBadge status={freshnessStatus} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {brief.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              {brief.description}
            </p>
          </motion.div>

          {/* Validation Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan-500/[0.08] to-violet-500/[0.04] p-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Validation Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Last Validated
                  </p>
                  <p className="text-lg font-semibold text-white">{brief.lastValidated}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Link2 className="h-3 w-3" />
                    Sources
                  </p>
                  <p className="text-lg font-semibold text-white">{brief.sourceCount} cross-referenced</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Claims Validated
                  </p>
                  <p className="text-lg font-semibold text-white">{brief.claims.length}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Freshness
                  </p>
                  <p className="text-lg font-semibold text-emerald-400">{getFreshnessLabel(freshnessStatus)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {keyStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center"
              >
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500 mb-1 line-clamp-1">{stat.label}</p>
                <p className="text-[10px] text-cyan-400">{stat.trend}</p>
              </div>
            ))}
          </motion.div>

          {/* Validated Claims - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Validated Claims
            </h2>
            <div className="space-y-4">
              {brief.claims.map((claim, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-white font-medium">&ldquo;{claim.claim}&rdquo;</p>
                    <span className="text-2xl font-bold text-cyan-400 whitespace-nowrap">
                      {claim.value}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Sources */}
                    <div className="flex flex-wrap items-start gap-2">
                      <span className="text-xs text-slate-500 mt-0.5">Sources:</span>
                      <div className="flex flex-wrap gap-2">
                        {claim.sources.map((source, si) => (
                          <span key={si} className="inline-flex items-center gap-1">
                            {source.url ? (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                              >
                                {source.name}
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400">{source.name}</span>
                            )}
                            {source.date && (
                              <span className="text-[10px] text-slate-600">({source.date})</span>
                            )}
                            {si < claim.sources.length - 1 && (
                              <span className="text-slate-600">,</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Validation metadata */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Confidence:</span>
                        <ConfidenceBar confidence={claim.confidence} />
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          claim.confidence === 'high' ? 'bg-emerald-500/15 text-emerald-400' :
                          claim.confidence === 'medium-high' ? 'bg-cyan-500/15 text-cyan-400' :
                          'bg-amber-500/15 text-amber-400'
                        }`}>
                          {claim.confidence.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>Verified: {claim.validatedDate}</span>
                      </div>
                      {claim.crossRefCount > 1 && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Link2 className="h-3 w-3" />
                          <span>{claim.crossRefCount} cross-references</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Implications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <TrendingUp className="h-5 w-5 text-violet-400" />
              Implications for AI Architects
            </h2>
            <div className="space-y-3">
              {brief.implications.map((implication, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 text-violet-400 text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-slate-300">{implication}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Validation Methodology
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {brief.methodology}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  {brief.sourceCount} sources validated
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Minimum 2 cross-references for &quot;High&quot; confidence
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {brief.lastValidated}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Related Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {brief.relatedArticles.map((article, i) => (
              <Link
                key={i}
                href={article}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                <FileText className="h-4 w-4" />
                Read Related Article
                <ExternalLink className="h-3 w-3 opacity-50" />
              </Link>
            ))}
            <Link
              href="/ai-architecture"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              <Layers className="h-4 w-4" />
              AI Architecture Hub
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              <Network className="h-4 w-4" />
              More Research Briefs
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

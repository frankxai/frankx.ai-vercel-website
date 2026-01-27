'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Network,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Link2,
  Calendar,
  Sparkles,
  MessageCircleQuestion,
  ChevronDown,
  BookOpen,
  Zap,
  Brain,
  Lightbulb,
  Copy,
  Check,
} from 'lucide-react'
import {
  getBriefBySlug,
  getFreshnessStatus,
  getConfidencePercentage,
  type FreshnessStatus,
  type ConfidenceLevel,
  type ResearchBrief,
  type ValidatedClaim,
} from '@/lib/research/validated-claims'

// Generate FAQPage schema for SEO/AEO
function generateFAQSchema(brief: ResearchBrief) {
  if (!brief.faqs || brief.faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': brief.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

// Generate Article schema
function generateArticleSchema(brief: ResearchBrief) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': brief.title,
    'description': brief.tldr || brief.description,
    'author': {
      '@type': 'Person',
      'name': 'Frank',
      'url': 'https://frankx.ai/about'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'FrankX',
      'url': 'https://frankx.ai'
    },
    'dateModified': brief.lastValidated,
    'mainEntityOfPage': `https://frankx.ai/research/briefs/${brief.slug}`
  };
}

// Build source index for numbered citations
function buildSourceIndex(claims: ValidatedClaim[]): Map<string, { index: number; source: { name: string; url?: string; date?: string } }> {
  const sourceMap = new Map<string, { index: number; source: { name: string; url?: string; date?: string } }>();
  let currentIndex = 1;

  claims.forEach(claim => {
    claim.sources.forEach(source => {
      const key = source.url || source.name;
      if (!sourceMap.has(key)) {
        sourceMap.set(key, { index: currentIndex++, source });
      }
    });
  });

  return sourceMap;
}

// Inline citation component (Perplexity-style numbered citations)
function InlineCitation({
  sourceIndex,
  source,
  onHover,
  onLeave,
}: {
  sourceIndex: number;
  source: { name: string; url?: string; date?: string };
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => onHover(sourceIndex)}
      onMouseLeave={onLeave}
    >
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-semibold
                     bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30
                     transition-all cursor-pointer ml-0.5 -translate-y-0.5"
        >
          {sourceIndex}
        </a>
      ) : (
        <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-semibold
                        bg-slate-500/20 text-slate-400 rounded-full ml-0.5 -translate-y-0.5">
          {sourceIndex}
        </span>
      )}
    </span>
  );
}

// Source preview tooltip
function SourcePreview({
  source,
  isVisible,
  position
}: {
  source: { name: string; url?: string; date?: string } | null;
  isVisible: boolean;
  position: { x: number; y: number };
}) {
  if (!source || !isVisible) return null;

  // Extract domain for favicon
  const domain = source.url ? new URL(source.url).hostname : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 w-72 rounded-xl border border-white/10 bg-slate-900/95
                     backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
          style={{
            left: Math.min(position.x, window.innerWidth - 300),
            top: position.y + 20
          }}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              {domain && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                    alt=""
                    width={16}
                    height={16}
                    className="opacity-80"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{source.name}</p>
                {source.date && (
                  <p className="text-xs text-slate-500 mt-0.5">{source.date}</p>
                )}
                {source.url && (
                  <p className="text-xs text-cyan-400/70 truncate mt-1">{domain}</p>
                )}
              </div>
            </div>
          </div>
          {source.url && (
            <div className="px-4 py-2.5 bg-cyan-500/5 border-t border-white/5">
              <span className="text-xs text-cyan-400 flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                Click citation to view source
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Freshness indicator component
function FreshnessBadge({ status }: { status: FreshnessStatus }) {
  const config = {
    current: {
      gradient: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      dotColor: 'bg-emerald-400',
      icon: ShieldCheck,
      label: 'Current',
    },
    aging: {
      gradient: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/30',
      textColor: 'text-amber-400',
      dotColor: 'bg-amber-400',
      icon: AlertTriangle,
      label: 'Aging',
    },
    stale: {
      gradient: 'from-red-500/20 to-red-500/5',
      border: 'border-red-500/30',
      textColor: 'text-red-400',
      dotColor: 'bg-red-400',
      icon: AlertCircle,
      label: 'Needs Review',
    },
  }

  const { gradient, border, textColor, dotColor, icon: Icon, label } = config[status]

  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient}
                     ${border} border px-3 py-1.5`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} animate-pulse`} />
      <Icon className={`h-3.5 w-3.5 ${textColor}`} />
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  )
}

// Confidence indicator with visual bar
function ConfidenceIndicator({ confidence }: { confidence: ConfidenceLevel }) {
  const percentage = getConfidencePercentage(confidence)
  const config = {
    high: { color: 'bg-emerald-500', glow: 'shadow-emerald-500/30', label: 'High Confidence' },
    'medium-high': { color: 'bg-cyan-500', glow: 'shadow-cyan-500/30', label: 'Medium-High' },
    medium: { color: 'bg-amber-500', glow: 'shadow-amber-500/30', label: 'Medium' },
    low: { color: 'bg-red-500', glow: 'shadow-red-500/30', label: 'Low' },
  }

  const { color, glow, label } = config[confidence]

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-24 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 ${color} rounded-full shadow-lg ${glow}`}
        />
      </div>
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-xs font-mono text-slate-500">{percentage}%</span>
    </div>
  )
}

// Claim card with inline citations
function ClaimCard({
  claim,
  sourceIndex,
  onSourceHover,
  onSourceLeave,
  delay = 0,
}: {
  claim: ValidatedClaim;
  sourceIndex: Map<string, { index: number; source: { name: string; url?: string; date?: string } }>;
  onSourceHover: (source: { name: string; url?: string; date?: string }, event: React.MouseEvent) => void;
  onSourceLeave: () => void;
  delay?: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${claim.claim}: ${claim.value}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br
                      from-white/[0.04] to-transparent p-6 transition-all duration-300
                      hover:border-cyan-500/20 hover:from-cyan-500/[0.02]">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 opacity-0
                     group-hover:opacity-100 transition-opacity hover:bg-white/10"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Value highlight */}
        <div className="mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-cyan-400
                           bg-clip-text text-transparent">
            {claim.value}
          </span>
        </div>

        {/* Claim text with inline citations */}
        <p className="text-slate-300 leading-relaxed mb-4">
          {claim.claim}
          {claim.sources.map((source, idx) => {
            const key = source.url || source.name;
            const sourceData = sourceIndex.get(key);
            if (!sourceData) return null;
            return (
              <InlineCitation
                key={idx}
                sourceIndex={sourceData.index}
                source={source}
                onHover={() => {}}
                onLeave={() => {}}
              />
            );
          })}
        </p>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
          <ConfidenceIndicator confidence={claim.confidence} />

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>{claim.validatedDate}</span>
          </div>

          {claim.crossRefCount > 1 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link2 className="w-3 h-3" />
              <span>{claim.crossRefCount} sources</span>
            </div>
          )}
        </div>

        {/* Source pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {claim.sources.map((source, idx) => {
            const key = source.url || source.name;
            const sourceData = sourceIndex.get(key);
            const domain = source.url ? new URL(source.url).hostname.replace('www.', '') : null;

            return (
              <div
                key={idx}
                className="group/source relative"
                onMouseEnter={(e) => onSourceHover(source, e)}
                onMouseLeave={onSourceLeave}
              >
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-cyan-500/5 border border-cyan-500/10 text-xs text-cyan-400
                               hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all"
                  >
                    {domain && (
                      <Image
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                        alt=""
                        width={12}
                        height={12}
                        className="opacity-70"
                      />
                    )}
                    <span className="truncate max-w-[150px]">{source.name}</span>
                    <span className="text-[10px] text-cyan-500/60">[{sourceData?.index}]</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                                   bg-slate-500/5 border border-slate-500/10 text-xs text-slate-400">
                    <BookOpen className="w-3 h-3" />
                    <span className="truncate max-w-[150px]">{source.name}</span>
                    <span className="text-[10px] text-slate-500/60">[{sourceData?.index}]</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// TL;DR Block - Premium design
function TLDRBlock({ tldr }: { tldr: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tldr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="relative"
    >
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background with gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-cyan-500/10 to-violet-500/20 rounded-2xl" />
        <div className="absolute inset-[1px] bg-[#0a0f1a] rounded-2xl" />

        {/* Content */}
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10">
                <Sparkles className="h-4 w-4 text-violet-400" />
              </div>
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
                TL;DR Summary
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

          <p className="text-lg text-white/90 leading-relaxed font-light">
            {tldr}
          </p>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              AI-optimized for citation by ChatGPT, Perplexity, and Claude
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Stats grid with visual flair
function StatsGrid({ claims, sourceCount, lastValidated }: {
  claims: ValidatedClaim[];
  sourceCount: number;
  lastValidated: string;
}) {
  const stats = [
    {
      label: 'Claims Validated',
      value: claims.length.toString(),
      icon: CheckCircle2,
      color: 'emerald',
    },
    {
      label: 'Sources Cited',
      value: sourceCount.toString(),
      icon: Link2,
      color: 'cyan',
    },
    {
      label: 'High Confidence',
      value: claims.filter(c => c.confidence === 'high').length.toString(),
      icon: ShieldCheck,
      color: 'violet',
    },
    {
      label: 'Last Validated',
      value: lastValidated.split('-').slice(1).join('/'),
      icon: Calendar,
      color: 'amber',
    },
  ];

  const colorMap = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
    violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color as keyof typeof colorMap];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className={`relative rounded-xl bg-gradient-to-br ${colors} border p-4 text-center`}
          >
            <Icon className={`w-5 h-5 mx-auto mb-2 ${colors.split(' ').pop()}`} />
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Implications section with numbered items
function ImplicationsSection({ implications }: { implications: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5">
          <Lightbulb className="h-5 w-5 text-violet-400" />
        </div>
        Key Implications
      </h2>

      <div className="space-y-3">
        {implications.map((implication, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.05 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]
                       hover:bg-white/[0.04] hover:border-violet-500/20 transition-all group"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full
                             bg-gradient-to-br from-violet-500/20 to-violet-500/5
                             text-violet-400 text-sm font-bold flex-shrink-0
                             group-hover:from-violet-500/30 transition-all">
              {i + 1}
            </span>
            <p className="text-slate-300 leading-relaxed">{implication}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// FAQ Accordion
function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5">
          <MessageCircleQuestion className="h-5 w-5 text-amber-400" />
        </div>
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left
                           hover:bg-white/[0.02] transition-colors"
              >
                <h3 className="text-white font-medium pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Sources reference panel (sidebar on desktop)
function SourcesPanel({
  sourceIndex,
  highlightedSource
}: {
  sourceIndex: Map<string, { index: number; source: { name: string; url?: string; date?: string } }>;
  highlightedSource: number | null;
}) {
  const sources = Array.from(sourceIndex.entries()).sort((a, b) => a[1].index - b[1].index);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="hidden xl:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Link2 className="w-4 h-4 text-cyan-400" />
          Sources ({sources.length})
        </h3>

        <div className="space-y-2">
          {sources.map(([key, { index, source }]) => {
            const domain = source.url ? new URL(source.url).hostname.replace('www.', '') : null;
            const isHighlighted = highlightedSource === index;

            return (
              <div
                key={key}
                className={`p-2 rounded-lg transition-all ${
                  isHighlighted
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold
                                   bg-cyan-500/20 text-cyan-400 rounded-full flex-shrink-0">
                    {index}
                  </span>
                  <div className="min-w-0 flex-1">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-300 hover:text-cyan-400 transition-colors
                                   line-clamp-2 block"
                      >
                        {source.name}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 line-clamp-2 block">
                        {source.name}
                      </span>
                    )}
                    {domain && (
                      <span className="text-[10px] text-slate-600 block mt-0.5">{domain}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Related content links
function RelatedContent({ relatedArticles }: { relatedArticles: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap gap-3"
    >
      {relatedArticles.map((article, i) => (
        <Link
          key={i}
          href={article}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10
                     bg-gradient-to-r from-white/[0.03] to-transparent px-5 py-2.5
                     text-sm font-medium text-white hover:border-cyan-500/30
                     hover:from-cyan-500/10 transition-all"
        >
          <FileText className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          Read Related Article
          <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
      <Link
        href="/ai-architecture"
        className="group inline-flex items-center gap-2 rounded-full border border-white/10
                   bg-gradient-to-r from-white/[0.03] to-transparent px-5 py-2.5
                   text-sm font-medium text-white hover:border-violet-500/30
                   hover:from-violet-500/10 transition-all"
      >
        <Brain className="h-4 w-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
        AI Architecture Hub
      </Link>
      <Link
        href="/research"
        className="group inline-flex items-center gap-2 rounded-full border border-white/10
                   bg-gradient-to-r from-white/[0.03] to-transparent px-5 py-2.5
                   text-sm font-medium text-white hover:border-emerald-500/30
                   hover:from-emerald-500/10 transition-all"
      >
        <Network className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
        More Research
      </Link>
    </motion.div>
  );
}

export default function ResearchBriefPage() {
  const params = useParams()
  const slug = params?.slug as string
  const brief = getBriefBySlug(slug)

  // Source preview state
  const [previewSource, setPreviewSource] = useState<{ name: string; url?: string; date?: string } | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [highlightedSourceIndex, setHighlightedSourceIndex] = useState<number | null>(null);

  const handleSourceHover = (source: { name: string; url?: string; date?: string }, event: React.MouseEvent) => {
    setPreviewSource(source);
    setPreviewPosition({ x: event.clientX, y: event.clientY });
  };

  const handleSourceLeave = () => {
    setPreviewSource(null);
  };

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
  const sourceIndex = buildSourceIndex(brief.claims);

  // Generate schemas for SEO/AEO
  const faqSchema = generateFAQSchema(brief)
  const articleSchema = generateArticleSchema(brief)

  return (
    <>
      {/* Schema.org structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Source preview tooltip */}
      <SourcePreview
        source={previewSource}
        isVisible={!!previewSource}
        position={previewPosition}
      />

      <main className="min-h-screen bg-[#030712]">
        {/* Premium background */}
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-[#030712]" />
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.015]"
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
          <div className="mx-auto max-w-7xl px-6">
            <div className="xl:grid xl:grid-cols-[1fr_280px] xl:gap-12">
              {/* Main content */}
              <div className="max-w-4xl">
                {/* Back link */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 text-sm text-slate-400
                               hover:text-white transition-colors group"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
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
                    <span className="rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-500/5
                                     border border-cyan-500/20 px-4 py-1.5 text-xs font-bold
                                     uppercase tracking-wider text-cyan-400">
                      {brief.category}
                    </span>
                    <FreshnessBadge status={freshnessStatus} />
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {brief.title}
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    {brief.description}
                  </p>
                </motion.div>

                {/* TL;DR Block */}
                {brief.tldr && (
                  <div className="mb-10">
                    <TLDRBlock tldr={brief.tldr} />
                  </div>
                )}

                {/* Stats Grid */}
                <div className="mb-12">
                  <StatsGrid
                    claims={brief.claims}
                    sourceCount={brief.sourceCount}
                    lastValidated={brief.lastValidated}
                  />
                </div>

                {/* Validated Claims */}
                <div className="mb-12">
                  <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    Validated Claims
                    <span className="text-sm font-normal text-slate-500">
                      ({brief.claims.length} verified)
                    </span>
                  </h2>

                  <div className="space-y-4">
                    {brief.claims.map((claim, i) => (
                      <ClaimCard
                        key={claim.id}
                        claim={claim}
                        sourceIndex={sourceIndex}
                        onSourceHover={handleSourceHover}
                        onSourceLeave={handleSourceLeave}
                        delay={0.3 + i * 0.05}
                      />
                    ))}
                  </div>
                </div>

                {/* Implications */}
                <div className="mb-12">
                  <ImplicationsSection implications={brief.implications} />
                </div>

                {/* Methodology */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <div className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br
                                  from-cyan-500/[0.05] to-transparent p-6">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3
                                   flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Validation Methodology
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {brief.methodology}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Link2 className="h-3 w-3" />
                        {brief.sourceCount} sources validated
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3" />
                        Min. 2 cross-refs for High confidence
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        Updated {brief.lastValidated}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* FAQ Section */}
                {brief.faqs && brief.faqs.length > 0 && (
                  <div className="mb-12">
                    <FAQSection faqs={brief.faqs} />
                  </div>
                )}

                {/* Related Content */}
                <RelatedContent relatedArticles={brief.relatedArticles} />
              </div>

              {/* Sources sidebar */}
              <SourcesPanel
                sourceIndex={sourceIndex}
                highlightedSource={highlightedSourceIndex}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

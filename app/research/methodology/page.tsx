import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  FileText,
  GitBranch,
  Layers,
  Search,
  Shield,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react'
import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'

export const metadata: Metadata = {
  title: 'Research Methodology',
  description:
    'The working FrankX method for directed scans, specialist passes, evidence review, human decisions, source registration, and explicit limitations.',
  alternates: {
    canonical: 'https://www.frankx.ai/research/methodology',
  },
  openGraph: {
    title: 'Research Methodology | FrankX Research Hub',
    description: 'The working FrankX method for directed scans, specialist passes, evidence review, and human publication decisions.',
    type: 'article',
    url: 'https://www.frankx.ai/research/methodology',
  },
}

const totalSources = new Set(
  Object.values(domainSources).flat().map((source) => source.url),
).size
const sourcedDomainCount = researchDomains.filter(
  (domain) => (domainSources[domain.slug]?.length ?? 0) > 0,
).length
const pendingDomainCount = researchDomains.length - sourcedDomainCount
const sourceCountFor = (slug: string) => domainSources[slug]?.length ?? 0

const phases = [
  {
    number: '01',
    title: 'Signal Detection',
    icon: Search,
    duration: 'Continuous',
    description:
      'The intended intake combines directed manual searches, specialist-agent scans, academic papers, industry reports, vendor documentation, developer surveys, and regulatory sources.',
    details: [
      'Maintain a curated watchlist for the domains under active review',
      'Track relevant product launches, research releases, and regulatory updates',
      'Look for patterns across domains without treating correlation as proof',
      'Record contradictions between vendor claims and independent evidence',
    ],
  },
  {
    number: '02',
    title: 'Deep Analysis',
    icon: Brain,
    duration: '2-4 hours per domain',
    description:
      'For selected questions, specialist passes extract supported quantitative data, qualitative context, uncertainty, and possible implications.',
    details: [
      'Record a metric only when the cited source supports its scope and date',
      'Separate observed facts, source claims, and FrankX interpretation',
      'Identify methodology limitations in cited research',
      'Seek two independent sources for consequential claims; label single-source evidence plainly',
    ],
  },
  {
    number: '03',
    title: 'Validation & Rating',
    icon: ShieldCheck,
    duration: 'Per claim',
    description:
      'The target standard is to rate consequential quantitative claims by source quality, recency, and corroboration. Older briefs remain provisional until that review is complete.',
    details: [
      'Target high confidence: two or more independent, directly relevant sources',
      'Medium confidence: one authoritative source or a documented expert consensus',
      'Low confidence: vendor-sourced or weakly corroborated data — label it',
      'Exclude or rewrite claims whose scope, date, or provenance cannot be verified',
    ],
  },
  {
    number: '04',
    title: 'Publication & Schema',
    icon: FileText,
    duration: 'Per domain update',
    description:
      'Reviewed material is synthesized into readable briefs with registered sources, explicit limits, and structured metadata where the page content supports it.',
    details: [
      'Use TechArticle or FAQPage JSON-LD only when the visible page warrants it',
      'Use question-based headings when they help a reader navigate the evidence',
      'Link related domains without implying evidentiary support between them',
      'Update lastUpdated timestamps only when a human review actually occurs',
    ],
  },
]

const qualityPrinciples = [
  {
    icon: Target,
    title: 'Specificity Over Generality',
    description:
      'When a brief uses a statistic, pair it with its scope, source, and date. Unsupported precision is worse than a careful qualitative statement.',
  },
  {
    icon: GitBranch,
    title: 'Cross-Reference Everything',
    description:
      'Two independent sources are the target for high-confidence claims. Single-source evidence should be marked, not quietly upgraded.',
  },
  {
    icon: Shield,
    title: 'Vendor Skepticism',
    description:
      'Vendor-sourced metrics (funding, user counts) are treated as claims, not facts. We seek independent verification.',
  },
  {
    icon: Zap,
    title: 'Recency Matters',
    description:
      'AI moves fast, but newer is not automatically better. Use current sources for changing facts and foundational sources where they remain authoritative.',
  },
]

const sourceTypes = [
  { type: 'Industry Reports', examples: 'Gartner, McKinsey, Forrester, IDC', weight: 'High' },
  { type: 'Academic Research', examples: 'ArXiv, NeurIPS, ICML, ACL proceedings', weight: 'High' },
  { type: 'Developer Surveys', examples: 'JetBrains, Stack Overflow, GitHub Octoverse', weight: 'High' },
  { type: 'Regulatory Filings', examples: 'EU AI Act, FDA clearances, SEC filings', weight: 'High' },
  { type: 'Vendor Documentation', examples: 'Official docs, benchmarks, changelogs', weight: 'Medium' },
  { type: 'Press Coverage', examples: 'TechCrunch, The Information, Reuters', weight: 'Medium' },
  { type: 'Community Signals', examples: 'GitHub stars, HN discussions, Reddit threads', weight: 'Low — directional only' },
]

// JSON-LD structured data — safe because data is from our own static domain registry
const methodologyLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Research Methodology — FrankX Research Hub',
  description: `The working review method across ${researchDomains.length} domains and ${totalSources} registered source URLs.`,
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://www.frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://www.frankx.ai',
  },
  dateModified: '2026-07-30',
  mainEntityOfPage: 'https://www.frankx.ai/research/methodology',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://www.frankx.ai/research' },
      { '@type': 'ListItem', position: 3, name: 'Methodology', item: 'https://www.frankx.ai/research/methodology' },
    ],
  },
})

export default function MethodologyPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: methodologyLd }}
    />
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/3 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                Research Standards
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Research Methodology
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-3xl mb-8">
              This is the standard I want every research page to meet: a directed question,
              inspectable sources, separate specialist passes, explicit limitations, and a human
              publication decision. The registry currently spans {researchDomains.length} domains
              and {totalSources} unique source URLs; some older domains are still awaiting a
              complete source registry.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Active Domains', value: String(researchDomains.length) },
                { label: 'Domains With Sources', value: String(sourcedDomainCount) },
                { label: 'Registered Sources', value: String(totalSources) },
                { label: 'Pending Registries', value: String(pendingDomainCount) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                >
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Phase Process */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              4-Phase Research Process
            </h2>
            <p className="text-white/50 mb-8">
              The target workflow for new briefs, plus the standard older briefs are being
              brought up to.
            </p>

            <div className="space-y-6">
              {phases.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <div
                    key={phase.number}
                    className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
                  >
                    {/* Connector */}
                    {index < phases.length - 1 && (
                      <div className="absolute left-8 -bottom-6 w-px h-6 bg-white/[0.08]" />
                    )}

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                            Phase {phase.number}
                          </span>
                          <span className="text-xs text-white/65">{phase.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed mb-4">
                          {phase.description}
                        </p>
                        <ul className="space-y-2">
                          {phase.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500/50 flex-shrink-0 mt-0.5" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quality Principles */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Quality Principles
            </h2>
            <p className="text-white/50 mb-8">
              The standards that govern what gets published and how claims are presented.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {qualityPrinciples.map((principle) => {
                const Icon = principle.icon
                return (
                  <div
                    key={principle.title}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 mb-3" />
                    <h3 className="text-sm font-bold text-white mb-2">{principle.title}</h3>
                    <p className="text-xs text-white/65 leading-relaxed">{principle.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Source Types */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Source Hierarchy
            </h2>
            <p className="text-white/50 mb-8">
              Not all sources are weighted equally. Our evidence hierarchy prioritizes independent, primary research.
            </p>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_2fr_auto] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs font-semibold text-white/50 uppercase tracking-wider">
                <span>Source Type</span>
                <span>Examples</span>
                <span>Weight</span>
              </div>
              {sourceTypes.map((source, i) => (
                <div
                  key={source.type}
                  className={`grid grid-cols-[1fr_2fr_auto] gap-4 px-5 py-3.5 ${
                    i < sourceTypes.length - 1 ? 'border-b border-white/[0.04]' : ''
                  }`}
                >
                  <span className="text-sm font-medium text-white">{source.type}</span>
                  <span className="text-sm text-white/65">{source.examples}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full h-fit ${
                      source.weight === 'High'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : source.weight === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-white/[0.06] text-white/65'
                    }`}
                  >
                    {source.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domain Coverage */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Domain Coverage
            </h2>
            <p className="text-white/50 mb-8">
              {researchDomains.length} research domains at different stages of review. Counts below
              come from the source registry itself; an empty registry is labeled as pending.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {researchDomains.map((domain) => (
                <Link
                  key={domain.slug}
                  href={`/research/${domain.slug}`}
                  className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Layers className="w-4 h-4 text-white/60 flex-shrink-0" />
                    <span className="text-sm text-white truncate">{domain.title}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-white/65">
                      {sourceCountFor(domain.slug) > 0
                        ? `${sourceCountFor(domain.slug)} sources`
                        : 'Registry pending'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-3">
                Explore the Research
              </h2>
              <p className="text-sm text-white/50 mb-6 max-w-lg mx-auto">
                Each page shows its current source registry or states plainly when that registry
                is still pending.
              </p>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Browse All Domains
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}

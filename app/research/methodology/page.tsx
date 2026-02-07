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

export const metadata: Metadata = {
  title: 'Research Methodology | FrankX Research Hub',
  description:
    'How we validate claims, cross-reference sources, and maintain research quality across 20 domains and 180+ sources. Our 4-phase methodology ensures every insight is evidence-backed.',
  alternates: {
    canonical: 'https://frankx.ai/research/methodology',
  },
  openGraph: {
    title: 'Research Methodology | FrankX Research Hub',
    description: 'Our 4-phase research methodology: signal detection, deep analysis, validation, and publication.',
    type: 'article',
    url: 'https://frankx.ai/research/methodology',
  },
}

const totalSources = researchDomains.reduce((sum, d) => sum + d.sourceCount, 0)
const totalFindings = researchDomains.reduce((sum, d) => sum + d.keyFindings.length, 0)

const phases = [
  {
    number: '01',
    title: 'Signal Detection',
    icon: Search,
    duration: 'Continuous',
    description:
      'Automated and manual scanning of primary research sources including academic papers, industry reports (Gartner, McKinsey, Forrester), vendor documentation, developer surveys, and regulatory filings.',
    details: [
      'Monitor 50+ primary sources weekly across all domains',
      'Track funding rounds, product launches, and regulatory updates',
      'Identify emerging patterns through cross-domain signal correlation',
      'Flag contradictions between vendor claims and independent research',
    ],
  },
  {
    number: '02',
    title: 'Deep Analysis',
    icon: Brain,
    duration: '2-4 hours per domain',
    description:
      'Multi-agent deep dives into promising signals with systematic extraction of quantitative data, qualitative insights, and strategic implications.',
    details: [
      'Extract specific metrics: market size, adoption rates, performance benchmarks',
      'Map competitive landscapes with validated market share data',
      'Identify methodology limitations in cited research',
      'Cross-reference findings across minimum 2 independent sources',
    ],
  },
  {
    number: '03',
    title: 'Validation & Rating',
    icon: ShieldCheck,
    duration: 'Per claim',
    description:
      'Every quantitative claim receives a confidence rating based on source quality, recency, and cross-reference count. Claims below threshold are flagged or excluded.',
    details: [
      'High confidence: 2+ independent primary sources, recent data (< 6 months)',
      'Medium confidence: Single authoritative source or industry consensus',
      'Low confidence: Vendor-sourced data without independent verification — flagged',
      'Excluded: Unverifiable claims, outdated data (> 12 months), single-source vendor marketing',
    ],
  },
  {
    number: '04',
    title: 'Publication & Schema',
    icon: FileText,
    duration: 'Per domain update',
    description:
      'Synthesis into structured research briefs with TL;DR summaries, FAQ sections, JSON-LD schema markup, and SEO-optimized content for both human readers and AI citation engines.',
    details: [
      'TechArticle + FAQPage JSON-LD for search engine and AI citation optimization',
      'Question-based section headers for Answer Engine Optimization (AEO)',
      'Internal cross-linking between related domains',
      'Continuous refresh cycle with lastUpdated timestamps',
    ],
  },
]

const qualityPrinciples = [
  {
    icon: Target,
    title: 'Specificity Over Generality',
    description:
      'We cite exact numbers — "$29.3B valuation" not "large valuation." Every statistic includes its source and date.',
  },
  {
    icon: GitBranch,
    title: 'Cross-Reference Everything',
    description:
      'High-confidence claims require 2+ independent sources. Single-source claims are marked as such.',
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
      'AI moves fast. Data older than 12 months is flagged. We prioritize 2026 sources over 2025 where available.',
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
  description: `How we validate claims, cross-reference sources, and maintain research quality across ${researchDomains.length} domains and ${totalSources}+ sources.`,
  author: {
    '@type': 'Person',
    name: 'Frank van den Bergh',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  dateModified: '2026-02-06',
  mainEntityOfPage: 'https://frankx.ai/research/methodology',
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
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
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
              Every claim in this research hub is backed by evidence. This page explains how we
              detect signals, analyze data, validate findings, and publish research across{' '}
              {researchDomains.length} domains with {totalSources}+ sources.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Active Domains', value: String(researchDomains.length) },
                { label: 'Total Sources', value: `${totalSources}+` },
                { label: 'Validated Findings', value: `${totalFindings}+` },
                { label: 'Refresh Cadence', value: 'Weekly' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                >
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
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
              From raw signal to published intelligence — how every research brief is created.
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
                          <span className="text-xs text-white/30">{phase.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed mb-4">
                          {phase.description}
                        </p>
                        <ul className="space-y-2">
                          {phase.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/40">
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
                    <p className="text-xs text-white/40 leading-relaxed">{principle.description}</p>
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
                  <span className="text-sm text-white/40">{source.examples}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full h-fit ${
                      source.weight === 'High'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : source.weight === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-white/[0.06] text-white/40'
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
              {researchDomains.length} active research domains, each maintained with regular source
              validation and data refresh cycles.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {researchDomains.map((domain) => (
                <Link
                  key={domain.slug}
                  href={`/research/${domain.slug}`}
                  className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Layers className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <span className="text-sm text-white truncate">{domain.title}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] text-white/30">{domain.sourceCount} sources</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
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
                Dive into any of our {researchDomains.length} research domains. Every finding is
                cross-referenced and regularly updated.
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

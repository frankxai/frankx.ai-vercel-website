'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Heart,
  Brain,
  Smartphone,
  Activity,
  Users,
  Sparkles,
  AlertTriangle,
  Clock,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { validatedClaims } from '@/lib/research/validated-claims'

// Key stats for mental health
const keyStats = [
  {
    label: 'Depression Reduction',
    value: '34%',
    source: 'NEJM AI RCT',
    description: 'AI-powered CBT platforms reduce symptoms vs 20% control',
  },
  {
    label: 'Episode Prediction',
    value: '91%',
    source: 'PMC Study',
    description: 'AI predicts depressive episodes using wearable data',
  },
  {
    label: 'User Growth',
    value: '652M',
    source: 'UT Health',
    description: 'Projected digital therapeutics users by 2025',
  },
  {
    label: 'Anxiety Reduction',
    value: '29%',
    source: 'NEJM AI',
    description: 'Symptom improvement in AI therapy trials',
  },
]

// Treatment categories
const treatmentCategories = [
  {
    icon: Smartphone,
    title: 'AI Therapy Apps',
    description: 'Conversational AI delivering CBT, DBT, and other evidence-based therapies',
    effectiveness: 'High evidence',
    examples: ['Woebot', 'Wysa', 'Youper'],
    keyFinding: '34% depression symptom reduction in RCTs',
    color: 'cyan',
  },
  {
    icon: Activity,
    title: 'Predictive Monitoring',
    description: 'AI analyzing wearable data to predict mental health episodes before they occur',
    effectiveness: 'Emerging',
    examples: ['Apple Watch integration', 'Oura Ring', 'Custom ML models'],
    keyFinding: '91% accuracy predicting depressive episodes',
    color: 'violet',
  },
  {
    icon: Brain,
    title: 'Neurofeedback',
    description: 'Real-time brainwave training to modulate neural activity patterns',
    effectiveness: 'Level 1 for ADHD',
    examples: ['SMR protocols', 'TBR protocols', 'Alpha training'],
    keyFinding: 'Rated "Efficacious and Specific" for ADHD',
    color: 'emerald',
  },
  {
    icon: Zap,
    title: 'Brain Stimulation',
    description: 'Non-invasive techniques like tDCS and TMS for targeted neural modulation',
    effectiveness: 'FDA-cleared',
    examples: ['TMS for depression', 'tDCS research', 'Deep TMS'],
    keyFinding: 'FDA-cleared for treatment-resistant depression',
    color: 'amber',
  },
]

// What works vs what doesn't
const evidenceTable = [
  {
    intervention: 'AI-powered CBT apps',
    evidence: 'Strong (RCTs)',
    forConditions: 'Depression, Anxiety, Insomnia',
    notes: 'Best as supplement to human therapy',
  },
  {
    intervention: 'Neurofeedback (SMR/TBR)',
    evidence: 'Strong for ADHD',
    forConditions: 'ADHD, potentially anxiety',
    notes: 'Level 1 efficacious rating',
  },
  {
    intervention: 'Mood tracking + AI analysis',
    evidence: 'Moderate',
    forConditions: 'Mood disorders',
    notes: 'Useful for pattern recognition',
  },
  {
    intervention: 'Generic meditation apps',
    evidence: 'Mixed',
    forConditions: 'General wellness',
    notes: 'Limited clinical evidence for disorders',
  },
  {
    intervention: 'Consumer brain training',
    evidence: 'Weak',
    forConditions: 'Cognitive decline',
    notes: 'Limited transfer to real-world function',
  },
]

// Timeline
const timeline = [
  {
    year: '2024',
    milestone: 'AI therapy apps reach clinical validation',
    details: 'First large-scale RCTs published in NEJM AI',
  },
  {
    year: '2025',
    milestone: 'Predictive mental health becomes practical',
    details: 'Wearable-based prediction achieves 91% accuracy',
  },
  {
    year: '2026',
    milestone: 'AI-human hybrid care emerges',
    details: 'AI handles routine check-ins, humans handle complex cases',
  },
  {
    year: '2027-2028',
    milestone: 'BCIs for depression treatment',
    details: 'Closed-loop stimulation reaches clinical trials',
  },
]

export default function MentalHealthHubPage() {
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
        {/* Purple gradient for mental health theme */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/research" className="hover:text-white transition-colors">Research</Link>
              <span>/</span>
              <Link href="/research" className="hover:text-white transition-colors">Applications</Link>
              <span>/</span>
              <span className="text-white">Mental Health</span>
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-500/30">
                <Heart className="h-8 w-8 text-violet-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  AI for Mental Health
                </h1>
                <p className="text-slate-400">What actually works, according to research</p>
              </div>
            </div>

            {/* TL;DR */}
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.04] p-6">
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                TL;DR
              </h3>
              <p className="text-white leading-relaxed">
                AI therapy shows real clinical benefit: 34% depression reduction in randomized trials, 91% accuracy
                predicting episodes from wearables. Neurofeedback is now Level 1 efficacious for ADHD. The catch: AI
                works best as a supplement to human care, not a replacement. Digital therapeutics projected to reach
                652 million users by 2025.
              </p>
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {keyStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-cyan-400 mb-2">{stat.label}</p>
                <p className="text-xs text-slate-500">{stat.description}</p>
                <p className="text-[10px] text-slate-600 mt-2">Source: {stat.source}</p>
              </div>
            ))}
          </motion.div>

          {/* Treatment Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="h-5 w-5 text-cyan-400" />
              Treatment Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {treatmentCategories.map((cat, i) => {
                const Icon = cat.icon
                const colorMap = {
                  cyan: 'border-cyan-500/20 from-cyan-500/10 text-cyan-400',
                  violet: 'border-violet-500/20 from-violet-500/10 text-violet-400',
                  emerald: 'border-emerald-500/20 from-emerald-500/10 text-emerald-400',
                  amber: 'border-amber-500/20 from-amber-500/10 text-amber-400',
                }
                const colors = colorMap[cat.color as keyof typeof colorMap]
                return (
                  <div
                    key={i}
                    className={`rounded-xl border bg-gradient-to-br to-transparent p-5 ${colors.split(' ').slice(0, 2).join(' ')}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className={`h-6 w-6 ${colors.split(' ').slice(-1)[0]}`} />
                      <div>
                        <h3 className="font-semibold text-white">{cat.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 ${colors.split(' ').slice(-1)[0]}`}>
                          {cat.effectiveness}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cat.examples.map((ex, j) => (
                        <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400">
                          {ex}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {cat.keyFinding}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Evidence Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              What the Evidence Says
            </h2>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Intervention</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">For</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceTable.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.05] last:border-0">
                      <td className="px-4 py-3 text-sm text-white">{row.intervention}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          row.evidence.includes('Strong') ? 'bg-emerald-500/15 text-emerald-400' :
                          row.evidence.includes('Moderate') ? 'bg-cyan-500/15 text-cyan-400' :
                          row.evidence.includes('Mixed') ? 'bg-amber-500/15 text-amber-400' :
                          'bg-red-500/15 text-red-400'
                        }`}>
                          {row.evidence}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">{row.forConditions}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 hidden lg:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-violet-400" />
              What&apos;s Coming
            </h2>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{item.year}</span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-violet-500/30 to-transparent my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-white mb-1">{item.milestone}</h3>
                    <p className="text-sm text-slate-400">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Caveats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
          >
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Important Caveats
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  AI tools work best as <strong className="text-white">supplements</strong> to human therapy, not replacements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Severe depression, suicidal ideation, and psychosis require professional human care
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Most consumer &quot;brain training&quot; apps lack clinical evidence for treating disorders
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Individual response varies significantly - what works for others may not work for you
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Related Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/blog/ai-mental-health-what-works-2026"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              Read Full Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/research/briefs/ai-neuroscience-2026"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              AI + Neuroscience Brief
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <Link
              href="/research/claims"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              Browse All Claims
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

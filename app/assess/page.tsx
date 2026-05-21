'use client'

import { useState, useEffect, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Wrench,
  GraduationCap,
  Rocket,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Loader2,
  Sparkles,
  Target,
  BarChart3,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

// ── Types ──

type Category = 'strategy' | 'tools' | 'skills' | 'implementation'

interface Question {
  id: number
  category: Category
  text: string
  options: { label: string; score: number }[]
}

interface AssessmentResults {
  total: number
  maxTotal: number
  percentage: number
  categories: Record<Category, { score: number; max: number; percentage: number }>
  level: Level
  completedAt: string
}

interface Level {
  name: string
  range: string
  description: string
  color: string
}

// ── Constants ──

const STORAGE_KEY = 'frankx-ai-assessment'

const categoryMeta: Record<Category, { label: string; icon: typeof Brain; color: string; glowColor: 'violet' | 'cyan' | 'emerald' | 'amber' }> = {
  strategy: { label: 'Strategy', icon: Brain, color: 'text-violet-400', glowColor: 'violet' },
  tools: { label: 'Tools', icon: Wrench, color: 'text-cyan-400', glowColor: 'cyan' },
  skills: { label: 'Skills', icon: GraduationCap, color: 'text-emerald-400', glowColor: 'emerald' },
  implementation: { label: 'Implementation', icon: Rocket, color: 'text-amber-400', glowColor: 'amber' },
}

const categoryColors: Record<Category, string> = {
  strategy: 'bg-violet-500',
  tools: 'bg-cyan-500',
  skills: 'bg-emerald-500',
  implementation: 'bg-amber-500',
}

const categoryBorderColors: Record<Category, string> = {
  strategy: 'border-violet-500/30',
  tools: 'border-cyan-500/30',
  skills: 'border-emerald-500/30',
  implementation: 'border-amber-500/30',
}

const levels: Level[] = [
  { name: 'Explorer', range: '0-25%', description: "You're at the beginning of your AI journey", color: 'text-blue-400' },
  { name: 'Builder', range: '26-50%', description: 'You have solid foundations to build on', color: 'text-emerald-400' },
  { name: 'Architect', range: '51-75%', description: "You're building sophisticated AI systems", color: 'text-violet-400' },
  { name: 'Visionary', range: '76-100%', description: "You're pushing the boundaries of what's possible", color: 'text-amber-400' },
]

const questions: Question[] = [
  // ── Strategy (4) ──
  {
    id: 1,
    category: 'strategy',
    text: 'How does your organization approach AI adoption?',
    options: [
      { label: 'We are just beginning to explore what AI can do', score: 1 },
      { label: 'We have identified specific use cases and are running pilots', score: 2 },
      { label: 'AI is integrated into several core workflows with executive sponsorship', score: 3 },
      { label: 'AI is a strategic priority embedded across the organization with dedicated leadership', score: 4 },
    ],
  },
  {
    id: 2,
    category: 'strategy',
    text: 'Do you have an AI governance framework in place?',
    options: [
      { label: 'We have not yet considered AI governance', score: 1 },
      { label: 'We have informal guidelines for AI usage', score: 2 },
      { label: 'We have documented policies covering ethics, data privacy, and responsible use', score: 3 },
      { label: 'We have a comprehensive governance program with regular audits, bias monitoring, and compliance reviews', score: 4 },
    ],
  },
  {
    id: 3,
    category: 'strategy',
    text: 'How do you allocate budget and resources for AI initiatives?',
    options: [
      { label: 'AI spending is ad-hoc, typically individual subscriptions', score: 1 },
      { label: 'We have a small dedicated budget for AI experimentation', score: 2 },
      { label: 'AI has a defined line item with cross-functional investment planning', score: 3 },
      { label: 'AI has substantial dedicated funding with multi-year roadmaps and ROI tracking', score: 4 },
    ],
  },
  {
    id: 4,
    category: 'strategy',
    text: 'How well-defined is your data strategy for AI?',
    options: [
      { label: 'Our data is scattered across systems with limited documentation', score: 1 },
      { label: 'We have identified key data sources and begun consolidation efforts', score: 2 },
      { label: 'We maintain structured data pipelines with quality controls and clear ownership', score: 3 },
      { label: 'We have a mature data platform with real-time pipelines, versioning, and ML-ready feature stores', score: 4 },
    ],
  },

  // ── Tools (4) ──
  {
    id: 5,
    category: 'tools',
    text: 'Which AI tools are part of your daily workflow?',
    options: [
      { label: 'General-purpose assistants like ChatGPT or Claude for occasional questions', score: 1 },
      { label: 'Specialized AI tools for writing, coding, or design integrated into daily work', score: 2 },
      { label: 'Multiple AI platforms orchestrated together with custom configurations', score: 3 },
      { label: 'Custom AI agents, fine-tuned models, and enterprise platforms with API integrations', score: 4 },
    ],
  },
  {
    id: 6,
    category: 'tools',
    text: 'How do you evaluate and adopt new AI tools?',
    options: [
      { label: 'Individuals discover and try tools on their own', score: 1 },
      { label: 'We have informal recommendations shared within the team', score: 2 },
      { label: 'We run structured evaluations comparing capabilities, security, and cost', score: 3 },
      { label: 'We have a formal evaluation framework with proof-of-concept requirements, security reviews, and integration standards', score: 4 },
    ],
  },
  {
    id: 7,
    category: 'tools',
    text: 'How do you handle AI tool integration with existing systems?',
    options: [
      { label: 'AI tools are standalone, used separately from our core systems', score: 1 },
      { label: 'We use basic integrations like browser extensions or copy-paste workflows', score: 2 },
      { label: 'AI tools connect to our systems via APIs with some automation', score: 3 },
      { label: 'AI is deeply integrated into our tech stack with event-driven pipelines and orchestration layers', score: 4 },
    ],
  },
  {
    id: 8,
    category: 'tools',
    text: 'What is your approach to AI-assisted code and content generation?',
    options: [
      { label: 'We occasionally use AI for brainstorming or drafting', score: 1 },
      { label: 'AI copilots are available and used regularly for code completion or writing', score: 2 },
      { label: 'AI generation is embedded in our pipelines with human review gates', score: 3 },
      { label: 'We have custom generation workflows with fine-tuned models, quality scoring, and automated publishing', score: 4 },
    ],
  },

  // ── Skills (4) ──
  {
    id: 9,
    category: 'skills',
    text: 'How proficient are you at writing effective AI prompts?',
    options: [
      { label: 'I write simple, direct prompts and accept the first output', score: 1 },
      { label: 'I use structured prompts with context, examples, and constraints', score: 2 },
      { label: 'I design prompt chains, system prompts, and use techniques like few-shot and chain-of-thought', score: 3 },
      { label: 'I build reusable prompt libraries, test prompt variations systematically, and optimize for specific model behaviors', score: 4 },
    ],
  },
  {
    id: 10,
    category: 'skills',
    text: 'Do you understand AI agent architectures and multi-agent systems?',
    options: [
      { label: 'I am still learning what AI agents are', score: 1 },
      { label: 'I understand the basics of agent loops, tool use, and retrieval-augmented generation', score: 2 },
      { label: 'I can design multi-step agent workflows with memory, planning, and tool orchestration', score: 3 },
      { label: 'I build production agent systems with human-in-the-loop controls, observability, and multi-agent coordination', score: 4 },
    ],
  },
  {
    id: 11,
    category: 'skills',
    text: 'How do you approach AI model evaluation and selection?',
    options: [
      { label: 'I use whichever model is most popular or recommended', score: 1 },
      { label: 'I compare models based on benchmarks and reviews', score: 2 },
      { label: 'I run structured evaluations with domain-specific test cases and latency/cost analysis', score: 3 },
      { label: 'I maintain evaluation harnesses, run A/B tests in production, and track model performance over time', score: 4 },
    ],
  },
  {
    id: 12,
    category: 'skills',
    text: 'What is your team\'s AI literacy and training approach?',
    options: [
      { label: 'Most team members have basic awareness of AI capabilities', score: 1 },
      { label: 'Key team members have completed AI courses or certifications', score: 2 },
      { label: 'We run regular internal workshops and have an AI champions program', score: 3 },
      { label: 'We have a structured AI academy with role-specific learning paths, hands-on labs, and certification tracks', score: 4 },
    ],
  },

  // ── Implementation (3) ──
  {
    id: 13,
    category: 'implementation',
    text: 'Have you deployed AI-powered features in production?',
    options: [
      { label: 'We are still in the exploration and learning phase', score: 1 },
      { label: 'We have one or two AI features in production as experiments', score: 2 },
      { label: 'Multiple AI-driven features are live with monitoring and feedback loops', score: 3 },
      { label: 'AI is a core part of our product with sophisticated MLOps, CI/CD for models, and continuous retraining', score: 4 },
    ],
  },
  {
    id: 14,
    category: 'implementation',
    text: 'How do you measure the return on your AI investments?',
    options: [
      { label: 'We have not yet measured AI ROI', score: 1 },
      { label: 'We track basic metrics like time saved or tasks completed', score: 2 },
      { label: 'We measure business outcomes tied to AI initiatives with before/after comparisons', score: 3 },
      { label: 'We have comprehensive dashboards tracking AI impact on revenue, efficiency, quality, and customer satisfaction', score: 4 },
    ],
  },
  {
    id: 15,
    category: 'implementation',
    text: 'How do you handle AI reliability, monitoring, and incident response?',
    options: [
      { label: 'We rely on the AI provider\'s uptime and do not actively monitor', score: 1 },
      { label: 'We have basic error handling and manual fallback procedures', score: 2 },
      { label: 'We monitor AI outputs for quality, have alerting, and documented escalation paths', score: 3 },
      { label: 'We run full observability with drift detection, automated fallbacks, SLAs, and post-incident reviews', score: 4 },
    ],
  },
]

// ── Recommendations ──

const recommendations: Record<Category, { title: string; description: string; href: string }[]> = {
  strategy: [
    { title: 'AI Architecture Fundamentals', description: 'Learn how to structure AI initiatives for maximum organizational impact', href: '/research' },
    { title: 'Building an AI Governance Framework', description: 'Practical steps to responsible AI adoption at scale', href: '/blog' },
    { title: 'Data Strategy for AI', description: 'From scattered data to ML-ready pipelines', href: '/research' },
  ],
  tools: [
    { title: 'The Modern AI Stack', description: 'Tools and platforms that leading teams use in 2026', href: '/research' },
    { title: 'AI Tool Evaluation Framework', description: 'A structured approach to selecting the right AI tools', href: '/blog' },
    { title: 'Integration Patterns for AI', description: 'Connect AI tools into your existing tech stack', href: '/research' },
  ],
  skills: [
    { title: 'Prompt Engineering Mastery', description: 'From basic prompts to production-grade prompt systems', href: '/blog' },
    { title: 'Agent Architecture Review', description: 'Design multi-agent systems that actually work', href: '/research' },
    { title: 'AI Skills Development Path', description: 'A structured roadmap for building AI proficiency', href: '/coaching' },
  ],
  implementation: [
    { title: 'Production AI Playbook', description: 'Ship AI features with confidence and reliability', href: '/research' },
    { title: 'Measuring AI ROI', description: 'Frameworks for quantifying the impact of AI investments', href: '/blog' },
    { title: 'AI Ops and Observability', description: 'Monitor, debug, and improve AI systems in production', href: '/research' },
  ],
}

// ── Utilities ──

function getLevel(percentage: number): Level {
  if (percentage <= 25) return levels[0]
  if (percentage <= 50) return levels[1]
  if (percentage <= 75) return levels[2]
  return levels[3]
}

function calculateResults(answers: Record<number, number>): AssessmentResults {
  const categoryScores: Record<Category, { score: number; max: number }> = {
    strategy: { score: 0, max: 0 },
    tools: { score: 0, max: 0 },
    skills: { score: 0, max: 0 },
    implementation: { score: 0, max: 0 },
  }

  for (const q of questions) {
    const answer = answers[q.id] ?? 0
    categoryScores[q.category].score += answer
    categoryScores[q.category].max += 4
  }

  const total = Object.values(categoryScores).reduce((sum, c) => sum + c.score, 0)
  const maxTotal = Object.values(categoryScores).reduce((sum, c) => sum + c.max, 0)
  const percentage = Math.round((total / maxTotal) * 100)

  const categories = Object.fromEntries(
    Object.entries(categoryScores).map(([key, val]) => [
      key,
      { score: val.score, max: val.max, percentage: Math.round((val.score / val.max) * 100) },
    ]),
  ) as Record<Category, { score: number; max: number; percentage: number }>

  return {
    total,
    maxTotal,
    percentage,
    categories,
    level: getLevel(percentage),
    completedAt: new Date().toISOString(),
  }
}

function getWeakestCategories(results: AssessmentResults): Category[] {
  return (Object.entries(results.categories) as [Category, { percentage: number }][])
    .sort((a, b) => a[1].percentage - b[1].percentage)
    .slice(0, 2)
    .map(([cat]) => cat)
}

// ── Components ──

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-white/50">
          Question {current} of {total}
        </span>
        <span className="text-white/50">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function CategoryBadge({ category }: { category: Category }) {
  const meta = categoryMeta[category]
  const Icon = meta.icon
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border ${categoryBorderColors[category]} bg-white/[0.03] px-3 py-1 text-xs font-medium ${meta.color}`}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </div>
  )
}

function CategoryBar({ category, percentage }: { category: Category; percentage: number }) {
  const meta = categoryMeta[category]
  const Icon = meta.icon
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${meta.color}`} />
          <span className="text-sm font-medium text-white/80">{meta.label}</span>
        </div>
        <span className={`text-sm font-semibold ${meta.color}`}>{percentage}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${categoryColors[category]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * value)
      setDisplay(start)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>{display}</span>
}

// ── Email Gate ──

function EmailGate({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listType: 'assessment' }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Report unlocked.')
        onUnlock()
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <GlowCard color="violet" className="p-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
            <Mail className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Get Your Full Report</h3>
            <p className="text-sm text-white/50">Detailed recommendations and action plan</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet-500/50 focus:bg-white/[0.06]"
          />
          <PremiumButton
            type="submit"
            variant="primary"
            size="md"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Unlock
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </PremiumButton>
        </form>
        {message && (
          <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
            {message}
          </p>
        )}
      </div>
    </GlowCard>
  )
}

// ── Detail Report (unlocked after email) ──

function DetailReport({ results }: { results: AssessmentResults }) {
  const weakest = getWeakestCategories(results)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-white">Your Detailed Action Plan</h3>
      {weakest.map((cat) => {
        const meta = categoryMeta[cat]
        const Icon = meta.icon
        const catResults = results.categories[cat]
        const recs = recommendations[cat]

        return (
          <GlowCard key={cat} color={meta.glowColor} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${meta.color}`} />
                  <span className="font-semibold text-white">{meta.label}</span>
                </div>
                <span className={`text-sm font-medium ${meta.color}`}>{catResults.percentage}%</span>
              </div>
              <p className="text-sm text-white/60">
                {catResults.percentage <= 25
                  ? `Your ${meta.label.toLowerCase()} foundation is ready to grow. Focus here for the highest immediate impact.`
                  : catResults.percentage <= 50
                    ? `You have a working base in ${meta.label.toLowerCase()}. Targeted improvements will accelerate your progress.`
                    : `Your ${meta.label.toLowerCase()} is developing well. These resources will help you reach the next level.`}
              </p>
              <div className="space-y-2">
                {recs.map((rec) => (
                  <a
                    key={rec.title}
                    href={rec.href}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.06]"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{rec.title}</div>
                      <div className="text-xs text-white/40">{rec.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/30" />
                  </a>
                ))}
              </div>
            </div>
          </GlowCard>
        )
      })}
    </motion.div>
  )
}

// ── Main Assessment Page ──

type Phase = 'intro' | 'questions' | 'results'

export default function AssessPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [copied, setCopied] = useState(false)
  const [reportUnlocked, setReportUnlocked] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  // Load saved results on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as AssessmentResults
        setResults(parsed)
        setPhase('results')
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length

  const handleAnswer = useCallback(
    (score: number) => {
      const newAnswers = { ...answers, [currentQuestion.id]: score }
      setAnswers(newAnswers)
      setDirection(1)

      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => setCurrentIndex(currentIndex + 1), 150)
      } else {
        const computed = calculateResults(newAnswers)
        setResults(computed)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(computed))
        } catch {
          // Storage full, continue
        }
        setTimeout(() => setPhase('results'), 200)
      }
    },
    [answers, currentIndex, currentQuestion, totalQuestions],
  )

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  const handleRetake = useCallback(() => {
    setAnswers({})
    setResults(null)
    setCurrentIndex(0)
    setReportUnlocked(false)
    setPhase('intro')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
  }, [])

  const handleShare = useCallback(() => {
    if (!results) return
    const text = `I scored ${results.percentage}% on the FrankX AI Readiness Assessment — rated "${results.level.name}" level. Take yours at frankx.ai/assess`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [results])

  // Get top 3 personalized recommendations based on weakest categories
  const getRecommendations = useCallback(() => {
    if (!results) return []
    const weakest = getWeakestCategories(results)
    const recs: { title: string; description: string; href: string; category: Category }[] = []
    for (const cat of weakest) {
      recs.push({ ...recommendations[cat][0], category: cat })
    }
    // Add one from strongest for reinforcement
    const strongest = (Object.entries(results.categories) as [Category, { percentage: number }][])
      .sort((a, b) => b[1].percentage - a[1].percentage)[0][0]
    recs.push({ ...recommendations[strongest][1], category: strongest })
    return recs.slice(0, 3)
  }, [results])

  // ── Render: Intro ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white">
        <main className="px-6 pt-28 pb-20">
          <div className="mx-auto max-w-2xl space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
                <Target className="h-4 w-4" />
                AI Readiness Assessment
              </div>
              <h1 className="text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  How AI-Ready Are You?
                </span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
                15 questions. 4 dimensions. A clear picture of where you stand and where to go next.
                Takes about 3 minutes.
              </p>
            </motion.div>

            {/* Category preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {(Object.entries(categoryMeta) as [Category, typeof categoryMeta.strategy][]).map(
                ([key, meta]) => {
                  const Icon = meta.icon
                  const count = questions.filter((q) => q.category === key).length
                  return (
                    <GlowCard key={key} color={meta.glowColor} className="p-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]`}>
                          <Icon className={`h-4 w-4 ${meta.color}`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{meta.label}</div>
                          <div className="text-xs text-white/40">{count} questions</div>
                        </div>
                      </div>
                    </GlowCard>
                  )
                },
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <PremiumButton
                variant="primary"
                size="lg"
                glow
                onClick={() => setPhase('questions')}
              >
                Start Assessment
                <ArrowRight className="h-5 w-5" />
              </PremiumButton>
            </motion.div>

            {/* What you get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3"
            >
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                What you will receive
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Overall AI readiness score and maturity level',
                  'Category-by-category breakdown with visual analysis',
                  'Personalized recommendations linking to relevant resources',
                  'Shareable results to compare with your team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  // ── Render: Questions ──
  if (phase === 'questions') {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white">
        <main className="px-6 pt-28 pb-20">
          <div className="mx-auto max-w-2xl space-y-8">
            <ProgressBar current={currentIndex + 1} total={totalQuestions} />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <CategoryBadge category={currentQuestion.category} />
                  <h2 className="text-2xl font-semibold text-white leading-snug">
                    {currentQuestion.text}
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = answers[currentQuestion.id] === option.score
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => handleAnswer(option.score)}
                        className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 ${
                          isSelected
                            ? 'border-violet-500/50 bg-violet-500/10'
                            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                              isSelected
                                ? 'border-violet-400 bg-violet-500/20 text-violet-300'
                                : 'border-white/20 text-white/40'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`text-sm leading-relaxed ${isSelected ? 'text-white' : 'text-white/70'}`}>
                            {option.label}
                          </span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70 disabled:opacity-30 disabled:hover:text-white/40"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-xs text-white/30">
                {categoryMeta[currentQuestion.category].label} /{' '}
                {currentIndex + 1} of {totalQuestions}
              </span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ── Render: Results ──
  if (phase === 'results' && results) {
    const topRecs = getRecommendations()

    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white">
        <main className="px-6 pt-28 pb-20">
          <div className="mx-auto max-w-3xl space-y-10">
            {/* Score Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/50">
                <Sparkles className="h-3.5 w-3.5" />
                Assessment Complete
              </div>

              <div className="space-y-2">
                <div className="text-7xl font-bold md:text-8xl">
                  <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    <AnimatedScore value={results.percentage} />%
                  </span>
                </div>
                <div className={`text-2xl font-semibold ${results.level.color}`}>
                  {results.level.name}
                </div>
                <p className="text-white/50 max-w-md mx-auto">
                  {results.level.description}
                </p>
              </div>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <GlowCard color="white" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-white/50" />
                    <h3 className="text-lg font-semibold text-white">Category Breakdown</h3>
                  </div>
                  <div className="space-y-5">
                    {(Object.keys(categoryMeta) as Category[]).map((cat) => (
                      <CategoryBar
                        key={cat}
                        category={cat}
                        percentage={results.categories[cat].percentage}
                      />
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">Recommended Next Steps</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {topRecs.map((rec) => {
                  const meta = categoryMeta[rec.category]
                  return (
                    <GlowCard key={rec.title} color={meta.glowColor} href={rec.href} className="p-5">
                      <div className="space-y-2">
                        <CategoryBadge category={rec.category} />
                        <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{rec.description}</p>
                      </div>
                    </GlowCard>
                  )
                })}
              </div>
            </motion.div>

            {/* Email Gate or Detailed Report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {reportUnlocked ? (
                <DetailReport results={results} />
              ) : (
                <EmailGate onUnlock={() => setReportUnlocked(true)} />
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <PremiumButton
                variant="ghost"
                size="md"
                onClick={handleShare}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Share Your Score
                  </>
                )}
              </PremiumButton>

              <button
                onClick={handleRetake}
                className="text-sm text-white/40 transition-colors hover:text-white/70"
              >
                Retake Assessment
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  return null
}

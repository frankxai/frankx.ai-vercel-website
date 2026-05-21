'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, Share2, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import PremiumButton from '@/components/ui/PremiumButton'

// ── Assessment Data ──

const dimensions = [
  {
    id: 'prompt',
    name: 'Prompt Sophistication',
    question: 'How do you typically interact with AI tools?',
    options: [
      { label: 'Simple one-line questions, copy-paste results', score: 1 },
      { label: 'Structured prompts with context and examples', score: 2 },
      { label: 'System prompts, templates, and prompt libraries', score: 3 },
      { label: 'Agent personas, multi-step chains, custom skills', score: 4 },
      { label: 'Self-improving prompt systems with measured quality', score: 5 },
    ],
  },
  {
    id: 'tools',
    name: 'Tool Breadth',
    question: 'How many AI tools do you actively use?',
    options: [
      { label: 'One tool (usually ChatGPT), occasionally', score: 1 },
      { label: '2-3 tools, regular use in specific areas', score: 2 },
      { label: '3-5 tools selected by use case (coding, writing, images)', score: 3 },
      { label: '5+ tools with automation connecting them', score: 4 },
      { label: 'Integrated ecosystem with orchestration layer', score: 5 },
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow Integration',
    question: 'How is AI embedded in your daily work?',
    options: [
      { label: 'Manual copy-paste between AI and my work', score: 1 },
      { label: 'Some saved prompts and bookmarked chats', score: 2 },
      { label: 'AI is part of daily workflows with saved templates', score: 3 },
      { label: 'Cross-tool workflows, persistent memory, automation', score: 4 },
      { label: 'Autonomous agents running on schedules without my input', score: 5 },
    ],
  },
  {
    id: 'knowledge',
    name: 'Knowledge Management',
    question: 'Do your AI interactions build on each other?',
    options: [
      { label: 'Every conversation starts from scratch', score: 1 },
      { label: 'I save good outputs but don\'t organize them', score: 2 },
      { label: 'Organized prompt library with 20+ templates', score: 3 },
      { label: 'Persistent memory across sessions, knowledge graphs', score: 4 },
      { label: 'Self-updating knowledge base that learns from every session', score: 5 },
    ],
  },
  {
    id: 'quality',
    name: 'Output Quality',
    question: 'What quality level does your AI-assisted work achieve?',
    options: [
      { label: 'Raw AI output, used as-is or lightly edited', score: 1 },
      { label: 'AI drafts, I edit significantly before using', score: 2 },
      { label: 'AI output requires minor edits, follows my style', score: 3 },
      { label: 'AI output is publication-ready with my voice and standards', score: 4 },
      { label: 'AI output is indistinguishable from my best manual work', score: 5 },
    ],
  },
  {
    id: 'domains',
    name: 'Domain Coverage',
    question: 'How many areas of your life benefit from AI?',
    options: [
      { label: 'One area (usually work or coding)', score: 1 },
      { label: '2 areas (e.g., work + content creation)', score: 2 },
      { label: '3-4 areas (adding research, productivity, creative)', score: 3 },
      { label: '5-6 areas (adding health, finance, personal ops)', score: 4 },
      { label: 'All 7 CoE domains with interconnected systems', score: 5 },
    ],
  },
  {
    id: 'roi',
    name: 'Time ROI',
    question: 'How much time does AI save you weekly?',
    options: [
      { label: 'Hard to tell — maybe a few minutes here and there', score: 1 },
      { label: '1-3 hours per week on specific tasks', score: 2 },
      { label: '3-7 hours per week with clear time savings', score: 3 },
      { label: '10-15 hours per week, measurably tracked', score: 4 },
      { label: '15+ hours with compound gains I can quantify', score: 5 },
    ],
  },
]

const levels = [
  { level: 1, name: 'Exploring', range: [7, 11], color: 'text-slate-400', description: 'You\'re at the beginning of your AI journey. Occasional use, mostly basic prompts. The opportunity ahead is enormous.' },
  { level: 2, name: 'Experimenting', range: [12, 17], color: 'text-blue-400', description: 'You use AI regularly in 1-2 areas and you\'re starting to see patterns. You\'re ahead of most people — and ready to systematize.' },
  { level: 3, name: 'Integrating', range: [18, 24], color: 'text-emerald-400', description: 'AI is embedded in your daily workflows. You have a prompt library and use multiple tools by use case. You\'re in the top 20% of AI practitioners.' },
  { level: 4, name: 'Orchestrating', range: [25, 30], color: 'text-amber-400', description: 'Multi-tool systems with automation. Persistent memory. Cross-domain workflows. You\'re operating at a level that most enterprise AI teams aspire to reach.' },
  { level: 5, name: 'Compounding', range: [31, 35], color: 'text-violet-400', description: 'Self-improving systems with measurable ROI. Your AI infrastructure gets better without manual intervention. You\'re in the top 2% globally.' },
]

function getLevel(score: number) {
  return levels.find(l => score >= l.range[0] && score <= l.range[1]) || levels[0]
}

// ── Component ──

export default function AICoEAssessment() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const result = getLevel(totalScore)
  const progress = ((currentQ) / dimensions.length) * 100

  function selectAnswer(dimensionId: string, score: number) {
    setAnswers(prev => ({ ...prev, [dimensionId]: score }))
    if (currentQ < dimensions.length - 1) {
      setTimeout(() => setCurrentQ(prev => prev + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  function copyResults() {
    const text = `My AI CoE Maturity Level: ${result.level} — ${result.name} (${totalScore}/35)\n\n${dimensions.map(d => `${d.name}: ${answers[d.id] || 0}/5`).join('\n')}\n\nTake the assessment: frankx.ai/assess/ai-coe`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (showResults) {
    return (
      <main className="min-h-screen bg-[#0a0a0b] pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/70 mb-3">Your AI CoE Maturity</p>
            <div className={`text-7xl font-bold mb-2 ${result.color}`}>Level {result.level}</div>
            <div className={`text-2xl font-semibold mb-4 ${result.color}`}>{result.name}</div>
            <p className="text-white/50 text-sm max-w-lg mx-auto">{result.description}</p>
            <div className="mt-4 text-white/30 text-sm">Score: {totalScore}/35</div>
          </motion.div>

          {/* Dimension Scores */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-3 mb-12">
            {dimensions.map((d, i) => {
              const score = answers[d.id] || 0
              return (
                <div key={d.id} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="text-xs text-white/30 w-4">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">{d.name}</div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / 5) * 100}%` }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className={`h-full rounded-full ${score >= 4 ? 'bg-amber-400' : score >= 3 ? 'bg-emerald-400' : score >= 2 ? 'bg-blue-400' : 'bg-slate-500'}`}
                      />
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${score >= 4 ? 'text-amber-400' : score >= 3 ? 'text-emerald-400' : score >= 2 ? 'text-blue-400' : 'text-white/30'}`}>
                    {score}/5
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Growth Recommendation */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/60 mb-2">Your Biggest Growth Lever</p>
            {(() => {
              const lowest = dimensions.reduce((min, d) => (answers[d.id] || 0) < (answers[min.id] || 0) ? d : min, dimensions[0])
              return (
                <p className="text-sm text-white/70">
                  <span className="text-amber-400 font-medium">{lowest.name}</span> is your lowest dimension at {answers[lowest.id] || 0}/5.
                  Improving this one dimension will have the highest compound effect across your entire AI system.
                </p>
              )
            })()}
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col sm:flex-row gap-3">
            <PremiumButton variant="luxury" size="lg" href="/research/personal-ai-coe" className="flex-1">
              <Sparkles className="h-4 w-4" />
              Build Your AI CoE
              <ArrowRight className="h-4 w-4" />
            </PremiumButton>
            <button
              onClick={copyResults}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 text-sm hover:bg-white/[0.06] transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Share your score'}
            </button>
            <button
              onClick={() => { setShowResults(false); setCurrentQ(0); setAnswers({}) }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white/30 text-sm hover:text-white/50 transition-all"
            >
              Retake
            </button>
          </motion.div>

          {/* Cross-links */}
          <div className="mt-16 pt-8 border-t border-white/5 grid sm:grid-cols-2 gap-4">
            <Link href="/prompt-library" className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/10 transition-all">
              <p className="text-xs text-amber-400/60 mb-1">Prompt Library</p>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">74 production-grade prompts including 8 AI CoE templates</p>
            </Link>
            <Link href="/blog/why-everyone-needs-personal-ai-coe" className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/10 transition-all">
              <p className="text-xs text-amber-400/60 mb-1">Read the Article</p>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Why Everyone Needs Their Own AI Center of Excellence</p>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const dim = dimensions[currentQ]

  return (
    <main className="min-h-screen bg-[#0a0a0b] pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/70 mb-3">
            AI Center of Excellence
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            What&apos;s your AI maturity level?
          </h1>
          <p className="text-sm text-white/40">7 questions. 2 minutes. Honest assessment.</p>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-white/[0.06] mb-10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-amber-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="text-xs text-white/20">{currentQ + 1}/{dimensions.length}</span>
              <span className="text-xs text-amber-400/60">{dim.name}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">{dim.question}</h2>

            <div className="space-y-3">
              {dim.options.map((opt) => (
                <button
                  key={opt.score}
                  onClick={() => selectAnswer(dim.id, opt.score)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    answers[dim.id] === opt.score
                      ? 'border-amber-500/40 bg-amber-500/10 text-white'
                      : 'border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/10 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      answers[dim.id] === opt.score ? 'bg-amber-500/30 text-amber-300' : 'bg-white/[0.06] text-white/30'
                    }`}>
                      {opt.score}
                    </div>
                    <span className="text-sm">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
            disabled={currentQ === 0}
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 disabled:opacity-0 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          {currentQ === dimensions.length - 1 && answers[dim.id] !== undefined && (
            <PremiumButton variant="luxury" size="md" onClick={() => setShowResults(true)}>
              See your level
              <ArrowRight className="h-4 w-4" />
            </PremiumButton>
          )}
        </div>
      </div>
    </main>
  )
}

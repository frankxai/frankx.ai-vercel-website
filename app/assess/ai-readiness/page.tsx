'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  title: string
  subtitle: string
  options: { label: string; score: number; description: string }[]
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'architecture',
    title: '1. What is your current AI Agent Architecture?',
    subtitle: 'Select the tier that best matches your codebase state.',
    options: [
      { label: 'Single Prompt / Chat UI', score: 25, description: 'Using Web UI or single ChatGPT/Claude instances manually.' },
      { label: 'Basic Script / API Wrappers', score: 50, description: 'Running Python/Node scripts with basic OpenAI/Anthropic API calls.' },
      { label: 'Structured Multi-Agent Swarm', score: 75, description: 'Using Claude SDK, LangGraph, or custom agent orchestrator with tools.' },
      { label: 'Sovereign ACOS System', score: 100, description: 'A2A protocol, AgentDB memory, ReasoningBank, and zero-headcount loops.' },
    ],
  },
  {
    id: 'memory',
    title: '2. How do your agents manage state and memory?',
    subtitle: 'Persistence determines intelligence longevity.',
    options: [
      { label: 'Stateless / Fresh Session Every Time', score: 20, description: 'No persistent context retained across sessions.' },
      { label: 'Simple Text Files / Markdown Memory', score: 50, description: 'Appends to local markdown or context memory files.' },
      { label: 'Vector Database / RAG Pipeline', score: 80, description: 'Pinecone, Qdrant, or AgentDB vector similarity search.' },
      { label: 'Hierarchical Memory & Reinforcement', score: 100, description: 'Short-term memory + long-term vault + self-learning trajectory.' },
    ],
  },
  {
    id: 'quality_gate',
    title: '3. How do you prevent AI-Slop and ensure quality?',
    subtitle: 'Verification loops before public publishing.',
    options: [
      { label: 'Manual Copy-Paste Review', score: 30, description: 'Human manually checks and cleans every single output.' },
      { label: 'Basic System Prompt Instructions', score: 60, description: 'Negative rules in system prompt (e.g. avoid "delve", "unlock").' },
      { label: 'Adversarial Review Subagent (Santa Method)', score: 90, description: 'Independent reviewer agent critiques and passes/fails drafts.' },
      { label: 'Automated 5-Gate Integrity Guard', score: 100, description: 'Brand voice, claim audit, schema validation, and conversion gate.' },
    ],
  },
  {
    id: 'velocity',
    title: '4. What is your weekly content & system output velocity?',
    subtitle: 'Measuring leverage and automation efficiency.',
    options: [
      { label: '1-2 pieces per week (High effort)', score: 30, description: 'Significant manual creation hours required.' },
      { label: '3-5 pieces per week (Semi-automated)', score: 60, description: 'AI assists draft generation, human formats and posts.' },
      { label: '10+ multi-format assets weekly', score: 85, description: 'Blog, newsletter, X threads, and code updates generated.' },
      { label: 'Continuous Autonomous Pipeline', score: 100, description: 'Multi-channel distribution running 24/7 with human oversight.' },
    ],
  },
]

export default function AIReadinessQuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [resultData, setResultData] = useState<{ score: number; level: string; pdfUrl: string } | null>(null)

  const handleSelectOption = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate total score
      const total = Object.values(newAnswers).reduce((acc, curr) => acc + curr, 0)
      const avgScore = Math.round(total / QUIZ_QUESTIONS.length)
      
      let level = 'Emerging AI Explorer'
      if (avgScore >= 85) level = 'Master Sovereign AI Architect'
      else if (avgScore >= 65) level = 'Advanced Multi-Agent Systems Engineer'
      else if (avgScore >= 45) level = 'Practicing AI Creator'

      setResultData({
        score: avgScore,
        level,
        pdfUrl: '/downloads/pdfs/FrankX-Agent-Swarm-Blueprint-2026.pdf',
      })
      setCurrentStep(QUIZ_QUESTIONS.length) // Move to lead capture step
    }
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/v1/lead-ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          leadMagnetId: 'ai-agent-stack-primer',
          icp: 'Human AI Architect / Founder',
          variantId: 'A',
          source: 'quiz_funnel',
          quizResult: resultData,
        }),
      })

      if (res.ok) {
        setCompleted(true)
      }
    } catch (err) {
      console.error('Quiz lead submission failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercent = Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href="/"
            aria-label="Back to home"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 hover:border-amber-500/40 transition-colors mb-6"
          >
            <span>← FrankX AI Sovereign Hub</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            AI Agentic System Readiness Diagnostic
          </h1>
          <p className="mt-3 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            Evaluate your AI architecture across 4 core dimensions and get a personalized score + technical blueprint package.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 rounded-full h-2.5 mb-10 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quiz Steps */}
        {currentStep < QUIZ_QUESTIONS.length && (
          <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {QUIZ_QUESTIONS[currentStep].title}
            </h2>
            <p className="text-sm text-neutral-400 mb-8">
              {QUIZ_QUESTIONS[currentStep].subtitle}
            </p>

            <div className="space-y-4">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.score)}
                  className="w-full text-left p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/[0.05] transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {opt.description}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20 shrink-0 self-start sm:self-auto">
                    +{opt.score} pts
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Lead Capture with Calculated Score */}
        {currentStep === QUIZ_QUESTIONS.length && !completed && resultData && (
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold mb-4">
              Diagnostic Complete
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Your Score: <span className="text-amber-400">{resultData.score}/100</span>
            </h2>
            <div className="text-lg font-medium text-neutral-300 mb-6">
              Architecture Level: <span className="text-white font-bold">{resultData.level}</span>
            </div>

            <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-8">
              Enter your email to unlock your full diagnostic breakdown + download the <strong>Autonomous AI Agent Swarm Architecture Blueprint (PDF)</strong> and Notion template.
            </p>

            <form onSubmit={handleSubmitLead} className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your primary email address..."
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? 'Generating Report & Unlocking...' : 'Unlock Custom Report & Download Blueprint'}
              </button>
            </form>

            <div className="mt-4 text-xs text-neutral-500">
              Instant PDF download + Notion link sent immediately. No spam ever.
            </div>
          </div>
        )}

        {/* Step: Final Unlocked Download Confirmation */}
        {completed && resultData && (
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl text-center">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 text-2xl">
              ✓
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Report Unlocked & Access Granted!
            </h2>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8">
              We have dispatched your custom <strong>{resultData.level}</strong> analysis to <strong>{email}</strong>. You can also download your materials directly below:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={resultData.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors text-sm"
              >
                Download PDF Blueprint
              </a>
              <a
                href="https://frankx.notion.site/FrankX-Agent-Architecture-Hub"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-colors text-sm"
              >
                Open Notion Workspace
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

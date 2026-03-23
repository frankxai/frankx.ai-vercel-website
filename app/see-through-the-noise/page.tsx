'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

type RiskVerdict = 'low' | 'guarded' | 'high' | 'critical'
type SignalSeverity = 'low' | 'medium' | 'high'
type ConfidenceLevel = 'low' | 'medium' | 'high'

interface AnalysisResponse {
  analysisId: string
  analyzedAt: string
  source: {
    mode: 'url' | 'text'
    url?: string
    domain?: string
    title?: string
    status?: number
    contentType?: string
  }
  context: {
    sourceType: string
    userContext: string | null
  }
  input: {
    characters: number
    sentences: number
    words: number
  }
  result: {
    riskScore: number
    verdict: RiskVerdict
    confidence: ConfidenceLevel
    summary: string
  }
  signals: Array<{
    id: string
    label: string
    severity: SignalSeverity
    scoreImpact: number
    evidence: string[]
    description: string
  }>
  claims: Array<{
    text: string
    confidence: ConfidenceLevel
    rationale: string
  }>
  recommendations: string[]
  limitations: string[]
  model: string
}

const verdictClasses: Record<RiskVerdict, string> = {
  low: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
  guarded: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
  high: 'border-orange-400/30 bg-orange-500/10 text-orange-300',
  critical: 'border-red-400/30 bg-red-500/10 text-red-300',
}

const severityClasses: Record<SignalSeverity, string> = {
  low: 'border-cyan-400/25 bg-cyan-500/10 text-cyan-300',
  medium: 'border-amber-400/25 bg-amber-500/10 text-amber-300',
  high: 'border-red-400/25 bg-red-500/10 text-red-300',
}

const sampleText =
  'BREAKING: They do not want you to know this hidden truth. Experts say a secret agenda is already happening and this will impact everyone. Share this everywhere before it gets deleted.'

export default function SeeThroughTheNoisePage() {
  const [sourceUrl, setSourceUrl] = useState('')
  const [content, setContent] = useState('')
  const [sourceType, setSourceType] = useState<'article' | 'post' | 'video' | 'chat' | 'other'>('post')
  const [context, setContext] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<AnalysisResponse | null>(null)

  const hasInput = useMemo(() => sourceUrl.trim().length > 0 || content.trim().length > 0, [sourceUrl, content])

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!hasInput) {
      setError('Add a URL or paste content before running analysis.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await fetch('/api/misinformation/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: sourceUrl.trim() || undefined,
          content: content.trim() || undefined,
          sourceType,
          context: context.trim() || undefined,
        }),
      })

      const payload = (await result.json()) as AnalysisResponse | { error?: string }

      if (!result.ok) {
        const errorPayload = payload as { error?: string }
        setResponse(null)
        setError(errorPayload.error || 'Analysis failed.')
        return
      }

      setResponse(payload as AnalysisResponse)
    } catch {
      setResponse(null)
      setError('Network error while contacting the guardian API.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06111c] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.16),transparent_44%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_55%_85%,rgba(245,158,11,0.14),transparent_46%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            See Through The Noise
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Misinformation Guardian
            <span className="block bg-gradient-to-r from-cyan-200 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
              Live Risk Analysis + Production Blueprint
            </span>
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-300 md:text-lg">
            Analyze posts, articles, or transcripts in real time, surface manipulation signals, and trace the architecture for deploying this safely at scale.
          </p>
          <p className="mt-3 text-sm text-cyan-200/90">
            Flagship trust layer, powered by <span className="font-semibold text-cyan-100">RealityDiffusion.ai</span>.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.form
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          onSubmit={handleAnalyze}
          className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 backdrop-blur-xl md:p-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Run Live Analysis</h2>
            <p className="text-xs text-slate-400">Rule engine + explainable scoring</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Source URL (optional)</label>
              <input
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder="https://example.com/article"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-300/60"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-slate-300">Content to Analyze</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={8}
                placeholder="Paste post text, transcript excerpt, or article body..."
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-300/60"
              />
              <button
                type="button"
                onClick={() => setContent(sampleText)}
                className="mt-2 text-xs text-cyan-300 transition hover:text-cyan-200"
              >
                Load sample text
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">Source Type</label>
                <select
                  value={sourceType}
                  onChange={(event) => setSourceType(event.target.value as typeof sourceType)}
                  className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-300/60"
                >
                  <option value="post">Social post</option>
                  <option value="article">Article</option>
                  <option value="video">Video transcript</option>
                  <option value="chat">Chat thread</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">Context (optional)</label>
                <input
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  placeholder="Election, health topic, finance..."
                  className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-300/60"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !hasInput}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/35 bg-cyan-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Radar className="h-4 w-4" />
            {isSubmitting ? 'Analyzing...' : 'Analyze With Guardian'}
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Decision-support tool only. Always validate with primary evidence.
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl md:p-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Guardian Output</h2>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>

          {!response && (
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-sm text-slate-300">
              Run an analysis to see real-time risk scoring, evidence signals, claim extraction, and verification guidance.
            </div>
          )}

          {response && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${verdictClasses[response.result.verdict]}`}>
                    {response.result.verdict} risk
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    Confidence: {response.result.confidence}
                  </span>
                </div>
                <p className="mt-3 text-4xl font-semibold text-white">{response.result.riskScore}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Risk score / 100</p>
                <p className="mt-3 text-sm text-slate-300">{response.result.summary}</p>
                {response.source.domain && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-cyan-200">
                    <Globe className="h-3.5 w-3.5" />
                    Source: {response.source.domain}
                  </p>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">Top Signals</h3>
                <div className="space-y-2.5">
                  {response.signals.slice(0, 4).map((signal) => (
                    <div key={signal.id} className="rounded-xl border border-white/10 bg-slate-950/55 p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-100">{signal.label}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${severityClasses[signal.severity]}`}>
                          {signal.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{signal.description}</p>
                      {signal.evidence.length > 0 && (
                        <p className="mt-1.5 text-xs text-slate-300">
                          Evidence: {signal.evidence.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3.5">
                  <h4 className="text-sm font-semibold text-white">Extracted Claims</h4>
                  <p className="mt-1 text-xs text-slate-300">{response.claims[0]?.text || 'No claims extracted.'}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3.5">
                  <h4 className="text-sm font-semibold text-white">Next Action</h4>
                  <p className="mt-1 text-xs text-slate-300">{response.recommendations[0]}</p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Engine: {response.model} • {response.input.words} words analyzed • {new Date(response.analyzedAt).toLocaleString()}
              </p>
            </div>
          )}
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-slate-900/65 p-7 backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-white">Production Blueprint</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/35 bg-cyan-500/12 px-3 py-1 text-xs uppercase tracking-[0.15em] text-cyan-200">
              <Workflow className="h-3.5 w-3.5" />
              XYFlow Ready
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            The full architecture is now mapped as an AI Architecture Blueprint with staged rollout, guardrails, and observability for safe production deployment.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm font-semibold text-white">1) Ingest + Normalize</p>
              <p className="mt-1 text-xs text-slate-300">URL/Text intake, extraction, and policy-safe preprocessing.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm font-semibold text-white">2) Multi-Signal Verification</p>
              <p className="mt-1 text-xs text-slate-300">Heuristic checks, source credibility, claim extraction, and risk fusion.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm font-semibold text-white">3) Explain + Route</p>
              <p className="mt-1 text-xs text-slate-300">Explainable verdicts, escalation flows, human review, and audit trails.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blueprint/misinformation-guardian-platform"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              Open Interactive Blueprint
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ai-architecture/blueprints"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View All Blueprints
              <BookOpen className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-5">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              Built for deployment
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Includes phased rollout, evaluation gates, incident playbooks, and model-risk controls.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-5">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              Guardrail reminder
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Misinformation classification should always include human escalation paths for high-impact domains.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

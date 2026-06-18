import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Download, ExternalLink, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Health Intelligence System Download | FrankX.AI',
  description:
    'Download the Health Intelligence System excellence pack for cancer screening prep, treatment discussion prep, second opinions, and survivorship records.',
}

const repoUrl = 'https://github.com/frankxai/health-intelligence-system'
const releaseUrl = 'https://github.com/frankxai/health-intelligence-system/releases/tag/v0.1.1'
const zipUrl =
  'https://github.com/frankxai/health-intelligence-system/releases/download/v0.1.1/health-intelligence-system-v0.1.1.zip'
const starlightUrl = 'https://starlightintelligence.org/verticals/health-intelligence'

const included = [
  'SIP-aligned Health Intelligence System file contract',
  'Cancer detection prep and treatment discussion module',
  'Screening, diagnostic, treatment, second-opinion, and follow-up command specs',
  'Clinician summary, evidence ledger, side-effect log, and follow-up templates',
  'Safety, privacy, validation, release, and clinical/legal review gate docs',
  'Release manifest with checksums',
]

const steps = [
  'Read SAFETY.md first and keep this as appointment preparation, not medical advice.',
  'Pick one workflow: screening, abnormal result, treatment board prep, second opinion, or follow-up.',
  'Copy the matching template into a private workspace outside public git history.',
  'Add source dates and questions for the care team.',
  'Run VALIDATION.md before sharing an artifact.',
]

export default function HealthIntelligenceDownloadPage() {
  return (
    <div className="min-h-screen bg-[#080b0a] text-white">
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <Link
          href="/downloads"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to downloads
        </Link>

        <section className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Preclinical public prerelease
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Health Intelligence System
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              A guided excellence pack for cancer screening prep, abnormal-result organization,
              treatment discussion packets, second opinions, and survivorship records. It helps
              people prepare for care conversations without pretending to be medical care.
            </p>

            <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-7 text-amber-100/90">
              This package is not medical advice and does not diagnose, interpret results, or
              recommend treatment. It remains a prerelease until the clinical/legal review gate is
              passed in the GitHub repo.
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={zipUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 transition-colors hover:bg-emerald-200"
              >
                <Download className="h-4 w-4" />
                Download ZIP
              </a>
              <a
                href={releaseUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
              >
                GitHub Release
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={starlightUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 px-6 py-3 font-semibold text-emerald-200 transition-colors hover:bg-emerald-400/10"
              >
                Starlight validation
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-emerald-950/20">
            <h2 className="text-xl font-semibold">What is inside</h2>
            <ul className="mt-5 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Canonical source</p>
              <a href={repoUrl} className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100">
                frankxai/health-intelligence-system
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-5">
          {steps.map((step, index) => (
            <article key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-mono text-xs text-emerald-300">{String(index + 1).padStart(2, '0')}</div>
              <p className="mt-4 text-sm leading-6 text-white/70">{step}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

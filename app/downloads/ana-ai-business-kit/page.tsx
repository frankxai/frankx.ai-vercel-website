import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  FileCheck2,
  FolderLock,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { anaInstallCommands, anaLinks } from '@/data/ana-collaboration'

export const metadata: Metadata = {
  title: 'Start Ana HR Operations | FrankX',
  description:
    "A plain-language start page for Ana's current HR Operations workflow: first call, kickoff, role brief, offer, recruiting, invoice, and approved handoff.",
  robots: { index: false, follow: true, nocache: true },
}

const currentVersion = '1.1.0'
const legacyZipUrl = '/downloads/ana-ai-business-kit-v0.1.0.zip'
const legacyChecksumUrl = '/downloads/ana-ai-business-kit-v0.1.0.sha256'

const stages = [
  'Daily multi-client control',
  'First client call',
  'Approved kickoff',
  'Role brief and job description',
  'Service offer and pricing approval',
  'Recruiting delivery and weekly status',
  'Invoice draft and reconciliation',
  'Approved client handoff',
] as const

export default function AnaAIBusinessKitDownloadPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/[0.55] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <Link href="/downloads" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-4 py-2 text-xs font-semibold text-ana-cream/60 transition hover:border-white/30 hover:text-ana-cream">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All downloads
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Current HR workflow · v{currentVersion}
              </div>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                Start with the workflow, not GitHub.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
                Ana and her team do not need to become developers. Ana HR Operations guides one engagement at a time, asks for missing facts, prepares drafts, and stops for the right human approval.
              </p>
              <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
                Empieza con un cliente, una copia del documento y una decisión clara. El sistema explica el siguiente paso.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href={anaLinks.kitStart} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                  Open Ana's start guide
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={anaLinks.kitTeamStart} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Open the team start
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href="/allies/ana-cancino" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream">
                  See the team plan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What Ana needs</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">Four simple ingredients.</h2>
                </div>
                <FolderLock className="h-8 w-8 text-ana-gold" aria-hidden="true" />
              </div>
              <ol className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {[
                  ['01', 'Codex in the ChatGPT desktop app or CLI'],
                  ['02', 'Ana HR Operations installed'],
                  ['03', 'Google Drive connected when the final template matters'],
                  ['04', 'Private, company-approved storage for live records'],
                ].map(([number, item]) => (
                  <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                    <span className="font-mono text-xs text-ana-gold">{number}</span>
                    <span className="text-sm leading-6 text-ana-cream/[0.66]">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs leading-5 text-ana-cream/[0.42]">A GitHub account is optional unless Ana wants her own fork and change history.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Five-minute setup</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Frank can install it with the team.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">The commands add Frank's maintained plugin source, install Ana HR Operations, and confirm that Codex can see it.</p>
            <a href={anaLinks.kitRepo} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">
              Inspect the maintained repository
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-ana-obsidian shadow-[0_28px_100px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.42]">PowerShell, Terminal, or Codex CLI</p>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1 text-[10px] font-semibold text-emerald-100/75">No local clone required</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-8 text-ana-cream sm:p-7">
              <code>{anaInstallCommands.join('\n')}</code>
            </pre>
            <div className="border-t border-white/10 bg-white/[0.025] px-5 py-4 text-xs leading-5 text-ana-cream/[0.45] sm:px-7">
              Start a new Codex task after installation, then select Ana HR Operations from the plugin list.
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What the current system handles</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">The same path Ana already uses, made teachable.</h2>
          </div>

          <ol className="mt-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.18] sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <li key={stage} className={`min-h-32 p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0 sm:[&:nth-child(odd)]:border-l-0 lg:[&:nth-child(odd)]:border-l lg:[&:nth-child(4n+1)]:border-l-0' : ''} ${index > 1 ? 'sm:border-t' : ''} ${index > 3 ? 'lg:border-t' : ''}`}>
                <span className="font-mono text-xs text-ana-gold">{String(index).padStart(2, '0')}</span>
                <p className="mt-4 text-sm font-semibold leading-6 text-ana-cream/75">{stage}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-[2rem] border border-ana-gold/20 bg-ana-gold/[0.06] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">First team prompt</p>
                <h3 className="mt-3 text-2xl font-semibold">Let the system guide the conversation one section at a time.</h3>
              </div>
              <blockquote className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-ana-cream/[0.66]">
                Use Ana HR Operations. I have a new recruiting client. Set up a private engagement record outside the repository and guide me through the first-call capture one section at a time. Separate facts from assumptions. Do not send, schedule, price, or invoice anything without my explicit approval.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(221,184,127,0.11),rgba(255,255,255,0.025),rgba(25,87,66,0.11))] lg:grid-cols-[0.86fr_1.14fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 text-ana-gold">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">The important boundary</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The plugin prepares. Ana approves.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">It does not rank candidates, invent prices, edit master templates, create payments, or send documents automatically.</p>
          </div>

          <div className="grid border-t border-white/10 bg-black/[0.18] sm:grid-cols-2 lg:border-l lg:border-t-0">
            {[
              'Live client and candidate records stay outside GitHub',
              'Google Docs masters are copied, never edited',
              'Job requirements use consistent, job-relevant evidence',
              'Price, invoice, and send approval are separate gates',
            ].map((item, index) => (
              <div key={item} className={`flex items-start gap-3 p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0 sm:[&:nth-child(odd)]:border-l-0' : ''} ${index > 1 ? 'sm:border-t' : ''}`}>
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200/80" aria-hidden="true" />
                <p className="text-sm leading-6 text-ana-cream/[0.58]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16 lg:px-12">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-ana-gold" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Earlier archive</p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold">The v0.1 starter ZIP remains available for reference.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-ana-cream/50">It contains the earlier reflective-practice documents and named agent briefs. It is not the recommended HR Operations workflow for the team.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={legacyZipUrl} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.13] px-4 py-2 text-sm font-semibold text-ana-cream/[0.58] transition hover:border-white/30 hover:text-ana-cream">
                Download legacy ZIP
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={legacyChecksumUrl} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.13] px-4 py-2 text-sm font-semibold text-ana-cream/[0.58] transition hover:border-white/30 hover:text-ana-cream">
                Checksum
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/allies/ana-cancino" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
              Review the 30-day pilot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/portal/ana" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/[0.68] transition hover:border-white/[0.35] hover:text-ana-cream">
              Preview the team portal
              <Users className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

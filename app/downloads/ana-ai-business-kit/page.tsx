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
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Start Ana HR Operations | FrankX',
  description:
    "A plain-language start page for Ana's current HR Operations workflow: first call, kickoff, role brief, offer, recruiting, invoice, and approved handoff.",
  path: '/downloads/ana-ai-business-kit',
  noindex: true,
})

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
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.06em] text-emerald-100">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Current working flow · v{currentVersion}
              </div>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                Begin with one client journey.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
                The workflow follows the stages your team already uses. It surfaces missing facts, supports draft preparation, and makes decision points visible while your approved Drive, ATS, and finance tools remain authoritative.
              </p>
              <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
                Empieza con un caso sin datos privados, una copia del documento y responsabilidades claras. La tecnología acompaña; el equipo mantiene el criterio.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <TrackedLink href={anaLinks.kitStart} target="_blank" rel="noopener noreferrer" eventName="ana_kit_guide_open" eventProperties={{ guide: 'ana_start' }} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                  Open Ana's start guide
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink href={anaLinks.kitTeamStart} target="_blank" rel="noopener noreferrer" eventName="ana_kit_guide_open" eventProperties={{ guide: 'team_start' }} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Open the team guide
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Review the client path
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What a safe first use requires</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">The work stays grounded in trusted sources.</h2>
                </div>
                <FolderLock className="h-8 w-8 text-ana-gold" aria-hidden="true" />
              </div>
              <ol className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {[
                  ['01', 'One de-identified or fictional practice case'],
                  ['02', 'Copies of the approved document templates'],
                  ['03', 'A named owner and decision-maker for each stage'],
                  ['04', 'Approved private systems for live records'],
                ].map(([number, item]) => (
                  <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                    <span className="font-mono text-xs text-ana-gold">{number}</span>
                    <span className="text-sm leading-6 text-ana-cream/[0.66]">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs leading-5 text-ana-cream/[0.42]">Technical setup is separate and can be handled by Frank or the person Ana designates.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">The current release · v{currentVersion}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Two packages. One clear boundary.</h2>
            </div>
            <div className="lg:pb-1">
              <p className="max-w-2xl text-base leading-7 text-ana-cream/[0.62]">Download only what the moment needs. Ana and the working team use the internal Operator Kit. A client receives only the reviewed Client Session Kit.</p>
              <a href={anaLinks.kitRelease} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">
                View the verified v{currentVersion} release
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/[0.18] lg:grid-cols-2">
            <article className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-ana-gold/25 bg-ana-gold/[0.07] px-3 py-1 text-xs font-semibold text-ana-gold">For Ana and the working team</span>
                <FolderLock className="h-6 w-6 text-ana-gold" aria-hidden="true" />
              </div>
              <h3 className="mt-7 text-3xl font-semibold tracking-tight">Operator Kit</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ana-cream/[0.62]">The internal preparation workspace: operating guides, approval controls, role references, and the material used to prepare client work. Keep this package inside Ana&apos;s practice.</p>
              <p className="mt-4 text-xs font-semibold text-ana-cream/[0.42]">Begin with START-HERE.md</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrackedLink href={anaLinks.kitOperatorDownload} eventName="ana_kit_release_download" eventProperties={{ package: 'operator' }} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                  Download Operator Kit
                  <Download className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <a href={anaLinks.kitOperatorChecksum} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/[0.68] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Verify checksum
                  <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>

            <article className="border-t border-white/10 bg-[linear-gradient(145deg,rgba(25,87,66,0.13),rgba(255,255,255,0.025))] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/[0.07] px-3 py-1 text-xs font-semibold text-emerald-100">For a reviewed client handoff</span>
                <FileCheck2 className="h-6 w-6 text-emerald-200" aria-hidden="true" />
              </div>
              <h3 className="mt-7 text-3xl font-semibold tracking-tight">Client Session Kit</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ana-cream/[0.62]">The focused session pack designed for client sharing. Ana or an accountable team member reviews the exact files and recipient before it leaves the practice.</p>
              <p className="mt-4 text-xs font-semibold text-ana-cream/[0.42]">Begin with README.md</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrackedLink href={anaLinks.kitClientDownload} eventName="ana_kit_release_download" eventProperties={{ package: 'client_session' }} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                  Download Client Session Kit
                  <Download className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <a href={anaLinks.kitClientChecksum} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/[0.68] transition hover:border-white/[0.35] hover:text-ana-cream">
                  Verify checksum
                  <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>

          <p className="mt-5 text-xs leading-5 text-ana-cream/[0.42]">Both downloads come from the same tagged GitHub release. The published manifest records the exact file list, entry point, and SHA-256 checksum for each package.</p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Technical setup · optional</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">For Frank or the person Ana designates.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">This one-time setup connects Codex to the maintained Ana HR Operations package. It is not part of the team’s daily client work.</p>
            <a href={anaLinks.kitRepo} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ana-cream underline decoration-ana-gold/[0.35] underline-offset-4 hover:decoration-ana-gold">
              Inspect the maintained repository
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-ana-obsidian shadow-[0_28px_100px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <p className="text-xs font-semibold tracking-[0.06em] text-white/[0.42]">PowerShell, Terminal, or Codex CLI</p>
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
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">The client journey</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Your existing process, with clearer handoffs and checkpoints.</h2>
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
                <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">First working prompt</p>
                <h3 className="mt-3 text-2xl font-semibold">Use the workflow as a checklist, not a script.</h3>
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
              <p className="text-xs font-semibold tracking-[0.08em]">The important boundary</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Preparation is assisted. Decisions stay with accountable people.</h2>
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
              <p className="mt-3 max-w-3xl text-sm leading-6 text-ana-cream/50">It contains earlier experimental and reflective-practice documents. Keep it as an archive; use the current workflow for HR and client delivery.</p>
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
            <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
              Review the suggested 30-day trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={anaLinks.privateWorkspace} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/[0.68] transition hover:border-white/[0.35] hover:text-ana-cream">
              See the workspace concept
              <Users className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

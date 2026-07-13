import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Download, FileArchive, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Intelligence Starter Kit',
  description: 'Download privacy circles, claim and consent templates, interview prompts, and a Codex work-order template.',
  alternates: { canonical: '/family-intelligence-system/download' },
}

const included = [
  'Family circles and privacy defaults',
  'Claim-not-fact intake template',
  'German consent and publication checklist',
  'German elder interview guide',
  'Private pilot topology for household, core family, extended family, and godchildren',
  'Secure intake and one-time link checklist',
  'Vercel clone and privacy-bounded v0 prompt links',
  'Codex work-order template for repository changes',
  'Privacy-safe launch post template',
] as const

export default function StarterKitDownloadPage() {
  return (
    <main className="min-h-screen bg-[#080b0d] text-[#f4efe5]">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-10 lg:pb-32 lg:pt-40">
        <Link href="/family-intelligence-system" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-400 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden /> Back to the system</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Downloadable starter kit</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-7xl">Start with governance, not software.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">A small bilingual packet for defining family circles, receiving claims, interviewing elders, and giving Codex an approved, privacy-scoped work order.</p>
            <a href="/downloads/family-intelligence-starter-kit.zip" download className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#0a1210] transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Download ZIP <Download className="h-4 w-4" aria-hidden />
            </a>
            <p className="mt-4 text-xs leading-5 text-stone-600">No email required. The archive contains templates only—no family data, executable code, or tracking. Reuse and redistribution terms remain pending an explicit license decision.</p>
          </div>
          <aside className="rounded-[1.75rem] border border-white/10 bg-[#101719] p-7 sm:p-8">
            <FileArchive className="h-7 w-7 text-amber-200" aria-hidden />
            <h2 className="mt-7 text-2xl font-semibold text-white">Inside the kit</h2>
            <ul className="mt-6 space-y-4">
              {included.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-stone-300"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />{item}</li>)}
            </ul>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="flex items-start gap-3 text-xs leading-5 text-stone-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />Review local law, family circumstances, and professional advice before using emergency or succession material.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

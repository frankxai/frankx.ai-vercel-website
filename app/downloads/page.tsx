import { Metadata } from 'next'
import DownloadsClient from './DownloadsClient'

export const metadata: Metadata = {
  title: 'Downloads and friend kits | FrankX.AI',
  description:
    'FrankX downloads for friend kits, business systems, developer packs, checksums, and working public resources.',
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#060807] text-white">
      <main className="pb-24 pt-32">
        <div className="relative px-4 text-center">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 h-[34rem] bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_70%_10%,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_72%)]" />
          <span className="mb-6 inline-flex items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-bold text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
            Verified downloads
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Download the kit that matches the work.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-7 text-white/66 md:text-xl md:leading-8">
            This hub holds the artifacts behind Friends and Allies: starter
            kits, ZIPs, checksums, release pages, guide previews, and optional
            ACOS packs when Codex or Claude should help run a workflow.
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2 text-xs font-bold text-white/58">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              Start with the person kit
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              ZIP and checksum verified
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              ACOS is optional
            </span>
          </div>
        </div>

        <DownloadsClient />
      </main>
    </div>
  )
}

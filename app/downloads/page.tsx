import { Metadata } from 'next'
import DownloadsClient from './DownloadsClient'

export const metadata: Metadata = {
  title: 'Downloads And Friend Kits | FrankX.AI',
  description:
    'Live FrankX downloads, friend kits, AI-supported business systems, developer packs, and working public resources.',
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#060807] text-white">
      <main className="pb-24 pt-32">
        <div className="relative px-4 text-center">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 h-[34rem] bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_70%_10%,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_72%)]" />
          <span className="mb-6 inline-flex items-center rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
            Live Downloads
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Working systems people can actually use.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-7 text-white/66 md:text-xl md:leading-8">
            The download hub is the practical shelf behind Friends and Allies:
            real starter kits, verified ZIPs, checksums, working guide previews,
            and optional ACOS packs when a person is ready for Codex or Claude
            to help run the workflows.
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/58">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              Friend kits first
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl">
              No fake download links
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

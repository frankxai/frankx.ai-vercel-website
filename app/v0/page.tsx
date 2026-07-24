import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  Box,
  Camera,
  GitBranch,
  ShieldCheck,
} from "lucide-react"

import { V0Catalog } from "@/components/v0/V0Catalog"
import {
  catalogSnapshot,
  sourceLegend,
  templatePackages,
} from "@/content/v0/catalog"

export const metadata: Metadata = {
  title: "v0 Template Intelligence",
  description:
    "A source-classified v0 template catalog, first-party creation studio, and production architecture for premium generative interfaces.",
}

const operatingLanes = [
  {
    icon: Camera,
    title: "v0",
    role: "Visual composition",
    note: "Page concepts, interaction states, responsive component systems, and bounded UI prototypes.",
  },
  {
    icon: Blocks,
    title: "Codex",
    role: "Production engineering",
    note: "Repository integration, backend contracts, security, tests, accessibility, performance, and release evidence.",
  },
  {
    icon: Box,
    title: "Media engines",
    role: "Proof assets",
    note: "Purpose-built image, video, and 3D sources with rights records, crop plans, fallbacks, and human review.",
  },
] as const

const snapshotMetrics = [
  {
    value: catalogSnapshot.communityTemplates,
    label: "community templates mapped",
  },
  {
    value: catalogSnapshot.graphConnections,
    label: "pattern connections",
  },
  {
    value: catalogSnapshot.architectureTeardowns,
    label: "architecture teardowns",
  },
  {
    value: templatePackages.length,
    label: "first-party packages",
  },
] as const

export default function V0Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] pb-24 pt-24 text-white sm:pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-emerald-300">
              FrankX / build intelligence
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              v0 Template Intelligence
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              A governed system for finding strong v0 patterns, turning selected
              concepts into original product surfaces, and hardening them for
              production without carrying prototype debt into the repository.
            </p>
          </div>
          <Link
            href="/v0/studio"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-emerald-400 px-4 text-sm font-semibold text-[#06110c] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Open Visual Foundry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <dl className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4">
          {snapshotMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border-r border-white/10 py-5 pr-4 last:border-r-0 sm:px-5 sm:first:pl-0"
            >
              <dt className="text-xs leading-5 text-white/45">{metric.label}</dt>
              <dd className="mt-1 font-mono text-xl text-white">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-cyan-300">First-party</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Product packages
            </h2>
          </div>
          <p className="hidden max-w-md text-right text-sm leading-6 text-white/45 md:block">
            Original implementations. Community references inform the pattern
            library; they are not republished as FrankX templates.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {templatePackages.map((template) => (
            <article
              key={template.slug}
              className="overflow-hidden rounded-lg border border-white/10 bg-[#111113]"
            >
              <div className="relative aspect-[16/9] border-b border-white/10 bg-[#0a0a0b]">
                <Image
                  src={template.poster}
                  alt={template.posterAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-medium text-cyan-300">
                    {template.category}
                  </p>
                  <span className="rounded-sm border border-white/10 px-2 py-1 font-mono text-[10px] text-white/45">
                    {template.status}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {template.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {template.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                  {template.capabilities.slice(0, 3).map((capability) => (
                    <li
                      key={capability}
                      className="flex gap-3 text-sm leading-6 text-white/55"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                        aria-hidden="true"
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/v0/templates/${template.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Inspect package
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={template.proofRoute}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Open reference
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0f]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-emerald-300">Operating model</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Use each system where it compounds quality
            </h2>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {operatingLanes.map(({ icon: Icon, title, role, note }) => (
              <div key={title} className="border-t border-white/10 pt-5">
                <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-semibold">{title}</p>
                <p className="mt-1 text-xs font-medium text-emerald-300">{role}</p>
                <p className="mt-3 text-sm leading-6 text-white/55">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs text-cyan-300">Observed patterns</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Curated v0 community snapshot
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/45">
            Outbound intelligence only. Counts are time-bound gallery signals,
            not FrankX endorsements or claims of official authorship.
          </p>
        </div>
        <div className="mt-7">
          <V0Catalog />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 px-4 pt-10 sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold">Source policy</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {sourceLegend.map((source) => (
            <div key={source.id} className="border-t border-white/10 pt-4">
              <p className="text-sm font-medium text-white">{source.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/50">{source.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/35">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          Snapshot observed 17 July 2026. Re-verify links and signals before
          commercial use.
        </div>
      </section>
    </main>
  )
}

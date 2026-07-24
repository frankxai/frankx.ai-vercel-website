import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Network,
} from "lucide-react"

import { V0PreviewFrame } from "@/components/v0/V0PreviewFrame"
import {
  getTemplatePackage,
  templatePackages,
} from "@/content/v0/catalog"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return templatePackages.map((template) => ({ slug: template.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplatePackage(slug)

  if (!template) {
    return { title: "Template not found" }
  }

  return {
    title: template.name,
    description: template.summary,
  }
}

export default async function TemplatePackagePage({ params }: PageProps) {
  const { slug } = await params
  const template = getTemplatePackage(slug)
  if (!template) notFound()

  return (
    <main className="min-h-screen bg-[#0a0a0b] pb-24 pt-24 text-white sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/v0"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Template intelligence
        </Link>

        <header className="mt-5 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-cyan-300">{template.category}</span>
            <span className="text-white/20" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-white/45">{template.status}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {template.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/60">
            {template.summary}
          </p>
          <Link
            href={template.proofRoute}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-emerald-400 px-4 text-sm font-semibold text-[#06110c] hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Open runnable reference
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <div className="relative mt-8 aspect-[16/8] min-h-[300px] overflow-hidden rounded-lg border border-white/10 bg-[#111113]">
          <Image
            src={template.poster}
            alt={template.posterAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>

        {template.previewKey ? (
          <section className="py-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs text-emerald-300">
                  Secure preview boundary
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  v0 sandbox, proxied read-only
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-white/45">
                Short-lived preview tokens remain server-side. The frame is
                feature-gated because the v0 Platform API v2 is beta.
              </p>
            </div>
            <V0PreviewFrame
              previewKey={template.previewKey}
              title={`${template.name} v0 preview`}
              fallbackHref={template.proofRoute}
            />
          </section>
        ) : null}

        <section className="border-t border-white/10 py-14">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold">
              Architecture
            </h2>
          </div>
          <div className="mt-8">
            {template.architecture.map((layer, index) => (
              <div
                key={layer.id}
                className="grid gap-3 border-t border-white/10 py-5 sm:grid-cols-[56px_220px_1fr] sm:items-start"
              >
                <span className="font-mono text-xs text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold">
                  {layer.title}
                </h3>
                <p className="text-sm leading-6 text-white/55">
                  {layer.responsibility}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-t border-white/10 py-14 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">
                Capability contract
              </h2>
            </div>
            <ul className="mt-6 space-y-4">
              {template.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="border-t border-white/10 pt-4 text-sm leading-6 text-white/60"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CircleAlert
                className="h-5 w-5 text-amber-300"
                aria-hidden="true"
              />
              <h2 className="font-display text-xl font-semibold">
                Release boundaries
              </h2>
            </div>
            <ul className="mt-6 space-y-4">
              {template.releaseGates.map((gate) => (
                <li
                  key={gate}
                  className="border-t border-white/10 pt-4 text-sm leading-6 text-white/60"
                >
                  {gate}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}

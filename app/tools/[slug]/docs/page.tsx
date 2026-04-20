import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

function toTitleCaseFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = toTitleCaseFromSlug(slug)
  return createMetadata({
    title: `${title} Docs — FrankX Tools`,
    description:
      'Implementation notes and usage guidance for FrankX tools. Documentation is being expanded.',
    path: `/tools/${slug}/docs`,
  })
}

export default async function ToolDocsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = toTitleCaseFromSlug(slug)

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-100">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
            <BookOpen className="h-3.5 w-3.5" />
            Docs
          </div>

          <h1 className="mb-3 text-3xl font-bold text-white">{title} Documentation</h1>
          <p className="mb-8 leading-relaxed text-slate-300">
            Full documentation for this tool is being finalized. Use the main tool page or the
            builder while we ship the complete docs set.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tools/${slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
            >
              Open Tool Page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

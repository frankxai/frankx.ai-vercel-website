import Link from 'next/link'
import { ArrowRight, Wrench } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

type ToolPreview = {
  title: string
  description: string
}

const TOOL_PREVIEWS: Record<string, ToolPreview> = {
  'prompt-optimizer': {
    title: 'Prompt Optimizer',
    description:
      'Improve prompt quality with a structured optimization workflow and model-aware checks.',
  },
  'risk-analyzer': {
    title: 'AI Risk Analyzer',
    description:
      'Run risk and compliance checks before deployment with practical mitigation guidance.',
  },
  'agent-builder': {
    title: 'Agent Configuration Builder',
    description:
      'Configure agent capabilities, tools, and safety constraints for production workflows.',
  },
  'performance-tracker': {
    title: 'AI Performance Tracker',
    description:
      'Monitor quality, latency, and reliability trends across your active AI workflows.',
  },
  'content-generator': {
    title: 'AI Content Generator',
    description:
      'Generate high-signal content drafts using guided prompts and reusable structures.',
  },
  'team-readiness': {
    title: 'Team Readiness Assessment',
    description:
      'Assess AI readiness across roles, skills, and adoption plans with actionable recommendations.',
  },
}

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
  const preview = TOOL_PREVIEWS[slug]
  const title = preview?.title ?? toTitleCaseFromSlug(slug)
  const description =
    preview?.description ??
    'This tool page is being finalized. Join the waitlist to get notified when it launches.'

  return createMetadata({
    title: `${title} — FrankX Tools`,
    description,
    path: `/tools/${slug}`,
  })
}

export default async function ToolPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const preview = TOOL_PREVIEWS[slug]
  const title = preview?.title ?? toTitleCaseFromSlug(slug)
  const description =
    preview?.description ??
    'This tool page is being finalized. Join the waitlist to get notified when it launches.'

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20 text-slate-100">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-amber-300">
            <Wrench className="h-3.5 w-3.5" />
            In Progress
          </div>

          <h1 className="mb-3 text-3xl font-bold text-white">{title}</h1>
          <p className="mb-8 leading-relaxed text-slate-300">{description}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/builder"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Use AI System Builder
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/newsletter?ref=tool-${slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Join Launch Updates
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

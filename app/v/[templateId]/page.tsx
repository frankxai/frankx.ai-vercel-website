import { notFound } from 'next/navigation'

import { TemplatePackagePage } from '@/components/templates/TemplatePackagePage'
import { createMetadata } from '@/lib/seo'
import {
  getRelatedV0Templates,
  getV0TemplateById,
  getV0TemplatePath,
  v0TemplateEntries,
} from '@/data/v0-template-library'

type PageProps = {
  params: Promise<{ templateId: string }>
}

export function generateStaticParams() {
  return v0TemplateEntries.map((entry) => ({ templateId: entry.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { templateId } = await params
  const entry = getV0TemplateById(templateId)

  if (!entry) {
    return createMetadata({
      title: 'Template package not found',
      description: 'This FrankX template package could not be found.',
      path: '/v',
      noindex: true,
    })
  }

  return createMetadata({
    title: `${entry.title} - FrankX Template Package`,
    description: `${entry.title} package brief for ${entry.audience}. Includes v0 scope, Codex hardening, assets, quality gates, and next action.`,
    path: getV0TemplatePath(entry),
    image: entry.previewImage,
    keywords: [
      `${entry.title} template`,
      `${entry.brand} template`,
      `${entry.family} template`,
      'v0 templates',
      'Vercel templates',
      'AI business templates',
    ],
  })
}

export default async function VTemplatePackageRoute({ params }: PageProps) {
  const { templateId } = await params
  const entry = getV0TemplateById(templateId)

  if (!entry) {
    notFound()
  }

  const relatedEntries = getRelatedV0Templates(entry)

  return <TemplatePackagePage entry={entry} relatedEntries={relatedEntries} />
}

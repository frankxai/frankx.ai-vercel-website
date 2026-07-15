import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import {
  ArchitectureDiagram,
  CheckList,
  CTASection,
  PlatformHero,
  PlatformShell,
  SectionHeader,
  SystemFlow,
} from '@/components/platform/platform-ui'
import { cloudPages, getCloudPage } from '@/data/platform'
import { createMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return cloudPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getCloudPage(slug)

  if (!page) {
    return createMetadata({
      title: 'Cloud AI Page Not Found',
      description: 'The requested Cloud AI page could not be found.',
      path: `/cloud/${slug}`,
    })
  }

  return createMetadata({
    title: `${page.title} | FrankX Cloud AI`,
    description: page.metadataDescription,
    path: `/cloud/${page.slug}`,
    keywords: ['cloud AI', 'AI architecture', 'AI CoE', 'MCP', 'AI workloads', ...page.title.toLowerCase().split(' ')],
  })
}

export default async function CloudDetailPage({ params }: Props) {
  const { slug } = await params
  const page = getCloudPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <PlatformShell>
      <PlatformHero
        eyebrow={page.eyebrow}
        title={page.title}
        deck={page.coreLine}
        primaryCta={{ label: page.ctaLabel, href: page.ctaHref }}
        secondaryCta={{ label: 'Back to Cloud AI', href: '/cloud' }}
        metrics={[
          { value: '01', label: 'Focused architecture lane' },
          { value: 'MCP', label: 'Tool and cloud integration aware' },
          { value: 'Field', label: 'Built for reusable execution' },
        ]}
        visualTitle="Page system"
        visualItems={page.sections.map((section) => section.title)}
      />

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Operating Brief"
            title={page.description}
            deck="Each section is written as a practical build surface: what changes, what the system needs, and what a team should leave with."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/55">{section.body}</p>
                {section.points?.length ? (
                  <div className="mt-6">
                    <CheckList items={section.points} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.architecture?.length ? (
        <section className="px-6 py-12 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="System Map"
              title="The architecture is explicit."
              deck="The goal is not more AI language. The goal is a named path from signal to system, with enough structure for builders and executives to make decisions."
            />
            <div className="mt-10">
              {page.architecture.length > 6 ? (
                <SystemFlow steps={page.architecture} />
              ) : (
                <ArchitectureDiagram layers={page.architecture} />
              )}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="Next Move"
        title={page.ctaLabel}
        deck="Bring one real use case, workflow, or workload question. The work starts by making the system concrete."
        primary={{ label: page.ctaLabel, href: page.ctaHref }}
        secondary={{ label: 'Explore products', href: '/products' }}
      />
    </PlatformShell>
  )
}

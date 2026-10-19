import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, FileSearch, FlaskConical } from 'lucide-react'
import { researchDomains, getDomainBySlug, getRelatedDomains } from '@/lib/research/domains'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return researchDomains.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const domain = getDomainBySlug(slug)
  if (!domain) return {}

  return {
    title: `${domain.title} — Research review`,
    description: `The ${domain.title} brief is being reviewed against individual sources and methods.`,
    alternates: { canonical: `https://www.frankx.ai/research/${slug}` },
    robots: { index: false, follow: true },
  }
}

export default async function ResearchDomainRoute({ params }: PageProps) {
  const { slug } = await params
  const domain = getDomainBySlug(slug)
  if (!domain) notFound()
  const related = getRelatedDomains(slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-[#0a0a0b] px-4 pb-24 pt-28 text-white sm:px-6 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <Link href="/research" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Research
        </Link>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300">Source review in progress</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{domain.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{domain.subtitle}</p>
            <p className="mt-10 max-w-2xl text-base leading-8 text-white/65">
              This brief is being checked against individual publications, benchmarks and methods.
              Its earlier generated source list and confidence labels did not meet the publication standard.
              The topic remains available here while the evidence is reviewed.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/research/methodology" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0b] hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-emerald-300">
                Review the method <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/research#hubs" className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 py-3 text-sm text-white/75 hover:border-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300">
                Explore the hubs
              </Link>
            </div>
          </div>

          <aside className="border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <FileSearch className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            <h2 className="mt-4 text-sm font-semibold">Publication gate</h2>
            <ul className="mt-4 space-y-4 text-sm leading-6 text-white/60">
              <li>Exact source and claim locator</li>
              <li>Method, date and limitations</li>
              <li>Contrary evidence and corrections</li>
              <li>Independent editorial review</li>
            </ul>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-white/10 pt-8" aria-labelledby="related-heading">
            <div className="flex items-center gap-3">
              <FlaskConical className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              <h2 id="related-heading" className="text-xl font-semibold">Related topics</h2>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/research/${item.slug}`} className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/10 p-5 text-sm text-white/75 hover:border-emerald-300/40 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300">
                  {item.title} <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

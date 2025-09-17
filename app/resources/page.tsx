import { BookOpen, Boxes, Download, ExternalLink, FileText, LinkIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { createMetadata } from '@/lib/seo'

const resourceSections = [
  {
    icon: BookOpen,
    title: 'Golden Age Modern Guide',
    description: 'A practical, plain-language guide with frameworks and a 90-day plan to operationalize conscious AI.',
    links: [
      {
        href: '/reading/GoldenAge-Modernized/article/Golden_Age_of_Intelligence_Modern_Guide.html',
        label: 'Read the guide',
        icon: ExternalLink,
      },
    ],
  },
  {
    icon: FileText,
    title: 'Book Basis & TOC',
    description: 'Positioning, structure, and sample chapter for “Dawn of the Golden Age.”',
    links: [
      { href: '/reading/GoldenAge-Modernized/book/basis.html', label: 'Basis', icon: LinkIcon },
      { href: '/reading/GoldenAge-Modernized/book/table_of_contents.html', label: 'TOC', icon: LinkIcon },
      { href: '/reading/GoldenAge-Modernized/book/samples/chapter_1.html', label: 'Sample', icon: LinkIcon },
    ],
  },
  {
    icon: Boxes,
    title: 'Templates & Playbooks',
    description: 'Capture–Orchestrate–Evaluate (COE) checklists, adoption scorecards, and agent blueprints.',
    links: [
      {
        href: '/reading/Templates/MASTER_TEMPLATE_INDEX.html',
        label: 'Browse templates',
        icon: ExternalLink,
      },
    ],
  },
  {
    icon: Download,
    title: 'Intelligence Era One-Pager',
    description: 'Concise executive summary and checklists for immediate adoption wins.',
    links: [
      { href: '/assets/intelligence-era-onepager.html', label: 'Open one-pager', icon: ExternalLink },
    ],
  },
]

export const metadata = createMetadata({
  title: 'FrankX Resource Library',
  description: 'Curated guides, templates, and executive assets to build conscious AI systems with confidence.',
  keywords: ['conscious ai resources', 'ai templates', 'frankx library'],
  path: '/resources',
})

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl space-y-14">
          <header className="rounded-4xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-10">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-4 w-4" />
                Resource Library
              </span>
              <h1 className="text-4xl font-semibold text-white md:text-5xl">Systems to accelerate your conscious AI practice.</h1>
              <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
                Every artifact here comes from live work with families, founders, and enterprise teams. Start with the guide that matches your mission, then integrate the templates into your stack.
              </p>
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {resourceSections.map((section) => {
              const Icon = section.icon
              return (
                <article key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-3 text-white">
                    <Icon className="h-5 w-5 text-primary-200" />
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{section.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {section.links.map((link) => {
                      const LinkIconComponent = link.icon
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                        >
                          {link.label}
                          <LinkIconComponent className="h-4 w-4" />
                        </Link>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <p>
              Want everything in one pass? Use the full <Link href="/reading/index.html" className="text-primary-200 underline-offset-4 hover:underline">reading index</Link> to explore the complete archive of essays, transcripts, and releases.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

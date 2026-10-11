import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { dossierMedia, dossierReadingMinutes, sourcesForDossier, type ResearchDossier as Dossier, type DossierMedia } from '@/lib/research/dossiers'
import OfficialVideo from './OfficialVideo'

const focus = 'focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]'
const labels = { analysis: 'FrankX analysis / proposal', documented: 'Primary-source documentation', measured: 'Reported study' }

function OfficialMedia({ media }: { media: DossierMedia }) {
  return (
    <figure className="my-10 min-w-0 border-y border-white/15 py-6">
      {media.type === 'image' && media.width && media.height && (
        <a href={media.url} className={`block rounded-lg bg-white p-3 ${focus}`} aria-label={`Open original figure: ${media.title}`}>
          <Image src={media.url} alt={media.alt ?? media.description} width={media.width} height={media.height} loading="lazy" unoptimized className="h-auto w-full" />
        </a>
      )}
      {media.type === 'video' && (
        <video controls muted playsInline preload="none" width={media.width} height={media.height} aria-label={media.title} aria-describedby={`description-${media.id}`} className={`h-auto w-full rounded-lg bg-black ${focus}`}>
          <source src={media.url} type="video/mp4" />
          <a href={media.url}>Watch the original demonstration</a>
        </video>
      )}
      {media.type === 'youtube' && media.embedUrl && <OfficialVideo title={media.title} embedUrl={media.embedUrl} />}
      <figcaption className="mt-4 space-y-2 text-sm leading-6 text-white/65">
        <p className="font-medium text-white/90">{media.title} · {media.publisher}</p>
        <p id={`description-${media.id}`}>{media.description}</p>
        <p><a href={media.sourceUrl} className={`text-emerald-300 underline underline-offset-4 ${focus}`}>Official documentation and context</a>{' · '}<a href={media.url} className={`underline underline-offset-4 ${focus}`}>Original media</a></p>
        {media.licenseUrl && <p>Original, unchanged media · <a href={media.licenseUrl} className={`underline underline-offset-4 ${focus}`}>{media.license}</a></p>}
        {media.type === 'link' && <p>The original diagram is linked for reference. A reuse license has not been verified.</p>}
      </figcaption>
    </figure>
  )
}

export default function ResearchDossier({ dossier }: { dossier: Dossier }) {
  const sources = sourcesForDossier(dossier)
  const citation = (id: string) => sources.findIndex((source) => source.id === id) + 1
  function Citations({ ids }: { ids: string[] }) {
    return <span className="ml-2 inline-flex flex-wrap gap-2 text-sm">{ids.map((id) => <a key={id} href={`#source-${id}`} aria-label={`Source ${citation(id)}: ${sources.find((source) => source.id === id)?.title}`} className={`rounded-sm text-emerald-300 underline underline-offset-4 ${focus}`}>[{citation(id)}]</a>)}</span>
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0b] px-4 pb-32 pt-28 text-white sm:px-6 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href="/research" className={`inline-flex min-h-11 items-center gap-2 text-sm text-white/70 hover:text-white ${focus}`}><ArrowLeft className="h-4 w-4" aria-hidden="true" />Research</Link>
        <header className="mt-8 border-t border-white/15 pt-8 md:mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Research dossier · Editorial candidate</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance md:text-5xl lg:text-6xl">{dossier.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{dossier.abstract}</p>
          <p className="mt-6 text-sm text-white/65">Sources checked <time dateTime={dossier.reviewedAt}>9 October 2026</time> · {dossierReadingMinutes(dossier)} min read · {sources.length} source records</p>
          <div className="mt-8 max-w-3xl border-l-2 border-emerald-300 pl-5">
            <h2 className="text-sm font-semibold text-emerald-300">The decision this research supports</h2>
            <p className="mt-3 text-base leading-7 text-white/85">{dossier.decision}</p>
          </div>
        </header>

        <div className="mt-12 grid min-w-0 gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0">
            <nav aria-label="Dossier sections" className="lg:sticky lg:top-28">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/65">In this dossier</h2>
              <ol className="mt-4 space-y-1">{dossier.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className={`flex min-h-11 gap-3 py-2 text-sm leading-6 text-white/75 hover:text-emerald-300 ${focus}`}><span className="tabular-nums text-white/50">{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}</ol>
              <a href="#source-ledger" className={`mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300 ${focus}`}>Sources and limitations <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </nav>
          </aside>
          <article className="min-w-0 max-w-3xl">
            <details className="mb-12 rounded-xl border border-white/20 p-5" open>
              <summary className={`cursor-pointer text-sm font-semibold text-white/90 ${focus}`}>Method and editorial status</summary>
              <p className="mt-4 text-sm leading-7 text-white/70">{dossier.method}</p>
              <p className="mt-3 text-sm leading-7 text-white/70">This candidate is visible for editorial review in preview environments. Separate AI reviewers have checked the evidence; named human review and the production publication receipt remain required. No new benchmark results are claimed.</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/70">{dossier.limitations.map((limit) => <li key={limit}>{limit}</li>)}</ul>
            </details>
            {dossier.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-16 scroll-mt-28">
                <h2 className="mb-6 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{section.title}</h2>
                <div className="space-y-6">{section.paragraphs.map((paragraph) => <div key={paragraph.id} id={paragraph.id} className="scroll-mt-28"><p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/55">{labels[paragraph.kind]}</p><p className="text-base leading-8 text-white/80 md:text-lg">{paragraph.text}<Citations ids={paragraph.sourceIds} /></p></div>)}</div>
                {section.table && (
                  <div role="region" aria-label={section.table.caption} tabIndex={0} className={`mt-8 max-w-full overflow-x-auto rounded-lg border border-white/20 ${focus}`}>
                    <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-6">
                      <caption className="p-5 text-left font-medium text-white/80">{section.table.caption}</caption>
                      <thead className="border-y border-white/15 bg-white/5"><tr>{section.table.headings.map((heading) => <th key={heading} scope="col" className="p-4 font-semibold text-white">{heading}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row) => <tr key={row.id} id={row.id} className="scroll-mt-28 border-b border-white/10 last:border-0">{row.cells.map((cell, i) => i === 0 ? <th key={i} scope="row" className="p-4 align-top font-medium text-white/90">{cell}<Citations ids={row.sourceIds} /></th> : <td key={i} className="p-4 align-top text-white/75">{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {section.code && <pre tabIndex={0} aria-label="Proposed reproducible contract" className={`mt-8 max-w-full overflow-x-auto rounded-lg border border-white/15 bg-black/40 p-5 text-sm leading-7 text-emerald-200 ${focus}`}><code>{section.code}</code></pre>}
                {section.mediaIds.map((id) => { const media = dossierMedia.find((item) => item.id === id); return media ? <OfficialMedia key={id} media={media} /> : null })}
              </section>
            ))}
            <section id="source-ledger" className="scroll-mt-28 border-t border-white/15 pt-8" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="text-2xl font-semibold">Primary sources and limits</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">Each reference records the publication, read scope, claim locators and limitations. Documentation establishes what a provider specifies; empirical results retain the original study population and method. Linked media belongs to its publisher.</p>
              <ol className="mt-8 space-y-8">{sources.map((source, i) => <li key={source.id} id={`source-${source.id}`} className="scroll-mt-28 border-t border-white/10 pt-5"><p className="text-sm text-white/60">[{i + 1}] {source.publisher} · {source.type}{source.publishedAt ? ` · published ${source.publishedAt}` : ''} · checked {source.accessedAt}</p><a href={source.url} className={`mt-2 inline-block break-words text-base font-medium text-emerald-300 underline underline-offset-4 ${focus}`}>{source.title}</a><p className="mt-2 text-xs leading-6 text-white/65">{source.version}</p><details className="mt-3 text-sm text-white/70"><summary className={`min-h-11 cursor-pointer py-2 ${focus}`}>Claim locators and limitations</summary><ul className="list-disc space-y-2 pl-5 leading-6">{source.locators.map((locator, index) => <li key={`loc-${index}`}>{locator}</li>)}{source.limitations.map((limit, index) => <li key={`limit-${index}`}>{limit}</li>)}</ul></details></li>)}</ol>
            </section>
            <section className="mt-16 border-t border-white/15 pt-8" aria-labelledby="continue-heading">
              <h2 id="continue-heading" className="text-2xl font-semibold">Continue the research</h2>
              <div className="mt-5 divide-y divide-white/10">{dossier.related.map((related) => <Link key={related.slug} href={`/research/${related.slug}`} className={`flex min-h-16 items-start justify-between gap-5 py-5 ${focus}`}><span><span className="block text-sm font-medium text-emerald-300">{related.slug.replace(/-/g, ' ')}</span><span className="mt-2 block text-sm leading-6 text-white/70">{related.reason}</span></span><ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}</div>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}

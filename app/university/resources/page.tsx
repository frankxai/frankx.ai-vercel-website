import type { Metadata } from 'next'
import Link from 'next/link'
import registry from '@/content/partnerships/university-resources.json'

export const metadata: Metadata = {
  title: 'Learning paths and resources | University Commons',
  description: 'Four free learning paths with source files, costs, evidence and a concrete outcome.',
  alternates: { canonical: '/university/resources' },
}

const links = 'text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-offset-4'
const resources = registry.resources.filter(resource =>
  resource.status === 'verified' && resource.access === 'free' && resource.publicationStatus === 'proposed-for-commons'
)

export default function ResourcesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-5 py-16 text-zinc-100 sm:px-8">
      <Link href="/university" className={links}>University Commons</Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Learning paths and resources</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">Pick a question, make something you can keep, and check it against the evidence. Each path can be completed without a paid account, public submission or cloud model.</p>
      <p className="mt-3 text-sm text-zinc-400">Independent FrankX collection · Edition {registry.edition} · Reviewed {registry.reviewedAt}</p>
      <nav aria-label="Learning paths" className="mt-8 flex flex-wrap gap-5">
        {registry.paths.map(path => <a className={links} key={path.id} href={`#path-${path.id}`}>For {path.id}</a>)}
        <a className={links} href="#readings">All resources</a>
      </nav>
      {registry.paths.map(path => <section key={path.id} id={`path-${path.id}`} className="mt-10 scroll-mt-8 border-t border-zinc-700 pt-7">
        <p className="text-sm text-emerald-300">For {path.id} · about {path.estimatedMinutes} minutes</p>
        <h2 className="mt-2 text-2xl font-semibold">{path.title}</h2>
        <p className="mt-3 text-zinc-300">{path.exercise}</p>
        <ol className="mt-4 list-decimal space-y-2 pl-6">{path.resourceIds.map(id => {
          const resource = resources.find(entry => entry.id === id)
          return resource && <li key={id}><a href={`#${id}`} className={links}>{resource.title}</a></li>
        })}</ol>
        <p className="mt-4"><strong>Keep</strong> · {path.deliverable}</p>
        <p className="mt-2"><strong>Check</strong> · {path.acceptance}</p>
      </section>)}
      <section id="readings" className="mt-14">
        <h2 className="text-3xl font-semibold">Resource notes</h2>
        {resources.map(resource => <article key={resource.id} id={resource.id} className="mt-6 scroll-mt-8 border-t border-zinc-700 pt-5">
          <p className="text-sm text-zinc-400">{resource.publisher} · {resource.format}</p>
          <h3 className="mt-1 text-xl font-semibold"><a href={resource.href} className={links}>{resource.title}</a></h3>
          <p className="mt-2">{resource.nextAction}</p>
          <details className="mt-3 text-zinc-300">
            <summary className="cursor-pointer focus-visible:outline">Evidence, prerequisites and reuse</summary>
            <p className="mt-2">{resource.summary}</p>
            <p className="mt-2">{resource.prerequisiteCosts}</p>
            <p className="mt-2">{resource.accessibility}</p>
            <p className="mt-2">{resource.licence.scope} <a className={links} href={resource.licence.url}>Licence terms</a></p>
            <p className="mt-2"><a className={links} href={resource.sourceUrl}>Source at {resource.currentVersion.slice(0, 10)}</a> · {resource.id}</p>
          </details>
        </article>)}
      </section>
    </main>
  )
}

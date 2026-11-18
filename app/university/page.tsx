import type { Metadata } from 'next'
import Link from 'next/link'
import { challengeBriefs, researchReadings } from '@/content/partnerships/university-collaboration'

export const metadata: Metadata = {
  title: 'University Commons | FrankX',
  description: 'Practical AI learning, reproducible research and founder challenges. Independent resources for students, professors, researchers, founders and communities.',
  alternates: { canonical: '/university' },
}

const paths = [
  { id: 'students', title: 'Students', description: 'Build something you can explain, evaluate and share.', action: 'Explore a practical challenge' },
  { id: 'professors', title: 'Professors', description: 'Adapt a responsible AI challenge to your course.', action: 'Explore teaching materials' },
  { id: 'researchers', title: 'Researchers', description: 'Examine hypotheses, methods and failure cases.', action: 'Read research foundations' },
  { id: 'founders', title: 'Founders', description: 'Validate a real problem with a bounded experiment.', action: 'Explore a founder challenge' },
  { id: 'community', title: 'Community', description: 'Find a public-interest problem worth collaborating on.', action: 'Explore impact challenges' },
] as const

export default function UniversityCommonsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">FrankX · University Commons</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Learn, investigate, build together.</h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">An independent collection of practical AI challenges and research foundations for students, educators, researchers, founders and communities.</p>
        <p className="mt-3 text-sm text-zinc-400">Independent FrankX initiative. No university affiliation, accreditation or research endorsement is implied.</p>
      </header>
      <nav aria-label="Choose your experience" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map(path => <a key={path.id} href={`#${path.id}`} className="rounded-2xl border border-zinc-700 p-6 transition-colors hover:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">
          <h2 className="text-xl font-semibold">{path.title}</h2><p className="mt-2 text-sm text-zinc-300">{path.description}</p><span className="mt-4 inline-block text-sm font-medium text-emerald-300">{path.action} →</span>
        </a>)}
      </nav>
      <section className="mt-16" aria-labelledby="challenges-heading">
        <h2 id="challenges-heading" className="text-2xl font-bold">Challenges you can actually run</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {challengeBriefs.map((challenge, index) => <article key={challenge.id} id={['students','founders','community'][index]} className="scroll-mt-8 rounded-2xl border border-zinc-700 p-6">
            <p className="text-xs uppercase tracking-wider text-emerald-300">{challenge.discipline}</p>
            <h3 className="mt-3 text-xl font-semibold">{challenge.title}</h3>
            <p className="mt-3 text-sm text-zinc-300">{challenge.task}</p>
            <p className="mt-4 text-sm"><strong>Deliverable:</strong> {challenge.deliverable}</p>
            <p className="mt-2 text-sm text-zinc-400"><strong>Review:</strong> {challenge.review}</p>
          </article>)}
        </div>
      </section>
      <section id="researchers" className="mt-16 scroll-mt-8" aria-labelledby="research-heading">
        <h2 id="research-heading" className="text-2xl font-bold">Research foundations</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{researchReadings.map(reading => <article key={reading.href} className="rounded-2xl border border-zinc-700 p-6">
          <h3 className="text-lg font-semibold">{reading.title}</h3><p className="mt-2 text-xs text-zinc-400">{reading.citation}</p>
          <p className="mt-3 text-sm text-zinc-300">{reading.detail}</p>
          <a href={reading.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-emerald-300 underline underline-offset-4">Read source <span className="sr-only">(opens in a new tab)</span></a>
        </article>)}</div>
      </section>
      <section id="professors" className="mt-16 scroll-mt-8 rounded-2xl border border-zinc-700 p-7">
        <h2 className="text-2xl font-bold">For professors and facilitators</h2>
        <p className="mt-3 text-zinc-300">Start with existing educator guides. Academic supervisors retain curriculum, assessment, ethics and participation decisions.</p>
        <Link href="/workshops/for-educators" className="mt-4 inline-block font-medium text-emerald-300 underline underline-offset-4">Open educator resources</Link>
      </section>
      <footer className="mt-16 border-t border-zinc-700 pt-8">
        <h2 className="text-2xl font-bold">Propose a collaboration</h2>
        <p className="mt-3 max-w-2xl text-zinc-300">Bring a course, research question, founder challenge or community problem. Explore fit through the existing independent university collaboration invitation.</p>
        <Link href="/partnerships/universities" className="mt-5 inline-block rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400">Explore collaboration</Link>
      </footer>
    </main>
  )
}

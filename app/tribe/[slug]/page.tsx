import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTribePerson, tribePeople } from '../people'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return tribePeople.map((person) => ({ slug: person.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const person = getTribePerson(params.slug)

  if (!person) {
    return {
      title: 'Private dedication — FrankX',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `${person.name} — Private dedication`,
    description: person.shortGift,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title: `${person.name} — Private dedication`,
      description: person.shortGift,
      type: 'website',
      url: `https://frankx.ai/tribe/${person.slug}`,
      siteName: 'FrankX',
      images: [
        {
          url: '/hero-homepage.png',
          width: 1200,
          height: 630,
          alt: `${person.name} — Private dedication`,
        },
      ],
    },
  }
}

export default function TribePersonPage({ params }: { params: { slug: string } }) {
  const person = getTribePerson(params.slug)

  if (!person) notFound()

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.28),rgba(2,6,23,1))]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
          <Link href="/tribe" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
            ← Back to tribe
          </Link>
          <p className="mt-10 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
            Private dedication
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl">{person.name}</h1>
          <p className="mt-5 max-w-3xl text-lg uppercase tracking-[0.18em] text-slate-400">{person.role}</p>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-200 md:text-2xl">{person.shortGift}</p>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-slate-300 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Sharing standard</p>
            <p className="mt-3 leading-7">{person.privacy}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-24">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/25 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">What I see</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">The dedication</h2>
          <p className="mt-6 text-lg leading-9 text-slate-300">{person.dedication}</p>
        </article>

        <aside className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-purple-300">The vow</p>
          <blockquote className="mt-5 text-2xl font-semibold leading-tight text-white md:text-3xl">{person.vow}</blockquote>
        </aside>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">What you unlocked</p>
            <ul className="mt-6 space-y-4 text-slate-300">
              {person.unlocked.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-purple-300">What I offer back</p>
            <ul className="mt-6 space-y-4 text-slate-300">
              {person.offered.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">Birthday gift</p>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">Not a request. A thank-you in form.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          This page exists because gratitude should become architecture: words, pages, systems, rituals, and offerings that outlive the mood that created them.
        </p>
      </section>
    </main>
  )
}

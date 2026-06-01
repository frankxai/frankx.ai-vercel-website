import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import { tributeArtifacts, tribePeople } from './people'

export const metadata = createMetadata({
  title: 'The Tribe — FrankX',
  description:
    'A living gratitude index for the people, family, friends, mentors, colleagues, and creators who helped make the work possible.',
  path: '/tribe',
  keywords: [
    'FrankX tribe',
    'creator gratitude',
    'friends and family',
    'AI creator journey',
    'personal operating system',
    'creative community',
  ],
})

export default function TribePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.35),rgba(2,6,23,1))]" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
          <p className="mb-5 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
            Birthday dedication system
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Private pages for the people who made the work possible.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            This is the public doorway. The real gifts are the individual pages: ten private, direct dedications for love, family, friends, mentors, creators, colleagues, builders, and the future tribe this work is meant to serve.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Posture</p>
              <p className="mt-3 text-2xl font-semibold">Overflow, not hunger.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Gift</p>
              <p className="mt-3 text-2xl font-semibold">One page per person.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Standard</p>
              <p className="mt-3 text-2xl font-semibold">Private by default.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">Top ten pages</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">A gratitude architecture, not a performance.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Each page is a private artifact: what I see in them, what they unlocked in me, what I have already started building or freely offered because of them, and what I vow to carry forward.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tribePeople.map((person) => (
            <Link
              key={person.slug}
              href={`/tribe/${person.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.075]"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{person.role}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{person.name}</h3>
              <p className="mt-4 leading-7 text-slate-300">{person.shortGift}</p>
              <p className="mt-6 text-sm font-semibold text-sky-300">Open dedication →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-purple-300">What they unlocked</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">The artifacts are the thank-you.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Gratitude should not stay sentimental. It should become form: better writing, cleaner pages, stronger products, more honest art, and work that compounds.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {tributeArtifacts.map((artifact) => (
              <div key={artifact.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <h3 className="text-xl font-semibold text-white">{artifact.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{artifact.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">The vow</p>
        <blockquote className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          I do not need this life to prove I am loved. I use this life to become love in motion.
        </blockquote>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          To everyone who shaped me: thank you. I will make the work cleaner, braver, more beautiful, and more useful because you were part of the path.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-left text-slate-300">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Private by design</p>
          <p className="mt-3 leading-7">
            The individual pages are unlisted and marked noindex. Real privacy still requires authentication later; this version is designed for intentional sharing, not search discovery.
          </p>
        </div>
      </section>
    </main>
  )
}

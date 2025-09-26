import songs from '@/data/songs.json'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import IntelligenceArsenal from '@/app/affiliates/page'
import { createMetadata } from '@/lib/seo'

const songRecords = songs as SongRecord[]

export const metadata = createMetadata({
  title: 'FrankX Intelligence Arsenal & Sonic Drops',
  description:
    'Explore the curated intelligence stack, agent-approved tools, and the latest FrankX Suno sessions powering the Golden Age of Intelligence.',
  keywords: [
    'ai tools',
    'frankx music',
    'suno sessions',
    'agentic systems',
    'creative intelligence'
  ],
  path: '/resources'
})

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">FrankX Intelligence Arsenal</h1>
          <p className="mt-4 text-white/70">
            The living library of tools, rituals, and sonic experiences that fuel the FrankX collective. Tap into the
            same systems our agents rely on daily.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Latest Music Drops</h2>
            <p className="text-sm text-white/60">
              Suno-powered sessions straight from the FrankX studio. Use them to anchor rituals, ignite focus, and
              channel the Golden Age frequency.
            </p>
            <SongGrid songs={songRecords} limit={3} />
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <h3 className="text-xl font-semibold text-white">Join the Music Academy Waitlist</h3>
            <p className="mt-4">
              AIMusicAcademy launches soon—private Suno workshops, ritual labs, and collective releases. Add your name
              to receive the first invite.
            </p>
            <form action="/api/newsletter" method="POST" className="mt-6 space-y-4">
              <input type="hidden" name="tag" value="music-academy" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@realm.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(99,102,241,0.45)] transition hover:-translate-y-1">
                Join the Waitlist
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">We send one focused update—no noise, pure signal.</p>
          </div>
        </div>
      </section>

      <IntelligenceArsenal />
    </div>
  )
}

import Link from 'next/link'
import { Calendar, ArrowRight, Sparkles, Video } from 'lucide-react'
import { membershipConfig } from '@/lib/membership'

export const metadata = {
  title: 'Inner Circle Labs | FrankX.AI',
  description: 'Live build sessions and weekly lab replays for Inner Circle members.',
  robots: { index: false, follow: false },
}

const labTracks = [
  {
    title: 'System Build Labs',
    description: 'Watch a full system get built from blank page to working asset.',
  },
  {
    title: 'Shipping Sprints',
    description: 'Short, focused builds that turn ideas into publishable work.',
  },
  {
    title: 'Agent Rituals',
    description: 'Weekly patterns that keep the agent collective aligned and productive.',
  },
]

export default function LabsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.15]" />
      <div className="absolute -top-[40%] left-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_70%)] blur-[120px]" />
      <div className="relative z-10">
        <section className="pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/70 mb-4">
              Inner Circle Labs
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Live builds that turn ideas into systems.
            </h1>
            <p className="text-lg text-white/60 mb-10">
              Weekly labs are where the real work happens. See the system, the prompt, and the output—end to end.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={membershipConfig.checkoutUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 transition-all"
              >
                Unlock Labs Access
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vault"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                Visit Vault
                <Video className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {labTracks.map(track => (
                <div key={track.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-2 text-emerald-400/70 mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.2em]">Lab Track</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{track.title}</h3>
                  <p className="text-sm text-white/60">{track.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Weekly schedule</h2>
              <p className="text-sm text-white/60">
                Labs run every week. Members receive the invite + replay link via email.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

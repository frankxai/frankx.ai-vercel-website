import Link from 'next/link'
import { Gamepad2, Users, Keyboard, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react'

const GAMES = [
  {
    title: 'Rhythm Duel',
    href: '/music-lab/games/rhythm-duel',
    blurb:
      'Notes fall down four lanes; you catch them on the line. Every note you hit is a real note in the arrangement, so a clean run sounds like the song and a sloppy one sounds like a sloppy performance of it.',
    tag: '1–2 players',
    accent: '#22d3ee',
    facts: [
      { icon: Users, text: 'Two people, one keyboard or one tablet' },
      { icon: Keyboard, text: 'A S D F and J K L ; — or arrow keys' },
      { icon: Smartphone, text: 'Touch pads on phone and tablet' },
    ],
    live: true,
  },
]

export default function MusicGamesPage() {
  return (
    <main className="relative min-h-[100dvh] bg-[#07080d] text-white">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[620px] h-[620px] bg-cyan-500/[0.025] rounded-full blur-[200px] -top-40 -left-32" />
        <div className="absolute w-[520px] h-[520px] bg-fuchsia-500/[0.03] rounded-full blur-[190px] -bottom-40 -right-24" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
        <Link
          href="/music-lab"
          className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Music Lab
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">Music Games</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">
          Games you <span className="font-serif-italic text-white/70">play with sound</span>
        </h1>
        <p className="text-lg text-white/45 max-w-2xl leading-relaxed mb-14">
          The rest of the Music Lab is instruments you play alone. This is the part
          you hand to someone else. Browser only — nothing to install, no account.
        </p>

        <div className="space-y-5">
          {GAMES.map(game => (
            <Link
              key={game.href}
              href={game.href}
              className="group block p-7 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-6 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: game.accent }} />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/35">{game.tag}</span>
                  </div>
                  <h2 className="text-2xl font-semibold">{game.title}</h2>
                </div>
                <span className="shrink-0 inline-flex items-center gap-2 text-sm text-cyan-400 group-hover:gap-3 transition-[gap]">
                  Play
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <p className="text-white/45 leading-relaxed max-w-2xl mb-6">{game.blurb}</p>

              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {game.facts.map(fact => (
                  <li key={fact.text} className="flex items-center gap-2 text-sm text-white/35">
                    <fact.icon className="w-4 h-4 text-white/25" />
                    {fact.text}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <p className="text-sm text-white/25 mt-12 leading-relaxed max-w-2xl">
          More games are planned — an ear-training duel and a call-and-response
          memory game are next. If you want one in particular, tell me on the{' '}
          <Link href="/contact" className="text-white/45 underline underline-offset-4 hover:text-white/70">
            contact page
          </Link>.
        </p>
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Heart,
  Music,
  Piano,
  Headphones,
  Play,
  ExternalLink,
  Sparkles,
  Users,
  Palette,
  Drum,
} from 'lucide-react'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

// ─── Scroll Progress ────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="mama-scroll-progress" style={{ width: `${progress}%` }} />
}

// ─── Warm Particle Field ────────────────────────────────────────────

const PARTICLE_COUNT = 30

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: (i * 61.8) % 100,
  top: (i * 38.2) % 100,
  size: 2 + ((i * 1.3) % 3),
  delay: (i * 0.9) % 9,
  duration: 6 + ((i * 2.3) % 8),
  opacity: 0.1 + ((i * 0.01) % 0.2),
  glowSize: 5 + ((i * 2.5) % 8),
}))

function WarmParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-golden-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
            boxShadow: `0 0 ${p.glowSize}px rgba(251, 191, 36, 0.25)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

// ─── Divider ────────────────────────────────────────────────────────

function Divider() {
  return <div className="mama-divider my-4" />
}

// ─── Music Data ─────────────────────────────────────────────────────

// Curated tracks for Mama — piano, orchestral, healing, gentle
const pianoOrchestraTracks = [
  {
    title: 'Golden Frequencies v4',
    description: 'Neoklassisch & beruhigend',
    sunoId: '3841ae2a-1147-4adb-8b4e-c0491d554fee',
    genre: 'Neoklassik',
  },
  {
    title: 'Golden Frequencies',
    description: 'Heilende Klangwelten',
    sunoId: '5281ac63-ed5a-4933-b8ae-10d2312f3c1a',
    genre: 'Ambient',
  },
  {
    title: 'Golden Frequency Choir',
    description: 'Chor & Weltmusik',
    sunoId: '69fa45d3-8d45-4f6d-9424-9361cc95fe0a',
    genre: 'Chor',
  },
  {
    title: 'Lumina',
    description: 'Orchestral & Seele',
    sunoId: '1fc13c04-a7b3-427d-bff0-cac92ee524ae',
    genre: 'Orchestral',
  },
  {
    title: 'Arcanean Legends',
    description: 'Episch-orchestral & Fantasie',
    sunoId: 'eb702834-22c6-44b3-8d5b-bba83c1e9801',
    genre: 'Orchestral',
  },
  {
    title: 'Arcanean Starlight',
    description: 'Arena-Rock & Orchester',
    sunoId: '5d17255b-f997-4f4c-82ea-9fa1d5aa982a',
    genre: 'Orchestral',
  },
]

const gentleTracks = [
  {
    title: 'Magical Times',
    description: 'Magisch & symphonisch',
    sunoId: '74856905-1e50-419c-ad15-92081a743511',
    genre: 'Symphonisch',
  },
  {
    title: 'Golden Frequency Choir (Extended)',
    description: 'Erweiterter Chor',
    sunoId: 'b1c58d80-f4d6-45aa-8ffc-c531be288a5a',
    genre: 'Chor',
  },
  {
    title: 'Dieser eine BMW',
    description: 'Deutsche Folk-Soul Ballade',
    sunoId: '0de558d8-1b2d-4d37-96f4-90cbe9166379',
    genre: 'Folk / Soul',
  },
  {
    title: 'Destiny in Our Bones',
    description: 'Sanfter Pop',
    sunoId: 'bbcc35d2-f3ea-463c-8e6e-0d0480b7fef4',
    genre: 'Pop',
  },
]

const choirWorldTracks = [
  {
    title: 'Golden Frequency Choir (Native American)',
    description: 'Kehlkopfgesang & Weltmusik',
    sunoId: '3a3f32dc-f5fc-4092-bd57-9dc6b2c574f9',
    genre: 'Weltmusik',
  },
  {
    title: 'Golden Frequency Choir (Mongolian Lead)',
    description: 'Mongolische Harmonien',
    sunoId: '8c35ffd4-193a-4955-832c-7a5be69b8604',
    genre: 'Weltmusik',
  },
  {
    title: 'Golden Frequency Choir (Mongolian Harmonies)',
    description: 'Elektronisch & Chor',
    sunoId: '1a6f3b3f-a207-4b8f-b2c4-03356c7b7e2b',
    genre: 'Elektronisch',
  },
  {
    title: 'Golden Frequency Choir (Male Native)',
    description: 'Tiefe Stimmen & Kehlkopfgesang',
    sunoId: '266413cf-32a2-4d56-b143-25424244a025',
    genre: 'Chor',
  },
]

// ─── German Poems for Mama ──────────────────────────────────────────

const poemsForMama = [
  {
    title: 'An meine Mutter',
    author: 'Annette von Droste-Hülshoff',
    lines: [
      'So laß mich sitzen ohne Ende,',
      'So laß mich sitzen still für mich;',
      'In deine lieben, treuen Hände',
      'Leg ich mein müdes Angesicht.',
      '',
      'O Mutter, wie ist mir so wohl!',
      'Mir ist, als ob ich fliegen soll.',
    ],
    accent: 'gold' as const,
  },
  {
    title: 'Stufen',
    author: 'Hermann Hesse',
    lines: [
      'Wie jede Blüte welkt und jede Jugend',
      'Dem Alter weicht, blüht jede Lebensstufe,',
      'Blüht jede Weisheit auch und jede Tugend',
      'Zu ihrer Zeit und darf nicht ewig dauern.',
      '',
      'Es muß das Herz bei jedem Lebensrufe',
      'Bereit zum Abschied sein und Neubeginne,',
      'Um sich in Tapferkeit und ohne Trauern',
      'In andre, neue Bindungen zu geben.',
      '',
      'Und jedem Anfang wohnt ein Zauber inne,',
      'Der uns beschützt und der uns hilft, zu leben.',
    ],
    accent: 'amber' as const,
  },
  {
    title: 'Über die Geduld',
    author: 'Rainer Maria Rilke',
    lines: [
      'Man muss den Dingen',
      'die eigene, stille',
      'ungestörte Entwicklung lassen,',
      'die tief von innen kommt',
      'und durch nichts gedrängt',
      'oder beschleunigt werden kann,',
      'alles ist austragen — und',
      'dann gebären...',
      '',
      'Reifen wie der Baum,',
      'der seine Säfte nicht drängt',
      'und getrost in den',
      'Stürmen des Frühlings steht,',
      'ohne Angst,',
      'dass dahinter kein Sommer',
      'kommen könnte.',
      '',
      'Er kommt doch.',
    ],
    accent: 'gold' as const,
  },
]

// ─── Kids Activities ────────────────────────────────────────────────

const kidsActivities = [
  {
    title: 'Klavier für Kinder',
    description:
      'Ein farbenfrohes, interaktives Klavier im Browser. Perfekt für kleine Hände.',
    href: '/music-lab/for-kids/piano',
    icon: Piano,
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Xylophon',
    description:
      'Bunte Klänge auf dem Xylophon. Spielerisch Musik entdecken.',
    href: '/music-lab/for-kids/xylophone',
    icon: Music,
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Schlagzeug',
    description:
      'Rhythmus und Spaß mit dem digitalen Schlagzeug. Auf dem iPad und Handy.',
    href: '/music-lab/for-kids/drums',
    icon: Drum,
    color: 'from-violet-500/20 to-violet-600/5',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40',
    iconColor: 'text-violet-400',
  },
  {
    title: 'Klangschalen',
    description:
      'Beruhigende Klangschalen zum Entspannen. Auch schön zum Einschlafen.',
    href: '/music-lab/singing-bowls',
    icon: Sparkles,
    color: 'from-teal-500/20 to-teal-600/5',
    borderColor: 'border-teal-500/20 hover:border-teal-500/40',
    iconColor: 'text-teal-400',
  },
]

// ─── Suno Playlist Links ────────────────────────────────────────────

const playlists = [
  {
    name: 'Golden Frequencies',
    description: 'Heilende Frequenzen & Neoklassik',
    url: 'https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052',
    songs: 10,
  },
  {
    name: 'Orchestral Beauty',
    description: 'Orchesterwerke & Filmmusik',
    url: 'https://suno.com/playlist/0625352a-74c5-478a-933e-1204549efd36',
    songs: 1,
  },
  {
    name: 'Instrumental Magic',
    description: 'Instrumentale Schönheiten',
    url: 'https://suno.com/playlist/3b265675-b95e-48ec-a2ed-140f6962c54d',
    songs: 3,
  },
  {
    name: 'Peace For Your Soul',
    description: 'Ruhe für die Seele',
    url: 'https://suno.com/playlist/26136df0-7e47-460d-a0fe-be24ab69475d',
    songs: 1,
  },
  {
    name: 'Open Heart',
    description: 'Offenes Herz — sanfte Klänge',
    url: 'https://suno.com/playlist/5d39a571-7f77-4ba0-83ad-14fcc52c62bd',
    songs: 3,
  },
  {
    name: 'Licht',
    description: 'Musik voller Licht',
    url: 'https://suno.com/playlist/f64a0f32-44ff-4eba-8584-0fad97f67404',
    songs: 1,
  },
]

// ─── Track Card Component ───────────────────────────────────────────

function TrackCard({
  track,
  index,
}: {
  track: { title: string; description: string; sunoId: string; genre: string }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="bg-white/[0.02] border border-amber-500/10 rounded-2xl p-4 hover:border-amber-500/25 transition-all animate-mama-breathe">
        <div className="flex items-center justify-between mb-3 px-2">
          <div>
            <h3 className="font-medium text-white text-sm">{track.title}</h3>
            <p className="text-xs text-white/40">
              {track.description} &middot; {track.genre}
            </p>
          </div>
          <a
            href={`https://suno.com/song/${track.sunoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-white/40" />
          </a>
        </div>
        <iframe
          src={`https://suno.com/embed/${track.sunoId}`}
          className="w-full aspect-[16/9] rounded-xl"
          frameBorder={0}
          allow="autoplay; clipboard-write"
          loading="lazy"
          title={track.title}
        />
      </div>
    </motion.div>
  )
}

// ─── German Poem Component ──────────────────────────────────────────

function PoemCard({
  poem,
  index,
}: {
  poem: {
    title: string
    author: string
    lines: string[]
    accent: 'gold' | 'amber'
  }
  index: number
}) {
  const accentMap = {
    gold: {
      border: 'border-amber-500/15',
      glow: 'from-amber-500/8 to-transparent',
      cite: 'text-amber-300/60',
      line: 'from-amber-500/25',
    },
    amber: {
      border: 'border-amber-600/15',
      glow: 'from-amber-600/8 to-transparent',
      cite: 'text-amber-400/60',
      line: 'from-amber-600/25',
    },
  }

  const accent = accentMap[poem.accent]

  return (
    <ScrollReveal delay={index * 0.12}>
      <div
        className={`relative p-8 md:p-10 rounded-2xl backdrop-blur-sm ${accent.border} border bg-gradient-to-br from-white/[0.03] to-white/[0.01] animate-mama-breathe`}
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent.glow} -z-10 blur-xl opacity-50`}
        />

        <h3 className="font-display text-xl md:text-2xl text-white/80 mb-1 font-light italic">
          {poem.title}
        </h3>
        <p className={`text-sm ${accent.cite} mb-6`}>{poem.author}</p>

        <div className="font-body-serif text-base md:text-lg text-white/70 italic leading-relaxed space-y-1">
          {poem.lines.map((line, i) =>
            line === '' ? (
              <div key={i} className="h-4" />
            ) : (
              <p key={i}>{line}</p>
            )
          )}
        </div>
      </div>
    </ScrollReveal>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────

export default function MamaMusicPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[150px] top-1/4" />
        <div className="absolute w-[300px] h-[300px] bg-amber-600/[0.03] rounded-full blur-[100px] bottom-1/4 left-1/4" />
        <div className="absolute w-[200px] h-[200px] bg-yellow-500/[0.02] rounded-full blur-[80px] top-1/3 right-1/4" />

        <WarmParticles />

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <Heart className="w-10 h-10 mx-auto text-amber-400/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-amber-300/40 text-sm tracking-[0.3em] uppercase mb-8"
          >
            Musik von Frank
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white/90 mb-6 leading-tight"
          >
            Für Mama
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-body-serif text-lg md:text-xl text-white/40 italic max-w-xl mx-auto leading-relaxed"
          >
            Klavier, Orchester und Klänge aus der ganzen Welt.
            <br />
            Zum Zuhören, Entspannen und Genießen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <svg
              className="w-5 h-5 mx-auto text-white/15 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ─── Opening Words ──────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0a08] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="font-body-serif text-base md:text-lg text-white/50 leading-relaxed space-y-5 text-center italic">
              <p>Liebe Mama,</p>
              <p>
                Diese Seite ist für dich. Hier findest du meine Musik — Klavier,
                Orchester, Chöre und Klänge aus der ganzen Welt. Alles
                handgemacht mit KI-Technologie, alles mit Herz.
              </p>
              <p>
                Und wenn die Kleinen bei dir sind: weiter unten gibt es
                interaktive Instrumente, die sie direkt im Browser spielen
                können. Klavier, Xylophon, Schlagzeug — alles kostenlos, alles
                sofort.
              </p>
              <p className="text-white/30">
                Lehn dich zurück, drück auf Play, und genieß.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Piano & Orchestral Section ─────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0a08] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <Piano className="w-5 h-5 text-amber-400/60" />
              <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center font-light tracking-wide">
                Klavier & Orchester
              </h2>
            </div>
            <p className="text-center text-white/25 text-sm mb-14 italic font-body-serif">
              Neoklassische Klänge, heilende Frequenzen und orchestrale
              Schönheit.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5">
            {pianoOrchestraTracks.map((track, i) => (
              <TrackCard key={track.sunoId} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Gentle & German Section ────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c0f] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <Headphones className="w-5 h-5 text-amber-400/60" />
              <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center font-light tracking-wide">
                Sanfte Klänge & Deutsch
              </h2>
            </div>
            <p className="text-center text-white/25 text-sm mb-14 italic font-body-serif">
              Symphonische Magie, Pop-Balladen und eine deutsche Seele.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5">
            {gentleTracks.map((track, i) => (
              <TrackCard key={track.sunoId} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── World Choirs Section ───────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0a0c] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <Music className="w-5 h-5 text-amber-400/60" />
              <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center font-light tracking-wide">
                Chöre aus aller Welt
              </h2>
            </div>
            <p className="text-center text-white/25 text-sm mb-14 italic font-body-serif">
              Stimmen aus der Mongolei, von den Native Americans und mehr.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5">
            {choirWorldTracks.map((track, i) => (
              <TrackCard key={track.sunoId} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── German Poetry ──────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center mb-4 font-light tracking-wide">
              Deutsche Gedichte
            </h2>
            <p className="text-center text-white/25 text-sm mb-14 italic font-body-serif">
              Worte, die bleiben.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {poemsForMama.map((poem, i) => (
              <PoemCard key={poem.title} poem={poem} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Playlists ──────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c0f] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <Play className="w-5 h-5 text-amber-400/60" />
              <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center font-light tracking-wide">
                Playlists zum Durchhören
              </h2>
            </div>
            <p className="text-center text-white/25 text-sm mb-14 italic font-body-serif">
              Ganze Sammlungen auf Suno — einfach anklicken und genießen.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((pl, i) => (
              <motion.a
                key={pl.name}
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white/[0.02] border border-amber-500/10 rounded-xl p-5 hover:border-amber-500/25 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors">
                    {pl.name}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-amber-400/60 transition-colors" />
                </div>
                <p className="text-xs text-white/35">{pl.description}</p>
                <p className="text-xs text-amber-400/40 mt-2">
                  {pl.songs} {pl.songs === 1 ? 'Lied' : 'Lieder'}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Für die Kleinen ────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0d0a] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 justify-center mb-4">
              <Users className="w-5 h-5 text-emerald-400/60" />
              <h2 className="font-display text-2xl md:text-4xl text-white/50 text-center font-light tracking-wide">
                Für die Kleinen
              </h2>
            </div>
            <p className="text-center text-white/25 text-sm mb-6 italic font-body-serif">
              Interaktive Instrumente im Browser — auf iPad, Handy oder Computer.
            </p>
            <p className="text-center text-white/20 text-xs mb-14 max-w-lg mx-auto">
              Perfekt wenn Nichten und Neffen bei dir sind. Einfach auf den Link
              tippen, und sie können sofort loslegen. Kein Download, keine App,
              alles kostenlos.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {kidsActivities.map((activity, i) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={activity.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={activity.href}
                    className={`group block bg-gradient-to-br ${activity.color} border ${activity.borderColor} rounded-2xl p-6 transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-xl bg-white/5 ${activity.iconColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                href="/music-lab/for-kids"
                className="inline-flex items-center gap-2 text-sm text-emerald-400/60 hover:text-emerald-400 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Alle Kinder-Instrumente ansehen
                <span className="text-white/20">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── More from Frank ────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0a0e] to-[#0a0a0f]" />
        <div className="relative z-20 max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl text-white/50 mb-4 font-light">
              Noch mehr entdecken
            </h2>
            <p className="font-body-serif text-white/30 text-sm italic mb-10">
              Schau dir auch diese Seiten an.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/valentines-day"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-400/15 text-rose-200/50 text-sm tracking-wide hover:bg-rose-500/[0.06] hover:border-rose-400/25 hover:text-rose-200/70 transition-all"
              >
                <Heart className="w-4 h-4" />
                Gedichte & Liebe
              </Link>
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-400/15 text-amber-200/50 text-sm tracking-wide hover:bg-amber-500/[0.06] hover:border-amber-400/25 hover:text-amber-200/70 transition-all"
              >
                <Headphones className="w-4 h-4" />
                Alle 626+ Tracks auf Suno
                <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                href="/music"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/40 text-sm tracking-wide hover:bg-white/[0.04] hover:border-white/20 hover:text-white/60 transition-all"
              >
                <Music className="w-4 h-4" />
                Musik-Hauptseite
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Closing ────────────────────────────────────────── */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />
        <WarmParticles />
        <div className="relative z-20 max-w-xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-3xl md:text-4xl text-white/30 font-light italic leading-relaxed">
              Danke, Mama.
            </p>
            <p className="font-body-serif text-sm text-amber-400/30 mt-6 italic">
              Mit Liebe, Frank
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

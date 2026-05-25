'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const NOTE_VALUES = [
  { name: 'Whole Note', beats: 4, desc: 'Open oval, no stem', symbol: '𝅝' },
  { name: 'Half Note', beats: 2, desc: 'Open oval + stem', symbol: '𝅗𝅥' },
  { name: 'Quarter Note', beats: 1, desc: 'Filled oval + stem', symbol: '𝅘𝅥' },
  { name: 'Eighth Note', beats: 0.5, desc: 'Filled + stem + flag', symbol: '𝅘𝅥𝅮' },
  { name: 'Sixteenth Note', beats: 0.25, desc: 'Filled + stem + 2 flags', symbol: '𝅘𝅥𝅯' },
]

const RESTS = [
  { name: 'Whole Rest', beats: 4, desc: 'Hangs from 4th line' },
  { name: 'Half Rest', beats: 2, desc: 'Sits on 3rd line' },
  { name: 'Quarter Rest', beats: 1, desc: 'Zigzag symbol' },
  { name: 'Eighth Rest', beats: 0.5, desc: 'Single-flagged rest' },
  { name: 'Sixteenth Rest', beats: 0.25, desc: 'Double-flagged rest' },
]

const TIME_SIGNATURES = [
  { sig: '4/4', name: 'Common Time', desc: '4 quarter notes per bar — most pop, rock, classical' },
  { sig: '3/4', name: 'Waltz Time', desc: '3 quarter notes per bar — waltz, minuet' },
  { sig: '6/8', name: 'Compound', desc: '6 eighth notes per bar — feel of 2 groups of 3' },
  { sig: '2/4', name: 'March', desc: '2 quarter notes per bar — marches, polkas' },
]

const DYNAMICS = [
  { symbol: 'pp', name: 'Pianissimo', meaning: 'Very soft' },
  { symbol: 'p', name: 'Piano', meaning: 'Soft' },
  { symbol: 'mp', name: 'Mezzo-piano', meaning: 'Medium soft' },
  { symbol: 'mf', name: 'Mezzo-forte', meaning: 'Medium loud' },
  { symbol: 'f', name: 'Forte', meaning: 'Loud' },
  { symbol: 'ff', name: 'Fortissimo', meaning: 'Very loud' },
]

const SYMBOLS = [
  { name: 'Tie', desc: 'Connects two notes of the same pitch — hold through both' },
  { name: 'Slur', desc: 'Connects different notes — play them smooth and connected' },
  { name: 'Staccato', desc: 'Dot above the note — play short and detached' },
  { name: 'Accent', desc: '> above the note — play with emphasis' },
  { name: 'Fermata', desc: 'Hold the note longer than its written value' },
  { name: 'Repeat Signs', desc: 'Play the section again from the repeat start' },
]

const RESOURCES = [
  { name: 'MuseScore', url: 'https://musescore.org', desc: 'Free notation software — write music and hear it played back' },
  { name: 'musictheory.net', url: 'https://www.musictheory.net', desc: 'Free interactive lessons and exercises for reading and theory' },
  { name: 'Teoria.com', url: 'https://www.teoria.com', desc: 'Ear training, notation drills, and theory tutorials' },
  { name: 'SightReadingFactory', url: 'https://www.sightreadingfactory.com', desc: 'Generate unlimited practice sheets at your skill level' },
]

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

// ── Staff Visual ────────────────────────────────────────────────────────────

function StaffVisual() {
  return (
    <div className="relative mx-auto my-6 w-full max-w-md">
      <div className="flex flex-col gap-[10px] py-4">
        {[1, 2, 3, 4, 5].map((line) => (
          <div key={line} className="h-[1.5px] w-full rounded-full bg-rose-400/60" />
        ))}
      </div>
      {/* Note sitting on line 3 */}
      <div className="absolute left-[30%] top-[42%] h-4 w-5 -translate-y-1/2 rounded-full bg-rose-400 shadow-lg shadow-rose-500/30" />
      {/* Note in space between lines 2 and 3 */}
      <div className="absolute left-[60%] top-[28%] h-4 w-5 -translate-y-1/2 rounded-full bg-rose-300 shadow-lg shadow-rose-400/30" />
      <div className="mt-2 flex justify-between text-[10px] text-white/40">
        <span>Line 1</span>
        <span>Line 2</span>
        <span>Line 3</span>
        <span>Line 4</span>
        <span>Line 5</span>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-6xl">🎼</p>
          <h1 className="mt-4 bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            How to Read Sheet Music
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/50">
            The universal language of music. Once you can read it, you can play anything ever written.
          </p>
        </motion.header>

        {/* The Staff */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">The Staff</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Every piece of written music starts here — five horizontal lines and four spaces between them.
            Notes sit either <span className="text-rose-300">on a line</span> or <span className="text-rose-300">in a space</span>.
            The higher a note sits on the staff, the higher it sounds.
          </p>
          <StaffVisual />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['5 lines, 4 spaces', 'Notes sit ON lines or IN spaces', 'Higher on staff = higher pitch'].map((point) => (
              <div key={point} className="rounded-xl bg-white/[0.04] px-4 py-3 text-center text-sm text-white/70">
                {point}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Clefs */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Clefs</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] p-6">
              <p className="text-3xl">𝄞</p>
              <h3 className="mt-2 text-lg font-bold text-pink-300">Treble Clef (G Clef)</h3>
              <p className="mt-1 text-xs text-white/40">Right hand / higher instruments</p>
              <div className="mt-4 space-y-2 text-sm text-white/60">
                <p><span className="font-semibold text-rose-300">Lines:</span> E — G — B — D — F</p>
                <p className="text-xs text-white/30">&quot;Every Good Boy Does Fine&quot;</p>
                <p><span className="font-semibold text-rose-300">Spaces:</span> F — A — C — E</p>
                <p className="text-xs text-white/30">Spells &quot;FACE&quot;</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-6">
              <p className="text-3xl">𝄢</p>
              <h3 className="mt-2 text-lg font-bold text-pink-300">Bass Clef (F Clef)</h3>
              <p className="mt-1 text-xs text-white/40">Left hand / lower instruments</p>
              <div className="mt-4 space-y-2 text-sm text-white/60">
                <p><span className="font-semibold text-rose-300">Lines:</span> G — B — D — F — A</p>
                <p className="text-xs text-white/30">&quot;Good Boys Do Fine Always&quot;</p>
                <p><span className="font-semibold text-rose-300">Spaces:</span> A — C — E — G</p>
                <p className="text-xs text-white/30">&quot;All Cows Eat Grass&quot;</p>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-rose-500/10 px-6 py-4 text-center text-sm text-white/60">
            <span className="font-semibold text-rose-300">Middle C</span> sits on a ledger line between the two staves — the bridge connecting treble and bass.
          </div>
        </motion.section>

        {/* Note Values */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Note Values</h2>
          <p className="mt-2 text-sm text-white/50">Each note shape tells you how long to hold it.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {NOTE_VALUES.map((n) => (
              <div key={n.name} className="rounded-2xl bg-white/[0.04] p-4 text-center">
                <p className="text-3xl">{n.symbol}</p>
                <p className="mt-2 text-sm font-bold text-pink-300">{n.name}</p>
                <p className="mt-1 text-xs text-white/40">{n.beats} {n.beats === 1 ? 'beat' : 'beats'}</p>
                <p className="mt-1 text-[10px] text-white/30">{n.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-white/[0.04] px-6 py-4 text-center text-sm text-white/50">
            <span className="text-rose-300">1 whole</span> = 2 half = 4 quarter = 8 eighth = 16 sixteenth
          </div>
        </motion.section>

        {/* Rests */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Rests</h2>
          <p className="mt-2 text-sm text-white/50">
            Every note value has a corresponding rest — a measured silence that lasts exactly as long.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {RESTS.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white/[0.04] p-4 text-center">
                <p className="text-sm font-bold text-pink-300">{r.name}</p>
                <p className="mt-1 text-xs text-white/40">{r.beats} {r.beats === 1 ? 'beat' : 'beats'}</p>
                <p className="mt-1 text-[10px] text-white/30">{r.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Time Signatures */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Time Signatures</h2>
          <p className="mt-2 text-sm text-white/50">
            The two numbers at the start of a piece tell you the rhythmic framework. Top number = beats per bar. Bottom number = which note gets one beat.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {TIME_SIGNATURES.map((ts) => (
              <div key={ts.sig} className="rounded-2xl bg-white/[0.04] p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-rose-500/15 font-mono text-lg font-bold leading-tight text-rose-300">
                    <span>{ts.sig.split('/')[0]}</span>
                    <span className="h-px w-6 bg-rose-400/40" />
                    <span>{ts.sig.split('/')[1]}</span>
                  </span>
                  <div>
                    <p className="font-bold text-pink-300">{ts.name}</p>
                    <p className="mt-1 text-xs text-white/50">{ts.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-white/[0.04] px-6 py-4 text-sm text-white/50">
            <span className="text-rose-300">Bar lines</span> divide the staff into measures. Each measure contains exactly the number of beats the time signature specifies.
          </div>
        </motion.section>

        {/* Key Signatures */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Key Signatures</h2>
          <p className="mt-2 text-sm text-white/50">
            The sharps or flats at the beginning of each line tell you which key the music is in. They apply to every note on that line or space throughout the piece.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] p-5 text-center">
              <p className="text-2xl text-rose-300">-</p>
              <p className="mt-2 text-sm font-bold text-pink-300">No sharps or flats</p>
              <p className="mt-1 text-xs text-white/40">C major / A minor</p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-5 text-center">
              <p className="text-2xl text-rose-300">#</p>
              <p className="mt-2 text-sm font-bold text-pink-300">1 sharp (F#)</p>
              <p className="mt-1 text-xs text-white/40">G major / E minor</p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-5 text-center">
              <p className="text-2xl text-rose-300">b</p>
              <p className="mt-2 text-sm font-bold text-pink-300">1 flat (Bb)</p>
              <p className="mt-1 text-xs text-white/40">F major / D minor</p>
            </div>
          </div>
          <div className="mt-6 space-y-2 rounded-xl bg-white/[0.04] px-6 py-4 text-sm text-white/50">
            <p><span className="text-rose-300">Order of sharps:</span> F — C — G — D — A — E — B</p>
            <p><span className="text-rose-300">Order of flats:</span> B — E — A — D — G — C — F</p>
            <p className="text-xs text-white/30">Notice: the order of flats is the order of sharps reversed.</p>
          </div>
        </motion.section>

        {/* Dynamics */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Dynamics</h2>
          <p className="mt-2 text-sm text-white/50">Volume markings tell you how soft or loud to play.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {DYNAMICS.map((d) => (
              <div key={d.symbol} className="flex items-center gap-4 rounded-xl bg-white/[0.04] px-4 py-3">
                <span className="w-8 text-center font-serif text-xl italic text-rose-300">{d.symbol}</span>
                <div>
                  <p className="text-sm font-semibold text-pink-300">{d.name}</p>
                  <p className="text-xs text-white/40">{d.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-center">
              <p className="font-serif text-lg italic text-rose-300">&lt;</p>
              <p className="mt-1 text-sm text-white/50">Crescendo — gradually getting louder</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-center">
              <p className="font-serif text-lg italic text-rose-300">&gt;</p>
              <p className="mt-1 text-sm text-white/50">Decrescendo — gradually getting softer</p>
            </div>
          </div>
        </motion.section>

        {/* Common Symbols */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Common Symbols</h2>
          <div className="mt-6 space-y-3">
            {SYMBOLS.map((s) => (
              <div key={s.name} className="flex items-start gap-4 rounded-xl bg-white/[0.04] px-5 py-4">
                <span className="mt-0.5 whitespace-nowrap text-sm font-bold text-pink-300">{s.name}</span>
                <p className="text-sm text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practice: Reading Your First Score */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-rose-500/10 bg-rose-500/[0.04] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Practice: Reading Your First Score</h2>
          <p className="mt-2 text-sm text-white/50">
            When you pick up a new piece, follow this sequence before playing a single note:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { step: '1', text: 'Identify the clef — treble, bass, or both' },
              { step: '2', text: 'Read the key signature — which sharps or flats apply' },
              { step: '3', text: 'Check the time signature — how many beats per measure' },
              { step: '4', text: 'Count the beats in each measure before playing' },
              { step: '5', text: 'Name the notes on the staff out loud' },
              { step: '6', text: 'Read left to right, top to bottom — like a book' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-bold text-rose-300">
                  {item.step}
                </span>
                <p className="text-sm text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section {...fade} className="mb-12 rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-rose-300">Resources</h2>
          <p className="mt-2 text-sm text-white/50">Free tools to practice reading and writing music notation.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RESOURCES.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white/[0.04] p-5 transition hover:bg-white/[0.07]"
              >
                <p className="font-bold text-pink-300 group-hover:text-rose-300">{r.name}</p>
                <p className="mt-1 text-xs text-white/40">{r.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/theory"
            className="rounded-full bg-rose-500/10 px-6 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
          >
            Music Theory
          </Link>
          <Link
            href="/music/learn/piano"
            className="rounded-full bg-rose-500/10 px-6 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
          >
            Piano
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/50 transition hover:bg-white/10"
          >
            All Instruments
          </Link>
          <Link
            href="/music"
            className="rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/50 transition hover:bg-white/10"
          >
            Music Hub
          </Link>
        </div>
      </div>
    </div>
  )
}
